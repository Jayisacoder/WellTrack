import Link from 'next/link'

export default function About() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-600 via-purple-700 to-indigo-800">
      <div className="max-w-4xl mx-auto px-4 py-12 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="mb-8">
          <Link href="/" className="text-white hover:text-purple-200 mb-6 inline-flex items-center gap-2 text-lg">
            ← Back to Home
          </Link>
          <h1 className="text-5xl font-bold text-white mb-4">
            About WellTrack
          </h1>
          <p className="text-2xl text-purple-100">
            Understanding the Mental Health Tracking Challenge
          </p>
        </div>

        {/* Problem Statement - CCC.1.1 */}
        <div className="bg-white rounded-2xl shadow-2xl p-10 mb-8">
          <h2 className="text-3xl font-bold text-gray-900 mb-6">
            The Problem We Address
          </h2>
          
          <div className="space-y-6 text-gray-700">
            <p className="text-lg leading-relaxed">
              Mental health has become a critical concern in modern society, yet many individuals 
              struggle to effectively monitor and manage their emotional well-being. The challenges 
              are multifaceted:
            </p>

            <div className="bg-purple-50 p-6 rounded-xl border border-purple-200">
              <h3 className="font-bold text-xl mb-4 text-purple-900">Key Challenges:</h3>
              <ul className="space-y-4">
                <li className="flex items-start">
                  <span className="text-purple-600 mr-3 text-xl font-bold">•</span>
                  <span className="text-lg"><strong>Lack of Consistency:</strong> People often fail to track their mental 
                  health regularly, making it difficult to identify patterns or triggers.</span>
                </li>
                <li className="flex items-start">
                  <span className="text-purple-600 mr-3 text-xl font-bold">•</span>
                  <span className="text-lg"><strong>Data Without Insight:</strong> Traditional tracking methods (journals, 
                  mood logs) collect data but provide no analysis or actionable recommendations.</span>
                </li>
                <li className="flex items-start">
                  <span className="text-purple-600 mr-3 text-xl font-bold">•</span>
                  <span className="text-lg"><strong>Invisible Patterns:</strong> Without proper tools, users can't see 
                  correlations between activities, sleep, stress, and their emotional state.</span>
                </li>
                <li className="flex items-start">
                  <span className="text-purple-600 mr-3 text-xl font-bold">•</span>
                  <span className="text-lg"><strong>Barrier to Professional Help:</strong> Many people don't have access 
                  to mental health professionals who could help interpret their wellness patterns.</span>
                </li>
                <li className="flex items-start">
                  <span className="text-purple-600 mr-3 text-xl font-bold">•</span>
                  <span className="text-lg"><strong>Overwhelming Complexity:</strong> Existing solutions are often too 
                  complex, requiring extensive setup or technical knowledge.</span>
                </li>
              </ul>
            </div>

            <p>
              These challenges create a significant gap between awareness of mental health 
              importance and the ability to actively manage it. People know they should pay 
              attention to their mental wellness, but lack the tools to do so effectively.
            </p>

            <div className="bg-red-50 border-l-4 border-red-500 p-6 rounded-r-xl">
              <h3 className="font-bold text-xl mb-3 text-red-900">The Impact</h3>
              <p className="text-lg mb-3">
                Without proper mental health tracking and insights, individuals may:
              </p>
              <ul className="mt-4 space-y-2 ml-6 text-lg">
                <li>• Miss early warning signs of declining mental health</li>
                <li>• Continue behaviors that negatively impact their well-being</li>
                <li>• Feel overwhelmed without understanding the root causes</li>
                <li>• Lack concrete data to share with healthcare providers</li>
                <li>• Struggle to identify effective self-care strategies</li>
              </ul>
            </div>

            <p className="text-lg font-semibold">
              WellTrack was created to bridge this gap by combining simple, consistent tracking 
              with intelligent analysis that empowers users to understand and improve their 
              mental wellness.
            </p>
          </div>
        </div>

        {/* Call to Action */}
        <div className="flex gap-4 justify-center">
          <Link 
            href="/why-welltrack" 
            className="bg-blue-600 text-white px-6 py-3 rounded-lg font-semibold hover:bg-blue-700 transition"
          >
            See Our Solution →
          </Link>
          <Link 
            href="/features" 
            className="bg-white text-blue-600 px-6 py-3 rounded-lg font-semibold border-2 border-blue-600 hover:bg-blue-50 transition"
          >
            Explore Features
          </Link>
        </div>
      </div>
    </div>
  )
}
