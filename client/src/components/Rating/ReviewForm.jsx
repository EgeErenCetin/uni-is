import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { reviewService } from '../../services/reviewService';
import toast from 'react-hot-toast';

const ReviewForm = ({ listingId, reviewedUserId, onSuccess }) => {
  const [rating, setRating] = useState(0);
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm();

  const queryClient = useQueryClient();

  const mutation = useMutation({
    mutationFn: (data) =>
      reviewService.createReview({
        ...data,
        listingId,
        reviewedUserId,
        rating,
      }),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['reviews'] });
      toast.success('Değerlendirme gönderildi');
      reset();
      setRating(0);
      if (onSuccess) onSuccess();
    },
    onError: (error) => {
      toast.error(error.response?.data?.message || 'Değerlendirme gönderilemedi');
    },
  });

  const onSubmit = (data) => {
    if (rating === 0) {
      toast.error('Lütfen bir puan seçin');
      return;
    }
    mutation.mutate(data);
  };

  return (
    <div className="card">
      <h3 className="text-xl font-bold mb-4">Değerlendirme Yap</h3>
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-white mb-2">
            Puan *
          </label>
          <div className="flex gap-2">
            {[1, 2, 3, 4, 5].map((star) => (
              <button
                key={star}
                type="button"
                onClick={() => setRating(star)}
                className={`text-3xl transition-transform hover:scale-110 ${star <= rating ? 'text-yellow-500' : 'text-gray-300 dark:text-white'
                  }`}
              >
                ⭐
              </button>
            ))}
          </div>
          {rating > 0 && (
            <p className="mt-2 text-sm text-gray-600 dark:text-white">Seçilen puan: {rating}/5</p>
          )}
        </div>

        <div>
          <label htmlFor="comment" className="block text-sm font-medium text-gray-700 dark:text-white mb-1">
            Yorum
          </label>
          <textarea
            id="comment"
            {...register('comment', { maxLength: 500 })}
            rows="4"
            className="input"
            placeholder="Yorumunuzu yazın (opsiyonel)"
            maxLength={500}
          />
          {errors.comment && (
            <p className="mt-1 text-sm text-red-600">{errors.comment.message}</p>
          )}
        </div>

        <button
          type="submit"
          disabled={mutation.isPending || rating === 0}
          className="btn btn-primary"
        >
          {mutation.isPending ? 'Gönderiliyor...' : 'Değerlendirme Gönder'}
        </button>
      </form>
    </div>
  );
};

export default ReviewForm;

