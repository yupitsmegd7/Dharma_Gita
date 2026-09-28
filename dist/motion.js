'use strict';
// Animate a single transparent artwork as separately arriving radial segments.
function chakraEmblem(position){
  const pieces=Array.from({length:24},(_,i)=>{const angle=(i*15-90)*Math.PI/180,end=((i+1)*15-90)*Math.PI/180,mid=(angle+end)/2;return `<span class="chakra-piece" style="--piece:${i};--drift-x:${(Math.cos(mid)*27).toFixed(2)}px;--drift-y:${(Math.sin(mid)*27).toFixed(2)}px;clip-path:polygon(50% 50%,${(50+80*Math.cos(angle)).toFixed(3)}% ${(50+80*Math.sin(angle)).toFixed(3)}%,${(50+80*Math.cos(end)).toFixed(3)}% ${(50+80*Math.sin(end)).toFixed(3)}%)"></span>`;}).join('');
  return `<span class="chakra-emblem chakra-${position}" role="img" aria-label="Animated Sudarshan Chakra"><span class="chakra-rotor" aria-hidden="true">${pieces}<span class="chakra-core"></span></span></span>`;
}
function capturePageTurn(selector){
  if(window.matchMedia?.('(prefers-reduced-motion: reduce)').matches)return null;
  const node=document.querySelector(selector);if(!node||!node.getBoundingClientRect)return null;
  const box=node.getBoundingClientRect();if(!box.width||!box.height)return null;
  return {node:node.cloneNode(true),height:box.height,focusId:document.activeElement?.id};
}
function finishPageTurn(snapshot,selector,direction){
  if(!snapshot)return;
  const next=document.querySelector(selector),paper=next?.closest('.verse-paper');if(!next||!paper)return;
  const sheet=snapshot.node;sheet.classList.remove('verse-turn-reveal','verse-turn-sheet','turn-back','turn-forward');sheet.removeAttribute('id');sheet.querySelectorAll('[id]').forEach(n=>n.removeAttribute('id'));
  sheet.querySelectorAll('button,a,input,select,textarea,summary,[tabindex]').forEach(n=>n.setAttribute('tabindex','-1'));
  sheet.setAttribute('aria-hidden','true');sheet.setAttribute('inert','');
  sheet.classList.add('verse-turn-sheet',direction<0?'turn-back':'turn-forward');
  sheet.style.top=next.offsetTop+'px';sheet.style.left=next.offsetLeft+'px';sheet.style.width=next.offsetWidth+'px';sheet.style.height=snapshot.height+'px';
  paper.classList.add('page-turning');paper.appendChild(sheet);
  next.classList.add('verse-turn-reveal');
  const clean=()=>{sheet.remove();next.classList.remove('verse-turn-reveal');paper.classList.remove('page-turning')};
  sheet.addEventListener('animationend',clean,{once:true});setTimeout(clean,650);
  if(snapshot.focusId)document.getElementById(snapshot.focusId)?.focus({preventScroll:true});
}
function handleReadingArrows(e){
  if(!['ArrowLeft','ArrowRight'].includes(e.key)||e.defaultPrevented||e.altKey||e.ctrlKey||e.metaKey||e.shiftKey||e.repeat)return;
  if(e.target?.closest?.('input,textarea,select,[contenteditable]:not([contenteditable="false"]),[role="slider"],[role="textbox"]'))return;
  if(document.querySelector('#side.is-open'))return;
  const direction=e.key==='ArrowRight'?1:-1;
  if(state.page==='reader'&&verses.length){e.preventDefault();nextVerse(direction)}
  else if(state.page==='mantras'){const found=matchingMantras(),i=found.findIndex(m=>m.id===mantraState.selected),next=found[i+direction];if(next){e.preventDefault();selectMantra(next.id,false)}}
}
