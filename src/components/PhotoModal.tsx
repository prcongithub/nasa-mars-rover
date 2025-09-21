import type { RoverPhoto } from '../services/nasa-api';

interface PhotoModalProps {
  photo: RoverPhoto;
  onClose: () => void;
}

export default function PhotoModal({ photo, onClose }: PhotoModalProps) {
  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-content" onClick={(e) => e.stopPropagation()}>
        <button className="modal-close" onClick={onClose}>✕</button>
        <img 
          src={photo.img_src} 
          alt={`Mars rover photo ${photo.id}`}
        />
        <div className="modal-info">
          <h2>{photo.rover.name}</h2>
          <div className="modal-details">
            <div>
              <strong>Camera:</strong> {photo.camera.full_name}
            </div>
            <div>
              <strong>Sol:</strong> {photo.sol}
            </div>
            <div>
              <strong>Earth Date:</strong> {new Date(photo.earth_date).toLocaleDateString('en-US', {
                year: 'numeric',
                month: 'long',
                day: 'numeric'
              })}
            </div>
            <div>
              <strong>Rover Status:</strong> {photo.rover.status}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}