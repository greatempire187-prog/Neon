/**
 * Borderless NeoBank - Test JavaScript File
 * Simplified version to debug functionality issues
 */

console.log('JavaScript file loaded successfully');

// Wait for DOM to be fully loaded
document.addEventListener('DOMContentLoaded', function() {
  console.log('DOM loaded successfully');
  
  // Test basic functionality
  try {
    console.log('Starting component initialization...');
    
    // Test navbar
    const navbarToggle = document.querySelector('.navbar-toggle');
    const navbarMenu = document.querySelector('.navbar-menu');
    console.log('Navbar elements found:', !!navbarToggle, !!navbarMenu);
    
    if (navbarToggle && navbarMenu) {
      navbarToggle.addEventListener('click', function() {
        navbarMenu.classList.toggle('active');
        console.log('Navbar toggled');
      });
    }
    
    // Test quick actions
    const quickActions = document.querySelectorAll('.quick-action');
    console.log('Quick actions found:', quickActions.length);
    
    quickActions.forEach(action => {
      action.addEventListener('click', function() {
        const label = this.querySelector('.quick-action-label');
        if (label) {
          console.log('Quick action clicked:', label.textContent);
          alert('Opening ' + label.textContent + '...');
        }
      });
    });
    
    // Test balance cards
    const balanceCards = document.querySelectorAll('.balance-card');
    console.log('Balance cards found:', balanceCards.length);
    
    balanceCards.forEach(card => {
      card.addEventListener('click', function() {
        const currency = this.querySelector('.balance-card-label');
        if (currency) {
          console.log('Balance card clicked:', currency.textContent);
          alert('Viewing ' + currency.textContent + ' details...');
        }
      });
    });
    
    // Test chat widget
    const chatWidget = document.getElementById('chatWidget');
    const chatToggle = document.getElementById('chatToggle');
    const chatInput = document.getElementById('chatInput');
    const chatSendBtn = document.getElementById('chatSendBtn');
    const chatMessages = document.getElementById('chatMessages');
    
    console.log('Chat elements found:', !!chatWidget, !!chatToggle, !!chatInput, !!chatSendBtn, !!chatMessages);
    
    if (chatWidget && chatToggle) {
      chatToggle.addEventListener('click', function() {
        chatWidget.classList.toggle('minimized');
        console.log('Chat toggled');
      });
    }
    
    if (chatInput && chatSendBtn && chatMessages) {
      chatSendBtn.addEventListener('click', function() {
        const message = chatInput.value.trim();
        if (message) {
          console.log('Sending message:', message);
          
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
      });
      
      chatInput.addEventListener('keypress', function(e) {
        if (e.key === 'Enter') {
          chatSendBtn.click();
        }
      });
    }
    
    // Test security toggles
    const securityToggles = document.querySelectorAll('.security-toggle');
    console.log('Security toggles found:', securityToggles.length);
    
    securityToggles.forEach(toggle => {
      toggle.addEventListener('click', function() {
        this.classList.toggle('active');
        console.log('Security toggle clicked');
      });
    });
    
    console.log('All components initialized successfully');
    alert('JavaScript initialized successfully! Try clicking elements now.');
    
  } catch (error) {
    console.error('Error initializing components:', error);
    alert('Error: ' + error.message);
  }
});

// Test if this file is loading
console.log('Test JavaScript file loaded');
