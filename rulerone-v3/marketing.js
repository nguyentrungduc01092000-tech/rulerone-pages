'use strict';
const interest=document.getElementById('product-interest');
if(interest){
 const names={'ai-operations':'AI Operations','revenue-firewall':'Revenue Firewall',labs:'Labs'};
 const contexts={'ai-operations':'Explore the synthetic RFQ demo. A real pilot needs a separately agreed scope.','revenue-firewall':'Revenue Firewall is a concept under evaluation, not a released product.',labs:'Labs contains ideas and experiments, with no released applications announced.'};
 const requested=new URLSearchParams(location.search).get('product');if(requested&&Object.hasOwn(names,requested))interest.value=requested;
 const update=()=>{const name=names[interest.value]||'Not sure yet';const text=`Hello RULERONE team,\n\nProduct / project: ${name}\nTeam / role:\nWorkflow challenge:\n\nI would like to discuss the fit and current availability.`;
 document.getElementById('product-context').textContent=contexts[interest.value]||'Describe your workflow and the decision you want to improve.';
 document.getElementById('product-email').href=`mailto:nguyentrungduc01092000@gmail.com?subject=${encodeURIComponent('RULERONE — '+name+' discussion')}&body=${encodeURIComponent(text)}`;
 document.querySelector('.enquiry-template').textContent=text;};interest.addEventListener('change',update);update();
}
// Copying and draft preparation stay in the browser; no enquiry is submitted.
document.querySelectorAll('.mp-contact-card [data-copy]').forEach(button=>button.addEventListener('click',async()=>{const card=button.closest('.inquiry-card');const text=button.dataset.copy==='email'?'nguyentrungduc01092000@gmail.com':card.querySelector('.enquiry-template').textContent;try{await navigator.clipboard.writeText(text);card.querySelector('.copy-feedback').textContent='Copied. Ready to paste into your email.';}catch{card.querySelector('.copy-feedback').textContent='Select the address or template to copy it manually.';card.querySelector('details').open=true;}}));
