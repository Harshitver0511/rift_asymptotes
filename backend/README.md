# GitHub OAuth Backend

Node.js + Express backend for GitHub OAuth authentication.

## 📁 Project Structure

```
backend/
├── server.js        # Main server with OAuth routes
├── package.json     # Dependencies
├── .env.example     # Environment template
├── .env             # Your credentials (create this)
└── .gitignore
```

## 🚀 Quick Setup

### 1. Create GitHub OAuth App

1. Go to [GitHub Developer Settings](https://github.com/settings/developers)
2. Click **"New OAuth App"**
3. Fill in:
   - **Application name:** Your App Name
   - **Homepage URL:** `http://localhost:5173`
   - **Authorization callback URL:** `http://localhost:5000/auth/github/callback`
4. Click **"Register application"**
5. Copy `Client ID` and generate `Client Secret`

### 2. Configure Environment

```bash
cd backend
copy .env.example .env
```

Edit `.env` with your credentials:
```env
PORT=5000
GITHUB_CLIENT_ID=your_actual_client_id
GITHUB_CLIENT_SECRET=your_actual_client_secret
FRONTEND_URL=http://localhost:5173
```

### 3. Install & Run

```bash
npm install
npm run dev
```

Server runs at `http://localhost:5000`

## 🔗 API Endpoints

| Endpoint | Description |
|----------|-------------|
| `GET /auth/github` | Start OAuth flow (redirects to GitHub) |
| `GET /auth/github/callback` | Handle GitHub callback |
| `GET /auth/user` | Get authenticated user data |
| `GET /auth/logout` | Clear session/token |
| `GET /auth/status` | Check authentication status |

## 🎨 Frontend Integration

### Login Button
```jsx
const handleLogin = () => {
  window.location.href = "http://localhost:5000/auth/github";
};
```

### Fetch User (Dashboard)
```jsx
useEffect(() => {
  fetch("http://localhost:5000/auth/user", {
    credentials: "include",
  })
    .then(res => res.json())
    .then(data => setUser(data))
    .catch(err => console.error(err));
}, []);
```

### Logout
```jsx
const handleLogout = () => {
  fetch("http://localhost:5000/auth/logout", { credentials: "include" })
    .then(() => window.location.href = "/");
};
```

## 🔄 OAuth Flow

```
User clicks "Login with GitHub"
         ↓
GET /auth/github
         ↓
Redirect to github.com/login/oauth/authorize
         ↓
User authorizes app on GitHub
         ↓
GitHub redirects to /auth/github/callback?code=xxx
         ↓
Server exchanges code for access_token
         ↓
Token stored (global var + cookie)
         ↓
Redirect to frontend /dashboard
         ↓
Frontend calls GET /auth/user
         ↓
Server returns GitHub user data
```

## ⚠️ Notes

- The global token storage is for demo/hackathon purposes
- For production, use proper sessions (express-session) or JWT
- Never expose `GITHUB_CLIENT_SECRET` to frontend
