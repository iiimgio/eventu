const base = 'https://eventu-backend-dvaq.onrender.com';

(async ()=>{
  try{
    const listRes = await fetch(base + '/artisti');
    const arr = await listRes.json();
    console.log('Found', arr.length, 'artists');
    for(const a of arr){
      try{
        const del = await fetch(base + '/artisti/' + a.id, { method: 'DELETE' });
        console.log('DELETE', a.id, del.status);
      }catch(e){
        console.error('DELETE error', a.id, e.message);
      }
    }
  }catch(e){
    console.error('List error', e.message);
  }
})();
