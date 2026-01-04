import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import './LandingPage.css';
import LoginModal from './LoginModal';
import RegisterModal from './RegisterModal';

const LandingPage = () => {
  const navigate = useNavigate();
  const [showLoginModal, setShowLoginModal] = useState(false);
  const [showRegisterModal, setShowRegisterModal] = useState(false);
  const [testLoading, setTestLoading] = useState(false);

  const openLogin = () => {
    setShowRegisterModal(false);
    setShowLoginModal(true);
  };

  const openRegister = () => {
    setShowLoginModal(false);
    setShowRegisterModal(true);
  };

  const closeModals = () => {
    setShowLoginModal(false);
    setShowRegisterModal(false);
  };

  const handleTestLogin = async () => {
    setTestLoading(true);
    try {
      const response = await axios.post('/api/test/create-test-user');
      
      // Store token and user data
      localStorage.setItem('token', response.data.token);
      localStorage.setItem('user', JSON.stringify(response.data.user));
      
      // Show credentials briefly
      alert(`Test User Created!\nUsername: testuser\nPassword: test123`);
      
      // Redirect to dashboard
      navigate('/dashboard');
    } catch (err) {
      console.error('Test login error:', err);
      alert('Failed to create test user. Please try manual login.');
      setTestLoading(false);
    }
  };

  return (
    <div className="landing-page">
      {/* Animated Background */}
      <div className="background-animation">
        <div className="circle circle-1"></div>
        <div className="circle circle-2"></div>
        <div className="circle circle-3"></div>
      </div>

      {/* Main Content */}
      <div className="landing-content">
        <div className="hero-section">
          <h1 className="main-title">
            Attendance Monitoring System
          </h1>
          <p className="subtitle">
            Track your semester attendance with ease
          </p>
          <p className="description">
            Stay on top of your academic performance. Monitor your lecture attendance, 
            track your percentage, and never miss an important threshold.
          </p>

          {/* Action Buttons */}
          <div className="action-buttons">
            <button className="btn btn-login" onClick={openLogin}>
              <span>Login</span>
              <div className="btn-shine"></div>
            </button>
            <button className="btn btn-signup" onClick={openRegister}>
              <span>Sign Up</span>
              <div className="btn-shine"></div>
            </button>
          </div>

          {/* Test User Button for Local Development */}
          <div className="test-user-section">
            <button 
              className="btn-test-user" 
              onClick={handleTestLogin}
              disabled={testLoading}
            >
              {testLoading ? '⏳ Creating Test User...' : '🧪 Quick Test Login (Local Dev)'}
            </button>
            <p className="test-user-hint">
              Creates/logs in as: <strong>testuser</strong> / <strong>test123</strong>
            </p>
          </div>

          {/* Features */}
          <div className="features">
            <div className="feature-card">
              <div className="feature-icon">📊</div>
              <h3>Track Progress</h3>
              <p>Monitor your attendance in real-time</p>
            </div>
            <div className="feature-card">
              <div className="feature-icon">📈</div>
              <h3>Percentage View</h3>
              <p>See your attendance percentage instantly</p>
            </div>
            <div className="feature-card">
              <div className="feature-icon">🎯</div>
              <h3>Meet Goals</h3>
              <p>Stay above required attendance thresholds</p>
            </div>
          </div>
        </div>
      </div>

      {/* Modals */}
      {showLoginModal && <LoginModal onClose={closeModals} onSwitchToRegister={openRegister} />}
      {showRegisterModal && <RegisterModal onClose={closeModals} onSwitchToLogin={openLogin} />}
    </div>
  );
};

export default LandingPage;
