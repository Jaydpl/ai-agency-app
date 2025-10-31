# Deployment Guide - AI Agency Agent Builder

This guide provides step-by-step instructions for deploying the AI Agency Agent Builder application to production.

## Prerequisites

Before deploying, ensure you have:
- A Supabase project set up with the database schema
- Node.js 18+ installed locally
- A hosting platform account (Vercel, Netlify, etc.)
- Git repository set up

## Environment Setup

### 1. Production Environment Variables

Create a `.env.production` file with your production Supabase credentials:

```env
VITE_SUPABASE_URL=https://your-production-project.supabase.co
VITE_SUPABASE_ANON_KEY=your-production-anon-key
VITE_APP_TITLE=AI Agency Agent Builder
VITE_APP_LOGO=https://your-production-logo-url.png
```

### 2. Supabase Production Configuration

Ensure your production Supabase project has:
- All tables created (agents, agent_runs, tools, client_profiles)
- Row-Level Security policies enabled
- Authentication configured with email provider
- Realtime subscriptions enabled

## Deployment Options

### Option 1: Vercel (Recommended)

Vercel provides the easiest deployment for Vite + React applications.

#### Steps:

1. **Push to GitHub**
```bash
git add .
git commit -m "Ready for production"
git push origin main
```

2. **Connect to Vercel**
   - Go to https://vercel.com
   - Click "New Project"
   - Import your GitHub repository
   - Select the repository

3. **Configure Environment Variables**
   - In Vercel dashboard, go to Settings → Environment Variables
   - Add all variables from `.env.production`
   - Make sure they're available in Production environment

4. **Deploy**
   - Click "Deploy"
   - Vercel will automatically build and deploy your app

5. **Custom Domain (Optional)**
   - Go to Settings → Domains
   - Add your custom domain
   - Follow DNS configuration instructions

### Option 2: Netlify

#### Steps:

1. **Connect to Netlify**
   - Go to https://netlify.com
   - Click "New site from Git"
   - Connect your GitHub account
   - Select your repository

2. **Build Settings**
   - Build command: `pnpm build`
   - Publish directory: `dist`

3. **Environment Variables**
   - Go to Site settings → Build & deploy → Environment
   - Add all variables from `.env.production`

4. **Deploy**
   - Netlify will automatically deploy on push to main branch

### Option 3: AWS Amplify

#### Steps:

1. **Create Amplify App**
   - Go to AWS Amplify console
   - Click "New app" → "Host web app"
   - Connect your GitHub repository

2. **Configure Build Settings**
   - Framework: React
   - Build command: `pnpm build`
   - Output directory: `dist`

3. **Add Environment Variables**
   - In App settings → Environment variables
   - Add all production variables

4. **Deploy**
   - Click "Save and deploy"

### Option 4: Firebase Hosting

#### Steps:

1. **Install Firebase CLI**
```bash
npm install -g firebase-tools
```

2. **Initialize Firebase**
```bash
firebase login
firebase init hosting
```

3. **Build the App**
```bash
pnpm build
```

4. **Deploy**
```bash
firebase deploy
```

## Post-Deployment Checklist

After deploying, verify:

- [ ] Application loads without errors
- [ ] Authentication works (signup/login)
- [ ] Can create new agents
- [ ] Agent dashboard displays agents
- [ ] Admin dashboard shows statistics
- [ ] Workflow designer functions properly
- [ ] Notifications appear correctly
- [ ] Responsive design works on mobile
- [ ] All images and assets load
- [ ] Database connections are secure

## Performance Optimization

### 1. Enable Caching
```bash
# In vite.config.ts
export default defineConfig({
  build: {
    rollupOptions: {
      output: {
        manualChunks: {
          'vendor': ['react', 'react-dom'],
          'supabase': ['@supabase/supabase-js'],
        }
      }
    }
  }
})
```

### 2. Minify and Optimize
- Vite automatically minifies in production
- Enable gzip compression on your hosting platform

### 3. Image Optimization
- Use optimized image formats (WebP)
- Lazy load images where possible

## Monitoring and Maintenance

### 1. Error Tracking
Consider integrating error tracking:
- Sentry
- LogRocket
- Bugsnag

### 2. Analytics
Track user behavior:
- Google Analytics
- Mixpanel
- Amplitude

### 3. Performance Monitoring
- Monitor Core Web Vitals
- Track page load times
- Monitor API response times

### 4. Database Backups
- Enable automatic backups in Supabase
- Test restore procedures regularly

## Scaling Considerations

As your application grows:

1. **Database**
   - Monitor query performance
   - Add indexes for frequently queried columns
   - Consider database replication

2. **API Rate Limiting**
   - Implement rate limiting for API endpoints
   - Use Supabase's built-in rate limiting

3. **Caching**
   - Implement Redis caching for frequently accessed data
   - Use CDN for static assets

4. **Load Balancing**
   - Use load balancers for multiple server instances
   - Implement auto-scaling

## Troubleshooting Deployment Issues

### Application Won't Load
- Check environment variables are set correctly
- Verify Supabase URL and key are accessible
- Check browser console for errors

### Authentication Fails
- Ensure Supabase email provider is enabled
- Check CORS settings in Supabase
- Verify authentication policies

### Database Errors
- Check RLS policies are correct
- Verify database tables exist
- Check Supabase connection status

### Performance Issues
- Check network tab for slow requests
- Monitor Supabase query performance
- Optimize large data transfers

## Rollback Procedure

If you need to rollback to a previous version:

1. **Identify Previous Deployment**
   - Check deployment history in your hosting platform

2. **Rollback**
   - Vercel: Click "Rollback" on previous deployment
   - Netlify: Go to Deploys → Select previous → "Publish deploy"
   - AWS Amplify: Select previous deployment in history

3. **Verify**
   - Test all critical features
   - Monitor error logs

## Security Checklist

- [ ] All environment variables are secure
- [ ] HTTPS is enabled
- [ ] CORS is properly configured
- [ ] RLS policies are enforced
- [ ] API keys are not exposed in code
- [ ] Sensitive data is encrypted
- [ ] Regular security audits scheduled

## Support and Resources

- [Vercel Documentation](https://vercel.com/docs)
- [Netlify Documentation](https://docs.netlify.com)
- [AWS Amplify Documentation](https://docs.amplify.aws)
- [Firebase Hosting Documentation](https://firebase.google.com/docs/hosting)
- [Supabase Documentation](https://supabase.com/docs)

## Next Steps

After successful deployment:

1. Monitor application performance
2. Gather user feedback
3. Plan feature enhancements
4. Set up automated testing
5. Implement CI/CD pipeline

---

For questions or issues during deployment, refer to the platform-specific documentation or contact support.
