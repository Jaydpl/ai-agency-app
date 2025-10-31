# AI Agency Agent Builder

A modern, interactive web application for building, configuring, and deploying intelligent AI agents and chatbots without writing code.

## 🚀 Features

### Client Interface
- **Agent Creation & Management** - Create, edit, and manage AI agents with an intuitive interface
- **Interactive Agent Builder** - Configure agent parameters with real-time validation
- **Visual Workflow Designer** - Design agent workflows with drag-and-drop nodes
- **Agent Dashboard** - Monitor all your agents with real-time status updates
- **Multiple Agent Types** - Support for chatbots, manager agents, and worker agents

### Admin Interface
- **System Analytics** - View comprehensive system statistics and metrics
- **User Management** - Monitor total users and their activity
- **Agent Monitoring** - Track agent creation and deployment
- **Performance Metrics** - Analyze run completion rates and failures
- **Visual Charts** - Interactive charts for data visualization

### Technical Features
- **Supabase Integration** - Secure authentication and database storage
- **MCP Support** - Model Context Protocol integration for tool management
- **Real-time Updates** - Supabase Realtime for live data synchronization
- **Row-Level Security** - Enterprise-grade data security with RLS policies
- **Responsive Design** - Works seamlessly on desktop, tablet, and mobile

## 🎨 Design Highlights

- **Glassmorphism UI** - Modern frosted glass effect with transparency
- **Dark Mode** - Easy on the eyes with deep charcoal backgrounds
- **Animated Illustrations** - Custom SVG animations for visual appeal
- **Smooth Transitions** - Framer Motion animations throughout the app
- **High-Tech Aesthetic** - Electric blue and magenta accent colors
- **Micro-interactions** - Subtle hover effects and loading states

## 🛠️ Tech Stack

### Frontend
- **React 19** - Modern UI library
- **TypeScript** - Type-safe JavaScript
- **Vite** - Lightning-fast build tool
- **Framer Motion** - Animation library
- **React Router** - Client-side routing
- **Zustand** - State management
- **React Hot Toast** - Notification system
- **Recharts** - Data visualization

### Backend & Database
- **Supabase** - PostgreSQL database with authentication
- **Supabase Auth** - Email/password authentication
- **Row-Level Security** - Database-level access control
- **Realtime Subscriptions** - Live data updates

### Styling
- **CSS3** - Custom styling with modern features
- **Responsive Design** - Mobile-first approach
- **CSS Animations** - Smooth transitions and effects

## 📦 Installation

### Prerequisites
- Node.js 18+ 
- pnpm (or npm/yarn)
- Supabase account

### Setup Steps

1. **Clone the repository**
```bash
git clone <repository-url>
cd ai_agency_app
```

2. **Install dependencies**
```bash
pnpm install
```

3. **Configure environment variables**
```bash
cp .env.example .env
```

Edit `.env` with your Supabase credentials:
```
VITE_SUPABASE_URL=https://your-project.supabase.co
VITE_SUPABASE_ANON_KEY=your-anon-key
VITE_APP_TITLE=AI Agency Agent Builder
VITE_APP_LOGO=https://your-logo-url.png
```

4. **Set up Supabase database**
- Go to your Supabase project
- Navigate to SQL Editor
- Run the SQL schema from `supabase_schema.sql`

5. **Start development server**
```bash
pnpm dev
```

The application will be available at `http://localhost:5173`

## 📚 Project Structure

```
ai_agency_app/
├── src/
│   ├── components/          # Reusable React components
│   ├── pages/              # Page components
│   ├── store/              # Zustand stores (auth, agents)
│   ├── lib/                # Utilities and services
│   │   ├── supabase.ts     # Supabase client
│   │   └── mcp.ts          # MCP integration
│   ├── styles/             # CSS stylesheets
│   ├── App.tsx             # Main app component
│   └── main.tsx            # Entry point
├── public/                 # Static assets
├── supabase_schema.sql     # Database schema
├── .env                    # Environment variables
├── vite.config.ts          # Vite configuration
└── tsconfig.json           # TypeScript configuration
```

## 🔐 Security

- **Row-Level Security** - All database queries respect user permissions
- **Authentication** - Secure email/password authentication via Supabase
- **API Keys** - Environment variables for sensitive credentials
- **HTTPS Only** - All communications encrypted
- **Admin Verification** - Admin features require verified admin status

## 🚀 Deployment

### Build for Production
```bash
pnpm build
```

### Preview Production Build
```bash
pnpm preview
```

### Deploy to Production
The application can be deployed to any hosting platform that supports Node.js/static sites:
- Vercel
- Netlify
- GitHub Pages
- AWS Amplify
- Firebase Hosting

## 📖 User Guide

See `userGuide.md` for detailed instructions on:
- Creating and configuring agents
- Designing workflows
- Managing agent deployment
- Using the admin dashboard
- Troubleshooting common issues

## 🔧 Development

### Available Scripts

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

### Code Style
- ESLint for code quality
- TypeScript for type safety
- Prettier for code formatting (recommended)

## 🤝 Contributing

Contributions are welcome! Please follow these guidelines:
1. Create a feature branch
2. Make your changes
3. Test thoroughly
4. Submit a pull request

## 📝 API Documentation

### Authentication Endpoints
- `POST /auth/signup` - Create new account
- `POST /auth/signin` - Login
- `POST /auth/signout` - Logout

### Agent Endpoints
- `GET /agents` - List user's agents
- `POST /agents` - Create new agent
- `GET /agents/:id` - Get agent details
- `PUT /agents/:id` - Update agent
- `DELETE /agents/:id` - Delete agent

### Admin Endpoints
- `GET /admin/stats` - Get system statistics
- `GET /admin/users` - List all users
- `GET /admin/agents` - List all agents
- `GET /admin/runs` - List all agent runs

## 🐛 Troubleshooting

### Authentication Issues
- Ensure Supabase email provider is enabled
- Check environment variables are correct
- Clear browser cookies and try again

### Database Connection
- Verify Supabase URL and key are correct
- Check RLS policies are properly configured
- Ensure tables exist in database

### Agent Creation Fails
- Verify agent name is not empty
- Check network connection
- Review browser console for errors

## 📞 Support

For issues and questions:
1. Check the user guide
2. Review the troubleshooting section
3. Check browser console for error messages
4. Contact support through the help menu

## 📄 License

This project is licensed under the MIT License - see LICENSE file for details.

## 🙏 Acknowledgments

- Built with Vite, React, and TypeScript
- Powered by Supabase for backend services
- Animations by Framer Motion
- Charts by Recharts
- Icons and illustrations created with SVG

---

**Made with ❤️ by the AI Agency Team**

For more information, visit the [official documentation](https://docs.aiagency.com)
