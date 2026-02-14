const Contact = () => {
  return (
    <div className="max-w-5xl mx-auto">
      {/* Hero Section */}
      <div className="text-center mb-12">
        <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-primary-100 mb-4">
          <svg className="w-8 h-8 text-primary-600" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M21.75 6.75v10.5a2.25 2.25 0 01-2.25 2.25h-15a2.25 2.25 0 01-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0019.5 4.5h-15a2.25 2.25 0 00-2.25 2.25m19.5 0v.243a2.25 2.25 0 01-1.07 1.916l-7.5 4.615a2.25 2.25 0 01-2.36 0L3.32 8.91a2.25 2.25 0 01-1.07-1.916V6.75" />
          </svg>
        </div>
        <h1 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-3">
          Bizimle İletişime Geçin
        </h1>
        <p className="text-lg text-gray-500 dark:text-white max-w-2xl mx-auto">
          Görüş, öneri, iş birliği talepleri veya yaşadığınız herhangi bir sorun için
          bizimle iletişime geçebilirsiniz. Geri bildirimleriniz bizim için çok değerli.
        </p>
      </div>

      {/* Contact Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
        {/* E-posta */}
        <a
          href="mailto:destek@uni-is.com"
          className="group relative overflow-hidden rounded-2xl bg-gradient-to-br from-primary-500 to-primary-700 p-6 text-white transition-all duration-300 hover:shadow-xl hover:shadow-primary-200 hover:-translate-y-1"
        >
          <div className="absolute top-0 right-0 w-32 h-32 bg-white/10 rounded-full -translate-y-1/2 translate-x-1/2" />
          <div className="absolute bottom-0 left-0 w-24 h-24 bg-white/5 rounded-full translate-y-1/2 -translate-x-1/2" />
          <div className="relative">
            <div className="w-12 h-12 rounded-xl bg-white/20 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300">
              <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
              </svg>
            </div>
            <h3 className="text-lg font-bold mb-1">Genel Sorular</h3>
            <p className="text-primary-100 text-sm mb-3">Sorularınız ve önerileriniz için</p>
            <span className="inline-flex items-center gap-1 text-sm font-medium border-b border-white/50 pb-0.5 group-hover:border-white transition-colors">
              destek@uni-is.com
              <svg className="w-4 h-4 group-hover:translate-x-1 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M17 8l4 4m0 0l-4 4m4-4H3" />
              </svg>
            </span>
          </div>
        </a>

        {/* İş Birliği */}
        <a
          href="mailto:isbirligi@uni-is.com"
          className="group relative overflow-hidden rounded-2xl bg-gradient-to-br from-green-500 to-emerald-700 p-6 text-white transition-all duration-300 hover:shadow-xl hover:shadow-green-200 hover:-translate-y-1"
        >
          <div className="absolute top-0 right-0 w-32 h-32 bg-white/10 rounded-full -translate-y-1/2 translate-x-1/2" />
          <div className="absolute bottom-0 left-0 w-24 h-24 bg-white/5 rounded-full translate-y-1/2 -translate-x-1/2" />
          <div className="relative">
            <div className="w-12 h-12 rounded-xl bg-white/20 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300">
              <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0z" />
              </svg>
            </div>
            <h3 className="text-lg font-bold mb-1">İş Birliği</h3>
            <p className="text-green-100 text-sm mb-3">Kulüpler ve topluluklar için</p>
            <span className="inline-flex items-center gap-1 text-sm font-medium border-b border-white/50 pb-0.5 group-hover:border-white transition-colors">
              isbirligi@uni-is.com
              <svg className="w-4 h-4 group-hover:translate-x-1 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M17 8l4 4m0 0l-4 4m4-4H3" />
              </svg>
            </span>
          </div>
        </a>

        {/* Destek */}
        <div className="group relative overflow-hidden rounded-2xl bg-gradient-to-br from-purple-500 to-violet-700 p-6 text-white transition-all duration-300 hover:shadow-xl hover:shadow-purple-200 hover:-translate-y-1">
          <div className="absolute top-0 right-0 w-32 h-32 bg-white/10 rounded-full -translate-y-1/2 translate-x-1/2" />
          <div className="absolute bottom-0 left-0 w-24 h-24 bg-white/5 rounded-full translate-y-1/2 -translate-x-1/2" />
          <div className="relative">
            <div className="w-12 h-12 rounded-xl bg-white/20 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300">
              <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
              </svg>
            </div>
            <h3 className="text-lg font-bold mb-1">Destek & Geri Bildirim</h3>
            <p className="text-purple-100 text-sm mb-3">Hata ve özellik istekleri</p>
            <span className="text-sm text-purple-200">
              Kısa bir açıklama ile bize ulaşın, en kısa sürede dönüş yapalım.
            </span>
          </div>
        </div>
      </div>

      {/* FAQ / Info Section */}
      <div className="rounded-2xl bg-white dark:bg-gray-800 border border-gray-200 overflow-hidden">
        <div className="grid grid-cols-1 md:grid-cols-2">
          {/* Left: FAQ */}
          <div className="p-8 space-y-6">
            <h2 className="text-xl font-bold text-gray-900 dark:text-white flex items-center gap-2">
              <svg className="w-5 h-5 text-primary-600" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M8.228 9c.549-1.165 2.03-2 3.772-2 2.21 0 4 1.343 4 3 0 1.4-1.278 2.575-3.006 2.907-.542.104-.994.54-.994 1.093m0 3h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              Sıkça Sorulan Sorular
            </h2>

            <div className="space-y-4">
              <div>
                <h3 className="font-semibold text-gray-900 dark:text-white text-sm mb-1">Ne kadar sürede dönüş yapıyorsunuz?</h3>
                <p className="text-sm text-gray-500 dark:text-white">Genellikle 24-48 saat içerisinde tüm mesajlara yanıt vermeye çalışıyoruz.</p>
              </div>
              <div className="border-t border-gray-100 pt-4">
                <h3 className="font-semibold text-gray-900 dark:text-white text-sm mb-1">Platformda bir hata buldum, ne yapmalıyım?</h3>
                <p className="text-sm text-gray-500 dark:text-white">Hatanın detaylı açıklamasını destek@uni-is.com adresine göndermeniz yeterli.</p>
              </div>
              <div className="border-t border-gray-100 pt-4">
                <h3 className="font-semibold text-gray-900 dark:text-white text-sm mb-1">Yeni özellik önerebilir miyim?</h3>
                <p className="text-sm text-gray-500 dark:text-white">Elbette! Tüm önerilerinizi memnuniyetle karşılıyoruz.</p>
              </div>
            </div>
          </div>

          {/* Right: Status & Info */}
          <div className="p-8 bg-gray-50 dark:bg-gray-900 border-t md:border-t-0 md:border-l border-gray-200 flex flex-col justify-between">
            <div>
              <h2 className="text-xl font-bold text-gray-900 dark:text-white flex items-center gap-2 mb-4">
                <svg className="w-5 h-5 text-primary-600" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                Bilgilendirme
              </h2>
              <p className="text-sm text-gray-600 dark:text-white leading-relaxed mb-4">
                Şu an için yalnızca e-posta üzerinden destek sağlıyoruz. Platform geliştikçe canlı destek
                ve topluluk kanalları gibi yeni iletişim yöntemleri de eklemeyi planlıyoruz.
              </p>
            </div>

            <div className="flex items-center gap-3 p-3 rounded-xl bg-green-50 border border-green-100">
              <div className="relative flex-shrink-0">
                <span className="flex h-3 w-3">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-3 w-3 bg-green-500"></span>
                </span>
              </div>
              <div>
                <p className="text-sm font-medium text-green-800">Platform Aktif</p>
                <p className="text-xs text-green-600">Tüm sistemler çalışıyor</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Contact;
