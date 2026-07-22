(function(){
  const STORAGE_KEY = 'contatos_empresa_web_v1';
  const DELETED_TOPICS_KEY = 'centro_inteligencia_abas_excluidas_v1';
  const ADMIN_STYLE_ID = 'admin-only-contact-actions-style';

  function chaveAba(valor){
    return String(valor||'').normalize('NFD').replace(/[\u0300-\u036f]/g,'').toLocaleLowerCase('pt-BR').trim();
  }

  function lerAbasExcluidas(){
    try{
      const dados=JSON.parse(localStorage.getItem(DELETED_TOPICS_KEY));
      return new Set(Array.isArray(dados)?dados:[]);
    }catch{
      return new Set();
    }
  }

  function salvarAbasExcluidas(abas){
    localStorage.setItem(DELETED_TOPICS_KEY,JSON.stringify([...abas]));
  }

  function registrarAbaExcluida(contato){
    const chave=chaveAba(contato?.name);
    if(!chave)return;
    const abas=lerAbasExcluidas();
    abas.add(chave);
    salvarAbasExcluidas(abas);
  }

  function liberarAbaRecriada(nome){
    const chave=chaveAba(nome);
    if(!chave)return;
    const abas=lerAbasExcluidas();
    if(abas.delete(chave))salvarAbasExcluidas(abas);
  }

  function aplicarAbasExcluidas(){
    try{
      if(typeof contacts==='undefined'||!Array.isArray(contacts))return;
      const abas=lerAbasExcluidas();
      if(!abas.size)return;
      const totalAntes=contacts.length;
      contacts=contacts.filter(contato=>!abas.has(chaveAba(contato.name)));
      if(contacts.length!==totalAntes){
        localStorage.setItem(STORAGE_KEY,JSON.stringify(contacts));
        if(typeof renderDirectory==='function')renderDirectory();
        if(typeof renderAdmin==='function')renderAdmin();
      }
    }catch{}
  }

  function protegerExclusaoDeAbas(){
    try{
      if(typeof deleteContact!=='function'||deleteContact.__mantemExclusao)return;
      const excluirOriginal=deleteContact;
      deleteContact=function(contato){
        const chave=chaveAba(contato?.name);
        excluirOriginal(contato);
        setTimeout(()=>{
          try{
            if(chave&&Array.isArray(contacts)&&!contacts.some(item=>chaveAba(item.name)===chave)){
              registrarAbaExcluida(contato);
              aplicarAbasExcluidas();
            }
          }catch{}
        },0);
      };
      deleteContact.__mantemExclusao=true;
    }catch{}
  }

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

  const formContato=document.getElementById('contact-form');
  if(formContato){
    formContato.addEventListener('submit',()=>{
      const nome=document.getElementById('contact-name')?.value;
      liberarAbaRecriada(nome);
    });
  }

  window.addEventListener('hashchange',corrigirInicio);
  window.addEventListener('load',corrigirInicio);
  window.addEventListener('beforeunload',salvarAlteracoesAutomaticamente);
  document.addEventListener('visibilitychange',()=>{
    if(document.visibilityState==='hidden')salvarAlteracoesAutomaticamente();
  });
  aplicarAbasExcluidas();
  protegerExclusaoDeAbas();
  instalarProtecaoAdministrador();
  setInterval(()=>{sincronizarPerfilAdministrador(); protegerExclusaoDeAbas();},500);
})();
