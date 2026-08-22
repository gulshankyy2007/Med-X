import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import logo from '../assets/jankotilogo1.png';

const Navbar = () => {
  const { user, isAuthenticated, isOrganization, logout } = useAuth();
  const navigate = useNavigate();
  const [showDropdown, setShowDropdown] = useState(false);
  const [avatarError, setAvatarError] = useState(false);

  useEffect(() => {
    setAvatarError(false);
  }, [user?.profilePicture]);

  const handleLogout = () => {
    logout();
    navigate('/');
    setShowDropdown(false);
  };

  return (
    <nav className="navbar">
      <div className="navbar-container">
        <Link to="/" className="navbar-logo" aria-label="Home">
          <img src={logo} alt="Jankoti logo" className="navbar-logo-image" />
          
        </Link>
        
        <div className="navbar-links">
          <Link to="/jobs">Job View</Link>
          <Link to="/freelancing-view">Freelancing</Link>
          <Link to="/startup-view">Startup</Link>
          <Link to="/podcast-view">Podcast</Link>
          <Link to="/classified-view">Classified</Link>

          {isAuthenticated ? (
            <div className="user-menu">
              
              
              <div className="dropdown">
                <button 
                  className="user-menu-btn"
                  onClick={() => setShowDropdown(!showDropdown)}
                >
                  {user?.profilePicture && !avatarError ? (
                    <img 
                      src={user.profilePicture} 
                      alt={user.name || 'User avatar'}
                      className="user-avatar"
                      onError={() => setAvatarError(true)}
                    />
                  ) : (
                    <div className="user-avatar-placeholder">
                      {user?.name?.charAt(0).toUpperCase()}
                    </div>
                  )}
                  <span>{user?.name}</span>
                </button>
                
                {showDropdown && (
                  <div className="dropdown-content">
                    <Link to="/dashboard" onClick={() => setShowDropdown(false)}>
                      Dashboard
                    </Link>
                    {isOrganization && (
                      <>
                        <Link to="/post-job" onClick={() => setShowDropdown(false)}>
                          Post a Job
                        </Link>
                        <Link to="/post-freelancing" onClick={() => setShowDropdown(false)}>
                          Post Freelancing
                        </Link>
                        <Link to="/post-startup" onClick={() => setShowDropdown(false)}>
                          Post Startup
                        </Link>
                        <Link to="/post-podcast" onClick={() => setShowDropdown(false)}>
                          Post Podcast
                        </Link>
                        <Link to="/post-classified" onClick={() => setShowDropdown(false)}>
                          Post Classified
                        </Link>
                        <Link to="/my-jobs" onClick={() => setShowDropdown(false)}>
                          My Posted Jobs
                        </Link>
                      </>
                    )}
                    <button onClick={handleLogout}>
                      Logout
                    </button>
                  </div>
                )}
              </div>
            </div>
          ) : (
            <>
              <Link to="/login" className="btn btn-outline btn-sm">
                Login
              </Link>
              <Link to="/register" className="btn btn-primary btn-sm">
                Sign Up
              </Link>
            </>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
