let currentMode = 'signup';
let alertTimeout = null;

function showMessage(msg) {
  const alertEl = document.getElementById('auth-alert');
  if (!alertEl) return;
  
  alertEl.textContent = msg;
  alertEl.classList.remove('hidden');

  // Also log to console for debugging/testing
  console.log(msg);

  if (alertTimeout) {
    clearTimeout(alertTimeout);
  }

  // Auto-hide after 4 seconds
  alertTimeout = setTimeout(() => {
    alertEl.classList.add('hidden');
  }, 4000);
}

function switchMode(mode) {
  currentMode = mode;
  
  const formSignUp = document.getElementById('form-signup');
  const formSignIn = document.getElementById('form-signin');
  const tabSignUp = document.getElementById('tab-signup');
  const tabSignIn = document.getElementById('tab-signin');
  const title = document.getElementById('auth-title');
  const subtitle = document.getElementById('auth-subtitle');
  const footerText = document.getElementById('footer-text');
  const footerLink = document.getElementById('footer-action-link');
  const alertEl = document.getElementById('auth-alert');

  // Mode change hone par alert hide kar do
  if (alertEl) {
    alertEl.classList.add('hidden');
  }

  if (mode === 'signup') {
    formSignUp.classList.remove('hidden');
    formSignIn.classList.add('hidden');
    
    tabSignUp.className = 'tab-btn tab-active';
    tabSignIn.className = 'tab-btn tab-inactive';

    title.textContent = 'Your journey starts here';
    subtitle.textContent = 'Take the first step';
    
    footerText.textContent = 'Already have an account?';
    footerLink.textContent = 'Sign in';
  } else {
    formSignUp.classList.add('hidden');
    formSignIn.classList.remove('hidden');
    
    tabSignUp.className = 'tab-btn tab-inactive';
    tabSignIn.className = 'tab-btn tab-active';

    title.textContent = 'Welcome back to peace';
    subtitle.textContent = 'Continue your mindful path';

    footerText.textContent = "Don't have an account?";
    footerLink.textContent = 'Sign up';
  }
}

function toggleCurrentMode() {
  if (currentMode === 'signup') {
    switchMode('signin');
  } else {
    switchMode('signup');
  }
}

// Initial setup when DOM is ready
document.addEventListener('DOMContentLoaded', () => {
  switchMode('signup');

  const formSignUp = document.getElementById('form-signup');
  const formSignIn = document.getElementById('form-signin');

  if (formSignUp) {
    formSignUp.addEventListener('submit', (e) => {
      e.preventDefault();
      showMessage('Your AETHER account has been created successfully!');
    });
  }

  if (formSignIn) {
    formSignIn.addEventListener('submit', (e) => {
      e.preventDefault();
      showMessage('Welcome back to AETHER!');
    });
  }
});
