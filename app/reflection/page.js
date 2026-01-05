'use client'

import Link from 'next/link'
import { useSession } from 'next-auth/react'
import { useRouter } from 'next/navigation'
import { useEffect } from 'react'

export default function Reflection() {
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
        .reflection-page {
          min-height: 100vh;
          background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
          padding: 2rem 1rem;
          font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif;
        }
        .reflection-container {
          max-width: 900px;
          margin: 0 auto;
        }
        .reflection-header {
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
        .reflection-title {
          font-size: 2.5rem;
          font-weight: 700;
          color: white;
          margin: 0 0 0.5rem 0;
        }
        .reflection-subtitle {
          font-size: 1.25rem;
          color: rgba(255,255,255,0.9);
          margin: 0 0 0.5rem 0;
        }
        .reflection-purpose {
          font-size: 1rem;
          color: rgba(255,255,255,0.8);
          font-style: italic;
          margin: 0;
        }
        .reflection-card {
          background: white;
          border-radius: 16px;
          box-shadow: 0 10px 40px rgba(0,0,0,0.2);
          margin-bottom: 1.5rem;
          overflow: hidden;
        }
        .card-header {
          display: flex;
          justify-content: space-between;
          align-items: center;
          padding: 1.5rem;
          background: linear-gradient(135deg, #f8fafc, #eef2ff);
          border-bottom: 1px solid #e2e8f0;
        }
        .card-icon {
          font-size: 2rem;
          margin-right: 1rem;
        }
        .header-content {
          flex: 1;
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
        .card-content {
          padding: 1.5rem;
        }
        .reflection-list {
          list-style: disc;
          padding-left: 1.5rem;
          color: #4b5563;
          line-height: 1.8;
          margin: 0;
        }
        .reflection-list li {
          margin-bottom: 0.75rem;
        }
        .highlight {
          background: #fef3c7;
          padding: 0.125rem 0.375rem;
          border-radius: 4px;
          font-weight: 600;
        }
        .code-mention {
          background: #f1f5f9;
          font-family: Monaco, Consolas, monospace;
          padding: 0.125rem 0.375rem;
          border-radius: 4px;
          font-size: 0.875rem;
        }
        .challenge-item {
          background: #fef2f2;
          border-left: 4px solid #ef4444;
          padding: 1rem;
          margin-bottom: 1rem;
          border-radius: 0 8px 8px 0;
        }
        .challenge-title {
          font-weight: 700;
          color: #991b1b;
          margin-bottom: 0.5rem;
        }
        .challenge-text {
          color: #7f1d1d;
          margin: 0;
        }
        .solution-badge {
          display: inline-block;
          background: #dcfce7;
          color: #166534;
          font-size: 0.75rem;
          padding: 0.25rem 0.5rem;
          border-radius: 4px;
          margin-top: 0.5rem;
        }
        .change-item {
          display: flex;
          align-items: flex-start;
          gap: 1rem;
          padding: 1rem;
          background: #f8fafc;
          border-radius: 8px;
          margin-bottom: 0.75rem;
        }
        .change-icon {
          font-size: 1.5rem;
          flex-shrink: 0;
        }
        .change-content h4 {
          font-weight: 600;
          color: #1e293b;
          margin: 0 0 0.25rem 0;
        }
        .change-content p {
          color: #64748b;
          margin: 0;
          font-size: 0.9rem;
        }
        .future-grid {
          display: grid;
          gap: 1rem;
        }
        .future-item {
          display: flex;
          gap: 1rem;
          padding: 1rem;
          background: linear-gradient(135deg, #eff6ff, #eef2ff);
          border-radius: 8px;
          border: 1px solid #c7d2fe;
        }
        .future-icon {
          font-size: 2rem;
          flex-shrink: 0;
        }
        .future-content h4 {
          font-weight: 600;
          color: #3730a3;
          margin: 0 0 0.25rem 0;
        }
        .future-content p {
          color: #4338ca;
          margin: 0;
          font-size: 0.9rem;
        }
        .summary-box {
          background: linear-gradient(135deg, #667eea, #764ba2);
          border-radius: 12px;
          padding: 1.5rem;
          color: white;
          margin-top: 2rem;
        }
        .summary-title {
          font-size: 1.25rem;
          font-weight: 700;
          margin: 0 0 1rem 0;
        }
        .summary-text {
          font-size: 1rem;
          line-height: 1.7;
          margin: 0;
          opacity: 0.95;
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

      <div className="reflection-page">
        <div className="reflection-container">
          {/* Header */}
          <div className="reflection-header">
            <Link href="/" className="back-link">← Back to Home</Link>
            
            <div className="staff-badge">
              <span>🔒</span>
              <span>LP Staff Only</span>
            </div>
            
            <h1 className="reflection-title">Developer Reflection</h1>
            <p className="reflection-subtitle">Insights from building WellTrack</p>
            <p className="reflection-purpose">
              Honest reflection on the development process, challenges, and learning outcomes.
            </p>
          </div>

          {/* Section A: What Went Well */}
          <div className="reflection-card">
            <div className="card-header">
              <span className="card-icon">✅</span>
              <div className="header-content">
                <h2 className="card-title">Section A: What Went Well</h2>
                <p className="card-subtitle">Successes and achievements during development</p>
              </div>
            </div>
            
            <div className="card-content">
              <ul className="reflection-list">
                <li>
                  <strong>AI Integration with Fallbacks:</strong> Successfully implemented a 3-tier AI system (OpenAI → Gemini → Local) that ensures users always receive insights, even when external APIs fail or hit rate limits.
                </li>
                <li>
                  <strong>Role-Based Access Control:</strong> The middleware-based RBA system works seamlessly, protecting LP Staff pages while maintaining a smooth user experience for regular users.
                </li>
                <li>
                  <strong>Gamification System:</strong> The badge/achievement system with <span className="highlight">6 collectible badges</span> adds motivation and engagement beyond basic tracking.
                </li>
                <li>
                  <strong>Responsive Dashboard Layout:</strong> The 3-column grid design adapts well to different screen sizes while keeping all important features visible.
                </li>
                <li>
                  <strong>Database Design:</strong> Using <span className="code-mention">Prisma</span> with PostgreSQL (Neon) made schema management and queries straightforward.
                </li>
                <li>
                  <strong>Interactive Chatbot:</strong> The wellness chatbot provides real-time AI assistance for user questions about health and wellness.
                </li>
                <li>
                  <strong>Clean Code Structure:</strong> Organized project structure with clear separation between pages, API routes, and utilities.
                </li>
              </ul>
            </div>
          </div>

          {/* Section B: What Didn't Go Well */}
          <div className="reflection-card">
            <div className="card-header">
              <span className="card-icon">⚠️</span>
              <div className="header-content">
                <h2 className="card-title">Section B: What Didn't Go Well</h2>
                <p className="card-subtitle">Challenges, constraints, and areas for improvement</p>
              </div>
            </div>
            
            <div className="card-content">
              <div className="challenge-item">
                <div className="challenge-title">API Rate Limits</div>
                <p className="challenge-text">
                  OpenAI's free tier rate limits were hit quickly during testing, causing the AI insights to fail unexpectedly. Had to research and implement Gemini as a fallback.
                </p>
                <span className="solution-badge">✓ Solved with multi-provider fallback</span>
              </div>

              <div className="challenge-item">
                <div className="challenge-title">Time Constraints</div>
                <p className="challenge-text">
                  Limited time meant prioritizing core MVP features over advanced visualizations like charts and trend graphs that were originally planned.
                </p>
                <span className="solution-badge">✓ Focused on essential features</span>
              </div>

              <div className="challenge-item">
                <div className="challenge-title">Layout Complexity</div>
                <p className="challenge-text">
                  Balancing the dashboard layout to show form, chatbot, badges, and stats without overwhelming users took multiple iterations.
                </p>
                <span className="solution-badge">✓ Refined with 3-column grid</span>
              </div>

              <div className="challenge-item">
                <div className="challenge-title">Badge Logic Issues</div>
                <p className="challenge-text">
                  Initially counted total entries instead of unique days for badges, causing incorrect progress. Required debugging and logic refinement.
                </p>
                <span className="solution-badge">✓ Fixed with unique day counting</span>
              </div>
            </div>
          </div>

          {/* Section C: Changes Made During Project */}
          <div className="reflection-card">
            <div className="card-header">
              <span className="card-icon">🔄</span>
              <div className="header-content">
                <h2 className="card-title">Section C: Changes Made During Development</h2>
                <p className="card-subtitle">How the project evolved from initial plan</p>
              </div>
            </div>
            
            <div className="card-content">
              <div className="change-item">
                <span className="change-icon">🤖</span>
                <div className="change-content">
                  <h4>Added AI Fallback System</h4>
                  <p>Original plan was OpenAI only. Added Gemini and local fallback after hitting rate limits during testing.</p>
                </div>
              </div>

              <div className="change-item">
                <span className="change-icon">💬</span>
                <div className="change-content">
                  <h4>Added Wellness Chatbot</h4>
                  <p>Chatbot wasn't in initial scope. Added it to provide interactive AI assistance beyond post-entry insights.</p>
                </div>
              </div>

              <div className="change-item">
                <span className="change-icon">🏆</span>
                <div className="change-content">
                  <h4>Expanded Badge System</h4>
                  <p>Started with 3 basic badges, expanded to 6 with progress bars and trophy case display.</p>
                </div>
              </div>

              <div className="change-item">
                <span className="change-icon">📊</span>
                <div className="change-content">
                  <h4>Simplified Visualizations</h4>
                  <p>Removed planned Chart.js graphs in favor of simpler stats snapshot. Made the UI cleaner and faster.</p>
                </div>
              </div>

              <div className="change-item">
                <span className="change-icon">🎨</span>
                <div className="change-content">
                  <h4>Redesigned Dashboard Layout</h4>
                  <p>Changed from single-column to 3-column grid layout to better utilize screen space and show more information at once.</p>
                </div>
              </div>

              <div className="change-item">
                <span className="change-icon">📅</span>
                <div className="change-content">
                  <h4>Added Daily Logging Check</h4>
                  <p>Added "already logged today" detection to encourage consistent daily tracking without duplicate entries.</p>
                </div>
              </div>
            </div>
          </div>

          {/* Section D: What I'd Build Next */}
          <div className="reflection-card">
            <div className="card-header">
              <span className="card-icon">🚀</span>
              <div className="header-content">
                <h2 className="card-title">Section D: What I'd Build Next</h2>
                <p className="card-subtitle">Future features and improvements</p>
              </div>
            </div>
            
            <div className="card-content">
              <div className="future-grid">
                <div className="future-item">
                  <span className="future-icon">📈</span>
                  <div className="future-content">
                    <h4>Interactive Data Visualizations</h4>
                    <p>Add Chart.js or Recharts for mood trends, sleep patterns, and stress correlation graphs over time.</p>
                  </div>
                </div>

                <div className="future-item">
                  <span className="future-icon">📱</span>
                  <div className="future-content">
                    <h4>Mobile App (React Native)</h4>
                    <p>Build a native mobile app for easier daily check-ins with push notification reminders.</p>
                  </div>
                </div>

                <div className="future-item">
                  <span className="future-icon">⌚</span>
                  <div className="future-content">
                    <h4>Wearable Integration</h4>
                    <p>Connect to Apple Watch, Fitbit, or Garmin to automatically import sleep and exercise data.</p>
                  </div>
                </div>

                <div className="future-item">
                  <span className="future-icon">👥</span>
                  <div className="future-content">
                    <h4>Community Features</h4>
                    <p>Add optional anonymous sharing, wellness challenges, and accountability partners.</p>
                  </div>
                </div>

                <div className="future-item">
                  <span className="future-icon">🧠</span>
                  <div className="future-content">
                    <h4>Advanced AI Predictions</h4>
                    <p>Use machine learning to predict stress spikes and suggest preventive actions based on patterns.</p>
                  </div>
                </div>

                <div className="future-item">
                  <span className="future-icon">🔔</span>
                  <div className="future-content">
                    <h4>Smart Reminders</h4>
                    <p>AI-powered reminders that adapt timing based on when users typically log their entries.</p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Summary */}
          <div className="summary-box">
            <h3 className="summary-title">Final Thoughts</h3>
            <p className="summary-text">
              Building WellTrack taught me valuable lessons about API integration, error handling, and iterative development. The biggest takeaway was the importance of fallback systems—when external services fail, users shouldn't suffer. The project also reinforced that a simple, working solution aligned with requirements beats an ambitious project that doesn't meet the core objectives. I'm proud of what was accomplished within the constraints and excited about the potential for future development.
            </p>
          </div>

          {/* Navigation */}
          <div className="navigation">
            <Link href="/rubric-evidence" className="nav-btn">← Back to Rubric Evidence</Link>
            <Link href="/product" className="nav-btn-primary">View Product →</Link>
          </div>
        </div>
      </div>
    </>
  )
}
