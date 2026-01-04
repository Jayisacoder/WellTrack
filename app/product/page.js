'use client'

import { useState, useEffect } from 'react'
import { useSession } from 'next-auth/react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'

export default function Product() {
  const { data: session, status } = useSession()
  const router = useRouter()
  const [entries, setEntries] = useState([])
  const [loading, setLoading] = useState(false)
  const [aiInsights, setAiInsights] = useState(null)
  
  const [formData, setFormData] = useState({
    mood: 5,
    stress: 5,
    sleep: 7,
    exercise: false,
    activities: '',
    notes: ''
  })

  // Redirect to sign in if not authenticated
  useEffect(() => {
    if (status === 'unauthenticated') {
      router.push('/auth/signin')
    }
  }, [status, router])

  // Fetch user's previous entries
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
      }
    } catch (error) {
      console.error('Failed to fetch entries:', error)
    }
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setLoading(true)
    
    try {
      // Save the wellness entry
      const res = await fetch('/api/entries', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData)
      })

      if (res.ok) {
        const newEntry = await res.json()
        setEntries([newEntry, ...entries])
        
        // Request AI analysis
        const aiRes = await fetch('/api/analyze', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ entryId: newEntry.id })
        })

        if (aiRes.ok) {
          const aiData = await aiRes.json()
          setAiInsights(aiData.insights)
        }

        // Reset form
        setFormData({
          mood: 5,
          stress: 5,
          sleep: 7,
          exercise: false,
          activities: '',
          notes: ''
        })
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

  if (status === 'loading') {
    return (
      <div className="min-h-screen bg-gradient-to-br from-purple-600 via-purple-700 to-indigo-800 flex items-center justify-center">
        <div className="text-2xl text-white font-semibold">Loading...</div>
      </div>
    )
  }

  if (!session) {
    return null
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-600 via-purple-700 to-indigo-800 py-12">
      <div className="max-w-6xl mx-auto px-4">
        {/* Header */}
        <div className="mb-8">
          <Link href="/" className="text-white hover:text-purple-200 mb-6 inline-flex items-center gap-2 text-lg">
            ← Back to Home
          </Link>
          <h1 className="text-5xl font-bold text-white mb-3">
            WellTrack Dashboard
          </h1>
          <p className="text-xl text-purple-100">
            Welcome back, {session.user.name || session.user.email}!
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-8">
          {/* Tracking Form */}
          <div className="bg-white rounded-2xl shadow-2xl p-10">
            <h2 className="text-3xl font-bold text-gray-900 mb-8">
              Log Today's Wellness
            </h2>
            
            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Mood */}
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Mood (1-10): {formData.mood}
                </label>
                <input
                  type="range"
                  name="mood"
                  min="1"
                  max="10"
                  value={formData.mood}
                  onChange={handleChange}
                  className="w-full h-2 bg-blue-200 rounded-lg appearance-none cursor-pointer"
                />
                <div className="flex justify-between text-xs text-gray-500 mt-1">
                  <span>😢 Poor</span>
                  <span>😊 Great</span>
                </div>
              </div>

              {/* Stress */}
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Stress Level (1-10): {formData.stress}
                </label>
                <input
                  type="range"
                  name="stress"
                  min="1"
                  max="10"
                  value={formData.stress}
                  onChange={handleChange}
                  className="w-full h-2 bg-red-200 rounded-lg appearance-none cursor-pointer"
                />
                <div className="flex justify-between text-xs text-gray-500 mt-1">
                  <span>😌 Relaxed</span>
                  <span>😰 Very Stressed</span>
                </div>
              </div>

              {/* Sleep */}
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Hours of Sleep: {formData.sleep}
                </label>
                <input
                  type="range"
                  name="sleep"
                  min="0"
                  max="12"
                  step="0.5"
                  value={formData.sleep}
                  onChange={handleChange}
                  className="w-full h-2 bg-purple-200 rounded-lg appearance-none cursor-pointer"
                />
              </div>

              {/* Exercise */}
              <div>
                <label className="flex items-center space-x-3">
                  <input
                    type="checkbox"
                    name="exercise"
                    checked={formData.exercise}
                    onChange={handleChange}
                    className="w-5 h-5 text-blue-600 rounded"
                  />
                  <span className="text-sm font-semibold text-gray-700">
                    Did you exercise today?
                  </span>
                </label>
              </div>

              {/* Activities */}
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Activities (comma-separated)
                </label>
                <input
                  type="text"
                  name="activities"
                  value={formData.activities}
                  onChange={handleChange}
                  placeholder="work, reading, socializing, cooking..."
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>

              {/* Notes */}
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Notes (optional)
                </label>
                <textarea
                  name="notes"
                  value={formData.notes}
                  onChange={handleChange}
                  placeholder="How are you feeling? Anything noteworthy about today?"
                  rows="4"
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>

              <button
                type="submit"
                disabled={loading}
                className="w-full bg-blue-600 text-white py-3 rounded-lg font-semibold hover:bg-blue-700 transition disabled:bg-gray-400"
              >
                {loading ? 'Saving & Analyzing...' : 'Save & Get AI Insights'}
              </button>
            </form>
          </div>

          {/* AI Insights & History */}
          <div className="space-y-6">
            {/* AI Insights */}
            {aiInsights && (
              <div className="bg-gradient-to-r from-blue-500 to-purple-600 text-white rounded-lg shadow-lg p-6">
                <h2 className="text-2xl font-bold mb-4">
                  🤖 AI Insights
                </h2>
                <div className="bg-white/10 backdrop-blur rounded-lg p-4">
                  <p className="whitespace-pre-line">{aiInsights}</p>
                </div>
              </div>
            )}

            {/* Recent Entries */}
            <div className="bg-white rounded-lg shadow-lg p-6">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">
                Recent Entries
              </h2>
              
              {entries.length === 0 ? (
                <p className="text-gray-500 text-center py-8">
                  No entries yet. Log your first wellness check above!
                </p>
              ) : (
                <div className="space-y-4 max-h-96 overflow-y-auto">
                  {entries.map((entry) => (
                    <div 
                      key={entry.id} 
                      className="border border-gray-200 rounded-lg p-4 hover:bg-gray-50 transition"
                    >
                      <div className="flex justify-between items-start mb-2">
                        <span className="text-sm text-gray-500">
                          {new Date(entry.createdAt).toLocaleDateString()}
                        </span>
                        <div className="flex gap-2">
                          <span className="text-xs bg-blue-100 text-blue-700 px-2 py-1 rounded">
                            Mood: {entry.mood}/10
                          </span>
                          <span className="text-xs bg-red-100 text-red-700 px-2 py-1 rounded">
                            Stress: {entry.stress}/10
                          </span>
                        </div>
                      </div>
                      <div className="text-sm text-gray-700">
                        <p>💤 Sleep: {entry.sleep} hours</p>
                        <p>🏃 Exercise: {entry.exercise ? 'Yes' : 'No'}</p>
                        {entry.activities && (
                          <p>📝 Activities: {entry.activities}</p>
                        )}
                        {entry.notes && (
                          <p className="mt-2 italic text-gray-600">{entry.notes}</p>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
