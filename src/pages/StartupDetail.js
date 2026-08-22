import React, { useState, useEffect, useCallback } from 'react';
import { useParams, Link } from 'react-router-dom';
import axios from 'axios';
import { useAuth } from '../context/AuthContext';

const API_URL = process.env.REACT_APP_API_URL || '/api';
const API_BASE_URL = API_URL.replace(/\/api\/?$/, '');

const StartupDetail = () => {
  const { id } = useParams();
  const { isAuthenticated, isCandidate } = useAuth();
  const [startup, setStartup] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    fetchStartup();
  }, [id]);

  const fetchStartup = async () => {
    try {
      setLoading(true);
      const response = await axios.get(`${API_URL}/startup/${id}`);
      setStartup(response.data.startup);
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to fetch details');
    } finally {
      setLoading(false);
    }
  };

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  const getFundingStageLabel = (stage) => {
    const labels = {
      'pre-seed': 'Pre-Seed',
      'seed': 'Seed',
      'series-a': 'Series A',
      'series-b': 'Series B',
      'profitable': 'Profitable',
      'bootstrapped': 'Bootstrapped'
    };
    return labels[stage] || stage;
  };

  const getTeamSizeLabel = (size) => {
    return size || 'Not specified';
  };

  if (loading) {
    return (
      <div className="loading" style={{ minHeight: '60vh', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
        <div className="spinner"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="job-detail-page">
        <div className="container" style={{ padding: '40px 20px', maxWidth: '900px' }}>
          <div className="alert alert-danger">{error}</div>
          <Link to="/startup-view" className="btn btn-primary" style={{ marginTop: '20px' }}>
            Back to Startups
          </Link>
        </div>
      </div>
    );
  }

  if (!startup) {
    return (
      <div className="job-detail-page">
        <div className="container" style={{ padding: '40px 20px', maxWidth: '900px' }}>
          <div className="alert alert-danger">Startup not found</div>
          <Link to="/startup-view" className="btn btn-primary" style={{ marginTop: '20px' }}>
            Back to Startups
          </Link>
        </div>
      </div>
    );
  }

  const aboutText = startup.aboutStartup || startup.description;
  const socialLinks = startup.socialLinks || {};
  const resolveImageUrl = (url) => {
    if (!url) return '';
    const trimmed = url.trim();
    if (!trimmed) return '';
    if (/^(https?:)?\/\//i.test(trimmed) || trimmed.startsWith('data:')) {
      return trimmed;
    }
    const normalizedPath = trimmed.startsWith('/') ? trimmed : `/${trimmed}`;
    return `${API_BASE_URL}${normalizedPath}`;
  };
  const logoSrc = resolveImageUrl(startup.logoUrl);
  const founderImageSrc = resolveImageUrl(startup.founderImageUrl);
  const coFounderImageSrc = resolveImageUrl(startup.coFounderImageUrl);

  return (
    <div className="job-detail-page">
      <div className="container" style={{ padding: '40px 20px', maxWidth: '900px', margin: '0 auto' }}>
        <Link to="/startup-view" style={{ display: 'inline-flex', alignItems: 'center', color: '#007bff', marginBottom: '20px' }}>
          ← Back to Startups
        </Link>

        <div className="job-detail-card">
          <div className="job-detail-header detail-header--light">
            <div style={{ display: 'flex', alignItems: 'center', gap: '15px', flexWrap: 'wrap' }}>
              {logoSrc && (
                <img
                  src={logoSrc}
                  alt={`${startup.startupName} logo`}
                  style={{
                    width: '84px',
                    height: '84px',
                    borderRadius: '16px',
                    objectFit: 'contain',
                    background: '#f3f4f6',
                    padding: '8px'
                  }}
                />
              )}
              <div>
                <h1 className="job-detail-title" style={{ marginBottom: '6px' }}>{startup.startupName}</h1>
                <p className="job-card-company" style={{ fontSize: '1.1rem' }}>
                  {startup.industry}
                </p>
              </div>
            </div>

            <div className="job-detail-meta">
              <span>{startup.location || 'Remote'}</span>
              <span>{getFundingStageLabel(startup.fundingStage)}</span>
              <span>👥 {getTeamSizeLabel(startup.teamSize)} employees</span>
              <span>{startup.views} views</span>
            </div>

            <div style={{ marginTop: '15px', display: 'flex', gap: '10px', flexWrap: 'wrap' }}>
              <span className="badge badge-primary">
                {getFundingStageLabel(startup.fundingStage)}
              </span>
              <span className="badge badge-primary">
                Posted: {formatDate(startup.createdAt)}
              </span>
            </div>
          </div>

          <div className="job-detail-body">
            <div className="job-detail-section">
              <h3>About the Startup</h3>
              <div style={{ whiteSpace: 'pre-wrap', lineHeight: '1.8', color: '#555' }}>
                {aboutText}
              </div>
            </div>

            {startup.website && (
              <div className="job-detail-section">
                <h3>Website</h3>
                <p>
                  <a href={startup.website} target="_blank" rel="noopener noreferrer" style={{ color: '#007bff' }}>
                    {startup.website}
                  </a>
                </p>
              </div>
            )}

            {(startup.founderName || startup.coFounderName || startup.founderImageUrl || startup.coFounderImageUrl) && (
              <div className="job-detail-section">
                <h3>Founders</h3>
                <div style={{ display: 'flex', alignItems: 'flex-start', gap: '24px', flexWrap: 'wrap' }}>
                  {(founderImageSrc || startup.founderName) && (
                    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '8px' }}>
                      {founderImageSrc && (
                        <img
                          src={founderImageSrc}
                          alt={startup.founderName || 'Founder'}
                          style={{
                            width: '120px',
                            height: '120px',
                            borderRadius: '18px',
                            objectFit: 'contain',
                            background: '#f3f4f6',
                            padding: '6px'
                          }}
                        />
                      )}
                      {startup.founderName && (
                        <div style={{ fontWeight: 600 }}>{startup.founderName}</div>
                      )}
                      {!startup.founderName && (
                        <div style={{ fontWeight: 600 }}>Founder</div>
                      )}
                    </div>
                  )}

                  {(coFounderImageSrc || startup.coFounderName) && (
                    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '8px' }}>
                      {coFounderImageSrc && (
                        <img
                          src={coFounderImageSrc}
                          alt={startup.coFounderName || 'Co-founder'}
                          style={{
                            width: '120px',
                            height: '120px',
                            borderRadius: '18px',
                            objectFit: 'contain',
                            background: '#f3f4f6',
                            padding: '6px'
                          }}
                        />
                      )}
                      {startup.coFounderName && (
                        <div style={{ fontWeight: 600 }}>{startup.coFounderName}</div>
                      )}
                      {!startup.coFounderName && (
                        <div style={{ fontWeight: 600 }}>Co-founder</div>
                      )}
                    </div>
                  )}
                </div>
              </div>
            )}

            {(socialLinks.linkedin || socialLinks.twitter || socialLinks.instagram || socialLinks.facebook) && (
              <div className="job-detail-section">
                <h3>Social Media</h3>
                <div style={{ display: 'flex', flexWrap: 'wrap', gap: '10px' }}>
                  {socialLinks.linkedin && (
                    <a href={socialLinks.linkedin} target="_blank" rel="noopener noreferrer" className="btn btn-outline btn-sm">
                      LinkedIn
                    </a>
                  )}
                  {socialLinks.twitter && (
                    <a href={socialLinks.twitter} target="_blank" rel="noopener noreferrer" className="btn btn-outline btn-sm">
                      Twitter/X
                    </a>
                  )}
                  {socialLinks.instagram && (
                    <a href={socialLinks.instagram} target="_blank" rel="noopener noreferrer" className="btn btn-outline btn-sm">
                      Instagram
                    </a>
                  )}
                  {socialLinks.facebook && (
                    <a href={socialLinks.facebook} target="_blank" rel="noopener noreferrer" className="btn btn-outline btn-sm">
                      Facebook
                    </a>
                  )}
                </div>
              </div>
            )}

            <div className="job-detail-section" style={{ backgroundColor: '#f8f9fa', padding: '20px', borderRadius: '8px' }}>
              <h3 style={{ marginBottom: '15px' }}>Startup Summary</h3>
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '15px' }}>
                <div><strong>Industry:</strong> {startup.industry}</div>
                <div><strong>Funding Stage:</strong> {getFundingStageLabel(startup.fundingStage)}</div>
                <div><strong>Team Size:</strong> {getTeamSizeLabel(startup.teamSize)}</div>
                <div><strong>Location:</strong> {startup.location || 'Remote'}</div>
                <div><strong>Startup Name:</strong> {startup.startupName}</div>
                {startup.founderName && <div><strong>Founder:</strong> {startup.founderName}</div>}
                {startup.coFounderName && <div><strong>Co-founder:</strong> {startup.coFounderName}</div>}
                <div><strong>Posted:</strong> {formatDate(startup.createdAt)}</div>
              </div>
            </div>

            

            <div style={{ marginTop: '30px', display: 'flex', gap: '15px', flexWrap: 'wrap' }}>
              {isAuthenticated ? (
                isCandidate ? (
                  <a href={`mailto:${startup.email}`} className="btn btn-primary btn-lg">
                    Contact Startup
                  </a>
                ) : (
                  <span style={{ color: '#6b7280', padding: '12px 0' }}>
                    Organizations cannot contact startups.
                  </span>
                )
              ) : (
                <Link to="/login" className="btn btn-primary btn-lg">
                  Login to Contact
                </Link>
              )}
              <button
                className="btn btn-outline btn-lg"
                onClick={() => {
                  navigator.clipboard.writeText(window.location.href);
                  alert('Link copied to clipboard!');
                }}
              >
                Share
              </button>
            </div>

            {startup.postedBy && (
              <div style={{ marginTop: '40px', padding: '20px', backgroundColor: '#f8f9fa', borderRadius: '8px' }}>
                <h4 style={{ marginBottom: '10px' }}>Posted by</h4>
                <div style={{ display: 'flex', alignItems: 'center', gap: '15px' }}>
                  {startup.postedBy.profilePicture ? (
                    <img
                      src={startup.postedBy.profilePicture}
                      alt={startup.postedBy.name}
                      style={{ width: '50px', height: '50px', borderRadius: '50%', objectFit: 'cover' }}
                    />
                  ) : (
                    <div style={{
                      width: '50px',
                      height: '50px',
                      borderRadius: '50%',
                      backgroundColor: '#4facfe',
                      color: '#fff',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      fontSize: '1.2rem',
                      fontWeight: 'bold'
                    }}>
                      {startup.postedBy.name?.charAt(0).toUpperCase()}
                    </div>
                  )}
                  <div>
                    <p style={{ fontWeight: '600', marginBottom: '5px' }}>{startup.postedBy.name}</p>
                    <p style={{ color: '#666', fontSize: '0.9rem' }}>{startup.postedBy.email}</p>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default StartupDetail;
