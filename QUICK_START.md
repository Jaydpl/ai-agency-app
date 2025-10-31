# Quick Start Guide - AI Agency Agent Builder

Get up and running with the AI Agency Agent Builder in 5 minutes.

## Prerequisites

- Node.js 18+ installed
- pnpm installed (`npm install -g pnpm`)
- Supabase account (free tier available)
- Git (optional, for version control)

## Step 1: Clone or Download

```bash
# If using git
git clone <repository-url>
cd ai_agency_app

# Or extract the ZIP file and navigate to the directory
cd ai_agency_app
```

## Step 2: Install Dependencies

```bash
pnpm install
```

This will install all required packages including React, Supabase, Framer Motion, and more.

## Step 3: Configure Supabase

### Create a Supabase Project

1. Go to https://app.supabase.com
2. Click "New Project"
3. Fill in project details:
   - Name: `ai-agency-app`
   - Database Password: Create a strong password
   - Region: Choose closest to you
4. Click "Create new project"

### Get Your Credentials

1. Go to Settings → API
2. Copy:
   - **Project URL** (looks like: `https://xxxxx.supabase.co`)
   - **Anon Key** (public key)

### Set Environment Variables

Create a `.env` file in the project root:

```env
VITE_SUPABASE_URL=https://your-project.supabase.co
VITE_SUPABASE_ANON_KEY=your-anon-key-here
VITE_APP_TITLE=AI Agency Agent Builder
VITE_APP_LOGO=https://api.dicebear.com/7.x/icons/svg?seed=AIAgency
```

### Set Up Database

1. In Supabase dashboard, go to SQL Editor
2. Click "New Query"
3. Copy the entire content from `supabase_schema.sql`
4. Paste into the SQL editor
5. Click "Run"
6. Wait for success message

## Step 4: Start Development Server

```bash
pnpm dev
```

The application will open at `http://localhost:5173`

## Step 5: Create Your First Account

1. Click "Sign Up"
2. Enter email and password
3. Click "Create Account"
4. You'll be redirected to the dashboard

## Step 6: Create Your First Agent

1. Click "+ Create New Agent"
2. Fill in agent details:
   - **Name**: "My First Agent"
   - **Description**: "A test agent"
   - **Type**: "Chatbot"
3. Click "Configuration" tab
4. Set up agent parameters:
   - **AI Model**: Select your preferred model
   - **Temperature**: 0.7 (balanced)
   - **System Prompt**: "You are a helpful assistant"
5. Click "Workflow" tab to design workflow (optional)
6. Click "💾 Save Agent"
7. Click "▶ Activate" to deploy

## Troubleshooting

### Port Already in Use

If port 5173 is already in use:

```bash
pnpm dev -- --port 3000
```

### Supabase Connection Error

- Verify `.env` file has correct credentials
- Check Supabase project is running
- Ensure email provider is enabled in Supabase

### Database Tables Not Found

- Run the SQL schema again in Supabase SQL Editor
- Check all tables exist in Table Editor
- Verify RLS policies are enabled

### Authentication Not Working

- Clear browser cookies
- Check email provider is enabled in Supabase
- Verify CORS settings in Supabase

## Next Steps

### 1. Explore Features
- Create multiple agents
- Design complex workflows
- Connect MCP servers
- Monitor admin dashboard

### 2. Customize
- Update colors in `src/App.css`
- Modify components in `src/components/`
- Add new pages in `src/pages/`

### 3. Deploy
- See `DEPLOYMENT.md` for deployment instructions
- Choose hosting platform (Vercel, Netlify, etc.)
- Set up production environment variables

### 4. Integrate
- Connect external APIs
- Add webhooks
- Integrate with your systems

## Available Scripts

```bash
# Start development server
pnpm dev

# Build for production
pnpm build

# Preview production build
pnpm preview

# Run linter
pnpm lint
```

## Project Structure

```
ai_agency_app/
├── src/
│   ├── components/       # Reusable components
│   ├── pages/           # Page components
│   ├── store/           # Zustand stores
│   ├── lib/             # Utilities and services
│   ├── styles/          # CSS stylesheets
│   ├── App.tsx          # Main app
│   └── main.tsx         # Entry point
├── public/              # Static assets
├── .env                 # Environment variables
├── vite.config.ts       # Vite config
└── tsconfig.json        # TypeScript config
```

## Key Technologies

- **React 19** - UI library
- **TypeScript** - Type safety
- **Vite** - Build tool
- **Supabase** - Backend & database
- **Framer Motion** - Animations
- **Zustand** - State management
- **React Router** - Navigation

## Documentation

- **userGuide.md** - User guide for end users
- **README.md** - Full project documentation
- **DESIGN_SYSTEM.md** - Design guidelines
- **MCP_INTEGRATION.md** - MCP setup guide
- **DEPLOYMENT.md** - Deployment instructions

## Getting Help

1. Check the relevant documentation file
2. Review browser console for errors
3. Check Supabase dashboard for database issues
4. Review component code for implementation details

## Tips & Tricks

### Faster Development
- Use VS Code with TypeScript extension
- Install Tailwind CSS IntelliSense extension
- Use React Developer Tools browser extension

### Better Performance
- Use React DevTools Profiler
- Check Network tab for slow requests
- Monitor Supabase query performance

### Debugging
- Use browser DevTools console
- Add `console.log()` for debugging
- Check Supabase logs for database errors

## Common Tasks

### Add a New Page

```tsx
// src/pages/MyPage.tsx
import { motion } from 'framer-motion';
import Navbar from '../components/Navbar';

export default function MyPage() {
  return (
    <div>
      <Navbar />
      <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
        <h1>My Page</h1>
      </motion.div>
    </div>
  );
}
```

Then add route in `src/App.tsx`:
```tsx
<Route path="/my-page" element={<MyPage />} />
```

### Add a New Component

```tsx
// src/components/MyComponent.tsx
import { motion } from 'framer-motion';

export default function MyComponent() {
  return (
    <motion.div className="card">
      <h3>My Component</h3>
    </motion.div>
  );
}
```

### Add a New Style

Create `src/styles/my-style.css` and import in component:
```tsx
import '../styles/my-style.css';
```

## Production Checklist

Before deploying to production:

- [ ] Update environment variables
- [ ] Test all features
- [ ] Check responsive design
- [ ] Verify authentication
- [ ] Test database operations
- [ ] Check error handling
- [ ] Optimize images
- [ ] Enable HTTPS
- [ ] Set up monitoring
- [ ] Create backups

## Support Resources

- [React Documentation](https://react.dev)
- [TypeScript Handbook](https://www.typescriptlang.org/docs/)
- [Supabase Docs](https://supabase.com/docs)
- [Vite Guide](https://vitejs.dev/guide/)
- [Framer Motion](https://www.framer.com/motion/)

---

**You're all set!** Start building amazing AI agents. 🚀
