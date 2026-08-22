import React from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const Footer = () => {
  const { isOrganization, isAuthenticated } = useAuth();

  return (
    <footer className="footer">
      <div className="footer-content">
        <div className="footer-section">
          <h4>Jankoti.com</h4>
          <p style={{ color: '#aaa', marginBottom: '15px' }}>
            Connect with top employers and find your dream job. 
            Our platform makes job hunting easy and efficient.
          </p>
        </div>
        
        <div className="footer-section">
          <h4>For Job Seekers</h4>
          <Link to="/">Browse Jobs</Link>
          <Link to="/register">Create Account</Link>
          <Link to="/login">Sign In</Link>
        </div>
        
        <div className="footer-section">
          <h4>For Organizations</h4>
          {isOrganization ? (
            <>
              <Link to="/post-job">Post Jobs</Link>
              <Link to="/dashboard">Manage Applications</Link>
            </>
          ) : (
            <>
              {!isAuthenticated && <Link to="/register">Create Organization Account</Link>}
              <Link to="/login">Organization Sign In</Link>
            </>
          )}
        </div>
        
        <div className="footer-section">
          <h4>Company</h4>
          <Link to="/">About Us</Link>
          <Link to="/">Contact</Link>
          <Link to="/">Privacy Policy</Link>
          <Link to="/">Terms of Service</Link>
        </div>
      </div>
      
      <div className="footer-bottom">
        <p>&copy; {new Date().getFullYear()} Jankoti.com. All rights reserved.</p>
      </div>
    </footer>
  );
};

export default Footer;
