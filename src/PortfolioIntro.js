import React, { useState, useEffect, useRef, useCallback } from 'react';
import './App.css';

const languages = [
  { greeting: 'Hello' },
  { greeting: 'नमस्ते' },
  { greeting: 'Hola' },
  { greeting: 'Bonjour' },
  { greeting: 'こんにちは' },
  { greeting: 'مرحبا' },
  { greeting: 'Ciao' }
];

const PortfolioIntro = () => {
  const canvasRef = useRef(null);
  const [currentLangIndex, setCurrentLangIndex] = useState(0);
  const [isTransitioning, setIsTransitioning] = useState(false);
  const [floatingWords, setFloatingWords] = useState([]);
  const animationRef = useRef();
  const wordSpawnRef = useRef();

  // Particles
  const particles = useRef([]);
  const particleCount = 80;

  const resizeCanvas = useCallback(() => {
    const canvas = canvasRef.current;
    if (canvas) {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    }
  }, []);

  // Initialize particles
  const initParticles = useCallback(() => {
    particles.current = [];
    for (let i = 0; i < particleCount; i++) {
      particles.current.push({
        x: Math.random() * window.innerWidth,
        y: Math.random() * window.innerHeight,
        vy: (Math.random() * 0.7 + 0.6),
        size: Math.random() * 2 + 1,
      });
    }
  }, [particleCount]);

  // Canvas animation loop
  const animate = useCallback(() => {
    const canvas = canvasRef.current;
    const ctx = canvas?.getContext('2d');
    if (!ctx) return;

    // Keep canvas background fully black and allow the overlay animation to add the white fade.
    ctx.fillStyle = 'rgba(0, 0, 0, 0.92)';
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    // Particles
    ctx.fillStyle = '#ffffff';
    particles.current.forEach(p => {
      ctx.beginPath();
      ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
      ctx.fill();
      p.y -= p.vy;
      if (p.y < 0) p.y = canvas.height;
    });

    animationRef.current = requestAnimationFrame(animate);
  }, []);

  // Floating words spawn
  const spawnFloatingWord = useCallback(() => {
    const lang = languages[Math.floor(Math.random() * languages.length)];
    setFloatingWords(prev => [...prev, {
      id: Date.now(),
      text: lang.greeting,
      x: Math.random() * (window.innerWidth - 200),
      y: window.innerHeight,
      // Faster float speed (shorter lifetime) for a quicker pace
      vy: (window.innerHeight / (1200 + Math.random() * 1400)),
      rotation: (Math.random() - 0.5) * 0.2,
      opacity: 0.13
    }]);
  }, []);

  // Language cycle - slower
  useEffect(() => {
    const interval = setInterval(() => {
      setIsTransitioning(true);
      setTimeout(() => {
        setCurrentLangIndex((prev) => (prev + 1) % languages.length);
        setIsTransitioning(false);
      }, 100); // slower fade
    }, 300); // slower cycle

    return () => clearInterval(interval);
  }, []);

  // Floating words spawn interval (faster feel)
  useEffect(() => {
    wordSpawnRef.current = setInterval(spawnFloatingWord, 120); // 120ms spawn
    return () => clearInterval(wordSpawnRef.current);
  }, [spawnFloatingWord]);

  // Cleanup floating words
  useEffect(() => {
    const interval = setInterval(() => {
      setFloatingWords(prev => prev.filter(word => word.y > -50));
    }, 100);
    return () => clearInterval(interval);
  }, []);

  // Canvas setup
  useEffect(() => {
    resizeCanvas();
    initParticles();
    animate();
    window.addEventListener('resize', resizeCanvas);

    return () => {
      window.removeEventListener('resize', resizeCanvas);
      if (animationRef.current) cancelAnimationFrame(animationRef.current);
    };
  }, [resizeCanvas, initParticles, animate]);

  const currentLang = languages[currentLangIndex];

  return (
    <div className="portfolio-intro">
      <canvas className="particles-canvas" ref={canvasRef} />
      <div className="gradient-overlay" />
      <div className="floating-words-container">
        {floatingWords.map(word => (
          <div
            key={word.id}
            className="floating-word"
            style={{
              left: word.x,
              top: word.y,
              transform: `rotate(${word.rotation}rad)`,
              transition: `top ${word.vy * window.innerHeight}s linear`
            }}
          >
            {word.text}
          </div>
        ))}
      </div>
      <div className="center-content">
        <h1 
          className={`main-greeting ${isTransitioning ? 'transitioning' : ''}`}
          style={{ color: '#ffffff' }}
        >
          {currentLang.greeting}
        </h1>
      </div>
    </div>
  );
};

export default PortfolioIntro;

