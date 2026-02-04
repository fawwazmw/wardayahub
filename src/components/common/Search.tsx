import React, { useState, useEffect, useRef } from 'react';

type SearchResult = {
  title: string;
  slug: string;
  description: string;
  category: string;
  publishedAt: string;
};

export default function Search() {
  const [isOpen, setIsOpen] = useState(false);
  const [query, setQuery] = useState('');
  const [results, setResults] = useState<SearchResult[]>([]);
  const [allPosts, setAllPosts] = useState<SearchResult[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);
  const modalRef = useRef<HTMLDivElement>(null);

  // Close on Escape key
  useEffect(() => {
    const handleEsc = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setIsOpen(false);
      if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
        e.preventDefault();
        setIsOpen(prev => !prev);
      }
    };
    window.addEventListener('keydown', handleEsc);
    return () => window.removeEventListener('keydown', handleEsc);
  }, []);

  // Focus input when opened
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
      setTimeout(() => inputRef.current?.focus(), 50);
      
      // Lazy load index
      if (allPosts.length === 0) {
        setIsLoading(true);
        fetch('/search.json')
          .then(res => res.json())
          .then(data => {
            setAllPosts(data);
            setIsLoading(false);
          })
          .catch(err => {
            console.error('Failed to load search index', err);
            setIsLoading(false);
          });
      }
    } else {
      document.body.style.overflow = '';
      setQuery('');
      setResults([]);
    }
  }, [isOpen]);

  // Handle search
  useEffect(() => {
    if (query.trim() === '') {
      setResults([]);
      return;
    }

    const searchTerms = query.toLowerCase().split(' ');
    const filtered = allPosts.filter(post => {
      const titleMatch = searchTerms.every(term => post.title.toLowerCase().includes(term));
      const descMatch = searchTerms.every(term => post.description?.toLowerCase().includes(term));
      return titleMatch || descMatch;
    }).slice(0, 5); // Limit to 5 results

    setResults(filtered);
  }, [query, allPosts]);

  // Close on click outside
  const handleBackdropClick = (e: React.MouseEvent) => {
    if (modalRef.current && !modalRef.current.contains(e.target as Node)) {
      setIsOpen(false);
    }
  };

  return (
    <>
      <button
        onClick={() => setIsOpen(true)}
        className="search-trigger"
        aria-label="Search posts"
      >
        <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <circle cx="11" cy="11" r="8"></circle>
          <line x1="21" y1="21" x2="16.65" y2="16.65"></line>
        </svg>
      </button>

      {isOpen && (
        <div className="search-backdrop" onClick={handleBackdropClick}>
          <div className="search-modal" ref={modalRef}>
            <div className="search-header">
              <svg className="search-icon" xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <circle cx="11" cy="11" r="8"></circle>
                <line x1="21" y1="21" x2="16.65" y2="16.65"></line>
              </svg>
              <input
                ref={inputRef}
                type="text"
                placeholder="Search articles..."
                value={query}
                onChange={e => setQuery(e.target.value)}
                className="search-input"
              />
              <button onClick={() => setIsOpen(false)} className="close-btn">
                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <line x1="18" y1="6" x2="6" y2="18"></line>
                  <line x1="6" y1="6" x2="18" y2="18"></line>
                </svg>
              </button>
            </div>

            <div className="search-results">
              {isLoading && <div className="search-status">Loading index...</div>}
              
              {!isLoading && query && results.length === 0 && (
                <div className="search-status">No results found for "{query}"</div>
              )}

              {!isLoading && !query && (
                <div className="search-status helpful-text">
                  Type to search...
                </div>
              )}

              {results.map((post) => (
                <a 
                  key={post.slug} 
                  href={`/blog/${post.slug}`} 
                  className="search-result-item"
                  onClick={() => setIsOpen(false)}
                >
                  <div className="result-content">
                    <h4 className="result-title">{post.title}</h4>
                    <span className="result-category">{post.category}</span>
                  </div>
                  <svg className="result-arrow" xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <polyline points="9 18 15 12 9 6"></polyline>
                  </svg>
                </a>
              ))}
            </div>
            
            <div className="search-footer">
              <span className="shortcut-hint">
                <kbd>ESC</kbd> to close
              </span>
            </div>
          </div>
        </div>
      )}
      
      <style>{`
        .search-trigger {
          background: none;
          border: none;
          cursor: pointer;
          padding: 0.5rem;
          color: hsl(var(--color-muted-foreground));
          border-radius: var(--radius-md);
          transition: all var(--transition-fast);
          display: flex;
          align-items: center;
          justify-content: center;
        }
        
        .search-trigger:hover {
          color: hsl(var(--color-foreground));
          background-color: hsl(var(--color-accent));
        }

        .search-backdrop {
          position: fixed;
          inset: 0;
          background: rgba(0, 0, 0, 0.5);
          backdrop-filter: blur(2px);
          z-index: 100;
          display: flex;
          justify-content: center;
          align-items: flex-start;
          padding-top: 10vh;
          animation: fadeIn 0.2s ease-out;
        }

        .search-modal {
          width: 90%;
          max-width: 600px;
          background: hsl(var(--color-background));
          border: 1px solid hsl(var(--color-border));
          border-radius: var(--radius-xl);
          box-shadow: var(--shadow-2xl);
          display: flex;
          flex-direction: column;
          overflow: hidden;
          animation: slideDown 0.2s ease-out;
        }

        .search-header {
          display: flex;
          align-items: center;
          padding: var(--spacing-md) var(--spacing-lg);
          border-bottom: 1px solid hsl(var(--color-border));
          gap: var(--spacing-md);
        }

        .search-icon {
          color: hsl(var(--color-muted-foreground));
        }

        .search-input {
          flex: 1;
          border: none;
          background: none;
          font-size: var(--text-lg);
          color: hsl(var(--color-foreground));
          outline: none;
          padding: var(--spacing-sm) 0;
        }

        .close-btn {
          background: none;
          border: none;
          cursor: pointer;
          color: hsl(var(--color-muted-foreground));
          padding: var(--spacing-xs);
        }
        
        .close-btn:hover {
          color: hsl(var(--color-foreground));
        }

        .search-results {
          max-height: 400px;
          overflow-y: auto;
          padding: var(--spacing-sm);
        }

        .search-status {
          padding: var(--spacing-xl);
          text-align: center;
          color: hsl(var(--color-muted-foreground));
          font-size: var(--text-sm);
        }

        .search-result-item {
          display: flex;
          align-items: center;
          justify-content: space-between;
          padding: var(--spacing-md) var(--spacing-lg);
          text-decoration: none;
          border-radius: var(--radius-md);
          transition: background-color var(--transition-fast);
          margin-bottom: var(--spacing-xs);
        }

        .search-result-item:hover {
          background-color: hsl(var(--color-accent));
        }

        .result-content {
          display: flex;
          flex-direction: column;
          gap: 2px;
        }

        .result-title {
          font-size: var(--text-base);
          font-weight: 500;
          color: hsl(var(--color-foreground));
          margin: 0;
        }

        .result-category {
          font-size: var(--text-xs);
          color: hsl(var(--color-muted-foreground));
        }

        .result-arrow {
          color: hsl(var(--color-muted-foreground));
          opacity: 0;
          transition: all var(--transition-fast);
        }

        .search-result-item:hover .result-arrow {
          opacity: 1;
          transform: translateX(4px);
        }

        .search-footer {
          padding: var(--spacing-sm) var(--spacing-lg);
          background: hsl(var(--color-muted) / 0.3);
          border-top: 1px solid hsl(var(--color-border));
          font-size: var(--text-xs);
          color: hsl(var(--color-muted-foreground));
          display: flex;
          justify-content: flex-end;
        }

        kbd {
          background: hsl(var(--color-muted));
          border: 1px solid hsl(var(--color-border));
          border-radius: 4px;
          padding: 2px 4px;
          font-family: monospace;
          font-size: 10px;
        }

        @keyframes fadeIn {
          from { opacity: 0; }
          to { opacity: 1; }
        }

        @keyframes slideDown {
          from { transform: translateY(-10px); opacity: 0; }
          to { transform: translateY(0); opacity: 1; }
        }
      `}</style>
    </>
  );
}
