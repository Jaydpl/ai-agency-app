import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import '../styles/navbar.css';

interface NavbarProps {
  onLogout: () => void;
  isAdmin?: boolean;
}

export default function Navbar({ onLogout, isAdmin = false }: NavbarProps) {
  const navigate = useNavigate();

  return (
    <motion.nav
      className="navbar"
      initial={{ opacity: 0, y: -10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <div className="navbar-content">
        <motion.div
          className="navbar-brand"
          onClick={() => navigate('/dashboard')}
          whileHover={{ scale: 1.05 }}
          style={{ cursor: 'pointer' }}
        >
          <div className="brand-icon">⚡</div>
          <span>AI Agency</span>
        </motion.div>

        <div className="navbar-links">
          {isAdmin && (
            <motion.button
              className="nav-link"
              onClick={() => navigate('/admin')}
              whileHover={{ color: '#64c8ff' }}
            >
              Admin
            </motion.button>
          )}
          <motion.button
            className="nav-link"
            onClick={() => navigate('/dashboard')}
            whileHover={{ color: '#64c8ff' }}
          >
            Dashboard
          </motion.button>
          <motion.button
            className="nav-link"
            onClick={() => navigate('/agent-builder')}
            whileHover={{ color: '#64c8ff' }}
          >
            Builder
          </motion.button>
        </div>

        <motion.button
          className="btn-logout"
          onClick={onLogout}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          Logout
        </motion.button>
      </div>
    </motion.nav>
  );
}
