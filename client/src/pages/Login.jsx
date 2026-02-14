import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { useForm } from 'react-hook-form';
import { useAuth } from '../context/AuthContext';

const Login = () => {
  const { t } = useTranslation();
  const { login } = useAuth();
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = async (data) => {
    setIsLoading(true);
    try {
      await login(data.email, data.password);
      navigate('/');
    } catch (error) {
      // Error handled in auth context
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-[calc(100vh-4rem)] flex items-center justify-center bg-blue-50/60 dark:bg-gray-900">
      <div className="card w-full max-w-md">
        <h1 className="text-3xl font-bold text-center mb-2 text-gray-900 dark:text-white">{t('login.title')}</h1>
        <p className="text-center text-gray-600 dark:text-white mb-6 text-sm">
          {t('login.subtitle')}
        </p>
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          <div>
            <label htmlFor="email" className="block text-sm font-medium text-gray-700 dark:text-white mb-1">
              {t('login.email')}
            </label>
            <input
              type="email"
              id="email"
              {...register('email', {
                required: t('login.errors.emailRequired'),
                pattern: {
                  value: /^\S+@\S+\.\S+$/,
                  message: t('login.errors.emailInvalid'),
                },
              })}
              className="input"
            />
            {errors.email && (
              <p className="mt-1 text-sm text-red-600">{errors.email.message}</p>
            )}
          </div>

          <div>
            <label htmlFor="password" className="block text-sm font-medium text-gray-700 dark:text-white mb-1">
              {t('login.password')}
            </label>
            <input
              type="password"
              id="password"
              {...register('password', {
                required: t('login.errors.passwordRequired'),
                minLength: {
                  value: 6,
                  message: t('login.errors.passwordMin'),
                },
              })}
              className="input"
            />
            {errors.password && (
              <p className="mt-1 text-sm text-red-600">{errors.password.message}</p>
            )}
          </div>

          <button
            type="submit"
            disabled={isLoading}
            className="btn btn-primary w-full"
          >
            {isLoading ? t('login.submitting') : t('login.submit')}
          </button>
        </form>

        <div className="mt-6 space-y-2 text-sm text-gray-600 dark:text-white">
          <p className="text-center">
            {t('login.noAccount')}{' '}
            <Link to="/register" className="text-primary-600 hover:text-primary-700 font-medium">
              {t('login.registerNow')}
            </Link>
          </p>
          <p className="text-xs text-center text-gray-500 dark:text-white">
            {t('login.terms')}
          </p>
        </div>
      </div>
    </div>
  );
};

export default Login;

