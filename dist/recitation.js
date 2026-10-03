'use strict';

// Vāgdhenu's public, quota-limited Gradio API. Only the selected Sanskrit verse
// is sent after a click. No keys, account tokens, or questions are transmitted.
const gitaRecitation = (() => {
  const host = 'https://prathoshap-vagdhenu-demo.hf.space';
  const api = host + '/gradio_api/call/synthesize';
  const cacheName = 'dharma-sanskrit-chant-v1';
  const bundled = {'2.47':'/assets/recitations/2.47.mp3'};
  let ref = null, phase = 'idle', message = '', player = null;
  let controller = null, objectUrl = null, generation = 0;
  const speaker = '<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M11 5 6 9H3v6h3l5 4V5Z"/><path d="M15 8a6 6 0 0 1 0 8m3-11a10 10 0 0 1 0 14"/></svg>';
  const pauseIcon = '<svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><rect x="6" y="4" width="4" height="16" rx="1"/><rect x="14" y="4" width="4" height="16" rx="1"/></svg>';
  function markup(){
    return `<button type="button" id="recite-shloka" class="recite-button" aria-pressed="false" aria-describedby="recitation-status" title="AI-generated Sanskrit chant · Vāgdhenu. New chants may take a minute; the public service allows up to 10 per day per network.">${speaker}<span class="recite-label">Recite</span><small>AI</small></button>`;
  }
  function statusMarkup(){
    return '<p id="recitation-status" class="recitation-status" role="status" aria-live="polite" hidden></p>';
  }
  function update(){
    const button = document.getElementById('recite-shloka');
    if (!button) return;
    const labels = {idle:'Recite',loading:'Cancel',playing:'Pause',paused:'Resume',ready:'Play',error:'Retry'};
    button.innerHTML = (phase==='playing'?pauseIcon:speaker)+`<span class="recite-label">${labels[phase]}</span><small>AI</small>`;
    button.dataset.phase = phase;
    button.setAttribute('aria-pressed',String(phase==='playing'));
    button.setAttribute('aria-label',phase==='loading'?'Cancel Sanskrit recitation preparation':`${labels[phase]} Sanskrit shloka ${state.ref}`);
    const status = document.getElementById('recitation-status');
    if (status) {
      status.hidden = !message;
      status.textContent = message;
      if (message) {
        const credit = document.createElement('a');
        credit.href = 'https://huggingface.co/prathoshap/vagdhenu';
        credit.target = '_blank'; credit.rel = 'noopener noreferrer';
        credit.textContent = 'Vāgdhenu · AI chant';
        status.append(' ',credit);
      }
    }
  }
  function stop(){
    generation++;
    controller?.abort(); controller=null;
    if (player) {player.onended=null;player.onerror=null;player.pause();player.removeAttribute('src');player.load();player=null;}
    if (objectUrl) {URL.revokeObjectURL(objectUrl);objectUrl=null;}
    ref=null;phase='idle';message='';update();
  }
  function sync(){
    if (state.page!=='reader'||(ref&&ref!==state.ref)) stop();
    const button=document.getElementById('recite-shloka');
    if (button) {button.onclick=toggle;update();}
  }
  function verseForSpeech(text){
    // Preserve the full verse and speaker introduction, omitting reference digits.
    return text.replace(/[0-9०-९]+[.।][0-9०-९]+/g,'').replace(/।{2,}/g,'॥').replace(/॥{2,}/g,'॥').replace(/\n\s*\n/g,'\n').trim();
  }
  async function cacheKey(verse){
    // Include the exact prepared text: later corpus corrections cannot replay stale audio.
    const bytes=new TextEncoder().encode(verseForSpeech(verse.sanskrit));
    const hash=Array.from(new Uint8Array(await crypto.subtle.digest('SHA-256',bytes)),b=>b.toString(16).padStart(2,'0')).join('');
    return new URL(`/__chant_cache__/${verse.ref}/${hash}`,location.href).href;
  }
  async function getCached(verse){
    try {if ('caches' in window) return await (await caches.open(cacheName)).match(await cacheKey(verse));} catch {}
    return null;
  }
  async function saveCached(verse,blob){
    try {
      if (!('caches' in window)) return;
      const cache=await caches.open(cacheName);
      await cache.put(await cacheKey(verse),new Response(blob,{headers:{'Content-Type':blob.type||'audio/wav'}}));
      const keys=await cache.keys();
      for (const key of keys.slice(0,Math.max(0,keys.length-20))) await cache.delete(key);
    } catch {} // Private browsing/storage limits never prevent playback.
  }
  function serviceError(value){
    const detail=typeof value==='string'?value:JSON.stringify(value||'');
    if (/limit|quota|exceed|rate|GPU.*duration/i.test(detail)) return new Error('The chant service’s daily allowance is currently used up. Cached verses can still play; try a new chant tomorrow.');
    return new Error('The AI chant service is unavailable right now. Please try again later.');
  }
  async function generatedAudio(verse,signal){
    const response=await fetch(api,{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify({data:[verseForSpeech(verse.sanskrit),'__auto__',60]}),signal,credentials:'omit'});
    if (!response.ok) throw serviceError(response.status===429?'quota':await response.text());
    const {event_id}=await response.json();
    if (typeof event_id!=='string'||!/^[a-z0-9-]+$/i.test(event_id)) throw serviceError('Invalid event');
    const stream=await fetch(`${api}/${encodeURIComponent(event_id)}`,{signal,credentials:'omit'});
    if (!stream.ok||!stream.body) throw serviceError(stream.status===429?'quota':'Unavailable');
    const reader=stream.body.getReader(),decoder=new TextDecoder();
    let buffer='';
    try {
      while (true) {
        const {value,done}=await reader.read();
        buffer+=(done?decoder.decode():decoder.decode(value,{stream:true})).replace(/\r/g,'');
        let end;
        while ((end=buffer.indexOf('\n\n'))!==-1) {
          const block=buffer.slice(0,end);buffer=buffer.slice(end+2);
          const event=block.split('\n').find(line=>line.startsWith('event:'))?.slice(6).trim();
          const data=block.split('\n').filter(line=>line.startsWith('data:')).map(line=>line.slice(5).trimStart()).join('\n');
          if (event==='error') throw serviceError(data);
          if (event==='complete') {
            let result;try {result=JSON.parse(data);} catch {throw serviceError('Invalid result');}
            const file=result?.[0]?.url;
            if (typeof file!=='string') throw serviceError(result);
            const url=new URL(file);
            if (url.origin!==host||!url.pathname.startsWith('/gradio_api/file=')) throw serviceError('Unexpected audio host');
            const audioResponse=await fetch(url.href,{signal,credentials:'omit'});
            if (!audioResponse.ok) throw serviceError('Audio unavailable');
            const blob=await audioResponse.blob();
            if (blob.size<100||blob.size>20*1024*1024) throw serviceError('Invalid audio');
            return new Blob([blob],{type:'audio/wav'});
          }
        }
        if (done) throw serviceError('Stream ended');
      }
    } finally {await reader.cancel().catch(()=>{});reader.releaseLock();}
  }
  async function play(token){
    try {
      await player.play();
      if (token!==generation) return;
      phase='playing';message='Sanskrit recitation · AI-generated audio.';update();
    } catch (error) {
      if (token!==generation) return;
      if (error.name==='NotAllowedError') {phase='ready';message='Your chant is ready. Tap Play to listen.';}
      else {phase='error';message='Audio could not play. Please tap Retry.';}
      update();
    }
  }
  async function toggle(){
    if (state.page!=='reader'||!byRef[state.ref]) return;
    if (phase==='loading') {stop();return;}
    if (ref===state.ref&&player&&['playing','paused','ready'].includes(phase)) {
      if (phase==='playing') {player.pause();phase='paused';message='Recitation paused.';update();}
      else {if (player.ended) player.currentTime=0;await play(generation);}
      return;
    }
    stop();ref=state.ref;const verse=byRef[ref],token=generation;
    controller=new AbortController();const request=controller;
    phase='loading';message='Preparing the Sanskrit chant. A new verse can take 30–60 seconds. Tap Cancel to stop waiting.';update();
    const timeout=setTimeout(()=>request.abort(),120000);
    try {
      let blob;
      const cached=await getCached(verse);
      if (token!==generation) return;
      if (cached) blob=await cached.blob();
      else if (bundled[verse.ref]) {
        const response=await fetch(bundled[verse.ref],{signal:request.signal});
        if (!response.ok) throw new Error('The recitation file could not be loaded. Please tap Retry.');
        blob=await response.blob();
      } else blob=await generatedAudio(verse,request.signal);
      if (token!==generation) return;
      if (!cached) void saveCached(verse,blob);
      objectUrl=URL.createObjectURL(blob);player=new Audio(objectUrl);player.preload='auto';
      player.onended=()=>{if(token===generation){phase='ready';message='Recitation complete. Tap Play to listen again.';update();}};
      player.onerror=()=>{if(token===generation){phase='error';message='Audio could not play. Please tap Retry.';update();}};
      await play(token);
    } catch (error) {
      if (token!==generation) return;
      phase='error';message=error.name==='AbortError'?'The chant took too long to prepare. Please try again later.':(error.message?.startsWith('The ')?error.message:'The AI chant service could not be reached. Please check your connection and try again.');update();
    } finally {clearTimeout(timeout);if(token===generation) controller=null;}
  }
  window.addEventListener('pagehide',stop);
  return {markup,statusMarkup,sync};
})();
