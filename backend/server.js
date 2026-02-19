/**
 * GitHub OAuth Backend Server
 * 
 * OAuth Flow:
 * 1. User clicks "Login with GitHub" → redirected to /auth/github
 * 2. /auth/github redirects to GitHub's authorization page
 * 3. User authorizes → GitHub redirects to /auth/github/callback with a code
 * 4. Server exchanges code for access_token
 * 5. Token stored globally, user redirected to frontend dashboard
 * 6. Frontend calls /auth/user to get authenticated user data
 */

require('dotenv').config();
const express = require('express');
const axios = require('axios');
const cors = require('cors');
const cookieParser = require('cookie-parser');

const app = express();

// ============================================
// GLOBAL TOKEN STORAGE
// ============================================
// In production, use sessions/database instead
let globalGithubToken = null;

// ============================================
// MIDDLEWARE CONFIGURATION
// ============================================
app.use(cookieParser());
app.use(express.json());

// CORS: Allow frontend to make requests with credentials
app.use(cors({
  origin: process.env.FRONTEND_URL || 'http://localhost:5173',
  credentials: true, // Allow cookies to be sent
}));

// ============================================
// GITHUB OAUTH CONFIGURATION
// ============================================
const GITHUB_CLIENT_ID = process.env.GITHUB_CLIENT_ID;
const GITHUB_CLIENT_SECRET = process.env.GITHUB_CLIENT_SECRET;
const FRONTEND_URL = process.env.FRONTEND_URL || 'http://localhost:5173';

// ============================================
// ROUTES
// ============================================

/**
 * GET /auth/github
 * Step 1: Redirect user to GitHub's authorization page
 * GitHub will ask user to authorize our app
 */
app.get('/auth/github', (req, res) => {
  // Build GitHub OAuth authorization URL
  const githubAuthUrl = new URL('https://github.com/login/oauth/authorize');
  githubAuthUrl.searchParams.set('client_id', GITHUB_CLIENT_ID);
  githubAuthUrl.searchParams.set('scope', 'user'); // Request access to user profile
  
  console.log('→ Redirecting to GitHub for authorization...');
  res.redirect(githubAuthUrl.toString());
});

/**
 * GET /auth/github/callback
 * Step 2: Handle callback from GitHub after user authorizes
 * - Receive authorization code
 * - Exchange code for access token
 * - Store token globally
 * - Redirect to frontend dashboard
 */
app.get('/auth/github/callback', async (req, res) => {
  const { code } = req.query;

  // Validate that we received a code
  if (!code) {
    console.error('✗ No code received from GitHub');
    return res.status(400).json({ error: 'No code provided by GitHub' });
  }

  console.log('← Received authorization code from GitHub');

  try {
    // Exchange authorization code for access token
    const tokenResponse = await axios.post(
      'https://github.com/login/oauth/access_token',
      {
        client_id: GITHUB_CLIENT_ID,
        client_secret: GITHUB_CLIENT_SECRET,
        code: code,
      },
      {
        headers: {
          Accept: 'application/json', // Request JSON response
        },
      }
    );

    const { access_token, error, error_description } = tokenResponse.data;

    // Handle token exchange errors
    if (error) {
      console.error('✗ Token exchange failed:', error_description);
      return res.status(400).json({ error: error_description });
    }

    // Store token globally (for demo purposes)
    globalGithubToken = access_token;
    console.log('✓ Access token obtained and stored');

    // Also set as HTTP-only cookie (more secure)
    res.cookie('github_token', access_token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'lax',
      maxAge: 24 * 60 * 60 * 1000, // 24 hours
    });

    // Redirect user to frontend dashboard
    res.redirect(`${FRONTEND_URL}/dashboard`);

  } catch (error) {
    console.error('✗ OAuth callback error:', error.message);
    res.status(500).json({ error: 'Failed to authenticate with GitHub' });
  }
});

/**
 * GET /auth/user
 * Step 3: Fetch authenticated user's GitHub profile
 * Uses stored global token to make API request
 */
app.get('/auth/user', async (req, res) => {
  // Try to get token from cookie first, then fall back to global variable
  const token = req.cookies.github_token || globalGithubToken;

  if (!token) {
    console.error('✗ No token available - user not authenticated');
    return res.status(401).json({ error: 'Not authenticated. Please login first.' });
  }

  try {
    // Fetch user profile from GitHub API
    const userResponse = await axios.get('https://api.github.com/user', {
      headers: {
        Authorization: `Bearer ${token}`,
        Accept: 'application/vnd.github.v3+json',
      },
    });

    console.log('✓ User data fetched:', userResponse.data.login);
    res.json(userResponse.data);

  } catch (error) {
    console.error('✗ Failed to fetch user:', error.message);
    
    // Token might be invalid/expired
    if (error.response?.status === 401) {
      globalGithubToken = null; // Clear invalid token
      res.clearCookie('github_token');
      return res.status(401).json({ error: 'Token expired. Please login again.' });
    }

    res.status(500).json({ error: 'Failed to fetch user data' });
  }
});

/**
 * GET /auth/logout
 * Clear stored token and cookie
 */
app.get('/auth/logout', (req, res) => {
  globalGithubToken = null;
  res.clearCookie('github_token');
  console.log('✓ User logged out');
  res.json({ message: 'Logged out successfully' });
});

/**
 * GET /auth/status
 * Check if user is authenticated
 */
app.get('/auth/status', (req, res) => {
  const token = req.cookies.github_token || globalGithubToken;
  res.json({ authenticated: !!token });
});

// ============================================
// HEALTH CHECK
// ============================================
app.get('/', (req, res) => {
  res.json({ 
    status: 'ok',
    message: 'GitHub OAuth Backend Running',
    endpoints: {
      login: '/auth/github',
      callback: '/auth/github/callback',
      user: '/auth/user',
      logout: '/auth/logout',
      status: '/auth/status',
    }
  });
});

// ============================================
// START SERVER
// ============================================
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`
╔════════════════════════════════════════════╗
║   GitHub OAuth Backend Server Started      ║
╠════════════════════════════════════════════╣
║   Port: ${PORT}                               ║
║   Frontend: ${FRONTEND_URL}        ║
╚════════════════════════════════════════════╝
  `);
});
