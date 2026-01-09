'use client'

import Link from 'next/link'
import { useSession } from 'next-auth/react'
import { useRouter } from 'next/navigation'
import { useEffect } from 'react'

export default function RubricEvidence() {
  const { data: session, status } = useSession()
  const router = useRouter()

  useEffect(() => {
    if (status === 'unauthenticated') {
      router.push('/auth/signin')
    }
  }, [status, router])

  if (status === 'loading') {
    return (
      <div className="loading-container">
        <style jsx>{`
          .loading-container {
            min-height: 100vh;
            background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
            display: flex;
            align-items: center;
            justify-content: center;
            color: white;
            font-size: 1.25rem;
          }
        `}</style>
        Loading...
      </div>
    )
  }

  return (
    <>
      <style jsx global>{`
        .rubric-page {
          min-height: 100vh;
          background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
          padding: 2rem 1rem;
          font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif;
        }
        .rubric-container {
          max-width: 1000px;
          margin: 0 auto;
        }
        .rubric-header {
          margin-bottom: 2rem;
        }
        .back-link {
          color: white;
          text-decoration: none;
          font-size: 1rem;
          opacity: 0.9;
          display: inline-block;
          margin-bottom: 1rem;
        }
        .back-link:hover {
          opacity: 1;
        }
        .staff-badge {
          display: inline-flex;
          align-items: center;
          gap: 0.5rem;
          background: #fef3c7;
          color: #92400e;
          padding: 0.5rem 1rem;
          border-radius: 20px;
          font-size: 0.875rem;
          font-weight: 600;
          margin-bottom: 1rem;
        }
        .rubric-title {
          font-size: 2.5rem;
          font-weight: 700;
          color: white;
          margin: 0 0 0.5rem 0;
        }
        .rubric-subtitle {
          font-size: 1.25rem;
          color: rgba(255,255,255,0.9);
          margin: 0 0 0.5rem 0;
        }
        .rubric-purpose {
          font-size: 1rem;
          color: rgba(255,255,255,0.8);
          font-style: italic;
          margin: 0;
        }
        .rubric-card {
          background: white;
          border-radius: 16px;
          box-shadow: 0 10px 40px rgba(0,0,0,0.2);
          margin-bottom: 1.5rem;
          overflow: hidden;
        }
        .card-header {
          display: flex;
          justify-content: space-between;
          align-items: flex-start;
          padding: 1.5rem;
          background: linear-gradient(135deg, #f8fafc, #eef2ff);
          border-bottom: 1px solid #e2e8f0;
          flex-wrap: wrap;
          gap: 1rem;
        }
        .card-title {
          font-size: 1.25rem;
          font-weight: 700;
          color: #1e293b;
          margin: 0;
        }
        .card-subtitle {
          font-size: 0.875rem;
          color: #64748b;
          margin: 0.25rem 0 0 0;
        }
        .complete-badge {
          background: #dcfce7;
          color: #166534;
          padding: 0.375rem 0.75rem;
          border-radius: 20px;
          font-size: 0.75rem;
          font-weight: 600;
          white-space: nowrap;
        }
        .card-content {
          padding: 1.5rem;
        }
        .evidence-section {
          margin-bottom: 1.5rem;
        }
        .section-title {
          font-size: 1rem;
          font-weight: 600;
          color: #374151;
          margin: 0 0 0.75rem 0;
        }
        .evidence-list {
          list-style: disc;
          padding-left: 1.5rem;
          color: #4b5563;
          line-height: 1.7;
          margin: 0;
        }
        .evidence-list li {
          margin-bottom: 0.5rem;
        }
        .nested-list {
          margin-left: 1.5rem;
          margin-top: 0.5rem;
          list-style: none;
          padding: 0;
        }
        .location-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
          gap: 1rem;
        }
        .location-item {
          background: #f8fafc;
          padding: 1rem;
          border-radius: 8px;
          border: 1px solid #e2e8f0;
        }
        .location-label {
          font-weight: 600;
          color: #6366f1;
          font-size: 0.875rem;
        }
        .location-desc {
          font-size: 0.8rem;
          color: #64748b;
          margin: 0.25rem 0 0 0;
        }
        .button-group {
          display: flex;
          flex-wrap: wrap;
          gap: 0.75rem;
          margin-top: 1rem;
        }
        .primary-btn {
          display: inline-block;
          background: linear-gradient(135deg, #6366f1, #8b5cf6);
          color: white;
          padding: 0.625rem 1.25rem;
          border-radius: 8px;
          text-decoration: none;
          font-size: 0.875rem;
          font-weight: 600;
        }
        .primary-btn:hover {
          transform: translateY(-2px);
        }
        .secondary-btn {
          display: inline-block;
          background: #f1f5f9;
          color: #475569;
          padding: 0.625rem 1.25rem;
          border-radius: 8px;
          text-decoration: none;
          font-size: 0.875rem;
          font-weight: 600;
          border: 1px solid #e2e8f0;
        }
        .code-example {
          background: #1e293b;
          border-radius: 8px;
          padding: 1rem;
          margin-top: 1rem;
          overflow-x: auto;
        }
        .code-title {
          color: #94a3b8;
          font-size: 0.75rem;
          margin: 0 0 0.5rem 0;
          font-weight: 600;
        }
        .code-block {
          color: #e2e8f0;
          font-size: 0.75rem;
          line-height: 1.6;
          margin: 0;
          font-family: Monaco, Consolas, monospace;
          white-space: pre-wrap;
        }
        .ai-features {
          margin-top: 1.5rem;
          padding: 1rem;
          background: linear-gradient(135deg, #eff6ff, #eef2ff);
          border-radius: 8px;
        }
        .feature-grid {
          display: grid;
          grid-template-columns: repeat(2, 1fr);
          gap: 0.75rem;
        }
        .feature-item {
          display: flex;
          align-items: center;
          gap: 0.5rem;
          font-size: 0.875rem;
          color: #374151;
        }
        .feature-icon {
          font-size: 1.25rem;
        }
        .navigation {
          display: flex;
          justify-content: space-between;
          margin-top: 2rem;
          flex-wrap: wrap;
          gap: 1rem;
        }
        .nav-btn {
          display: inline-block;
          background: rgba(255,255,255,0.2);
          color: white;
          padding: 0.75rem 1.5rem;
          border-radius: 8px;
          text-decoration: none;
          font-size: 1rem;
          font-weight: 600;
        }
        .nav-btn-primary {
          display: inline-block;
          background: white;
          color: #6366f1;
          padding: 0.75rem 1.5rem;
          border-radius: 8px;
          text-decoration: none;
          font-size: 1rem;
          font-weight: 600;
        }
      `}</style>

      <div className="rubric-page">
        <div className="rubric-container">
          {/* Header */}
          <div className="rubric-header">
            <Link href="/" className="back-link">← Back to Home</Link>
            
            <div className="staff-badge">
              <span>🔒</span>
              <span>LP Staff Only</span>
            </div>
            
            <h1 className="rubric-title">Rubric Evidence</h1>
            <p className="rubric-subtitle">Mapped evidence for CCC.1.1, CCC.1.2, CCC.1.3, TS.3.2, and TS.6.3</p>
            <p className="rubric-purpose">
              This page helps instructors evaluate how the project meets CCC rubric requirements.
            </p>
          </div>

          {/* CCC.1.1 - Problem Understanding */}
          <div className="rubric-card">
            <div className="card-header">
              <div>
                <h2 className="card-title">CCC.1.1 — Understand and Identify a Problem</h2>
                <p className="card-subtitle">Demonstrating deep understanding of the wellness tracking problem</p>
              </div>
              <span className="complete-badge">✓ Mastery</span>
            </div>
            
            <div className="card-content">
              <div className="evidence-section">
                <h3 className="section-title">Evidence of Mastery Level:</h3>
                <ul className="evidence-list">
                  <li><strong>Deep understanding demonstrated:</strong> The About page analyzes the mental wellness crisis, identifying that stress affects 77% of Americans with physical symptoms and explaining the context of why traditional tracking fails.</li>
                  <li><strong>Constraints planned:</strong> Identified constraints include user inconsistency, data overload without insights, and barriers to accessing professional help.</li>
                  <li><strong>Future challenges recognized:</strong> Addressed in the solution design - scalability, data privacy, and maintaining user engagement over time.</li>
                  <li><strong>Previous solutions evaluated:</strong> Explained why generic journaling apps fail (no AI, no patterns, no actionable insights) and why WellTrack improves on them.</li>
                  <li><strong>Solution options assessed:</strong> Chose AI-powered analysis over manual tracking, considering urgency of mental health crisis, complexity of pattern recognition, and available resources.</li>
                </ul>
              </div>

              <div className="evidence-section">
                <h3 className="section-title">Where to Find Evidence:</h3>
                <div className="location-grid">
                  <div className="location-item">
                    <span className="location-label">About Page</span>
                    <p className="location-desc">Problem explanation, constraints, and impact analysis</p>
                  </div>
                  <div className="location-item">
                    <span className="location-label">README.md</span>
                    <p className="location-desc">Problem Summary section with context</p>
                  </div>
                </div>
              </div>

              <div className="button-group">
                <Link href="/about" className="primary-btn">View About Page</Link>
                <a href="https://github.com/Jayisacoder/WellTrack/blob/main/README.md" target="_blank" rel="noopener noreferrer" className="secondary-btn">View README Section</a>
              </div>
            </div>
          </div>

          {/* CCC.1.2 - Solution Planning */}
          <div className="rubric-card">
            <div className="card-header">
              <div>
                <h2 className="card-title">CCC.1.2 — Identify and Plan a Solution</h2>
                <p className="card-subtitle">Demonstrating innovative solution planning with Agile methodology</p>
              </div>
              <span className="complete-badge">✓ Mastery</span>
            </div>
            
            <div className="card-content">
              <div className="evidence-section">
                <h3 className="section-title">Evidence of Mastery Level:</h3>
                <ul className="evidence-list">
                  <li><strong>Innovative solution identified:</strong> AI-powered wellness tracking that addresses technical limitations (API rate limits handled with fallbacks) and resource constraints (local analysis when external AI unavailable).</li>
                  <li><strong>Detailed implementation plan:</strong> Six-step methodology documented: Research → Wireframe → Database Design → Core Features → AI Integration → Testing.</li>
                  <li><strong>Agile methodology used:</strong> Project tracked with sprints, stories broken into tasks, iterative development with continuous refinement.</li>
                  <li><strong>Potential challenges addressed:</strong> Planned for API failures with fallback system, database limitations with Prisma ORM, and time constraints with MVP-focused scope.</li>
                  <li><strong>Plan adapted to challenges:</strong> Documentation reflects changes made (e.g., switching AI providers, simplifying badge system, adjusting UI based on testing).</li>
                </ul>
              </div>

              <div className="evidence-section">
                <h3 className="section-title">Where to Find Evidence:</h3>
                <div className="location-grid">
                  <div className="location-item">
                    <span className="location-label">Why WellTrack Page</span>
                    <p className="location-desc">Solution approach and planning methodology</p>
                  </div>
                  <div className="location-item">
                    <span className="location-label">Project Plan</span>
                    <p className="location-desc">Trello/task board with sprints and stories</p>
                  </div>
                  <div className="location-item">
                    <span className="location-label">Wireframes</span>
                    <p className="location-desc">Figma/Excalidraw design documentation</p>
                  </div>
                </div>
              </div>

              <div className="button-group">
                <Link href="/why-welltrack" className="primary-btn">View Why WellTrack</Link>
                <a href="https://trello.com" target="_blank" rel="noopener noreferrer" className="secondary-btn">Open Project Plan</a>
                <a href="https://figma.com" target="_blank" rel="noopener noreferrer" className="secondary-btn">Open Wireframes</a>
              </div>
            </div>
          </div>

          {/* CCC.1.3 - Implement a Solution */}
          <div className="rubric-card">
            <div className="card-header">
              <div>
                <h2 className="card-title">CCC.1.3 — Implement a Solution</h2>
                <p className="card-subtitle">Demonstrating effective implementation with multiple best practices</p>
              </div>
              <span className="complete-badge">✓ Mastery</span>
            </div>
            
            <div className="card-content">
              <div className="evidence-section">
                <h3 className="section-title">Evidence of Mastery Level:</h3>
                <ul className="evidence-list">
                  <li><strong>Industry-accepted method:</strong> Agile/DevOps approach with iterative development, continuous integration, and component-based architecture.</li>
                  <li><strong>Effective & efficient implementation:</strong> Clean code structure, reusable components, optimized database queries with Prisma, and responsive design.</li>
                  <li><strong>Variety of tools applied:</strong>
                    <ul className="nested-list">
                      <li>• Next.js 16 (App Router) - Modern React framework</li>
                      <li>• Prisma ORM - Type-safe database access</li>
                      <li>• NextAuth.js - Secure authentication</li>
                      <li>• OpenAI/Gemini APIs - AI integration</li>
                      <li>• PostgreSQL (Neon) - Cloud database</li>
                      <li>• Tailwind CSS - Utility-first styling</li>
                      <li>• bcryptjs - Password hashing</li>
                    </ul>
                  </li>
                  <li><strong>Best practices implemented:</strong> Role-based access control, API error handling with fallbacks, responsive design, accessibility considerations, secure password storage.</li>
                </ul>
              </div>

              <div className="evidence-section">
                <h3 className="section-title">Where to Find Evidence:</h3>
                <div className="location-grid">
                  <div className="location-item">
                    <span className="location-label">Features Page</span>
                    <p className="location-desc">Complete feature documentation with AI justification</p>
                  </div>
                  <div className="location-item">
                    <span className="location-label">Product Page</span>
                    <p className="location-desc">Working MVP with all functionality</p>
                  </div>
                </div>
              </div>

              <div className="button-group">
                <Link href="/features" className="primary-btn">View Features</Link>
                <Link href="/product" className="primary-btn">Open Product</Link>
              </div>
            </div>
          </div>

          {/* TS.3.2 - Handle Web Servers */}
          <div className="rubric-card">
            <div className="card-header">
              <div>
                <h2 className="card-title">TS.3.2 — Handle Web Servers</h2>
                <p className="card-subtitle">Request/response handling, routing, authentication, and middleware</p>
              </div>
              <span className="complete-badge">✓ Complete</span>
            </div>
            
            <div className="card-content">
              <div className="evidence-section">
                <h3 className="section-title">Evidence:</h3>
                <ul className="evidence-list">
                  <li><strong>Request/Response Handling:</strong> API routes in /api/entries, /api/analyze, /api/chat, and /api/register handle POST/GET requests with proper JSON parsing and response formatting.</li>
                  <li><strong>Form Data Processing:</strong> Wellness entry form collects mood, stress, sleep, exercise, activities, and notes - all validated and stored in PostgreSQL.</li>
                  <li><strong>File Routing:</strong> Next.js App Router with organized page structure (/, /about, /product, /features, etc.) and API routes (/api/*).</li>
                  <li><strong>Authentication:</strong> NextAuth.js with credentials provider, JWT tokens, session management, and protected route handling.</li>
                  <li><strong>Middleware:</strong> Custom middleware.js intercepts requests to /rubric-evidence and /reflection, validates JWT tokens, checks user roles against LP_STAFF_EMAILS, and redirects unauthorized users.</li>
                </ul>
              </div>

              <div className="code-example">
                <h4 className="code-title">Middleware Example (middleware.js):</h4>
                <pre className="code-block">{`// Protect LP Staff pages
const protectedRoutes = ['/rubric-evidence', '/reflection']

if (protectedRoutes.some(route => pathname.startsWith(route))) {
  const token = await getToken({ 
    req: request, 
    secret: process.env.NEXTAUTH_SECRET 
  })
  
  if (!token) {
    return NextResponse.redirect(new URL('/auth/signin', request.url))
  }
  
  const lpStaffEmails = process.env.LP_STAFF_EMAILS?.split(',')
  if (!lpStaffEmails.includes(token.email)) {
    return NextResponse.redirect(new URL('/unauthorized', request.url))
  }
}`}</pre>
              </div>
            </div>
          </div>

          {/* TS.6.3 - Integrate AI Tools */}
          <div className="rubric-card">
            <div className="card-header">
              <div>
                <h2 className="card-title">TS.6.3 — Integrate AI Tools</h2>
                <p className="card-subtitle">Using APIs and AI models to create AI-powered solutions</p>
              </div>
              <span className="complete-badge">✓ Complete</span>
            </div>
            
            <div className="card-content">
              <div className="evidence-section">
                <h3 className="section-title">Evidence:</h3>
                <ul className="evidence-list">
                  <li><strong>OpenAI API Integration:</strong> GPT-4o-mini used for wellness analysis and chatbot responses via /api/analyze and /api/chat endpoints.</li>
                  <li><strong>Gemini API Fallback:</strong> Google Gemini 2.0 Flash as backup when OpenAI quota exceeded.</li>
                  <li><strong>AI-Powered Analysis:</strong> Analyzes user mood, stress, sleep, and exercise data to generate personalized insights and recommendations.</li>
                  <li><strong>Wellness Chatbot:</strong> Interactive AI assistant that answers questions about sleep, stress management, exercise, and mental wellness.</li>
                  <li><strong>Local Fallback:</strong> When external APIs fail, smart local analysis provides contextual insights based on user data patterns.</li>
                </ul>
              </div>

              <div className="code-example">
                <h4 className="code-title">AI Integration Example (/api/analyze/route.js):</h4>
                <pre className="code-block">{`// Call OpenAI for wellness analysis
const response = await fetch('https://api.openai.com/v1/chat/completions', {
  method: 'POST',
  headers: {
    'Content-Type': 'application/json',
    'Authorization': \`Bearer \${process.env.OPENAI_API_KEY}\`
  },
  body: JSON.stringify({
    model: 'gpt-4o-mini',
    messages: [
      { role: 'system', content: systemPrompt },
      { role: 'user', content: userDataPrompt }
    ],
    temperature: 0.7,
    max_tokens: 300
  })
})`}</pre>
              </div>

              <div className="ai-features">
                <h4 className="section-title">AI Features in Product:</h4>
                <div className="feature-grid">
                  <div className="feature-item">
                    <span className="feature-icon">🤖</span>
                    <span>Post-entry AI insights</span>
                  </div>
                  <div className="feature-item">
                    <span className="feature-icon">💬</span>
                    <span>Interactive wellness chatbot</span>
                  </div>
                  <div className="feature-item">
                    <span className="feature-icon">📊</span>
                    <span>Pattern recognition</span>
                  </div>
                  <div className="feature-item">
                    <span className="feature-icon">💡</span>
                    <span>Personalized recommendations</span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Navigation */}
          <div className="navigation">
            <Link href="/product" className="nav-btn">← Back to Dashboard</Link>
            <Link href="/reflection" className="nav-btn-primary">View Reflection →</Link>
          </div>
        </div>
      </div>
    </>
  )
}
