import Link from 'next/link'

export default function RubricEvidence() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-600 via-purple-700 to-indigo-800 py-12">
      <div className="max-w-6xl mx-auto px-4">
        {/* Header */}
        <div className="mb-8">
          <Link href="/" className="text-white hover:text-purple-200 mb-6 inline-flex items-center gap-2 text-lg">
            ← Back to Home
          </Link>
          <div className="bg-yellow-100 border-l-4 border-yellow-500 p-4 mb-6 rounded-r-lg">
            <p className="text-sm font-bold">🔒 LP Staff Only - This page is restricted to authorized Learning Portfolio staff members</p>
          </div>
          <h1 className="text-5xl font-bold text-white mb-4">
            Rubric Evidence
          </h1>
          <p className="text-2xl text-purple-100">
            Documentation of Assessment Criteria Fulfillment
          </p>
        </div>

        {/* Rubric Requirements */}
        <div className="space-y-8">
          {/* CCC.1.1 - Problem Explanation */}
          <div className="bg-white rounded-2xl shadow-2xl p-10">
            <div className="flex items-start justify-between mb-6">
              <h2 className="text-3xl font-bold text-gray-900">CCC.1.1 - Problem Explanation</h2>
              <span className="bg-green-100 text-green-800 px-4 py-2 rounded-full text-sm font-bold">✓ Complete</span>
            </div>
            <div className="space-y-4 text-gray-700 text-lg">
              <p><strong>Requirement:</strong> Clearly explain the problem being solved</p>
              <p><strong>Location:</strong> <Link href="/about" className="text-purple-600 hover:underline font-semibold">/about page</Link></p>
              <p><strong>Evidence:</strong></p>
              <ul className="list-disc ml-6 space-y-2">
                <li>Detailed explanation of mental health tracking challenges</li>
                <li>Five specific problems identified (consistency, data without insight, invisible patterns, barrier to help, complexity)</li>
                <li>Impact section showing consequences of unsolved problems</li>
                <li>Clear problem statement tying to WellTrack's purpose</li>
              </ul>
            </div>
          </div>

          {/* CCC.1.2 - Solution Planning */}
          <div className="bg-white rounded-2xl shadow-2xl p-10">
            <div className="flex items-start justify-between mb-6">
              <h2 className="text-3xl font-bold text-gray-900">CCC.1.2 - Solution Planning</h2>
              <span className="bg-green-100 text-green-800 px-4 py-2 rounded-full text-sm font-bold">✓ Complete</span>
            </div>
            <div className="space-y-4 text-gray-700 text-lg">
              <p><strong>Requirement:</strong> Explain solution approach and planning methodology</p>
              <p><strong>Location:</strong> <Link href="/why-welltrack" className="text-purple-600 hover:underline font-semibold">/why-welltrack page</Link></p>
              <p><strong>Evidence:</strong></p>
              <ul className="list-disc ml-6 space-y-2">
                <li>Five solution components detailed (simplified tracking, AI pattern recognition, actionable recommendations, secure access, educational foundation)</li>
                <li>Six-step planning methodology documented</li>
                <li>Explanation of why the approach works with five justifications</li>
                <li>Clear connection between problem and solution strategy</li>
              </ul>
            </div>
          </div>

          {/* CCC.1.3 - Feature Explanation & AI Justification */}
          <div className="bg-white rounded-2xl shadow-2xl p-10">
            <div className="flex items-start justify-between mb-6">
              <h2 className="text-3xl font-bold text-gray-900">CCC.1.3 - Features & AI Justification</h2>
              <span className="bg-green-100 text-green-800 px-4 py-2 rounded-full text-sm font-bold">✓ Complete</span>
            </div>
            <div className="space-y-4 text-gray-700 text-lg">
              <p><strong>Requirement:</strong> Explain features with clear AI integration justification</p>
              <p><strong>Location:</strong> <Link href="/features" className="text-purple-600 hover:underline font-semibold">/features page</Link></p>
              <p><strong>Evidence:</strong></p>
              <ul className="list-disc ml-6 space-y-2">
                <li>Six major features documented with detailed descriptions</li>
                <li>Dedicated AI integration section with highlighted border</li>
                <li>Five specific ways AI enhances WellTrack explained</li>
                <li>Example AI insight provided</li>
                <li>Separate "Why AI is Essential" section with four justifications</li>
                <li>Clear statement: "Without AI, WellTrack would be just another digital journal"</li>
              </ul>
            </div>
          </div>

          {/* Technical Requirements */}
          <div className="bg-white rounded-lg shadow-lg p-8">
            <div className="flex items-start justify-between mb-4">
              <h2 className="text-2xl font-bold text-gray-900">Technical Requirements</h2>
              <span className="bg-green-100 text-green-800 px-3 py-1 rounded-full text-sm font-semibold">✓ Complete</span>
            </div>
            <div className="space-y-3 text-gray-700">
              <p><strong>Next.js 16 (App Router):</strong></p>
              <ul className="list-disc ml-6 space-y-1">
                <li>✓ Using Next.js 16.1.1 with App Router architecture</li>
                <li>✓ All pages in app/ directory structure</li>
                <li>✓ API routes in app/api/</li>
              </ul>
              
              <p className="mt-4"><strong>JavaScript (not TypeScript):</strong></p>
              <ul className="list-disc ml-6 space-y-1">
                <li>✓ All files use .js extension</li>
                <li>✓ No TypeScript configuration</li>
              </ul>

              <p className="mt-4"><strong>Prisma + PostgreSQL:</strong></p>
              <ul className="list-disc ml-6 space-y-1">
                <li>✓ prisma/schema.prisma with User and WellnessEntry models</li>
                <li>✓ PostgreSQL database configured</li>
                <li>✓ lib/prisma.js for client instantiation</li>
              </ul>

              <p className="mt-4"><strong>Tailwind CSS:</strong></p>
              <ul className="list-disc ml-6 space-y-1">
                <li>✓ Tailwind CSS 4 installed and configured</li>
                <li>✓ All pages styled with Tailwind utility classes</li>
              </ul>

              <p className="mt-4"><strong>bcryptjs Authentication:</strong></p>
              <ul className="list-disc ml-6 space-y-1">
                <li>✓ bcryptjs installed for password hashing</li>
                <li>✓ NextAuth configured in app/api/auth/[...nextauth]/route.js</li>
                <li>✓ Registration endpoint with password hashing</li>
              </ul>
            </div>
          </div>

          {/* Page Requirements */}
          <div className="bg-white rounded-lg shadow-lg p-8">
            <div className="flex items-start justify-between mb-4">
              <h2 className="text-2xl font-bold text-gray-900">Seven Required Pages</h2>
              <span className="bg-green-100 text-green-800 px-3 py-1 rounded-full text-sm font-semibold">✓ Complete</span>
            </div>
            <div className="space-y-2 text-gray-700">
              <div className="flex items-center justify-between border-b pb-2">
                <span>1. Home (/) - Static explanation + navigation</span>
                <span className="text-green-600 font-semibold">✓</span>
              </div>
              <div className="flex items-center justify-between border-b pb-2">
                <span>2. About (/about) - CCC.1.1 problem explanation</span>
                <span className="text-green-600 font-semibold">✓</span>
              </div>
              <div className="flex items-center justify-between border-b pb-2">
                <span>3. Why WellTrack? (/why-welltrack) - CCC.1.2 solution planning</span>
                <span className="text-green-600 font-semibold">✓</span>
              </div>
              <div className="flex items-center justify-between border-b pb-2">
                <span>4. Features (/features) - CCC.1.3 features + AI justification</span>
                <span className="text-green-600 font-semibold">✓</span>
              </div>
              <div className="flex items-center justify-between border-b pb-2">
                <span>5. Product (/product) - Interactive MVP with input/output</span>
                <span className="text-green-600 font-semibold">✓</span>
              </div>
              <div className="flex items-center justify-between border-b pb-2">
                <span>6. Rubric Evidence (/rubric-evidence) - LP Staff only</span>
                <span className="text-green-600 font-semibold">✓ (Current page)</span>
              </div>
              <div className="flex items-center justify-between border-b pb-2">
                <span>7. Reflection (/reflection) - LP Staff only</span>
                <span className="text-green-600 font-semibold">✓</span>
              </div>
            </div>
          </div>

          {/* Role-Based Access Control */}
          <div className="bg-white rounded-lg shadow-lg p-8">
            <div className="flex items-start justify-between mb-4">
              <h2 className="text-2xl font-bold text-gray-900">Role-Based Access Control</h2>
              <span className="bg-green-100 text-green-800 px-3 py-1 rounded-full text-sm font-semibold">✓ Complete</span>
            </div>
            <div className="space-y-3 text-gray-700">
              <p><strong>Implementation:</strong></p>
              <ul className="list-disc ml-6 space-y-1">
                <li>✓ middleware.js protects /rubric-evidence and /reflection routes</li>
                <li>✓ Checks authentication via NextAuth JWT token</li>
                <li>✓ Validates user email against LP_STAFF_EMAILS environment variable</li>
                <li>✓ Redirects to /auth/signin if not authenticated</li>
                <li>✓ Redirects to /unauthorized if authenticated but not LP staff</li>
                <li>✓ Unauthorized page provides clear messaging</li>
              </ul>
            </div>
          </div>

          {/* AI Integration */}
          <div className="bg-white rounded-lg shadow-lg p-8">
            <div className="flex items-start justify-between mb-4">
              <h2 className="text-2xl font-bold text-gray-900">AI Integration (Non-Optional)</h2>
              <span className="bg-green-100 text-green-800 px-3 py-1 rounded-full text-sm font-semibold">✓ Complete</span>
            </div>
            <div className="space-y-3 text-gray-700">
              <p><strong>Requirement:</strong> AI must analyze user data and produce insights/recommendations</p>
              <p><strong>Implementation:</strong></p>
              <ul className="list-disc ml-6 space-y-1">
                <li>✓ app/api/analyze/route.js endpoint created</li>
                <li>✓ Fetches user's wellness entries from database</li>
                <li>✓ Sends contextual data to AI service</li>
                <li>✓ AI generates personalized insights based on actual user data</li>
                <li>✓ Product page displays AI insights after each entry submission</li>
                <li>✓ Not a placeholder - produces unique output per user</li>
              </ul>
            </div>
          </div>

          {/* README */}
          <div className="bg-white rounded-lg shadow-lg p-8">
            <div className="flex items-start justify-between mb-4">
              <h2 className="text-2xl font-bold text-gray-900">README Documentation</h2>
              <span className="bg-green-100 text-green-800 px-3 py-1 rounded-full text-sm font-semibold">✓ Complete</span>
            </div>
            <div className="space-y-3 text-gray-700">
              <p><strong>Includes:</strong></p>
              <ul className="list-disc ml-6 space-y-1">
                <li>✓ Project overview</li>
                <li>✓ Problem summary (CCC.1.1)</li>
                <li>✓ Solution planning (CCC.1.2)</li>
                <li>✓ Feature list with AI integration explanation (CCC.1.3)</li>
                <li>✓ Complete tech stack</li>
                <li>✓ Installation and setup instructions</li>
                <li>✓ Project structure</li>
                <li>✓ Reflection section</li>
              </ul>
            </div>
          </div>
        </div>

        {/* Summary */}
        <div className="bg-green-600 text-white rounded-lg shadow-lg p-8 mt-8">
          <h2 className="text-3xl font-bold mb-4">Assessment Summary</h2>
          <p className="text-lg mb-4">
            All rubric requirements have been successfully fulfilled. This project demonstrates:
          </p>
          <ul className="space-y-2">
            <li>✓ Clear problem explanation (CCC.1.1)</li>
            <li>✓ Documented solution planning (CCC.1.2)</li>
            <li>✓ Comprehensive feature explanation with AI justification (CCC.1.3)</li>
            <li>✓ All seven required pages implemented</li>
            <li>✓ Functional AI integration (not placeholder)</li>
            <li>✓ Role-based access control for LP staff pages</li>
            <li>✓ Required technology stack (Next.js 16, JS, Prisma, PostgreSQL, Tailwind, bcryptjs)</li>
            <li>✓ Complete README documentation</li>
          </ul>
        </div>
      </div>
    </div>
  )
}
