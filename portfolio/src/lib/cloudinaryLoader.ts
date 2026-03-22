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
    return `${src}${src.includes('?') ? '&' : '?'}w=${width}&q=${quality || 75}`;
  }

  // Handle cases where a full Cloudinary or remote URL is accidentally passed as src
  let publicId = src;
  if (src.includes('res.cloudinary.com')) {
    const parts = src.split('/');
    // The publicId is everything after /upload/ (skipping version or transforms)
    const uploadIndex = parts.indexOf('upload');
    if (uploadIndex !== -1 && parts.length > uploadIndex + 1) {
      // Find the start of the public ID, skipping version (starts with v)
      let startIndex = uploadIndex + 1;
      if (parts[startIndex].startsWith('v') && !isNaN(Number(parts[startIndex].substring(1)))) {
        startIndex++;
      }
      // Re-join everything after the version as the publicId
      publicId = parts.slice(startIndex).join('/');
    }
  }

  // Optimized Cloudinary Transform mapping
  // q_auto:best ensures maximum perceptual quality at minimum file size
  const params = ['f_auto', 'c_limit', `w_${width}`, `q_${quality || 'auto:best'}`];
  
  return `https://res.cloudinary.com/${cloudName}/image/upload/${params.join(',')}/${publicId}`;
}
