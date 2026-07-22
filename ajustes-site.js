(function(){
  const STORAGE_KEY = 'contatos_empresa_web_v1';
  const ADMIN_STYLE_ID = 'admin-only-contact-actions-style';

  function administradorAtivo(){
    try{
      return typeof currentAdministrator!=='undefined'&&Boolean(currentAdministrator);
    }catch{
      return false;
    }
  }

  function sincronizarPerfilAdministrador(){
    document.body.classList.toggle('perfil-administrador',administradorAtivo());
  }

  function instalarProtecaoAdministrador(){
    if(!document.getElementById(ADMIN_STYLE_ID)){
      const style=document.createElement('style');
      style.id=ADMIN_STYLE_ID;
      style.textContent='body:not(.perfil-administrador) .subcontact-menu{display:none!important}';
      document.head.appendChild(style);
    }
    sincronizarPerfilAdministrador();
  }

  function subirAteOTopo(){
    window.scrollTo({top:0,left:0,behavior:'smooth'});
  }

  function corrigirInicio(){
    if(location.hash==='#inicio'){
      requestAnimationFrame(subirAteOTopo);
      setTimeout(subirAteOTopo,80);
    }
  }

  function salvarAlteracoesAutomaticamente(){
    try{
      if(typeof contacts!=='undefined'&&Array.isArray(contacts)){
        localStorage.setItem(STORAGE_KEY,JSON.stringify(contacts));
      }
    }catch{}
  }

  document.querySelectorAll('a[href="#inicio"]').forEach(link=>{
    link.addEventListener('click',event=>{
      event.preventDefault();
      if(location.hash!=='#inicio')history.pushState(null,'','#inicio');
      subirAteOTopo();
    });
  });

  document.addEventListener('click',event=>{
    const opcaoRestrita=event.target.closest('.subcontact-menu-option.edit-action,.subcontact-menu-option.delete-action');
    if(opcaoRestrita&&!administradorAtivo()){
      event.preventDefault();
      event.stopImmediatePropagation();
      if(typeof openAdministratorLogin==='function')openAdministratorLogin();
    }
  },true);

  window.addEventListener('hashchange',corrigirInicio);
  window.addEventListener('load',corrigirInicio);
  window.addEventListener('beforeunload',salvarAlteracoesAutomaticamente);
  document.addEventListener('visibilitychange',()=>{
    if(document.visibilityState==='hidden')salvarAlteracoesAutomaticamente();
  });
  instalarProtecaoAdministrador();
  setInterval(sincronizarPerfilAdministrador,500);
})();
