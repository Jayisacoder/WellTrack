import Link from 'next/link'

export default function WhyWellTrack() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-600 via-purple-700 to-indigo-800">
      <div className="max-w-4xl mx-auto px-4 py-12 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="mb-8">
          <Link href="/" className="text-white hover:text-purple-200 mb-6 inline-flex items-center gap-2 text-lg">
            ← Back to Home
          </Link>
          <h1 className="text-5xl font-bold text-white mb-4">
            Why WellTrack?
          </h1>
          <p className="text-2xl text-purple-100">
            Our Approach to Mental Wellness Tracking
          </p>
        </div>

        {/* Solution Planning - CCC.1.2 */}
        <div className="bg-white rounded-2xl shadow-2xl p-10 mb-8">
          <h2 className="text-3xl font-bold text-gray-900 mb-6">
            Our Solution
          </h2>
          
          <div className="space-y-6 text-gray-700">
            <p className="text-lg leading-relaxed">
              WellTrack addresses mental health tracking challenges through a comprehensive, 
              user-centered approach that combines simplicity with powerful AI-driven insights.
            </p>

            <div className="bg-green-50 p-6 rounded-xl border border-green-200">
              <h3 className="font-bold text-xl mb-4 text-green-900">Solution Components:</h3>
              
              <div className="space-y-5">
                <div>
                  <h4 className="font-bold text-purple-700 mb-2 text-lg">1. Simplified Tracking Interface</h4>
                  <p className="text-lg">
                    We designed an intuitive form that takes less than 2 minutes to complete. 
                    Users log essential wellness metrics (mood, sleep, stress, activities) without 
                    overwhelming complexity or time commitment.
                  </p>
                </div>

                <div>
                  <h4 className="font-bold text-purple-700 mb-2 text-lg">2. AI-Powered Pattern Recognition</h4>
                  <p className="text-lg">
                    Our artificial intelligence analyzes user data to identify correlations and 
                    patterns that humans might miss. The AI examines relationships between activities, 
                    sleep quality, stress levels, and emotional states across time.
                  </p>
                </div>

                <div>
                  <h4 className="font-bold text-purple-700 mb-2 text-lg">3. Actionable Recommendations</h4>
                  <p className="text-lg">
                    Rather than just presenting data, WellTrack provides specific, personalized 
                    suggestions based on what the AI learns about each individual's unique patterns. 
                    Users receive concrete steps they can take to improve their well-being.
                  </p>
                </div>

                <div>
                  <h4 className="font-bold text-purple-700 mb-2 text-lg">4. Secure, Role-Based Access</h4>
                  <p className="text-lg">
                    User data is protected with industry-standard authentication. The system includes 
                    role-based access control, ensuring sensitive wellness information remains private 
                    while allowing authorized staff to access administrative features.
                  </p>
                </div>

                <div>
                  <h4 className="font-bold text-purple-700 mb-2 text-lg">5. Educational Foundation</h4>
                  <p className="text-lg">
                    Public-facing pages explain the problem, solution methodology, and feature set, 
                    ensuring users understand how and why WellTrack works before committing their data.
                  </p>
                </div>
              </div>
            </div>

            <div className="border-l-4 border-blue-500 pl-6 my-6">
              <h3 className="font-semibold text-lg mb-2">Planning Methodology</h3>
              <p className="mb-3">
                WellTrack was developed using a requirements-driven approach:
              </p>
              <ol className="space-y-2">
                <li><strong>1. Problem Analysis:</strong> Identified key pain points in mental health tracking</li>
                <li><strong>2. User Requirements:</strong> Defined must-have features for MVP functionality</li>
                <li><strong>3. Technology Selection:</strong> Chose Next.js 16, Prisma, and AI integration</li>
                <li><strong>4. Architecture Design:</strong> Implemented App Router with role-based middleware</li>
                <li><strong>5. Iterative Development:</strong> Built incrementally with clear success criteria</li>
                <li><strong>6. Security First:</strong> Integrated authentication and authorization from day one</li>
              </ol>
            </div>

            <div className="bg-blue-50 p-6 rounded-lg">
              <h3 className="font-semibold text-lg mb-3">Why This Approach Works</h3>
              <ul className="space-y-3">
                <li className="flex items-start">
                  <span className="text-green-600 font-bold mr-2">✓</span>
                  <span><strong>Low Barrier to Entry:</strong> Simple interface encourages daily use</span>
                </li>
                <li className="flex items-start">
                  <span className="text-green-600 font-bold mr-2">✓</span>
                  <span><strong>Data Becomes Meaningful:</strong> AI transforms raw logs into insights</span>
                </li>
                <li className="flex items-start">
                  <span className="text-green-600 font-bold mr-2">✓</span>
                  <span><strong>Empowers Users:</strong> Provides self-help tools without requiring professional intervention</span>
                </li>
                <li className="flex items-start">
                  <span className="text-green-600 font-bold mr-2">✓</span>
                  <span><strong>Privacy Focused:</strong> Secure authentication protects sensitive health data</span>
                </li>
                <li className="flex items-start">
                  <span className="text-green-600 font-bold mr-2">✓</span>
                  <span><strong>Scalable Foundation:</strong> Built with modern tech stack for future expansion</span>
                </li>
              </ul>
            </div>

            <p className="text-lg font-semibold">
              WellTrack doesn't just track—it understands, learns, and guides users toward 
              better mental wellness through intelligent, personalized support.
            </p>
          </div>
        </div>

        {/* Call to Action */}
        <div className="flex gap-4 justify-center">
          <Link 
            href="/features" 
            className="bg-blue-600 text-white px-6 py-3 rounded-lg font-semibold hover:bg-blue-700 transition"
          >
            Explore Features →
          </Link>
          <Link 
            href="/product" 
            className="bg-green-600 text-white px-6 py-3 rounded-lg font-semibold hover:bg-green-700 transition"
          >
            Try WellTrack Now
          </Link>
        </div>
      </div>
    </div>
  )
}
