interface RoverSelectorProps {
  currentRover: string;
  currentSol: number;
  onRoverChange: (rover: string) => void;
  onSolChange: (sol: number) => void;
}

const ROVERS = [
  { name: 'curiosity', displayName: 'Curiosity', maxSol: 4000 },
  { name: 'opportunity', displayName: 'Opportunity', maxSol: 5111 },
  { name: 'spirit', displayName: 'Spirit', maxSol: 2208 },
  { name: 'perseverance', displayName: 'Perseverance', maxSol: 1000 }
];

export default function RoverSelector({ 
  currentRover, 
  currentSol, 
  onRoverChange, 
  onSolChange 
}: RoverSelectorProps) {
  const currentRoverData = ROVERS.find(r => r.name === currentRover);

  return (
    <div className="rover-selector">
      <div className="selector-group">
        <label htmlFor="rover-select">Select Rover:</label>
        <select 
          id="rover-select"
          value={currentRover} 
          onChange={(e) => onRoverChange(e.target.value)}
        >
          {ROVERS.map(rover => (
            <option key={rover.name} value={rover.name}>
              {rover.displayName}
            </option>
          ))}
        </select>
      </div>

      <div className="selector-group">
        <label htmlFor="sol-input">Sol Day:</label>
        <input 
          id="sol-input"
          type="number" 
          value={currentSol} 
          onChange={(e) => onSolChange(parseInt(e.target.value) || 1)}
          min="1"
          max={currentRoverData?.maxSol || 1000}
          placeholder="Enter sol day"
        />
        <span className="sol-hint">
          Day {currentSol} of mission (max: {currentRoverData?.maxSol || 'unknown'})
        </span>
      </div>
    </div>
  );
}