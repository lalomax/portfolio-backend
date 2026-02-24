# Portfolio Backend API

Backend API for Orlando's portfolio with Langbase AI integration.

## 🚀 Features

- **Langbase Integration**: AI-powered chat responses
- **CORS Support**: Secure cross-origin requests
- **Error Handling**: Comprehensive error management
- **Health Check**: Monitoring endpoint
- **Environment Config**: Secure API key management

## 📁 Project Structure

```
portfolio-backend/
├── server.js              # Main Express server
├── package.json           # Dependencies and scripts
├── .env.example          # Environment variables template
├── .env                 # Your environment variables (gitignored)
└── README.md             # This file
```

## 🛠️ Installation

```bash
# Clone or navigate to the project
cd portfolio-backend

# Install dependencies
npm install

# Copy environment variables
cp .env.example .env
# Edit .env with your actual values
```

## 🏃‍♂️ Running

### Development
```bash
npm run dev
```

### Production
```bash
npm start
```

## 🌐 API Endpoints

### GET /api/health
Health check endpoint.

**Response:**
```json
{
  "status": "OK",
  "timestamp": "2026-02-24T12:00:00.000Z",
  "version": "1.0.0"
}
```

### POST /api/chat
Chat endpoint for Langbase integration.

**Request:**
```json
{
  "message": "Where does Orlando live?"
}
```

**Response:**
```
Orlando Flores lives in Santa Martha, El Alto, La Paz, Bolivia...
```

## 🚀 Deployment

### Railway (Recommended)
```bash
# Install Railway CLI
npm install -g @railway/cli

# Login and deploy
railway login
railway init
railway up

# Set environment variables in Railway dashboard
# - LANGBASE_API_KEY
# - PORT=3001
# - NODE_ENV=production
```

### Vercel
```bash
# Install Vercel CLI
npm install -g vercel

# Deploy
vercel --prod

# Set environment variables in Vercel dashboard
# - LANGBASE_API_KEY
```

### Render
1. Connect your GitHub repository
2. Set build command: `npm install`
3. Set start command: `npm start`
4. Add environment variables in dashboard

## 🔧 Environment Variables

| Variable | Description | Required |
|----------|-------------|----------|
| `LANGBASE_API_KEY` | Your Langbase pipe API key | ✅ |
| `PORT` | Server port (default: 3001) | ❌ |
| `ALLOWED_ORIGINS` | CORS allowed origins | ❌ |
| `NODE_ENV` | Environment (development/production) | ❌ |

## 🔒 Security

- ✅ API key stored in environment variables
- ✅ CORS configured for specific origins
- ✅ Input validation on all endpoints
- ✅ Error messages don't expose sensitive data

## 📊 Monitoring

- Health check endpoint for monitoring
- Structured logging with timestamps
- Error tracking and reporting

## 🐛 Troubleshooting

### Common Issues

1. **"API key not configured"**
   - Ensure `.env` file exists with `LANGBASE_API_KEY`
   - Restart server after updating environment variables

2. **CORS errors**
   - Add your frontend domain to `ALLOWED_ORIGINS`
   - Check environment variables are properly set

3. **Connection refused**
   - Verify port is available
   - Check if server is running: `curl http://localhost:3001/api/health`

## 📝 Logs

Server logs include:
- Request timestamps
- Message previews (first 50 chars)
- Response status
- Error details with stack traces

## 🤝 Support

For issues:
1. Check server logs
2. Verify environment variables
3. Test health endpoint
4. Check Langbase API key validity
