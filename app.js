const STORAGE_KEY = 'contatos_empresa_web_v1';
const ADMIN_STORAGE_KEY = 'centro_inteligencia_administradores_v1';
const TOPICS_MIGRATION_KEY = 'centro_inteligencia_topicos_gcm_exercito_v1';
const GCM_PHONE_MIGRATION_KEY = 'centro_inteligencia_gcm_153_v1';
const defaultAdministrators = [{id:1,name:'Administrador principal',username:'admin',password:'admin123'}];
const categoryOrder = ['Externos', 'Internos'];
const seedContacts = [
  {id:1,name:'SAMU',role:'Serviço de Atendimento Médico',phone:'192',category:'Emergência',icon:'medical',order:1},
  {id:2,name:'Polícia Militar',role:'Emergência Policial',phone:'190',category:'Emergência',icon:'police',order:2},
  {id:3,name:'Bombeiros',role:'Corpo de Bombeiros',phone:'193',category:'Emergência',icon:'fire',order:3},
  {id:4,name:'Defesa Civil',role:'Defesa Civil',phone:'199',category:'Emergência',icon:'security',order:4},
  {id:5,name:'CEO',role:'Diretor Executivo',phone:'(11) 99999-0001',category:'Diretoria',icon:'business',order:1},
  {id:6,name:'CFO',role:'Diretor Financeiro',phone:'(11) 99999-0002',category:'Diretoria',icon:'business',order:2},
  {id:7,name:'COO',role:'Diretor de Operações',phone:'(11) 99999-0003',category:'Diretoria',icon:'business',order:3},
  {id:8,name:'Segurança',role:'Central de Segurança',phone:'(11) 99999-0010',category:'Operacional',icon:'security',order:1},
  {id:9,name:'TI / Suporte',role:'Tecnologia da Informação',phone:'(11) 99999-0011',category:'Operacional',icon:'computer',order:2},
  {id:10,name:'Manutenção',role:'Central de Manutenção',phone:'(11) 99999-0012',category:'Operacional',icon:'tools',order:3},
  {id:101,name:'GCM',role:'Guarda Civil Municipal',phone:'153',category:'Emergência',icon:'gcm',order:5,subcontacts:[{id:1,name:'GCM',role:'Guarda Civil Municipal',phone:'153'}]},
  {id:102,name:'EXÉRCITO',role:'Forças Armadas',phone:'',category:'Emergência',icon:'military',order:6,subcontacts:[]}
];
const icons = {phone:'☎',medical:'✚',police:'★',fire:'♨',business:'▦',security:'◆',computer:'▣',tools:'⚒',person:'●',gcm:'⬟',military:'✦'};
const sc=(name,role,phone='',ramal='',sso='')=>({name,role,phone,ramal,sso});
const completeDirectory=[
  {name:'SAMU',role:'Serviço de Atendimento Médico',phone:'192',category:'Externos',icon:'medical',order:1,subcontacts:[sc('SAMU','Atendimento Médico','192')]},
  {name:'Polícia Militar',role:'Emergência Policial',phone:'190',category:'Externos',icon:'police',order:2,subcontacts:[
    sc('Tenente-Coronel Caparroz','Secretaria De Segurança','(11) 98442-7760'),sc('Capitão Crúvel','CPA/M-1 Centro','(11) 98331-8317'),sc('Coronel Paulo Aguiar','Cpa/M-5 - Zona Norte','(11) 98445-0890'),sc('Capitão Rodolfo Arcos','Inteligência PM - Zona Norte','(11) 99745-7484'),sc('Capitão Santarelli','1º Cia 4º BPM - Zona Norte','(11) 98207-0545'),sc('Major Daniel Bezerra','Cpa/M-3 - Zona Norte','(11) 97151-0185'),sc('Coronel Virgilio','CPA/M-1 - Centro','(11) 94019-2888'),sc('CET','CCO','(11) 99369-9588'),sc('Coronel Agrela','Gerente de Segurança do Metrô','(11) 98231-3727'),sc('Corporativo Copom','Central Copom','(11) 96388-5416'),sc('Major Wendel','18º BPM','(11) 96559-8501'),sc('Rodrigo','Analista de Segurança Tic Trens','(11) 97675-6705'),sc('Thyellis De Luca','Secretária Virgílio CPA/M-1','(11) 99153-2624'),sc('Coronel Villariço','Gabinete de Comando/Copom','(11) 96604-5907')
  ]},
  {name:'Bombeiros',role:'Corpo de Bombeiros',phone:'193',category:'Externos',icon:'fire',order:3,subcontacts:[sc('Bombeiros','Corpo de Bombeiros','193'),sc('Resgate','Atendimento de Emergência','193'),sc('Prevenção','Atendimento Preventivo','193'),sc('Apoio Operacional Bombeiros','Apoio Operacional','193')]},
  {name:'Defesa Civil',role:'Defesa Civil',phone:'199',category:'Externos',icon:'security',order:4,subcontacts:[sc('Defesa Civil','Atendimento Emergencial','199')]},
  {name:'GCM',role:'Guarda Civil Municipal',phone:'153',category:'Externos',icon:'gcm',order:5,subcontacts:[sc('GCM','Guarda Civil Municipal','153'),sc('Inspetor Gonçalves','Inteligência GCM','(11) 99092-0322'),sc('Central GCM','Atendimento Operacional','153')]},
  {name:'EXÉRCITO',role:'Forças Armadas',phone:'',category:'Externos',icon:'military',order:6,subcontacts:[sc('Exército','Forças Armadas','')]},
  {name:'SUB PREFEITURAS',role:'Atendimento Regional',phone:'',category:'Externos',icon:'business',order:1,subcontacts:[sc('Dayane Godoi','Sub Prefeitura Butantã','(11) 98672-9288')]},
  {name:'OUTROS',role:'Contatos Diversos',phone:'',category:'Externos',icon:'person',order:2,subcontacts:[
    sc('Mário Cardoso','TIC Trens','(11) 99613-8990'),sc('Epominondas','Sec Transportes Metropolitanos','(11) 99874-0990'),sc('Larissa','Metrô SP','(11) 97693-6121'),sc('Ferreira','Trivia Trens','(11) 98234-9124'),sc('Rodrigo','Metrô SP','(11) 98750-5091'),sc('Sergio','Inteligência CPTM','(11) 96756-7971'),sc('Everton Dantas','CCO Palmeiras','(11) 95889-0627'),sc('Gilberto','Segurança Palmeiras','(11) 94073-2019'),sc('Wagner','SPTuris','(11) 97210-5785'),sc('Alexsander Parpinelli','Engenharia CET','(11) 99776-5850'),sc('Serafim','Artesp','(11) 99224-5122'),sc('Lucas Dantas','Secretaria de Cultura SP','(11) 94488-4814'),sc('Coronel Prates','SPTuris','(11) 96604-5907'),sc('CET','Companhia de Engenharia de Tráfego','(11) 99776-5850'),sc('Artesp','Agência de Transporte do Estado','(11) 99224-5122'),sc('Metrô SP','Operação Metroviária','(11) 97693-6121'),sc('CPTM','Operação Ferroviária','(11) 96756-7971'),sc('SPTrans','Transporte Municipal','(11) 99874-0990'),sc('SPTuris','Eventos e Turismo','(11) 97210-5785'),sc('Segurança Palmeiras','Apoio Institucional','(11) 94073-2019')
  ]},
  {name:'CPS/CGM/CCT',role:'Centro de Controle Operacional',phone:'',category:'Internos',icon:'security',order:1,subcontacts:[sc('CPS/CGM/CCT','Centro de Controle Operacional','(11) 92053-7277')]},
  {name:'Segurança',role:'Central de Segurança',phone:'',category:'Internos',icon:'security',order:2,subcontacts:[sc('Segurança','Central de Segurança','(11) 99999-0010')]},
  {name:'Estações',role:'Linha Uni',phone:'',category:'Internos',icon:'business',order:3,subcontacts:[sc('Santa Marina','Se Firmino','11 99999999','4002','5555')]},
  {name:'TI / Suporte',role:'Tecnologia da Informação',phone:'',category:'Internos',icon:'computer',order:4,subcontacts:[sc('TI / Suporte','Tecnologia da Informação','(11) 99999-0011')]},
  {name:'CPS',role:'Centro de Controle Operacional',phone:'',category:'Internos',icon:'business',order:5,subcontacts:[sc('CPS','Centro de Controle Operacional','(11) 92101-0060')]},
  {name:'Manutenção',role:'Central de Manutenção',phone:'',category:'Internos',icon:'tools',order:6,subcontacts:[sc('Manutenção','Central de Manutenção','(11) 99999-0012')]},
  {name:'Supervisão',role:'Linha Uni',phone:'',category:'Internos',icon:'business',order:7,subcontacts:[sc('Supervisão','Linha Uni','')]},
  {name:'Sala Operacional',role:'Apoio Interno',phone:'',category:'Internos',icon:'phone',order:8,subcontacts:[sc('Sala Operacional','Apoio Interno','')]}
];
function normalizeCategoryName(category){
  if(category==='Internos'||category==='Operacional')return 'Internos';
  if(category==='Diretoria')return '';
  return 'Externos';
}
function mergeKey(value){return String(value||'').normalize('NFD').replace(/[\u0300-\u036f]/g,'').toLocaleLowerCase('pt-BR').trim();}
const peopleByOldOrganization={
  'cet':sc('Alexsander Parpinelli','Engenharia CET','(11) 99776-5850'),
  'artesp':sc('Serafim','Artesp','(11) 99224-5122'),
  'metro sp':sc('Larissa','Metrô SP','(11) 97693-6121'),
  'cptm':sc('Sergio','Inteligência CPTM','(11) 96756-7971'),
  'sptrans':sc('Epominondas','Sec Transportes Metropolitanos','(11) 99874-0990'),
  'spturis':sc('Wagner','SPTuris','(11) 97210-5785'),
  'seguranca palmeiras':sc('Gilberto','Segurança Palmeiras','(11) 94073-2019')
};
function restorePeopleNames(topic){
  if(!topic||mergeKey(topic.name)!=='outros'||!Array.isArray(topic.subcontacts))return;
  topic.subcontacts=topic.subcontacts.map(item=>{
    const replacement=peopleByOldOrganization[mergeKey(item.name)];
    return replacement?{...item,...replacement,id:item.id}:item;
  }).filter((item,index,list)=>list.findIndex(other=>mergeKey(other.name)===mergeKey(item.name)&&String(other.phone||'')===String(item.phone||''))===index);
}
function removeDuplicateSubcontacts(topic){
  if(!topic||!Array.isArray(topic.subcontacts))return;
  const seen=new Set();
  topic.subcontacts=topic.subcontacts.filter(item=>{
    const key=`${mergeKey(item.name)}|${String(item.phone||'').replace(/\D/g,'')}`;
    if(seen.has(key))return false;
    seen.add(key);
    return true;
  });
}
function copyBombeirosToPolice(list){
  const police=list.find(contact=>mergeKey(contact.name).includes('policia militar'));
  const fire=list.find(contact=>mergeKey(contact.name).includes('bombeiros'));
  if(!police||!fire||!Array.isArray(police.subcontacts)||!Array.isArray(fire.subcontacts))return;
  let nextId=Math.max(0,...police.subcontacts.map(item=>Number(item.id)||0))+1;
  fire.subcontacts.forEach(item=>{
    const alreadyExists=police.subcontacts.some(saved=>mergeKey(saved.name)===mergeKey(item.name)&&String(saved.phone||'')===String(item.phone||''));
    if(!alreadyExists)police.subcontacts.push({...item,id:nextId++});
  });
  removeDuplicateSubcontacts(police);
}
function removePolice190Subcontacts(list){
  const police=list.find(contact=>mergeKey(contact.name).includes('policia militar'));
  if(!police||!Array.isArray(police.subcontacts))return;
  police.subcontacts=police.subcontacts.filter(item=>String(item.phone||'').replace(/\D/g,'')!=='190');
}
function completeContacts(list){
  const normalized=normalizeContacts(list).filter(contact=>contact.category!=='Diretoria');
  let nextTopicId=Math.max(0,...normalized.map(contact=>Number(contact.id)||0))+1;
  completeDirectory.forEach(master=>{
    let topic=normalized.find(contact=>mergeKey(contact.name)===mergeKey(master.name));
    if(!topic){
      topic={...JSON.parse(JSON.stringify(master)),id:nextTopicId++};
      topic.subcontacts=topic.subcontacts.map((item,index)=>({...item,id:index+1}));
      normalized.push(topic);
      return;
    }
    topic.role=topic.role||master.role;
    topic.phone=topic.phone||master.phone;
    topic.category=topic.category||master.category;
    topic.icon=topic.icon||master.icon;
    topic.order=topic.order||master.order;
    topic.subcontacts=Array.isArray(topic.subcontacts)?topic.subcontacts:[];
    let nextSubId=Math.max(0,...topic.subcontacts.map(item=>Number(item.id)||0))+1;
    master.subcontacts.forEach(item=>{
      const sameName=topic.subcontacts.find(saved=>mergeKey(saved.name)===mergeKey(item.name));
      if(sameName){
        if(!sameName.phone&&item.phone)sameName.phone=item.phone;
        if(!sameName.role&&item.role)sameName.role=item.role;
        if(!sameName.ramal&&item.ramal)sameName.ramal=item.ramal;
        if(!sameName.sso&&item.sso)sameName.sso=item.sso;
        return;
      }
      topic.subcontacts.push({...item,id:nextSubId++});
    });
    restorePeopleNames(topic);
    removeDuplicateSubcontacts(topic);
  });
  copyBombeirosToPolice(normalized);
  removePolice190Subcontacts(normalized);
  normalized.forEach(topic=>{ restorePeopleNames(topic); removeDuplicateSubcontacts(topic); });
  localStorage.setItem(STORAGE_KEY,JSON.stringify(normalized));
  return normalized;
}
function contactCount(list){return list.reduce((total,contact)=>total+(Array.isArray(contact.subcontacts)?contact.subcontacts.length:0),0);}
function contactCountText(total){return `${total} contato${total===1?'':'s'}`;}
function totalSubcontacts(){return contactCount(contacts.filter(contact=>categoryOrder.includes(contact.category)));}
let contacts = loadContacts();
let administrators = loadAdministrators();
let currentAdministrator = null;
let pendingAdministratorAction = null;
const openCategories = new Set(['Externos','Internos']);
const openContacts = new Set();
const $ = (selector) => document.querySelector(selector);

function loadContacts(){
  try { const saved=JSON.parse(localStorage.getItem(STORAGE_KEY)); return completeContacts(Array.isArray(saved)?saved:seedContacts); }
  catch { return completeContacts(seedContacts); }
}
function normalizeContacts(list){
  const normalized=JSON.parse(JSON.stringify(list)).map(contact=>({
    ...contact,
    category:normalizeCategoryName(contact.category),
    subcontacts:Array.isArray(contact.subcontacts)?contact.subcontacts:[{id:1,name:contact.name,role:contact.role||'',phone:contact.phone}]
  })).filter(contact=>contact.category);
  try {
    if(!localStorage.getItem(TOPICS_MIGRATION_KEY)){
      seedContacts.filter(topic=>['GCM','EXÉRCITO'].includes(topic.name)).forEach(topic=>{
        if(!normalized.some(contact=>contact.name.toLocaleUpperCase('pt-BR')===topic.name))normalized.push(JSON.parse(JSON.stringify(topic)));
      });
      localStorage.setItem(TOPICS_MIGRATION_KEY,'1'); localStorage.setItem(STORAGE_KEY,JSON.stringify(normalized));
    }
    if(!localStorage.getItem(GCM_PHONE_MIGRATION_KEY)){
      const gcm=normalized.find(contact=>contact.name.toLocaleUpperCase('pt-BR')==='GCM');
      if(gcm){
        if(!gcm.phone)gcm.phone='153';
        if(!gcm.subcontacts.length)gcm.subcontacts.push({id:1,name:'GCM',role:'Guarda Civil Municipal',phone:gcm.phone||'153'});
        localStorage.setItem(STORAGE_KEY,JSON.stringify(normalized));
      }
      localStorage.setItem(GCM_PHONE_MIGRATION_KEY,'1');
    }
  }catch{}
  return normalized;
}
function saveContacts(){ localStorage.setItem(STORAGE_KEY,JSON.stringify(contacts)); refreshDirectory(); }
function refreshDirectory(){ renderDirectory(); if(!$('#admin-panel').classList.contains('hidden'))renderAdmin(); }
function loadAdministrators(){
  try { const saved=JSON.parse(localStorage.getItem(ADMIN_STORAGE_KEY)); return Array.isArray(saved)&&saved.length?saved:JSON.parse(JSON.stringify(defaultAdministrators)); }
  catch { return JSON.parse(JSON.stringify(defaultAdministrators)); }
}
function saveAdministrators(){ localStorage.setItem(ADMIN_STORAGE_KEY,JSON.stringify(administrators)); }
function cleanPhone(phone){ return String(phone||'').replace(/[^0-9+]/g,''); }
function whatsappPhone(phone){ const clean=cleanPhone(phone).replace('+',''); return clean.startsWith('55')?clean:`55${clean}`; }
function openModal(id){ document.getElementById(id).classList.remove('hidden'); document.body.style.overflow='hidden'; }
function closeModal(id){ document.getElementById(id).classList.add('hidden'); if(!document.querySelector('.modal:not(.hidden),.admin-panel:not(.hidden)')) document.body.style.overflow=''; }
function el(tag,className,text){ const node=document.createElement(tag); if(className) node.className=className; if(text!==undefined) node.textContent=text; return node; }

function sorted(list){ return [...list].sort((a,b)=>categoryOrder.indexOf(a.category)-categoryOrder.indexOf(b.category)||(a.order||0)-(b.order||0)||a.name.localeCompare(b.name)); }
function filteredContacts(){
  const q=$('#search').value.trim().toLocaleLowerCase('pt-BR');
  return sorted(contacts.filter(c=>!q||[c.name,c.role,c.phone,c.category,...(c.subcontacts||[]).flatMap(item=>[item.name,item.role,item.phone])].some(v=>String(v||'').toLocaleLowerCase('pt-BR').includes(q))));
}
function contactCard(contact){
  const item=el('article','contact-item');
  const card=el('button','contact-card'); card.type='button'; card.setAttribute('aria-expanded',openContacts.has(contact.id)?'true':'false');
  const icon=el('span','contact-icon',icons[contact.icon]||icons.phone); icon.setAttribute('aria-hidden','true');
  const info=el('span','contact-info'); info.append(el('strong','',contact.name),el('span','',contact.role||contact.category)); if(contact.phone)info.append(el('small','',contact.phone));
  const indicator=el('span','call-dot','⌄'); indicator.setAttribute('aria-hidden','true');
  const topicCount=el('span','contact-topic-count',`${contact.subcontacts.length} contato${contact.subcontacts.length===1?'':'s'} cadastrado${contact.subcontacts.length===1?'':'s'}`);
  const cardMeta=el('span','contact-card-meta'); cardMeta.append(topicCount,indicator);
  const content=el('div','topic-content');
  const contentHeader=el('div','topic-content-header');
  const headerCopy=el('div'); headerCopy.append(el('strong','',`Contatos de ${contact.name}`),el('span','',`${contact.subcontacts.length} contato${contact.subcontacts.length===1?'':'s'} cadastrado${contact.subcontacts.length===1?'':'s'}`));
  const topicTools=el('div','topic-tools');
  const addContact=el('button','topic-tool primary','+ Adicionar contato'); addContact.type='button';
  const editTopic=el('button','topic-tool','Editar tópico'); editTopic.type='button';
  addContact.addEventListener('click',()=>requireAdministrator(()=>openSubcontactForm(contact)));
  editTopic.addEventListener('click',()=>requireAdministrator(()=>openContactForm(contact)));
  topicTools.append(addContact,editTopic); currentAdministrator?contentHeader.append(headerCopy,topicTools):contentHeader.append(headerCopy); content.append(contentHeader);
  const subcontactList=el('div','subcontact-list');
  if(!contact.subcontacts.length) subcontactList.append(el('p','subcontact-empty','Nenhum contato cadastrado neste tópico.'));
  contact.subcontacts.forEach(subcontact=>subcontactList.append(subcontactRow(contact,subcontact)));
  content.append(subcontactList); card.append(icon,info,cardMeta); item.append(card,content);
  if(openContacts.has(contact.id)) item.classList.add('expanded');
  card.addEventListener('click',()=>{
    const expanded=item.classList.toggle('expanded'); card.setAttribute('aria-expanded',String(expanded));
    expanded?openContacts.add(contact.id):openContacts.delete(contact.id);
  });
  return item;
}
function closeContactMenus(except=null){
  document.querySelectorAll('.subcontact-menu-panel:not(.hidden)').forEach(menu=>{
    if(menu!==except)menu.classList.add('hidden');
  });
}
function subcontactRow(parent,subcontact){
  const row=el('article','subcontact-row');
  const copy=el('div','subcontact-copy'); copy.append(el('strong','',subcontact.name),el('span','',subcontact.role||'Contato'),el('small','',subcontact.phone));
  const actions=el('div','subcontact-actions');
  const call=el('a','subcontact-action call-action','☎ Ligar'); call.href=`tel:${cleanPhone(subcontact.phone)}`;
  const whatsapp=el('a','subcontact-action whatsapp-action','◉ WhatsApp'); whatsapp.href=`https://wa.me/${whatsappPhone(subcontact.phone)}`; whatsapp.target='_blank'; whatsapp.rel='noreferrer';
  actions.append(call,whatsapp);
  actions.classList.add('with-menu');
  const menuWrap=el('div','subcontact-menu');
  const menuButton=el('button','subcontact-menu-button','⋯'); menuButton.type='button'; menuButton.setAttribute('aria-label','Abrir opções do contato');
  const menuPanel=el('div','subcontact-menu-panel hidden');
  const edit=el('button','subcontact-menu-option edit-action','Editar'); edit.type='button'; edit.addEventListener('click',()=>{closeContactMenus(); requireAdministrator(()=>openSubcontactForm(parent,subcontact));});
  const remove=el('button','subcontact-menu-option delete-action','Excluir'); remove.type='button'; remove.addEventListener('click',()=>{closeContactMenus(); requireAdministrator(()=>deleteSubcontact(parent,subcontact));});
  menuButton.addEventListener('click',event=>{event.stopPropagation(); const willOpen=menuPanel.classList.contains('hidden'); closeContactMenus(menuPanel); menuPanel.classList.toggle('hidden',!willOpen);});
  menuPanel.append(edit,remove); menuWrap.append(menuButton,menuPanel); actions.append(menuWrap);
  row.append(copy,actions); return row;
}
function renderDirectory(){
  const list=filteredContacts(), root=$('#contact-sections'), searching=Boolean($('#search').value.trim()); root.replaceChildren();
  $('#contact-count').textContent=totalSubcontacts(); $('#empty-state').classList.toggle('hidden',list.length>0);
  categoryOrder.concat([...new Set(list.map(c=>c.category).filter(c=>!categoryOrder.includes(c)))].sort()).forEach(category=>{
    const items=list.filter(c=>c.category===category); if(!items.length)return;
    const section=el('section','category-section');
    const heading=el('button','category-heading'); heading.type='button';
    const categoryTotal=contactCount(items);
    const title=el('span','category-title',category); const count=el('span','category-count',contactCountText(categoryTotal)); const chevron=el('span','category-chevron','⌄');
    const meta=el('span','category-meta'); meta.append(count,chevron); heading.append(title,meta);
    const grid=el('div','contact-grid'); const expanded=searching||openCategories.has(category);
    heading.setAttribute('aria-expanded',String(expanded)); if(!expanded)grid.classList.add('hidden'); else section.classList.add('expanded');
    items.forEach(c=>grid.append(contactCard(c))); section.append(heading,grid); root.append(section);
    heading.addEventListener('click',()=>{
      const isOpen=section.classList.toggle('expanded'); grid.classList.toggle('hidden',!isOpen); heading.setAttribute('aria-expanded',String(isOpen));
      isOpen?openCategories.add(category):openCategories.delete(category);
    });
  });
}
function renderAdmin(){
  const root=$('#admin-list'); root.replaceChildren();
  sorted(contacts).forEach(contact=>{
    const row=el('article','admin-row'), icon=el('span','contact-icon',icons[contact.icon]||icons.phone), info=el('div','admin-row-info');
    info.append(el('strong','',contact.name),el('span','',[contact.role||'Sem descrição',contact.phone,contact.category,`${contact.subcontacts.length} internos`].filter(Boolean).join(' · ')));
    const actions=el('div','row-actions'), internal=el('button','internal','Contatos internos'), edit=el('button','edit','Editar'), remove=el('button','delete','Excluir');
    internal.type=edit.type=remove.type='button'; internal.addEventListener('click',()=>openSubcontactForm(contact)); edit.addEventListener('click',()=>openContactForm(contact)); remove.addEventListener('click',()=>deleteContact(contact));
    actions.append(internal,edit,remove); row.append(icon,info,actions); root.append(row);
  });
}
function renderAdministrators(){
  const root=$('#administrator-list'); root.replaceChildren();
  administrators.forEach(administrator=>{
    const row=el('article','administrator-row');
    const initials=administrator.name.split(/\s+/).slice(0,2).map(part=>part[0]).join('').toUpperCase();
    const avatar=el('span','administrator-avatar',initials||'A');
    const info=el('div','administrator-info');
    info.append(el('strong','',administrator.name),el('span','',`Usuário: ${administrator.username}`));
    if(administrator.id===currentAdministrator?.id) info.append(el('span','admin-badge','SESSÃO ATUAL'));
    const remove=el('button','remove-admin','Remover'); remove.type='button';
    remove.disabled=administrators.length===1||administrator.id===currentAdministrator?.id;
    remove.title=remove.disabled?'Não é possível remover este administrador':'';
    remove.addEventListener('click',()=>removeAdministrator(administrator));
    row.append(avatar,info,remove); root.append(row);
  });
}
function removeAdministrator(administrator){
  if(confirm(`Remover o acesso de “${administrator.name}”?`)){
    administrators=administrators.filter(item=>item.id!==administrator.id); saveAdministrators(); renderAdministrators();
  }
}
function showAdminTab(name){
  document.querySelectorAll('[data-admin-tab]').forEach(button=>button.classList.toggle('active',button.dataset.adminTab===name));
  $('#contacts-pane').classList.toggle('hidden',name!=='contacts');
  $('#administrators-pane').classList.toggle('hidden',name!=='administrators');
  if(name==='administrators') renderAdministrators();
}
function deleteContact(contact){ if(confirm(`Deseja remover “${contact.name}”?`)){ contacts=contacts.filter(c=>c.id!==contact.id); saveContacts(); } }
function openContactForm(contact){
  const editing=Boolean(contact); $('#form-eyebrow').textContent=editing?'EDITAR CADASTRO':'NOVO CADASTRO'; $('#form-title').textContent=editing?'Atualizar contato':'Adicionar contato';
  $('#contact-id').value=contact?.id||''; $('#contact-name').value=contact?.name||''; $('#contact-role').value=contact?.role||''; $('#contact-phone').value=contact?.phone||'';
  $('#contact-category').value=normalizeCategoryName(contact?.category)||'Externos'; $('#contact-icon').value=contact?.icon||'phone'; $('#contact-order').value=contact?.order??0; openModal('form-modal'); setTimeout(()=>$('#contact-name').focus(),50);
}
function openSubcontactForm(parent,subcontact){
  const editing=Boolean(subcontact);
  $('#subcontact-form-eyebrow').textContent=editing?'EDITAR CONTATO INTERNO':'NOVO CONTATO INTERNO';
  $('#subcontact-form-title').textContent=editing?'Atualizar contato':'Adicionar contato ao tópico';
  $('#subcontact-parent-name').textContent=`Tópico: ${parent.name}`;
  $('#subcontact-parent-id').value=parent.id; $('#subcontact-id').value=subcontact?.id||'';
  $('#subcontact-name').value=subcontact?.name||''; $('#subcontact-role').value=subcontact?.role||''; $('#subcontact-phone').value=subcontact?.phone||'';
  openModal('subcontact-form-modal'); setTimeout(()=>$('#subcontact-name').focus(),50);
}
function deleteSubcontact(parent,subcontact){
  if(!confirm(`Excluir o contato “${subcontact.name}” de ${parent.name}?`))return;
  contacts=contacts.map(contact=>contact.id===parent.id?{...contact,subcontacts:contact.subcontacts.filter(item=>item.id!==subcontact.id)}:contact);
  saveContacts();
}
function openAdministratorLogin(action=null){
  pendingAdministratorAction=action; $('#admin-username').value=''; $('#admin-password').value=''; $('#login-error').classList.add('hidden');
  openModal('login-modal'); setTimeout(()=>$('#admin-username').focus(),50);
}
function requireAdministrator(action){ currentAdministrator?action():openAdministratorLogin(action); }
function openAdministratorPanel(){
  renderAdmin(); showAdminTab('contacts'); $('#admin-welcome').textContent=`Olá, ${currentAdministrator.name}. Gerencie contatos e permissões.`;
  $('#admin-panel').classList.remove('hidden'); document.body.style.overflow='hidden';
}

$('#search').addEventListener('input',renderDirectory);
$('#admin-open').addEventListener('click',()=>currentAdministrator?openAdministratorPanel():openAdministratorLogin());
$('#login-form').addEventListener('submit',event=>{
  event.preventDefault();
  const username=$('#admin-username').value.trim().toLocaleLowerCase('pt-BR');
  const password=$('#admin-password').value;
  currentAdministrator=administrators.find(item=>item.username.toLocaleLowerCase('pt-BR')===username&&item.password===password)||null;
  if(!currentAdministrator){ $('#login-error').classList.remove('hidden'); return; }
  closeModal('login-modal');
  if(pendingAdministratorAction){ const action=pendingAdministratorAction; pendingAdministratorAction=null; renderDirectory(); action(); }
  else openAdministratorPanel();
});
$('#admin-close').addEventListener('click',()=>{ currentAdministrator=null; $('#admin-panel').classList.add('hidden'); document.body.style.overflow=''; renderDirectory(); });
document.querySelectorAll('[data-admin-tab]').forEach(button=>button.addEventListener('click',()=>showAdminTab(button.dataset.adminTab)));
$('#new-contact').addEventListener('click',()=>openContactForm());
$('#administrator-form').addEventListener('submit',event=>{
  event.preventDefault();
  const name=$('#new-admin-name').value.trim();
  const username=$('#new-admin-username').value.trim().toLocaleLowerCase('pt-BR');
  const password=$('#new-admin-password').value;
  const error=$('#administrator-error');
  if(administrators.some(item=>item.username.toLocaleLowerCase('pt-BR')===username)){
    error.textContent='Este nome de usuário já está cadastrado.'; error.classList.remove('hidden'); return;
  }
  error.classList.add('hidden');
  administrators.push({id:Math.max(0,...administrators.map(item=>item.id))+1,name,username,password});
  saveAdministrators(); event.target.reset(); renderAdministrators();
});
$('#contact-form').addEventListener('submit',event=>{
  event.preventDefault(); const id=Number($('#contact-id').value); const previous=contacts.find(contact=>contact.id===id); const data={id:id||Math.max(0,...contacts.map(c=>c.id))+1,name:$('#contact-name').value.trim(),role:$('#contact-role').value.trim(),phone:$('#contact-phone').value.trim(),category:normalizeCategoryName($('#contact-category').value)||'Externos',icon:$('#contact-icon').value,order:Number($('#contact-order').value)||0,subcontacts:previous?.subcontacts||[]};
  contacts=id?contacts.map(c=>c.id===id?data:c):contacts.concat(data); closeModal('form-modal'); saveContacts();
});
$('#subcontact-form').addEventListener('submit',event=>{
  event.preventDefault(); const parentId=Number($('#subcontact-parent-id').value); const subcontactId=Number($('#subcontact-id').value);
  const data={id:subcontactId||0,name:$('#subcontact-name').value.trim(),role:$('#subcontact-role').value.trim(),phone:$('#subcontact-phone').value.trim()};
  contacts=contacts.map(contact=>{
    if(contact.id!==parentId)return contact;
    const nextId=subcontactId||Math.max(0,...contact.subcontacts.map(item=>item.id))+1; const saved={...data,id:nextId};
    return {...contact,subcontacts:subcontactId?contact.subcontacts.map(item=>item.id===subcontactId?saved:item):contact.subcontacts.concat(saved)};
  });
  openContacts.add(parentId); closeModal('subcontact-form-modal'); saveContacts();
});
document.addEventListener('click',event=>{ if(!event.target.closest('.subcontact-menu'))closeContactMenus(); const id=event.target.dataset.close; if(id){ if(id==='login-modal')pendingAdministratorAction=null; closeModal(id); } });
document.addEventListener('keydown',event=>{ if(event.key==='Escape'){ const open=document.querySelector('.modal:not(.hidden)'); if(open){ if(open.id==='login-modal')pendingAdministratorAction=null; closeModal(open.id); } } });
renderDirectory();
