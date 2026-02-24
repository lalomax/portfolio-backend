import 'dotenv/config';
import express from 'express';
import cors from 'cors';
import { Langbase, getRunner } from 'langbase';

const app = express();
const PORT = process.env.PORT || 3001;
const langbase = new Langbase();

// Middleware
app.use(cors({
  origin: process.env.ALLOWED_ORIGINS?.split(',') || ['http://localhost:5173', 'https://lalomax.netlify.app'],
  credentials: true
}));
app.use(express.json());

// Health check endpoint
app.get('/api/health', (req, res) => {
  res.json({ 
    status: 'OK', 
    timestamp: new Date().toISOString(),
    version: '1.0.0'
  });
});

// Chat endpoint
app.post('/api/chat', async (req, res) => {
  try {
    const { message } = req.body;
    
    if (!message) {
      return res.status(400).json({ error: 'Message is required' });
    }

    const apiKey = process.env.LANGBASE_API_KEY;
    
    if (!apiKey) {
      console.error('API key not configured');
      return res.status(500).json({ error: 'API key not configured' });
    }

    console.log(`[${new Date().toISOString()}] Processing message: ${message.substring(0, 50)}...`);

    // Run the Langbase pipe
    const { stream } = await langbase.pipes.run({
      stream: true,
      apiKey: apiKey,
      messages: [
        {
          role: 'user',
          content: message
        }
      ]
    });

    // Convert the stream to a stream runner
    const runner = getRunner(stream);
    
    // Set headers for streaming response
    res.setHeader('Content-Type', 'text/plain; charset=utf-8');
    
    let fullResponse = '';

    // Collect the full response from Langbase
    runner.on('content', (content) => {
      fullResponse += content;
    });

    runner.on('end', () => {
      console.log(`[${new Date().toISOString()}] Response sent successfully`);
      res.send(fullResponse);
    });

    runner.on('error', (error) => {
      console.error('Stream error:', error);
      if (!res.headersSent) {
        res.status(500).json({ error: 'Stream error occurred' });
      }
    });

  } catch (error) {
    console.error('Chat API error:', error);
    if (!res.headersSent) {
      res.status(500).json({ 
        error: 'Internal server error', 
        details: error.message,
        timestamp: new Date().toISOString()
      });
    }
  }
});

// 404 handler
app.use((req, res) => {
  res.status(404).json({ 
    error: 'Endpoint not found',
    path: req.originalUrl,
    method: req.method
  });
});

// Start server
app.listen(PORT, () => {
  console.log(`🚀 Portfolio Backend Server running on port ${PORT}`);
  console.log(`📊 Health check: http://localhost:${PORT}/api/health`);
  console.log(`💬 Chat endpoint: http://localhost:${PORT}/api/chat`);
  console.log(`🌍 Environment: ${process.env.NODE_ENV || 'development'}`);
});
