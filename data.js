// ── CONSTANTS ──────────────────────────────────────────────────────────────────
const DAERAH_SUMUT=[
  "Provinsi Sumatera Utara",
  "Kab. Asahan","Kab. Batubara","Kab. Dairi","Kab. Deli Serdang",
  "Kab. Humbang Hasundutan","Kab. Karo","Kab. Labuhanbatu",
  "Kab. Labuhanbatu Selatan","Kab. Labuhanbatu Utara","Kab. Langkat",
  "Kab. Mandailing Natal","Kab. Nias","Kab. Nias Barat","Kab. Nias Selatan",
  "Kab. Nias Utara","Kab. Padang Lawas","Kab. Padang Lawas Utara",
  "Kab. Pakpak Bharat","Kab. Samosir","Kab. Serdang Bedagai",
  "Kab. Simalungun","Kab. Tapanuli Selatan","Kab. Tapanuli Tengah",
  "Kab. Tapanuli Utara","Kab. Toba",
  "Kota Binjai","Kota Gunungsitoli","Kota Medan","Kota Padang Sidempuan",
  "Kota Pematang Siantar","Kota Sibolga","Kota Tanjung Balai","Kota Tebing Tinggi"
];
const PROVINCES=["Sumatera Utara","Aceh","Sumatera Barat","Riau","Jambi","Sumatera Selatan",
  "Bengkulu","Lampung","Kepulauan Bangka Belitung","Kepulauan Riau","DKI Jakarta",
  "Jawa Barat","Jawa Tengah","DI Yogyakarta","Jawa Timur","Banten","Bali",
  "Nusa Tenggara Barat","Nusa Tenggara Timur","Kalimantan Barat","Kalimantan Tengah",
  "Kalimantan Selatan","Kalimantan Timur","Kalimantan Utara","Sulawesi Utara",
  "Sulawesi Tengah","Sulawesi Selatan","Sulawesi Tenggara","Gorontalo","Sulawesi Barat",
  "Maluku","Maluku Utara","Papua Barat","Papua","Papua Selatan","Papua Tengah",
  "Papua Pegunungan","Papua Barat Daya"];
const DOK_LABELS=["BA Porsi","BA Ruas","BA Balai","DED+RAB","Dokumentasi","Resume"];
const YR_PALETTE=['#1A6B8A','#8A5A1A','#5A1A8A','#1A8A4A','#2A6A5A','#6A1A5A','#5A6A1A','#1A4A8A'];
const yrColor=yr=>YR_PALETTE[(yr-2023)%YR_PALETTE.length]||YR_PALETTE[0];

// ── MASTER DATA (v4 format) ───────────────────────────────────────────────────
const MASTER=[
{no:1,nama:"Provinsi Sumatera Utara",g:80,murni:false,cat:"Revisi BA porsi, belum menentukan pemilihan ruas. Pembahasan terakhir 28 Jan 2026 → pilih ruas lanjutan semua.",tglRuas:"2026-01-14",catRkp:"",tglRkp:"",dok:[1,1,1,1,1,0],years:[
 {yr:2023,val:0,ruas:"Jembatan Merah - Muara Soma\nMuara Soma - Sp. Gambir\nBts. Binjai - Kuala\nSp. Namu Ukur - Bts. Karo\nTanah Jawa - Bts. Asahan\nPerdagangan - Bdr Masilam - Bts. Batubara"},
 {yr:2024,val:6081411868,ruas:"Kp. Binjai - Bandar Khalipah\nAek Godang - Sihaporas\nSihaporas - Paringgonan"},
 {yr:2025,val:0,ruas:"Aek Kota Batu - Bts. Tobasa"},
 {yr:2026,val:15226554000,ruas:"Sihaporas - Paringgonan (lanjutan 2024)"}]},
{no:2,nama:"Kab. Asahan",g:84.80,murni:false,cat:"BA porsi sesuai. SILPA 2023-2024 untuk ruas lanjutan. TA 2026 murni untuk ruas baru. BA RK: 2 ruas (lanjutan + baru).",tglRuas:"2026-01-14",catRkp:"",tglRkp:"",dok:[1,1,1,1,1,0],years:[
 {yr:2023,val:0,ruas:"Simpang Pabrik Benang - Bukit Katarina (Jln Propinsi)\n(Simpang SMP) Pulau Rakyat - Simpang IV (Parsaoran)"},
 {yr:2024,val:615454507,ruas:"(Jln Nasional) Pasar Miring - Sei Lama (Bts. Kecamatan)\nSimpang Alang Bombon - Rawa Sari (Simpang Laban)"},
 {yr:2025,val:0,ruas:"Aek Nagali - Simpang Rambung Merah"},
 {yr:2026,val:4336441000,ruas:"Simpang Alang Bombon - Rawa Sari (Simpang Laban)\nLedong Barat - Aek Bange"}]},
{no:3,nama:"Kab. Dairi",g:80,murni:true,cat:"BA porsi murni 2026, jalan 80%. SILPA sudah dipakai 2025. Cek ruas baru sesuai SK.",tglRuas:"2026-01-14",catRkp:"",tglRkp:"",dok:[1,1,1,1,1,0],years:[
 {yr:2023,val:0,ruas:"Jalan Jrs. Pardamean"},
 {yr:2024,val:1276273438,ruas:"Jalan Jrs Sopobutar - Pordomuan 2"},
 {yr:2025,val:0,ruas:""},
 {yr:2026,val:1508376000,ruas:"Pardamean - Sopobutar"}]},
{no:4,nama:"Kab. Deli Serdang",g:80,murni:false,cat:"Perbaikan BA porsi ket. alokasi 2026 + SILPA 23-24. Ruas baru + lanjutan.",tglRuas:"2026-01-14",catRkp:"",tglRkp:"",dok:[0,0,0,0,0,0],years:[
 {yr:2023,val:0,ruas:"Pasar X - Desa Saentis\nPasar 8 Biru Biru - Biru Biru"},
 {yr:2024,val:683673530,ruas:"Percut (Cinta Damai) - Ds. Sei Tuan\nDsn Karang Luas - Sialang Muda Dsn II\nJl. Kp. Manggis"},
 {yr:2025,val:0,ruas:"Sei Merah - Batu Lokong"},
 {yr:2026,val:2364591000,ruas:"Naga Timbul - Batu Lokong"}]},
{no:5,nama:"Kab. Karo",g:82.90,murni:true,cat:"BA Porsi Murni 2026, jalan 80%. SILPA sudah dipakai 2025. Ruas lanjutan 2025 OK.",tglRuas:"2026-01-14",catRkp:"",tglRkp:"",dok:[1,1,1,1,1,0],years:[
 {yr:2023,val:0,ruas:"Laupakam - Janji Matogu"},
 {yr:2024,val:349051462,ruas:"Jl. Selamat Ketaren\nMardinding - Lau Mandin - Lau Garut"},
 {yr:2025,val:0,ruas:"Mardinding - Lau Mandin - Lau Garut"},
 {yr:2026,val:1871073000,ruas:"Mardinding - Lau Mandin - Lau Garut"}]},
{no:6,nama:"Kab. Labuhanbatu",g:80,murni:true,cat:"BA porsi pakai alokasi 2026 saja. Ruas baru sambungan lanjutan DBH 2024.",tglRuas:"2026-01-14",catRkp:"",tglRkp:"",dok:[0,0,0,0,0,0],years:[
 {yr:2023,val:0,ruas:"Bangun Sari - Janji\nSei Rakyat - Sei Siarti"},
 {yr:2024,val:1463760300,ruas:"Padang Matinggi - Suka Makmur"},
 {yr:2025,val:0,ruas:"Sei Tampang - Sido Makmur"},
 {yr:2026,val:3666930000,ruas:"Suka Makmur - Tanjung Harapan"}]},
{no:7,nama:"Kab. Langkat",g:83,murni:false,cat:"SILPA 2023-2024 belum dikerjakan di RKP Perubahan 2025. BA porsi sesuai. Lanjut ke Balai.",tglRuas:"2026-01-14",catRkp:"",tglRkp:"",dok:[1,1,1,1,1,0],years:[
 {yr:2023,val:0,ruas:"Sp. Kepala Sungai - Hinai Kiri"},
 {yr:2024,val:2290683540,ruas:"Jl. Sp. Kacangan - Perkotaan Kec. Secanggang"},
 {yr:2025,val:0,ruas:"Jl. Batu Katak - Batu Jonjong\nSP. Kepala Sungai - Hinai Kiri"},
 {yr:2026,val:3684300000,ruas:"SP. Kepala Sungai - Hinai Kiri"}]},
{no:8,nama:"Kab. Mandailing Natal",g:80,murni:false,cat:"BA porsi revisi format baru. Format BA PFID disesuaikan dan ruas lanjutan.",tglRuas:"2026-01-14",catRkp:"",tglRkp:"",dok:[0,0,0,0,0,0],years:[
 {yr:2023,val:0,ruas:"Padang Silonjongan - Ranto Panjang\nSimp. Bintungan Bajangkar - Simp. Sikapas"},
 {yr:2024,val:998460534,ruas:"Padang Silonjongan - Ranto Panjang\nSimp. Bintungan Bajangkar - Simp. Sikapas"},
 {yr:2025,val:0,ruas:"Padang Silonjongan - Ranto Panjang"},
 {yr:2026,val:2416277000,ruas:"Padang Silonjongan - Ranto Panjang"}]},
{no:9,nama:"Kab. Nias",g:85,murni:false,cat:"BA Porsi OK. Perbaikan format BA PFID ruas lanjutan 2023.",tglRuas:"2026-01-14",catRkp:"",tglRkp:"",dok:[1,1,1,1,0,0],years:[
 {yr:2023,val:0,ruas:"Sisarahili - Balale Toba'a"},
 {yr:2024,val:2712150000,ruas:"Hiliwaele I - Dola Fadoro Hunugoa"},
 {yr:2025,val:0,ruas:"Hiliwaele I - Dola Fadoro Hunugoa"},
 {yr:2026,val:400000000,ruas:"Sisarahili - Balale Toba'a"}]},
{no:10,nama:"Kab. Simalungun",g:85,murni:false,cat:"Pembagian porsi diperbaiki karena melebihi 85% (pakai 2026 + SILPA). Penentuan ruas masih dibahas.",tglRuas:"2026-01-14",catRkp:"",tglRkp:"",dok:[0,0,0,0,0,0],years:[
 {yr:2023,val:0,ruas:"Nagojor - Bah Jambi"},
 {yr:2024,val:6412536689,ruas:"Simp. Nagojor - Nagojor"},
 {yr:2025,val:0,ruas:"Balimbingan - Maligas Tongah"},
 {yr:2026,val:3657005000,ruas:""}]},
{no:11,nama:"Kab. Tapanuli Selatan",g:85,murni:false,cat:"BA Porsi OK (2026 + SILPA). BA PFID perlu keterangan STA Penanganan multi financing.",tglRuas:"2026-01-14",catRkp:"",tglRkp:"",dok:[1,1,1,1,1,0],years:[
 {yr:2023,val:0,ruas:"Pardomuan - Mosa (Bts. Batang Angkola)"},
 {yr:2024,val:917412000,ruas:"Pardomuan - Mosa (Bts. Batang Angkola)\nSimp. Jl. Nas. (Amboriang) Aek Sabatang"},
 {yr:2025,val:0,ruas:"Simp. Jl. Nas. (Amboriang) Aek Sabatang"},
 {yr:2026,val:2955732000,ruas:"Pardomuan - Mosa (Bts. Batang Angkola)"}]},
{no:12,nama:"Kab. Tapanuli Tengah",g:80.13,murni:true,cat:"BA porsi murni 2026. Ruas baru mohon diasistenkan ke Balai.",tglRuas:"2026-01-14",catRkp:"",tglRkp:"",dok:[0,0,0,0,0,0],years:[
 {yr:2023,val:0,ruas:"Jalan Penghubung Trans Sp I - Sp II\nRaso - Partodungan"},
 {yr:2024,val:1519401600,ruas:"Lumut - Sihiong\nKolang - Hutatinggul\nManduamas Lama - Simanuk-manuk"},
 {yr:2025,val:0,ruas:"Raso - Partodungan\nHutanabolon - Watas Taput"},
 {yr:2026,val:2062904000,ruas:"Mela - Aloban/Bair"}]},
{no:13,nama:"Kab. Tapanuli Utara",g:84.99,murni:false,cat:"BA porsi tambah kolom keterangan rincian SILPA & alokasi 26. Masih diskusi pemilihan ruas.",tglRuas:"2026-01-14",catRkp:"",tglRkp:"",dok:[1,1,1,1,1,0],years:[
 {yr:2023,val:0,ruas:"Lbn Pinasa - Parsosoran - Gotting Salak\nSarulla - Sipetang"},
 {yr:2024,val:677475817,ruas:"Hutagurgur - Muara Tolang - Bts Tapsel\nHutamamungka - Bonan Dolok - Sialogo"},
 {yr:2025,val:0,ruas:"Garoga - Rianiate"},
 {yr:2026,val:1545079000,ruas:"Rappa Tumus - Hajoran"}]},
{no:14,nama:"Kab. Toba",g:80,murni:true,cat:"BA Porsi format baru, nilai alokasi murni 2026. Ruas 2026 baru OK. Lanjut ke Balai Jalan.",tglRuas:"2026-01-14",catRkp:"",tglRkp:"",dok:[0,0,0,0,0,0],years:[
 {yr:2023,val:0,ruas:"Lobu Jior - Adian Baja"},
 {yr:2024,val:8529790240,ruas:"Lobu Jior - Adian Baja"},
 {yr:2025,val:0,ruas:"Paridian - Napojoring"},
 {yr:2026,val:1476687000,ruas:"Pantil Lbn. Galagala - Sitarak"}]},
{no:15,nama:"Kota Binjai",g:85,murni:true,cat:"Pembahasan susulan dengan PFID.",tglRuas:"2026-01-14",catRkp:"",tglRkp:"",dok:[0,0,0,0,0,0],years:[
 {yr:2023,val:0,ruas:"Jl. Jamin Ginting\nJl. Bangau\nJl. Sei Lepan\nJl. Sei Bahorok\nJl. Gunung Bendahara\nJl. Samanhudi"},
 {yr:2024,val:10540529801,ruas:"Jl. Cendrawasih\nJl. Gunung Sinabung\nJl. Rukam\nJl. Semangka\nJl. Anggur"},
 {yr:2025,val:0,ruas:"Jl. M. Sutoyo"},
 {yr:2026,val:400000000,ruas:"Jl. Sei Wampu"}]},
{no:16,nama:"Kota Medan",g:85,murni:false,cat:"Perbaikan porsi karena alokasi hanya Rp 400 juta. Ruas baru.",tglRuas:"2026-01-14",catRkp:"",tglRkp:"",dok:[0,0,0,0,0,0],years:[
 {yr:2023,val:0,ruas:"Jl. Sampali\nJl. Sampali - Jl. Tenggiri (Jembatan)"},
 {yr:2024,val:406963895,ruas:"Jl. Sampali\nJl. Sampali - Jl. Gabus (Jembatan)"},
 {yr:2025,val:0,ruas:"Jl. Kejaksaan (Jembatan)"},
 {yr:2026,val:400000000,ruas:"Jl. Hiu Kec. Medan Belawan"}]},
{no:17,nama:"Kota Pematang Siantar",g:0,murni:false,cat:"",tglRuas:"2026-01-14",catRkp:"",tglRkp:"",dok:[0,0,0,0,0,0],years:[
 {yr:2023,val:0,ruas:"Jl. Dr. Sutomo"},
 {yr:2024,val:105132000,ruas:"Jl. Merdeka"},
 {yr:2025,val:0,ruas:"Batu Permata Raya"},
 {yr:2026,val:400000000,ruas:""}]},
{no:18,nama:"Kota Sibolga",g:80,murni:false,cat:"Memakai SILPA 2023-2024 dan alokasi 2026. Per 19 Jan 2026 perubahan ruas menjadi Jl. Bawal.",tglRuas:"2026-01-14",catRkp:"",tglRkp:"",dok:[1,1,1,1,1,0],years:[
 {yr:2023,val:0,ruas:"Jl. Putri Runduk\nJl. Merpati"},
 {yr:2024,val:102118980,ruas:"Jl. D.E. Sutan Bungaran Panggabean\nJl. Meranti"},
 {yr:2025,val:0,ruas:"Jl. Com. Yos Sudarso"},
 {yr:2026,val:400000000,ruas:"Jl. Bawal"}]},
{no:19,nama:"Kota Tanjung Balai",g:85,murni:false,cat:"Perbaikan format BA porsi memakai SILPA dan 2026. Penyesuaian jenis penanganan.",tglRuas:"2026-01-14",catRkp:"",tglRkp:"",dok:[1,1,1,1,1,0],years:[
 {yr:2023,val:0,ruas:"Jalan Anwar Idris"},
 {yr:2024,val:196275576,ruas:"Jalan Anwar Idris\nJalan AMD 60"},
 {yr:2025,val:0,ruas:"Jalan Anwar Idris"},
 {yr:2026,val:400000000,ruas:"Jalan Anwar Idris"}]},
{no:20,nama:"Kota Tebing Tinggi",g:85,murni:false,cat:"Perbaikan porsi BA — Rp 62 juta dikeluarkan karena masuk RKP Perubahan 2025. Cek harga satuan berkala.",tglRuas:"2026-01-14",catRkp:"",tglRkp:"",dok:[1,1,1,1,1,0],years:[
 {yr:2023,val:0,ruas:"Jalan Pandan\nJalan D. Belaian"},
 {yr:2024,val:84366433,ruas:"Jalan P. Buru\nJalan Sosial"},
 {yr:2025,val:0,ruas:"Jalan Ikhlas Berohol"},
 {yr:2026,val:400000000,ruas:"Jl. Wiratama"}]},
{no:21,nama:"Kota Padang Sidempuan",g:85,murni:false,cat:"BA porsi dibahas kembali, harus di rentang 80-85%. Ruas: cek kemantapan tahun sebelumnya.",tglRuas:"2026-01-14",catRkp:"",tglRkp:"",dok:[0,0,0,0,0,0],years:[
 {yr:2023,val:0,ruas:"Jln. Pijor Koling / Mgr. Imbang Desa\nJln. Bargot Topong"},
 {yr:2024,val:862582246,ruas:"Jl. Partihaman Saroha\nJln. Perjuangan / Mayor Bejo"},
 {yr:2025,val:0,ruas:"Jln. Balakka Sipunggur"},
 {yr:2026,val:1352829000,ruas:"Jalan BM. Muda / Eks Jl. Silandit"}]},
{no:22,nama:"Kab. Pakpak Bharat",g:81.53,murni:false,cat:"Revisi BA ttd tempelan. BA porsi pakai 2026 dan SILPA. Ruas lanjutan 2025.",tglRuas:"2026-01-14",catRkp:"",tglRkp:"",dok:[1,1,1,1,1,0],years:[
 {yr:2023,val:0,ruas:"Lae Mbentar - Watas NAD"},
 {yr:2024,val:407157627,ruas:"Lae Mbentar - Watas NAD"},
 {yr:2025,val:0,ruas:"Sibande - Genting"},
 {yr:2026,val:956861000,ruas:"Sibande - Genting"}]},
{no:23,nama:"Kab. Nias Selatan",g:80,murni:false,cat:"Sisa DBH Sawit TA 2024 hanya Rp 761 juta. Perlu konfirmasi sisa SILPA 2023-2024. BA porsi pakai alokasi 2026 saja.",tglRuas:"2026-01-14",catRkp:"",tglRkp:"",dok:[0,0,0,0,0,0],years:[
 {yr:2023,val:0,ruas:"Jl. Hilizalo'otano\nJl. Bawomataluo\nJl. Bawogosali"},
 {yr:2024,val:767308853,ruas:"Jl. Hilisaloo\nJl. Dari Kantor DPRD - Bawomataluo"},
 {yr:2025,val:0,ruas:"Jl. Hilisaloo"},
 {yr:2026,val:611378000,ruas:"Jl. Hilisaloo"}]},
{no:24,nama:"Kab. Humbang Hasundutan",g:85,murni:false,cat:"BA Porsi OK (SILPA + 2026). Ruas baru untuk 2026. Revisi BA RK hanya tampilkan ruas jalan usulan.",tglRuas:"2026-01-14",catRkp:"",tglRkp:"",dok:[0,1,1,1,1,0],years:[
 {yr:2023,val:0,ruas:"Pusu I - Parlilitan"},
 {yr:2024,val:68005130,ruas:"Pusu I - Parlilitan"},
 {yr:2025,val:0,ruas:"Pusu I - Parlilitan"},
 {yr:2026,val:1231860000,ruas:"Aek Sopang - Parmonangan - Lae Umbulan - Lae Hundulan"}]},
{no:25,nama:"Kab. Serdang Bedagai",g:80,murni:false,cat:"BA porsi belum TTD tapi sudah sesuai. Rencana kerjakan SILPA 2023-2024. Ada jembatan rusak hambat mobilisasi.",tglRuas:"2026-01-14",catRkp:"",tglRkp:"",dok:[1,1,1,1,1,0],years:[
 {yr:2023,val:0,ruas:"Bantan - Bukit Cermin\nBandar Bayu - Sialtong\nPekan Tanjung Beringin - Desa Tebing Tinggi\nRimbun - Kampung Lalang"},
 {yr:2024,val:242706691,ruas:"Bantan - Bukit Cermin\nBandar Bayu - Sialtong\nPekan Tanjung Beringin - Desa Tebing Tinggi\nRimbun - Kampung Lalang"},
 {yr:2025,val:0,ruas:"Simp. Silinda - Batas Kec. Kotarih (Jembatan Bane)"},
 {yr:2026,val:2635480000,ruas:"Manggis - Kelapa Bajohom"}]},
{no:26,nama:"Kab. Samosir",g:85,murni:true,cat:"Terdapat SILPA 2023-2024 yang belum dilaksanakan, namun BA menggunakan ruas baru untuk TA 2026.",tglRuas:"2026-01-14",catRkp:"",tglRkp:"",dok:[0,0,0,0,0,0],years:[
 {yr:2023,val:0,ruas:"Simpang 4 Onan Runggu - Lagundi"},
 {yr:2024,val:365253026,ruas:"Sp. Jalan Propinsi - Desa Parmonangan"},
 {yr:2025,val:0,ruas:"Aek Rangat - Sp. Tulas"},
 {yr:2026,val:400000000,ruas:"Huta Tinggi - Simandepe"}]},
{no:27,nama:"Kab. Batubara",g:80,murni:false,cat:"BA Porsi sesuai (hanya 2026). Ruas lanjutan tahun 2024.",tglRuas:"2026-01-14",catRkp:"",tglRkp:"",dok:[0,0,0,0,0,0],years:[
 {yr:2023,val:0,ruas:"Siparepare - Kampung Lalang"},
 {yr:2024,val:1561023633,ruas:"Bagan Baru - Tambun Tulang"},
 {yr:2025,val:0,ruas:"Pelompatan"},
 {yr:2026,val:2196594000,ruas:"Simpang Posko - Sibira-bira\nBagan Baru - Tambun Tulang"}]},
{no:28,nama:"Kab. Padang Lawas",g:80,murni:false,cat:"BA Porsi perbaikan format baru (SILPA + 2026). Masih diskusi pemilihan ruas lanjutan atau baru.",tglRuas:"2026-01-14",catRkp:"",tglRkp:"",dok:[0,0,0,0,0,0],years:[
 {yr:2023,val:0,ruas:"Sp. 3 Pir Trans Sosa III - Pir Trans Sosa II\nSembilang I"},
 {yr:2024,val:2851839200,ruas:"SP. Ganal - PP. Makmur - Ramba\nRamba - Tobing Tinggi"},
 {yr:2025,val:0,ruas:"Sp. Tamosu - Padang Hasior Lombang"},
 {yr:2026,val:3009506000,ruas:"SP. Propinsi Sigala Gala"}]},
{no:29,nama:"Kab. Padang Lawas Utara",g:84.99,murni:true,cat:"Pembagian porsi diperbaiki (melebihi 85%) → pakai 2026 saja. Ruas lanjutan menyesuaikan BA porsi final.",tglRuas:"2026-01-14",catRkp:"",tglRkp:"",dok:[1,1,1,1,1,0],years:[
 {yr:2023,val:0,ruas:"Sipaho - Batu Pulut - Sialang Bujing\nPinarik - Batas Labuhan Batu\nSp. Paya Baung - Paya Baung\nSibatu Loting - Batu Tambun"},
 {yr:2024,val:612299500,ruas:"Sibatu Loting - Batu Tambun\nSimangambat Julu - Ujung Gading Julu"},
 {yr:2025,val:0,ruas:"Simangambat Julu - Ujung Gading Julu"},
 {yr:2026,val:3913229000,ruas:"Simangambat Julu - Ujung Gading Julu"}]},
{no:30,nama:"Kab. Labuhanbatu Selatan",g:85,murni:true,cat:"Hanya alokasi murni 2026 karena SILPA belum fix. BA porsi belum TTD. Ruas 2026 baru masih dibahas.",tglRuas:"2026-01-14",catRkp:"",tglRkp:"",dok:[1,1,1,1,1,0],years:[
 {yr:2023,val:0,ruas:"Jalan Negara (Sp. Tolan) - Tanjung Medan - Tanjung Mulia - Sidomulyo - Podorukun - Bts. Prov. Riau"},
 {yr:2024,val:1136548845,ruas:"Jalan Negara (Sp. Tolan) - Tanjung Medan - Tanjung Mulia - Sidomulyo - Podorukun - Bts. Prov. Riau"},
 {yr:2025,val:0,ruas:"Sp. Tugu Cikampek - Aek Raso - Torganda - Cindur"},
 {yr:2026,val:4209488000,ruas:"Simaninggir - Asam Jawa"}]},
{no:31,nama:"Kab. Labuhanbatu Utara",g:85,murni:true,cat:"Perbaikan format BA Porsi (memakai Alokasi 2026 murni). Ruas OK.",tglRuas:"2026-01-14",catRkp:"",tglRkp:"",dok:[1,1,1,1,1,0],years:[
 {yr:2023,val:0,ruas:"Padang Maninjau - Parsiluman"},
 {yr:2024,val:2253388409,ruas:"Marbau - Miliano - Pulo Bargot"},
 {yr:2025,val:0,ruas:"Siranggong - Simangalam"},
 {yr:2026,val:4099612000,ruas:"Aek Kanopan - Bandar Manis (PT. Sinar Mas Kebun Kanapon Ulu)"}]},
{no:32,nama:"Kab. Nias Utara",g:85,murni:false,cat:"Perbaikan BA karena porsi terlalu banyak untuk jalan (hanya SILPA 23-24). Sesuaikan BA porsi final PMK.",tglRuas:"2026-01-14",catRkp:"",tglRkp:"",dok:[1,1,1,1,1,0],years:[
 {yr:2023,val:0,ruas:"Lotu - Bogali - Awa'ai\nJembatan Lafau (Fadoro Hilimbowo)"},
 {yr:2024,val:1652371800,ruas:"Loloana'a - Fabaliwa - Harefanaese - Anoma - Ononazara"},
 {yr:2025,val:0,ruas:""},
 {yr:2026,val:0,ruas:"Lotu - Bogali - Awa'ai"}]},
{no:33,nama:"Kab. Nias Barat",g:80,murni:true,cat:"BA Porsi sesuai (hanya 2026). Ruas lanjutan tahun 2025.",tglRuas:"2026-01-14",catRkp:"",tglRkp:"",dok:[0,0,0,0,0,0],years:[
 {yr:2023,val:0,ruas:"Jl. Gatot Subroto\nJl. Soekarno Hatta"},
 {yr:2024,val:6020280860,ruas:"Lologundre - Ombolata"},
 {yr:2025,val:0,ruas:"Lologundre - Ombolata"},
 {yr:2026,val:400000000,ruas:"Lologundre - Ombolata"}]},
{no:34,nama:"Kota Gunungsitoli",g:0,murni:false,cat:"Data masih dalam proses konfirmasi.",tglRuas:"2026-01-14",catRkp:"",tglRkp:"",dok:[0,0,0,0,0,0],years:[
 {yr:2023,val:0,ruas:"Lozasai - Bakaro\nTetehosi I"},
 {yr:2024,val:10387,ruas:"Ombolata Idanoi - Onowaembo Idanoi"},
 {yr:2025,val:0,ruas:""},
 {yr:2026,val:0,ruas:""}]},
];
