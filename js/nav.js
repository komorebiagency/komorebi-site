(function(){
  var btn = document.querySelector('.nav-hamburger');
  var menu = document.querySelector('.nav-ul');
  if(!btn || !menu) return;
  btn.addEventListener('click', function(){
    var open = menu.classList.toggle('open');
    btn.setAttribute('aria-expanded', open);
  });
  // cerrar al hacer click en un link
  menu.querySelectorAll('a').forEach(function(a){
    a.addEventListener('click', function(){ menu.classList.remove('open'); });
  });
})();
