import { useState } from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

import { useTranslation, Trans } from 'react-i18next';

const Home = () => {
  const { t } = useTranslation();
  const testimonials = t('home.testimonials.items', { returnObjects: true });
  const [currentTestimonial, setCurrentTestimonial] = useState(0);
  const { isAuthenticated } = useAuth();

  return (
    <div className="max-w-6xl mx-auto">
      {/* Hero */}
      <section className="text-center md:text-left md:flex md:items-center md:justify-between gap-10 mb-16">
        <div className="md:w-1/2">
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-white mb-4 leading-tight">
            <Trans
              i18nKey="home.hero.title"
              components={[<span className="text-primary-600 block sm:inline" key="0" />]}
            />
          </h1>
          <p className="text-lg md:text-xl text-gray-600 dark:text-white mb-6">
            {t('home.hero.description')}
          </p>
          <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center md:justify-start">
            {!isAuthenticated ? (
              <>
                <Link to="/register" className="btn btn-primary text-base sm:text-lg px-6 sm:px-8 py-3">
                  {t('home.hero.startNow')}
                </Link>
                <Link to="/listings" className="btn btn-outline text-base sm:text-lg px-6 sm:px-8 py-3">
                  {t('home.hero.viewListings')}
                </Link>
              </>
            ) : (
              <>
                <Link to="/create-listing" className="btn btn-primary text-base sm:text-lg px-6 sm:px-8 py-3">
                  {t('home.hero.postListing')}
                </Link>
                <Link to="/listings" className="btn btn-outline text-base sm:text-lg px-6 sm:px-8 py-3">
                  {t('home.hero.allListings')}
                </Link>
              </>
            )}
          </div>
          <div className="mt-6 flex flex-wrap gap-4 justify-center md:justify-start text-sm text-gray-600 dark:text-white">
            <span className="px-3 py-1 bg-white/70 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-full">
              ✅ {t('home.hero.tags.studentsOnly')}
            </span>
            <span className="px-3 py-1 bg-white/70 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-full">
              ✅ {t('home.hero.tags.ratingSystem')}
            </span>
            <span className="px-3 py-1 bg-white/70 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-full">
              ✅ {t('home.hero.tags.secureMessaging')}
            </span>
          </div>
        </div>

        <div className="hidden md:block md:w-1/2">
          <div className="bg-white dark:bg-gray-800 border-blue-100 dark:border-gray-700 p-6">
            <h2 className="text-lg font-semibold mb-3 text-gray-900 dark:text-white">{t('home.categories.title')}</h2>
            <div className="grid grid-cols-2 gap-3 text-sm">
              {t('home.categories.items', { returnObjects: true }).map((category, index) => (
                <div key={index} className={`p-3 rounded-lg text-left ${index === 0 ? 'bg-blue-50 dark:bg-blue-900/20' :
                  index === 1 ? 'bg-indigo-50 dark:bg-indigo-900/20' :
                    index === 2 ? 'bg-cyan-50 dark:bg-cyan-900/20' :
                      'bg-emerald-50 dark:bg-emerald-900/20'
                  }`}>
                  <p className="font-medium text-gray-900 dark:text-white">{category.title}</p>
                  <p className="text-gray-600 dark:text-white mt-1">{category.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Motivasyonumuz */}
      <section className="mb-16">
        <h2 className="text-2xl md:text-3xl font-bold text-gray-900 dark:text-white text-center mb-6">
          {t('home.motivation.title')}
        </h2>
        <div className="space-y-4">
          <div className="card text-left">
            <p className="text-gray-700 dark:text-white text-base md:text-lg leading-relaxed mb-3">
              {t('home.motivation.p1')}
            </p>
            <p className="text-gray-700 dark:text-white text-base md:text-lg leading-relaxed">
              {t('home.motivation.p2')}
            </p>
          </div>
        </div>
      </section>

      {/* 3 adım nasıl çalışır */}
      <section className="mb-16">
        <h2 className="text-2xl md:text-3xl font-bold text-gray-900 dark:text-white text-center mb-6">
          {t('home.howItWorks.title')}
        </h2>
        <div className="space-y-4">
          <Link
            to="/profile"
            className="block card hover:shadow-lg hover:-translate-y-0.5 transition-transform text-left"
          >
            <div className="flex items-start gap-4">
              <div className="text-3xl">1️⃣</div>
              <div>
                <h3 className="text-xl font-semibold mb-1">{t('home.howItWorks.steps.0.title')}</h3>
                <p className="text-gray-600 dark:text-white">
                  {t('home.howItWorks.steps.0.desc')}
                </p>
              </div>
            </div>
          </Link>

          <Link
            to="/listings"
            className="block card hover:shadow-lg hover:-translate-y-0.5 transition-transform text-left"
          >
            <div className="flex items-start gap-4">
              <div className="text-3xl">2️⃣</div>
              <div>
                <h3 className="text-xl font-semibold mb-1">{t('home.howItWorks.steps.1.title')}</h3>
                <p className="text-gray-600 dark:text-white">
                  {t('home.howItWorks.steps.1.desc')}
                </p>
              </div>
            </div>
          </Link>

          <Link
            to="/messages"
            className="block card hover:shadow-lg hover:-translate-y-0.5 transition-transform text-left"
          >
            <div className="flex items-start gap-4">
              <div className="text-3xl">3️⃣</div>
              <div>
                <h3 className="text-xl font-semibold mb-1">{t('home.howItWorks.steps.2.title')}</h3>
                <p className="text-gray-600 dark:text-white">
                  {t('home.howItWorks.steps.2.desc')}
                </p>
              </div>
            </div>
          </Link>
        </div>
      </section>

      {/* Öne çıkan faydalar */}
      <section className="mb-16">
        <div className="grid md:grid-cols-3 gap-6">
          <div className="card text-left">
            <div className="text-3xl mb-3">🎓</div>
            <h3 className="text-xl font-semibold mb-2">{t('home.benefits.0.title')}</h3>
            <p className="text-gray-600 dark:text-white">
              {t('home.benefits.0.desc')}
            </p>
          </div>
          <div className="card text-left">
            <div className="text-3xl mb-3">💼</div>
            <h3 className="text-xl font-semibold mb-2">{t('home.benefits.1.title')}</h3>
            <p className="text-gray-600 dark:text-white">
              {t('home.benefits.1.desc')}
            </p>
          </div>
          <div className="card text-left">
            <div className="text-3xl mb-3">⭐</div>
            <h3 className="text-xl font-semibold mb-2">{t('home.benefits.2.title')}</h3>
            <p className="text-gray-600 dark:text-white">
              {t('home.benefits.2.desc')}
            </p>
          </div>
        </div>
      </section>

      {/* Kullanıcı yorumları */}
      <section className="mb-16">
        <h2 className="text-2xl md:text-3xl font-bold text-gray-900 dark:text-white text-center mb-6">
          {t('home.testimonials.title')}
        </h2>
        <div className="relative max-w-5xl mx-auto">
          <div className="overflow-hidden rounded-2xl border border-blue-100 bg-white dark:bg-gray-800 shadow-sm">
            <div
              className="flex transition-transform duration-500 ease-out"
              style={{ transform: `translateX(-${currentTestimonial * 100}%)` }}
            >
              {testimonials.map((t, index) => (
                <div
                  key={index}
                  className="w-full flex-shrink-0 px-6 py-8 flex flex-col justify-between min-h-[180px]"
                >
                  <p className="text-gray-700 dark:text-white text-base md:text-lg mb-4 leading-relaxed">
                    “{t.text}”
                  </p>
                  <p className="text-sm font-medium text-gray-900 dark:text-white">{t.name}</p>
                </div>
              ))}
            </div>
          </div>

          <button
            type="button"
            onClick={() =>
              setCurrentTestimonial(
                (prev) => (prev - 1 + testimonials.length) % testimonials.length
              )
            }
            className="hidden sm:flex items-center justify-center absolute -left-4 top-1/2 -translate-y-1/2 w-8 h-8 rounded-full bg-white dark:bg-gray-700 border border-gray-200 dark:border-gray-600 shadow-sm hover:bg-gray-50"
          >
            ‹
          </button>
          <button
            type="button"
            onClick={() =>
              setCurrentTestimonial((prev) => (prev + 1) % testimonials.length)
            }
            className="hidden sm:flex items-center justify-center absolute -right-4 top-1/2 -translate-y-1/2 w-8 h-8 rounded-full bg-white dark:bg-gray-700 border border-gray-200 dark:border-gray-600 shadow-sm hover:bg-gray-50"
          >
            ›
          </button>

          <div className="flex justify-center gap-2 mt-4">
            {testimonials.map((_, index) => (
              <button
                key={index}
                type="button"
                onClick={() => setCurrentTestimonial(index)}
                className={`w-2.5 h-2.5 rounded-full transition-colors ${index === currentTestimonial ? 'bg-primary-600' : 'bg-gray-300'
                  }`}
              />
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;

