/**
 * Borderless NeoBank - Fixed JavaScript File
 * Direct approach to ensure all functionality works
 */

console.log('JavaScript file loaded - FIXED VERSION');

// Global function to handle quick actions
window.handleQuickAction = function(element) {
  const label = element.querySelector('.quick-action-label');
  if (label) {
    console.log('Quick action clicked:', label.textContent);
    alert('Opening ' + label.textContent + '...');
  }
};

// Global function to handle balance cards
window.handleBalanceCard = function(element) {
  const currency = element.querySelector('.balance-card-label');
  if (currency) {
    console.log('Balance card clicked:', currency.textContent);
    alert('Viewing ' + currency.textContent + ' details...');
  }
};

// Global function to handle chat toggle
window.toggleChat = function() {
  const chatWidget = document.getElementById('chatWidget');
  if (chatWidget) {
    chatWidget.classList.toggle('minimized');
    console.log('Chat toggled');
  }
};

// Global function to send chat message
window.sendMessage = function() {
  const chatInput = document.getElementById('chatInput');
  const chatMessages = document.getElementById('chatMessages');
  
  if (chatInput && chatMessages) {
    const message = chatInput.value.trim();
    if (message) {
      console.log('Sending message:', message);
      
      // Add user message
      const messageDiv = document.createElement('div');
      messageDiv.className = 'chat-message user-message';
      messageDiv.innerHTML = `
        <div class="message-header">
          <span class="message-sender">You</span>
          <span class="message-time">${new Date().toLocaleTimeString()}</span>
        </div>
        <div class="message-content">${message}</div>
      `;
      
      chatMessages.appendChild(messageDiv);
      chatInput.value = '';
      chatMessages.scrollTop = chatMessages.scrollHeight;
      
      // Simulate admin response
      setTimeout(() => {
        const adminDiv = document.createElement('div');
        adminDiv.className = 'chat-message admin-message';
        adminDiv.innerHTML = `
          <div class="message-header">
            <span class="message-sender">Admin</span>
            <span class="message-time">${new Date().toLocaleTimeString()}</span>
          </div>
          <div class="message-content">Thank you for your message. I'll help you shortly.</div>
        `;
        chatMessages.appendChild(adminDiv);
        chatMessages.scrollTop = chatMessages.scrollHeight;
      }, 1000);
    }
  }
};

// Global function to handle security toggles
window.toggleSecurity = function(element) {
  element.classList.toggle('active');
  console.log('Security toggle clicked');
  const status = element.classList.contains('active') ? 'enabled' : 'disabled';
  const feature = element.closest('.security-item');
  if (feature) {
    const featureName = feature.querySelector('h4');
    if (featureName) {
      console.log(featureName.textContent + ' ' + status);
      alert(featureName.textContent + ' ' + status);
    }
  }
};

// Signup form handler
window.handleSignup = function(event) {
  event.preventDefault();
  
  const firstName = document.getElementById('firstName');
  const lastName = document.getElementById('lastName');
  const email = document.getElementById('email');
  const company = document.getElementById('company');
  const password = document.getElementById('password');
  const currency = document.getElementById('currency');
  const terms = document.querySelector('input[name="terms"]');
  
  if (!firstName || !lastName || !email || !company || !password || !currency) {
    alert('Please fill in all required fields');
    return;
  }
  
  const firstNameValue = firstName.value.trim();
  const lastNameValue = lastName.value.trim();
  const emailValue = email.value.trim();
  const companyValue = company.value.trim();
  
  // Check if terms are accepted
  if (terms && !terms.checked) {
    alert('Please accept the Terms of Service and Privacy Policy');
    return;
  }
  
  // Check password length
  if (password.value.length < 8) {
    alert('Password must be at least 8 characters');
    return;
  }
  
  // Check email format
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(emailValue)) {
    alert('Please enter a valid email address');
    return;
  }
  
  // Success - show username and redirect
  const fullName = `${firstNameValue} ${lastNameValue}`;
  const username = emailValue.split('@')[0]; // Use email prefix as username
  
  alert(`Account created successfully! Welcome ${fullName}! Your username is: ${username}`);
  
  setTimeout(() => {
    window.location.href = 'dashboard.html';
  }, 2000);
};

// Wait for DOM to be fully loaded
document.addEventListener('DOMContentLoaded', function() {
  console.log('DOM loaded successfully - FIXED VERSION');
  
  setTimeout(function() {
    console.log('Initializing elements with direct approach...');
    
    // Attach click handlers to quick actions
    const quickActions = document.querySelectorAll('.quick-action');
    console.log('Found quick actions:', quickActions.length);
    
    quickActions.forEach(action => {
      action.onclick = function() { handleQuickAction(this); };
    });
    
    // Attach click handlers to balance cards
    const balanceCards = document.querySelectorAll('.balance-card');
    console.log('Found balance cards:', balanceCards.length);
    
    balanceCards.forEach(card => {
      card.onclick = function() { handleBalanceCard(this); };
    });
    
    // Attach click handlers to security toggles
    const securityToggles = document.querySelectorAll('.security-toggle');
    console.log('Found security toggles:', securityToggles.length);
    
    securityToggles.forEach(toggle => {
      toggle.onclick = function() { toggleSecurity(this); };
    });
    
    // Setup chat
    const chatToggle = document.getElementById('chatToggle');
    const chatSendBtn = document.getElementById('chatSendBtn');
    const chatInput = document.getElementById('chatInput');
    
    console.log('Chat elements found:', !!chatToggle, !!chatSendBtn, !!chatInput);
    
    if (chatToggle) {
      chatToggle.onclick = toggleChat;
    }
    
    if (chatSendBtn) {
      chatSendBtn.onclick = sendMessage;
    }
    
    if (chatInput) {
      chatInput.onkeypress = function(e) {
        if (e.key === 'Enter') {
          sendMessage();
        }
      };
    }
    
    console.log('All elements initialized with direct event handlers');
    alert('All functionality is now working! Try clicking any element.');
    
  }, 1000); // Delay to ensure all elements are loaded
});

// Login function
window.handleLogin = function(event) {
  event.preventDefault();
  
  const email = document.getElementById('email');
  const password = document.getElementById('password');
  
  if (!email || !password) {
    alert('Please fill in all fields');
    return;
  }
  
  const emailValue = email.value.trim();
  const passwordValue = password.value.trim();
  
  // Check for admin credentials
  if (emailValue === 'greatempire187@gmail.com' && passwordValue === 'china246891') {
    alert('Admin login successful! Redirecting to admin dashboard...');
    setTimeout(() => {
      window.location.href = 'admin.html';
    }, 1000);
    return;
  }
  
  // Check for valid email format
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(emailValue)) {
    alert('Please enter a valid email address');
    return;
  }
  
  // Check password length
  if (passwordValue.length < 6) {
    alert('Password must be at least 6 characters');
    return;
  }
  
  // Demo: redirect to user dashboard
  alert('Login successful! Redirecting to dashboard...');
  setTimeout(() => {
    window.location.href = 'dashboard.html';
  }, 1000);
};

// Admin navigation function
window.showAdminSection = function(sectionId) {
  // Hide all sections
  const sections = ['command-center', 'treasury', 'ai-governance', 'security', 'compliance', 'users'];
  sections.forEach(id => {
    const section = document.getElementById(id);
    if (section) {
      section.style.display = 'none';
    }
  });
  
  // Show selected section
  const selectedSection = document.getElementById(sectionId);
  if (selectedSection) {
    selectedSection.style.display = 'block';
  }
  
  // Update active nav link
  document.querySelectorAll('.sidebar-nav-link').forEach(link => {
    link.classList.remove('active');
  });
  
  const activeLink = document.querySelector(`[href="#${sectionId}"]`);
  if (activeLink) {
    activeLink.classList.add('active');
  }
  
  // Update dashboard title
  const titles = {
    'command-center': 'Command Center 🛡️',
    'treasury': 'Treasury Hub 💰',
    'ai-governance': 'AI Governance 🤖',
    'security': 'Security Center 🔒',
    'compliance': 'Compliance Center 📋',
    'users': 'User Management 👥'
  };
  
  const dashboardTitle = document.querySelector('.dashboard-title');
  if (dashboardTitle && titles[sectionId]) {
    dashboardTitle.textContent = titles[sectionId];
  }
};

// Test function
window.testFunction = function() {
  console.log('Test function called successfully');
  alert('JavaScript is working!');
};
