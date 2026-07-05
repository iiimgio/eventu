const endpoints = ['/eventi/getAll','/artisti','/organizzatori','/candidature'];
const base = 'https://eventu-backend-dvaq.onrender.com';

(async ()=>{
  for(const p of endpoints){
    try{
      const res = await fetch(base + p, { method: 'GET' });
      const txt = await res.text();
      console.log(p, res.status);
      console.log(txt.slice(0,800));
      console.log('---');
    }catch(e){
      console.error(p, 'ERROR', e.message);
    }
  }
})();
