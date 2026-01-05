'use client'

import { useState, useEffect } from 'react'
import { useSession, signOut } from 'next-auth/react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'

export default function Product() {
  const { data: session, status } = useSession()
  const router = useRouter()
  const [entries, setEntries] = useState([])
  const [loading, setLoading] = useState(false)
  const [aiInsights, setAiInsights] = useState(null)
  const [insightsLoading, setInsightsLoading] = useState(false)
  const [insightEntryDate, setInsightEntryDate] = useState(null)
  
  // Chatbot state
  const [chatMessages, setChatMessages] = useState([
    { role: 'assistant', content: "Hi! I'm your wellness assistant. Ask me anything about health, stress management, sleep tips, or your wellness journey!" }
  ])
  const [chatInput, setChatInput] = useState('')
  const [chatLoading, setChatLoading] = useState(false)
  
  const [formData, setFormData] = useState({
    mood: 5,
    stress: 5,
    sleep: 7,
    exercise: false,
    activities: '',
    notes: ''
  })

  useEffect(() => {
    if (status === 'unauthenticated') {
      router.push('/auth/signin')
    }
  }, [status, router])

  useEffect(() => {
    if (session?.user) {
      fetchEntries()
    }
  }, [session])

  const fetchEntries = async () => {
    try {
      const res = await fetch('/api/entries')
      if (res.ok) {
        const data = await res.json()
        setEntries(data)
        
        // Load the most recent AI insights from stored entries
        const latestWithInsights = data.find(entry => entry.aiInsights)
        if (latestWithInsights && latestWithInsights.aiInsights) {
          setAiInsights(latestWithInsights.aiInsights)
          setInsightEntryDate(latestWithInsights.createdAt)
        }
      }
    } catch (error) {
      console.error('Failed to fetch entries:', error)
    }
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setLoading(true)
    
    try {
      console.log('Submitting form data:', formData)
      
      const res = await fetch('/api/entries', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData)
      })

      console.log('Response status:', res.status)

      if (res.ok) {
        const newEntry = await res.json()
        console.log('New entry created:', newEntry)
        setEntries([newEntry, ...entries])
        
        const aiRes = await fetch('/api/analyze', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ entryId: newEntry.id })
        })

        if (aiRes.ok) {
          const aiData = await aiRes.json()
          setAiInsights(aiData.insights)
        }

        setFormData({
          mood: 5,
          stress: 5,
          sleep: 7,
          exercise: false,
          activities: '',
          notes: ''
        })
      } else {
        const errorData = await res.json()
        console.error('Server error:', errorData)
        alert(`Error: ${errorData.error || 'Failed to save entry'}`)
      }
    } catch (error) {
      console.error('Error submitting entry:', error)
      alert('Failed to save entry. Please try again.')
    } finally {
      setLoading(false)
    }
  }

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }))
  }

  // Handle chat message
  const handleChatSubmit = async (e) => {
    e.preventDefault()
    if (!chatInput.trim() || chatLoading) return

    const userMessage = chatInput.trim()
    setChatInput('')
    setChatMessages(prev => [...prev, { role: 'user', content: userMessage }])
    setChatLoading(true)

    try {
      const res = await fetch('/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ 
          message: userMessage,
          context: entries.length > 0 ? {
            recentMood: entries[0]?.mood,
            recentSleep: entries[0]?.sleep,
            recentStress: entries[0]?.stress,
            totalEntries: entries.length
          } : null
        })
      })

      if (res.ok) {
        const data = await res.json()
        setChatMessages(prev => [...prev, { role: 'assistant', content: data.response }])
      } else {
        setChatMessages(prev => [...prev, { 
          role: 'assistant', 
          content: "I'm having trouble connecting right now. Try asking about sleep tips, stress management, or exercise benefits!" 
        }])
      }
    } catch (error) {
      console.error('Chat error:', error)
      setChatMessages(prev => [...prev, { 
        role: 'assistant', 
        content: "Connection issue. Here's a tip: Taking deep breaths for 2 minutes can help reduce stress!" 
      }])
    } finally {
      setChatLoading(false)
    }
  }

  if (status === 'loading') {
    return (
      <>
        <style jsx global>{globalStyles}</style>
        <div className="dashboard-page">
          <div className="loading-screen">Loading...</div>
        </div>
      </>
    )
  }

  if (!session) {
    return null
  }

  // Check if user already logged today
  const today = new Date().toDateString()
  const todayEntry = entries.find(e => new Date(e.createdAt).toDateString() === today)
  const hasLoggedToday = !!todayEntry

  // Count unique days (not total entries)
  const uniqueDays = [...new Set(entries.map(e => 
    new Date(e.createdAt).toDateString()
  ))].length

  // Count unique days with exercise
  const exerciseDays = [...new Set(
    entries.filter(e => e.exercise).map(e => new Date(e.createdAt).toDateString())
  )].length

  // Count unique days with good sleep
  const goodSleepDays = [...new Set(
    entries.filter(e => e.sleep >= 7).map(e => new Date(e.createdAt).toDateString())
  )].length

  // Count unique days with low stress
  const lowStressDays = [...new Set(
    entries.filter(e => e.stress <= 3).map(e => new Date(e.createdAt).toDateString())
  )].length

  // Count unique days with high mood
  const highMoodDays = [...new Set(
    entries.filter(e => e.mood >= 8).map(e => new Date(e.createdAt).toDateString())
  )].length

  // Check if user is LP Staff
  const lpStaffEmails = ['rob@launchpadphilly.org', 'sanaa@launchpadphilly.org', 'taheera@launchpadphilly.org']
  const isLPStaff = session?.user?.email && lpStaffEmails.includes(session.user.email)

  return (
    <>
      <style jsx global>{globalStyles}</style>
      <div className="dashboard-page">
        <div className="background-pattern"></div>
        
        <div className="container">
          <div className="top-nav">
            <Link href="/" className="back-link">← Back to Home</Link>
            <div className="top-nav-right">
              {isLPStaff && (
                <div className="staff-nav">
                  <span className="staff-badge">🔒 LP Staff</span>
                  <Link href="/rubric-evidence" className="staff-link">Rubric Evidence</Link>
                  <Link href="/reflection" className="staff-link">Reflection</Link>
                </div>
              )}
              <button onClick={() => signOut({ callbackUrl: '/' })} className="logout-btn">
                Sign Out
              </button>
            </div>
          </div>
          
          <div className="header">
            <h1>WellTrack Dashboard</h1>
            <p>Welcome back, {session.user.name || session.user.email}!</p>
          </div>

          <div className="dashboard-grid">
            {/* Left Column - Form & Stats */}
            <div className="column left-column">
              <div className="card">
                <h2>Log Today&apos;s Wellness</h2>
              
              {hasLoggedToday ? (
                <div className="already-logged">
                  <div className="logged-icon">✅</div>
                  <h3>You&apos;ve logged today!</h3>
                  <p>Great job staying consistent. Come back tomorrow to continue your streak!</p>
                  <div className="today-summary">
                    <div className="today-stat">
                      <span className="today-label">Mood</span>
                      <span className="today-value">{todayEntry.mood}/10</span>
                    </div>
                    <div className="today-stat">
                      <span className="today-label">Stress</span>
                      <span className="today-value">{todayEntry.stress}/10</span>
                    </div>
                    <div className="today-stat">
                      <span className="today-label">Sleep</span>
                      <span className="today-value">{todayEntry.sleep}h</span>
                    </div>
                    <div className="today-stat">
                      <span className="today-label">Exercise</span>
                      <span className="today-value">{todayEntry.exercise ? '✓' : '✗'}</span>
                    </div>
                  </div>
                </div>
              ) : (
              <form onSubmit={handleSubmit}>
                {/* Mood */}
                <div className="form-group">
                  <label>Mood (1-10): {formData.mood}</label>
                  <div className="slider-container">
                    <input
                      type="range"
                      name="mood"
                      min="1"
                      max="10"
                      value={formData.mood}
                      onChange={handleChange}
                      className="slider slider-mood"
                    />
                    <div className="slider-labels">
                      <span>😔 Poor</span>
                      <span>😊 Great</span>
                    </div>
                  </div>
                </div>

                {/* Stress */}
                <div className="form-group">
                  <label>Stress Level (1-10): {formData.stress}</label>
                  <div className="slider-container">
                    <input
                      type="range"
                      name="stress"
                      min="1"
                      max="10"
                      value={formData.stress}
                      onChange={handleChange}
                      className="slider slider-stress"
                    />
                    <div className="slider-labels">
                      <span>😌 Relaxed</span>
                      <span>😰 Very Stressed</span>
                    </div>
                  </div>
                </div>

                {/* Sleep */}
                <div className="form-group">
                  <label>Hours of Sleep: {formData.sleep}</label>
                  <div className="slider-container">
                    <input
                      type="range"
                      name="sleep"
                      min="0"
                      max="12"
                      step="0.5"
                      value={formData.sleep}
                      onChange={handleChange}
                      className="slider slider-sleep"
                    />
                  </div>
                </div>

                {/* Exercise */}
                <div className="form-group">
                  <div className="checkbox-group">
                    <input
                      type="checkbox"
                      name="exercise"
                      id="exercise"
                      checked={formData.exercise}
                      onChange={handleChange}
                    />
                    <label htmlFor="exercise">Did you exercise today?</label>
                  </div>
                </div>

                {/* Activities */}
                <div className="form-group">
                  <label>Activities (comma separated)</label>
                  <input
                    type="text"
                    name="activities"
                    value={formData.activities}
                    onChange={handleChange}
                    placeholder="work, reading, socializing, cooking..."
                  />
                </div>

                {/* Notes */}
                <div className="form-group">
                  <label>Notes (optional)</label>
                  <textarea
                    name="notes"
                    value={formData.notes}
                    onChange={handleChange}
                    placeholder="How are you feeling? Anything noteworthy about today?"
                  />
                </div>

                <button type="submit" className="submit-btn" disabled={loading}>
                  {loading ? 'Saving & Analyzing...' : 'Save & Get AI Insights'}
                </button>
              </form>
              )}
              </div>

              {/* Quick Stats Summary */}
              <div className="card stats-card">
                <h3>📊 Your Wellness Snapshot</h3>
                <div className="stats-grid">
                  <div className="stat-item">
                    <div className="stat-value">{uniqueDays}</div>
                    <div className="stat-label">Days Tracked</div>
                  </div>
                  <div className="stat-item">
                    <div className="stat-value">
                      {entries.length > 0 ? (entries.reduce((sum, e) => sum + e.mood, 0) / entries.length).toFixed(1) : '-'}
                    </div>
                    <div className="stat-label">Avg Mood</div>
                  </div>
                  <div className="stat-item">
                    <div className="stat-value">
                      {entries.length > 0 ? (entries.reduce((sum, e) => sum + e.sleep, 0) / entries.length).toFixed(1) : '-'}
                    </div>
                    <div className="stat-label">Avg Sleep</div>
                  </div>
                  <div className="stat-item">
                    <div className="stat-value">{exerciseDays}</div>
                    <div className="stat-label">Workout Days</div>
                  </div>
                </div>
              </div>

              {/* Daily Wellness Tip */}
              <div className="wellness-tip">
                <div className="tip-icon">💡</div>
                <div className="tip-body">
                  <h3>Daily Tip</h3>
                  <p className="tip-content">
                    {(() => {
                      const tips = [
                        "Take a 5-minute break every hour to stretch and reset your focus.",
                        "Hydration matters! Aim for 8 glasses of water today.",
                        "A 10-minute walk can boost your mood and creativity.",
                        "Practice gratitude: Write down 3 things you're thankful for.",
                        "Deep breathing for 2 minutes can reduce stress significantly.",
                        "Quality sleep starts with a consistent bedtime routine.",
                        "Small wins count! Celebrate your progress today."
                      ];
                      const dayIndex = new Date().getDay();
                      return tips[dayIndex];
                    })()}
                  </p>
                </div>
              </div>
            </div>

            {/* Middle Column - Chatbot */}
            <div className="column middle-column">
              {/* AI Chatbot */}
              <div className="card chatbot-card">
                <h2>💬 Wellness Assistant</h2>
                <div className="chat-container">
                  <div className="chat-messages">
                    {chatMessages.map((msg, idx) => (
                      <div key={idx} className={`chat-message ${msg.role}`}>
                        {msg.role === 'assistant' && <span className="chat-avatar">🤖</span>}
                        <div className="chat-bubble">{msg.content}</div>
                        {msg.role === 'user' && <span className="chat-avatar">👤</span>}
                      </div>
                    ))}
                    {chatLoading && (
                      <div className="chat-message assistant">
                        <span className="chat-avatar">🤖</span>
                        <div className="chat-bubble typing">
                          <span></span><span></span><span></span>
                        </div>
                      </div>
                    )}
                  </div>
                  <form onSubmit={handleChatSubmit} className="chat-input-form">
                    <input
                      type="text"
                      value={chatInput}
                      onChange={(e) => setChatInput(e.target.value)}
                      placeholder="Ask about wellness, sleep, stress..."
                      className="chat-input"
                    />
                    <button type="submit" className="chat-send" disabled={chatLoading}>
                      ➤
                    </button>
                  </form>
                </div>
              </div>

              {/* AI Insights */}
              <div className="card ai-card">
                <div className="ai-header">
                  <h2>🤖 AI Insights</h2>
                  <button 
                    className="refresh-btn" 
                    onClick={async () => {
                      if (entries.length === 0) return
                      setInsightsLoading(true)
                      try {
                        const res = await fetch('/api/analyze', {
                          method: 'POST',
                          headers: { 'Content-Type': 'application/json' },
                          body: JSON.stringify({ entryId: entries[0].id })
                        })
                        if (res.ok) {
                          const data = await res.json()
                          setAiInsights(data.insights)
                          setInsightEntryDate(entries[0].createdAt)
                        }
                      } catch (err) {
                        console.error('Failed to refresh insights:', err)
                      }
                      setInsightsLoading(false)
                    }}
                    disabled={insightsLoading || entries.length === 0}
                  >
                    {insightsLoading ? 'Loading...' : '🔄 Refresh'}
                  </button>
                </div>
                {insightEntryDate && (
                  <div className="insight-date">
                    Based on entry from {new Date(insightEntryDate).toLocaleDateString()}
                  </div>
                )}
                <div className="ai-content">
                  {aiInsights ? (
                    <p>{aiInsights}</p>
                  ) : (
                    <p className="no-insights">No insights yet. Log an entry to get personalized AI analysis!</p>
                  )}
                </div>
              </div>
            </div>

            {/* Right Column - Badges & Progress */}
            <div className="column right-column">
              {/* Your Badges - Trophy Case */}
              <div className="card badges-showcase">
                <h2>🎖️ Your Badges</h2>
                
                <div className="badges-grid">
                  {/* Consistency Badge */}
                  <div className={`badge-trophy ${uniqueDays >= 7 ? 'earned' : 'locked'}`}>
                    <div className="trophy-icon">🔥</div>
                    <div className="trophy-name">Consistency</div>
                    {uniqueDays >= 7 ? (
                      <div className="trophy-status earned-status">Earned!</div>
                    ) : (
                      <div className="trophy-status locked-status">🔒</div>
                    )}
                  </div>

                  {/* Active Badge */}
                  <div className={`badge-trophy ${exerciseDays >= 5 ? 'earned' : 'locked'}`}>
                    <div className="trophy-icon">💪</div>
                    <div className="trophy-name">Active</div>
                    {exerciseDays >= 5 ? (
                      <div className="trophy-status earned-status">Earned!</div>
                    ) : (
                      <div className="trophy-status locked-status">🔒</div>
                    )}
                  </div>

                  {/* Sleep Badge */}
                  <div className={`badge-trophy ${goodSleepDays >= 5 ? 'earned' : 'locked'}`}>
                    <div className="trophy-icon">😴</div>
                    <div className="trophy-name">Sleep Pro</div>
                    {goodSleepDays >= 5 ? (
                      <div className="trophy-status earned-status">Earned!</div>
                    ) : (
                      <div className="trophy-status locked-status">🔒</div>
                    )}
                  </div>

                  {/* Zen Master Badge - Low Stress */}
                  <div className={`badge-trophy ${lowStressDays >= 5 ? 'earned' : 'locked'}`}>
                    <div className="trophy-icon">🧘</div>
                    <div className="trophy-name">Zen Master</div>
                    {lowStressDays >= 5 ? (
                      <div className="trophy-status earned-status">Earned!</div>
                    ) : (
                      <div className="trophy-status locked-status">🔒</div>
                    )}
                  </div>

                  {/* Happiness Badge - High Mood */}
                  <div className={`badge-trophy ${highMoodDays >= 5 ? 'earned' : 'locked'}`}>
                    <div className="trophy-icon">✨</div>
                    <div className="trophy-name">Joy Seeker</div>
                    {highMoodDays >= 5 ? (
                      <div className="trophy-status earned-status">Earned!</div>
                    ) : (
                      <div className="trophy-status locked-status">🔒</div>
                    )}
                  </div>

                  {/* Veteran Badge */}
                  <div className={`badge-trophy ${uniqueDays >= 30 ? 'earned' : 'locked'}`}>
                    <div className="trophy-icon">🏆</div>
                    <div className="trophy-name">Veteran</div>
                    {uniqueDays >= 30 ? (
                      <div className="trophy-status earned-status">Earned!</div>
                    ) : (
                      <div className="trophy-status locked-status">🔒</div>
                    )}
                  </div>
                </div>

                {/* Incentive Message */}
                <div className="incentive-box">
                  {(() => {
                    const earnedCount = [
                      uniqueDays >= 7,
                      exerciseDays >= 5,
                      goodSleepDays >= 5,
                      lowStressDays >= 5,
                      highMoodDays >= 5,
                      uniqueDays >= 30
                    ].filter(Boolean).length;
                    
                    if (earnedCount === 0) {
                      return (
                        <>
                          <div className="incentive-icon">🚀</div>
                          <div className="incentive-text">
                            <strong>Start your journey!</strong>
                            <p>Log entries daily to unlock your first badge</p>
                          </div>
                        </>
                      );
                    } else if (earnedCount < 3) {
                      return (
                        <>
                          <div className="incentive-icon">⭐</div>
                          <div className="incentive-text">
                            <strong>Great progress!</strong>
                            <p>You&apos;ve earned {earnedCount} badge{earnedCount > 1 ? 's' : ''}! Keep going for more</p>
                          </div>
                        </>
                      );
                    } else if (earnedCount < 6) {
                      return (
                        <>
                          <div className="incentive-icon">🌟</div>
                          <div className="incentive-text">
                            <strong>You&apos;re a wellness star!</strong>
                            <p>{6 - earnedCount} more badge{6 - earnedCount > 1 ? 's' : ''} to complete your collection</p>
                          </div>
                        </>
                      );
                    } else {
                      return (
                        <>
                          <div className="incentive-icon">👑</div>
                          <div className="incentive-text">
                            <strong>Wellness Champion!</strong>
                            <p>You&apos;ve collected all badges. Amazing work!</p>
                          </div>
                        </>
                      );
                    }
                  })()}
                </div>
              </div>

              {/* Badge Progress */}
              <div className="card">
                <h2>📈 Next Badge Progress</h2>
                
                <div className="badge-section">
                  {/* Streak Badge */}
                  <div className="badge-item">
                    <div className="badge-info">
                      <div className="badge-icon">🔥</div>
                      <div className="badge-details">
                        <h3>Consistency Streak</h3>
                        <p>{Math.min(uniqueDays, 7)}/7 days</p>
                      </div>
                    </div>
                    <div className="progress-bar">
                      <div 
                        className="progress-fill progress-orange" 
                        style={{ width: `${Math.min((uniqueDays / 7) * 100, 100)}%` }}
                      ></div>
                    </div>
                  </div>
                  {uniqueDays >= 7 && (
                    <div className="badge-earned">✅ Badge earned!</div>
                  )}

                  {/* Exercise Badge */}
                  <div className="badge-item">
                    <div className="badge-info">
                      <div className="badge-icon">💪</div>
                      <div className="badge-details">
                        <h3>Active Week</h3>
                        <p>{exerciseDays}/5 workout days</p>
                      </div>
                    </div>
                    <div className="progress-bar">
                      <div 
                        className="progress-fill progress-green" 
                        style={{ width: `${Math.min((exerciseDays / 5) * 100, 100)}%` }}
                      ></div>
                    </div>
                  </div>
                  {exerciseDays >= 5 ? (
                    <div className="badge-earned">✅ Badge earned!</div>
                  ) : (
                    <div className="badge-hint">{5 - exerciseDays} more workout days to unlock</div>
                  )}

                  {/* Sleep Badge */}
                  <div className="badge-item">
                    <div className="badge-info">
                      <div className="badge-icon">😴</div>
                      <div className="badge-details">
                        <h3>Sleep Champion</h3>
                        <p>{goodSleepDays}/5 good nights</p>
                      </div>
                    </div>
                    <div className="progress-bar">
                      <div 
                        className="progress-fill progress-blue" 
                        style={{ width: `${Math.min((goodSleepDays / 5) * 100, 100)}%` }}
                      ></div>
                    </div>
                  </div>
                  {goodSleepDays >= 5 ? (
                    <div className="badge-earned">✅ Badge earned!</div>
                  ) : (
                    <div className="badge-hint">{5 - goodSleepDays} more nights to unlock</div>
                  )}
                </div>
              </div>
            </div>
          </div>

          {/* Full Width - Recent Entries */}
          <div className="card entries-card">
            <h2>📋 Recent Entries</h2>
            
            {entries.length === 0 ? (
              <p className="empty-state">No entries yet. Log your first wellness check above!</p>
            ) : (
              <div className="entries-list">
                {entries.map((entry) => (
                  <div key={entry.id} className="entry-item">
                    <div className="entry-header">
                      <span className="entry-date">
                        {new Date(entry.createdAt).toLocaleDateString()}
                      </span>
                      <div className="entry-tags">
                        <span className="tag tag-mood">Mood: {entry.mood}/10</span>
                        <span className="tag tag-stress">Stress: {entry.stress}/10</span>
                      </div>
                    </div>
                    <div className="entry-details">
                      <div className="detail-row">😴 Sleep: {entry.sleep} hours</div>
                      <div className="detail-row">🏃 Exercise: {entry.exercise ? 'Yes' : 'No'}</div>
                      {entry.activities && (
                        <div className="detail-row">📝 {entry.activities}</div>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </>
  )
}

const globalStyles = `
  .dashboard-page {
    min-height: 100vh;
    background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
    font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif;
    position: relative;
    overflow-x: hidden;
  }

  .background-pattern {
    position: fixed;
    top: -50%;
    left: -50%;
    width: 200%;
    height: 200%;
    background: radial-gradient(circle, rgba(255,255,255,0.1) 1px, transparent 1px);
    background-size: 50px 50px;
    animation: moveBackground 20s linear infinite;
    pointer-events: none;
    z-index: 0;
  }

  @keyframes moveBackground {
    0% { transform: translate(0, 0); }
    100% { transform: translate(50px, 50px); }
  }

  .loading-screen {
    display: flex;
    align-items: center;
    justify-content: center;
    min-height: 100vh;
    color: white;
    font-size: 1.5rem;
    font-weight: 600;
  }

  .dashboard-page .container {
    max-width: 100%;
    width: 100%;
    margin: 0 auto;
    padding: 2rem 4rem;
    position: relative;
    z-index: 1;
  }

  .dashboard-page .top-nav {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 1rem;
  }

  .dashboard-page .back-link {
    color: white;
    text-decoration: none;
    font-size: 0.9rem;
    opacity: 0.9;
    transition: all 0.3s ease;
    text-shadow: 0 2px 10px rgba(0,0,0,0.2);
  }

  .dashboard-page .back-link:hover {
    opacity: 1;
    transform: translateX(-5px);
    text-shadow: 0 0 20px rgba(255,255,255,0.6);
  }

  .dashboard-page .logout-btn {
    background: rgba(255,255,255,0.15);
    color: white;
    border: 1px solid rgba(255,255,255,0.3);
    padding: 0.5rem 1rem;
    border-radius: 8px;
    font-size: 0.875rem;
    font-weight: 500;
    cursor: pointer;
    transition: all 0.3s ease;
    backdrop-filter: blur(10px);
  }

  .dashboard-page .logout-btn:hover {
    background: rgba(255,255,255,0.25);
    border-color: rgba(255,255,255,0.5);
    transform: translateY(-2px);
  }

  .dashboard-page .top-nav-right {
    display: flex;
    align-items: center;
    gap: 1rem;
  }

  .dashboard-page .staff-nav {
    display: flex;
    align-items: center;
    gap: 0.75rem;
    background: rgba(255,255,255,0.1);
    padding: 0.5rem 1rem;
    border-radius: 8px;
    border: 1px solid rgba(255,255,255,0.2);
  }

  .dashboard-page .staff-badge {
    background: #fef3c7;
    color: #92400e;
    padding: 0.25rem 0.5rem;
    border-radius: 4px;
    font-size: 0.75rem;
    font-weight: 600;
  }

  .dashboard-page .staff-link {
    color: white;
    text-decoration: none;
    font-size: 0.875rem;
    font-weight: 500;
    padding: 0.25rem 0.5rem;
    border-radius: 4px;
    transition: all 0.2s ease;
  }

  .dashboard-page .staff-link:hover {
    background: rgba(255,255,255,0.2);
  }

  .dashboard-page .header {
    color: white;
    margin-bottom: 2rem;
    animation: fadeInDown 0.6s ease;
  }

  @keyframes fadeInDown {
    from { opacity: 0; transform: translateY(-20px); }
    to { opacity: 1; transform: translateY(0); }
  }

  .dashboard-page .header h1 {
    font-size: 2.5rem;
    font-weight: 700;
    margin-bottom: 0.5rem;
    text-shadow: 0 4px 20px rgba(0,0,0,0.3);
    animation: glow 2s ease-in-out infinite alternate;
  }

  @keyframes glow {
    from { text-shadow: 0 4px 20px rgba(0,0,0,0.3), 0 0 30px rgba(255,255,255,0.2); }
    to { text-shadow: 0 4px 20px rgba(0,0,0,0.3), 0 0 40px rgba(255,255,255,0.4); }
  }

  .dashboard-page .header p {
    font-size: 1.1rem;
    opacity: 0.95;
    text-shadow: 0 2px 10px rgba(0,0,0,0.2);
  }

  .dashboard-grid {
    display: grid;
    grid-template-columns: 1fr 1fr 1fr;
    gap: 1.5rem;
    align-items: stretch;
  }

  @media (max-width: 1200px) {
    .dashboard-grid { grid-template-columns: 1fr 1fr; }
  }

  @media (max-width: 900px) {
    .dashboard-grid { grid-template-columns: 1fr; }
    .dashboard-page .container { padding: 1.5rem 1rem; }
  }

  .column {
    display: flex;
    flex-direction: column;
    gap: 1.5rem;
  }

  .left-column, .middle-column, .right-column {
    display: flex;
    flex-direction: column;
    gap: 1.5rem;
  }

  .middle-column {
    flex: 1;
  }

  .middle-column .chatbot-card {
    flex: 1;
  }

  .entries-card {
    margin-top: 1.5rem;
  }

  .dashboard-page .card {
    background: rgba(255, 255, 255, 0.95);
    backdrop-filter: blur(20px);
    border-radius: 20px;
    padding: 2rem;
    box-shadow: 0 20px 60px rgba(0, 0, 0, 0.2), 0 0 40px rgba(102, 126, 234, 0.1);
    border: 1px solid rgba(255, 255, 255, 0.3);
    transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1);
    animation: fadeInUp 0.6s ease;
  }

  @keyframes fadeInUp {
    from { opacity: 0; transform: translateY(30px); }
    to { opacity: 1; transform: translateY(0); }
  }

  .dashboard-page .card:hover {
    transform: translateY(-5px);
    box-shadow: 0 30px 80px rgba(0, 0, 0, 0.25), 0 0 60px rgba(102, 126, 234, 0.2);
  }

  .dashboard-page .card h2 {
    font-size: 1.5rem;
    font-weight: 700;
    margin-bottom: 1.5rem;
    color: #1a202c;
    position: relative;
    display: inline-block;
  }

  .dashboard-page .card h2::after {
    content: '';
    position: absolute;
    bottom: -8px;
    left: 0;
    width: 50px;
    height: 3px;
    background: linear-gradient(90deg, #667eea, #764ba2);
    border-radius: 10px;
  }

  .ai-card {
    background: linear-gradient(135deg, #667eea 0%, #764ba2 100%) !important;
    color: white;
  }

  .ai-card h2 { color: white !important; }
  .ai-card h2::after { background: rgba(255,255,255,0.5) !important; }

  .ai-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 0.5rem;
  }

  .ai-header h2 {
    margin-bottom: 0 !important;
  }

  .refresh-btn {
    background: rgba(255,255,255,0.25);
    border: 2px solid rgba(255,255,255,0.5);
    color: white;
    padding: 0.4rem 0.75rem;
    border-radius: 8px;
    font-size: 0.8rem;
    font-weight: 600;
    cursor: pointer;
    transition: all 0.3s ease;
    display: flex;
    align-items: center;
    gap: 0.35rem;
  }

  .refresh-btn:hover:not(:disabled) {
    background: rgba(255,255,255,0.4);
    border-color: white;
    transform: translateY(-2px);
  }

  .refresh-btn:disabled {
    opacity: 0.5;
    cursor: not-allowed;
  }

  .insight-date {
    font-size: 0.75rem;
    opacity: 0.8;
    margin-bottom: 0.75rem;
  }

  .no-insights {
    opacity: 0.8;
    font-style: italic;
  }

  .ai-content {
    background: rgba(255,255,255,0.15);
    backdrop-filter: blur(10px);
    border-radius: 12px;
    padding: 1.25rem;
    font-size: 0.95rem;
    line-height: 1.6;
    white-space: pre-line;
  }

  .form-group {
    margin-bottom: 1.5rem;
  }

  .form-group > label {
    display: block;
    font-weight: 600;
    margin-bottom: 0.5rem;
    color: #2d3748;
    font-size: 0.9rem;
  }

  .slider-container {
    margin-top: 0.5rem;
  }

  .slider {
    width: 100%;
    height: 10px;
    border-radius: 5px;
    outline: none;
    -webkit-appearance: none;
    transition: all 0.3s ease;
  }

  .slider-mood { background: linear-gradient(to right, #f59e0b, #10b981); }
  .slider-stress { background: linear-gradient(to right, #10b981, #ef4444); }
  .slider-sleep { background: linear-gradient(to right, #e2e8f0, #667eea); }

  .slider::-webkit-slider-thumb {
    -webkit-appearance: none;
    width: 24px;
    height: 24px;
    border-radius: 50%;
    background: linear-gradient(135deg, #667eea, #764ba2);
    cursor: pointer;
    box-shadow: 0 4px 15px rgba(102, 126, 234, 0.5);
    border: 3px solid white;
    transition: all 0.3s ease;
  }

  .slider::-webkit-slider-thumb:hover {
    transform: scale(1.15);
    box-shadow: 0 6px 25px rgba(102, 126, 234, 0.7);
  }

  .slider::-moz-range-thumb {
    width: 24px;
    height: 24px;
    border-radius: 50%;
    background: linear-gradient(135deg, #667eea, #764ba2);
    cursor: pointer;
    box-shadow: 0 4px 15px rgba(102, 126, 234, 0.5);
    border: 3px solid white;
  }

  .slider-labels {
    display: flex;
    justify-content: space-between;
    margin-top: 0.5rem;
    font-size: 0.8rem;
    color: #718096;
  }

  .dashboard-page input[type="text"],
  .dashboard-page textarea {
    width: 100%;
    padding: 0.875rem;
    border: 2px solid #e2e8f0;
    border-radius: 12px;
    font-size: 0.9rem;
    font-family: inherit;
    transition: all 0.3s ease;
    background: rgba(255,255,255,0.8);
  }

  .dashboard-page input[type="text"]:focus,
  .dashboard-page textarea:focus {
    outline: none;
    border-color: #667eea;
    box-shadow: 0 0 0 4px rgba(102, 126, 234, 0.1);
    background: white;
  }

  .dashboard-page textarea {
    resize: vertical;
    min-height: 80px;
  }

  .checkbox-group {
    display: flex;
    align-items: center;
    gap: 0.75rem;
    padding: 1rem;
    background: rgba(102, 126, 234, 0.05);
    border-radius: 12px;
    transition: all 0.3s ease;
    cursor: pointer;
  }

  .checkbox-group:hover {
    background: rgba(102, 126, 234, 0.1);
  }

  .checkbox-group input[type="checkbox"] {
    width: 20px;
    height: 20px;
    cursor: pointer;
    accent-color: #667eea;
  }

  .checkbox-group label {
    margin: 0 !important;
    cursor: pointer;
    font-weight: 600;
    color: #2d3748;
  }

  .submit-btn {
    width: 100%;
    padding: 1rem;
    background: linear-gradient(135deg, #667eea, #764ba2);
    color: white;
    border: none;
    border-radius: 12px;
    font-size: 1rem;
    font-weight: 600;
    cursor: pointer;
    transition: all 0.3s ease;
    margin-top: 0.5rem;
    box-shadow: 0 10px 30px rgba(102, 126, 234, 0.3);
    position: relative;
    overflow: hidden;
  }

  .submit-btn::before {
    content: '';
    position: absolute;
    top: 0;
    left: -100%;
    width: 100%;
    height: 100%;
    background: linear-gradient(90deg, transparent, rgba(255,255,255,0.3), transparent);
    transition: left 0.5s ease;
  }

  .submit-btn:hover::before {
    left: 100%;
  }

  .submit-btn:hover {
    transform: translateY(-3px);
    box-shadow: 0 15px 40px rgba(102, 126, 234, 0.5);
  }

  .submit-btn:disabled {
    opacity: 0.7;
    cursor: not-allowed;
    transform: none;
  }

  .badge-section {
    display: flex;
    flex-direction: column;
    gap: 0.75rem;
  }

  .badge-item {
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 1rem;
    background: linear-gradient(135deg, rgba(102, 126, 234, 0.05), rgba(118, 75, 162, 0.05));
    border-radius: 12px;
    transition: all 0.3s ease;
    border: 1px solid rgba(102, 126, 234, 0.1);
  }

  .badge-item:hover {
    transform: translateX(5px);
    background: linear-gradient(135deg, rgba(102, 126, 234, 0.1), rgba(118, 75, 162, 0.1));
    box-shadow: 0 5px 20px rgba(102, 126, 234, 0.15);
  }

  .badge-info {
    display: flex;
    align-items: center;
    gap: 0.75rem;
  }

  .badge-icon {
    font-size: 1.5rem;
    transition: all 0.3s ease;
  }

  .badge-item:hover .badge-icon {
    transform: scale(1.2) rotate(5deg);
  }

  .badge-details h3 {
    font-size: 0.95rem;
    font-weight: 600;
    margin-bottom: 0.15rem;
    color: #2d3748;
  }

  .badge-details p {
    font-size: 0.8rem;
    color: #718096;
    margin: 0;
  }

  .progress-bar {
    width: 120px;
    height: 8px;
    background: rgba(226, 232, 240, 0.5);
    border-radius: 10px;
    overflow: hidden;
  }

  .progress-fill {
    height: 100%;
    border-radius: 10px;
    transition: width 0.5s ease;
    position: relative;
    overflow: hidden;
  }

  .progress-fill::after {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: linear-gradient(90deg, transparent, rgba(255,255,255,0.4), transparent);
    animation: shimmer 2s infinite;
  }

  @keyframes shimmer {
    0% { transform: translateX(-100%); }
    100% { transform: translateX(100%); }
  }

  .progress-orange { background: linear-gradient(90deg, #f59e0b, #f97316); }
  .progress-green { background: linear-gradient(90deg, #10b981, #34d399); }
  .progress-blue { background: linear-gradient(90deg, #3b82f6, #60a5fa); }

  .badge-earned {
    font-size: 0.8rem;
    color: #059669;
    font-weight: 600;
    padding: 0.25rem 0.75rem;
    text-align: right;
  }

  .badge-hint {
    font-size: 0.75rem;
    color: #718096;
    padding: 0.25rem 0.75rem;
    text-align: right;
  }

  /* Already Logged Today */
  .already-logged {
    text-align: center;
    padding: 2rem 1rem;
  }

  .logged-icon {
    font-size: 3rem;
    margin-bottom: 1rem;
  }

  .already-logged h3 {
    font-size: 1.25rem;
    color: #059669;
    margin-bottom: 0.5rem;
  }

  .already-logged > p {
    color: #64748b;
    font-size: 0.9rem;
    margin-bottom: 1.5rem;
  }

  .today-summary {
    display: grid;
    grid-template-columns: repeat(4, 1fr);
    gap: 0.75rem;
    background: linear-gradient(135deg, #f0fdf4, #dcfce7);
    border-radius: 12px;
    padding: 1rem;
  }

  .today-stat {
    text-align: center;
  }

  .today-label {
    display: block;
    font-size: 0.7rem;
    color: #64748b;
    text-transform: uppercase;
    margin-bottom: 0.25rem;
  }

  .today-value {
    font-size: 1.1rem;
    font-weight: 600;
    color: #059669;
  }

  /* Chatbot */
  .chatbot-card {
    flex: 1;
    display: flex;
    flex-direction: column;
    min-height: 400px;
  }

  .chatbot-card h2 {
    flex-shrink: 0;
  }

  .chat-container {
    display: flex;
    flex-direction: column;
    flex: 1;
    min-height: 0;
  }

  .chat-messages {
    flex: 1;
    overflow-y: auto;
    padding: 0.5rem;
    display: flex;
    flex-direction: column;
    gap: 0.75rem;
  }

  .chat-message {
    display: flex;
    align-items: flex-start;
    gap: 0.5rem;
  }

  .chat-message.user {
    flex-direction: row-reverse;
  }

  .chat-avatar {
    font-size: 1.25rem;
    flex-shrink: 0;
  }

  .chat-bubble {
    padding: 0.625rem 0.875rem;
    border-radius: 16px;
    font-size: 0.85rem;
    line-height: 1.4;
    max-width: 80%;
  }

  .chat-message.assistant .chat-bubble {
    background: linear-gradient(135deg, #f1f5f9, #e2e8f0);
    color: #334155;
    border-bottom-left-radius: 4px;
  }

  .chat-message.user .chat-bubble {
    background: linear-gradient(135deg, #6366f1, #8b5cf6);
    color: white;
    border-bottom-right-radius: 4px;
  }

  .chat-bubble.typing {
    display: flex;
    gap: 4px;
    padding: 0.75rem 1rem;
  }

  .chat-bubble.typing span {
    width: 6px;
    height: 6px;
    background: #94a3b8;
    border-radius: 50%;
    animation: typing 1.4s ease-in-out infinite;
  }

  .chat-bubble.typing span:nth-child(2) { animation-delay: 0.2s; }
  .chat-bubble.typing span:nth-child(3) { animation-delay: 0.4s; }

  @keyframes typing {
    0%, 60%, 100% { transform: translateY(0); }
    30% { transform: translateY(-4px); }
  }

  .chat-input-form {
    display: flex;
    gap: 0.5rem;
    padding-top: 0.75rem;
    border-top: 1px solid #e2e8f0;
    margin-top: 0.75rem;
  }

  .chat-input {
    flex: 1;
    padding: 0.625rem 1rem;
    border: 1px solid #e2e8f0;
    border-radius: 20px;
    font-size: 0.85rem;
    outline: none;
    transition: border-color 0.2s;
  }

  .chat-input:focus {
    border-color: #6366f1;
  }

  .chat-send {
    width: 36px;
    height: 36px;
    border: none;
    background: linear-gradient(135deg, #6366f1, #8b5cf6);
    color: white;
    border-radius: 50%;
    cursor: pointer;
    font-size: 0.9rem;
    display: flex;
    align-items: center;
    justify-content: center;
    transition: transform 0.2s, box-shadow 0.2s;
  }

  .chat-send:hover:not(:disabled) {
    transform: scale(1.05);
    box-shadow: 0 4px 12px rgba(99, 102, 241, 0.4);
  }

  .chat-send:disabled {
    opacity: 0.5;
    cursor: not-allowed;
  }

  /* Stats Summary */
  .stats-card {
    padding: 1.5rem !important;
  }

  .stats-card h3 {
    margin: 0 0 1rem 0;
    font-size: 1.1rem;
    font-weight: 600;
    color: #1a202c;
  }

  .stats-grid {
    display: grid;
    grid-template-columns: repeat(2, 1fr);
    gap: 0.75rem;
  }

  .stat-item {
    background: linear-gradient(135deg, #f8fafc, #eef2ff);
    border-radius: 12px;
    padding: 1rem 0.5rem;
    text-align: center;
    border: 1px solid rgba(99, 102, 241, 0.1);
  }

  .stat-value {
    font-size: 1.75rem;
    font-weight: 700;
    color: #6366f1;
  }

  .stat-label {
    font-size: 0.65rem;
    color: #64748b;
    margin-top: 0.25rem;
    text-transform: uppercase;
    letter-spacing: 0.3px;
    font-weight: 500;
  }

  /* Wellness Tip */
  .wellness-tip {
    background: linear-gradient(135deg, #fef3c7, #fef9c3);
    border-radius: 16px;
    padding: 1rem 1.25rem;
    display: flex;
    align-items: center;
    gap: 1rem;
    border: 1px solid #fde68a;
  }

  .tip-icon {
    font-size: 1.5rem;
    background: linear-gradient(135deg, #fef3c7, #fde68a);
    width: 44px;
    height: 44px;
    border-radius: 12px;
    display: flex;
    align-items: center;
    justify-content: center;
    flex-shrink: 0;
  }

  .tip-body h3 {
    margin: 0 0 0.25rem 0;
    font-size: 0.85rem;
    font-weight: 600;
    color: #1a202c;
  }

  .tip-content {
    margin: 0;
    font-size: 0.85rem;
    color: #64748b;
    line-height: 1.5;
  }

  .tip-header {
    display: none;
  }

  .empty-state {
    text-align: center;
    color: #718096;
    padding: 2rem;
  }

  .entries-list {
    max-height: 350px;
    overflow-y: auto;
    display: flex;
    flex-direction: column;
    gap: 0.75rem;
  }

  .entries-list::-webkit-scrollbar {
    width: 6px;
  }

  .entries-list::-webkit-scrollbar-track {
    background: rgba(226, 232, 240, 0.3);
    border-radius: 10px;
  }

  .entries-list::-webkit-scrollbar-thumb {
    background: linear-gradient(135deg, #667eea, #764ba2);
    border-radius: 10px;
  }

  .entry-item {
    padding: 1rem;
    background: linear-gradient(135deg, rgba(247, 250, 252, 0.8), rgba(255, 255, 255, 0.8));
    border-radius: 12px;
    border-left: 4px solid #667eea;
    transition: all 0.3s ease;
  }

  .entry-item:hover {
    transform: translateX(5px);
    box-shadow: 0 5px 20px rgba(102, 126, 234, 0.15);
  }

  .entry-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 0.5rem;
    flex-wrap: wrap;
    gap: 0.5rem;
  }

  .entry-date {
    font-weight: 600;
    color: #2d3748;
    font-size: 0.9rem;
  }

  .entry-tags {
    display: flex;
    gap: 0.5rem;
  }

  .tag {
    padding: 0.2rem 0.6rem;
    border-radius: 20px;
    font-size: 0.75rem;
    font-weight: 600;
  }

  .tag-mood {
    background: linear-gradient(135deg, #dbeafe, #bfdbfe);
    color: #1e40af;
  }

  .tag-stress {
    background: linear-gradient(135deg, #fee2e2, #fecaca);
    color: #991b1b;
  }

  .entry-details {
    font-size: 0.85rem;
    color: #4a5568;
    line-height: 1.5;
  }

  .detail-row {
    margin-bottom: 0.15rem;
  }

  /* Badges Showcase Styles */
  .badges-showcase {
    background: linear-gradient(135deg, rgba(255,255,255,0.98), rgba(250,250,255,0.95)) !important;
  }

  .badges-grid {
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    gap: 1rem;
    margin-bottom: 1.5rem;
  }

  .badge-trophy {
    display: flex;
    flex-direction: column;
    align-items: center;
    padding: 1rem 0.5rem;
    border-radius: 16px;
    transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1);
    position: relative;
    overflow: hidden;
  }

  .badge-trophy.earned {
    background: linear-gradient(135deg, #fef3c7, #fde68a);
    border: 2px solid #f59e0b;
    box-shadow: 0 4px 15px rgba(245, 158, 11, 0.3);
  }

  .badge-trophy.earned::before {
    content: '';
    position: absolute;
    top: -50%;
    left: -50%;
    width: 200%;
    height: 200%;
    background: linear-gradient(45deg, transparent, rgba(255,255,255,0.4), transparent);
    animation: shine 3s infinite;
  }

  @keyframes shine {
    0% { transform: translateX(-100%) rotate(45deg); }
    100% { transform: translateX(100%) rotate(45deg); }
  }

  .badge-trophy.earned:hover {
    transform: scale(1.08) rotate(2deg);
    box-shadow: 0 8px 25px rgba(245, 158, 11, 0.5);
  }

  .badge-trophy.locked {
    background: linear-gradient(135deg, #f1f5f9, #e2e8f0);
    border: 2px dashed #cbd5e1;
    opacity: 0.7;
  }

  .badge-trophy.locked:hover {
    opacity: 0.85;
    transform: scale(1.02);
  }

  .badge-trophy.locked .trophy-icon {
    filter: grayscale(100%);
  }

  .trophy-icon {
    font-size: 2rem;
    margin-bottom: 0.5rem;
    transition: all 0.3s ease;
  }

  .badge-trophy.earned:hover .trophy-icon {
    transform: scale(1.2) rotate(-5deg);
    filter: drop-shadow(0 4px 8px rgba(245, 158, 11, 0.5));
  }

  .trophy-name {
    font-size: 0.75rem;
    font-weight: 700;
    color: #374151;
    text-align: center;
    margin-bottom: 0.25rem;
  }

  .trophy-status {
    font-size: 0.65rem;
    font-weight: 600;
  }

  .earned-status {
    color: #059669;
    background: rgba(5, 150, 105, 0.1);
    padding: 0.15rem 0.5rem;
    border-radius: 10px;
  }

  .locked-status {
    color: #9ca3af;
  }

  .incentive-box {
    display: flex;
    align-items: center;
    gap: 1rem;
    padding: 1rem;
    background: linear-gradient(135deg, rgba(102, 126, 234, 0.1), rgba(167, 139, 250, 0.1));
    border-radius: 12px;
    border: 1px solid rgba(102, 126, 234, 0.2);
    animation: pulse-border 2s infinite;
  }

  @keyframes pulse-border {
    0%, 100% { border-color: rgba(102, 126, 234, 0.2); }
    50% { border-color: rgba(102, 126, 234, 0.5); }
  }

  .incentive-icon {
    font-size: 2rem;
    animation: bounce 2s infinite;
  }

  @keyframes bounce {
    0%, 100% { transform: translateY(0); }
    50% { transform: translateY(-5px); }
  }

  .incentive-text {
    flex: 1;
  }

  .incentive-text strong {
    display: block;
    font-size: 0.95rem;
    color: #4c1d95;
    margin-bottom: 0.15rem;
  }

  .incentive-text p {
    font-size: 0.8rem;
    color: #6b7280;
    margin: 0;
  }

  @media (max-width: 768px) {
    .dashboard-page .container { padding: 1rem; }
    .dashboard-page .card { padding: 1.5rem; }
    .dashboard-page .header h1 { font-size: 1.75rem; }
    .progress-bar { width: 80px; }
    .entry-header { flex-direction: column; align-items: flex-start; }
    .badges-grid { grid-template-columns: repeat(2, 1fr); }
  }
`
