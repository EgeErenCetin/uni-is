const SectionCard = ({ icon, title, children, accentColor }) => (
  <div className="card text-left mb-8">
    <div className="flex items-center gap-3 mb-4">
      <div className={`p-2 rounded-lg ${accentColor}`}>
        {icon}
      </div>
      <h2 className="text-xl md:text-2xl font-bold text-gray-900 dark:text-white">{title}</h2>
    </div>
    {children}
  </div>
);

const ServiceItem = ({ emoji, title, description }) => (
  <div className="flex gap-4 p-4 rounded-xl bg-gray-50 dark:bg-gray-800 hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors">
    <div className="flex-shrink-0 text-xl mt-0.5">{emoji}</div>
    <div>
      <h3 className="font-semibold text-gray-900 dark:text-white mb-1">{title}</h3>
      <p className="text-sm text-gray-600 dark:text-white leading-relaxed">{description}</p>
    </div>
  </div>
);

const InfoIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" className="w-6 h-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
  </svg>
);

const UsersIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" className="w-6 h-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
  </svg>
);

const BriefcaseIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" className="w-6 h-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2 2v2m4 6h.01M5 20h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
  </svg>
);

const About = () => {
  const services = [
    {
      emoji: '📚',
      title: 'Ders Desteği & Özel Ders',
      description: 'Matematik, fizik, kimya, dil dersleri ve daha fazlasında birebir veya grup halinde ders desteği alın ya da verin.',
    },
    {
      emoji: '💻',
      title: 'Yazılım & Programlama',
      description: 'Web geliştirme, mobil uygulama, veri analizi, yapay zekâ projeleri ve ödev yardımı gibi konularda destek.',
    },
    {
      emoji: '🎨',
      title: 'Tasarım & Görsel İçerik',
      description: 'Logo tasarımı, sunum hazırlama, poster, UI/UX tasarımı ve grafik çalışmaları.',
    },
    {
      emoji: '🌍',
      title: 'Çeviri & Redaksiyon',
      description: 'Akademik metin çevirisi, makale redaksiyonu, özet yazımı ve dil düzeltme hizmetleri.',
    },
    {
      emoji: '🧭',
      title: 'Danışmanlık & Mentorluk',
      description: 'Kariyer rehberliği, staj tavsiyeleri, bölüm seçimi ve akademik planlama konularında deneyim paylaşımı.',
    },
    {
      emoji: '🔧',
      title: 'Diğer Hizmetler',
      description: 'Fotoğrafçılık, video düzenleme, müzik prodüksiyon, etkinlik organizasyonu ve daha pek çok alanda destek.',
    },
  ];

  return (
    <div className="max-w-4xl mx-auto">
      <h1 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-8">
        Hakkımızda
      </h1>

      {/* Üni-İş Nedir? */}
      <SectionCard icon={<InfoIcon />} title="Üni-İş Nedir?" accentColor="bg-primary-600">
        <div className="space-y-3">
          <p className="text-gray-700 dark:text-white leading-relaxed">
            <strong>Üni-İş</strong>, üniversite öğrencilerinin yeteneklerini ve ihtiyaçlarını tek bir platformda
            buluşturmak için geliştirilen bir web uygulamasıdır. Geleneksel ilan panoları, WhatsApp grupları veya
            karmaşık sosyal medya gönderileri yerine; filtrelenebilir ilanlar, detaylı profiller ve puanlama
            sistemiyle daha şeffaf ve güvenilir bir deneyim sunuyoruz.
          </p>
          <p className="text-gray-700 dark:text-white leading-relaxed">
            Platformun odağında, öğrenci topluluklarının kendi içinde üretebilmesi ve dayanışma kültürünü dijital
            dünyaya taşıması var. Üni-İş, üniversite yıllarını sadece akademik bir süreç olmaktan çıkarıp; gerçek
            projeler, işbirlikleri ve sosyal bağlantılarla zenginleştirmeyi amaçlıyor.
          </p>
        </div>
      </SectionCard>

      {/* Kimler Kullanabilir? */}
      <SectionCard icon={<UsersIcon />} title="Kimler Kullanabilir?" accentColor="bg-green-600">
        <div className="space-y-3">
          <p className="text-gray-700 dark:text-white leading-relaxed">
            Üni-İş, tüm üniversite öğrencilerine açık bir platformdur. İster bir yeteneğinizi paylaşarak
            gelir elde etmek isteyin, ister bir konuda desteğe ihtiyaç duyun — platformumuza kayıt olarak
            hemen kullanmaya başlayabilirsiniz.
          </p>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3 mt-4">
            <div className="flex items-start gap-3 p-3 bg-green-50 dark:bg-green-900/20 rounded-lg">
              <span className="text-lg mt-0.5">🎓</span>
              <div>
                <p className="font-medium text-gray-900 dark:text-white">Hizmet Verenler</p>
                <p className="text-sm text-gray-600 dark:text-white">Yeteneklerini sergilemek ve diğer öğrencilere destek olmak isteyen öğrenciler.</p>
              </div>
            </div>
            <div className="flex items-start gap-3 p-3 bg-blue-50 dark:bg-blue-900/20 rounded-lg">
              <span className="text-lg mt-0.5">🔍</span>
              <div>
                <p className="font-medium text-gray-900 dark:text-white">Hizmet Alanlar</p>
                <p className="text-sm text-gray-600 dark:text-white">Ders desteği, proje yardımı veya herhangi bir konuda yardım arayan öğrenciler.</p>
              </div>
            </div>
          </div>
          <p className="text-sm text-gray-500 dark:text-white mt-2 italic">
            Henüz yolun başındayız — geri bildirimlerinizle birlikte sürekli gelişen, üniversitelilerin
            ihtiyaçlarına göre şekillenen bir ekosistem kurmak istiyoruz.
          </p>
        </div>
      </SectionCard>

      {/* Alınabilecek Hizmetler */}
      <SectionCard icon={<BriefcaseIcon />} title="Alınabilecek Hizmetler" accentColor="bg-purple-600">
        <p className="text-gray-700 dark:text-white leading-relaxed mb-4">
          Üni-İş üzerinden birçok farklı kategoride hizmet alabilir veya verebilirsiniz:
        </p>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
          {services.map((service, index) => (
            <ServiceItem key={index} {...service} />
          ))}
        </div>
        <p className="text-sm text-gray-500 dark:text-white mt-4 italic">
          Bu kategoriler yalnızca bir başlangıç — ilan oluştururken kendi alanınızı belirleyebilirsiniz.
        </p>
      </SectionCard>
    </div>
  );
};

export default About;
