import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { useTheme } from '../../context/ThemeContext';
import { useTranslation } from 'react-i18next';

const Navbar = () => {
  const { isAuthenticated, user, logout } = useAuth();
  const { isDark, toggleTheme } = useTheme();
  const { t, i18n } = useTranslation();
  const navigate = useNavigate();

  const toggleLanguage = () => {
    i18n.changeLanguage(i18n.language === 'en' ? 'tr' : 'en');
  };

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000';

  return (
    <nav className="bg-white/90 dark:bg-gray-800/90 backdrop-blur-sm shadow-sm border-b border-gray-200 dark:border-gray-700">
      <div className="max-w-6xl mx-auto px-3 sm:px-4">
        <div className="flex items-center justify-between h-16">
          <Link to="/" className="text-2xl font-bold text-primary-600 dark:text-primary-400 tracking-tight">
            {t('navbar.brand')}
          </Link>

          <div className="flex items-center gap-3 sm:gap-4">
            {/* Theme Toggle Button */}
            <button
              onClick={toggleTheme}
              className="p-2 rounded-lg text-gray-700 dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
              aria-label="Toggle theme"
            >
              {isDark ? (
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z" />
                </svg>
              ) : (
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z" />
                </svg>
              )}
            </button>

            {/* Language Toggle Button */}
            <button
              onClick={toggleLanguage}
              className="p-2 rounded-lg text-gray-700 dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors font-medium w-9 h-9 flex items-center justify-center"
              aria-label={t('navbar.toggleLanguage')}
            >
              {i18n.language === 'en' ? 'TR' : 'EN'}
            </button>

            <Link
              to="/listings"
              className="text-gray-700 dark:text-white hover:text-primary-600 dark:hover:text-primary-400 transition-colors"
            >
              {t('navbar.listings')}
            </Link>

            {isAuthenticated ? (
              <>
                <Link
                  to="/create-listing"
                  className="btn btn-primary"
                >
                  {t('navbar.createListing')}
                </Link>
                <Link
                  to="/messages"
                  className="text-gray-700 dark:text-white hover:text-primary-600 dark:hover:text-primary-400 transition-colors relative"
                >
                  {t('navbar.messages')}
                </Link>
                <Link
                  to="/profile"
                  className="flex items-center gap-2 text-gray-700 dark:text-white hover:text-primary-600 dark:hover:text-primary-400 transition-colors"
                >
                  {user?.profileImage ? (
                    <img
                      src={`${API_URL}${user.profileImage}`}
                      alt={user.name}
                      className="w-8 h-8 rounded-full object-cover"
                    />
                  ) : (
                    <div className="w-8 h-8 rounded-full bg-primary-100 dark:bg-primary-900 flex items-center justify-center text-primary-600 dark:text-primary-400 font-medium">
                      {user?.name?.charAt(0).toUpperCase()}
                    </div>
                  )}
                  <span>{user?.name}</span>
                </Link>
                <button
                  onClick={handleLogout}
                  className="btn btn-outline"
                >
                  {t('navbar.logout')}
                </button>
              </>
            ) : (
              <>
                <Link to="/login" className="btn btn-outline">
                  {t('navbar.login')}
                </Link>
                <Link to="/register" className="btn btn-primary">
                  {t('navbar.register')}
                </Link>
              </>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;

