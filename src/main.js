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

// Update metrics display
function updateMetrics() {
  const alphaEl = document.getElementById('alpha-value')
  const betaEl = document.getElementById('beta-value')
  const thetaEl = document.getElementById('theta-value')
  const deltaEl = document.getElementById('delta-value')

  if (alphaEl) alphaEl.textContent = state.brainWaveData.alpha + '%'
  if (betaEl) betaEl.textContent = state.brainWaveData.beta + '%'
  if (thetaEl) thetaEl.textContent = state.brainWaveData.theta + '%'
  if (deltaEl) deltaEl.textContent = state.brainWaveData.delta + '%'
}

// Toggle connection
function toggleConnection() {
  state.isConnected = !state.isConnected

  const statusDisplay = document.querySelector('.brain-wave-display')
  const connectBtn = document.getElementById('connect-btn')

  if (state.isConnected) {
    statusDisplay.innerHTML = `
      <div class="wave-animation">🧠</div>
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
      <div class="wave-animation">🔌</div>
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
        <div class="logo">Neural Sync</div>
        <nav class="nav">
          <a href="#features">Features</a>
          <a href="#status">Status</a>
          <a href="#about">About</a>
        </nav>
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
          <div class="wave-animation">🔌</div>
          <h3>Device Disconnected</h3>
          <p>Connect your device to begin analysis</p>
        </div>

        <div class="metrics-grid">
          <div class="metric">
            <div class="metric-value" id="alpha-value">0%</div>
            <div class="metric-label">Alpha Waves</div>
          </div>

          <div class="metric">
            <div class="metric-value" id="beta-value">0%</div>
            <div class="metric-label">Beta Waves</div>
          </div>

          <div class="metric">
            <div class="metric-value" id="theta-value">0%</div>
            <div class="metric-label">Theta Waves</div>
          </div>

          <div class="metric">
            <div class="metric-value" id="delta-value">0%</div>
            <div class="metric-label">Delta Waves</div>
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