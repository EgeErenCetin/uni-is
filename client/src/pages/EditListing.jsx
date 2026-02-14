import { useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { listingService } from '../services/listingService';
import { useAuth } from '../context/AuthContext';
import LoadingSpinner from '../components/shared/LoadingSpinner';
import toast from 'react-hot-toast';

const categories = [
  { value: 'ders-verme', label: 'Ders Verme' },
  { value: 'yazılım', label: 'Yazılım' },
  { value: 'tasarım', label: 'Tasarım' },
  { value: 'dil', label: 'Dil' },
  { value: 'müzik', label: 'Müzik' },
  { value: 'spor', label: 'Spor' },
  { value: 'diğer', label: 'Diğer' },
];

const EditListing = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { user } = useAuth();
  const queryClient = useQueryClient();
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm();

  const { data: listing, isLoading } = useQuery({
    queryKey: ['listing', id],
    queryFn: () => listingService.getListingById(id),
    enabled: !!id,
  });

  useEffect(() => {
    if (listing) {
      if (listing.userId._id !== user?._id) {
        toast.error('Bu ilanı düzenleme yetkiniz yok');
        navigate('/listings');
        return;
      }
      reset({
        title: listing.title,
        category: listing.category,
        description: listing.description,
        price: listing.price || '',
        duration: listing.duration || '',
      });
    }
  }, [listing, user, reset, navigate]);

  const mutation = useMutation({
    mutationFn: (data) => listingService.updateListing(id, data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['listings'] });
      queryClient.invalidateQueries({ queryKey: ['listing', id] });
      toast.success('İlan güncellendi');
      navigate(`/listings/${id}`);
    },
    onError: (error) => {
      toast.error(error.response?.data?.message || 'İlan güncellenemedi');
    },
  });

  const onSubmit = (data) => {
    mutation.mutate({
      ...data,
      price: data.price ? parseFloat(data.price) : null,
    });
  };

  if (isLoading) {
    return <LoadingSpinner />;
  }

  if (!listing) {
    return <div>İlan bulunamadı</div>;
  }

  return (
    <div className="max-w-2xl mx-auto">
      <h1 className="text-3xl font-bold mb-6">İlan Düzenle</h1>
      <div className="card">
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          <div>
            <label htmlFor="title" className="block text-sm font-medium text-gray-700 dark:text-white mb-1">
              Başlık *
            </label>
            <input
              type="text"
              id="title"
              {...register('title', { required: 'Başlık gereklidir' })}
              className="input"
              maxLength={100}
            />
            {errors.title && (
              <p className="mt-1 text-sm text-red-600">{errors.title.message}</p>
            )}
          </div>

          <div>
            <label htmlFor="category" className="block text-sm font-medium text-gray-700 dark:text-white mb-1">
              Kategori *
            </label>
            <select
              id="category"
              {...register('category', { required: 'Kategori gereklidir' })}
              className="input"
            >
              {categories.map((cat) => (
                <option key={cat.value} value={cat.value}>
                  {cat.label}
                </option>
              ))}
            </select>
            {errors.category && (
              <p className="mt-1 text-sm text-red-600">{errors.category.message}</p>
            )}
          </div>

          <div>
            <label htmlFor="description" className="block text-sm font-medium text-gray-700 dark:text-white mb-1">
              Açıklama *
            </label>
            <textarea
              id="description"
              {...register('description', { required: 'Açıklama gereklidir' })}
              rows="6"
              className="input"
              maxLength={1000}
            />
            {errors.description && (
              <p className="mt-1 text-sm text-red-600">{errors.description.message}</p>
            )}
          </div>

          <div>
            <label htmlFor="price" className="block text-sm font-medium text-gray-700 dark:text-white mb-1">
              Fiyat (₺)
            </label>
            <input
              type="number"
              id="price"
              {...register('price', { min: 0 })}
              className="input"
              step="0.01"
            />
          </div>

          <div>
            <label htmlFor="duration" className="block text-sm font-medium text-gray-700 dark:text-white mb-1">
              Süre/Zaman
            </label>
            <input
              type="text"
              id="duration"
              {...register('duration')}
              className="input"
              placeholder="Örn: 2 saat, Haftalık, vb."
            />
          </div>

          <div>
            <label htmlFor="status" className="block text-sm font-medium text-gray-700 dark:text-white mb-1">
              Durum
            </label>
            <select id="status" {...register('status')} className="input">
              <option value="active">Aktif</option>
              <option value="completed">Tamamlandı</option>
              <option value="cancelled">İptal Edildi</option>
            </select>
          </div>

          <div className="flex gap-4">
            <button
              type="submit"
              disabled={mutation.isPending}
              className="btn btn-primary"
            >
              {mutation.isPending ? 'Güncelleniyor...' : 'Güncelle'}
            </button>
            <button
              type="button"
              onClick={() => navigate(`/listings/${id}`)}
              className="btn btn-secondary"
            >
              İptal
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default EditListing;

