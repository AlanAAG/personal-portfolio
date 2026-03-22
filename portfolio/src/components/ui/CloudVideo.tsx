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
  
  // f_auto leverages content negotiation so webm/mp4 is seamlessly delivered optimally 
  const videoUrl = isLocal 
    ? src 
    : `https://res.cloudinary.com/${cloudName}/video/upload/f_auto,q_auto/${src}`;
    
  const posterUrl = isLocal 
    ? poster 
    : poster ? `https://res.cloudinary.com/${cloudName}/image/upload/f_auto,q_auto/${poster}` : undefined;

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
