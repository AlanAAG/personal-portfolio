'use client';

export default function CloudVideo({
  src,
  poster,
  className = '',
  controls = true,
  autoPlay = false,
  loop = false,
  muted = false,
  playsInline = true,
}: {
  src: string;
  poster?: string;
  className?: string;
  controls?: boolean;
  autoPlay?: boolean;
  loop?: boolean;
  muted?: boolean;
  playsInline?: boolean;
}) {
  const cloudName = process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME;
  
  // Smart Fallback logic matches the Image loader
  const isLocal = !cloudName || cloudName === 'your-cloud-name' || src.startsWith('/');

  const getPublicId = (url: string) => {
    if (!url.includes('res.cloudinary.com')) return url;
    const parts = url.split('/');
    const uploadIndex = parts.indexOf('upload');
    if (uploadIndex !== -1 && parts.length > uploadIndex + 1) {
      let startIndex = uploadIndex + 1;
      if (parts[startIndex].startsWith('v') && !isNaN(Number(parts[startIndex].substring(1)))) {
        startIndex++;
      }
      return parts.slice(startIndex).join('/');
    }
    return url;
  };

  const videoPublicId = getPublicId(src);
  const posterPublicId = poster ? getPublicId(poster) : null;
  
  // f_auto leverages content negotiation so webm/mp4 is seamlessly delivered optimally 
  const videoUrl = isLocal 
    ? src 
    : `https://res.cloudinary.com/${cloudName}/video/upload/f_auto,q_auto/${videoPublicId}`;
    
  const posterUrl = isLocal 
    ? poster 
    : posterPublicId ? `https://res.cloudinary.com/${cloudName}/image/upload/f_auto,q_auto/${posterPublicId}` : undefined;

  return (
    <video
      src={videoUrl}
      className={`w-full h-full object-cover ${className}`}
      controls={controls}
      autoPlay={autoPlay}
      loop={loop}
      muted={muted}
      playsInline={playsInline}
      poster={posterUrl}
    />
  );
}
