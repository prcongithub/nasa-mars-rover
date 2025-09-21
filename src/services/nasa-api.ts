const NASA_API_KEY = 'DEMO_KEY';
const BASE_URL = 'https://api.nasa.gov/mars-photos/api/v1';

export interface RoverPhoto {
  id: number;
  sol: number;
  camera: {
    id: number;
    name: string;
    rover_id: number;
    full_name: string;
  };
  img_src: string;
  earth_date: string;
  rover: {
    id: number;
    name: string;
    landing_date: string;
    launch_date: string;
    status: string;
  };
}

export interface ApiResponse {
  photos: RoverPhoto[];
}

export async function fetchLatestRoverPhotos(
  rover: string = 'curiosity',
  sol?: number,
  page: number = 1
): Promise<ApiResponse> {
  const params = new URLSearchParams({
    api_key: NASA_API_KEY,
    page: page.toString(),
  });

  if (sol !== undefined) {
    params.append('sol', sol.toString());
  } else {
    params.append('sol', '1000');
  }

  const url = `${BASE_URL}/rovers/${rover}/photos?${params}`;
  
  try {
    const response = await fetch(url);
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    return await response.json();
  } catch (error) {
    console.error('Error fetching rover photos:', error);
    throw error;
  }
}

export async function fetchRoverManifest(rover: string = 'curiosity') {
  const url = `${BASE_URL}/manifests/${rover}?api_key=${NASA_API_KEY}`;
  
  try {
    const response = await fetch(url);
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    return await response.json();
  } catch (error) {
    console.error('Error fetching rover manifest:', error);
    throw error;
  }
}