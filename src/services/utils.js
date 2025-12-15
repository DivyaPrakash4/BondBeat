export function extractYouTubeVideoId(url) {

  if (!url || typeof url !== "string") 
    
  return null;

  const regExp = /(?:youtube\.com\/.*v=|youtu\.be\/)([^?&\s]+)/;
  const match = url.match(regExp);
  return match ? match[1] : null;
}
