import { useEffect, useRef, useCallback } from 'react';

interface Dot {
  x: number;
  y: number;
  targetX: number;
  targetY: number;
  size: number;
  opacity: number;
  color: string;
}

export function CursorFollower() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const dotsRef = useRef<Dot[]>([]);
  const mouseRef = useRef({ x: 0, y: 0 });
  const animationRef = useRef<number | null>(null);
  const isActiveRef = useRef(true);

  const initDots = useCallback((width: number, height: number) => {
    const dots: Dot[] = [];
    const numDots = 25;
    const colors = ['#3d1d6b', '#563393', '#8262b0', '#211c52'];
    
    for (let i = 0; i < numDots; i++) {
      dots.push({
        x: Math.random() * width,
        y: Math.random() * height,
        targetX: Math.random() * width,
        targetY: Math.random() * height,
        size: Math.random() * 4 + 2,
        opacity: Math.random() * 0.5 + 0.2,
        color: colors[Math.floor(Math.random() * colors.length)],
      });
    }
    return dots;
  }, []);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const resizeCanvas = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
      dotsRef.current = initDots(canvas.width, canvas.height);
    };

    resizeCanvas();
    window.addEventListener('resize', resizeCanvas);

    const handleMouseMove = (e: MouseEvent) => {
      mouseRef.current = { x: e.clientX, y: e.clientY };
    };

    const handleMouseEnter = () => {
      isActiveRef.current = true;
    };

    const handleMouseLeave = () => {
      isActiveRef.current = false;
    };

    window.addEventListener('mousemove', handleMouseMove, { passive: true });
    document.addEventListener('mouseenter', handleMouseEnter);
    document.addEventListener('mouseleave', handleMouseLeave);

    let frameCount = 0;
    const animate = () => {
      frameCount++;
      if (frameCount % 2 === 0) {
        ctx.clearRect(0, 0, canvas.width, canvas.height);

        dotsRef.current.forEach((dot, index) => {
          const followSpeed = 0.02 + (index * 0.002);

          if (isActiveRef.current) {
            const offsetX = Math.sin(Date.now() * 0.001 + index) * 50;
            const offsetY = Math.cos(Date.now() * 0.001 + index) * 50;
            dot.targetX = mouseRef.current.x + offsetX;
            dot.targetY = mouseRef.current.y + offsetY;
          } else {
            dot.targetX += Math.sin(Date.now() * 0.0005 + index) * 0.5;
            dot.targetY += Math.cos(Date.now() * 0.0005 + index) * 0.5;
          }

          dot.x += (dot.targetX - dot.x) * followSpeed;
          dot.y += (dot.targetY - dot.y) * followSpeed;

          dot.x = Math.max(0, Math.min(canvas.width, dot.x));
          dot.y = Math.max(0, Math.min(canvas.height, dot.y));

          ctx.beginPath();
          ctx.arc(dot.x, dot.y, dot.size, 0, Math.PI * 2);
          ctx.fillStyle = dot.color;
          ctx.globalAlpha = dot.opacity;
          ctx.fill();

          const gradient = ctx.createRadialGradient(
            dot.x, dot.y, 0,
            dot.x, dot.y, dot.size * 3
          );
          gradient.addColorStop(0, dot.color);
          gradient.addColorStop(1, 'transparent');
          ctx.beginPath();
          ctx.arc(dot.x, dot.y, dot.size * 3, 0, Math.PI * 2);
          ctx.fillStyle = gradient;
          ctx.globalAlpha = dot.opacity * 0.3;
          ctx.fill();
        });

        ctx.globalAlpha = 0.1;
        ctx.strokeStyle = '#8262b0';
        ctx.lineWidth = 0.5;
        
        for (let i = 0; i < dotsRef.current.length; i++) {
          for (let j = i + 1; j < dotsRef.current.length; j++) {
            const dx = dotsRef.current[i].x - dotsRef.current[j].x;
            const dy = dotsRef.current[i].y - dotsRef.current[j].y;
            const distance = Math.sqrt(dx * dx + dy * dy);
            
            if (distance < 100) {
              ctx.beginPath();
              ctx.moveTo(dotsRef.current[i].x, dotsRef.current[i].y);
              ctx.lineTo(dotsRef.current[j].x, dotsRef.current[j].y);
              ctx.globalAlpha = 0.1 * (1 - distance / 100);
              ctx.stroke();
            }
          }
        }

        ctx.globalAlpha = 1;
      }

      animationRef.current = requestAnimationFrame(animate);
    };

    animate();

    return () => {
      window.removeEventListener('resize', resizeCanvas);
      window.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mouseenter', handleMouseEnter);
      document.removeEventListener('mouseleave', handleMouseLeave);
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
      }
    };
  }, [initDots]);

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 pointer-events-none z-0"
      style={{ opacity: 0.6 }}
    />
  );
}
