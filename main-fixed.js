/**
 * Borderless NeoBank - Main JavaScript File
 * Handles all interactive functionality across the application
 */

// Wait for DOM to be fully loaded
document.addEventListener('DOMContentLoaded', function() {
  // Initialize all components
  initNavbar();
  initAnimations();
  initFormValidation();
  initDashboardFeatures();
});

/**
 * Navbar functionality
 */
function initNavbar() {
  const navbarToggle = document.querySelector('.navbar-toggle');
  const navbarMenu = document.querySelector('.navbar-menu');
  
  if (navbarToggle && navbarMenu) {
    navbarToggle.addEventListener('click', function() {
      navbarMenu.classList.toggle('active');
    });
  }
  
  // Close mobile menu when clicking outside
  document.addEventListener('click', function(e) {
    if (!e.target.closest('.navbar') && navbarMenu.classList.contains('active')) {
      navbarMenu.classList.remove('active');
    }
  });
}

/**
 * Scroll animations
 */
function initAnimations() {
  const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
  };

  const observer = new IntersectionObserver(function(entries) {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('animate-fade-in');
      }
    });
  }, observerOptions);

  // Observe all sections
  document.querySelectorAll('section').forEach(section => {
    observer.observe(section);
  });
}

/**
 * Form Validation
 */
function initFormValidation() {
  // Login form validation
  const loginForm = document.getElementById('loginForm');
  if (loginForm) {
    loginForm.addEventListener('submit', function(e) {
      e.preventDefault();
      
      const email = document.getElementById('email');
      const password = document.getElementById('password');
      
      if (!validateEmail(email.value)) {
        showError(email, 'Please enter a valid email address');
        return;
      }
      
      if (password.value.length < 6) {
        showError(password, 'Password must be at least 6 characters');
        return;
      }
      
      // Demo: redirect to dashboard
      showSuccess('Login successful! Redirecting...');
      setTimeout(() => {
        window.location.href = 'pages/dashboard.html';
      }, 1000);
    });
  }
  
  // Signup form validation
  const signupForm = document.getElementById('signupForm');
  if (signupForm) {
    signupForm.addEventListener('submit', function(e) {
      e.preventDefault();
      
      const firstName = document.getElementById('firstName');
      const lastName = document.getElementById('lastName');
      const email = document.getElementById('email');
      const password = document.getElementById('password');
      const currency = document.getElementById('currency');
      const terms = document.querySelector('input[name="terms"]');
      
      let isValid = true;
      
      if (firstName.value.trim() === '') {
        showError(firstName, 'First name is required');
        isValid = false;
      }
      
      if (lastName.value.trim() === '') {
        showError(lastName, 'Last name is required');
        isValid = false;
      }
      
      if (!validateEmail(email.value)) {
        showError(email, 'Please enter a valid business email');
        isValid = false;
      }
      
      if (password.value.length < 8) {
        showError(password, 'Password must be at least 8 characters');
        isValid = false;
      }
      
      if (!password.value.match(/\d/)) {
        showError(password, 'Password must contain at least one number');
        isValid = false;
      }
      
      if (currency.value === '') {
        showError(currency, 'Please select a primary currency');
        isValid = false;
      }
      
      if (!terms || !terms.checked) {
        showError(terms, 'You must agree to terms');
        isValid = false;
      }
      
      if (isValid) {
        showSuccess('Account created! Redirecting to dashboard...');
        setTimeout(() => {
          window.location.href = 'pages/dashboard.html';
        }, 1500);
      }
    });
  }
  
  // Real-time validation feedback
  document.querySelectorAll('.form-input').forEach(input => {
    input.addEventListener('blur', function() {
      validateField(this);
    });
    
    input.addEventListener('input', function() {
      clearError(this);
    });
  });
}

/**
 * Validate individual field
 */
function validateField(input) {
  const id = input.id;
  const value = input.value.trim();
  
  switch(id) {
    case 'email':
      if (value && !validateEmail(value)) {
        showError(input, 'Invalid email format');
        return false;
      }
      break;
    case 'password':
      if (value && value.length < 8) {
        showError(input, 'Password too short');
        return false;
      }
      break;
    case 'firstName':
    case 'lastName':
      if (value && value.length < 2) {
        showError(input, 'Name too short');
        return false;
      }
      break;
  }
  
  clearError(input);
  return true;
}

/**
 * Email validation helper
 */
function validateEmail(email) {
  const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return re.test(email);
}

/**
 * Show error message
 */
function showError(input, message) {
  clearError(input);
  input.style.borderColor = 'var(--error)';
  
  const errorDiv = document.createElement('div');
  errorDiv.className = 'form-error';
  errorDiv.textContent = message;
  input.parentNode.appendChild(errorDiv);
  
  input.classList.add('error');
}

/**
 * Clear error message
 */
function clearError(input) {
  input.style.borderColor = '';
  input.classList.remove('error');
  
  const errorDiv = input.parentNode.querySelector('.form-error');
  if (errorDiv) {
    errorDiv.remove();
  }
}

/**
 * Show success message (toast)
 */
function showSuccess(message) {
  // Remove existing toasts
  const existingToast = document.querySelector('.toast');
  if (existingToast) {
    existingToast.remove();
  }
  
  const toast = document.createElement('div');
  toast.className = 'toast';
  toast.style.cssText = `
    position: fixed;
    bottom: 2rem;
    right: 2rem;
    background: var(--success);
    color: var(--white);
    padding: 1rem 1.5rem;
    border-radius: var(--radius);
    font-weight: 500;
    z-index: var(--z-toast);
    animation: slideIn 0.3s ease;
    box-shadow: var(--shadow-lg);
  `;
  toast.textContent = message;
  
  document.body.appendChild(toast);
  
  setTimeout(() => {
    toast.style.animation = 'fadeOut 0.3s ease';
    setTimeout(() => toast.remove(), 300);
  }, 3000);
}

/**
 * Dashboard Features
 */
function initDashboardFeatures() {
  // Quick action clicks
  document.querySelectorAll('.quick-action').forEach(action => {
    action.addEventListener('click', function() {
      const label = this.querySelector('.quick-action-label').textContent;
      handleQuickAction(label);
    });
  });
  
  // Balance card interactions
  document.querySelectorAll('.balance-card').forEach(card => {
    card.addEventListener('click', function() {
      const currency = this.querySelector('.balance-card-label').textContent;
      showBalanceDetails(currency, this);
    });
  });
  
  // Transaction item interactions
  document.querySelectorAll('.transaction-item').forEach(item => {
    item.addEventListener('click', function() {
      const details = this.querySelector('.transaction-details h4').textContent;
      const amount = this.querySelector('.transaction-amount-value').textContent;
      showTransactionDetails(details, amount, this);
    });
  });
  
  // Security toggle (admin)
  document.querySelectorAll('.security-toggle').forEach(toggle => {
    toggle.addEventListener('click', function() {
      this.classList.toggle('active');
      const status = this.classList.contains('active') ? 'enabled' : 'disabled';
      const feature = this.closest('.security-item').querySelector('h4').textContent;
      showSuccess(feature + ' ' + status);
      updateSecurityStatus(feature, status);
    });
  });
  
  // AI queue item interactions
  document.querySelectorAll('.ai-queue-item').forEach(item => {
    item.addEventListener('click', function() {
      const status = this.querySelector('.ai-queue-status');
      if (status.classList.contains('pending')) {
        openReviewQueue(this);
      }
    });
  });
  
  // Export button
  document.querySelectorAll('button').forEach(btn => {
    if (btn.textContent.includes('Export')) {
      btn.addEventListener('click', function(e) {
        e.preventDefault();
        handleExport(this);
      });
    }
  });

  // New Payment button
  document.querySelectorAll('button').forEach(btn => {
    if (btn.textContent.includes('New Payment')) {
      btn.addEventListener('click', function(e) {
        e.preventDefault();
        openPaymentModal();
      });
    }
  });

  // Initialize tooltips and hover effects
  initializeTooltips();
  
  // Initialize real-time updates simulation
  initializeRealTimeUpdates();
}

/**
 * Handle Quick Actions
 */
function handleQuickAction(action) {
  switch(action) {
    case 'Send Money':
      openSendMoneyModal();
      break;
    case 'Request':
      openRequestModal();
      break;
    case 'New Card':
      openCardCreationModal();
      break;
    case 'Invoice':
      openInvoiceModal();
      break;
    default:
      showSuccess('Opening ' + action + '...');
  }
}

/**
 * Show Balance Details Modal
 */
function showBalanceDetails(currency, cardElement) {
  const value = cardElement.querySelector('.balance-card-value').textContent;
  const change = cardElement.querySelector('.balance-card-change').textContent;
  
  // Create modal
  const modal = createModal(currency + ' Account Details', `
    <div style="text-align: center; padding: 2rem;">
      <div style="font-size: 3rem; font-weight: 700; margin-bottom: 1rem;">' + value + '</div>
      <div style="color: var(--gray); margin-bottom: 2rem;">' + change + '</div>
      <div style="display: grid; grid-template-columns: repeat(2, 1fr); gap: 1rem; text-align: left;">
        <div>
          <div style="color: var(--gray); font-size: 0.875rem;">Account Number</div>
          <div style="font-weight: 600;">****' + (Math.floor(Math.random() * 9000) + 1000) + '</div>
        </div>
        <div>
          <div style="color: var(--gray); font-size: 0.875rem;">Account Type</div>
          <div style="font-weight: 600;">Business</div>
        </div>
      </div>
      <div style="margin-top: 2rem; display: flex; gap: 1rem; justify-content: center;">
        <button class="btn btn-primary" onclick="closeModal()">Close</button>
        <button class="btn btn-secondary">View Statement</button>
      </div>
    </div>
  `);
  
  document.body.appendChild(modal);
}

/**
 * Show Transaction Details
 */
function showTransactionDetails(title, amount, itemElement) {
  const date = itemElement.querySelector('.transaction-amount-date').textContent;
  const counterparty = itemElement.querySelector('.transaction-details span').textContent;
  
  const modal = createModal('Transaction Details', `
    <div style="padding: 2rem;">
      <div style="text-align: center; margin-bottom: 2rem;">
        <div style="font-size: 2rem; font-weight: 700; color: ' + (amount.startsWith('+') ? 'var(--success)' : 'var(--error)') + ';">' + amount + '</div>
        <div style="color: var(--gray); margin-top: 0.5rem;">' + title + '</div>
      </div>
      <div style="display: grid; gap: 1rem;">
        <div style="display: flex; justify-content: space-between; padding: 1rem; background: var(--primary); border-radius: 8px;">
          <span style="color: var(--gray);">Date</span>
          <span style="font-weight: 600;">' + date + '</span>
        </div>
        <div style="display: flex; justify-content: space-between; padding: 1rem; background: var(--primary); border-radius: 8px;">
          <span style="color: var(--gray);">Counterparty</span>
          <span style="font-weight: 600;">' + counterparty + '</span>
        </div>
        <div style="display: flex; justify-content: space-between; padding: 1rem; background: var(--primary); border-radius: 8px;">
          <span style="color: var(--gray);">Transaction ID</span>
          <span style="font-weight: 600; font-family: monospace;">TXN' + Date.now() + '</span>
        </div>
        <div style="display: flex; justify-content: space-between; padding: 1rem; background: var(--primary); border-radius: 8px;">
          <span style="color: var(--gray);">Status</span>
          <span style="color: var(--success); font-weight: 600;">Completed</span>
        </div>
      </div>
      <div style="margin-top: 2rem; display: flex; gap: 1rem; justify-content: center;">
        <button class="btn btn-primary" onclick="closeModal()">Close</button>
        <button class="btn btn-secondary">Download Receipt</button>
      </div>
    </div>
  `);
  
  document.body.appendChild(modal);
}

/**
 * Open Review Queue
 */
function openReviewQueue(item) {
  const title = item.querySelector('.ai-queue-details h4').textContent;
  const description = item.querySelector('.ai-queue-details span').textContent;
  
  const modal = createModal('AI Review Queue', `
    <div style="padding: 2rem;">
      <h3 style="margin-bottom: 1rem;">' + title + '</h3>
      <p style="color: var(--gray); margin-bottom: 2rem;">' + description + '</p>
      
      <div style="background: var(--primary); padding: 1.5rem; border-radius: 8px; margin-bottom: 2rem;">
        <h4 style="margin-bottom: 1rem;">AI Recommendation</h4>
        <p style="color: var(--accent);">Based on historical patterns and risk assessment, AI recommends manual review due to unusual activity patterns.</p>
      </div>
      
      <div style="display: flex; gap: 1rem; justify-content: center;">
        <button class="btn btn-danger" onclick="handleQueueAction(\'reject\', this)">Reject</button>
        <button class="btn btn-secondary" onclick="handleQueueAction(\'escalate\', this)">Escalate</button>
        <button class="btn btn-primary" onclick="handleQueueAction(\'approve\', this)">Approve</button>
        <button class="btn btn-info" onclick="handleQueueAction(\'info\', this)">Info</button>
        <button class="btn btn-success" onclick="handleQueueAction(\'resolve\', this)">Resolve</button>
      </div>
    </div>
  `);
  
  document.body.appendChild(modal);
}

/**
 * Handle Export Functionality
 */
function handleExport(button) {
  showSuccess('Preparing export...');
  
  // Simulate export preparation
  setTimeout(() => {
    const modal = createModal('Export Options', `
      <div style="padding: 2rem;">
        <h3 style="margin-bottom: 1.5rem;">Export Data</h3>
        
        <div style="margin-bottom: 1.5rem;">
          <label style="display: block; margin-bottom: 0.5rem; color: var(--gray);">Export Format</label>
          <select class="form-input" style="width: 100%;">
            <option>CSV</option>
            <option>Excel</option>
            <option>PDF</option>
            <option>JSON</option>
          </select>
        </div>
        
        <div style="margin-bottom: 1.5rem;">
          <label style="display: block; margin-bottom: 0.5rem; color: var(--gray);">Date Range</label>
          <select class="form-input" style="width: 100%;">
            <option>Last 7 days</option>
            <option>Last 30 days</option>
            <option>Last 3 months</option>
            <option>Last year</option>
            <option>Custom range</option>
          </select>
        </div>
        
        <div style="margin-bottom: 2rem;">
          <label style="display: block; margin-bottom: 0.5rem; color: var(--gray);">Data Types</label>
          <div style="display: flex; flex-direction: column; gap: 0.5rem;">
            <label class="form-checkbox">
              <input type="checkbox" checked> Transactions
            </label>
            <label class="form-checkbox">
              <input type="checkbox" checked> Account balances
            </label>
            <label class="form-checkbox">
              <input type="checkbox"> Audit logs
            </label>
          </div>
        </div>
        
        <div style="display: flex; gap: 1rem; justify-content: center;">
          <button class="btn btn-secondary" onclick="closeModal()">Cancel</button>
          <button class="btn btn-primary" onclick="processExport()">Generate Export</button>
        </div>
      </div>
    `);
    
    document.body.appendChild(modal);
  }, 1000);
}

/**
 * Create Modal Helper
 */
function createModal(title, content) {
  const modal = document.createElement('div');
  modal.style.cssText = `
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: rgba(0, 0, 0, 0.8);
    display: flex;
    align-items: center;
    justify-content: center;
    z-index: var(--z-modal);
    animation: fadeIn 0.3s ease;
  `;
  
  const modalContent = document.createElement('div');
  modalContent.style.cssText = `
    background: var(--primary-light);
    border-radius: var(--radius-lg);
    max-width: 500px;
    width: 90%;
    max-height: 80vh;
    overflow-y: auto;
    box-shadow: var(--shadow-xl);
    animation: slideIn 0.3s ease;
  `;
  
  modalContent.innerHTML = `
    <div style="padding: 1.5rem; border-bottom: 1px solid rgba(255, 255, 255, 0.1); display: flex; justify-content: space-between; align-items: center;">
      <h2 style="margin: 0;">' + title + '</h2>
      <button onclick="closeModal()" style="background: none; border: none; color: var(--gray); font-size: 1.5rem; cursor: pointer;">&times;</button>
    </div>
    ' + content + '
  `;
  
  modal.appendChild(modalContent);
  return modal;
}

/**
 * Close Modal
 */
function closeModal() {
  const modal = document.querySelector('[style*="position: fixed"]');
  if (modal) {
    modal.remove();
  }
}

/**
 * Handle Queue Actions
 */
function handleQueueAction(action, button) {
  const actions = {
    'reject': 'Transaction rejected and flagged for review',
    'escalate': 'Transaction escalated to senior analyst',
    'approve': 'Transaction approved and processed',
    'info': 'Showing additional information...',
    'resolve': 'Transaction resolved and closed'
  };
  
  showSuccess(actions[action]);
  closeModal();
}

/**
 * Process Export
 */
function processExport() {
  showSuccess('Export generated successfully! Download will start automatically.');
  closeModal();
}

/**
 * Update Security Status
 */
function updateSecurityStatus(feature, status) {
  console.log('Security feature "' + feature + '" is now ' + status);
  // In a real application, this would update the backend
}

/**
 * Initialize Tooltips
 */
function initializeTooltips() {
  // Add hover tooltips for better UX
  document.querySelectorAll('[title]').forEach(element => {
    element.style.cursor = 'help';
  });
}

/**
 * Initialize Real-time Updates (Simulation)
 */
function initializeRealTimeUpdates() {
  // Simulate real-time data updates
  setInterval(() => {
    // Update random balance card
    const balanceCards = document.querySelectorAll('.balance-card-change');
    if (balanceCards.length > 0) {
      const randomCard = balanceCards[Math.floor(Math.random() * balanceCards.length)];
      const currentValue = parseFloat(randomCard.textContent.match(/[\d.]+/)[0]);
      const change = (Math.random() - 0.5) * 0.1;
      const newValue = currentValue + change;
      const sign = change >= 0 ? '+' : '';
      randomCard.innerHTML = randomCard.innerHTML.replace(/[\d.]+%/, newValue.toFixed(1) + '%');
    }
  }, 30000); // Update every 30 seconds
}

// Modal helper functions for quick actions
function openSendMoneyModal() {
  showSuccess('Opening send money interface...');
}

function openRequestModal() {
  showSuccess('Opening payment request interface...');
}

function openCardCreationModal() {
  showSuccess('Opening virtual card creation...');
}

function openInvoiceModal() {
  showSuccess('Opening invoice creation...');
}

function openPaymentModal() {
  showSuccess('Opening new payment form...');
}

/**
 * Utility: Format currency
 */
function formatCurrency(amount, currency = 'USD') {
  const symbols = {
    USD: '$',
    GBP: '£',
    EUR: '€',
    NGN: '₦',
    CAD: 'CA$'
  };
  
  return (symbols[currency] || '$') + amount.toLocaleString('en-US', {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2
  });
}

/**
 * Utility: Format date
 */
function formatDate(date) {
  return new Date(date).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'short',
    day: 'numeric'
  });
}

// Add fadeOut animation
const style = document.createElement('style');
style.textContent = `
  @keyframes fadeOut {
    from { opacity: 1; transform: translateY(0); }
    to { opacity: 0; transform: translateY(10px); }
  }
`;
document.head.appendChild(style);
