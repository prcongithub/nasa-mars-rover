import { useState, useEffect } from 'react';
import { fetchLatestRoverPhotos } from '../services/nasa-api';
import type { RoverPhoto } from '../services/nasa-api';
import PhotoCard from './PhotoCard';
import PhotoModal from './PhotoModal';
import LoadingSpinner from './LoadingSpinner';
import RoverSelector from './RoverSelector';

export default function Gallery() {
  const [photos, setPhotos] = useState<RoverPhoto[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [selectedPhoto, setSelectedPhoto] = useState<RoverPhoto | null>(null);
  const [currentRover, setCurrentRover] = useState('curiosity');
  const [currentSol, setCurrentSol] = useState(1000);
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);

  useEffect(() => {
    loadPhotos();
  }, [currentRover, currentSol]);

  const loadPhotos = async (isLoadMore = false) => {
    try {
      setLoading(true);
      setError(null);
      const currentPage = isLoadMore ? page + 1 : 1;
      const response = await fetchLatestRoverPhotos(currentRover, currentSol, currentPage);
      
      if (response.photos.length === 0) {
        setHasMore(false);
        if (!isLoadMore) {
          setError('No photos found for this sol. Try a different sol day.');
        }
      } else {
        if (isLoadMore) {
          setPhotos(prev => [...prev, ...response.photos]);
          setPage(currentPage);
        } else {
          setPhotos(response.photos);
          setPage(1);
          setHasMore(true);
        }
      }
    } catch (err) {
      setError('Failed to fetch photos. Please try again later.');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const handleLoadMore = () => {
    if (!loading && hasMore) {
      loadPhotos(true);
    }
  };

  const handleRoverChange = (rover: string) => {
    setCurrentRover(rover);
    setPhotos([]);
  };

  const handleSolChange = (sol: number) => {
    setCurrentSol(sol);
    setPhotos([]);
  };

  return (
    <div className="gallery-container">
      <header className="gallery-header">
        <h1>🚀 Mars Rover Gallery</h1>
        <p>Explore the latest images from NASA's Mars rovers</p>
      </header>

      <RoverSelector 
        currentRover={currentRover}
        currentSol={currentSol}
        onRoverChange={handleRoverChange}
        onSolChange={handleSolChange}
      />

      {loading && photos.length === 0 ? (
        <LoadingSpinner />
      ) : error && photos.length === 0 ? (
        <div className="error-message">
          <p>{error}</p>
          <button onClick={() => loadPhotos()}>Retry</button>
        </div>
      ) : (
        <>
          <div className="photo-grid">
            {photos.map((photo) => (
              <PhotoCard
                key={photo.id}
                photo={photo}
                onClick={setSelectedPhoto}
              />
            ))}
          </div>
          
          {hasMore && photos.length > 0 && (
            <div className="load-more-container">
              <button 
                className="load-more-btn"
                onClick={handleLoadMore}
                disabled={loading}
              >
                {loading ? 'Loading...' : 'Load More'}
              </button>
            </div>
          )}
        </>
      )}

      {selectedPhoto && (
        <PhotoModal
          photo={selectedPhoto}
          onClose={() => setSelectedPhoto(null)}
        />
      )}
    </div>
  );
}