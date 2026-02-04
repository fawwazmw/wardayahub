import React, { useState } from 'react';

export default function Newsletter() {
  const [email, setEmail] = useState('');
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');
  const [message, setMessage] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) return;

    setStatus('loading');

    // Simulate API call
    try {
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      // In a real app, you would POST to your API route
      // await fetch('/api/subscribe', { method: 'POST', body: JSON.stringify({ email }) });
      
      setStatus('success');
      setMessage('Thank you for subscribing! Check your inbox for confirmation.');
      setEmail('');
    } catch (err) {
      setStatus('error');
      setMessage('Something went wrong. Please try again.');
    }
  };

  return (
    <section className="newsletter-section">
      <div className="container">
        <div className="newsletter-content">
          <div className="newsletter-text">
            <h2 className="newsletter-title">Subscribe to our newsletter</h2>
            <p className="newsletter-description">
              Get the latest posts and updates delivered directly to your inbox.
              No spam, unsubscribe at any time.
            </p>
          </div>
          
          <div className="newsletter-form-wrapper">
            {status === 'success' ? (
              <div className="newsletter-success">
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="success-icon">
                  <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"></path>
                  <polyline points="22 4 12 14.01 9 11.01"></polyline>
                </svg>
                <p>{message}</p>
                <button onClick={() => setStatus('idle')} className="btn-link">
                  Subscribe another email
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="newsletter-form">
                <div className="input-group">
                  <input
                    type="email"
                    placeholder="Enter your email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                    disabled={status === 'loading'}
                    className="newsletter-input"
                  />
                  <button 
                    type="submit" 
                    disabled={status === 'loading'}
                    className="btn btn-primary newsletter-btn"
                  >
                    {status === 'loading' ? 'Subscribing...' : 'Subscribe'}
                  </button>
                </div>
                {status === 'error' && <p className="error-message">{message}</p>}
              </form>
            )}
          </div>
        </div>
      </div>

      <style>{`
        .newsletter-section {
          padding: var(--spacing-3xl) 0;
          background: hsl(var(--color-muted) / 0.3);
          border-top: 1px solid hsl(var(--color-border));
        }

        .newsletter-content {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: var(--spacing-2xl);
          align-items: center;
          max-width: 1000px;
          margin: 0 auto;
        }

        .newsletter-title {
          font-size: var(--text-3xl);
          font-weight: 700;
          margin-bottom: var(--spacing-md);
          color: hsl(var(--color-foreground));
        }

        .newsletter-description {
          font-size: var(--text-lg);
          color: hsl(var(--color-muted-foreground));
          line-height: 1.6;
        }

        .newsletter-form {
          display: flex;
          flex-direction: column;
          gap: var(--spacing-sm);
        }

        .input-group {
          display: flex;
          gap: var(--spacing-md);
        }

        .newsletter-input {
          flex: 1;
          padding: 0.75rem 1rem;
          border-radius: var(--radius-lg);
          border: 1px solid hsl(var(--color-border));
          background: hsl(var(--color-background));
          color: hsl(var(--color-foreground));
          font-size: var(--text-base);
          outline: none;
          transition: border-color var(--transition-fast);
        }

        .newsletter-input:focus {
          border-color: hsl(var(--color-primary));
          box-shadow: 0 0 0 2px hsl(var(--color-primary) / 0.1);
        }

        .newsletter-btn {
          white-space: nowrap;
        }

        .newsletter-success {
          background: hsl(var(--color-background));
          border: 1px solid hsl(var(--color-success));
          border-radius: var(--radius-lg);
          padding: var(--spacing-lg);
          text-align: center;
          animation: fadeIn 0.3s ease;
        }

        .success-icon {
          color: hsl(var(--color-success));
          margin-bottom: var(--spacing-sm);
        }

        .btn-link {
          background: none;
          border: none;
          color: hsl(var(--color-primary));
          text-decoration: underline;
          cursor: pointer;
          margin-top: var(--spacing-sm);
          font-size: var(--text-sm);
        }

        .error-message {
          color: hsl(var(--color-destructive));
          font-size: var(--text-sm);
        }

        @media (max-width: 768px) {
          .newsletter-content {
            grid-template-columns: 1fr;
            gap: var(--spacing-xl);
            text-align: center;
          }

          .input-group {
            flex-direction: column;
          }

          .newsletter-btn {
            width: 100%;
          }
        }

        @keyframes fadeIn {
          from { opacity: 0; transform: translateY(10px); }
          to { opacity: 1; transform: translateY(0); }
        }
      `}</style>
    </section>
  );
}
