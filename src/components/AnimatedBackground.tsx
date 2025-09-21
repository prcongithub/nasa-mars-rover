import { useEffect, useRef } from 'react';

interface Star {
  x: number;
  y: number;
  size: number;
  speed: number;
  opacity: number;
  twinkle: number;
}

interface Planet {
  x: number;
  y: number;
  size: number;
  speed: number;
  color: string;
  rotation: number;
}

interface Comet {
  x: number;
  y: number;
  speed: number;
  tailLength: number;
  angle: number;
  opacity: number;
}

export default function AnimatedBackground() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const animationRef = useRef<number>(0);
  const starsRef = useRef<Star[]>([]);
  const planetsRef = useRef<Planet[]>([]);
  const cometsRef = useRef<Comet[]>([]);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const resizeCanvas = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };

    const createStars = () => {
      const stars: Star[] = [];
      for (let i = 0; i < 200; i++) {
        stars.push({
          x: Math.random() * canvas.width,
          y: Math.random() * canvas.height,
          size: Math.random() * 2 + 0.5,
          speed: Math.random() * 0.5 + 0.1,
          opacity: Math.random() * 0.8 + 0.2,
          twinkle: Math.random() * 0.02 + 0.01
        });
      }
      starsRef.current = stars;
    };

    const createPlanets = () => {
      const planets: Planet[] = [];
      const planetColors = ['#ff6b35', '#8338ec', '#3a86ff', '#ff006e', '#06ffa5'];
      
      for (let i = 0; i < 5; i++) {
        planets.push({
          x: Math.random() * canvas.width,
          y: Math.random() * canvas.height,
          size: Math.random() * 30 + 20,
          speed: Math.random() * 0.3 + 0.1,
          color: planetColors[Math.floor(Math.random() * planetColors.length)],
          rotation: 0
        });
      }
      planetsRef.current = planets;
    };

    const createComets = () => {
      const comets: Comet[] = [];
      for (let i = 0; i < 3; i++) {
        comets.push({
          x: -50,
          y: Math.random() * canvas.height,
          speed: Math.random() * 3 + 2,
          tailLength: Math.random() * 100 + 50,
          angle: Math.random() * 0.5 - 0.25,
          opacity: Math.random() * 0.6 + 0.4
        });
      }
      cometsRef.current = comets;
    };

    const drawStars = () => {
      starsRef.current.forEach(star => {
        ctx.save();
        ctx.globalAlpha = star.opacity;
        ctx.fillStyle = '#ffffff';
        ctx.shadowBlur = star.size * 2;
        ctx.shadowColor = '#ffffff';
        ctx.beginPath();
        ctx.arc(star.x, star.y, star.size, 0, Math.PI * 2);
        ctx.fill();
        ctx.restore();
      });
    };

    const drawPlanets = () => {
      planetsRef.current.forEach(planet => {
        ctx.save();
        ctx.translate(planet.x, planet.y);
        ctx.rotate(planet.rotation);
        
        // Planet glow
        const gradient = ctx.createRadialGradient(0, 0, 0, 0, 0, planet.size * 1.5);
        gradient.addColorStop(0, planet.color + '60');
        gradient.addColorStop(0.7, planet.color + '20');
        gradient.addColorStop(1, 'transparent');
        
        ctx.fillStyle = gradient;
        ctx.beginPath();
        ctx.arc(0, 0, planet.size * 1.5, 0, Math.PI * 2);
        ctx.fill();
        
        // Planet body
        const planetGradient = ctx.createRadialGradient(-planet.size * 0.3, -planet.size * 0.3, 0, 0, 0, planet.size);
        planetGradient.addColorStop(0, planet.color + 'ff');
        planetGradient.addColorStop(0.7, planet.color + 'cc');
        planetGradient.addColorStop(1, planet.color + '66');
        
        ctx.fillStyle = planetGradient;
        ctx.beginPath();
        ctx.arc(0, 0, planet.size, 0, Math.PI * 2);
        ctx.fill();
        
        // Planet rings (for some planets)
        if (Math.random() > 0.7) {
          ctx.strokeStyle = planet.color + '40';
          ctx.lineWidth = 2;
          ctx.beginPath();
          ctx.ellipse(0, 0, planet.size * 1.3, planet.size * 0.3, 0, 0, Math.PI * 2);
          ctx.stroke();
        }
        
        ctx.restore();
      });
    };

    const drawComets = () => {
      cometsRef.current.forEach(comet => {
        ctx.save();
        ctx.globalAlpha = comet.opacity;
        
        // Comet tail
        const tailGradient = ctx.createLinearGradient(
          comet.x, comet.y,
          comet.x - comet.tailLength, comet.y - comet.tailLength * comet.angle
        );
        tailGradient.addColorStop(0, '#00ff80ff');
        tailGradient.addColorStop(0.5, '#00ff8060');
        tailGradient.addColorStop(1, 'transparent');
        
        ctx.strokeStyle = tailGradient;
        ctx.lineWidth = 4;
        ctx.lineCap = 'round';
        ctx.beginPath();
        ctx.moveTo(comet.x, comet.y);
        ctx.lineTo(comet.x - comet.tailLength, comet.y - comet.tailLength * comet.angle);
        ctx.stroke();
        
        // Comet head
        ctx.fillStyle = '#00ff80';
        ctx.shadowBlur = 10;
        ctx.shadowColor = '#00ff80';
        ctx.beginPath();
        ctx.arc(comet.x, comet.y, 4, 0, Math.PI * 2);
        ctx.fill();
        
        ctx.restore();
      });
    };

    const updateStars = () => {
      starsRef.current.forEach(star => {
        star.y += star.speed;
        star.opacity += Math.sin(Date.now() * star.twinkle) * 0.01;
        star.opacity = Math.max(0.2, Math.min(1, star.opacity));
        
        if (star.y > canvas.height + 10) {
          star.y = -10;
          star.x = Math.random() * canvas.width;
        }
      });
    };

    const updatePlanets = () => {
      planetsRef.current.forEach(planet => {
        planet.x += planet.speed;
        planet.rotation += 0.005;
        
        if (planet.x > canvas.width + planet.size * 2) {
          planet.x = -planet.size * 2;
          planet.y = Math.random() * canvas.height;
        }
      });
    };

    const updateComets = () => {
      cometsRef.current.forEach(comet => {
        comet.x += comet.speed;
        comet.y += comet.speed * comet.angle;
        
        if (comet.x > canvas.width + 100) {
          comet.x = -50;
          comet.y = Math.random() * canvas.height;
          comet.speed = Math.random() * 3 + 2;
          comet.angle = Math.random() * 0.5 - 0.25;
          comet.opacity = Math.random() * 0.6 + 0.4;
        }
      });
    };

    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      
      updateStars();
      updatePlanets();
      updateComets();
      
      drawStars();
      drawPlanets();
      drawComets();
      
      animationRef.current = requestAnimationFrame(animate);
    };

    resizeCanvas();
    createStars();
    createPlanets();
    createComets();
    animate();

    const handleResize = () => {
      resizeCanvas();
      createStars();
      createPlanets();
      createComets();
    };

    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
      }
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        width: '100%',
        height: '100%',
        pointerEvents: 'none',
        zIndex: 0,
        opacity: 0.6
      }}
    />
  );
}