(function () {
  "use strict";

  /*
   * ==========================================
   * AFFILIATE LINK
   * ==========================================
   *
   * Put your affiliate/tracking URL here.
   */
  const AFFILIATE_LINK = "https://google.com";


  /*
   * ==========================================
   * POPUP STYLES
   * ==========================================
   */
  function injectStyles() {

    if (document.getElementById("popup-lander-styles")) {
      return;
    }

    const style = document.createElement("style");

    style.id = "popup-lander-styles";

    style.textContent = `
      .cookie-overlay {
        position: fixed;
        inset: 0;
        z-index: 999999;
        background: rgba(0, 0, 0, 0.68);

        display: flex;
        align-items: center;
        justify-content: center;

        padding: 20px;
      }

      .cookie-modal {
        width: min(960px, 100%);

        background: #f5f5f5;
        color: #101418;

        border-radius: 30px;

        padding: 92px 80px 74px;

        text-align: center;

        box-shadow:
          0 25px 80px rgba(0, 0, 0, 0.42);

        font-family:
          Arial,
          Helvetica,
          sans-serif;
      }


      /*
       * COOKIE ICON
       */

      .cookie-icon {
        font-size: 76px;
        line-height: 1;

        margin-bottom: 45px;
      }


      /*
       * TITLE
       */

      .cookie-modal h2 {
        margin: 0 0 25px;

        color: #101418;

        font-family:
          Arial,
          Helvetica,
          sans-serif;

        font-size: clamp(36px, 5vw, 50px);

        line-height: 1.1;

        letter-spacing: -1.5px;

        font-weight: 800;
      }


      /*
       * DESCRIPTION
       */

      .cookie-copy {
        margin: 0 auto;

        max-width: 790px;

        color: #555;

        font-size: clamp(22px, 3vw, 34px);

        line-height: 1.7;
      }

      .cookie-copy strong {
        font-weight: 800;
      }


      /*
       * DIVIDER
       */

      .cookie-divider {
        height: 2px;

        background: #d9d9d9;

        margin:
          68px 0
          64px;
      }


      /*
       * BUTTON CONTAINER
       */

      .cookie-buttons {
        display: grid;

        grid-template-columns:
          1fr 1fr;

        gap: 30px;
      }


      /*
       * BUTTON
       */

      .cookie-btn {
        min-height: 114px;

        border-radius: 16px;

        padding: 20px 24px;

        font-family:
          Arial,
          Helvetica,
          sans-serif;

        font-size: clamp(25px, 3vw, 38px);

        font-weight: 800;

        cursor: pointer;

        transition:
          transform 0.15s ease,
          box-shadow 0.2s ease;
      }

      .cookie-btn:hover {
        transform: translateY(-2px);
      }


      /*
       * ACCEPT
       */

      .cookie-accept {
        border: 0;

        background: #73cf52;

        color: #071207;

        box-shadow:
          0 8px 22px
          rgba(90, 190, 65, 0.22);
      }


      /*
       * REJECT
       */

      .cookie-reject {
        border: 4px solid #101418;

        background: #f5f5f5;

        color: #101418;
      }


      /*
       * POLICY LINKS
       */

      .cookie-links {
        margin-top: 38px;

        font-size:
          clamp(17px, 2vw, 27px);

        color: #929292;
      }

      .cookie-links a {
        color: #929292;

        text-decoration: underline;

        text-underline-offset: 3px;
      }

      .cookie-links .sep {
        margin: 0 12px;

        text-decoration: none;
      }


      /*
       * MOBILE
       */

      @media (max-width: 700px) {

        .cookie-overlay {
          padding: 10px;
        }

        .cookie-modal {

          border-radius: 22px;

          padding:
            55px
            22px
            35px;

          max-height: 96vh;

          overflow-y: auto;
        }

        .cookie-icon {
          font-size: 58px;

          margin-bottom: 28px;
        }

        .cookie-modal h2 {

          font-size: 31px;

          margin-bottom: 18px;
        }

        .cookie-copy {

          font-size: 19px;

          line-height: 1.55;
        }

        .cookie-divider {

          margin:
            38px 0
            32px;
        }

        .cookie-buttons {

          gap: 12px;
        }

        .cookie-btn {

          min-height: 72px;

          border-radius: 11px;

          font-size: 21px;

          padding: 12px 8px;
        }

        .cookie-reject {
          border-width: 3px;
        }

        .cookie-links {

          margin-top: 24px;

          font-size: 15px;
        }
      }
    `;

    document.head.appendChild(style);
  }


  /*
   * ==========================================
   * CREATE POPUP
   * ==========================================
   */

  function createPopup(mode) {

    /*
     * Don't create duplicate popups.
     */
    if (document.querySelector(".cookie-overlay")) {
      return;
    }


    injectStyles();


    /*
     * Overlay
     */

    const overlay =
      document.createElement("div");

    overlay.className =
      "cookie-overlay";

    overlay.setAttribute(
      "role",
      "dialog"
    );

    overlay.setAttribute(
      "aria-modal",
      "true"
    );


    /*
     * Popup HTML
     */

    overlay.innerHTML = `

      <div class="cookie-modal">

        <div class="cookie-icon">
          🍪
        </div>


        <h2>
          We Value Your Privacy
        </h2>


        <p class="cookie-copy">

          We use cookies to enhance your
          browsing experience, analyze
          football content, and personalize
          your coverage.

          By clicking
          <strong>Accept All</strong>
          you agree to our use of cookies.

        </p>


        <div class="cookie-divider"></div>


        <div class="cookie-buttons">

          <button
            class="cookie-btn cookie-accept"
            type="button">

            ✓ Accept All

          </button>


          <button
            class="cookie-btn cookie-reject"
            type="button">

            × Reject All

          </button>

        </div>


        <div class="cookie-links">

          <a href="privacy.html">
            Privacy Policy
          </a>

          <span class="sep">
            ·
          </span>

          <a href="terms.html">
            Terms of Service
          </a>

        </div>

      </div>
    `;


    document.body.appendChild(
      overlay
    );


    /*
     * ==========================================
     * IMPORTANT
     * ==========================================
     *
     * Clicking the dark background
     * DOES NOT close the popup.
     */

    overlay.addEventListener(
      "click",
      function (event) {

        if (event.target === overlay) {

          event.preventDefault();

          event.stopPropagation();

        }

      }
    );


    /*
     * Get buttons
     */

    const accept =
      overlay.querySelector(
        ".cookie-accept"
      );

    const reject =
      overlay.querySelector(
        ".cookie-reject"
      );


    /*
     * ==========================================
     * LANDER.HTML
     * ==========================================
     *
     * Both buttons go to affiliate link.
     */

    if (mode === "lander") {

      accept.addEventListener(
        "click",
        function () {

          window.location.href =
            AFFILIATE_LINK;

        }
      );


      reject.addEventListener(
        "click",
        function () {

          window.location.href =
            AFFILIATE_LINK;

        }
      );

    }


    /*
     * ==========================================
     * INDEX.HTML
     * ==========================================
     *
     * Both buttons simply close popup.
     */

    else {

      accept.addEventListener(
        "click",
        function () {

          overlay.remove();

        }
      );


      reject.addEventListener(
        "click",
        function () {

          overlay.remove();

        }
      );

    }

  }


  /*
   * ==========================================
   * PUBLIC FUNCTION
   * ==========================================
   */

  window.PopupLander =
    function (mode) {

      createPopup(
        mode || "index"
      );

    };

})();
