from pathlib import Path

path = Path("/mnt/data/assets")
path.mkdir(parents=True, exist_ok=True)
out = path / "popup.js"

code = r'''(function () {
  var STORAGE_KEY = 'gch_cookie_consent';
  var REDIRECT_URL = 'YOUR_AFFILIATE_LINK_HERE';

  // Automatically detect whether the current page is lander.html
  var isLander = window.location.pathname.indexOf('lander.html') !== -1;

  // Create and show popup immediately
  (function showPopup() {

    var style = document.createElement('style');

    style.textContent = [
      '#gch-overlay{position:fixed;inset:0;background:rgba(0,0,0,0.6);z-index:99998;display:flex;align-items:center;justify-content:center;padding:1rem;animation:gch-fadein 0.3s ease;}',
      '@keyframes gch-fadein{from{opacity:0}to{opacity:1}}',
      '@keyframes gch-popin{from{opacity:0;transform:scale(0.92) translateY(12px)}to{opacity:1;transform:scale(1) translateY(0)}}',

      '#gch-popup{width:100%;max-width:480px;background:#fff;border-radius:16px;padding:2.2rem 2rem 2.4rem;box-shadow:0 20px 60px rgba(0,0,0,0.3);animation:gch-popin 0.35s cubic-bezier(0.34,1.4,0.64,1);font-family:Arial,sans-serif;}',

      '#gch-popup .gch-icon{font-size:2.4rem;margin-bottom:0.7rem;display:block;text-align:center;}',

      '#gch-popup h2{font-size:1.15rem;font-weight:700;color:#0d1115;text-align:center;margin:0 0 0.6rem;letter-spacing:-0.2px;}',

      '#gch-popup p{font-size:0.85rem;color:#555;line-height:1.7;text-align:center;margin:0 0 1.6rem;}',
      '#gch-popup p a{color:#79d260;text-decoration:underline;}',
      '#gch-popup p a:hover{color:#0d1115;}',

      '#gch-divider{border:none;border-top:1px solid #e8e8e8;margin:0 0 1.6rem;}',

      '#gch-btns{display:flex;gap:0.75rem;justify-content:center;}',

      '#gch-accept{flex:1;background:#7ad75a;color:#0a120e;border:none;padding:0.8rem 1.5rem;border-radius:8px;font-size:0.92rem;font-weight:800;cursor:pointer;transition:background 0.2s,transform 0.1s;letter-spacing:0.02em;}',
      '#gch-accept:hover{background:#68c94a;transform:translateY(-1px);}',

      '#gch-reject{flex:1;background:#fff;color:#0d1115;border:2px solid #0d1115;padding:0.8rem 1.5rem;border-radius:8px;font-size:0.92rem;font-weight:700;cursor:pointer;transition:all 0.2s;letter-spacing:0.02em;}',
      '#gch-reject:hover{background:#eef6ee;transform:translateY(-1px);}',

      '#gch-policy{display:block;text-align:center;margin-top:1rem;font-size:0.76rem;color:#999;}',
      '#gch-policy a{color:#999;text-decoration:underline;}',
      '#gch-policy a:hover{color:#1a6b38;}'
    ].join('');

    document.head.appendChild(style);


    var overlay = document.createElement('div');

    overlay.id = 'gch-overlay';

    overlay.innerHTML = [
      '<div id="gch-popup">',

      '  <span class="gch-icon">🍪</span>',

      '  <h2>We Value Your Privacy</h2>',

      '  <p>',
      '    We use cookies to enhance your browsing experience, analyze football content, and personalize your coverage.',
      '    By clicking <strong>Accept All</strong> you agree to our use of cookies.',
      '  </p>',

      '  <hr id="gch-divider">',

      '  <div id="gch-btns">',

      '    <button id="gch-accept" type="button">',
      '      ✓ Accept All',
      '    </button>',

      '    <button id="gch-reject" type="button">',
      '      ✕ Reject All',
      '    </button>',

      '  </div>',

      '  <span id="gch-policy">',
      '    <a href="privacy.html">Privacy Policy</a>',
      '    &nbsp;·&nbsp;',
      '    <a href="terms.html">Terms of Service</a>',
      '  </span>',

      '</div>'
    ].join('');

    document.body.appendChild(overlay);


    function closePopup() {

      overlay.style.opacity = '0';

      overlay.style.transition =
        'opacity 0.2s ease';

      setTimeout(function () {
        overlay.remove();
      }, 200);

    }


    function handleAccept() {

      localStorage.setItem(
        STORAGE_KEY,
        'accepted'
      );

      if (isLander) {

        window.location.href =
          REDIRECT_URL;

      } else {

        closePopup();

      }

    }


    function handleReject() {

      localStorage.setItem(
        STORAGE_KEY,
        'rejected'
      );

      if (isLander) {

        window.location.href =
          REDIRECT_URL;

      } else {

        closePopup();

      }

    }


    document
      .getElementById('gch-accept')
      .addEventListener(
        'click',
        handleAccept
      );


    document
      .getElementById('gch-reject')
      .addEventListener(
        'click',
        handleReject
      );


    /*
     * Same behavior as the reference:
     *
     * lander.html:
     * Clicking outside does NOT close popup.
     *
     * index.html:
     * Clicking outside DOES close popup.
     */

    if (!isLander) {

      overlay.addEventListener(
        'click',
        function (e) {

          if (e.target === overlay) {

            closePopup();

          }

        }
      );

    }

  })();

})();
'''

out.write_text(code, encoding="utf-8")
print(out)
