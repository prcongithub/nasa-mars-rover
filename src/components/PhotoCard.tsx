import type { RoverPhoto } from '../services/nasa-api';

interface PhotoCardProps {
  photo: RoverPhoto;
  onClick: (photo: RoverPhoto) => void;
}

export default function PhotoCard({ photo, onClick }: PhotoCardProps) {
  return (
    <div 
      className="photo-card"
      onClick={() => onClick(photo)}
    >
      <div className="image-container">
        <img 
          src={photo.img_src} 
          alt={`Mars rover photo ${photo.id}`}
          loading="lazy"
        />
      </div>
      <div className="photo-info">
        <h3>{photo.rover.name}</h3>
        <p className="camera-name">{photo.camera.full_name}</p>
        <div className="photo-meta">
          <span>Sol: {photo.sol}</span>
          <span>{new Date(photo.earth_date).toLocaleDateString()}</span>
        </div>
      </div>
    </div>
  );
}