import React, { useState } from 'react';

export default function OptimizedImage({
  src,
  alt,
  width,
  height,
  priority = false,
  sizes = '100vw',
  className = '',
  fallbackSrc,
  ...props
}) {
  const isFoundationGalleryImage = src.includes('www.baqiatullah.org/gallery/');
  const proxyOriginal = src.includes('images.weserv.nl/?url=')
    ? decodeURIComponent(new URL(src).searchParams.get('url') || '')
    : undefined;
  const optimizedSrc = isFoundationGalleryImage
    ? `https://images.weserv.nl/?url=${encodeURIComponent(src)}&w=900&output=webp&q=78`
    : src;
  const [loaded, setLoaded] = useState(false);
  const [currentSrc, setCurrentSrc] = useState(optimizedSrc);
  const [failed, setFailed] = useState(false);

  return (
    <span
      className={`image-frame${loaded ? ' is-loaded' : ''}${failed ? ' has-error' : ''}`}
      style={{ aspectRatio: `${width} / ${height}` }}
    >
      {failed ? (
        <span className="image-fallback" role="img" aria-label={alt} />
      ) : (
        <img
          {...props}
          className={className}
          src={currentSrc}
          alt={alt}
          width={width}
          height={height}
          sizes={sizes}
          loading={priority ? 'eager' : 'lazy'}
          fetchpriority={priority ? 'high' : 'auto'}
          decoding="async"
          onLoad={() => setLoaded(true)}
          onError={() => {
            const originalSrc = fallbackSrc || proxyOriginal || (isFoundationGalleryImage ? src : undefined);
            if (originalSrc && currentSrc !== originalSrc) {
              setCurrentSrc(originalSrc);
              return;
            }
            setFailed(true);
          }}
        />
      )}
    </span>
  );
}
