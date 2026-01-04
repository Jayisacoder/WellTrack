import Link from 'next/link'

export default function Features() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-600 via-purple-700 to-indigo-800">
      <div className="max-w-4xl mx-auto px-4 py-12 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="mb-8">
          <Link href="/" className="text-white hover:text-purple-200 mb-6 inline-flex items-center gap-2 text-lg">
            ← Back to Home
          </Link>
          <h1 className="text-5xl font-bold text-white mb-4">
            Features
          </h1>
          <p className="text-2xl text-purple-100">
            Comprehensive Tools for Mental Wellness
          </p>
        </div>

        {/* Features Overview - CCC.1.3 */}
        <div className="space-y-6">
          {/* Feature 1: Wellness Tracking */}
          <div className="bg-white rounded-2xl shadow-2xl p-10">
            <div className="flex items-start">
              <div className="text-6xl mr-6">📊</div>
              <div>
                <h2 className="text-3xl font-bold text-gray-900 mb-4">
                  Daily Wellness Tracking
                </h2>
                <p className="text-gray-700 mb-4 text-lg leading-relaxed">
                  Log your emotional and physical wellness metrics in under 2 minutes. Our streamlined 
                  interface captures the essential data points that matter for mental health analysis.
                </p>
                <ul className="space-y-2 text-gray-600 text-lg">
                  <li>• Mood rating (1-10 scale)</li>
                  <li>• Stress level assessment</li>
                  <li>• Sleep duration tracking</li>
                  <li>• Exercise and activity logging</li>
                  <li>• Personal notes and observations</li>
                </ul>
              </div>
            </div>
          </div>

          {/* Feature 2: AI Integration */}
          <div className="bg-white rounded-2xl shadow-2xl p-10 border-4 border-purple-500">
            <div className="flex items-start">
              <div className="text-6xl mr-6">🤖</div>
              <div>
                <h2 className="text-3xl font-bold text-gray-900 mb-4">
                  AI-Powered Analysis & Insights
                </h2>
                <p className="text-gray-700 mb-4 text-lg leading-relaxed">
                  Our artificial intelligence integration is the core differentiator of WellTrack. 
                  Unlike basic tracking apps, WellTrack uses advanced AI to analyze your data and 
                  generate personalized insights.
                </p>
                
                <div className="bg-purple-50 p-6 rounded-xl mb-4 border border-purple-200">
                  <h3 className="font-bold text-xl text-purple-900 mb-3">How AI Enhances WellTrack:</h3>
                  <ul className="space-y-3 text-gray-700 text-lg">
                    <li className="flex items-start">
                      <span className="text-purple-600 mr-3 text-xl">→</span>
                      <span><strong>Pattern Recognition:</strong> Identifies correlations between your 
                      activities, sleep, stress, and mood that you might not notice manually.</span>
                    </li>
                    <li className="flex items-start">
                      <span className="text-purple-600 mr-3 text-xl">→</span>
                      <span><strong>Contextual Analysis:</strong> Examines your entire wellness history 
                      to understand trends over days, weeks, and months.</span>
                    </li>
                    <li className="flex items-start">
                      <span className="text-purple-600 mr-3 text-xl">→</span>
                      <span><strong>Personalized Recommendations:</strong> Generates specific, actionable 
                      advice tailored to your unique patterns and lifestyle.</span>
                    </li>
                    <li className="flex items-start">
                      <span className="text-purple-600 mr-3 text-xl">→</span>
                      <span><strong>Trigger Identification:</strong> Highlights factors that consistently 
                      precede positive or negative emotional states.</span>
                    </li>
                    <li className="flex items-start">
                      <span className="text-blue-600 mr-2">→</span>
                      <span><strong>Natural Language Output:</strong> Presents insights in clear, 
                      encouraging language that's easy to understand and act upon.</span>
                    </li>
                  </ul>
                </div>

                <div className="bg-green-50 p-4 rounded-lg">
                  <h3 className="font-semibold text-green-900 mb-2">Example AI Insight:</h3>
                  <p className="text-gray-700 italic">
                    "Your mood ratings average 7.8 on days when you exercise and get 7+ hours of sleep, 
                    compared to 5.2 on days with less activity and poor sleep. Consider prioritizing 
                    morning workouts and a consistent bedtime routine. You've also reported lower stress 
                    on weekends—identifying ways to incorporate weekend relaxation activities into weekdays 
                    could improve your overall well-being."
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Feature 3: User Authentication */}
          <div className="bg-white rounded-lg shadow-lg p-8">
            <div className="flex items-start">
              <div className="text-4xl mr-4">🔐</div>
              <div>
                <h2 className="text-2xl font-bold text-gray-900 mb-3">
                  Secure Authentication
                </h2>
                <p className="text-gray-700 mb-3">
                  Your mental health data is deeply personal. WellTrack uses industry-standard 
                  authentication with bcrypt password hashing and NextAuth session management.
                </p>
                <ul className="space-y-2 text-gray-600">
                  <li>• Secure user registration and login</li>
                  <li>• Encrypted password storage</li>
                  <li>• Session-based authentication</li>
                  <li>• Privacy-first data handling</li>
                </ul>
              </div>
            </div>
          </div>

          {/* Feature 4: Role-Based Access */}
          <div className="bg-white rounded-lg shadow-lg p-8">
            <div className="flex items-start">
              <div className="text-4xl mr-4">👥</div>
              <div>
                <h2 className="text-2xl font-bold text-gray-900 mb-3">
                  Role-Based Access Control
                </h2>
                <p className="text-gray-700 mb-3">
                  WellTrack implements sophisticated middleware to protect sensitive routes. 
                  Learning Portfolio staff have access to administrative pages (Rubric Evidence 
                  and Reflection) while regular users are restricted to their personal tracking features.
                </p>
                <ul className="space-y-2 text-gray-600">
                  <li>• Email-based role assignment</li>
                  <li>• Protected routes via Next.js middleware</li>
                  <li>• Automatic redirection for unauthorized access</li>
                  <li>• Clear error messaging</li>
                </ul>
              </div>
            </div>
          </div>

          {/* Feature 5: Data Persistence */}
          <div className="bg-white rounded-lg shadow-lg p-8">
            <div className="flex items-start">
              <div className="text-4xl mr-4">💾</div>
              <div>
                <h2 className="text-2xl font-bold text-gray-900 mb-3">
                  Reliable Data Storage
                </h2>
                <p className="text-gray-700 mb-3">
                  Built on PostgreSQL with Prisma ORM, your wellness data is stored securely 
                  and efficiently. All entries are timestamped and associated with your account 
                  for comprehensive historical tracking.
                </p>
                <ul className="space-y-2 text-gray-600">
                  <li>• PostgreSQL database for reliability</li>
                  <li>• Prisma ORM for type-safe queries</li>
                  <li>• Automatic timestamping</li>
                  <li>• User-entry relationships</li>
                </ul>
              </div>
            </div>
          </div>

          {/* Feature 6: Modern Tech Stack */}
          <div className="bg-white rounded-lg shadow-lg p-8">
            <div className="flex items-start">
              <div className="text-4xl mr-4">⚡</div>
              <div>
                <h2 className="text-2xl font-bold text-gray-900 mb-3">
                  Modern, Performant Architecture
                </h2>
                <p className="text-gray-700 mb-3">
                  Built with Next.js 16 App Router and Tailwind CSS, WellTrack delivers 
                  a fast, responsive experience with server-side rendering and optimized performance.
                </p>
                <ul className="space-y-2 text-gray-600">
                  <li>• Next.js 16 with App Router</li>
                  <li>• Tailwind CSS for responsive design</li>
                  <li>• Server-side rendering for speed</li>
                  <li>• API routes for backend logic</li>
                </ul>
              </div>
            </div>
          </div>
        </div>

        {/* AI Justification Section */}
        <div className="bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-lg shadow-lg p-8 mt-8">
          <h2 className="text-2xl font-bold mb-4">
            Why AI is Essential for Mental Wellness Tracking
          </h2>
          <p className="mb-4">
            Artificial intelligence isn't just a buzzword in WellTrack—it's a fundamental necessity 
            for making mental health tracking truly valuable:
          </p>
          <div className="space-y-3">
            <p>
              <strong>1. Human Limitations:</strong> People struggle to objectively analyze their own 
              patterns. AI provides unbiased pattern recognition across hundreds of data points.
            </p>
            <p>
              <strong>2. Hidden Correlations:</strong> The relationship between sleep, activities, and 
              mood isn't always obvious. AI excels at finding non-obvious connections in complex data.
            </p>
            <p>
              <strong>3. Personalization at Scale:</strong> Every individual's wellness journey is unique. 
              AI can generate truly personalized insights without requiring one-on-one professional consultation.
            </p>
            <p>
              <strong>4. Actionable Outcomes:</strong> Raw data alone doesn't drive behavior change. 
              AI transforms data into specific, contextual recommendations that users can immediately act upon.
            </p>
            <p className="text-lg font-semibold mt-4">
              Without AI, WellTrack would be just another digital journal. With AI, it becomes an 
              intelligent companion for mental wellness.
            </p>
          </div>
        </div>

        {/* Call to Action */}
        <div className="flex gap-4 justify-center mt-8">
          <Link 
            href="/product" 
            className="bg-blue-600 text-white px-8 py-3 rounded-lg font-semibold hover:bg-blue-700 transition"
          >
            Try WellTrack Now →
          </Link>
        </div>
      </div>
    </div>
  )
}
