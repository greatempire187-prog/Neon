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

// Test function
window.testFunction = function() {
  console.log('Test function called successfully');
  alert('JavaScript is working!');
};
