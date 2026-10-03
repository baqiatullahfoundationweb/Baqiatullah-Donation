import React, { useState } from 'react';

export default function OptimizedImage({
  src,
  alt,
  width,
  height,
  priority = false,
  sizes = '100vw',
  className = '',
  ...props
}) {
  const [loaded, setLoaded] = useState(false);
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
          src={src}
          alt={alt}
          width={width}
          height={height}
          sizes={sizes}
          loading={priority ? 'eager' : 'lazy'}
          fetchpriority={priority ? 'high' : 'auto'}
          decoding="async"
          onLoad={() => setLoaded(true)}
          onError={() => setFailed(true)}
        />
      )}
    </span>
  );
}
