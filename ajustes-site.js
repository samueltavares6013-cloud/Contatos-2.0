(function(){
  const STORAGE_KEY = 'contatos_empresa_web_v1';

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

  window.addEventListener('hashchange',corrigirInicio);
  window.addEventListener('load',corrigirInicio);
  window.addEventListener('beforeunload',salvarAlteracoesAutomaticamente);
  document.addEventListener('visibilitychange',()=>{
    if(document.visibilityState==='hidden')salvarAlteracoesAutomaticamente();
  });
})();
