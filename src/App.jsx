import React from 'react';
const STORAGE_KEY = 'konten-organizer-data-v1';

const STATUSES = [
  'Ide',
  'Draft',
  'Menunggu Desain',
  'Menunggu Revisi',
  'Siap Posting',
  'Sudah Tayang',
  'Arsip',
  'Batal'
];

const PLATFORMS = [
  'Instagram Feed',
  'Instagram Story',
  'TikTok/Reels',
  'Facebook',
  'WhatsApp Status',
  'YouTube Shorts',
  'Website'
];

const FORMATS = [
  'Pamflet',
  'Caption + Foto',
  'Story',
  'Video Pendek',
  'Carousel',
  'Artikel Pendek',
  'Pengumuman Resmi'
];

const TEMPLATE_CAPTIONS = [
  {
    id: 'tpl-pengumuman',
    category: 'Pengumuman',
    title: 'Pengumuman Kegiatan Resmi',
    body: `Assalamu’alaikum warahmatullahi wabarakatuh.\n\nDengan hormat, kami mengundang Bapak/Ibu/Saudara/i untuk menghadiri kegiatan:\n\n[Nama Kegiatan]\nHari/Tanggal: [Tanggal]\nWaktu: [Jam]\nTempat: [Lokasi]\n\nSemoga Allah SWT memberikan kelancaran dan keberkahan.\n\nWassalamu’alaikum warahmatullahi wabarakatuh.`
  },
  {
    id: 'tpl-reminder',
    category: 'Reminder',
    title: 'Reminder H-1 Kegiatan',
    body: `Jangan lupa hadir dalam kegiatan [Nama Kegiatan] yang insyaAllah akan dilaksanakan pada:\n\nHari/Tanggal: [Tanggal]\nWaktu: [Jam]\nTempat: [Lokasi]\n\nMari bersama-sama hadir dan mengambil manfaat dari kegiatan ini.`
  },
  {
    id: 'tpl-laporan',
    category: 'Laporan',
    title: 'Laporan Dokumentasi Kegiatan',
    body: `Alhamdulillah, kegiatan [Nama Kegiatan] telah terlaksana dengan lancar pada [Tanggal] bertempat di [Lokasi].\n\nTerima kasih kepada seluruh pihak yang telah hadir, mendukung, dan membantu suksesnya kegiatan ini. Semoga menjadi amal kebaikan dan membawa keberkahan untuk kita semua.`
  },
  {
    id: 'tpl-santunan',
    category: 'Sosial',
    title: 'Dokumentasi Program Sosial/Santunan',
    body: `Alhamdulillah, penyaluran bantuan/santunan melalui program [Nama Program] telah terlaksana dengan baik.\n\nSemoga bantuan ini membawa manfaat, meringankan beban penerima manfaat, dan menjadi jalan keberkahan bagi para donatur serta seluruh pihak yang terlibat.`
  },
  {
    id: 'tpl-ucapan',
    category: 'Ucapan',
    title: 'Ucapan Hari Besar Islam',
    body: `Keluarga besar [Nama Organisasi] mengucapkan:\n\n[Ucapan Hari Besar]\n\nSemoga momentum ini menjadi penguat iman, amal, persaudaraan, dan semangat berkhidmah untuk umat.`
  },
  {
    id: 'tpl-dakwah',
    category: 'Dakwah',
    title: 'Dakwah Singkat',
    body: `Ada hal sederhana yang sering kita lupakan: [Tema].\n\nPadahal, kebaikan kecil yang dilakukan dengan istiqamah bisa menjadi sebab turunnya keberkahan. Mari terus memperbaiki diri, sedikit demi sedikit, dengan niat yang benar dan amal yang konsisten.`
  }
];

function pad(value) {
  return String(value).padStart(2, '0');
}

function toDateInput(date) {
  const d = new Date(date);
  return `${d.getFullYear()}-${pad(d.getMonth() + 1)}-${pad(d.getDate())}`;
}

function addDays(dateString, days) {
  const d = dateString ? new Date(`${dateString}T12:00:00`) : new Date();
  d.setDate(d.getDate() + days);
  return toDateInput(d);
}

function todayInput() {
  return toDateInput(new Date());
}

function thisWeekRange() {
  const now = new Date();
  const day = now.getDay() || 7;
  const start = new Date(now);
  start.setDate(now.getDate() - day + 1);
  const end = new Date(start);
  end.setDate(start.getDate() + 6);
  return [toDateInput(start), toDateInput(end)];
}

function id(prefix = 'id') {
  return `${prefix}-${Date.now()}-${Math.random().toString(16).slice(2)}`;
}

function formatDate(dateString) {
  if (!dateString) return '-';
  return new Intl.DateTimeFormat('id-ID', {
    weekday: 'short',
    day: '2-digit',
    month: 'short',
    year: 'numeric'
  }).format(new Date(`${dateString}T12:00:00`));
}

function getInitialData() {
  const today = todayInput();
  const agendaId = id('agenda');
  return {
    organization: {
      name: 'Konten Organizer',
      tagline: 'Manajemen konten organisasi/lembaga',
      tone: 'Resmi, sopan, islami, hangat, dan mudah dipahami.',
      target: 'Anggota, alumni, jamaah, donatur, wali santri, dan masyarakat umum.'
    },
    agendas: [
      {
        id: agendaId,
        title: 'Istighotsah Rutin',
        date: addDays(today, 3),
        time: '19:30',
        location: 'Masjid / Aula Organisasi',
        category: 'Kegiatan Rutin',
        owner: 'Tim Media',
        status: 'Akan Berlangsung',
        description: 'Agenda contoh untuk latihan membuat paket konten dari satu kegiatan.',
        createdAt: new Date().toISOString()
      }
    ],
    contents: [
      {
        id: id('content'),
        title: 'Pengumuman Istighotsah Rutin',
        agendaId,
        platform: 'Instagram Feed',
        format: 'Pamflet',
        postDate: today,
        postTime: '08:00',
        status: 'Siap Posting',
        owner: 'Admin Media',
        hook: 'Mari hadir dan mengambil keberkahan bersama.',
        caption: TEMPLATE_CAPTIONS[0].body,
        hashtags: '#KontenOrganizer #KegiatanRutin #Organisasi',
        link: '',
        notes: 'Contoh konten awal. Silakan edit sesuai kebutuhan organisasi.',
        checklist: [
          { label: 'Data acara sudah lengkap', done: true },
          { label: 'Caption sudah dibuat', done: true },
          { label: 'Desain sudah dicek', done: false },
          { label: 'Sudah disetujui pengurus', done: false },
          { label: 'Sudah diposting', done: false }
        ],
        createdAt: new Date().toISOString()
      },
      {
        id: id('content'),
        title: 'Dokumentasi Kegiatan Pekan Ini',
        agendaId,
        platform: 'WhatsApp Status',
        format: 'Story',
        postDate: addDays(today, 1),
        postTime: '20:00',
        status: 'Draft',
        owner: 'Dokumentator',
        hook: '',
        caption: TEMPLATE_CAPTIONS[2].body,
        hashtags: '#Dokumentasi #Kegiatan',
        link: '',
        notes: 'Siapkan foto/video terbaik setelah kegiatan.',
        checklist: [
          { label: 'Foto terbaik dipilih', done: false },
          { label: 'Caption dibuat', done: true },
          { label: 'Tanggal dan lokasi benar', done: false },
          { label: 'Sudah diposting', done: false }
        ],
        createdAt: new Date().toISOString()
      }
    ],
    templates: TEMPLATE_CAPTIONS,
    activeView: 'dashboard'
  };
}

function loadData() {
  try {
    const saved = localStorage.getItem(STORAGE_KEY);
    if (!saved) return getInitialData();
    const parsed = JSON.parse(saved);
    return { ...getInitialData(), ...parsed };
  } catch (error) {
    console.warn('Gagal membaca data lokal:', error);
    return getInitialData();
  }
}

function saveData(data) {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
}

function StatCard({ label, value, helper, tone = 'orange' }) {
  return (
    <div className={`stat-card tone-${tone}`}>
      <span>{label}</span>
      <strong>{value}</strong>
      <small>{helper}</small>
    </div>
  );
}

function EmptyState({ title, text }) {
  return (
    <div className="empty-state">
      <div>🗂️</div>
      <strong>{title}</strong>
      <p>{text}</p>
    </div>
  );
}

function StatusBadge({ status }) {
  return <span className={`badge status-${status?.toLowerCase().replaceAll(' ', '-')}`}>{status}</span>;
}

function App() {
  const [data, setData] = React.useState(loadData);
  const [activeView, setActiveView] = React.useState(data.activeView || 'dashboard');
  const [editingAgenda, setEditingAgenda] = React.useState(null);
  const [editingContent, setEditingContent] = React.useState(null);
  const [toast, setToast] = React.useState('');
  const [installPrompt, setInstallPrompt] = React.useState(null);

  React.useEffect(() => {
    saveData({ ...data, activeView });
  }, [data, activeView]);

  React.useEffect(() => {
    const handler = (event) => {
      event.preventDefault();
      setInstallPrompt(event);
    };
    window.addEventListener('beforeinstallprompt', handler);
    return () => window.removeEventListener('beforeinstallprompt', handler);
  }, []);

  React.useEffect(() => {
    if (!toast) return;
    const timeout = setTimeout(() => setToast(''), 2600);
    return () => clearTimeout(timeout);
  }, [toast]);

  function updateData(patch) {
    setData((current) => ({ ...current, ...patch }));
  }

  function upsertAgenda(agenda) {
    const isEdit = Boolean(agenda.id);
    const item = {
      ...agenda,
      id: agenda.id || id('agenda'),
      createdAt: agenda.createdAt || new Date().toISOString()
    };
    const agendas = isEdit
      ? data.agendas.map((old) => (old.id === item.id ? item : old))
      : [item, ...data.agendas];
    updateData({ agendas });
    setEditingAgenda(null);
    setToast(isEdit ? 'Agenda berhasil diperbarui.' : 'Agenda baru berhasil ditambahkan.');
  }

  function removeAgenda(agendaId) {
    if (!confirm('Hapus agenda ini? Konten yang terkait tidak ikut dihapus.')) return;
    updateData({ agendas: data.agendas.filter((item) => item.id !== agendaId) });
    setToast('Agenda berhasil dihapus.');
  }

  function upsertContent(content) {
    const isEdit = Boolean(content.id);
    const item = {
      ...content,
      id: content.id || id('content'),
      createdAt: content.createdAt || new Date().toISOString(),
      checklist: content.checklist?.length ? content.checklist : defaultChecklist(content.format)
    };
    const contents = isEdit
      ? data.contents.map((old) => (old.id === item.id ? item : old))
      : [item, ...data.contents];
    updateData({ contents });
    setEditingContent(null);
    setToast(isEdit ? 'Konten berhasil diperbarui.' : 'Konten baru berhasil dibuat.');
  }

  function removeContent(contentId) {
    if (!confirm('Hapus konten ini?')) return;
    updateData({ contents: data.contents.filter((item) => item.id !== contentId) });
    setToast('Konten berhasil dihapus.');
  }

  function setContentStatus(contentId, status) {
    updateData({
      contents: data.contents.map((item) => (item.id === contentId ? { ...item, status } : item))
    });
  }

  function toggleChecklist(contentId, index) {
    updateData({
      contents: data.contents.map((item) => {
        if (item.id !== contentId) return item;
        return {
          ...item,
          checklist: item.checklist.map((check, i) => (i === index ? { ...check, done: !check.done } : check))
        };
      })
    });
  }

  function createContentPackage(agenda) {
    const base = [
      { title: `Pengumuman ${agenda.title}`, offset: -7, platform: 'Instagram Feed', format: 'Pamflet', status: 'Draft', caption: TEMPLATE_CAPTIONS[0].body },
      { title: `Reminder H-1 ${agenda.title}`, offset: -1, platform: 'Instagram Story', format: 'Story', status: 'Ide', caption: TEMPLATE_CAPTIONS[1].body },
      { title: `Story Hari H ${agenda.title}`, offset: 0, platform: 'WhatsApp Status', format: 'Story', status: 'Ide', caption: `Hari ini berlangsung kegiatan ${agenda.title}. Semoga berjalan lancar dan penuh keberkahan.` },
      { title: `Dokumentasi ${agenda.title}`, offset: 1, platform: 'Instagram Feed', format: 'Caption + Foto', status: 'Menunggu Desain', caption: TEMPLATE_CAPTIONS[2].body },
      { title: `Laporan ${agenda.title}`, offset: 2, platform: 'Facebook', format: 'Caption + Foto', status: 'Draft', caption: TEMPLATE_CAPTIONS[2].body },
      { title: `Highlight Video ${agenda.title}`, offset: 3, platform: 'TikTok/Reels', format: 'Video Pendek', status: 'Ide', caption: `Cuplikan kegiatan ${agenda.title}. Semoga menjadi pengingat kebaikan dan semangat berkhidmah.` }
    ];
    const packageItems = base.map((item) => ({
      id: id('content'),
      agendaId: agenda.id,
      title: item.title,
      platform: item.platform,
      format: item.format,
      postDate: addDays(agenda.date, item.offset),
      postTime: item.offset < 0 ? '08:00' : '19:00',
      status: item.status,
      owner: 'Tim Media',
      hook: '',
      caption: item.caption,
      hashtags: '#Kegiatan #Dokumentasi #Organisasi',
      link: '',
      notes: `Paket otomatis dari agenda: ${agenda.title}`,
      checklist: defaultChecklist(item.format),
      createdAt: new Date().toISOString()
    }));
    updateData({ contents: [...packageItems, ...data.contents] });
    setToast('Paket konten dari agenda berhasil dibuat.');
    setActiveView('produksi');
  }

  async function installApp() {
    if (!installPrompt) return;
    installPrompt.prompt();
    await installPrompt.userChoice;
    setInstallPrompt(null);
  }

  function exportJson() {
    const blob = new Blob([JSON.stringify(data, null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `backup-konten-organizer-${todayInput()}.json`;
    a.click();
    URL.revokeObjectURL(url);
    setToast('Backup JSON berhasil dibuat.');
  }

  function importJson(event) {
    const file = event.target.files?.[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = () => {
      try {
        const imported = JSON.parse(reader.result);
        setData({ ...getInitialData(), ...imported });
        setToast('Data berhasil diimpor.');
      } catch {
        alert('File JSON tidak valid.');
      }
    };
    reader.readAsText(file);
  }

  const props = {
    data,
    updateData,
    setEditingAgenda,
    setEditingContent,
    upsertAgenda,
    upsertContent,
    removeAgenda,
    removeContent,
    createContentPackage,
    setContentStatus,
    toggleChecklist,
    setToast,
    exportJson,
    importJson
  };

  const viewMap = {
    dashboard: <Dashboard {...props} setActiveView={setActiveView} />,
    agenda: <AgendaView {...props} />,
    kalender: <CalendarView {...props} />,
    produksi: <ProductionView {...props} />,
    template: <TemplateView {...props} />,
    arsip: <ArchiveView {...props} />,
    settings: <SettingsView {...props} />
  };

  return (
    <div className="app-shell">
      <aside className="sidebar">
        <div className="brand">
          <div className="brand-mark">KO</div>
          <div>
            <strong>Konten Organizer</strong>
            <span>PWA Organisasi</span>
          </div>
        </div>
        <nav>
          {navItems.map((item) => (
            <button key={item.key} className={activeView === item.key ? 'active' : ''} onClick={() => setActiveView(item.key)}>
              <span>{item.icon}</span> {item.label}
            </button>
          ))}
        </nav>
        <div className="sidebar-footer">
          <small>{data.organization.name}</small>
          <button className="ghost small" onClick={() => setActiveView('settings')}>Pengaturan</button>
        </div>
      </aside>

      <main className="main-content">
        <header className="topbar">
          <div>
            <p className="eyebrow">Tools kerja konten lembaga</p>
            <h1>{titleByView[activeView]}</h1>
          </div>
          <div className="topbar-actions">
            {installPrompt && <button className="ghost" onClick={installApp}>Pasang PWA</button>}
            <button className="primary" onClick={() => setEditingContent({})}>+ Konten</button>
          </div>
        </header>

        {viewMap[activeView]}
      </main>

      <nav className="mobile-nav">
        {navItems.slice(0, 5).map((item) => (
          <button key={item.key} className={activeView === item.key ? 'active' : ''} onClick={() => setActiveView(item.key)}>
            <span>{item.icon}</span>
            <small>{item.short}</small>
          </button>
        ))}
      </nav>

      {editingAgenda !== null && (
        <AgendaModal agenda={editingAgenda} onClose={() => setEditingAgenda(null)} onSave={upsertAgenda} />
      )}
      {editingContent !== null && (
        <ContentModal content={editingContent} agendas={data.agendas} onClose={() => setEditingContent(null)} onSave={upsertContent} />
      )}
      {toast && <div className="toast">{toast}</div>}
    </div>
  );
}

const navItems = [
  { key: 'dashboard', label: 'Dashboard', short: 'Home', icon: '🏠' },
  { key: 'agenda', label: 'Agenda', short: 'Agenda', icon: '📌' },
  { key: 'kalender', label: 'Kalender', short: 'Kalender', icon: '🗓️' },
  { key: 'produksi', label: 'Produksi', short: 'Produksi', icon: '🧩' },
  { key: 'template', label: 'Template', short: 'Template', icon: '📝' },
  { key: 'arsip', label: 'Arsip', short: 'Arsip', icon: '🗃️' },
  { key: 'settings', label: 'Pengaturan', short: 'Setelan', icon: '⚙️' }
];

const titleByView = {
  dashboard: 'Dashboard',
  agenda: 'Agenda Kegiatan',
  kalender: 'Kalender Konten',
  produksi: 'Produksi Konten',
  template: 'Template Caption',
  arsip: 'Arsip Tayang',
  settings: 'Pengaturan Aplikasi'
};

function defaultChecklist(format = 'Konten') {
  if (format === 'Pamflet') {
    return [
      { label: 'Data acara lengkap', done: false },
      { label: 'Logo organisasi benar', done: false },
      { label: 'Tanggal, jam, lokasi dicek', done: false },
      { label: 'Desain selesai', done: false },
      { label: 'Disetujui pengurus', done: false },
      { label: 'Diposting', done: false }
    ];
  }
  if (format === 'Video Pendek') {
    return [
      { label: 'Konsep video dibuat', done: false },
      { label: 'Bahan video dipilih', done: false },
      { label: 'Caption selesai', done: false },
      { label: 'Editing selesai', done: false },
      { label: 'Disetujui', done: false },
      { label: 'Diposting', done: false }
    ];
  }
  return [
    { label: 'Judul dibuat', done: false },
    { label: 'Caption/naskah dibuat', done: false },
    { label: 'Media/desain disiapkan', done: false },
    { label: 'Dicek ulang', done: false },
    { label: 'Disetujui', done: false },
    { label: 'Diposting', done: false }
  ];
}

function Dashboard({ data, setActiveView, setEditingAgenda, setEditingContent }) {
  const today = todayInput();
  const [weekStart, weekEnd] = thisWeekRange();
  const todayContents = data.contents.filter((item) => item.postDate === today);
  const overdue = data.contents.filter((item) => item.postDate < today && !['Sudah Tayang', 'Arsip', 'Batal'].includes(item.status));
  const ready = data.contents.filter((item) => item.status === 'Siap Posting');
  const weekContents = data.contents.filter((item) => item.postDate >= weekStart && item.postDate <= weekEnd);
  const weekDone = weekContents.filter((item) => ['Sudah Tayang', 'Arsip'].includes(item.status)).length;
  const nextAgendas = [...data.agendas]
    .filter((item) => item.date >= today)
    .sort((a, b) => `${a.date}${a.time}`.localeCompare(`${b.date}${b.time}`))
    .slice(0, 4);

  return (
    <section className="page-grid">
      <div className="hero-card">
        <p className="eyebrow">{formatDate(today)}</p>
        <h2>Siapkan konten organisasi dari agenda sampai tayang.</h2>
        <p>Mulai dari agenda kegiatan, buat paket konten otomatis, kelola status produksi, lalu arsipkan hasil posting.</p>
        <div className="hero-actions">
          <button className="primary" onClick={() => setEditingAgenda({})}>+ Agenda Baru</button>
          <button className="ghost" onClick={() => setEditingContent({})}>+ Konten Manual</button>
        </div>
      </div>

      <div className="stat-grid">
        <StatCard label="Konten hari ini" value={todayContents.length} helper="Perlu dicek hari ini" />
        <StatCard label="Terlambat" value={overdue.length} helper="Belum selesai/tayang" tone="red" />
        <StatCard label="Siap posting" value={ready.length} helper="Tinggal dipublikasikan" tone="green" />
        <StatCard label="Minggu ini" value={`${weekDone}/${weekContents.length}`} helper="Sudah tayang / total" tone="blue" />
      </div>

      <div className="panel wide">
        <div className="panel-header">
          <h3>Konten Hari Ini</h3>
          <button className="ghost small" onClick={() => setActiveView('produksi')}>Lihat produksi</button>
        </div>
        {todayContents.length ? (
          <div className="card-list">
            {todayContents.map((item) => <ContentRow key={item.id} item={item} agenda={data.agendas.find((a) => a.id === item.agendaId)} />)}
          </div>
        ) : <EmptyState title="Belum ada konten hari ini" text="Tambahkan konten atau buat paket dari agenda kegiatan." />}
      </div>

      <div className="panel">
        <div className="panel-header">
          <h3>Agenda Terdekat</h3>
          <button className="ghost small" onClick={() => setActiveView('agenda')}>Lihat agenda</button>
        </div>
        {nextAgendas.length ? nextAgendas.map((item) => <AgendaMini key={item.id} agenda={item} />) : <EmptyState title="Agenda kosong" text="Buat agenda kegiatan pertama." />}
      </div>

      <div className="panel">
        <div className="panel-header">
          <h3>Konten Terlambat</h3>
          <button className="ghost small" onClick={() => setActiveView('kalender')}>Buka kalender</button>
        </div>
        {overdue.length ? overdue.slice(0, 5).map((item) => <ContentRow key={item.id} item={item} compact />) : <EmptyState title="Aman" text="Tidak ada konten yang terlambat." />}
      </div>
    </section>
  );
}

function AgendaView({ data, setEditingAgenda, removeAgenda, createContentPackage }) {
  const sorted = [...data.agendas].sort((a, b) => `${a.date}${a.time}`.localeCompare(`${b.date}${b.time}`));
  return (
    <section className="panel full">
      <div className="panel-header">
        <div>
          <h3>Agenda Kegiatan</h3>
          <p>Setiap agenda bisa diubah menjadi paket konten otomatis.</p>
        </div>
        <button className="primary" onClick={() => setEditingAgenda({})}>+ Agenda</button>
      </div>
      <div className="agenda-grid">
        {sorted.map((agenda) => (
          <article className="agenda-card" key={agenda.id}>
            <div className="agenda-date">
              <strong>{new Date(`${agenda.date}T12:00:00`).getDate()}</strong>
              <span>{new Intl.DateTimeFormat('id-ID', { month: 'short' }).format(new Date(`${agenda.date}T12:00:00`))}</span>
            </div>
            <div className="agenda-body">
              <div className="card-topline">
                <StatusBadge status={agenda.status} />
                <small>{agenda.category}</small>
              </div>
              <h3>{agenda.title}</h3>
              <p>{agenda.description || 'Belum ada deskripsi.'}</p>
              <div className="meta-line">⏰ {agenda.time || '-'} · 📍 {agenda.location || '-'}</div>
              <div className="card-actions">
                <button className="primary small" onClick={() => createContentPackage(agenda)}>Buat Paket Konten</button>
                <button className="ghost small" onClick={() => setEditingAgenda(agenda)}>Edit</button>
                <button className="danger small" onClick={() => removeAgenda(agenda.id)}>Hapus</button>
              </div>
            </div>
          </article>
        ))}
      </div>
      {!sorted.length && <EmptyState title="Belum ada agenda" text="Tambahkan agenda agar bisa dibuat kalender kontennya." />}
    </section>
  );
}

function CalendarView({ data, setEditingContent }) {
  const [month, setMonth] = React.useState(() => {
    const d = new Date();
    return new Date(d.getFullYear(), d.getMonth(), 1);
  });
  const monthName = new Intl.DateTimeFormat('id-ID', { month: 'long', year: 'numeric' }).format(month);
  const days = getCalendarDays(month);
  const contentByDate = data.contents.reduce((acc, item) => {
    acc[item.postDate] = acc[item.postDate] || [];
    acc[item.postDate].push(item);
    return acc;
  }, {});

  function moveMonth(delta) {
    setMonth((current) => new Date(current.getFullYear(), current.getMonth() + delta, 1));
  }

  return (
    <section className="panel full">
      <div className="panel-header calendar-header">
        <div>
          <h3>{monthName}</h3>
          <p>Kalender jadwal posting dan deadline konten.</p>
        </div>
        <div className="button-row">
          <button className="ghost small" onClick={() => moveMonth(-1)}>‹ Bulan lalu</button>
          <button className="ghost small" onClick={() => setMonth(new Date(new Date().getFullYear(), new Date().getMonth(), 1))}>Bulan ini</button>
          <button className="ghost small" onClick={() => moveMonth(1)}>Bulan depan ›</button>
        </div>
      </div>
      <div className="calendar-grid">
        {['Sen', 'Sel', 'Rab', 'Kam', 'Jum', 'Sab', 'Min'].map((day) => <strong className="calendar-day-name" key={day}>{day}</strong>)}
        {days.map((day) => {
          const dateKey = toDateInput(day.date);
          const items = contentByDate[dateKey] || [];
          return (
            <div className={`calendar-cell ${day.isCurrent ? '' : 'muted'} ${dateKey === todayInput() ? 'today' : ''}`} key={dateKey}>
              <span className="date-number">{day.date.getDate()}</span>
              <div className="calendar-items">
                {items.slice(0, 3).map((item) => (
                  <button key={item.id} onClick={() => setEditingContent(item)} className={`calendar-chip chip-${item.status.toLowerCase().replaceAll(' ', '-')}`}>
                    {item.title}
                  </button>
                ))}
                {items.length > 3 && <small>+{items.length - 3} lagi</small>}
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
}

function getCalendarDays(month) {
  const first = new Date(month.getFullYear(), month.getMonth(), 1);
  const start = new Date(first);
  const day = first.getDay() || 7;
  start.setDate(first.getDate() - day + 1);
  return Array.from({ length: 42 }, (_, index) => {
    const date = new Date(start);
    date.setDate(start.getDate() + index);
    return { date, isCurrent: date.getMonth() === month.getMonth() };
  });
}

function ProductionView({ data, setEditingContent, removeContent, setContentStatus, toggleChecklist }) {
  const [query, setQuery] = React.useState('');
  const filtered = data.contents.filter((item) => {
    const text = `${item.title} ${item.platform} ${item.status} ${item.format}`.toLowerCase();
    return text.includes(query.toLowerCase());
  });

  return (
    <section className="production-page">
      <div className="panel full">
        <div className="panel-header">
          <div>
            <h3>Papan Produksi</h3>
            <p>Geser status konten dengan tombol status di setiap kartu.</p>
          </div>
          <input className="search-input" placeholder="Cari judul/platform/status..." value={query} onChange={(e) => setQuery(e.target.value)} />
        </div>
      </div>
      <div className="kanban">
        {STATUSES.filter((status) => !['Arsip', 'Batal'].includes(status)).map((status) => {
          const items = filtered.filter((item) => item.status === status);
          return (
            <div className="kanban-column" key={status}>
              <div className="kanban-title">
                <h3>{status}</h3>
                <span>{items.length}</span>
              </div>
              {items.map((item) => (
                <ContentCard
                  key={item.id}
                  item={item}
                  agendas={data.agendas}
                  onEdit={() => setEditingContent(item)}
                  onDelete={() => removeContent(item.id)}
                  onStatus={(next) => setContentStatus(item.id, next)}
                  onChecklist={(index) => toggleChecklist(item.id, index)}
                />
              ))}
              {!items.length && <div className="drop-empty">Kosong</div>}
            </div>
          );
        })}
      </div>
    </section>
  );
}

function ContentCard({ item, agendas, onEdit, onDelete, onStatus, onChecklist }) {
  const agenda = agendas.find((a) => a.id === item.agendaId);
  const done = item.checklist?.filter((check) => check.done).length || 0;
  const total = item.checklist?.length || 0;
  return (
    <article className="content-card">
      <div className="card-topline">
        <StatusBadge status={item.status} />
        <small>{item.platform}</small>
      </div>
      <h4>{item.title}</h4>
      <p>{agenda ? `Agenda: ${agenda.title}` : item.format}</p>
      <div className="meta-line">🗓️ {formatDate(item.postDate)} · {item.postTime || '-'}</div>
      <div className="progress-line"><span style={{ width: `${total ? (done / total) * 100 : 0}%` }} /></div>
      <small>Checklist: {done}/{total}</small>
      <div className="checklist-preview">
        {item.checklist?.slice(0, 3).map((check, index) => (
          <label key={check.label}>
            <input type="checkbox" checked={check.done} onChange={() => onChecklist(index)} />
            <span>{check.label}</span>
          </label>
        ))}
      </div>
      <div className="card-actions wrap">
        <select value={item.status} onChange={(e) => onStatus(e.target.value)}>
          {STATUSES.map((status) => <option key={status}>{status}</option>)}
        </select>
        <button className="ghost small" onClick={onEdit}>Edit</button>
        <button className="danger small" onClick={onDelete}>Hapus</button>
      </div>
    </article>
  );
}

function TemplateView({ data, setToast }) {
  const [query, setQuery] = React.useState('');
  const templates = data.templates.filter((tpl) => `${tpl.title} ${tpl.category} ${tpl.body}`.toLowerCase().includes(query.toLowerCase()));

  async function copyTemplate(body) {
    await navigator.clipboard.writeText(body);
    setToast('Template berhasil disalin.');
  }

  return (
    <section className="panel full">
      <div className="panel-header">
        <div>
          <h3>Template Caption Organisasi</h3>
          <p>Salin template lalu sesuaikan dengan data kegiatan.</p>
        </div>
        <input className="search-input" placeholder="Cari template..." value={query} onChange={(e) => setQuery(e.target.value)} />
      </div>
      <div className="template-grid">
        {templates.map((tpl) => (
          <article className="template-card" key={tpl.id}>
            <div className="card-topline">
              <StatusBadge status={tpl.category} />
            </div>
            <h3>{tpl.title}</h3>
            <pre>{tpl.body}</pre>
            <button className="primary small" onClick={() => copyTemplate(tpl.body)}>Salin Template</button>
          </article>
        ))}
      </div>
    </section>
  );
}

function ArchiveView({ data, setEditingContent }) {
  const archive = data.contents.filter((item) => ['Sudah Tayang', 'Arsip'].includes(item.status));
  return (
    <section className="panel full">
      <div className="panel-header">
        <div>
          <h3>Arsip Konten Tayang</h3>
          <p>Simpan riwayat konten, caption, dan link posting.</p>
        </div>
      </div>
      {archive.length ? (
        <div className="table-wrap">
          <table>
            <thead>
              <tr>
                <th>Tanggal</th>
                <th>Judul</th>
                <th>Platform</th>
                <th>Status</th>
                <th>Link</th>
                <th></th>
              </tr>
            </thead>
            <tbody>
              {archive.map((item) => (
                <tr key={item.id}>
                  <td>{formatDate(item.postDate)}</td>
                  <td>{item.title}</td>
                  <td>{item.platform}</td>
                  <td><StatusBadge status={item.status} /></td>
                  <td>{item.link ? <a href={item.link} target="_blank" rel="noreferrer">Buka</a> : '-'}</td>
                  <td><button className="ghost small" onClick={() => setEditingContent(item)}>Detail</button></td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      ) : <EmptyState title="Belum ada arsip" text="Konten yang berstatus Sudah Tayang atau Arsip akan tampil di sini." />}
    </section>
  );
}

function SettingsView({ data, updateData, exportJson, importJson }) {
  const [form, setForm] = React.useState(data.organization);
  function saveSettings(event) {
    event.preventDefault();
    updateData({ organization: form });
  }
  function resetDemo() {
    if (!confirm('Reset semua data lokal dan kembali ke data contoh?')) return;
    localStorage.removeItem(STORAGE_KEY);
    window.location.reload();
  }
  return (
    <section className="settings-grid">
      <form className="panel" onSubmit={saveSettings}>
        <div className="panel-header">
          <h3>Profil Organisasi</h3>
        </div>
        <label>Nama organisasi/aplikasi
          <input value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} />
        </label>
        <label>Tagline
          <input value={form.tagline} onChange={(e) => setForm({ ...form, tagline: e.target.value })} />
        </label>
        <label>Gaya bahasa
          <textarea rows="4" value={form.tone} onChange={(e) => setForm({ ...form, tone: e.target.value })} />
        </label>
        <label>Target audiens
          <textarea rows="4" value={form.target} onChange={(e) => setForm({ ...form, target: e.target.value })} />
        </label>
        <button className="primary">Simpan Pengaturan</button>
      </form>
      <div className="panel">
        <div className="panel-header">
          <h3>Backup Data Lokal</h3>
        </div>
        <p>Versi awal ini menyimpan data di browser. Gunakan export/import untuk memindahkan data sementara sebelum kita sambungkan ke Firebase.</p>
        <div className="button-row wrap">
          <button className="ghost" onClick={exportJson}>Export JSON</button>
          <label className="file-button">Import JSON<input type="file" accept="application/json" onChange={importJson} /></label>
          <button className="danger" onClick={resetDemo}>Reset Demo</button>
        </div>
      </div>
    </section>
  );
}

function AgendaMini({ agenda }) {
  return (
    <div className="mini-card">
      <strong>{agenda.title}</strong>
      <span>{formatDate(agenda.date)} · {agenda.time || '-'}</span>
      <small>{agenda.location}</small>
    </div>
  );
}

function ContentRow({ item, agenda, compact = false }) {
  return (
    <div className="content-row">
      <div>
        <strong>{item.title}</strong>
        {!compact && <span>{agenda ? agenda.title : item.format}</span>}
      </div>
      <div>
        <StatusBadge status={item.status} />
        <small>{item.platform} · {item.postTime}</small>
      </div>
    </div>
  );
}

function AgendaModal({ agenda, onClose, onSave }) {
  const [form, setForm] = React.useState({
    id: agenda.id || '',
    title: agenda.title || '',
    date: agenda.date || todayInput(),
    time: agenda.time || '08:00',
    location: agenda.location || '',
    category: agenda.category || 'Kegiatan Rutin',
    owner: agenda.owner || 'Tim Media',
    status: agenda.status || 'Akan Berlangsung',
    description: agenda.description || '',
    createdAt: agenda.createdAt || ''
  });

  function submit(event) {
    event.preventDefault();
    if (!form.title.trim()) return alert('Judul agenda wajib diisi.');
    onSave(form);
  }

  return (
    <div className="modal-backdrop">
      <form className="modal" onSubmit={submit}>
        <div className="modal-header">
          <h2>{form.id ? 'Edit Agenda' : 'Agenda Baru'}</h2>
          <button type="button" className="ghost small" onClick={onClose}>Tutup</button>
        </div>
        <div className="form-grid">
          <label>Nama agenda<input value={form.title} onChange={(e) => setForm({ ...form, title: e.target.value })} /></label>
          <label>Kategori<input value={form.category} onChange={(e) => setForm({ ...form, category: e.target.value })} /></label>
          <label>Tanggal<input type="date" value={form.date} onChange={(e) => setForm({ ...form, date: e.target.value })} /></label>
          <label>Jam<input type="time" value={form.time} onChange={(e) => setForm({ ...form, time: e.target.value })} /></label>
          <label>Lokasi<input value={form.location} onChange={(e) => setForm({ ...form, location: e.target.value })} /></label>
          <label>Penanggung jawab<input value={form.owner} onChange={(e) => setForm({ ...form, owner: e.target.value })} /></label>
          <label>Status<select value={form.status} onChange={(e) => setForm({ ...form, status: e.target.value })}>
            {['Rencana', 'Akan Berlangsung', 'Berlangsung', 'Selesai', 'Batal'].map((s) => <option key={s}>{s}</option>)}
          </select></label>
          <label className="span-2">Deskripsi<textarea rows="4" value={form.description} onChange={(e) => setForm({ ...form, description: e.target.value })} /></label>
        </div>
        <button className="primary full-width">Simpan Agenda</button>
      </form>
    </div>
  );
}

function ContentModal({ content, agendas, onClose, onSave }) {
  const [form, setForm] = React.useState({
    id: content.id || '',
    title: content.title || '',
    agendaId: content.agendaId || agendas[0]?.id || '',
    platform: content.platform || 'Instagram Feed',
    format: content.format || 'Caption + Foto',
    postDate: content.postDate || todayInput(),
    postTime: content.postTime || '08:00',
    status: content.status || 'Ide',
    owner: content.owner || 'Tim Media',
    hook: content.hook || '',
    caption: content.caption || '',
    hashtags: content.hashtags || '',
    link: content.link || '',
    notes: content.notes || '',
    checklist: content.checklist || defaultChecklist(content.format || 'Caption + Foto'),
    createdAt: content.createdAt || ''
  });

  function setChecklistLabel(index, label) {
    setForm({ ...form, checklist: form.checklist.map((item, i) => (i === index ? { ...item, label } : item)) });
  }

  function addChecklist() {
    setForm({ ...form, checklist: [...form.checklist, { label: 'Checklist baru', done: false }] });
  }

  function removeChecklist(index) {
    setForm({ ...form, checklist: form.checklist.filter((_, i) => i !== index) });
  }

  function submit(event) {
    event.preventDefault();
    if (!form.title.trim()) return alert('Judul konten wajib diisi.');
    onSave(form);
  }

  return (
    <div className="modal-backdrop">
      <form className="modal large" onSubmit={submit}>
        <div className="modal-header">
          <h2>{form.id ? 'Edit Konten' : 'Konten Baru'}</h2>
          <button type="button" className="ghost small" onClick={onClose}>Tutup</button>
        </div>
        <div className="form-grid">
          <label className="span-2">Judul konten<input value={form.title} onChange={(e) => setForm({ ...form, title: e.target.value })} /></label>
          <label>Agenda terkait<select value={form.agendaId} onChange={(e) => setForm({ ...form, agendaId: e.target.value })}>
            <option value="">Tanpa agenda</option>
            {agendas.map((agenda) => <option key={agenda.id} value={agenda.id}>{agenda.title}</option>)}
          </select></label>
          <label>Platform<select value={form.platform} onChange={(e) => setForm({ ...form, platform: e.target.value })}>{PLATFORMS.map((p) => <option key={p}>{p}</option>)}</select></label>
          <label>Format<select value={form.format} onChange={(e) => setForm({ ...form, format: e.target.value, checklist: defaultChecklist(e.target.value) })}>{FORMATS.map((f) => <option key={f}>{f}</option>)}</select></label>
          <label>Status<select value={form.status} onChange={(e) => setForm({ ...form, status: e.target.value })}>{STATUSES.map((s) => <option key={s}>{s}</option>)}</select></label>
          <label>Tanggal posting<input type="date" value={form.postDate} onChange={(e) => setForm({ ...form, postDate: e.target.value })} /></label>
          <label>Jam posting<input type="time" value={form.postTime} onChange={(e) => setForm({ ...form, postTime: e.target.value })} /></label>
          <label>Penanggung jawab<input value={form.owner} onChange={(e) => setForm({ ...form, owner: e.target.value })} /></label>
          <label className="span-2">Hook pembuka<input value={form.hook} onChange={(e) => setForm({ ...form, hook: e.target.value })} /></label>
          <label className="span-2">Caption / Naskah<textarea rows="7" value={form.caption} onChange={(e) => setForm({ ...form, caption: e.target.value })} /></label>
          <label>Hashtag<input value={form.hashtags} onChange={(e) => setForm({ ...form, hashtags: e.target.value })} /></label>
          <label>Link posting<input value={form.link} onChange={(e) => setForm({ ...form, link: e.target.value })} placeholder="https://..." /></label>
          <label className="span-2">Catatan produksi<textarea rows="3" value={form.notes} onChange={(e) => setForm({ ...form, notes: e.target.value })} /></label>
        </div>
        <div className="checklist-editor">
          <div className="panel-header compact"><h3>Checklist Produksi</h3><button type="button" className="ghost small" onClick={addChecklist}>+ Checklist</button></div>
          {form.checklist.map((item, index) => (
            <div className="checklist-edit-row" key={`${item.label}-${index}`}>
              <input type="checkbox" checked={item.done} onChange={() => setForm({ ...form, checklist: form.checklist.map((check, i) => i === index ? { ...check, done: !check.done } : check) })} />
              <input value={item.label} onChange={(e) => setChecklistLabel(index, e.target.value)} />
              <button type="button" className="danger small" onClick={() => removeChecklist(index)}>Hapus</button>
            </div>
          ))}
        </div>
        <button className="primary full-width">Simpan Konten</button>
      </form>
    </div>
  );
}

export default App;
