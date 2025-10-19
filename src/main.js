import './style.css'

// App State
const state = {
  isConnected: false,
  brainWaveData: {
    alpha: 0,
    beta: 0,
    theta: 0,
    delta: 0
  }
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
      <div class="header-content">
        <div class="header-left">
          <div class="logo">Neural Sync</div>
          <nav class="nav">
            <a href="#features">Features</a>
            <a href="#status">Status</a>
            <a href="#about">About</a>
          </nav>
        </div>
        <div class="header-video">
          <iframe
            src="https://www.youtube.com/embed/5fpGTE3aIw0?si=-jiCEvqZDdvpScTr"
            title="YouTube video player"
            frameborder="0"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
            referrerpolicy="strict-origin-when-cross-origin"
            allowfullscreen>
          </iframe>
        </div>
      </div>
    </header>

    <!-- Hero Section -->
    <section class="hero">
      <h1>Understand Your Mind</h1>
      <p class="subtitle">Advanced brain wave analysis powered by AI</p>
      <div class="cta-buttons">
        <button id="connect-btn" class="btn btn-primary">Connect Device</button>
        <a href="#learn-more" class="btn btn-secondary">Learn more</a>
      </div>
    </section>

    <!-- Features Section -->
    <section id="features" class="features">
      <div class="features-grid">
        <div class="feature-card">
          <div class="feature-icon">🧠</div>
          <h3>Real-time Analysis</h3>
          <p>Monitor your brain waves in real-time with advanced AI algorithms that detect patterns and insights.</p>
        </div>

        <div class="feature-card">
          <div class="feature-icon">📊</div>
          <h3>Deep Insights</h3>
          <p>Get comprehensive analysis of alpha, beta, theta, and delta waves to understand your mental state.</p>
        </div>

        <div class="feature-card">
          <div class="feature-icon">🔒</div>
          <h3>Secure & Private</h3>
          <p>Your brain data stays private with end-to-end encryption and on-device processing.</p>
        </div>

        <div class="feature-card">
          <div class="feature-icon">💡</div>
          <h3>AI-Powered</h3>
          <p>Leverage cutting-edge language models to interpret and understand complex brain wave patterns.</p>
        </div>

        <div class="feature-card">
          <div class="feature-icon">📱</div>
          <h3>Cross-Platform</h3>
          <p>Access your data anywhere with seamless synchronization across all your devices.</p>
        </div>

        <div class="feature-card">
          <div class="feature-icon">⚡</div>
          <h3>Instant Feedback</h3>
          <p>Receive immediate feedback and recommendations based on your current brain activity.</p>
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
}

// Initialize app
renderApp()