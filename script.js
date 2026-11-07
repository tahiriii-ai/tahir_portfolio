(function(){
'use strict';
var $=function(s,c){return (c||document).querySelector(s)},$$=function(s,c){return [].slice.call((c||document).querySelectorAll(s))};
var reduce=window.matchMedia&&matchMedia('(prefers-reduced-motion: reduce)').matches;

/* ---- mobile menu + services dropdown ---- */
var t=$('#navToggle'),l=$('#navLinks');
if(t&&l){
  var close=function(){l.classList.remove('open');t.setAttribute('aria-expanded','false');t.setAttribute('aria-label','Open menu');document.body.style.overflow=''};
  t.addEventListener('click',function(){var o=l.classList.toggle('open');t.setAttribute('aria-expanded',o);t.setAttribute('aria-label',o?'Close menu':'Open menu');document.body.style.overflow=o?'hidden':''});
  l.addEventListener('click',function(e){if(e.target.closest('a'))close()});
  window.addEventListener('resize',function(){if(innerWidth>960)close()});
}
var dd=$('.has-dd'),ddb=$('.dd-toggle');
if(dd&&ddb){
  ddb.addEventListener('click',function(){var o=dd.classList.toggle('open');ddb.setAttribute('aria-expanded',o)});
  document.addEventListener('click',function(e){if(!dd.contains(e.target)){dd.classList.remove('open');ddb.setAttribute('aria-expanded','false')}});
}
document.addEventListener('keydown',function(e){
  if(e.key==='Escape'){
    if(dd&&dd.classList.contains('open')){dd.classList.remove('open');ddb.setAttribute('aria-expanded','false');ddb.focus()}
    if(l&&l.classList.contains('open')){l.classList.remove('open');t.setAttribute('aria-expanded','false');document.body.style.overflow='';t.focus()}
  }
});

/* ---- process: tabs on desktop, vertical list on mobile ---- */
var proc=$('#proc');
if(proc&&window.matchMedia){
  var heads=$$('.proc-head',proc),bodies=$$('.proc-body',proc),mq=matchMedia('(min-width:960px)'),cur=0,tabs=false;
  var sel=function(i,focus){
    cur=i;
    heads.forEach(function(h,j){h.setAttribute('aria-selected',j===i?'true':'false');h.tabIndex=j===i?0:-1;h.classList.toggle('done',j<=i)});
    bodies.forEach(function(b,j){b.classList.toggle('on',j===i);b.hidden=j!==i});
    if(focus)heads[i].focus();
  };
  var onKey=function(e){
    var i=heads.indexOf(e.currentTarget),k=e.key,n=k==='ArrowRight'?(i+1)%heads.length:k==='ArrowLeft'?(i+heads.length-1)%heads.length:k==='Home'?0:k==='End'?heads.length-1:-1;
    if(n>-1){e.preventDefault();sel(n,true)}
    if(k==='Enter'||k===' '){e.preventDefault();sel(i)}
  };
  var onClick=function(e){sel(heads.indexOf(e.currentTarget))};
  var enable=function(){
    if(tabs)return;tabs=true;proc.classList.add('is-tabs');proc.setAttribute('role','tablist');proc.setAttribute('aria-label','Development stages');
    $$('li',proc).forEach(function(li){li.setAttribute('role','presentation')});
    heads.forEach(function(h,i){h.setAttribute('role','tab');h.id='ph'+i;h.setAttribute('aria-controls','pb'+i);h.addEventListener('click',onClick);h.addEventListener('keydown',onKey)});
    bodies.forEach(function(b,i){b.setAttribute('role','tabpanel');b.id='pb'+i;b.setAttribute('aria-labelledby','ph'+i)});
    sel(cur);
  };
  var disable=function(){
    if(!tabs)return;tabs=false;proc.classList.remove('is-tabs');['role','aria-label'].forEach(function(a){proc.removeAttribute(a)});
    $$('li',proc).forEach(function(li){li.removeAttribute('role')});
    heads.forEach(function(h){['role','id','aria-controls','aria-selected','tabindex'].forEach(function(a){h.removeAttribute(a)});h.classList.remove('done');h.removeEventListener('click',onClick);h.removeEventListener('keydown',onKey)});
    bodies.forEach(function(b){['role','id','aria-labelledby'].forEach(function(a){b.removeAttribute(a)});b.hidden=false;b.classList.remove('on')});
  };
  var apply=function(){mq.matches?enable():disable()};
  apply();(mq.addEventListener?mq.addEventListener('change',apply):mq.addListener(apply));
}

/* ---- project filters ---- */
var fl=$$('.flt'),cards=$$('#pgrid .pcard'),fc=$('#fcount');
if(fl.length){
  fl.forEach(function(b){
    b.addEventListener('click',function(){
      var k=b.dataset.f,n=0;
      fl.forEach(function(x){x.setAttribute('aria-pressed',x===b?'true':'false')});
      cards.forEach(function(c){var ok=k==='all'||(' '+c.dataset.tags+' ').indexOf(' '+k+' ')>-1;c.hidden=!ok;if(ok)n++});
      if(fc)fc.textContent=k==='all'?'Showing all '+n+' projects':'Showing '+n+' of '+cards.length+' projects in '+b.textContent;
    });
  });
  var h=location.hash.replace('#','');if(h){var hb=fl.filter(function(x){return x.dataset.f===h})[0];if(hb)hb.click()}
}

/* ---- lightbox ---- */
var dlg=null;
var openLb=function(src,alt,opener){
  if(!dlg){
    dlg=document.createElement('dialog');dlg.className='lb';dlg.setAttribute('aria-label','Enlarged image');
    dlg.innerHTML='<div class="lb-in"><button type="button" aria-label="Close enlarged image">&times;</button><img alt=""><p></p></div>';
    document.body.appendChild(dlg);
    $('button',dlg).addEventListener('click',function(){dlg.close()});
    dlg.addEventListener('click',function(e){if(e.target===dlg||e.target.classList.contains('lb-in'))dlg.close()});
    dlg.addEventListener('close',function(){if(dlg._op)dlg._op.focus()});
  }
  dlg._op=opener;var im=$('img',dlg);im.src=src;im.alt=alt;$('p',dlg).textContent=alt;
  if(dlg.showModal)dlg.showModal();else dlg.setAttribute('open','');
};
$$('.shot img,.shot a').forEach(function(el){
  var im=el.tagName==='IMG'?el:$('img',el);if(!im||el.tagName==='A')return;
  var a=im.closest('a');
  im.tabIndex=0;im.setAttribute('role','button');im.setAttribute('aria-label','Enlarge image: '+im.alt);
  var go=function(e){e.preventDefault();openLb(a&&a.href?a.href:im.currentSrc||im.src,im.alt,im)};
  im.addEventListener('click',go);
  im.addEventListener('keydown',function(e){if(e.key==='Enter'||e.key===' ')go(e)});
});

/* ---- scroll reveal ---- */
if(!reduce&&'IntersectionObserver' in window){
  document.documentElement.classList.add('rv-on');
  var io=new IntersectionObserver(function(es){es.forEach(function(e){if(e.isIntersecting){e.target.classList.add('in');io.unobserve(e.target)}})},{threshold:.08,rootMargin:'0px 0px -5% 0px'});
  $$('.sec-head,.svc-card,.pcard,.why-grid li,.tech-grid>div,.review,.pkg,.about-split>*,.cta-in,.chapter,.sv-steps li,.inc,.ev-card,.idx-card,.stats li,.scope,.cred-grid li').forEach(function(el,i){
    var r=el.getBoundingClientRect();
    if(r.top<innerHeight*.92&&r.bottom>0)return; /* already on screen: leave visible */
    el.classList.add('rv');el.style.transitionDelay=(i%3)*70+'ms';io.observe(el);
  });
}

/* ---- floating CTA hides over the contact section ---- */
var fab=$('.fab'),cs=$('#inquiry')||$('.cta-band');
if(fab&&cs&&'IntersectionObserver' in window){new IntersectionObserver(function(es){fab.classList.toggle('off',es[0].isIntersecting)},{threshold:.15}).observe(cs)}

/* ---- inquiry form ---- */
var f=$('#contactForm');
if(f){
  var q=new URLSearchParams(location.search).get('type');
  if(q){var ts=f.elements.type;[].forEach.call(ts.options,function(o){if(o.value===q||o.text===q)ts.value=o.value})}
  var busy=false,s=$('#formStatus'),btn=$('#sendBtn');
  var val=function(id){var e=f.elements[id];return e&&e.value?e.value.trim():''};
  var radio=function(n){var c=f.querySelector('input[name="'+n+'"]:checked');return c?c.value:''};
  var conn=function(){return $$('input[name="connectivity"]:checked',f).map(function(c){return c.value}).join(', ')};
  var setErr=function(id,msg){
    var e=f.elements[id],m=document.getElementById(id+'-err');if(!e||!m)return;
    if(msg){m.textContent=msg;m.hidden=false;e.setAttribute('aria-invalid','true')}else{m.hidden=true;e.removeAttribute('aria-invalid')}
  };
  var check=function(){
    var bad=[],r=function(id,msg,ok){var g=ok===undefined?val(id)!=='':ok;setErr(id,g?'':msg);if(!g)bad.push(id)};
    r('name','Please enter your name.');
    r('email','Please enter a valid email address.',/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(val('email')));
    r('type','Please choose a project category.');
    r('message','Please describe your product idea in a sentence or two.');
    var u=val('link');r('link','Please enter a full link starting with https://',u===''||/^https?:\/\/\S+$/.test(u));
    return bad;
  };
  ['name','email','type','message','link'].forEach(function(id){var e=f.elements[id];e.addEventListener('input',function(){if(e.getAttribute('aria-invalid'))setErr(id,'')});e.addEventListener('change',function(){if(e.getAttribute('aria-invalid'))setErr(id,'')})});
  var status=function(cls,h,alert){s.className='note '+cls;s.setAttribute('role',alert?'alert':'status');s.innerHTML=h};
  var rows=function(){
    return [['Project title',val('title')],['Category',val('type')],['Company',val('company')],['Required functionality',val('functionality')],['Preferred microcontroller',val('mcu')],['Sensors and components',val('parts')],['Connectivity',conn()],['Power',val('power')],['Prototype exists',radio('prototype')],['PCB design required',radio('pcb')],['Enclosure design required',radio('enclosure')],['Budget',val('budget')],['Timeline',val('timeline')],['Files / references',val('link')]];
  };
  var mailto=function(){
    var body=val('message')+'\n\n'+rows().filter(function(r){return r[1]}).map(function(r){return r[0]+': '+r[1]}).join('\n')+'\n\n- '+val('name')+' ('+val('email')+')';
    return 'mailto:tahiraliaiml@gmail.com?subject='+encodeURIComponent('Project inquiry: '+(val('title')||val('type'))+' - '+val('name'))+'&body='+encodeURIComponent(body);
  };
  var fail=function(){
    status('bad','Your message could not be sent. Nothing was lost: your details are still in the form. Please <a href="'+mailto()+'">open it in your email app</a>, write to <a href="mailto:tahiraliaiml@gmail.com">tahiraliaiml@gmail.com</a>, or message me on <a href="https://wa.me/923049037412" target="_blank" rel="noopener">WhatsApp</a>.',true);
  };
  f.addEventListener('submit',function(e){
    e.preventDefault();
    if(busy||val('_honey'))return;
    var bad=check();
    if(bad.length){status('bad','Please fix the highlighted fields and send again.',true);f.elements[bad[0]].focus();return}
    busy=true;btn.disabled=true;btn.textContent='Sending...';f.setAttribute('aria-busy','true');status('','Sending your inquiry...',false);
    var p={name:val('name'),email:val('email'),message:val('message'),_subject:'New project inquiry: '+(val('title')||val('type'))+' from '+val('name'),_cc:'tahiralielectrical@gmail.com',_template:'table',_captcha:'false',_honey:''};
    rows().forEach(function(r){p[r[0]]=r[1]||'(not given)'});
    var ctl=window.AbortController?new AbortController():null,to=setTimeout(function(){if(ctl)ctl.abort()},15000);
    fetch('https://formsubmit.co/ajax/tahiraliaiml@gmail.com',{method:'POST',headers:{'Content-Type':'application/json','Accept':'application/json'},body:JSON.stringify(p),signal:ctl?ctl.signal:undefined})
      .then(function(r){return r.json()})
      .then(function(d){
        if(d&&(d.success===true||d.success==='true')){var n=val('name').replace(/[<>&"]/g,'');f.reset();status('good','Thank you, '+n+'. Your inquiry was sent. I usually reply within a day.',false)}
        else fail();
      })
      .catch(fail)
      .finally(function(){clearTimeout(to);busy=false;btn.disabled=false;btn.textContent='Send Project Inquiry';f.removeAttribute('aria-busy')});
  });
}
})();
