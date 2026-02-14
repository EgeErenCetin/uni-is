import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { useForm } from 'react-hook-form';
import { useAuth } from '../context/AuthContext';

const Register = () => {
  const { t } = useTranslation();
  const { register: registerUser } = useAuth();
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
      await registerUser(data);
      navigate('/');
    } catch (error) {
      // Error handled in auth context
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="max-w-md mx-auto">
      <div className="card">
        <h1 className="text-2xl font-bold text-center mb-6">{t('register.title')}</h1>
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          <div>
            <label htmlFor="name" className="block text-sm font-medium text-gray-700 dark:text-white mb-1">
              {t('register.name')}
            </label>
            <input
              type="text"
              id="name"
              {...register('name', {
                required: t('register.errors.nameRequired'),
              })}
              className="input"
            />
            {errors.name && (
              <p className="mt-1 text-sm text-red-600">{errors.name.message}</p>
            )}
          </div>

          <div>
            <label htmlFor="email" className="block text-sm font-medium text-gray-700 dark:text-white mb-1">
              {t('register.email')}
            </label>
            <input
              type="email"
              id="email"
              {...register('email', {
                required: t('register.errors.emailRequired'),
                pattern: {
                  value: /^\S+@\S+\.\S+$/,
                  message: t('register.errors.emailInvalid'),
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
              {t('register.password')}
            </label>
            <input
              type="password"
              id="password"
              {...register('password', {
                required: t('register.errors.passwordRequired'),
                minLength: {
                  value: 6,
                  message: t('register.errors.passwordMin'),
                },
              })}
              className="input"
            />
            {errors.password && (
              <p className="mt-1 text-sm text-red-600">{errors.password.message}</p>
            )}
          </div>

          <div>
            <label htmlFor="university" className="block text-sm font-medium text-gray-700 dark:text-white mb-1">
              {t('register.university')}
            </label>
            <input
              type="text"
              id="university"
              {...register('university')}
              className="input"
            />
          </div>

          <div>
            <label htmlFor="department" className="block text-sm font-medium text-gray-700 dark:text-white mb-1">
              {t('register.department')}
            </label>
            <input
              type="text"
              id="department"
              {...register('department')}
              className="input"
            />
          </div>

          <button
            type="submit"
            disabled={isLoading}
            className="btn btn-primary w-full"
          >
            {isLoading ? t('register.submitting') : t('register.submit')}
          </button>
        </form>

        <p className="mt-4 text-center text-sm text-gray-600 dark:text-white">
          {t('register.hasAccount')}{' '}
          <Link to="/login" className="text-primary-600 hover:text-primary-700 font-medium">
            {t('register.login')}
          </Link>
        </p>
      </div>
    </div>
  );
};

export default Register;

