import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { listingService } from '../services/listingService';
import toast from 'react-hot-toast';

const CreateListing = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();

  const categories = [
    { value: 'ders-verme', label: t('listings.categories.tutoring') },
    { value: 'yazılım', label: t('listings.categories.software') },
    { value: 'tasarım', label: t('listings.categories.design') },
    { value: 'dil', label: t('listings.categories.language') },
    { value: 'müzik', label: t('listings.categories.music') },
    { value: 'spor', label: t('listings.categories.sports') },
    { value: 'diğer', label: t('listings.categories.other') },
  ];
  const queryClient = useQueryClient();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const mutation = useMutation({
    mutationFn: listingService.createListing,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['listings'] });
      toast.success(t('createListing.success'));
      navigate('/listings');
    },
    onError: (error) => {
      toast.error(error.response?.data?.message || t('createListing.error'));
    },
  });

  const onSubmit = (data) => {
    mutation.mutate({
      ...data,
      price: data.price ? parseFloat(data.price) : null,
    });
  };

  return (
    <div className="max-w-3xl mx-auto px-4 py-8">
      <div className="text-center mb-8">
        <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">{t('createListing.title')}</h1>
        <p className="text-gray-600 dark:text-gray-300">
          {t('createListing.subtitle')}
        </p>
      </div>

      <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg border border-gray-100 dark:border-gray-700 overflow-hidden">
        {/* Gradient Top Bar */}
        <div className="h-2 bg-gradient-to-r from-primary-400 to-primary-600 w-full" />

        <div className="p-8">
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
            <div>
              <label htmlFor="title" className="block text-sm font-semibold text-gray-700 dark:text-white mb-2">
                {t('createListing.form.title.label')} *
              </label>
              <input
                type="text"
                id="title"
                placeholder={t('createListing.form.title.placeholder')}
                {...register('title', { required: t('createListing.form.title.required') })}
                className="input py-3 px-4 bg-gray-50 dark:bg-gray-700/50 border-gray-200 dark:border-gray-600 focus:ring-2 focus:ring-primary-500/20 focus:border-primary-500 transition-all font-medium placeholder:text-gray-400 dark:placeholder:text-gray-500"
                maxLength={100}
              />
              {errors.title && (
                <p className="mt-1 text-sm text-red-500 font-medium flex items-center gap-1">
                  <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
                  {errors.title.message}
                </p>
              )}
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label htmlFor="category" className="block text-sm font-semibold text-gray-700 dark:text-white mb-2">
                  {t('createListing.form.category.label')} *
                </label>
                <div className="relative">
                  <select
                    id="category"
                    {...register('category', { required: t('createListing.form.category.required') })}
                    className="input py-3 px-4 mb-2 appearance-none bg-gray-50 dark:bg-gray-700/50 border-gray-200 dark:border-gray-600 focus:ring-2 focus:ring-primary-500/20 focus:border-primary-500 transition-all font-medium"
                  >
                    <option value="">{t('createListing.form.category.placeholder')}</option>
                    {categories.map((cat) => (
                      <option key={cat.value} value={cat.value}>
                        {cat.label}
                      </option>
                    ))}
                  </select>
                  <div className="absolute inset-y-0 right-0 flex items-center px-4 pointer-events-none text-gray-500 dark:text-gray-400">
                    <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" /></svg>
                  </div>
                </div>
                {errors.category && (
                  <p className="mt-1 text-sm text-red-500 font-medium flex items-center gap-1">
                    <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
                    {errors.category.message}
                  </p>
                )}
              </div>

              <div>
                <label htmlFor="price" className="block text-sm font-semibold text-gray-700 dark:text-white mb-2">
                  {t('createListing.form.price.label')}
                </label>
                <div className="relative">
                  <input
                    type="number"
                    id="price"
                    placeholder={t('createListing.form.price.placeholder')}
                    {...register('price', { min: 0 })}
                    className="input py-3 pl-4 pr-12 bg-gray-50 dark:bg-gray-700/50 border-gray-200 dark:border-gray-600 focus:ring-2 focus:ring-primary-500/20 focus:border-primary-500 transition-all font-medium placeholder:text-gray-400 dark:placeholder:text-gray-500"
                    step="0.01"
                  />
                  <div className="absolute inset-y-0 right-0 flex items-center pr-4 pointer-events-none text-gray-500 dark:text-gray-400 font-bold">
                    {t('listings.price')}
                  </div>
                </div>
              </div>
            </div>

            <div>
              <label htmlFor="description" className="block text-sm font-semibold text-gray-700 dark:text-white mb-2">
                {t('createListing.form.description.label')} *
              </label>
              <textarea
                id="description"
                placeholder={t('createListing.form.description.placeholder')}
                {...register('description', { required: t('createListing.form.description.required') })}
                rows="6"
                className="input py-3 px-4 bg-gray-50 dark:bg-gray-700/50 border-gray-200 dark:border-gray-600 focus:ring-2 focus:ring-primary-500/20 focus:border-primary-500 transition-all font-medium placeholder:text-gray-400 dark:placeholder:text-gray-500 resize-none"
                maxLength={1000}
              />
              {errors.description && (
                <p className="mt-1 text-sm text-red-500 font-medium flex items-center gap-1">
                  <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
                  {errors.description.message}
                </p>
              )}
            </div>

            <div>
              <label htmlFor="duration" className="block text-sm font-semibold text-gray-700 dark:text-white mb-2">
                {t('createListing.form.duration.label')}
              </label>
              <input
                type="text"
                id="duration"
                {...register('duration')}
                className="input py-3 px-4 bg-gray-50 dark:bg-gray-700/50 border-gray-200 dark:border-gray-600 focus:ring-2 focus:ring-primary-500/20 focus:border-primary-500 transition-all font-medium placeholder:text-gray-400 dark:placeholder:text-gray-500"
                placeholder={t('createListing.form.duration.placeholder')}
              />
            </div>

            <div className="flex items-center gap-4 pt-4 border-t border-gray-100 dark:border-gray-700 mt-6">
              <button
                type="button"
                onClick={() => navigate('/listings')}
                className="flex-1 btn btn-secondary py-3 text-base font-medium"
              >
                {t('createListing.form.cancel')}
              </button>
              <button
                type="submit"
                disabled={mutation.isPending}
                className="flex-[2] btn btn-primary py-3 text-base font-bold shadow-lg shadow-primary-500/20 hover:shadow-primary-500/40 transition-all transform hover:-translate-y-0.5"
              >
                {mutation.isPending ? (
                  <span className="flex items-center justify-center gap-2">
                    <svg className="animate-spin h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                    </svg>
                    {t('createListing.form.submitting')}
                  </span>
                ) : (
                  t('createListing.form.submit')
                )}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default CreateListing;

