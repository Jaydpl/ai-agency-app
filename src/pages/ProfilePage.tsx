import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuthStore } from '../store/authStore';
import { supabase } from '../lib/supabase';
import { motion } from 'framer-motion';
import Navbar from '../components/Navbar';
import '../styles/profile.css';

interface UserProfile {
  id: string;
  email: string;
  full_name: string;
  company: string;
  phone: string;
  bio: string;
  avatar_url: string;
  plan_level: string;
  created_at: string;
}

export default function ProfilePage() {
  const navigate = useNavigate();
  const { user } = useAuthStore();
  const [profile, setProfile] = useState<UserProfile | null>(null);
  const [isEditing, setIsEditing] = useState(false);
  const [isSaving, setIsSaving] = useState(false);
  const [successMessage, setSuccessMessage] = useState('');
  const [formData, setFormData] = useState({
    full_name: '',
    company: '',
    phone: '',
    bio: '',
  });

  useEffect(() => {
    if (!user) {
      navigate('/login');
      return;
    }
    fetchProfile();
  }, [user, navigate]);

  const fetchProfile = async () => {
    try {
      const { data, error } = await supabase
        .from('client_profiles')
        .select('*')
        .eq('id', user?.id)
        .single();

      if (error) throw error;
      setProfile(data);
      setFormData({
        full_name: data.full_name || '',
        company: data.company || '',
        phone: data.phone || '',
        bio: data.bio || '',
      });
    } catch (error) {
      console.error('Failed to fetch profile:', error);
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSaveProfile = async () => {
    setIsSaving(true);
    try {
      const { error } = await supabase
        .from('client_profiles')
        .update(formData)
        .eq('id', user?.id);

      if (error) throw error;
      setProfile((prev) => prev ? { ...prev, ...formData } : null);
      setIsEditing(false);
      setSuccessMessage('Profile updated successfully!');
      setTimeout(() => setSuccessMessage(''), 3000);
    } catch (error) {
      console.error('Failed to update profile:', error);
    } finally {
      setIsSaving(false);
    }
  };

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
      transition: { duration: 0.5 },
    },
  };

  return (
    <div className="profile-page">
      <Navbar />
      
      <motion.div
        className="profile-container"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        {/* Header */}
        <motion.div className="profile-header" variants={itemVariants}>
          <div className="header-content">
            <h1>My Profile</h1>
            <p>Manage your account information</p>
          </div>
          <motion.button
            className={`btn-edit ${isEditing ? 'editing' : ''}`}
            onClick={() => setIsEditing(!isEditing)}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            {isEditing ? '❌ Cancel' : '✏️ Edit Profile'}
          </motion.button>
        </motion.div>

        {/* Success Message */}
        {successMessage && (
          <motion.div
            className="success-message"
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
          >
            ✅ {successMessage}
          </motion.div>
        )}

        {/* Profile Content */}
        <motion.div className="profile-content" variants={itemVariants}>
          {/* Avatar Section */}
          <div className="profile-avatar-section">
            <div className="avatar-circle">
              <span className="avatar-icon">👤</span>
            </div>
            <div className="avatar-info">
              <h2>{profile?.full_name || 'User'}</h2>
              <p className="email">{profile?.email}</p>
              <span className="plan-badge">{profile?.plan_level || 'Basic'} Plan</span>
            </div>
          </div>

          {/* Profile Form */}
          <div className="profile-form">
            <div className="form-group">
              <label>Email Address</label>
              <input
                type="email"
                value={profile?.email || ''}
                disabled
                className="form-input disabled"
              />
              <small>Email cannot be changed</small>
            </div>

            <div className="form-group">
              <label>Full Name</label>
              <input
                type="text"
                name="full_name"
                value={formData.full_name}
                onChange={handleInputChange}
                disabled={!isEditing}
                className={`form-input ${!isEditing ? 'disabled' : ''}`}
                placeholder="Enter your full name"
              />
            </div>

            <div className="form-group">
              <label>Company</label>
              <input
                type="text"
                name="company"
                value={formData.company}
                onChange={handleInputChange}
                disabled={!isEditing}
                className={`form-input ${!isEditing ? 'disabled' : ''}`}
                placeholder="Your company name"
              />
            </div>

            <div className="form-group">
              <label>Phone Number</label>
              <input
                type="tel"
                name="phone"
                value={formData.phone}
                onChange={handleInputChange}
                disabled={!isEditing}
                className={`form-input ${!isEditing ? 'disabled' : ''}`}
                placeholder="Your phone number"
              />
            </div>

            <div className="form-group">
              <label>Bio</label>
              <textarea
                name="bio"
                value={formData.bio}
                onChange={handleInputChange}
                disabled={!isEditing}
                className={`form-textarea ${!isEditing ? 'disabled' : ''}`}
                placeholder="Tell us about yourself"
                rows={4}
              />
            </div>

            {/* Account Info */}
            <div className="account-info">
              <h3>Account Information</h3>
              <div className="info-grid">
                <div className="info-item">
                  <span className="info-label">Member Since</span>
                  <span className="info-value">
                    {profile?.created_at ? new Date(profile.created_at).toLocaleDateString() : 'N/A'}
                  </span>
                </div>
                <div className="info-item">
                  <span className="info-label">Plan Level</span>
                  <span className="info-value">{profile?.plan_level || 'Basic'}</span>
                </div>
              </div>
            </div>

            {/* Save Button */}
            {isEditing && (
              <motion.button
                className="btn-save"
                onClick={handleSaveProfile}
                disabled={isSaving}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                {isSaving ? '💾 Saving...' : '💾 Save Changes'}
              </motion.button>
            )}
          </div>
        </motion.div>
      </motion.div>
    </div>
  );
}
