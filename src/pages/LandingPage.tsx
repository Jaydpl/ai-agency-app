import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import '../styles/landing-page.css';

export default function LandingPage() {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState<'login' | 'signup'>('login');

  const features = [
    {
      icon: '🤖',
      title: 'AI Agent Builder',
      description: 'Create powerful AI agents with our intuitive visual builder. No coding required.',
    },
    {
      icon: '⚡',
      title: 'Lightning Fast',
      description: 'Deploy agents in seconds with our optimized infrastructure and global CDN.',
    },
    {
      icon: '🔗',
      title: 'MCP Integration',
      description: 'Connect to Model Context Protocol servers for advanced capabilities.',
    },
    {
      icon: '📊',
      title: 'Real-time Analytics',
      description: 'Monitor agent performance with detailed metrics and insights.',
    },
    {
      icon: '🔒',
      title: 'Enterprise Security',
      description: 'Bank-level encryption and security for your AI agents and data.',
    },
    {
      icon: '🌍',
      title: 'Global Scale',
      description: 'Deploy agents worldwide with automatic scaling and load balancing.',
    },
  ];

  const benefits = [
    {
      number: '01',
      title: 'Rapid Development',
      description: 'Build and deploy AI agents 10x faster than traditional methods',
    },
    {
      number: '02',
      title: 'Cost Effective',
      description: 'Pay only for what you use with our flexible pricing model',
    },
    {
      number: '03',
      title: 'Easy Integration',
      description: 'Seamlessly integrate with your existing tools and workflows',
    },
    {
      number: '04',
      title: 'Expert Support',
      description: 'Get help from our team of AI and DevOps experts',
    },
  ];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.6 },
    },
  };

  return (
    <div className="landing-page">
      {/* Animated Background */}
      <div className="landing-background">
        <div className="bg-orb bg-orb-1"></div>
        <div className="bg-orb bg-orb-2"></div>
        <div className="bg-orb bg-orb-3"></div>
        <div className="bg-grid"></div>
      </div>

      {/* Navigation */}
      <motion.nav
        className="landing-nav"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        <div className="nav-container">
          <div className="nav-logo">
            <span className="logo-icon">🚀</span>
            <span>Brand Boost+</span>
          </div>
          <div className="nav-links">
            <a href="#features">Features</a>
            <a href="#benefits">Benefits</a>
            <a href="#auth">Get Started</a>
          </div>
        </div>
      </motion.nav>

      {/* Hero Section */}
      <motion.section
        className="hero-section"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        <div className="hero-content">
          <motion.div className="hero-logo" variants={itemVariants}>
            <img src="/1622D900-3727-4BCE-A0D4-565BDBA3A8F13.svg" alt="Brand Boost+" />
          </motion.div>

          <motion.h1 variants={itemVariants}>
            Build Intelligent AI Agents
            <span className="gradient-text"> Instantly</span>
          </motion.h1>

          <motion.p className="hero-subtitle" variants={itemVariants}>
            Create, deploy, and manage powerful AI agents with our revolutionary no-code platform.
            Transform your business with intelligent automation.
          </motion.p>

          <motion.div className="hero-cta" variants={itemVariants}>
            <motion.button
              className="btn-primary-large"
              onClick={() => {
                document.getElementById('auth')?.scrollIntoView({ behavior: 'smooth' });
              }}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              Get Started Now
              <span className="btn-arrow">→</span>
            </motion.button>
            <motion.button
              className="btn-secondary-large"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              Watch Demo
            </motion.button>
          </motion.div>
        </div>

        {/* Floating Elements */}
        <motion.div
          className="floating-element element-1"
          animate={{
            y: [0, -20, 0],
            rotate: [0, 5, 0],
          }}
          transition={{
            duration: 4,
            repeat: Infinity,
            ease: 'easeInOut',
          }}
        >
          ✨
        </motion.div>
        <motion.div
          className="floating-element element-2"
          animate={{
            y: [0, 20, 0],
            rotate: [0, -5, 0],
          }}
          transition={{
            duration: 5,
            repeat: Infinity,
            ease: 'easeInOut',
          }}
        >
          🤖
        </motion.div>
      </motion.section>

      {/* Features Section */}
      <motion.section
        id="features"
        className="features-section"
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: '-100px' }}
      >
        <motion.div className="section-header" variants={itemVariants}>
          <h2>Powerful Features</h2>
          <p>Everything you need to build and deploy AI agents</p>
        </motion.div>

        <motion.div className="features-grid" variants={containerVariants}>
          {features.map((feature, index) => (
            <motion.div
              key={index}
              className="feature-card"
              variants={itemVariants}
              whileHover={{ y: -10, scale: 1.02 }}
            >
              <div className="feature-icon">{feature.icon}</div>
              <h3>{feature.title}</h3>
              <p>{feature.description}</p>
            </motion.div>
          ))}
        </motion.div>
      </motion.section>

      {/* Benefits Section */}
      <motion.section
        id="benefits"
        className="benefits-section"
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: '-100px' }}
      >
        <motion.div className="section-header" variants={itemVariants}>
          <h2>Why Choose Brand Boost+?</h2>
          <p>Join thousands of companies building the future with AI</p>
        </motion.div>

        <motion.div className="benefits-grid" variants={containerVariants}>
          {benefits.map((benefit, index) => (
            <motion.div
              key={index}
              className="benefit-card"
              variants={itemVariants}
              whileHover={{ scale: 1.05 }}
            >
              <div className="benefit-number">{benefit.number}</div>
              <h3>{benefit.title}</h3>
              <p>{benefit.description}</p>
            </motion.div>
          ))}
        </motion.div>
      </motion.section>

      {/* Authentication Section */}
      <motion.section
        id="auth"
        className="auth-section"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
      >
        <div className="auth-container">
          <motion.div
            className="auth-card"
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            {/* Tab Navigation */}
            <div className="auth-tabs">
              <motion.button
                className={`tab ${activeTab === 'login' ? 'active' : ''}`}
                onClick={() => setActiveTab('login')}
                whileHover={{ scale: 1.05 }}
              >
                Sign In
              </motion.button>
              <motion.button
                className={`tab ${activeTab === 'signup' ? 'active' : ''}`}
                onClick={() => setActiveTab('signup')}
                whileHover={{ scale: 1.05 }}
              >
                Sign Up
              </motion.button>
            </div>

            {/* Tab Content */}
            <motion.div
              className="auth-content"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.3 }}
            >
              {activeTab === 'login' ? (
                <div className="auth-form">
                  <h3>Welcome Back</h3>
                  <p>Sign in to access your AI agents</p>
                  <motion.button
                    className="btn-auth"
                    onClick={() => navigate('/login')}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    Go to Sign In
                  </motion.button>
                </div>
              ) : (
                <div className="auth-form">
                  <h3>Create Your Account</h3>
                  <p>Join thousands of AI innovators</p>
                  <motion.button
                    className="btn-auth"
                    onClick={() => navigate('/signup')}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    Go to Sign Up
                  </motion.button>
                </div>
              )}
            </motion.div>
          </motion.div>

          {/* Side Info */}
          <motion.div
            className="auth-info"
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2, duration: 0.6 }}
          >
            <h3>Ready to Transform Your Business?</h3>
            <ul className="info-list">
              <li>✅ Free tier available</li>
              <li>✅ No credit card required</li>
              <li>✅ Deploy in minutes</li>
              <li>✅ 24/7 support</li>
            </ul>
          </motion.div>
        </div>
      </motion.section>

      {/* Footer */}
      <motion.footer
        className="landing-footer"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
      >
        <div className="footer-content">
          <p>&copy; 2024 Brand Boost+. All rights reserved.</p>
          <div className="footer-links">
            <a href="#privacy">Privacy</a>
            <a href="#terms">Terms</a>
            <a href="#contact">Contact</a>
          </div>
        </div>
      </motion.footer>
    </div>
  );
}
