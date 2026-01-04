import Link from 'next/link'

export default function Home() {
  return (
    <div style={{ minHeight: '100vh' }}>
      {/* Hero Section with Gradient */}
      <div style={{ background: 'linear-gradient(135deg, #3b82f6 0%, #8b5cf6 50%, #7c3aed 100%)' }}>
        {/* Navigation */}
        <nav style={{ maxWidth: '1152px', margin: '0 auto', padding: '1.5rem 2rem' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <Link href="/" style={{ fontSize: '1.5rem', fontWeight: 'bold', color: 'white', textDecoration: 'none' }}>
              WellTrack
            </Link>
            <div style={{ display: 'flex', alignItems: 'center', gap: '2rem' }}>
              <Link href="/about" style={{ color: 'rgba(255,255,255,0.9)', textDecoration: 'none', fontWeight: '500' }}>About</Link>
              <Link href="/features" style={{ color: 'rgba(255,255,255,0.9)', textDecoration: 'none', fontWeight: '500' }}>Features</Link>
              <Link href="/product" style={{ color: 'rgba(255,255,255,0.9)', textDecoration: 'none', fontWeight: '500' }}>Product</Link>
            </div>
          </div>
        </nav>

        {/* Hero Content */}
        <div style={{ maxWidth: '1152px', margin: '0 auto', padding: '4rem 2rem 8rem', textAlign: 'center' }}>
          <div style={{ display: 'inline-flex', alignItems: 'center', gap: '0.5rem', backgroundColor: 'rgba(255,255,255,0.2)', color: 'white', padding: '0.625rem 1.25rem', borderRadius: '9999px', fontSize: '0.875rem', fontWeight: '500', marginBottom: '2rem' }}>
            <span style={{ color: '#fde047' }}>✨</span>
            <span>AI-Powered Wellness Tracking</span>
          </div>
          <h1 style={{ fontSize: 'clamp(2.5rem, 5vw, 3.75rem)', fontWeight: 'bold', color: 'white', marginBottom: '1.5rem', lineHeight: '1.1', letterSpacing: '-0.02em' }}>
            Your Mental Health,
            <br />
            Simplified & Supported
          </h1>
          <p style={{ fontSize: '1.25rem', color: 'rgba(255,255,255,0.8)', marginBottom: '2.5rem', maxWidth: '42rem', margin: '0 auto 2.5rem', lineHeight: '1.6' }}>
            Track your mood, discover patterns, and receive personalized AI insights to transform your mental wellness journey.
          </p>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '1rem', justifyContent: 'center' }}>
            <Link 
              href="/product" 
              style={{ backgroundColor: 'white', color: '#7c3aed', padding: '1rem 2rem', borderRadius: '9999px', fontSize: '1.125rem', fontWeight: '600', textDecoration: 'none', boxShadow: '0 10px 15px -3px rgba(0,0,0,0.1)' }}
            >
              Start Tracking Free
            </Link>
            <Link 
              href="/features" 
              style={{ backgroundColor: 'rgba(255,255,255,0.1)', border: '2px solid rgba(255,255,255,0.4)', color: 'white', padding: '1rem 2rem', borderRadius: '9999px', fontSize: '1.125rem', fontWeight: '600', textDecoration: 'none' }}
            >
              Explore Features
            </Link>
          </div>
        </div>
      </div>

      {/* Features Section - White Background with Curved Top */}
      <div style={{ backgroundColor: 'white', marginTop: '-4rem', borderRadius: '3rem 3rem 0 0', position: 'relative', zIndex: 10 }}>
        <div style={{ maxWidth: '1152px', margin: '0 auto', padding: '5rem 2rem' }}>
          <h2 style={{ fontSize: 'clamp(1.875rem, 4vw, 2.25rem)', fontWeight: 'bold', color: '#111827', textAlign: 'center', marginBottom: '4rem', letterSpacing: '-0.02em' }}>
            Everything You Need for Mental Wellness
          </h2>
          
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '2rem' }}>
            {/* Track Daily Card */}
            <div style={{ backgroundColor: 'white', border: '1px solid #e5e7eb', borderRadius: '1rem', padding: '2rem' }}>
              <div style={{ width: '3.5rem', height: '3.5rem', background: 'linear-gradient(135deg, #f472b6, #8b5cf6)', borderRadius: '0.75rem', display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: '1.5rem' }}>
                <span style={{ fontSize: '1.5rem' }}>📊</span>
              </div>
              <h3 style={{ fontSize: '1.25rem', fontWeight: 'bold', color: '#111827', marginBottom: '0.75rem' }}>Track Daily</h3>
              <p style={{ color: '#6b7280', lineHeight: '1.6' }}>
                Log mood, sleep, stress, and activities in under 2 minutes with our intuitive interface.
              </p>
            </div>

            {/* AI Insights Card */}
            <div style={{ backgroundColor: 'white', border: '1px solid #e5e7eb', borderRadius: '1rem', padding: '2rem' }}>
              <div style={{ width: '3.5rem', height: '3.5rem', background: 'linear-gradient(135deg, #f472b6, #f43f5e)', borderRadius: '0.75rem', display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: '1.5rem' }}>
                <span style={{ fontSize: '1.5rem' }}>🧠</span>
              </div>
              <h3 style={{ fontSize: '1.25rem', fontWeight: 'bold', color: '#111827', marginBottom: '0.75rem' }}>AI Insights</h3>
              <p style={{ color: '#6b7280', lineHeight: '1.6' }}>
                Get personalized recommendations powered by advanced pattern recognition.
              </p>
            </div>

            {/* See Progress Card */}
            <div style={{ backgroundColor: 'white', border: '1px solid #e5e7eb', borderRadius: '1rem', padding: '2rem' }}>
              <div style={{ width: '3.5rem', height: '3.5rem', background: 'linear-gradient(135deg, #60a5fa, #06b6d4)', borderRadius: '0.75rem', display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: '1.5rem' }}>
                <span style={{ fontSize: '1.5rem' }}>📈</span>
              </div>
              <h3 style={{ fontSize: '1.25rem', fontWeight: 'bold', color: '#111827', marginBottom: '0.75rem' }}>See Progress</h3>
              <p style={{ color: '#6b7280', lineHeight: '1.6' }}>
                Visualize trends and understand what impacts your mental wellness most.
              </p>
            </div>
          </div>
        </div>

        {/* Explore Section */}
        <div style={{ backgroundColor: '#f9fafb', padding: '5rem 0' }}>
          <div style={{ maxWidth: '1152px', margin: '0 auto', padding: '0 2rem' }}>
            <h2 style={{ fontSize: '1.875rem', fontWeight: 'bold', color: '#111827', textAlign: 'center', marginBottom: '3rem', letterSpacing: '-0.02em' }}>
              Explore WellTrack
            </h2>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '1.5rem' }}>
              <Link 
                href="/about" 
                style={{ backgroundColor: 'white', border: '1px solid #e5e7eb', padding: '1.5rem', borderRadius: '0.75rem', textAlign: 'center', textDecoration: 'none' }}
              >
                <h3 style={{ fontWeight: 'bold', color: '#111827', fontSize: '1.125rem', marginBottom: '0.5rem' }}>About</h3>
                <p style={{ fontSize: '0.875rem', color: '#6b7280' }}>The problem we solve</p>
              </Link>
              <Link 
                href="/why-welltrack" 
                style={{ backgroundColor: 'white', border: '1px solid #e5e7eb', padding: '1.5rem', borderRadius: '0.75rem', textAlign: 'center', textDecoration: 'none' }}
              >
                <h3 style={{ fontWeight: 'bold', color: '#111827', fontSize: '1.125rem', marginBottom: '0.5rem' }}>Why WellTrack?</h3>
                <p style={{ fontSize: '0.875rem', color: '#6b7280' }}>Our approach</p>
              </Link>
              <Link 
                href="/features" 
                style={{ backgroundColor: 'white', border: '1px solid #e5e7eb', padding: '1.5rem', borderRadius: '0.75rem', textAlign: 'center', textDecoration: 'none' }}
              >
                <h3 style={{ fontWeight: 'bold', color: '#111827', fontSize: '1.125rem', marginBottom: '0.5rem' }}>Features</h3>
                <p style={{ fontSize: '0.875rem', color: '#6b7280' }}>What we offer</p>
              </Link>
              <Link 
                href="/product" 
                style={{ backgroundColor: '#9333ea', color: 'white', padding: '1.5rem', borderRadius: '0.75rem', textAlign: 'center', textDecoration: 'none', boxShadow: '0 10px 15px -3px rgba(0,0,0,0.1)' }}
              >
                <h3 style={{ fontWeight: 'bold', fontSize: '1.125rem', marginBottom: '0.5rem' }}>Get Started</h3>
                <p style={{ fontSize: '0.875rem', color: '#e9d5ff' }}>Try it now</p>
              </Link>
            </div>
          </div>
        </div>

        {/* Footer */}
        <footer style={{ borderTop: '1px solid #e5e7eb', padding: '3rem 0', backgroundColor: 'white' }}>
          <div style={{ maxWidth: '1152px', margin: '0 auto', padding: '0 2rem', textAlign: 'center' }}>
            <p style={{ fontWeight: 'bold', fontSize: '1.25rem', color: '#111827', marginBottom: '0.5rem' }}>WellTrack</p>
            <p style={{ color: '#6b7280' }}>Mental Health & Wellness Tracking Platform</p>
            <p style={{ fontSize: '0.875rem', color: '#9ca3af', marginTop: '1rem' }}>Built with Next.js, Prisma, PostgreSQL & AI</p>
          </div>
        </footer>
      </div>
    </div>
  )
}
