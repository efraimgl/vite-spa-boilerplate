import './style.css'

// App State
const state = {
  isConnected: false,
  brainWaveData: {
    alpha: 0,
    beta: 0,
    theta: 0,
    delta: 0
  },
  waitlistSubmitted: false
}

// Simulate brain wave data updates
function simulateBrainWaveData() {
  if (state.isConnected) {
    state.brainWaveData = {
      alpha: Math.floor(Math.random() * 100),
      beta: Math.floor(Math.random() * 100),
      theta: Math.floor(Math.random() * 100),
      delta: Math.floor(Math.random() * 100)
    }
    updateMetrics()
  }
}

// Generate animated brain wave SVG
function generateBrainWaveSVG() {
  return `
    <svg width="120" height="80" viewBox="0 0 120 80" style="filter: drop-shadow(0 4px 8px rgba(0,0,0,0.3));">
      <path id="wave1" d="M 0 40 Q 15 20, 30 40 T 60 40 T 90 40 T 120 40"
            stroke="#fff" stroke-width="3" fill="none" opacity="0.9">
        <animate attributeName="d"
                 dur="2s"
                 repeatCount="indefinite"
                 values="M 0 40 Q 15 20, 30 40 T 60 40 T 90 40 T 120 40;
                         M 0 40 Q 15 60, 30 40 T 60 40 T 90 40 T 120 40;
                         M 0 40 Q 15 20, 30 40 T 60 40 T 90 40 T 120 40"/>
      </path>
      <path id="wave2" d="M 0 50 Q 15 30, 30 50 T 60 50 T 90 50 T 120 50"
            stroke="#fff" stroke-width="2.5" fill="none" opacity="0.7">
        <animate attributeName="d"
                 dur="2.5s"
                 repeatCount="indefinite"
                 values="M 0 50 Q 15 30, 30 50 T 60 50 T 90 50 T 120 50;
                         M 0 50 Q 15 70, 30 50 T 60 50 T 90 50 T 120 50;
                         M 0 50 Q 15 30, 30 50 T 60 50 T 90 50 T 120 50"/>
      </path>
      <path id="wave3" d="M 0 30 Q 15 15, 30 30 T 60 30 T 90 30 T 120 30"
            stroke="#fff" stroke-width="2" fill="none" opacity="0.5">
        <animate attributeName="d"
                 dur="3s"
                 repeatCount="indefinite"
                 values="M 0 30 Q 15 15, 30 30 T 60 30 T 90 30 T 120 30;
                         M 0 30 Q 15 45, 30 30 T 60 30 T 90 30 T 120 30;
                         M 0 30 Q 15 15, 30 30 T 60 30 T 90 30 T 120 30"/>
      </path>
    </svg>
  `
}

// Update metrics display
function updateMetrics() {
  const alphaEl = document.getElementById('alpha-value')
  const betaEl = document.getElementById('beta-value')
  const thetaEl = document.getElementById('theta-value')
  const deltaEl = document.getElementById('delta-value')

  const alphaBar = document.getElementById('alpha-bar')
  const betaBar = document.getElementById('beta-bar')
  const thetaBar = document.getElementById('theta-bar')
  const deltaBar = document.getElementById('delta-bar')

  if (alphaEl) alphaEl.textContent = state.brainWaveData.alpha + '%'
  if (betaEl) betaEl.textContent = state.brainWaveData.beta + '%'
  if (thetaEl) thetaEl.textContent = state.brainWaveData.theta + '%'
  if (deltaEl) deltaEl.textContent = state.brainWaveData.delta + '%'

  if (alphaBar) alphaBar.style.width = state.brainWaveData.alpha + '%'
  if (betaBar) betaBar.style.width = state.brainWaveData.beta + '%'
  if (thetaBar) thetaBar.style.width = state.brainWaveData.theta + '%'
  if (deltaBar) deltaBar.style.width = state.brainWaveData.delta + '%'
}

// Handle waitlist form submission
function handleWaitlistSubmit(event) {
  event.preventDefault()

  const emailInput = document.getElementById('email-input')
  const email = emailInput.value

  // Mock data submission (no real API call)
  console.log('Mock waitlist submission:', { email, timestamp: new Date().toISOString() })

  // Update state
  state.waitlistSubmitted = true

  // Hide form and show success message
  const form = document.getElementById('waitlist-form')
  const successMessage = document.getElementById('success-message')

  if (form) form.style.display = 'none'
  if (successMessage) {
    successMessage.style.display = 'block'
    successMessage.classList.add('show')
  }
}

// Toggle connection
function toggleConnection() {
  state.isConnected = !state.isConnected

  const statusDisplay = document.querySelector('.brain-wave-display')
  const connectBtn = document.getElementById('connect-btn')

  if (state.isConnected) {
    statusDisplay.innerHTML = `
      <div class="wave-animation">${generateBrainWaveSVG()}</div>
      <h3>Connected</h3>
      <p>Analyzing brain wave patterns in real-time</p>
    `
    connectBtn.textContent = 'Disconnect Device'
    connectBtn.classList.remove('btn-primary')
    connectBtn.classList.add('btn-secondary')

    // Start simulation
    setInterval(simulateBrainWaveData, 2000)
  } else {
    statusDisplay.innerHTML = `
      <div class="wave-animation">
        <svg width="80" height="80" viewBox="0 0 80 80" style="filter: drop-shadow(0 4px 8px rgba(0,0,0,0.3));">
          <circle cx="40" cy="40" r="30" stroke="#fff" stroke-width="3" fill="none" opacity="0.6"/>
          <circle cx="40" cy="40" r="20" stroke="#fff" stroke-width="2" fill="none" opacity="0.4"/>
          <line x1="40" y1="20" x2="40" y2="60" stroke="#fff" stroke-width="3" opacity="0.5"/>
          <line x1="20" y1="40" x2="60" y2="40" stroke="#fff" stroke-width="3" opacity="0.5"/>
        </svg>
      </div>
      <h3>Device Disconnected</h3>
      <p>Connect your device to begin analysis</p>
    `
    connectBtn.textContent = 'Connect Device'
    connectBtn.classList.remove('btn-secondary')
    connectBtn.classList.add('btn-primary')
  }
}

// Render App
function renderApp() {
  const app = document.querySelector('#app')

  app.innerHTML = `
    <!-- Header -->
    <header class="header">
      <div class="header-video-bg">
        <iframe
          src="https://www.youtube.com/embed/5fpGTE3aIw0?autoplay=1&mute=1&loop=1&playlist=5fpGTE3aIw0&controls=0&showinfo=0&rel=0&modestbranding=1"
          title="Background video"
          frameborder="0"
          allow="autoplay; encrypted-media"
          allowfullscreen>
        </iframe>
      </div>
      <div class="header-content">
        <div class="logo">Neural Sync</div>
        <nav class="nav">
          <a href="#features">Features</a>
          <a href="#status">Status</a>
          <a href="#faq">Q&A</a>
          <a href="#waitlist">Waitlist</a>
        </nav>
      </div>
    </header>

    <!-- Hero Section -->
    <section class="hero">
      <h1>Unlock Your Mind's Full Potential</h1>
      <div class="hero-brain-animation">
        <svg viewBox="0 0 200 200" xmlns="http://www.w3.org/2000/svg">
          <!-- Brain outline -->
          <g class="brain-outline">
            <!-- Left hemisphere -->
            <path d="M 60 100 Q 50 70, 60 50 Q 70 30, 90 30 Q 100 30, 105 40 Q 110 30, 120 35 Q 130 40, 125 55 Q 130 65, 125 75 Q 130 85, 125 95 Q 125 105, 120 115 Q 115 125, 105 130 Q 95 135, 85 130 Q 75 125, 70 115 Q 65 105, 60 100 Z"
                  fill="none" stroke="url(#brainGradient1)" stroke-width="2" opacity="0.8"/>
            <!-- Right hemisphere -->
            <path d="M 140 100 Q 150 70, 140 50 Q 130 30, 110 30 Q 100 30, 95 40 Q 90 30, 80 35 Q 70 40, 75 55 Q 70 65, 75 75 Q 70 85, 75 95 Q 75 105, 80 115 Q 85 125, 95 130 Q 105 135, 115 130 Q 125 125, 130 115 Q 135 105, 140 100 Z"
                  fill="none" stroke="url(#brainGradient2)" stroke-width="2" opacity="0.8"/>
          </g>

          <!-- Neural connections -->
          <g class="neural-connections">
            <circle cx="70" cy="60" r="3" fill="#667eea" opacity="0">
              <animate attributeName="opacity" values="0;1;0" dur="2s" repeatCount="indefinite" begin="0s"/>
              <animate attributeName="r" values="3;5;3" dur="2s" repeatCount="indefinite" begin="0s"/>
            </circle>
            <circle cx="90" cy="50" r="3" fill="#764ba2" opacity="0">
              <animate attributeName="opacity" values="0;1;0" dur="2.5s" repeatCount="indefinite" begin="0.5s"/>
              <animate attributeName="r" values="3;5;3" dur="2.5s" repeatCount="indefinite" begin="0.5s"/>
            </circle>
            <circle cx="110" cy="50" r="3" fill="#f093fb" opacity="0">
              <animate attributeName="opacity" values="0;1;0" dur="2s" repeatCount="indefinite" begin="1s"/>
              <animate attributeName="r" values="3;5;3" dur="2s" repeatCount="indefinite" begin="1s"/>
            </circle>
            <circle cx="130" cy="60" r="3" fill="#667eea" opacity="0">
              <animate attributeName="opacity" values="0;1;0" dur="2.5s" repeatCount="indefinite" begin="1.5s"/>
              <animate attributeName="r" values="3;5;3" dur="2.5s" repeatCount="indefinite" begin="1.5s"/>
            </circle>
            <circle cx="80" cy="90" r="3" fill="#764ba2" opacity="0">
              <animate attributeName="opacity" values="0;1;0" dur="2s" repeatCount="indefinite" begin="0.3s"/>
              <animate attributeName="r" values="3;5;3" dur="2s" repeatCount="indefinite" begin="0.3s"/>
            </circle>
            <circle cx="100" cy="85" r="3" fill="#f093fb" opacity="0">
              <animate attributeName="opacity" values="0;1;0" dur="2.5s" repeatCount="indefinite" begin="0.8s"/>
              <animate attributeName="r" values="3;5;3" dur="2.5s" repeatCount="indefinite" begin="0.8s"/>
            </circle>
            <circle cx="120" cy="90" r="3" fill="#667eea" opacity="0">
              <animate attributeName="opacity" values="0;1;0" dur="2s" repeatCount="indefinite" begin="1.3s"/>
              <animate attributeName="r" values="3;5;3" dur="2s" repeatCount="indefinite" begin="1.3s"/>
            </circle>
          </g>

          <!-- Energy waves -->
          <g class="energy-waves">
            <circle cx="100" cy="80" r="20" fill="none" stroke="#667eea" stroke-width="1" opacity="0">
              <animate attributeName="r" values="20;60;80" dur="3s" repeatCount="indefinite"/>
              <animate attributeName="opacity" values="0.8;0.3;0" dur="3s" repeatCount="indefinite"/>
            </circle>
            <circle cx="100" cy="80" r="20" fill="none" stroke="#764ba2" stroke-width="1" opacity="0">
              <animate attributeName="r" values="20;60;80" dur="3s" repeatCount="indefinite" begin="1s"/>
              <animate attributeName="opacity" values="0.8;0.3;0" dur="3s" repeatCount="indefinite" begin="1s"/>
            </circle>
            <circle cx="100" cy="80" r="20" fill="none" stroke="#f093fb" stroke-width="1" opacity="0">
              <animate attributeName="r" values="20;60;80" dur="3s" repeatCount="indefinite" begin="2s"/>
              <animate attributeName="opacity" values="0.8;0.3;0" dur="3s" repeatCount="indefinite" begin="2s"/>
            </circle>
          </g>

          <!-- Gradients -->
          <defs>
            <linearGradient id="brainGradient1" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" style="stop-color:#667eea;stop-opacity:1">
                <animate attributeName="stop-color" values="#667eea;#764ba2;#667eea" dur="4s" repeatCount="indefinite"/>
              </stop>
              <stop offset="100%" style="stop-color:#764ba2;stop-opacity:1">
                <animate attributeName="stop-color" values="#764ba2;#f093fb;#764ba2" dur="4s" repeatCount="indefinite"/>
              </stop>
            </linearGradient>
            <linearGradient id="brainGradient2" x1="100%" y1="0%" x2="0%" y2="100%">
              <stop offset="0%" style="stop-color:#764ba2;stop-opacity:1">
                <animate attributeName="stop-color" values="#764ba2;#f093fb;#764ba2" dur="4s" repeatCount="indefinite"/>
              </stop>
              <stop offset="100%" style="stop-color:#f093fb;stop-opacity:1">
                <animate attributeName="stop-color" values="#f093fb;#667eea;#f093fb" dur="4s" repeatCount="indefinite"/>
              </stop>
            </linearGradient>
          </defs>
        </svg>
      </div>
      <p class="subtitle">Experience the world's first AI-powered brain wave analysis platform that transforms your mental data into actionable insights for peak performance, better sleep, and enhanced focus.</p>
      <div class="cta-buttons">
        <a href="#waitlist" class="btn btn-primary">Get Early Access</a>
        <button id="connect-btn" class="btn btn-secondary">Try Demo</button>
      </div>
      <div class="hero-stats">
        <div class="stat-item">
          <div class="stat-value">10,000+</div>
          <div class="stat-label">Beta Testers</div>
        </div>
        <div class="stat-item">
          <div class="stat-value">95%</div>
          <div class="stat-label">Accuracy Rate</div>
        </div>
        <div class="stat-item">
          <div class="stat-value">24/7</div>
          <div class="stat-label">Real-Time Tracking</div>
        </div>
      </div>
    </section>

    <!-- Value Proposition Section -->
    <section class="value-prop-section">
      <div class="value-prop-container">
        <h2>Why Neural Sync Changes Everything</h2>
        <p class="section-subtitle">Stop guessing about your mental state. Start optimizing it.</p>
        <div class="value-prop-grid">
          <div class="value-prop-card">
            <div class="value-prop-number">01</div>
            <h3>Know Yourself Deeply</h3>
            <p>Most people never understand what's happening inside their minds. Neural Sync gives you X-ray vision into your brain's activity patterns, revealing when you're most creative, focused, or need rest.</p>
          </div>
          <div class="value-prop-card">
            <div class="value-prop-number">02</div>
            <h3>Optimize Your Performance</h3>
            <p>Elite athletes and CEOs use brain wave training to gain an edge. Now you can too. Discover your peak performance windows and train your brain like a muscle.</p>
          </div>
          <div class="value-prop-card">
            <div class="value-prop-number">03</div>
            <h3>Improve Your Wellbeing</h3>
            <p>Struggling with sleep, stress, or focus? Neural Sync identifies patterns in your brain activity and provides personalized recommendations to help you feel your best every day.</p>
          </div>
        </div>
        <div class="cta-center">
          <a href="#waitlist" class="btn btn-primary btn-large">Join 10,000+ Early Adopters</a>
        </div>
      </div>
    </section>

    <!-- How It Works Section -->
    <section class="how-it-works-section">
      <div class="how-it-works-container">
        <h2>How Neural Sync Works</h2>
        <p class="section-subtitle">Three simple steps to understanding your mind</p>
        <div class="steps-grid">
          <div class="step-card">
            <div class="step-number">1</div>
            <h3>Connect Your Device</h3>
            <p>Pair your EEG headband or brain-sensing device with Neural Sync in seconds. Compatible with Muse, NeuroSky, Emotiv, and more.</p>
          </div>
          <div class="step-card">
            <div class="step-number">2</div>
            <h3>AI Analyzes Your Brain</h3>
            <p>Our advanced AI processes your brain wave patterns in real-time, identifying states of focus, relaxation, stress, and creativity.</p>
          </div>
          <div class="step-card">
            <div class="step-number">3</div>
            <h3>Get Actionable Insights</h3>
            <p>Receive personalized recommendations, track your progress over time, and optimize your mental performance with data-driven strategies.</p>
          </div>
        </div>
      </div>
    </section>

    <!-- Features Section -->
    <section id="features" class="features">
      <h2 class="features-title">Powerful Features That Set Us Apart</h2>
      <div class="features-grid">
        <div class="feature-card">
          <div class="feature-icon">🧠</div>
          <h3>Real-time Neural Monitoring</h3>
          <p>Watch your brain waves dance in real-time as you meditate, work, or relax. Our millisecond-precision tracking captures every shift in your mental state, giving you unprecedented insight into your consciousness.</p>
        </div>

        <div class="feature-card">
          <div class="feature-icon">📊</div>
          <h3>Deep Pattern Recognition</h3>
          <p>Unlock the secrets hidden in your brain data. Our AI detects patterns you can't see, revealing your optimal work hours, meditation effectiveness, and sleep quality metrics that matter.</p>
        </div>

        <div class="feature-card">
          <div class="feature-icon">🔒</div>
          <h3>Military-Grade Privacy</h3>
          <p>Your thoughts are sacred. We use end-to-end encryption and on-device processing to ensure your brain data never leaves your control. No cloud storage, no third parties, no compromise.</p>
        </div>

        <div class="feature-card">
          <div class="feature-icon">💡</div>
          <h3>AI Coach & Insights</h3>
          <p>Get a personal brain coach powered by advanced AI. Receive contextual recommendations, performance tips, and personalized training programs that evolve with your progress.</p>
        </div>

        <div class="feature-card">
          <div class="feature-icon">📱</div>
          <h3>Works Everywhere</h3>
          <p>Seamlessly sync across iPhone, Android, Web, and Apple Watch. Your brain insights follow you wherever you go, with beautiful native apps designed for each platform.</p>
        </div>

        <div class="feature-card">
          <div class="feature-icon">⚡</div>
          <h3>Instant Biofeedback</h3>
          <p>Train your brain in real-time with instant feedback loops. See immediate results as you practice meditation, enter flow states, or optimize your focus sessions.</p>
        </div>
      </div>
    </section>

    <!-- Use Cases Section -->
    <section class="use-cases-section">
      <div class="use-cases-container">
        <h2>Transform Every Area of Your Life</h2>
        <div class="use-cases-grid">
          <div class="use-case-card">
            <h3>Peak Performance</h3>
            <p>Identify your optimal working hours and mental states for deep work. Train your brain to enter flow states on demand. Used by top performers at Google, Tesla, and YC startups.</p>
            <div class="use-case-metric">+47% productivity increase reported by users</div>
          </div>
          <div class="use-case-card">
            <h3>Better Sleep</h3>
            <p>Track your sleep cycles with unprecedented detail. Discover what disrupts your rest and optimize your evening routine for deeper, more restorative sleep every night.</p>
            <div class="use-case-metric">82% of users report improved sleep quality within 2 weeks</div>
          </div>
          <div class="use-case-card">
            <h3>Meditation Mastery</h3>
            <p>Stop guessing if you're "doing it right." Neural Sync shows you exactly when you reach deep meditative states, helping you progress faster than traditional practice alone.</p>
            <div class="use-case-metric">3x faster meditation skill development vs traditional methods</div>
          </div>
          <div class="use-case-card">
            <h3>Stress Management</h3>
            <p>Catch stress before it catches you. Real-time alerts when your brain shows stress patterns, plus guided exercises to restore balance and prevent burnout.</p>
            <div class="use-case-metric">-64% reduction in reported stress levels after 30 days</div>
          </div>
        </div>
        <div class="cta-center">
          <a href="#waitlist" class="btn btn-primary btn-large">Start Your Brain Optimization Journey</a>
        </div>
      </div>
    </section>

    <!-- Social Proof Section -->
    <section class="testimonials-section">
      <div class="testimonials-container">
        <h2>Loved By Peak Performers Worldwide</h2>
        <div class="testimonials-grid">
          <div class="testimonial-card">
            <div class="testimonial-content">
              <p>"Neural Sync helped me identify my peak focus hours. I now schedule my most important work during those windows and my productivity has doubled."</p>
            </div>
            <div class="testimonial-author">
              <div class="author-name">Sarah Chen</div>
              <div class="author-title">Software Engineer, Meta</div>
            </div>
          </div>
          <div class="testimonial-card">
            <div class="testimonial-content">
              <p>"As a meditation teacher, I was skeptical. But seeing my brain waves in real-time transformed my practice. Now I can guide students with objective feedback."</p>
            </div>
            <div class="testimonial-author">
              <div class="author-name">Michael Rodriguez</div>
              <div class="author-title">Mindfulness Coach</div>
            </div>
          </div>
          <div class="testimonial-card">
            <div class="testimonial-content">
              <p>"I struggled with insomnia for years. Neural Sync revealed patterns in my evening routine that were sabotaging my sleep. Life-changing doesn't even cover it."</p>
            </div>
            <div class="testimonial-author">
              <div class="author-name">Emily Thompson</div>
              <div class="author-title">Startup Founder</div>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- Status Section -->
    <section id="status" class="status-section">
      <div class="status-card">
        <div class="status-header">
          <h2>Brain Wave Monitor</h2>
          <p>Live analysis of your neural activity</p>
        </div>

        <div class="brain-wave-display">
          <div class="wave-animation">
            <svg width="80" height="80" viewBox="0 0 80 80" style="filter: drop-shadow(0 4px 8px rgba(0,0,0,0.3));">
              <circle cx="40" cy="40" r="30" stroke="#fff" stroke-width="3" fill="none" opacity="0.6"/>
              <circle cx="40" cy="40" r="20" stroke="#fff" stroke-width="2" fill="none" opacity="0.4"/>
              <line x1="40" y1="20" x2="40" y2="60" stroke="#fff" stroke-width="3" opacity="0.5"/>
              <line x1="20" y1="40" x2="60" y2="40" stroke="#fff" stroke-width="3" opacity="0.5"/>
            </svg>
          </div>
          <h3>Device Disconnected</h3>
          <p>Connect your device to begin analysis</p>
        </div>

        <div class="metrics-grid">
          <div class="metric">
            <div class="metric-label">Alpha Waves</div>
            <div class="metric-value" id="alpha-value">0%</div>
            <div class="metric-bar">
              <div class="metric-bar-fill" id="alpha-bar" style="width: 0%"></div>
            </div>
          </div>

          <div class="metric">
            <div class="metric-label">Beta Waves</div>
            <div class="metric-value" id="beta-value">0%</div>
            <div class="metric-bar">
              <div class="metric-bar-fill" id="beta-bar" style="width: 0%"></div>
            </div>
          </div>

          <div class="metric">
            <div class="metric-label">Theta Waves</div>
            <div class="metric-value" id="theta-value">0%</div>
            <div class="metric-bar">
              <div class="metric-bar-fill" id="theta-bar" style="width: 0%"></div>
            </div>
          </div>

          <div class="metric">
            <div class="metric-label">Delta Waves</div>
            <div class="metric-value" id="delta-value">0%</div>
            <div class="metric-bar">
              <div class="metric-bar-fill" id="delta-bar" style="width: 0%"></div>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- Q&A Section -->
    <section id="faq" class="faq-section">
      <div class="faq-container">
        <h2>Frequently Asked Questions</h2>
        <div class="faq-grid">
          <div class="faq-item">
            <h3>What are brain waves?</h3>
            <p>Brain waves are electrical impulses in the brain. They are measured in different frequency ranges: Alpha (relaxation), Beta (active thinking), Theta (meditation), and Delta (deep sleep).</p>
          </div>
          <div class="faq-item">
            <h3>How does Neural Sync work?</h3>
            <p>Neural Sync uses advanced AI algorithms to analyze brain wave patterns from compatible EEG devices, providing real-time insights into your mental state and cognitive performance.</p>
          </div>
          <div class="faq-item">
            <h3>Is my data secure?</h3>
            <p>Absolutely. All your brain wave data is encrypted end-to-end and processed on-device. We never share or sell your personal information.</p>
          </div>
          <div class="faq-item">
            <h3>What devices are supported?</h3>
            <p>Neural Sync supports most consumer EEG devices including Muse, NeuroSky, Emotiv, and other Bluetooth-enabled brain wave sensors.</p>
          </div>
          <div class="faq-item">
            <h3>Can I use this for meditation?</h3>
            <p>Yes! Neural Sync is perfect for meditation practice. Track your theta waves to measure depth of meditation and improve your mindfulness techniques.</p>
          </div>
          <div class="faq-item">
            <h3>How accurate is the analysis?</h3>
            <p>Our AI-powered analysis achieves 95%+ accuracy in brain wave classification, trained on millions of EEG samples from clinical research data.</p>
          </div>
        </div>
      </div>
    </section>

    <!-- Pricing Preview Section -->
    <section class="pricing-preview-section">
      <div class="pricing-preview-container">
        <h2>Early Bird Pricing - Limited Time Only</h2>
        <p class="section-subtitle">Lock in lifetime 50% discount as an early adopter</p>
        <div class="pricing-cards">
          <div class="pricing-card">
            <div class="pricing-badge">Most Popular</div>
            <h3>Premium</h3>
            <div class="pricing-price">
              <span class="price-strike">$19.99</span>
              <span class="price-current">$9.99</span>
              <span class="price-period">/month</span>
            </div>
            <ul class="pricing-features">
              <li>Unlimited brain wave tracking</li>
              <li>AI-powered insights & coaching</li>
              <li>All device integrations</li>
              <li>Advanced analytics & reports</li>
              <li>Priority support</li>
            </ul>
            <div class="pricing-savings">Save $120/year as early adopter</div>
          </div>
          <div class="pricing-card">
            <h3>Lifetime</h3>
            <div class="pricing-price">
              <span class="price-strike">$499</span>
              <span class="price-current">$249</span>
              <span class="price-period">one-time</span>
            </div>
            <ul class="pricing-features">
              <li>Everything in Premium</li>
              <li>Lifetime access - no subscriptions</li>
              <li>All future features included</li>
              <li>VIP community access</li>
              <li>Direct founder support</li>
            </ul>
            <div class="pricing-savings">Limited to first 1,000 users only</div>
          </div>
        </div>
        <div class="pricing-cta">
          <a href="#waitlist" class="btn btn-primary btn-large">Claim Your Early Bird Discount</a>
          <p class="pricing-note">Only 127 early bird spots remaining</p>
        </div>
      </div>
    </section>

    <!-- Waitlist Section -->
    <section id="waitlist" class="waitlist-section">
      <div class="waitlist-container">
        <div class="waitlist-content">
          <div class="waitlist-urgency">Limited Beta Access - Launching March 2025</div>
          <h2>Don't Miss Your Chance to Transform Your Mind</h2>
          <p>Join 10,000+ early adopters getting exclusive beta access. Early adopters get lifetime 50% discount + exclusive perks. Beta spots are filling up fast.</p>

          <div class="waitlist-benefits">
            <div class="benefit-item">
              <span class="benefit-icon">✓</span>
              <span>Priority beta access</span>
            </div>
            <div class="benefit-item">
              <span class="benefit-icon">✓</span>
              <span>Lifetime 50% discount</span>
            </div>
            <div class="benefit-item">
              <span class="benefit-icon">✓</span>
              <span>Exclusive founder's community</span>
            </div>
            <div class="benefit-item">
              <span class="benefit-icon">✓</span>
              <span>Shape product development</span>
            </div>
          </div>

          <form id="waitlist-form" class="waitlist-form">
            <input
              type="email"
              id="email-input"
              class="email-input"
              placeholder="Enter your email address"
              required
            />
            <button type="submit" class="btn btn-primary btn-large">Secure Your Spot Now</button>
          </form>

          <p class="waitlist-privacy">We respect your privacy. Unsubscribe anytime. No spam, ever.</p>

          <div id="success-message" class="success-message" style="display: none;">
            <div class="success-icon">✓</div>
            <h3>Welcome to the Neural Sync Family!</h3>
            <p>You're in! Check your email for next steps. We'll notify you when beta access opens and send your exclusive early bird discount code.</p>
            <div class="success-next-steps">
              <h4>What happens next?</h4>
              <ul>
                <li>You'll receive a confirmation email within 5 minutes</li>
                <li>We'll send you exclusive content about brain optimization</li>
                <li>Beta access notification when spots open (March 2025)</li>
                <li>Your lifetime 50% discount code will be waiting</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- Footer -->
    <footer class="footer">
      <div class="footer-content">
        <p>Neural Sync &copy; 2025. Advanced brain wave analysis technology.</p>
        <div class="footer-links">
          <a href="#privacy">Privacy Policy</a>
          <a href="#terms">Terms of Service</a>
          <a href="#support">Support</a>
        </div>
      </div>
    </footer>
  `

  // Attach event listeners
  const connectBtn = document.getElementById('connect-btn')
  if (connectBtn) {
    connectBtn.addEventListener('click', toggleConnection)
  }

  const waitlistForm = document.getElementById('waitlist-form')
  if (waitlistForm) {
    waitlistForm.addEventListener('submit', handleWaitlistSubmit)
  }

  // Show success message if already submitted
  if (state.waitlistSubmitted) {
    const form = document.getElementById('waitlist-form')
    const successMessage = document.getElementById('success-message')
    if (form) form.style.display = 'none'
    if (successMessage) {
      successMessage.style.display = 'block'
      successMessage.classList.add('show')
    }
  }
}

// Initialize app
renderApp()