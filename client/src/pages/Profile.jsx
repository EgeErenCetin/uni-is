import { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { useForm } from 'react-hook-form';
import { useAuth } from '../context/AuthContext';
import { userService } from '../services/userService';
import { reviewService } from '../services/reviewService';
import toast from 'react-hot-toast';
import LoadingSpinner from '../components/shared/LoadingSpinner';

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000';

const Profile = () => {
  const { t } = useTranslation();
  const { user: authUser, updateUser } = useAuth();
  const [user, setUser] = useState(null);
  const [reviews, setReviews] = useState([]);
  const [isEditing, setIsEditing] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [isSaving, setIsSaving] = useState(false);
  const [avatarFile, setAvatarFile] = useState(null);
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm();

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const userData = await userService.getUserById(authUser._id);
        setUser(userData);
        reset(userData);

        const reviewsData = await reviewService.getUserReviews(authUser._id);
        setReviews(reviewsData);
      } catch (error) {
        toast.error(t('profile.messages.loadError'));
      } finally {
        setIsLoading(false);
      }
    };

    if (authUser?._id) {
      fetchUser();
    }
  }, [authUser, reset]);

  const onSubmit = async (data) => {
    setIsSaving(true);
    try {
      // Convert skills string to array
      const skillsArray = data.skills
        ? data.skills.split(',').map((s) => s.trim()).filter((s) => s.length > 0)
        : [];

      const updatedUser = await userService.updateUser(authUser._id, {
        ...data,
        skills: skillsArray,
      });
      setUser(updatedUser);
      updateUser(updatedUser);
      updateUser(updatedUser);
      setIsEditing(false);
      toast.success(t('profile.messages.updateSuccess'));
    } catch (error) {
      toast.error(error.response?.data?.message || t('profile.messages.updateError'));
    } finally {
      setIsSaving(false);
    }
  };

  const handleAvatarChange = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    if (file.size > 5 * 1024 * 1024) {
      toast.error(t('profile.messages.fileSize'));
      return;
    }

    setAvatarFile(file);
    setIsSaving(true);
    try {
      const result = await userService.updateAvatar(authUser._id, file);
      const updatedUser = { ...user, profileImage: result.profileImage };
      setUser(updatedUser);
      updateUser(updatedUser);
      toast.success(t('profile.messages.avatarSuccess'));
    } catch (error) {
      toast.error(t('profile.messages.avatarError'));
    } finally {
      setIsSaving(false);
      setAvatarFile(null);
    }
  };

  if (isLoading) {
    return <LoadingSpinner />;
  }

  if (!user) {
    return <div>{t('profile.messages.userNotFound')}</div>;
  }

  return (
    <div className="max-w-4xl mx-auto">
      <div className="card mb-6">
        <div className="flex flex-col md:flex-row items-center md:items-start gap-6">
          <div className="relative">
            {user.profileImage ? (
              <img
                src={`${API_URL}${user.profileImage}`}
                alt={user.name}
                className="w-32 h-32 rounded-full object-cover"
              />
            ) : (
              <div className="w-32 h-32 rounded-full bg-primary-100 flex items-center justify-center text-primary-600 text-4xl font-medium">
                {user.name?.charAt(0).toUpperCase()}
              </div>
            )}
            <label className="absolute bottom-0 right-0 bg-primary-600 text-white rounded-full p-2 cursor-pointer hover:bg-primary-700 transition-colors">
              <input
                type="file"
                accept="image/*"
                onChange={handleAvatarChange}
                className="hidden"
                disabled={isSaving}
              />
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 9a2 2 2 0 012-2h.93a2 2 0 001.664-.89l.812-1.22A2 2 0 0110.07 4h3.86a2 2 0 011.664.89l.812 1.22A2 2 0 0018.07 7H19a2 2 0 012 2v9a2 2 0 01-2 2H5a2 2 0 01-2-2V9z" />
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 13a3 3 0 11-6 0 3 3 0 016 0z" />
              </svg>
            </label>
          </div>

          <div className="flex-1 text-center md:text-left">
            <h1 className="text-3xl font-bold mb-2">{user.name}</h1>
            {user.university && (
              <p className="text-gray-600 dark:text-white mb-1">{user.university}</p>
            )}
            {user.department && (
              <p className="text-gray-600 dark:text-white mb-2">{user.department}</p>
            )}
            {user.averageRating > 0 && (
              <div className="flex items-center justify-center md:justify-start gap-1">
                <span className="text-yellow-500">⭐</span>
                <span className="font-medium">{user.averageRating.toFixed(1)}</span>
                <span className="text-gray-500 dark:text-white">{t('profile.reviewCount', { count: reviews.length })}</span>
              </div>
            )}
          </div>
        </div>
      </div>

      <div className="card">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-bold">{t('profile.title')}</h2>
          {!isEditing && (
            <button
              onClick={() => setIsEditing(true)}
              className="btn btn-outline"
            >
              {t('profile.edit')}
            </button>
          )}
        </div>

        {isEditing ? (
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-white mb-1">
                {t('profile.form.name.label')}
              </label>
              <input
                type="text"
                {...register('name', { required: t('profile.form.name.required') })}
                className="input"
              />
              {errors.name && (
                <p className="mt-1 text-sm text-red-600">{errors.name.message}</p>
              )}
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-white mb-1">
                {t('profile.form.university')}
              </label>
              <input type="text" {...register('university')} className="input" />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-white mb-1">
                {t('profile.form.department')}
              </label>
              <input type="text" {...register('department')} className="input" />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-white mb-1">
                {t('profile.form.bio')}
              </label>
              <textarea
                {...register('bio')}
                rows="4"
                className="input"
                maxLength={500}
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-white mb-1">
                {t('profile.form.skills.label')}
              </label>
              <input
                type="text"
                {...register('skills')}
                className="input"
                placeholder={t('profile.form.skills.placeholder')}
                defaultValue={user.skills?.join(', ')}
              />
            </div>

            <div className="flex gap-4">
              <button
                type="submit"
                disabled={isSaving}
                className="btn btn-primary"
              >
                {isSaving ? t('profile.saving') : t('profile.save')}
              </button>
              <button
                type="button"
                onClick={() => {
                  setIsEditing(false);
                  reset(user);
                }}
                className="btn btn-secondary"
              >
                {t('profile.cancel')}
              </button>
            </div>
          </form>
        ) : (
          <div className="space-y-4">
            <div>
              <h3 className="font-medium text-gray-700 dark:text-white mb-1">{t('profile.form.email')}</h3>
              <p className="text-gray-900 dark:text-white">{user.email}</p>
            </div>
            {user.bio && (
              <div>
                <h3 className="font-medium text-gray-700 dark:text-white mb-1">{t('profile.form.bio')}</h3>
                <p className="text-gray-900 dark:text-white">{user.bio}</p>
              </div>
            )}
            {user.skills && user.skills.length > 0 && (
              <div>
                <h3 className="font-medium text-gray-700 dark:text-white mb-2">{t('profile.form.skills.label').split(' (')[0]}</h3>
                <div className="flex flex-wrap gap-2">
                  {user.skills.map((skill, index) => (
                    <span
                      key={index}
                      className="px-3 py-1 bg-primary-100 text-primary-700 rounded-full text-sm"
                    >
                      {skill}
                    </span>
                  ))}
                </div>
              </div>
            )}
          </div>
        )}
      </div>

      {reviews.length > 0 && (
        <div className="card mt-6">
          <h2 className="text-2xl font-bold mb-4">{t('profile.reviews')}</h2>
          <div className="space-y-4">
            {reviews.map((review) => (
              <div key={review._id} className="border-b border-gray-200 pb-4 last:border-0">
                <div className="flex items-center gap-2 mb-2">
                  <span className="text-yellow-500">
                    {'⭐'.repeat(review.rating)}
                  </span>
                  <span className="font-medium">{review.reviewerId.name}</span>
                </div>
                {review.comment && (
                  <p className="text-gray-700 dark:text-white">{review.comment}</p>
                )}
                {review.listingId && (
                  <p className="text-sm text-gray-500 dark:text-white mt-1">
                    {t('profile.listing', { title: review.listingId.title })}
                  </p>
                )}
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default Profile;

