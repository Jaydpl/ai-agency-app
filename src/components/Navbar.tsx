import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuthStore } from '../store/authStore';
import { motion, AnimatePresence } from 'framer-motion';
import '../styles/navbar.css';

export default function Navbar() {
  const navigate = useNavigate();
  const { user, signOut } = useAuthStore();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isProfileOpen, setIsProfileOpen] = useState(false);

  const handleLogout = async () => {
    await signOut();
    navigate('/login');
  };

  const menuItems = [
    { label: 'Dashboard', icon: '📊', path: '/dashboard' },
    { label: 'Create Agent', icon: '🤖', path: '/agent-builder' },
    { label: 'Admin Panel', icon: '⚙️', path: '/admin' },
  ];

  return (
    <nav className="navbar">
      <div className="navbar-container">
        {/* Logo */}
        <motion.div
          className="navbar-logo"
          whileHover={{ scale: 1.05 }}
          onClick={() => navigate('/dashboard')}
        >
          <span className="logo-icon">🚀</span>
          <span className="logo-text">AI Agency</span>
        </motion.div>

        {/* Desktop Menu */}
        <div className="navbar-menu-desktop">
          {menuItems.map((item) => (
            <motion.button
              key={item.path}
              className="nav-menu-item"
              onClick={() => navigate(item.path)}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <span className="nav-icon">{item.icon}</span>
              <span>{item.label}</span>
            </motion.button>
          ))}
        </div>

        {/* Right Side - User & Settings */}
        <div className="navbar-right">
          {user && (
            <div className="user-section">
              <span className="user-email">{user.email}</span>

              {/* Profile Dropdown */}
              <div className="profile-dropdown">
                <motion.button
                  className="profile-button"
                  onClick={() => setIsProfileOpen(!isProfileOpen)}
                  whileHover={{ scale: 1.05 }}
                >
                  <span className="profile-avatar">👤</span>
                </motion.button>

                <AnimatePresence>
                  {isProfileOpen && (
                    <motion.div
                      className="profile-menu"
                      initial={{ opacity: 0, y: -10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -10 }}
                    >
                      <motion.button
                        className="profile-menu-item"
                        onClick={() => {
                          navigate('/profile');
                          setIsProfileOpen(false);
                        }}
                        whileHover={{ x: 5 }}
                      >
                        <span>👤 My Profile</span>
                      </motion.button>
                      <motion.button
                        className="profile-menu-item"
                        onClick={() => {
                          navigate('/settings');
                          setIsProfileOpen(false);
                        }}
                        whileHover={{ x: 5 }}
                      >
                        <span>⚙️ Settings</span>
                      </motion.button>
                      <div className="profile-menu-divider"></div>
                      <motion.button
                        className="profile-menu-item logout"
                        onClick={() => {
                          handleLogout();
                          setIsProfileOpen(false);
                        }}
                        whileHover={{ x: 5 }}
                      >
                        <span>🚪 Logout</span>
                      </motion.button>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            </div>
          )}

          {/* Mobile Menu Toggle */}
          <motion.button
            className="mobile-menu-toggle"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            whileTap={{ scale: 0.95 }}
          >
            <span className={`hamburger ${isMenuOpen ? 'active' : ''}`}>
              <span></span>
              <span></span>
              <span></span>
            </span>
          </motion.button>
        </div>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isMenuOpen && (
          <motion.div
            className="navbar-menu-mobile"
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
          >
            {menuItems.map((item) => (
              <motion.button
                key={item.path}
                className="mobile-nav-item"
                onClick={() => {
                  navigate(item.path);
                  setIsMenuOpen(false);
                }}
                whileHover={{ x: 10 }}
              >
                <span className="nav-icon">{item.icon}</span>
                <span>{item.label}</span>
              </motion.button>
            ))}
            <div className="mobile-menu-divider"></div>
            <motion.button
              className="mobile-nav-item logout"
              onClick={() => {
                handleLogout();
                setIsMenuOpen(false);
              }}
              whileHover={{ x: 10 }}
            >
              <span className="nav-icon">🚪</span>
              <span>Logout</span>
            </motion.button>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
}
