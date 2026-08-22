import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import axios from 'axios';
import { useAuth } from '../context/AuthContext';
import Modal from '../components/Modal';

const API_URL = process.env.REACT_APP_API_URL || '/api';

const JobDetail = () => {
  const { id } = useParams();
  const { isAuthenticated, isCandidate } = useAuth();
  const [job, setJob] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [fullName, setFullName] = useState('');
  const [contactEmail, setContactEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [skillsInput, setSkillsInput] = useState('');
  const [linkedinUrl, setLinkedinUrl] = useState('');
  const [resumeFile, setResumeFile] = useState(null);
  const [contactStatus, setContactStatus] = useState('');
  const [contactLoading, setContactLoading] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [hasApplied, setHasApplied] = useState(false);

  useEffect(() => {
    fetchJob();
  }, [id]);

  const fetchJob = async () => {
    try {
      setLoading(true);
      const response = await axios.get(`${API_URL}/jobs/${id}`);
      setJob(response.data.job);
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to fetch job details');
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

  const formatSalary = (salary) => {
    if (!salary?.min && !salary?.max) return 'Negotiable';
    if (salary.min && salary.max) {
      return `$${salary.min.toLocaleString()} - $${salary.max.toLocaleString()}`;
    }
    if (salary.min) return `$${salary.min.toLocaleString()}+`;
    return `Up to $${salary.max.toLocaleString()}`;
  };

  const getJobTypeLabel = (type) => {
    const labels = {
      'full-time': 'Full Time',
      'part-time': 'Part Time',
      'contract': 'Contract',
      'internship': 'Internship',
      'remote': 'Remote'
    };
    return labels[type] || type;
  };

  const getExperienceLabel = (exp) => {
    const labels = {
      'entry': 'Entry Level (0-1 years)',
      'mid': 'Mid Level (2-5 years)',
      'senior': 'Senior Level (5+ years)',
      'lead': 'Lead (7+ years)',
      'executive': 'Executive (10+ years)'
    };
    return labels[exp] || exp;
  };

  const parseSkillsInput = (value) => {
    if (!value) return [];
    return value
      .split(',')
      .map((skill) => skill.trim())
      .filter(Boolean);
  };

  const handleJobContact = async () => {
    setContactStatus('');

    if (!fullName.trim() || !contactEmail.trim() || !phone.trim() || !linkedinUrl.trim()) {
      setContactStatus('Please fill in all required fields.');
      return;
    }

    if (!resumeFile) {
      setContactStatus('Please upload your resume.');
      return;
    }

    try {
      setContactLoading(true);
      const skills = parseSkillsInput(skillsInput);
      const payload = new FormData();
      payload.append('fullName', fullName.trim());
      payload.append('contactEmail', contactEmail.trim());
      payload.append('phone', phone.trim());
      payload.append('linkedinUrl', linkedinUrl.trim());
      if (skills.length > 0) {
        payload.append('skills', JSON.stringify(skills));
      }
      payload.append('resume', resumeFile);

      await axios.post(`${API_URL}/jobs/${id}/contact`, payload);
      setContactStatus('Your request has been sent successfully.');
      setFullName('');
      setContactEmail('');
      setPhone('');
      setSkillsInput('');
      setLinkedinUrl('');
      setResumeFile(null);
      setShowModal(false);
      setHasApplied(true);
    } catch (err) {
      setContactStatus(err.response?.data?.message || 'Failed to send your request.');
    } finally {
      setContactLoading(false);
    }
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
          <Link to="/jobs" className="btn btn-primary" style={{ marginTop: '20px' }}>
            Back to Jobs
          </Link>
        </div>
      </div>
    );
  }

  if (!job) {
    return (
      <div className="job-detail-page">
        <div className="container" style={{ padding: '40px 20px', maxWidth: '900px' }}>
          <div className="alert alert-danger">Job not found</div>
          <Link to="/jobs" className="btn btn-primary" style={{ marginTop: '20px' }}>
            Back to Jobs
          </Link>
        </div>
      </div>
    );
  }

  const bannerUrl = job.bannerImage || job.aiBannerUrl;

  return (
    <div className="job-detail-page">
      <div className="container" style={{ padding: '40px 20px', maxWidth: '900px', margin: '0 auto' }}>
        {/* Back Button */}
        <Link to="/jobs" style={{ display: 'inline-flex', alignItems: 'center', color: '#007bff', marginBottom: '20px' }}>
          ← Back to Job View
        </Link>

        <div className="job-detail-card">
          {bannerUrl && (
            <div style={{ overflow: 'hidden', borderRadius: '16px 16px 0 0' }}>
              <img
                src={bannerUrl}
                alt={`${job.title} hiring banner`}
                style={{ width: '100%', display: 'block' }}
              />
            </div>
          )}
          <div className="job-detail-header detail-header--light">
            <h1 className="job-detail-title">{job.title}</h1>
            <p className="job-card-company" style={{ fontSize: '1.1rem' }}>
              {job.company}
            </p>

            <div className="job-detail-meta">
              <span>{job.location}</span>
              <span>{getExperienceLabel(job.experience)}</span>
              <span>{formatSalary(job.salary)}</span>
              <span>{job.views} views</span>
            </div>

            <div style={{ marginTop: '15px', display: 'flex', gap: '10px', flexWrap: 'wrap' }}>
              <span className="badge badge-primary">
                {getJobTypeLabel(job.jobType)}
              </span>
              <span className="badge badge-primary">
                Posted: {formatDate(job.createdAt)}
              </span>
            </div>
          </div>

          <div className="job-detail-body">
            {/* Job Description Section */}
            <div className="job-detail-section">
              <h3>Job Description</h3>
              <div style={{ whiteSpace: 'pre-wrap', lineHeight: '1.8', color: '#555' }}>
                {job.description}
              </div>
            </div>

            {/* Requirements Section */}
            {job.requirements && job.requirements.length > 0 && (
              <div className="job-detail-section">
                <h3>Requirements</h3>
                <ul>
                  {job.requirements.map((req, index) => (
                    <li key={index}>{req}</li>
                  ))}
                </ul>
              </div>
            )}

            {/* Responsibilities Section */}
            {job.responsibilities && job.responsibilities.length > 0 && (
              <div className="job-detail-section">
                <h3>Responsibilities</h3>
                <ul>
                  {job.responsibilities.map((resp, index) => (
                    <li key={index}>{resp}</li>
                  ))}
                </ul>
              </div>
            )}

            {/* Skills Section */}
            {job.skills && job.skills.length > 0 && (
              <div className="job-detail-section">
                <h3>Skills Required</h3>
                <div className="job-skills">
                  {job.skills.map((skill, index) => (
                    <span key={index} className="skill-tag">{skill}</span>
                  ))}
                </div>
              </div>
            )}

            {/* Job Info Summary */}
            <div className="job-detail-section" style={{ backgroundColor: '#f8f9fa', padding: '20px', borderRadius: '8px' }}>
              <h3 style={{ marginBottom: '15px' }}>Job Summary</h3>
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '15px' }}>
                <div>
                  <strong>Job Type:</strong> {getJobTypeLabel(job.jobType)}
                </div>
                <div>
                  <strong>Experience:</strong> {getExperienceLabel(job.experience)}
                </div>
                <div>
                  <strong>Salary:</strong> {formatSalary(job.salary)}
                </div>
                <div>
                  <strong>Location:</strong> {job.location}
                </div>
                <div>
                  <strong>Company:</strong> {job.company}
                </div>
                <div>
                  <strong>Posted:</strong> {formatDate(job.createdAt)}
                </div>
              </div>
            </div>

            {isCandidate && (
              <div className="job-detail-section">
                <h3>Complete the application form below to apply</h3>
              </div>
            )}

            <div style={{ marginTop: '20px' }}>
              {isAuthenticated ? (
                isCandidate ? (
                  <>
                    <div style={{ display: 'flex', gap: '12px', flexWrap: 'wrap' }}>
                      <button
                        className="btn btn-primary btn-lg"
                        onClick={() => setShowModal(true)}
                        disabled={hasApplied}
                      >
                        {hasApplied ? 'Applied' : 'Apply Now'}
                      </button>
                      <button
                        className="btn btn-outline btn-lg"
                        onClick={() => {
                          navigator.clipboard.writeText(window.location.href);
                          alert('Link copied to clipboard!');
                        }}
                      >
                        Share Job
                      </button>
                    </div>

                    <Modal
                      isOpen={showModal}
                      onClose={() => {
                        setShowModal(false);
                        setContactStatus('');
                        setFullName('');
                        setContactEmail('');
                        setPhone('');
                        setSkillsInput('');
                        setLinkedinUrl('');
                        setResumeFile(null);
                      }}
                      title="Submit Your Application"
                    >
                      <h4 style={{ marginBottom: '12px' }}>Applicant Information</h4>
                      <div className="form-group">
                        <label className="form-label">Full Name *</label>
                        <input
                          type="text"
                          className="form-control"
                          placeholder="Your full name"
                          value={fullName}
                          onChange={(event) => setFullName(event.target.value)}
                        />
                      </div>
                      <div className="form-group">
                        <label className="form-label">Contact Email *</label>
                        <input
                          type="email"
                          className="form-control"
                          placeholder="you@example.com"
                          value={contactEmail}
                          onChange={(event) => setContactEmail(event.target.value)}
                        />
                      </div>
                      <div className="form-group">
                        <label className="form-label">Phone *</label>
                        <input
                          type="tel"
                          className="form-control"
                          placeholder="+1 555 123 4567"
                          value={phone}
                          onChange={(event) => setPhone(event.target.value)}
                        />
                      </div>

                      <h4 style={{ margin: '20px 0 12px' }}>Professional Details</h4>
                      <div className="form-group">
                        <label className="form-label">Skills (comma separated)</label>
                        <input
                          type="text"
                          className="form-control"
                          placeholder="React, Node.js, UI/UX"
                          value={skillsInput}
                          onChange={(event) => setSkillsInput(event.target.value)}
                        />
                      </div>
                      <div className="form-group">
                        <label className="form-label">LinkedIn URL *</label>
                        <input
                          type="url"
                          className="form-control"
                          placeholder="https://www.linkedin.com/in/your-profile"
                          value={linkedinUrl}
                          onChange={(event) => setLinkedinUrl(event.target.value)}
                        />
                      </div>
                      <div className="form-group">
                        <label className="form-label">Resume (PDF, DOC, DOCX) *</label>
                        <input
                          type="file"
                          className="form-control"
                          accept=".pdf,.doc,.docx"
                          onChange={(event) => setResumeFile(event.target.files?.[0] || null)}
                        />
                      </div>
                      {contactStatus && (
                        <div
                          className={`alert ${contactStatus.includes('successfully') ? 'alert-success' : 'alert-danger'}`}
                          style={{ marginBottom: '15px' }}
                        >
                          {contactStatus}
                        </div>
                      )}
                      <button
                        className="btn btn-primary"
                        onClick={handleJobContact}
                        disabled={contactLoading}
                        style={{ width: '100%' }}
                      >
                        {contactLoading ? 'Sending...' : 'Submit'}
                      </button>
                    </Modal>
                  </>
                ) : (
                  <div style={{ color: '#6b7280', padding: '12px 0' }}>
                    
                  </div>
                )
              ) : (
                <Link to="/login" className="btn btn-primary btn-lg">
                  Login to Apply
                </Link>
              )}
            </div>

            {/* Posted By Info */}
            {job.postedBy && (
              <div style={{ marginTop: '40px', padding: '20px', backgroundColor: '#f8f9fa', borderRadius: '8px' }}>
                <h4 style={{ marginBottom: '10px' }}>Posted by</h4>
                <div style={{ display: 'flex', alignItems: 'center', gap: '15px' }}>
                  {job.postedBy.profilePicture ? (
                    <img
                      src={job.postedBy.profilePicture}
                      alt={job.postedBy.name}
                      style={{ width: '50px', height: '50px', borderRadius: '50%', objectFit: 'cover' }}
                    />
                  ) : (
                    <div style={{
                      width: '50px',
                      height: '50px',
                      borderRadius: '50%',
                      backgroundColor: '#007bff',
                      color: '#fff',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      fontSize: '1.2rem',
                      fontWeight: 'bold'
                    }}>
                      {job.postedBy.name?.charAt(0).toUpperCase()}
                    </div>
                  )}
                  <div>
                    <p style={{ fontWeight: '600', marginBottom: '5px' }}>{job.postedBy.name}</p>
                    {job.postedBy.company && (
                      <p style={{ color: '#666', fontSize: '0.9rem' }}>{job.postedBy.company}</p>
                    )}
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

export default JobDetail;
