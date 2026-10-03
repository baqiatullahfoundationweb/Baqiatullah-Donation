import React, { useEffect, useMemo, useRef, useState } from 'react';
import { AnimatePresence, motion, useScroll, useTransform } from 'framer-motion';
import { ChevronLeft, ChevronRight, Mouse } from 'lucide-react';
import { useTheme } from '../context/ThemeContext';
import './HeroSlideshow.css';

const HERO_CONFIG = {
  interval: 5000,
  crossfade: 1.2,
  overlay: 'linear-gradient(90deg, rgba(11, 60, 60, .88) 0%, rgba(11, 60, 60, .58) 44%, rgba(0, 0, 0, .22) 100%)',
  darkOverlay: 'linear-gradient(90deg, rgba(4, 24, 24, .94) 0%, rgba(4, 24, 24, .7) 48%, rgba(0, 0, 0, .36) 100%)',
  slides: [
    { src: 'https://images.unsplash.com/photo-1489493585363-d69421e0edd3?auto=format&fit=crop&w=2200&q=82', alt: 'Children smiling together outdoors', objectPosition: 'center center', drift: { x: ['0%', '2%'], y: ['0%', '-1%'] } },
    { src: 'https://images.unsplash.com/photo-1509062522246-3755977927d7?auto=format&fit=crop&w=2200&q=82', alt: 'Children learning together in a classroom', objectPosition: 'center center', drift: { x: ['-2%', '1%'], y: ['0%', '2%'] } },
    { src: 'https://images.unsplash.com/photo-1488521787991-ed7bbaae773c?auto=format&fit=crop&w=2200&q=82', alt: 'Child receiving a caring meal', objectPosition: 'center center', drift: { x: ['1%', '-2%'], y: ['-1%', '1%'] } },
    { src: 'https://images.unsplash.com/photo-1559027615-cd4628902d4a?auto=format&fit=crop&w=2200&q=82', alt: 'Community volunteers working together', objectPosition: 'center center', drift: { x: ['-1%', '2%'], y: ['2%', '-1%'] } },
    { src: 'https://images.unsplash.com/photo-1523240795612-9a054b0db644?auto=format&fit=crop&w=2200&q=82', alt: 'Students sharing a moment of learning', objectPosition: 'center center', drift: { x: ['2%', '0%'], y: ['0%', '2%'] } },
  ],
};

function preload(source) {
  const image = new Image();
  image.src = source;
}

export default function HeroSlideshow() {
  const { theme } = useTheme();
  const heroRef = useRef(null);
  const touchStart = useRef(null);
  const [active, setActive] = useState(0);
  const [paused, setPaused] = useState(false);
  const [reducedMotion, setReducedMotion] = useState(false);
  const slide = HERO_CONFIG.slides[active];
  const { scrollYProgress } = useScroll({ target: heroRef, offset: ['start start', 'end start'] });
  const backgroundY = useTransform(scrollYProgress, [0, 1], ['0%', '18%']);
  const contentOpacity = useTransform(scrollYProgress, [0, .8], [1, .35]);

  useEffect(() => {
    const media = window.matchMedia('(prefers-reduced-motion: reduce)');
    const updateMotion = () => setReducedMotion(media.matches);
    updateMotion();
    media.addEventListener?.('change', updateMotion);
    return () => media.removeEventListener?.('change', updateMotion);
  }, []);

  useEffect(() => {
    preload(HERO_CONFIG.slides[(active + 1) % HERO_CONFIG.slides.length].src);
  }, [active]);

  useEffect(() => {
    if (paused || reducedMotion) return undefined;
    const timer = window.setInterval(() => setActive((current) => (current + 1) % HERO_CONFIG.slides.length), HERO_CONFIG.interval);
    return () => window.clearInterval(timer);
  }, [paused, reducedMotion]);

  useEffect(() => {
    const onVisibilityChange = () => setPaused(document.hidden);
    document.addEventListener('visibilitychange', onVisibilityChange);
    return () => document.removeEventListener('visibilitychange', onVisibilityChange);
  }, []);

  const changeSlide = (direction) => setActive((current) => (current + direction + HERO_CONFIG.slides.length) % HERO_CONFIG.slides.length);
  const handleTouchStart = (event) => { touchStart.current = event.touches[0].clientX; setPaused(true); };
  const handleTouchEnd = (event) => {
    if (touchStart.current === null) return;
    const distance = event.changedTouches[0].clientX - touchStart.current;
    if (Math.abs(distance) > 45) changeSlide(distance < 0 ? 1 : -1);
    touchStart.current = null;
    setPaused(false);
  };

  const particles = useMemo(() => Array.from({ length: 5 }, (_, index) => index), []);
  const overlay = theme === 'dark' ? HERO_CONFIG.darkOverlay : HERO_CONFIG.overlay;

  return <div className="hero-slideshow" ref={heroRef} onMouseEnter={() => setPaused(true)} onMouseLeave={() => setPaused(false)} onTouchStart={handleTouchStart} onTouchEnd={handleTouchEnd} aria-live="off">
    <motion.div className="hero-slides" style={{ y: reducedMotion ? 0 : backgroundY }}>
      <AnimatePresence initial={false} mode="sync">
        <motion.img key={slide.src} className="hero-slide-image" src={slide.src} alt={slide.alt} loading={active === 0 ? 'eager' : 'lazy'} fetchpriority={active === 0 ? 'high' : 'auto'} style={{ objectPosition: slide.objectPosition }} initial={{ opacity: 0, scale: reducedMotion ? 1 : 1.04 }} animate={{ opacity: 1, scale: reducedMotion ? 1 : 1.12, x: reducedMotion ? 0 : slide.drift.x, y: reducedMotion ? 0 : slide.drift.y }} exit={{ opacity: 0 }} transition={{ opacity: { duration: HERO_CONFIG.crossfade }, default: { duration: HERO_CONFIG.interval / 1000, ease: 'linear' } }} />
      </AnimatePresence>
    </motion.div>
    <div className="hero-overlay" style={{ backgroundImage: overlay }} aria-hidden="true" />
    <div className="hero-dust" aria-hidden="true">{particles.map((particle) => <i key={particle} />)}</div>
    <motion.div className="hero-parallax-content" style={{ opacity: contentOpacity }}>
      <div className="hero-badge"><span className="hero-badge-icon">♥</span><span><strong>Every child matters</strong><small>Care with purpose</small></span></div>
    </motion.div>
    <div className="hero-slide-controls">
      <div className="hero-progress" role="tablist" aria-label="Hero slides">{HERO_CONFIG.slides.map((item, index) => <button key={item.src} type="button" role="tab" aria-label={`Show slide ${index + 1}`} aria-selected={index === active} className={index === active ? 'is-active' : ''} onClick={() => setActive(index)}><i key={`${active}-${index}`} style={{ animationDuration: `${HERO_CONFIG.interval}ms`, animationPlayState: paused ? 'paused' : 'running' }} /></button>)}</div>
      <div className="hero-arrows"><button type="button" onClick={() => changeSlide(-1)} aria-label="Previous hero image"><ChevronLeft size={19} /></button><button type="button" onClick={() => changeSlide(1)} aria-label="Next hero image"><ChevronRight size={19} /></button></div>
    </div>
    <div className="hero-scroll-indicator" aria-hidden="true"><Mouse size={17} /><span /></div>
  </div>;
}
