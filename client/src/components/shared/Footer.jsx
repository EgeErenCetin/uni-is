import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';

const Footer = () => {
  const { t } = useTranslation();
  return (
    <footer className="border-t border-gray-200 dark:border-gray-700 bg-white/80 dark:bg-gray-900 backdrop-blur-sm">
      <div className="max-w-6xl mx-auto px-4 py-6 flex flex-col sm:flex-row items-center justify-between gap-3 text-sm text-gray-600 dark:text-white">
        <p className="text-center sm:text-left">
          {t('footer.rights', { year: new Date().getFullYear() })}
        </p>
        <div className="flex items-center gap-4">
          <Link
            to="/about"
            className="hover:text-primary-600 transition-colors"
          >
            {t('footer.about')}
          </Link>
          <Link
            to="/contact"
            className="hover:text-primary-600 transition-colors"
          >
            {t('footer.contact')}
          </Link>
        </div>
      </div>
    </footer>
  );
};

export default Footer;

