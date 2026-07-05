const PHOTO_KEY = 'eventu_event_photos';

export function saveEventPhotos(eventId: number, photos: string[]) {
  const store = getAllPhotos();
  store[eventId] = photos;
  try {
    localStorage.setItem(PHOTO_KEY, JSON.stringify(store));
  } catch {
    
  }
}

export function getEventPhotos(eventId: number): string[] {
  return getAllPhotos()[eventId] || [];
}

function getAllPhotos(): Record<number, string[]> {
  try {
    return JSON.parse(localStorage.getItem(PHOTO_KEY) || '{}');
  } catch {
    return {};
  }
}

export function fileToDataUrl(file: File): Promise<string> {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = () => resolve(reader.result as string);
    reader.onerror = reject;
    reader.readAsDataURL(file);
  });
}

export function getMapsEmbedUrl(location: string): string {
  const q = encodeURIComponent(location);
  return `https://www.google.com/maps?q=${q}&output=embed`;
}

export function getMapsLinkUrl(location: string): string {
  return `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(location)}`;
}
