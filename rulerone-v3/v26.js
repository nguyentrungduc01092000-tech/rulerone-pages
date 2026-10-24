'use strict';
/* Browser-only synthetic fixture. No network, persistence or submission APIs. */
const wfTabs=[...document.querySelectorAll('[data-step]')];
const wfPanel=document.querySelector('#wf-panel');
const wfNames=["Incoming email / PDF", "Structured extraction", "Validation", "Evidence / traceability", "Human approval", "Response / audit"];
let wfCurrent=0,wfReviewed=false;
function renderWorkflow(index,focus=false){
  wfCurrent=index;
  wfTabs.forEach((tab,n)=>{tab.setAttribute('aria-selected',String(n===index));tab.tabIndex=n===index?0:-1;});
  wfPanel.replaceChildren(document.querySelector('#wf-stage-'+index).content.cloneNode(true));
  wfPanel.setAttribute('aria-labelledby','wf-tab-'+index);
  document.querySelector('#wf-status').textContent=(index+1)+' of 6 · '+wfNames[index];
  document.querySelector('#wf-next').textContent=index===5?'Back to source ↺':'Next checkpoint →';
  if(index===4){
    const review=document.querySelector('#simulate-review');
    document.querySelector('#review-state').textContent=wfReviewed?'Simulated clarification review complete. No real approval created.':'No simulated review recorded yet.';
    review.addEventListener('click',()=>{wfReviewed=true;review.textContent='Simulated review complete';document.querySelector('#review-state').textContent='Clarification draft approved for inspection in this demo only. Quote remains on HOLD. Nothing sent or stored.';});
  }
  if(index===5){document.querySelector('#clarification-draft').hidden=!wfReviewed;document.querySelector('#draft-gate').textContent=wfReviewed?'Simulated review complete. Inspect the prepared text below.':'Complete the simulated human review to inspect the prepared draft.';}
  if(index===5){document.querySelector('#audit-review').textContent=wfReviewed?'Simulated reviewer approved a clarification draft for inspection. Quote remains on HOLD.':'Not simulated yet. Quote remains on HOLD.';document.querySelector('#audit-response').textContent=wfReviewed?'Prepared clarification draft available for inspection; nothing sent.':'Clarification draft awaits simulated review.';}
  if(focus)wfTabs[index].focus();
}
if(wfPanel){
  wfTabs.forEach((tab,index)=>{tab.addEventListener('click',()=>renderWorkflow(index));tab.addEventListener('keydown',event=>{let target; if(event.key==='ArrowRight'||event.key==='ArrowDown')target=(wfCurrent+1)%6;if(event.key==='ArrowLeft'||event.key==='ArrowUp')target=(wfCurrent+5)%6;if(event.key==='Home')target=0;if(event.key==='End')target=5;if(target!==undefined){event.preventDefault();renderWorkflow(target,true);}});});
  document.querySelector('#wf-next').addEventListener('click',()=>renderWorkflow((wfCurrent+1)%6,true));
  document.querySelector('#wf-reset').addEventListener('click',()=>{wfReviewed=false;renderWorkflow(0,true);});renderWorkflow(0);
}
const email='nguyentrungduc01092000@gmail.com';
document.querySelectorAll('[data-copy]').forEach(button=>button.addEventListener('click',async()=>{
  const card=button.closest('.inquiry-card');const value=button.dataset.copy==='email'?email:card.querySelector('.enquiry-template').textContent;const status=card.querySelector('.copy-feedback');
  try{await navigator.clipboard.writeText(value);status.textContent='Copied. Nothing has been sent.';}catch{status.textContent='Copy unavailable. Select the address or open the template below to copy manually.';card.querySelector('details').open=true;}
}));
const motion=document.querySelector('#universe-motion');if(motion){motion.textContent='Enable illustration motion';motion.setAttribute('aria-pressed','false');motion.addEventListener('click',()=>{const enabled=document.querySelector('.data-universe').classList.toggle('motion-enabled');motion.setAttribute('aria-pressed',String(enabled));motion.textContent=enabled?'Stop illustration motion':'Enable illustration motion';});}
