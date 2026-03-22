export default function cloudinaryLoader({
  src,
  width,
  quality,
}: {
  src: string;
  width: number;
  quality?: number;
}) {
  const cloudName = process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME;

  // Smart Fallback: Local dev or missing cloud name
  // Bypasses Cloudinary transforms for standard statically served files (e.g. /images/profile.png)
  if (!cloudName || cloudName === 'your-cloud-name' || src.startsWith('/')) {
    return `${src}?w=${width}&q=${quality || 75}`;
  }

  // Optimized Cloudinary Transform mapping
  // f_auto: Automatically deliver the best image format based on browser (WebP/AVIF)
  // q_auto: Automatically optimize compression quality
  const params = ['f_auto', 'c_limit', `w_${width}`, `q_${quality || 'auto'}`];
  
  // Note: assumes src is the public ID of the uploaded asset in Cloudinary
  return `https://res.cloudinary.com/${cloudName}/image/upload/${params.join(',')}/${src}`;
}
