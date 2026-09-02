(function () {
  var STORAGE_KEY = 'gch_cookie_consent';

  // Replace this with your actual affiliate/tracking URL
  var REDIRECT_URL = 'YOUR_AFFILIATE_LINK_HERE';

  // Automatically detect lander.html
  var isLander =
    window.location.pathname.toLowerCase().indexOf('lander.html') !== -1;

  // Create popup styles
  var style = document.createElement('style');

  style.textContent = `
    #gch-overlay {
      position: fixed;
      inset: 0;
      background: rgba(0, 0, 0, 0.6);
      z-index: 99998;
      display: flex;
      align-items: center;
      justify-content: center;
      padding: 1rem;
      animation: gch-fadein 0.3s ease;
    }

    @keyframes gch-fadein {
      from {
        opacity: 0;
      }
      to {
        opacity: 1;
      }
    }

    @keyframes gch-popin {
      from {
        opacity: 0;
        transform: scale(0.92) translateY(12px);
      }
      to {
        opacity: 1;
        transform: scale(1) translateY(0);
      }
    }

    #gch-popup {
      width: 100%;
      max-width: 480px;
      background: #ffffff;
      border-radius: 16px;
      padding: 2.2rem 2rem 2.4rem;
      box-shadow: 0 20px 60px rgba(0, 0, 0, 0.3);
      animation: gch-popin 0.35s cubic-bezier(0.34, 1.4, 0.64, 1);
      font-family: Arial, sans-serif;
      box-sizing: border-box;
    }

    #gch-popup .gch-icon {
      font-size: 2.4rem;
      margin-bottom: 0.7rem;
      display: block;
      text-align: center;
    }

    #gch-popup h2 {
      font-size: 1.15rem;
      font-weight: 700;
      color: #0d1115;
      text-align: center;
      margin: 0 0 0.6rem;
    }

    #gch-popup p {
      font-size: 0.85rem;
      color: #555555;
      line-height: 1.7;
      text-align: center;
      margin: 0 0 1.6rem;
    }

    #gch-popup p a {
      color: #79d260;
      text-decoration: underline;
    }

    #gch-divider {
      border: none;
      border-top: 1px solid #e8e8e8;
      margin: 0 0 1.6rem;
    }

    #gch-btns {
      display: flex;
      gap: 0.75rem;
      justify-content: center;
    }

    #gch-accept {
      flex: 1;
      background: #7ad75a;
      color: #0a120e;
      border: none;
      padding: 0.8rem 1.5rem;
      border-radius: 8px;
      font-size: 0.92rem;
      font-weight: 800;
      cursor: pointer;
      transition: background 0.2s, transform 0.1s;
    }

    #gch-accept:hover {
      background: #68c94a;
      transform: translateY(-1px);
    }

    #gch-reject {
      flex: 1;
      background: #ffffff;
      color: #0d1115;
      border: 2px solid #0d1115;
      padding: 0.8rem 1.5rem;
      border-radius: 8px;
      font-size: 0.92rem;
      font-weight: 700;
      cursor: pointer;
      transition: all 0.2s;
    }

    #gch-reject:hover {
      background: #eef6ee;
      transform: translateY(-1px);
    }

    #gch-policy {
      display: block;
      text-align: center;
      margin-top: 1rem;
      font-size: 0.76rem;
      color: #999999;
    }

    #gch-policy a {
      color: #999999;
      text-decoration: underline;
    }

    #gch-policy a:hover {
      color: #1a6b38;
    }

    @media (max-width: 480px) {
      #gch-popup {
        padding: 1.8rem 1.3rem 2rem;
      }

      #gch-btns {
        flex-direction: column;
      }

      #gch-accept,
      #gch-reject {
        width: 100%;
      }
    }
  `;

  document.head.appendChild(style);

  // Create popup
  var overlay = document.createElement('div');
  overlay.id = 'gch-overlay';

  overlay.innerHTML = `
    <div id="gch-popup">

      <span class="gch-icon">🍪</span>

      <h2>We Value Your Privacy</h2>

      <p>
        We use cookies to enhance your browsing experience,
        analyze football content, and personalize your coverage.
        By clicking <strong>Accept All</strong> you agree to our use of cookies.
      </p>

      <hr id="gch-divider">

      <div id="gch-btns">

        <button id="gch-accept" type="button">
          ✓ Accept All
        </button>

        <button id="gch-reject" type="button">
          ✕ Reject All
        </button>

      </div>

      <span id="gch-policy">
        <a href="privacy.html">Privacy Policy</a>
        &nbsp;·&nbsp;
        <a href="terms.html">Terms of Service</a>
      </span>

    </div>
  `;

  document.body.appendChild(overlay);

  // Close popup on normal pages
  function closePopup() {
    overlay.style.opacity = '0';
    overlay.style.transition = 'opacity 0.2s ease';

    setTimeout(function () {
      if (overlay) {
        overlay.remove();
      }
    }, 200);
  }

  // Accept button
  function handleAccept() {
    localStorage.setItem(STORAGE_KEY, 'accepted');

    if (isLander) {
      window.location.href = REDIRECT_URL;
    } else {
      closePopup();
    }
  }

  // Reject button
  function handleReject() {
    localStorage.setItem(STORAGE_KEY, 'rejected');

    if (isLander) {
      window.location.href = REDIRECT_URL;
    } else {
      closePopup();
    }
  }

  document
    .getElementById('gch-accept')
    .addEventListener('click', handleAccept);

  document
    .getElementById('gch-reject')
    .addEventListener('click', handleReject);

  // On normal pages, clicking outside closes popup.
  // On lander.html, outside click does nothing.
  if (!isLander) {
    overlay.addEventListener('click', function (event) {
      if (event.target === overlay) {
        closePopup();
      }
    });
  }
})();
