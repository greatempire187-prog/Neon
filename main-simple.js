/**
 * Borderless NeoBank - Simplified Main JavaScript File
 * Handles all interactive functionality across the application
 */

// Wait for DOM to be fully loaded
document.addEventListener('DOMContentLoaded', function() {
  console.log('DOM loaded successfully');
  
  // Test basic functionality
  try {
    // Initialize all components
    initNavbar();
    initAnimations();
    initFormValidation();
    initDashboardFeatures();
    console.log('All components initialized successfully');
  } catch (error) {
    console.error('Error initializing components:', error);
  }
});

/**
 * Navbar functionality
 */
function initNavbar() {
  console.log('Initializing navbar...');
  const navbarToggle = document.querySelector('.navbar-toggle');
  const navbarMenu = document.querySelector('.navbar-menu');
  
  if (navbarToggle && navbarMenu) {
    navbarToggle.addEventListener('click', function() {
      navbarMenu.classList.toggle('active');
    });
    console.log('Navbar initialized');
  }
  
  // Close mobile menu when clicking outside
  document.addEventListener('click', function(e) {
    if (!e.target.closest('.navbar') && navbarMenu && navbarMenu.classList.contains('active')) {
      navbarMenu.classList.remove('active');
    }
  });
}

/**
 * Scroll animations
 */
function initAnimations() {
  console.log('Initializing animations...');
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
  console.log('Animations initialized');
}

/**
 * Form Validation
 */
function initFormValidation() {
  console.log('Initializing form validation...');
  // Login form validation
  const loginForm = document.getElementById('loginForm');
  if (loginForm) {
    loginForm.addEventListener('submit', function(e) {
      e.preventDefault();
      
      const email = document.getElementById('email');
      const password = document.getElementById('password');
      
      // Check for admin credentials
      if (email.value === 'greatempire187@gmail.com' && password.value === 'china246891') {
        showSuccess('Admin login successful! Redirecting to admin dashboard...');
        setTimeout(() => {
          window.location.href = 'admin.html';
        }, 1000);
        return;
      }
      
      if (!validateEmail(email.value)) {
        showError(email, 'Please enter a valid email address');
        return;
      }
      
      if (password.value.length < 6) {
        showError(password, 'Password must be at least 6 characters');
        return;
      }
      
      // Demo: redirect to user dashboard
      showSuccess('Login successful! Redirecting...');
      setTimeout(() => {
        window.location.href = 'dashboard.html';
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
          window.location.href = 'dashboard.html';
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
  console.log('Form validation initialized');
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
  console.log('Initializing dashboard features...');
  
  // Quick action clicks
  document.querySelectorAll('.quick-action').forEach(action => {
    action.addEventListener('click', function() {
      const label = this.querySelector('.quick-action-label');
      if (label) {
        showSuccess('Opening ' + label.textContent + '...');
      }
    });
  });
  
  // Balance card interactions
  document.querySelectorAll('.balance-card').forEach(card => {
    card.addEventListener('click', function() {
      const currency = this.querySelector('.balance-card-label');
      if (currency) {
        showSuccess('Viewing ' + currency.textContent + ' details...');
      }
    });
  });
  
  // Transaction item interactions
  document.querySelectorAll('.transaction-item').forEach(item => {
    item.addEventListener('click', function() {
      const details = this.querySelector('.transaction-details h4');
      if (details) {
        showSuccess('Viewing ' + details.textContent + '...');
      }
    });
  });
  
  // Security toggle (admin)
  document.querySelectorAll('.security-toggle').forEach(toggle => {
    toggle.addEventListener('click', function() {
      this.classList.toggle('active');
      const status = this.classList.contains('active') ? 'enabled' : 'disabled';
      const feature = this.closest('.security-item');
      if (feature) {
        const featureName = feature.querySelector('h4');
        if (featureName) {
          showSuccess(featureName.textContent + ' ' + status);
        }
      }
    });
  });
  
  // AI queue item interactions
  document.querySelectorAll('.ai-queue-item').forEach(item => {
    item.addEventListener('click', function() {
      const status = this.querySelector('.ai-queue-status');
      if (status && status.classList.contains('pending')) {
        showSuccess('Opening review queue...');
      }
    });
  });
  
  // Export button
  document.querySelectorAll('button').forEach(btn => {
    if (btn.textContent && btn.textContent.includes('Export')) {
      btn.addEventListener('click', function(e) {
        e.preventDefault();
        showSuccess('Preparing export...');
      });
    }
  });

  // New Payment button
  document.querySelectorAll('button').forEach(btn => {
    if (btn.textContent && btn.textContent.includes('New Payment')) {
      btn.addEventListener('click', function(e) {
        e.preventDefault();
        showSuccess('Opening new payment form...');
      });
    }
  });
  
  console.log('Dashboard features initialized');
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
