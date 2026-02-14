import { useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import { Link } from 'react-router-dom';
import { listingService } from '../services/listingService';
import LoadingSpinner from '../components/shared/LoadingSpinner';

import { useTranslation } from 'react-i18next';

const Listings = () => {
  const { t } = useTranslation();
  const categories = [
    { value: '', label: t('listings.categories.all') },
    { value: 'ders-verme', label: t('listings.categories.tutoring') },
    { value: 'yazılım', label: t('listings.categories.software') },
    { value: 'tasarım', label: t('listings.categories.design') },
    { value: 'dil', label: t('listings.categories.language') },
    { value: 'müzik', label: t('listings.categories.music') },
    { value: 'spor', label: t('listings.categories.sports') },
    { value: 'diğer', label: t('listings.categories.other') },
  ];
  const [category, setCategory] = useState('');
  const [search, setSearch] = useState('');
  const [location, setLocation] = useState('');

  const { data: listings, isLoading } = useQuery({
    queryKey: ['listings', category, search, location],
    queryFn: () =>
      listingService.getListings({
        category,
        search,
        location,
        status: 'active',
      }),
  });

  const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000';

  return (
    <div className="max-w-6xl mx-auto">
      <h1 className="text-3xl font-bold mb-6">{t('listings.title')}</h1>

      <div className="card mb-6">
        <div className="flex flex-col md:flex-row gap-4">
          <input
            type="text"
            placeholder={t('listings.searchPlaceholder')}
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="input flex-1"
          />
          <input
            type="text"
            placeholder={t('listings.locationPlaceholder')}
            value={location}
            onChange={(e) => setLocation(e.target.value)}
            className="input md:w-56"
          />
          <select
            value={category}
            onChange={(e) => setCategory(e.target.value)}
            className="input md:w-48"
          >
            {categories.map((cat) => (
              <option key={cat.value} value={cat.value}>
                {cat.label}
              </option>
            ))}
          </select>
        </div>
      </div>

      {isLoading ? (
        <LoadingSpinner />
      ) : listings && listings.length > 0 ? (
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {listings.map((listing) => (
            <Link
              key={listing._id}
              to={`/listings/${listing._id}`}
              className="group relative bg-white dark:bg-gray-800 rounded-2xl shadow-sm border border-gray-100 dark:border-gray-700 hover:shadow-xl hover:-translate-y-1 transition-all duration-300 overflow-hidden flex flex-col h-full"
            >
              {/* Gradient Top Bar */}
              <div className="h-2 bg-gradient-to-r from-primary-400 to-primary-600 w-full" />

              <div className="p-6 flex flex-col flex-1">
                <div className="flex items-start justify-between mb-4">
                  <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-primary-50 dark:bg-primary-900/30 text-primary-700 dark:text-primary-300 border border-primary-100 dark:border-primary-800">
                    {categories.find((c) => c.value === listing.category)?.label || listing.category}
                  </span>
                  {listing.price && (
                    <span className="text-lg font-bold text-gray-900 dark:text-white">
                      {listing.price} <span className="text-sm font-normal text-gray-500 dark:text-gray-400">{t('listings.price')}</span>
                    </span>
                  )}
                </div>

                <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2 group-hover:text-primary-600 dark:group-hover:text-primary-400 transition-colors line-clamp-1">
                  {listing.title}
                </h3>

                <p className="text-gray-600 dark:text-gray-300 text-sm leading-relaxed mb-6 line-clamp-3">
                  {listing.description}
                </p>

                <div className="mt-auto pt-4 border-t border-gray-100 dark:border-gray-700 flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    {listing.userId?.profileImage ? (
                      <img
                        src={`${API_URL}${user.profileImage}`}
                        alt={listing.userId.name}
                        className="w-9 h-9 rounded-full object-cover ring-2 ring-white dark:ring-gray-700"
                      />
                    ) : (
                      <div className="w-9 h-9 rounded-full bg-gradient-to-br from-primary-100 to-primary-200 dark:from-gray-700 dark:to-gray-600 flex items-center justify-center text-primary-700 dark:text-white text-sm font-bold shadow-inner">
                        {listing.userId?.name?.charAt(0).toUpperCase()}
                      </div>
                    )}
                    <div className="flex flex-col">
                      <span className="text-sm font-semibold text-gray-900 dark:text-white">
                        {listing.userId?.name}
                      </span>
                      <span className="text-xs text-gray-500 dark:text-gray-400">
                        {listing.userId?.university || t('listings.student')}
                      </span>
                    </div>
                  </div>

                  <div className="w-8 h-8 rounded-full bg-gray-50 dark:bg-gray-700 flex items-center justify-center text-gray-400 dark:text-gray-300 group-hover:bg-primary-50 dark:group-hover:bg-primary-900/30 group-hover:text-primary-600 dark:group-hover:text-primary-400 transition-colors">
                    <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                    </svg>
                  </div>
                </div>
              </div>
            </Link>
          ))}
        </div>
      ) : (
        <div className="card text-center py-12">
          <p className="text-gray-500 dark:text-white">{t('listings.noListings')}</p>
        </div>
      )}
    </div>
  );
};

export default Listings;

