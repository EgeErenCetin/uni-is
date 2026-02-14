import { useParams, Link, useNavigate } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import { listingService } from '../services/listingService';
import { useAuth } from '../context/AuthContext';
import LoadingSpinner from '../components/shared/LoadingSpinner';
import toast from 'react-hot-toast';

const ListingDetail = () => {
  const { id } = useParams();
  const { user } = useAuth();
  const navigate = useNavigate();

  const { data: listing, isLoading } = useQuery({
    queryKey: ['listing', id],
    queryFn: () => listingService.getListingById(id),
  });

  const handleDelete = async () => {
    if (!window.confirm('Bu ilanı silmek istediğinize emin misiniz?')) {
      return;
    }

    try {
      await listingService.deleteListing(id);
      toast.success('İlan silindi');
      navigate('/listings');
    } catch (error) {
      toast.error('İlan silinemedi');
    }
  };

  if (isLoading) {
    return <LoadingSpinner />;
  }

  if (!listing) {
    return <div>İlan bulunamadı</div>;
  }

  const isOwner = user?._id === listing.userId._id;

  const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000';

  return (
    <div className="max-w-4xl mx-auto">
      <div className="card mb-6">
        <div className="flex items-start justify-between mb-4">
          <div>
            <span className="px-3 py-1 bg-primary-100 text-primary-700 rounded-full text-sm">
              {listing.category}
            </span>
          </div>
          {listing.price && (
            <span className="text-2xl font-bold text-primary-600">
              {listing.price} ₺
            </span>
          )}
        </div>

        <h1 className="text-3xl font-bold mb-4">{listing.title}</h1>
        <p className="text-gray-700 dark:text-white whitespace-pre-wrap mb-6">{listing.description}</p>

        {listing.duration && (
          <div className="mb-4">
            <span className="font-medium">Süre: </span>
            <span>{listing.duration}</span>
          </div>
        )}

        {isOwner && (
          <div className="flex gap-4 mt-6">
            <Link
              to={`/listings/${id}/edit`}
              className="btn btn-outline"
            >
              Düzenle
            </Link>
            <button onClick={handleDelete} className="btn btn-secondary">
              Sil
            </button>
          </div>
        )}
      </div>

      <div className="card">
        <h2 className="text-xl font-bold mb-4">İlan Sahibi</h2>
        <div className="flex items-center gap-4">
          {listing.userId.profileImage ? (
            <img
              src={`${API_URL}${listing.userId.profileImage}`}
              alt={listing.userId.name}
              className="w-16 h-16 rounded-full object-cover"
            />
          ) : (
            <div className="w-16 h-16 rounded-full bg-primary-100 flex items-center justify-center text-primary-600 text-2xl font-medium">
              {listing.userId.name?.charAt(0).toUpperCase()}
            </div>
          )}
          <div>
            <Link
              to={`/profile/${listing.userId._id}`}
              className="text-xl font-semibold hover:text-primary-600"
            >
              {listing.userId.name}
            </Link>
            {listing.userId.university && (
              <p className="text-gray-600 dark:text-white">{listing.userId.university}</p>
            )}
            {listing.userId.department && (
              <p className="text-gray-600 dark:text-white">{listing.userId.department}</p>
            )}
            {listing.userId.averageRating > 0 && (
              <div className="flex items-center gap-1 mt-1">
                <span className="text-yellow-500">⭐</span>
                <span className="font-medium">{listing.userId.averageRating.toFixed(1)}</span>
              </div>
            )}
          </div>
        </div>

        {!isOwner && user && (
          <Link
            to={`/messages?userId=${listing.userId._id}`}
            className="btn btn-primary mt-4 inline-block"
          >
            Mesaj Gönder
          </Link>
        )}
      </div>
    </div>
  );
};

export default ListingDetail;

