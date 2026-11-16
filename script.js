let currentMode = 'signup';

/**
 * Display alert messages with appropriate semantic style
 * @param {string} msg - Message text to display
 * @param {'success' | 'error' | 'info'} type - Alert type
 */
function showMessage(msg, type = 'success') {
  const alertEl = document.getElementById('auth-alert');
  const alertContent = document.getElementById('alert-content');
  if (!alertEl) return;

  if (alertContent) {
    alertContent.textContent = msg;
  } else {
    alertEl.textContent = msg;
  }

  // Clean existing state classes
  alertEl.classList.remove('alert-success', 'alert-error', 'alert-info', 'hidden');

  // Apply corresponding theme class
  if (type === 'error') {
    alertEl.classList.add('alert-error');
  } else if (type === 'info') {
    alertEl.classList.add('alert-info');
  } else {
    alertEl.classList.add('alert-success');
  }

  console.log(`[${type.toUpperCase()}] ${msg}`);
}

/**
 * Hide the notification alert
 */
function hideMessage() {
  const alertEl = document.getElementById('auth-alert');
  if (alertEl) {
    alertEl.classList.add('hidden');
  }
}

/**
 * Reset password inputs and their visibility toggle state
 * @param {HTMLFormElement} form
 */
function resetPasswordToggles(form) {
  if (!form) return;
  const toggles = form.querySelectorAll('.password-toggle');
  toggles.forEach(toggle => {
    const targetId = toggle.getAttribute('data-target');
    const input = document.getElementById(targetId);
    if (input) {
      input.type = 'password';
    }
    toggle.setAttribute('aria-label', 'Show password');
    toggle.setAttribute('aria-pressed', 'false');
    const showIcon = toggle.querySelector('.eye-show');
    const hideIcon = toggle.querySelector('.eye-hide');
    if (showIcon) showIcon.classList.remove('hidden');
    if (hideIcon) hideIcon.classList.add('hidden');
  });
}

/**
 * Switch between Sign Up and Sign In views
 * @param {'signup' | 'signin'} mode
 */
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

  // Hide any existing alert on mode switch
  hideMessage();

  if (mode === 'signup') {
    // Clear sign-in form inputs so stale values do not persist
    if (formSignIn) {
      formSignIn.reset();
      resetPasswordToggles(formSignIn);
    }

    formSignUp.classList.remove('hidden');
    formSignIn.classList.add('hidden');

    tabSignUp.className = 'tab-btn tab-active';
    tabSignUp.setAttribute('aria-selected', 'true');
    tabSignIn.className = 'tab-btn tab-inactive';
    tabSignIn.setAttribute('aria-selected', 'false');

    title.textContent = 'Your journey starts here';
    subtitle.textContent = 'Take the first step';

    footerText.textContent = 'Already have an account?';
    footerLink.textContent = 'Sign in';
  } else {
    // Clear sign-up form inputs so stale values do not persist
    if (formSignUp) {
      formSignUp.reset();
      resetPasswordToggles(formSignUp);
    }

    formSignUp.classList.add('hidden');
    formSignIn.classList.remove('hidden');

    tabSignUp.className = 'tab-btn tab-inactive';
    tabSignUp.setAttribute('aria-selected', 'false');
    tabSignIn.className = 'tab-btn tab-active';
    tabSignIn.setAttribute('aria-selected', 'true');

    title.textContent = 'Welcome back to peace';
    subtitle.textContent = 'Continue your mindful path';

    footerText.textContent = "Don't have an account?";
    footerLink.textContent = 'Sign up';
  }
}

/**
 * Quick toggle helper for the footer button
 */
function toggleCurrentMode() {
  if (currentMode === 'signup') {
    switchMode('signin');
  } else {
    switchMode('signup');
  }
}

/**
 * Setup show/hide password buttons
 */
function setupPasswordToggles() {
  const toggles = document.querySelectorAll('.password-toggle');
  toggles.forEach(toggle => {
    toggle.addEventListener('click', (e) => {
      e.preventDefault();
      const targetId = toggle.getAttribute('data-target');
      const input = document.getElementById(targetId);
      if (!input) return;

      const isPassword = input.type === 'password';
      input.type = isPassword ? 'text' : 'password';

      toggle.setAttribute('aria-label', isPassword ? 'Hide password' : 'Show password');
      toggle.setAttribute('aria-pressed', isPassword ? 'true' : 'false');

      const showIcon = toggle.querySelector('.eye-show');
      const hideIcon = toggle.querySelector('.eye-hide');
      if (showIcon && hideIcon) {
        showIcon.classList.toggle('hidden', isPassword);
        hideIcon.classList.toggle('hidden', !isPassword);
      }
    });
  });
}

/**
 * Setup mobile hamburger menu toggle
 */
function setupMobileMenu() {
  const hamburgerBtn = document.getElementById('hamburger-btn');
  const siteNav = document.getElementById('site-nav');

  if (hamburgerBtn && siteNav) {
    hamburgerBtn.addEventListener('click', () => {
      const isExpanded = hamburgerBtn.getAttribute('aria-expanded') === 'true';
      const newState = !isExpanded;
      hamburgerBtn.setAttribute('aria-expanded', String(newState));
      hamburgerBtn.setAttribute('aria-label', newState ? 'Close navigation menu' : 'Open navigation menu');
      siteNav.classList.toggle('nav-open', newState);
    });

    // Close menu when clicking outside
    document.addEventListener('click', (e) => {
      if (!hamburgerBtn.contains(e.target) && !siteNav.contains(e.target)) {
        hamburgerBtn.setAttribute('aria-expanded', 'false');
        hamburgerBtn.setAttribute('aria-label', 'Open navigation menu');
        siteNav.classList.remove('nav-open');
      }
    });
  }
}

/**
 * Setup interactive links to prevent dead silent clicks
 */
function setupInteractiveLinks() {
  // Nav links
  const navLinks = document.querySelectorAll('.nav-links .nav-link');
  navLinks.forEach(link => {
    link.addEventListener('click', (e) => {
      e.preventDefault();
      const text = link.textContent.trim();
      showMessage(`${text} page is coming soon.`, 'info');

      // Close mobile nav menu if open
      const hamburgerBtn = document.getElementById('hamburger-btn');
      const siteNav = document.getElementById('site-nav');
      if (hamburgerBtn && siteNav) {
        hamburgerBtn.setAttribute('aria-expanded', 'false');
        hamburgerBtn.setAttribute('aria-label', 'Open navigation menu');
        siteNav.classList.remove('nav-open');
      }
    });
  });

  // Forgot password link
  const forgotLink = document.getElementById('forgot-password-link');
  if (forgotLink) {
    forgotLink.addEventListener('click', (e) => {
      e.preventDefault();
      showMessage('Password recovery is coming soon.', 'info');
    });
  }

  // Social authentication buttons
  const socialActions = [
    { id: 'social-facebook', provider: 'Facebook sign-in' },
    { id: 'social-apple', provider: 'Apple sign-in' },
    { id: 'social-google', provider: 'Google sign-in' }
  ];

  socialActions.forEach(({ id, provider }) => {
    const btn = document.getElementById(id);
    if (btn) {
      btn.addEventListener('click', () => {
        showMessage(`${provider} is coming soon.`, 'info');
      });
    }
  });

  // Footer links
  const footerLinks = document.querySelectorAll('.footer-links .footer-link');
  footerLinks.forEach(link => {
    link.addEventListener('click', (e) => {
      e.preventDefault();
      const text = link.textContent.trim();
      showMessage(`${text} will be published soon.`, 'info');
    });
  });

  // Dismiss button on alert toast
  const dismissBtn = document.getElementById('alert-dismiss-btn');
  if (dismissBtn) {
    dismissBtn.addEventListener('click', () => {
      hideMessage();
    });
  }

  // Hide alert on input interaction
  document.querySelectorAll('.auth-form input').forEach(input => {
    input.addEventListener('input', () => {
      hideMessage();
    });
  });
}

/**
 * Setup form validation and submissions
 */
function setupForms() {
  const formSignUp = document.getElementById('form-signup');
  const formSignIn = document.getElementById('form-signin');

  if (formSignUp) {
    formSignUp.addEventListener('submit', (e) => {
      e.preventDefault();

      const email = document.getElementById('signup-email');
      const username = document.getElementById('signup-username');
      const password = document.getElementById('signup-password');
      const confirmPassword = document.getElementById('signup-confirm-password');

      // Validation
      if (!email.value.trim() || !email.checkValidity()) {
        showMessage('Please enter a valid e-mail address.', 'error');
        email.focus();
        return;
      }

      if (!username.value.trim()) {
        showMessage('Please enter your username.', 'error');
        username.focus();
        return;
      }

      if (password.value.length < 8) {
        showMessage('Password must be at least 8 characters long.', 'error');
        password.focus();
        return;
      }

      if (password.value !== confirmPassword.value) {
        showMessage('Passwords do not match. Please verify and try again.', 'error');
        confirmPassword.focus();
        return;
      }

      // Success
      showMessage('Your AETHER account has been created successfully!', 'success');
    });
  }

  if (formSignIn) {
    formSignIn.addEventListener('submit', (e) => {
      e.preventDefault();

      const identifier = document.getElementById('signin-identifier');
      const password = document.getElementById('signin-password');

      // Validation
      if (!identifier.value.trim()) {
        showMessage('Please enter your email or username.', 'error');
        identifier.focus();
        return;
      }

      if (password.value.length < 8) {
        showMessage('Password must be at least 8 characters long.', 'error');
        password.focus();
        return;
      }

      // Success
      showMessage('Welcome back to AETHER!', 'success');
    });
  }
}

// Initial setup when DOM is ready
document.addEventListener('DOMContentLoaded', () => {
  switchMode('signup');
  setupPasswordToggles();
  setupMobileMenu();
  setupInteractiveLinks();
  setupForms();
});
