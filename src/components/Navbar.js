import React, { useEffect, useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import logo from '../assets/logo.png';

const Navbar = () => {
  const {
    user,
    isAuthenticated,
    isOrganization,
    logout
  } = useAuth();

  const navigate = useNavigate();
  const location = useLocation();

  const [showDropdown, setShowDropdown] = useState(false);
  const [avatarError, setAvatarError] = useState(false);

  /*
   * The OAuth-selected workspace is retained in sessionStorage.
   * This is useful during the current UI/mockup phase because
   * the backend role is not yet a persistent clinical role model.
   */
  const selectedWorkspace =
    sessionStorage.getItem('medxSelectedRole');

  const professionalWorkspace =
    isOrganization ||
    selectedWorkspace === 'organization';

  useEffect(() => {
    setAvatarError(false);
    setShowDropdown(false);
  }, [user?.profilePicture, location.pathname]);

  const handleLogout = async () => {
    sessionStorage.removeItem('medxSelectedRole');
    await logout();
    navigate('/login');
    setShowDropdown(false);
  };

  /*
   * Keep the complete Med-X feature ecosystem visible.
   *
   * The workspace entry differs by role, but shared Med-X
   * capabilities remain available.
   */
  const navigationLinks = professionalWorkspace
    ? [
        { path: '/professional', label: 'Workspace' },
        { path: '/professional/patients', label: 'Patients' },
        { path: '/professional/reports', label: 'Reports' },
        { path: '/professional/monitoring', label: 'Monitoring' },
        { path: '/professional/alerts', label: 'Alerts' },
        { path: '/professional/ask-medx', label: 'Ask Med-X' }
      ]
    : [
        { path: '/dashboard', label: 'Home' },
        { path: '/health', label: 'My Health' },
        { path: '/reports', label: 'Reports' },
        { path: '/monitoring', label: 'Monitoring' },
        { path: '/alerts', label: 'Alerts' },
        { path: '/ask-medx', label: 'Ask Med-X' }
      ];

  const isActive = (path) => {
    if (path === '/dashboard') {
      return (
        location.pathname === '/' ||
        location.pathname === '/dashboard'
      );
    }

    // Workspace is only active on the professional home page.
    if (path === '/professional') {
      return location.pathname === '/professional';
    }

    // Other professional sections remain active for their sub-routes.
    return (
      location.pathname === path ||
      location.pathname.startsWith(`${path}/`)
    );
  };

  const homePath = professionalWorkspace
    ? '/professional'
    : '/dashboard';

  return (
    <nav className="navbar">
      <div className="navbar-container">

        <Link
          to={homePath}
          className="navbar-logo"
          aria-label="Med-X Home"
        >
          <img
            src={logo}
            alt="Med-X"
            className="navbar-logo-image"
          />
        </Link>

        <div className="navbar-links">

          {isAuthenticated &&
            navigationLinks.map((link) => (
              <Link
                key={link.path}
                to={link.path}
                className={`nav-link ${
                  isActive(link.path) ? 'nav-link-active' : ''
                }`}
              >
                {link.label}
              </Link>
            ))}

          {isAuthenticated ? (

            <div className="user-menu">

              <div className="dropdown">

                <button
                  type="button"
                  className="user-menu-btn"
                  onClick={() =>
                    setShowDropdown((value) => !value)
                  }
                  aria-expanded={showDropdown}
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
                      {user?.name
                        ?.charAt(0)
                        .toUpperCase()}
                    </div>
                  )}

                  <span>
                    {user?.name || 'Account'}
                  </span>

                  <span className="user-menu-chevron">
                    ▾
                  </span>

                </button>

                {showDropdown && (
                  <div className="dropdown-content">

                    <Link to={homePath}>
                      {professionalWorkspace
                        ? 'Workspace'
                        : 'Dashboard'}
                    </Link>

                    <Link to="/profile">
                      Profile & Settings
                    </Link>

                    <button
                      type="button"
                      onClick={handleLogout}
                    >
                      Sign out
                    </button>

                  </div>
                )}

              </div>

            </div>

          ) : (

            <>
              <Link
                to="/login"
                className="btn btn-outline btn-sm"
              >
                Sign in
              </Link>

              <Link
                to="/register"
                className="btn btn-primary btn-sm"
              >
                Create account
              </Link>
            </>

          )}

        </div>

      </div>
    </nav>
  );
};

export default Navbar;
