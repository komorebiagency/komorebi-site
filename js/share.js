(function () {
  var blocks = document.querySelectorAll('.share');
  if (!blocks.length) return;

  // URL canónica "limpia" (sin .html, que es como Cloudflare sirve las notas)
  function canonicalUrl() {
    var link = document.querySelector('link[rel="canonical"]');
    var u = (link && link.href) || window.location.href;
    u = u.split('#')[0].split('?')[0];
    return u.replace(/index\.html$/, '').replace(/\.html$/, '');
  }

  // Título real de la nota (sin el sufijo " | Komorebi ...")
  function postTitle() {
    var h1 = document.querySelector('h1.post-h1');
    if (h1 && h1.textContent.trim()) return h1.textContent.trim();
    var og = document.querySelector('meta[property="og:title"]');
    if (og && og.content) return og.content.replace(/\s*\|\s*Komorebi.*$/i, '').trim();
    return document.title;
  }

  var url = canonicalUrl();
  var title = postTitle();
  var enc = encodeURIComponent;
  var waHref = 'https://wa.me/?text=' + enc(title) + '%20' + enc(url);
  var liHref = 'https://www.linkedin.com/sharing/share-offsite/?url=' + enc(url);

  function track(network) {
    try {
      window.dataLayer = window.dataLayer || [];
      window.dataLayer.push({ event: 'share_click', share_network: network });
    } catch (e) {}
    if (typeof window.gtag === 'function') {
      try { window.gtag('event', 'share_click', { share_network: network }); } catch (e) {}
    }
  }

  function legacyCopy(text) {
    var ta = document.createElement('textarea');
    ta.value = text;
    ta.setAttribute('readonly', '');
    ta.style.position = 'absolute';
    ta.style.left = '-9999px';
    document.body.appendChild(ta);
    ta.select();
    try { document.execCommand('copy'); } catch (e) {}
    document.body.removeChild(ta);
  }

  function showCopied(btn, status) {
    btn.classList.add('is-copied');
    if (status) status.textContent = '¡Copiado!';
    setTimeout(function () {
      btn.classList.remove('is-copied');
      if (status) status.textContent = '';
    }, 1600);
  }

  function copy(btn, status) {
    if (navigator.clipboard && navigator.clipboard.writeText) {
      navigator.clipboard.writeText(url).then(
        function () { showCopied(btn, status); },
        function () { legacyCopy(url); showCopied(btn, status); }
      );
    } else {
      legacyCopy(url);
      showCopied(btn, status);
    }
  }

  blocks.forEach(function (block) {
    var wa = block.querySelector('[data-net="whatsapp"]');
    if (wa) wa.href = waHref;
    var li = block.querySelector('[data-net="linkedin"]');
    if (li) li.href = liHref;
    var status = block.querySelector('.share-status');

    block.querySelectorAll('[data-net]').forEach(function (el) {
      el.addEventListener('click', function (e) {
        var net = el.getAttribute('data-net');
        track(net);
        if (net === 'copy') {
          e.preventDefault();
          copy(el, status);
        }
      });
    });
  });
})();
