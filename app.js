// ── STATE & UTILS ─────────────────────────────────────────────────────────────
const LS='dbh26_v4_sumut';
let state=[];
const clone=x=>JSON.parse(JSON.stringify(x));
const parseRp=v=>{if(!v&&v!==0)return 0;if(typeof v==='number')return Math.round(v);return parseInt(String(v).replace(/[^0-9]/g,''))||0;};
const fmt=n=>'Rp '+Math.round(n||0).toLocaleString('id-ID');
const fmtI=n=>n>0?Math.round(n).toLocaleString('id-ID'):'';
const excelToDate=s=>{if(!s||typeof s!=='number')return'';return new Date((s-25569)*86400000).toISOString().split('T')[0];};
const dateToExcel=s=>{if(!s)return'';return Math.round(new Date(s).getTime()/86400000)+25569;};

function getY26(r){return r.years.find(y=>y.yr===2026)||r.years[r.years.length-1]||{val:0};}
function calcTotal(r){return r.murni?getY26(r).val:r.years.reduce((s,y)=>s+y.val,0);}
function calcJalan(r){return r.g>0?Math.round(calcTotal(r)*r.g/100):0;}

async function loadState(){
  // Coba load dari Firestore
  try{
    const snap=await DOC_REF.get();
    if(snap.exists){
      state=snap.data().state;
      localStorage.setItem(LS,JSON.stringify(state)); // cache lokal
      return;
    }
  }catch(e){console.warn('Firestore unavailable, using local cache',e);}
  // Fallback ke localStorage / MASTER
  try{const s=localStorage.getItem(LS);state=s?JSON.parse(s):clone(MASTER);}catch(e){state=clone(MASTER);}
}

async function saveAll(){
  try{
    await DOC_REF.set({state,updatedAt:firebase.firestore.FieldValue.serverTimestamp()});
    localStorage.setItem(LS,JSON.stringify(state));
    toast('✅ Tersimpan ke Firebase');
  }catch(e){
    localStorage.setItem(LS,JSON.stringify(state));
    toast('⚠️ Firebase error — tersimpan lokal');
  }
}

async function resetAll(){
  if(!confirm('Reset semua ke data asli?'))return;
  state=clone(MASTER);
  localStorage.removeItem(LS);
  try{
    await DOC_REF.set({state,updatedAt:firebase.firestore.FieldValue.serverTimestamp()});
    toast('↺ Direset ke data awal');
  }catch(e){toast('↺ Direset (lokal)');}
  renderTable();updateCards();
}

// ── TOAST ─────────────────────────────────────────────────────────────────────
function toast(msg){const t=document.getElementById('toast');t.textContent=msg;t.style.opacity='1';clearTimeout(t._t);t._t=setTimeout(()=>t.style.opacity='0',2600);}

// ── COUNT-UP ──────────────────────────────────────────────────────────────────
function countUp(id,target){const el=document.getElementById(id);if(!el)return;const d=900,t0=performance.now();(function f(now){const p=Math.min((now-t0)/d,1),v=Math.round(target*(1-Math.pow(1-p,3)));el.textContent='Rp '+v.toLocaleString('id-ID');if(p<1)requestAnimationFrame(f);})(t0);}

// ── CARDS ─────────────────────────────────────────────────────────────────────
function updateCards(){
  const data=filtered();
  const sumD=data.reduce((s,r)=>s+(getY26(r).val||0),0);
  const sumSilpa=data.reduce((s,r)=>s+r.years.filter(y=>y.yr<2026).reduce((a,y)=>a+y.val,0),0);
  countUp('cv1',sumD); countUp('cv2',sumSilpa);
  countUp('cv3',data.reduce((s,r)=>s+calcTotal(r),0));
  countUp('cv4',data.reduce((s,r)=>s+calcJalan(r),0));
  const dok=data.length?Math.round(data.reduce((s,r)=>s+r.dok.reduce((a,b)=>a+b,0),0)/(data.length*6)*100):0;
  document.getElementById('cv5').textContent=dok+'%';
  document.getElementById('cs1').textContent=data.length+' daerah';
  document.getElementById('cs5').textContent=(data.length*6)+' total item';
}

// ── FILTER ────────────────────────────────────────────────────────────────────
function filtered(){const q=document.getElementById('srch').value.toLowerCase().trim();return q?state.filter(r=>r.nama.toLowerCase().includes(q)):state;}

// ── RENDER TABLE ──────────────────────────────────────────────────────────────

function renderTable(){
  const tb=document.getElementById('tblBody'); tb.innerHTML='';
  const data=filtered();
  const info=data.length+' dari '+state.length+' daerah';
  document.getElementById('tblInfo').textContent=info;
  document.getElementById('tblInfo2').textContent=info;

  data.forEach((r,idx)=>{
    const ri=state.indexOf(r);
    const nY=r.years.length||1;
    const tot=calcTotal(r),jln=calcJalan(r),M=r.murni;

    r.years.forEach((y,yi)=>{
      const tr=document.createElement('tr');
      tr.className='yr-row'+(yi===nY-1?' yr-last':'');
      tr.dataset.ri=ri; tr.dataset.yi=yi;
      const col=yrColor(y.yr);
      const lbl=y.yr===2026?'Alokasi DBH '+y.yr:(y.yr>2026?'Rencana '+y.yr:'SILPA '+y.yr);

      let h='';
      if(yi===0){
        h+=`<td class="c-no" rowspan="${nY}">
  <div class="no-wrap">
    <span class="no-num">${r.no||idx+1}</span>
    <button class="del-btn" onclick="delRow(${ri})" title="Hapus daerah">✕</button>
  </div>
</td>
<td class="c-daerah" rowspan="${nY}">
  <input list="dl${ri}" class="daerah-inp" value="${(r.nama||'').replace(/"/g,'&quot;')}" oninput="onNama(${ri},this.value)" placeholder="Nama daerah…">
  <datalist id="dl${ri}">${DAERAH_SUMUT.map(d=>`<option value="${d}">`).join('')}</datalist>
  <button class="add-yr-btn" onclick="addYear(${ri})">＋ Tahun</button>
</td>`;
      }

      h+=`<td class="c-yr" style="background:${col}12">
  <input class="yr-inp" type="number" value="${y.yr}" style="background:${col}" onchange="onYrChange(${ri},${yi},this.value)">
  ${nY>1?`<button class="yr-del" onclick="delYear(${ri},${yi})">✕ hapus</button>`:''}
</td>
<td class="c-val" style="background:${col}08">
  <span class="f-lbl">${lbl}</span>
  <input class="inp inp-r" value="${fmtI(y.val)}" placeholder="0" onchange="onYrVal(${ri},${yi},this.value)">
</td>
<td class="c-ruas" style="background:${col}06">
  <span class="f-lbl">${y.yr>=2026?'Rencana Ruas':'Nama Ruas'}</span>
  <textarea class="ta ta-ruas" placeholder="Nama ruas jalan…" onchange="onYrRuas(${ri},${yi},this.value)">${(y.ruas||'').replace(/</g,'&lt;')}</textarea>
</td>`;

      if(yi===0){
        h+=`<td class="c-sts" rowspan="${nY}">
  <div class="sts-inner">
    <div>
      <label class="tog-wrap" title="Murni: hanya Alokasi 2026">
        <input type="checkbox" class="ti" ${M?'checked':''} onchange="onMurni(${ri},this.checked)">
        <div class="tog"></div>
      </label>
      <span id="badge${ri}" class="${M?'badge-m':'badge-g'}">${M?'Murni 2026':'Gabungan'}</span>
    </div>
    <div class="div-line"></div>
    <div>
      <span class="f-lbl">Total Alokasi</span>
      <div class="tot-val" id="tot${ri}">${fmt(tot)}</div>
    </div>
    <div>
      <span class="f-lbl">% Jalan</span>
      <div class="pct-row">
        <input class="inp inp-pct" type="number" min="0" max="100" step=".01" value="${r.g||''}" placeholder="0" onchange="onPct(${ri},this.value)">
        <span style="font-size:.7rem;color:var(--gr5)">%</span>
      </div>
      <div class="pct-warn${r.g>85?' show':''}" id="pctWarn${ri}">⚠ Melebihi 85%!</div>
    </div>
    <div>
      <span class="f-lbl">Alokasi Jalan</span>
      <div class="jln-val" id="jln${ri}">${fmt(jln)}</div>
    </div>
  </div>
</td>
<td class="c-cat" rowspan="${nY}">
  <span class="f-lbl">Catatan PFID</span>
  <textarea class="ta ta-cat" placeholder="Catatan PFID…" onchange="onCat(${ri},this.value)">${(r.cat||'').replace(/</g,'&lt;')}</textarea>
  <span class="f-lbl" style="margin-top:6px">Tgl Bahas Ruas</span>
  <input class="inp" type="date" value="${r.tglRuas||''}" onchange="onField(${ri},'tglRuas',this.value)">
</td>
<td class="c-rkp" rowspan="${nY}">
  <span class="f-lbl">Catatan Pembahasan</span>
  <textarea class="ta ta-cat" placeholder="Catatan pembahasan…" onchange="onField(${ri},'catRkp',this.value)">${(r.catRkp||'').replace(/</g,'&lt;')}</textarea>
  <span class="f-lbl" style="margin-top:6px">Tgl Bahas RKP</span>
  <input class="inp" type="date" value="${r.tglRkp||''}" onchange="onField(${ri},'tglRkp',this.value)">
</td>
<td class="c-dok" rowspan="${nY}">
  <div class="dok-list">${DOK_LABELS.map((lb,di)=>`<div class="dok-i"><input type="checkbox" id="dk${ri}_${di}" ${r.dok[di]?'checked':''} onchange="onDok(${ri},${di},this.checked)"><label for="dk${ri}_${di}">${lb}</label></div>`).join('')}</div>
</td>`;
      }

      tr.innerHTML=h;
      tb.appendChild(tr);
    });
  });

  // Total row
  const totTr=document.createElement('tr'); totTr.className='tr-tot';
  const gTot=state.reduce((s,r)=>s+calcTotal(r),0);
  const gJln=state.reduce((s,r)=>s+calcJalan(r),0);
  totTr.innerHTML=`<td colspan="2">TOTAL (${state.length} daerah)</td>
<td colspan="3"></td>
<td>Total: ${fmt(gTot)}<br>Jalan: ${fmt(gJln)}</td>
<td colspan="3"></td>`;
  tb.appendChild(totTr);
}

// ── HANDLERS ──────────────────────────────────────────────────────────────────
function onNama(ri,v){state[ri].nama=v;}
function onYrChange(ri,yi,v){state[ri].years[yi].yr=parseInt(v)||state[ri].years[yi].yr;recalc(ri);}
function onYrVal(ri,yi,v){state[ri].years[yi].val=parseRp(v);recalc(ri);}
function onYrRuas(ri,yi,v){state[ri].years[yi].ruas=v;}
function onPct(ri,v){state[ri].g=parseFloat(v)||0;recalc(ri);}
function onField(ri,k,v){state[ri][k]=v;}
function onCat(ri,v){state[ri].cat=v;}
function onDok(ri,di,v){state[ri].dok[di]=v?1:0;updateCards();}
function onMurni(ri,v){
  state[ri].murni=v;
  const b=document.getElementById('badge'+ri);
  if(b){b.className=v?'badge-m':'badge-g';b.textContent=v?'Murni 2026':'Gabungan';}
  recalc(ri);
}
function recalc(ri){
  const r=state[ri],f=calcTotal(r),h=calcJalan(r);
  const te=document.getElementById('tot'+ri),je=document.getElementById('jln'+ri);
  if(te)te.textContent=fmt(f);
  if(je)je.textContent=fmt(h);
  const we=document.getElementById('pctWarn'+ri);
  if(we){we.className='pct-warn'+(r.g>85?' show':'');}
  updateCards();
}

// ── ADD / DELETE ───────────────────────────────────────────────────────────────
function addRow(){
  state.push({no:state.length+1,nama:'',g:80,murni:false,cat:'',tglRuas:'',catRkp:'',tglRkp:'',dok:[0,0,0,0,0,0],
    years:[{yr:2024,val:0,ruas:''},{yr:2026,val:0,ruas:''}]});
  renderTable();updateCards();
  document.getElementById('tblBody').lastElementChild?.previousElementSibling?.scrollIntoView({behavior:'smooth',block:'nearest'});
}
function delRow(ri){if(!confirm('Hapus '+state[ri].nama+'?'))return;state.splice(ri,1);state.forEach((r,i)=>r.no=i+1);renderTable();updateCards();}
function addYear(ri){
  const r=state[ri];
  const maxYr=Math.max(...r.years.map(y=>y.yr));
  r.years.push({yr:maxYr+1,val:0,ruas:''});
  renderTable();updateCards();
}
function delYear(ri,yi){
  if(state[ri].years.length<=1){toast('⚠️ Minimal 1 tahun');return;}
  if(!confirm('Hapus tahun '+state[ri].years[yi].yr+'?'))return;
  state[ri].years.splice(yi,1);
  renderTable();updateCards();
}

// ── IMPORT EXCEL ──────────────────────────────────────────────────────────────
function importExcel(inp){
  const file=inp.files[0];if(!file)return;
  const reader=new FileReader();
  reader.onload=e=>{
    try{
      const wb=XLSX.read(e.target.result,{type:'array',cellDates:false});
      const ws=wb.Sheets[wb.SheetNames[0]];
      const rows=XLSX.utils.sheet_to_json(ws,{header:1,defval:''});
      let start=0;
      for(let i=0;i<rows.length;i++){if(typeof rows[i][0]==='number'&&rows[i][0]>0){start=i;break;}}
      const ns=[];
      for(let i=start;i<rows.length;i++){
        const r=rows[i];if(!r[2])continue;
        const d=parseRp(r[3]),s24=parseRp(r[4]),s25=parseRp(r[5]);
        const total=parseRp(r[6]);
        const murni=total>0&&Math.abs(total-d)<1000;
        ns.push({
          no:+r[0]||ns.length+1,
          nama:String(r[2]||'').trim(),
          g:parseFloat(r[7])||0,murni,
          cat:String(r[14]||'').replace(/\r\n/g,'\n'),
          tglRuas:excelToDate(r[15]),
          catRkp:String(r[16]||'').replace(/\r\n/g,'\n'),
          tglRkp:excelToDate(r[17]),
          dok:[r[18]?1:0,r[19]?1:0,r[20]?1:0,r[21]?1:0,r[22]?1:0,r[23]?1:0],
          years:[
            {yr:2023,val:0,ruas:String(r[9]||'').replace(/\r\n/g,'\n')},
            {yr:2024,val:s24,ruas:String(r[10]||'').replace(/\r\n/g,'\n')},
            {yr:2025,val:s25,ruas:String(r[11]||'').replace(/\r\n/g,'\n')},
            {yr:2026,val:d,ruas:String(r[12]||'').replace(/\r\n/g,'\n')},
          ]
        });
      }
      if(!ns.length){toast('⚠️ Tidak ada data');return;}
      state=ns;renderTable();updateCards();
      toast('✅ Import '+state.length+' daerah');
    }catch(err){toast('❌ '+err.message);}
    inp.value='';
  };
  reader.readAsArrayBuffer(file);
}

// ── EXPORT EXCEL ──────────────────────────────────────────────────────────────
function exportExcel(){
  const wb=XLSX.utils.book_new();
  const hdr=['NO','NAMA DAERAH','ALOKASI DBH TA 2026 (Rp)','SILPA s.d 2024 (Rp)','SILPA 2025 (Rp)',
    'TOTAL ALOKASI (Rp)','% JALAN','ALOKASI JALAN (Rp)',
    'RUAS 2023','RUAS 2024','RUAS 2025','RENCANA RUAS 2026',
    'CATATAN PFID','TGL BAHAS RUAS','CATATAN RKP','TGL BAHAS RKP',
    'BA Porsi','BA Ruas','BA Balai','DED+RAB','Dokumentasi','Resume'];
  const rows=[
    ['','CATATAN PEMBAHASAN BERITA ACARA DBH SAWIT TA 2026 SEKTOR INFRASTRUKTUR PROVINSI SUMATERA UTARA'],
    hdr,
    ...state.map((r,i)=>{
      const y26=getY26(r);
      const y24=r.years.find(y=>y.yr===2024)||{val:0,ruas:''};
      const y25=r.years.find(y=>y.yr===2025)||{val:0,ruas:''};
      const y23=r.years.find(y=>y.yr===2023)||{val:0,ruas:''};
      return[r.no||i+1,r.nama,y26.val,y24.val,y25.val,
        calcTotal(r),r.g,calcJalan(r),
        y23.ruas,y24.ruas,y25.ruas,y26.ruas,
        r.cat,r.tglRuas?dateToExcel(r.tglRuas):'',
        r.catRkp,r.tglRkp?dateToExcel(r.tglRkp):'',
        r.dok[0]?true:'',r.dok[1]?true:'',r.dok[2]?true:'',r.dok[3]?true:'',r.dok[4]?true:'',r.dok[5]?true:''];
    })
  ];
  const ws=XLSX.utils.aoa_to_sheet(rows);
  ws['!cols']=[{wch:5},{wch:32},{wch:22},{wch:20},{wch:16},{wch:22},{wch:9},{wch:22},{wch:42},{wch:42},{wch:42},{wch:42},{wch:52},{wch:16},{wch:52},{wch:16},{wch:10},{wch:10},{wch:10},{wch:10},{wch:12},{wch:10}];
  XLSX.utils.book_append_sheet(wb,'SUMUT-DBH 2026',ws);
  XLSX.writeFile(wb,'DBH_Sawit_2026_SUMUT.xlsx');
  toast('✅ Excel diunduh');
}

// ── PALM TREES ────────────────────────────────────────────────────────────────
function spawnPalms(){
  const wrap=document.getElementById('palms');
  if(!wrap)return;
  // Each palm: [left%, height(px), fontSize(px), opacity]
  const configs=[
    {l:2,  h:72, fs:22, op:.22},
    {l:8,  h:54, fs:17, op:.16},
    {l:88, h:68, fs:20, op:.2},
    {l:94, h:82, fs:25, op:.18},
    {l:97, h:46, fs:15, op:.12},
  ];
  // leaf angles around top of trunk
  const leafAngles=[-150,-110,-70,-30,10,50,90,130];
  configs.forEach(cfg=>{
    const palm=document.createElement('div');
    palm.className='palm';
    palm.style.cssText=`left:${cfg.l}%;opacity:${cfg.op}`;
    // trunk
    const trunk=document.createElement('div');
    trunk.className='palm-trunk';
    trunk.style.cssText=`height:${cfg.h}px;width:${Math.max(4,cfg.fs*.28)}px`;
    // leaves container at top of trunk
    const leavesWrap=document.createElement('div');
    leavesWrap.className='palm-leaves';
    leavesWrap.style.cssText=`position:absolute;bottom:${cfg.h-4}px;left:50%`;
    leafAngles.forEach(ang=>{
      const leaf=document.createElement('span');
      leaf.className='palm-leaf';
      leaf.style.cssText=`font-size:${cfg.fs}px;transform:rotate(${ang}deg) translateX(2px)`;
      leaf.textContent='🌿';
      leavesWrap.appendChild(leaf);
    });
    palm.appendChild(trunk);
    palm.appendChild(leavesWrap);
    wrap.appendChild(palm);
  });
}

// ── PARTICLES ─────────────────────────────────────────────────────────────────
function spawnParticles(){
  const b=document.getElementById('ptc');
  ['Rp','💰','🛣️','📊','🏛️'].forEach(s=>{for(let j=0;j<3;j++){
    const el=document.createElement('div');el.className='ptc-i';el.textContent=s;
    el.style.cssText=`left:${Math.random()*100}vw;animation-duration:${20+Math.random()*22}s;animation-delay:${Math.random()*18}s`;
    b.appendChild(el);
  }});
}

// ── INIT ──────────────────────────────────────────────────────────────────────
document.addEventListener('DOMContentLoaded',async ()=>{
  spawnParticles();spawnPalms();
  await loadState();
  setTimeout(()=>{document.getElementById('loader').classList.add('out');setTimeout(()=>{renderTable();updateCards();},200);},1700);
});
