'use client';

import dynamic from 'next/dynamic';

const FluidBackground = dynamic(() => import("@/components/canvas/FluidBackground"), { ssr: false });
const NoiseCanvas = dynamic(() => import("@/components/canvas/NoiseCanvas"), { ssr: false });

export default function CanvasSystem() {
  return (
    <>
      <FluidBackground />
      <NoiseCanvas />
    </>
  );
}
