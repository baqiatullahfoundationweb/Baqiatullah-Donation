import React, { useEffect, useMemo, useRef, useState } from 'react';
import { AnimatePresence, motion, useMotionValue, useSpring, useTransform } from 'framer-motion';
import './Preloader.css';

export const PRELOADER_CONFIG = {
  colors: { background: '#0B0F10', teal: '#0E9A94' },
  minDuration: 2800,
  reducedMotionDuration: 700,
  maxDuration: 4500,
  logoWidth: 'clamp(160px, 28vw, 340px)',
};

const particleCount = typeof window !== 'undefined' && window.innerWidth < 600 ? 14 : 26;

function waitForWindowLoad() {
  if (document.readyState === 'complete') return Promise.resolve();
  return new Promise((resolve) => window.addEventListener('load', resolve, { once: true }));
}

function preloadImage(source) {
  return new Promise((resolve) => {
    const image = new Image();
    image.onload = resolve;
    image.onerror = resolve;
    image.src = source;
  });
}

function LogoStage({ logoSrc, reducedMotion, exiting }) {
  const stageRef = useRef(null);
  const pointerX = useMotionValue(0);
  const pointerY = useMotionValue(0);
  const springX = useSpring(pointerX, { stiffness: 120, damping: 18, mass: .55 });
  const springY = useSpring(pointerY, { stiffness: 120, damping: 18, mass: .55 });
  const rotateY = useTransform(springX, [-1, 1], [-6, 6]);
  const rotateX = useTransform(springY, [-1, 1], [5, -5]);

  useEffect(() => {
    if (reducedMotion) return undefined;
    const handlePointerMove = (event) => {
      if (!stageRef.current) return;
      const bounds = stageRef.current.getBoundingClientRect();
      pointerX.set((event.clientX - bounds.left) / bounds.width * 2 - 1);
      pointerY.set((event.clientY - bounds.top) / bounds.height * 2 - 1);
    };
    const resetPointer = () => { pointerX.set(0); pointerY.set(0); };
    window.addEventListener('pointermove', handlePointerMove, { passive: true });
    window.addEventListener('blur', resetPointer);
    return () => {
      window.removeEventListener('pointermove', handlePointerMove);
      window.removeEventListener('blur', resetPointer);
    };
  }, [pointerX, pointerY, reducedMotion]);

  return <div className="preloader-stage" ref={stageRef}>
    <motion.div className="preloader-glow" animate={{ scale: exiting ? 3.5 : [1, 1.08, 1], opacity: exiting ? 0 : [.32, .5, .32] }} transition={{ duration: exiting ? .8 : 2.4, repeat: exiting ? 0 : Infinity, ease: 'easeInOut' }} />
    <motion.div className="preloader-logo-wrap" style={reducedMotion ? undefined : { rotateX, rotateY }} initial={reducedMotion ? { opacity: 0 } : { opacity: 0, scale: .2, z: -1500, rotateY: -180, rotateX: 25, filter: 'blur(12px)' }} animate={exiting ? { opacity: 0, scale: 6, z: 500, rotateX: 0, rotateY: 0, filter: 'blur(4px)' } : reducedMotion ? { opacity: 1 } : { opacity: 1, scale: 1, z: 0, rotateY: 0, rotateX: 0, filter: 'blur(0px)' }} transition={exiting ? { duration: .8, ease: [0.76, 0, .24, 1] } : reducedMotion ? { duration: .55 } : { delay: .8, duration: 1.4, ease: [0.22, 1, .36, 1] }}>
      <motion.img className="preloader-logo" src={logoSrc} alt="Baqiatullah Foundation" animate={exiting || reducedMotion ? undefined : { y: [-10, 10, -10], rotateY: [-6, 6, -6] }} transition={exiting ? undefined : { delay: 2.2, duration: 2.8, repeat: Infinity, ease: 'easeInOut' }} />
      <motion.span className="preloader-shine" aria-hidden="true" initial={{ x: '-130%' }} animate={{ x: exiting ? '130%' : '130%' }} transition={{ delay: 2.35, duration: .85, ease: 'easeInOut' }} />
    </motion.div>
    <motion.div className="preloader-shadow" animate={exiting ? { opacity: 0, scale: .25 } : { opacity: [.22, .12, .22], scale: [.9, 1.05, .9] }} transition={{ duration: 2.8, repeat: exiting ? 0 : Infinity, ease: 'easeInOut' }} />
  </div>;
}

export default function Preloader({ logoSrc, onComplete }) {
  const [exiting, setExiting] = useState(false);
  const [progress, setProgress] = useState(0);
  const [canSkip, setCanSkip] = useState(false);
  const reducedMotion = useMemo(() => window.matchMedia?.('(prefers-reduced-motion: reduce)').matches ?? false, []);
  const duration = reducedMotion ? PRELOADER_CONFIG.reducedMotionDuration : PRELOADER_CONFIG.minDuration;
  const particles = useMemo(() => Array.from({ length: particleCount }, (_, index) => ({ id: index, left: `${(index * 37) % 100}%`, delay: `${(index % 9) * .22}s`, duration: `${3.8 + (index % 5) * .65}s`, size: `${2 + index % 3}px` })), []);

  useEffect(() => {
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    let finished = false;
    const startedAt = performance.now();
    const complete = () => {
      if (finished) return;
      finished = true;
      setExiting(true);
      window.setTimeout(onComplete, reducedMotion ? 350 : 800);
    };
    const imageReady = preloadImage(logoSrc);
    const pageReady = waitForWindowLoad();
    const minimumReady = new Promise((resolve) => window.setTimeout(resolve, duration));
    const finishWhenReady = async () => {
      await Promise.race([Promise.all([imageReady, pageReady, minimumReady]), new Promise((resolve) => window.setTimeout(resolve, PRELOADER_CONFIG.maxDuration))]);
      complete();
    };
    finishWhenReady();
    const progressTimer = window.setInterval(() => setProgress(Math.min(100, ((performance.now() - startedAt) / duration) * 100)), 50);
    const skipTimer = window.setTimeout(() => setCanSkip(true), 1000);
    return () => {
      finished = true;
      document.body.style.overflow = previousOverflow;
      window.clearInterval(progressTimer);
      window.clearTimeout(skipTimer);
    };
  }, [duration, logoSrc, onComplete, reducedMotion]);

  const skip = () => {
    if (canSkip) {
      setProgress(100);
      setExiting(true);
      window.setTimeout(onComplete, reducedMotion ? 200 : 650);
    }
  };

  return <motion.div className="preloader" role="status" aria-label="Loading Baqiatullah Foundation" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
    <div className="preloader-particles" aria-hidden="true">{particles.map((particle) => <i key={particle.id} style={{ left: particle.left, '--particle-delay': particle.delay, '--particle-duration': particle.duration, '--particle-size': particle.size }} />)}</div>
    <div className="preloader-radial" aria-hidden="true" />
    <LogoStage logoSrc={logoSrc} reducedMotion={reducedMotion} exiting={exiting} />
    <div className="preloader-meta"><span>BAQIATULLAH FOUNDATION</span><div className="preloader-progress"><i style={{ width: `${progress}%` }} /></div><small>{Math.round(progress)}%</small></div>
    <AnimatePresence>{canSkip && <motion.button className="preloader-skip" type="button" onClick={skip} initial={{ opacity: 0 }} animate={{ opacity: .72 }} exit={{ opacity: 0 }}>Skip intro</motion.button>}</AnimatePresence>
    <div className={`preloader-curtain curtain-left${exiting ? ' is-open' : ''}`} aria-hidden="true" /><div className={`preloader-curtain curtain-right${exiting ? ' is-open' : ''}`} aria-hidden="true" />
  </motion.div>;
}
