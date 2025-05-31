'use client';

import './style.css';
import { Circle, Point, Target } from '@/interfaces';
import { useEffect } from 'react';
import Header from '@/layouts/Header/Header';
import RotatingText from '@/components/text/RotatingText/RotatingText';
import { Compare } from '@/components/ui/Compare/Compare';
import { TextGenerateEffect } from '@/components/text/TextGenerateEffect/TextGenerateEffect';

export default function MainBackground() {
  useEffect(() => {
    let width: number,
      height: number,
      largeHeader: HTMLElement | null,
      canvas: HTMLCanvasElement | null,
      ctx: CanvasRenderingContext2D | null,
      points: Point[],
      target: Target,
      animateHeader = true;

    // Main
    initHeader();
    initAnimation();
    addListeners();

    function initHeader(): void {
      width = window.innerWidth;
      height = window.innerHeight;
      target = { x: width / 2, y: height / 2 };

      largeHeader = document.getElementById('large-header');
      if (largeHeader) {
        largeHeader.style.height = height + 'px';
      }

      canvas = document.getElementById('demo-canvas') as HTMLCanvasElement;
      if (canvas) {
        canvas.width = width;
        canvas.height = height;
        ctx = canvas.getContext('2d');
      }

      // create points
      points = [];
      for (let x = 0; x < width; x = x + width / 20) {
        for (let y = 0; y < height; y = y + height / 20) {
          const px = x + (Math.random() * width) / 20;
          const py = y + (Math.random() * height) / 20;
          const p: Point = { x: px, originX: px, y: py, originY: py };
          points.push(p);
        }
      }

      // for each point find the 5 closest points
      for (let i = 0; i < points.length; i++) {
        const closest: Point[] = [];
        const p1 = points[i];
        for (let j = 0; j < points.length; j++) {
          const p2 = points[j];
          if (!(p1 === p2)) {
            let placed = false;
            for (let k = 0; k < 5; k++) {
              if (!placed) {
                if (closest[k] === undefined) {
                  closest[k] = p2;
                  placed = true;
                }
              }
            }

            for (let k = 0; k < 5; k++) {
              if (!placed) {
                if (getDistance(p1, p2) < getDistance(p1, closest[k])) {
                  closest[k] = p2;
                  placed = true;
                }
              }
            }
          }
        }
        p1.closest = closest;
      }

      // assign a circle to each point
      for (const point of points) {
        const c = new Circle(
          point,
          2 + Math.random() * 2,
          'rgba(255,255,255,0.3)'
        );
        point.circle = c;
      }
    }

    // Event handling
    function addListeners(): void {
      if (!('ontouchstart' in window)) {
        window.addEventListener('mousemove', mouseMove);
      }
      window.addEventListener('scroll', scrollCheck);
      window.addEventListener('resize', resize);
    }

    function mouseMove(e: MouseEvent): void {
      let posx = 0,
        posy = 0;
      if (e.pageX || e.pageY) {
        posx = e.pageX;
        posy = e.pageY;
      } else if (e.clientX || e.clientY) {
        posx =
          e.clientX +
          document.body.scrollLeft +
          document.documentElement.scrollLeft;
        posy =
          e.clientY +
          document.body.scrollTop +
          document.documentElement.scrollTop;
      }
      target.x = posx;
      target.y = posy;
    }

    function scrollCheck(): void {
      if (document.body.scrollTop > height) animateHeader = false;
      else animateHeader = true;
    }

    function resize(): void {
      width = window.innerWidth;
      height = window.innerHeight;
      if (largeHeader) {
        largeHeader.style.height = height + 'px';
      }
      if (canvas) {
        canvas.width = width;
        canvas.height = height;
      }
    }

    // animation
    function initAnimation(): void {
      animate();
      for (const point of points) {
        shiftPoint(point);
      }
    }

    function animate(): void {
      if (animateHeader && ctx) {
        ctx.clearRect(0, 0, width, height);
        for (const point of points) {
          // detect points in range
          if (Math.abs(getDistance(target, point)) < 4000) {
            point.active = 0.3;
            if (point.circle) point.circle.active = 0.6;
          } else if (Math.abs(getDistance(target, point)) < 20000) {
            point.active = 0.1;
            if (point.circle) point.circle.active = 0.3;
          } else if (Math.abs(getDistance(target, point)) < 40000) {
            point.active = 0.02;
            if (point.circle) point.circle.active = 0.1;
          } else {
            point.active = 0;
            if (point.circle) point.circle.active = 0;
          }

          drawLines(point);
          if (point.circle && ctx) {
            point.circle.draw(ctx);
          }
        }
      }
      requestAnimationFrame(animate);
    }

    function shiftPoint(p: Point): void {
      // Simple animation without TweenLite dependency
      const duration = 1000 + Math.random() * 1000;
      const startTime = Date.now();
      const startX = p.x;
      const startY = p.y;
      const targetX = p.originX - 50 + Math.random() * 100;
      const targetY = p.originY - 50 + Math.random() * 100;

      function animatePoint(): void {
        const elapsed = Date.now() - startTime;
        const progress = Math.min(elapsed / duration, 1);

        // Easing function (simple ease-in-out)
        const easing =
          progress < 0.5
            ? 2 * progress * progress
            : 1 - Math.pow(-2 * progress + 2, 2) / 2;

        p.x = startX + (targetX - startX) * easing;
        p.y = startY + (targetY - startY) * easing;

        if (progress < 1) {
          requestAnimationFrame(animatePoint);
        } else {
          shiftPoint(p);
        }
      }
      animatePoint();
    }

    // Canvas manipulation
    function drawLines(p: Point): void {
      if (!p.active || !ctx || !p.closest) return;
      for (const closestPoint of p.closest) {
        ctx.beginPath();
        ctx.moveTo(p.x, p.y);
        ctx.lineTo(closestPoint.x, closestPoint.y);
        ctx.strokeStyle = `rgba(156,217,249,${p.active})`;
        ctx.stroke();
      }
    }

    // Util
    function getDistance(p1: Point | Target, p2: Point): number {
      return Math.pow(p1.x - p2.x, 2) + Math.pow(p1.y - p2.y, 2);
    }

    // Cleanup function
    return () => {
      window.removeEventListener('mousemove', mouseMove);
      window.removeEventListener('scroll', scrollCheck);
      window.removeEventListener('resize', resize);
    };
  }, []);

  return (
    <div
      id="large-header"
      className="large-header relative flex flex-col min-h-screen"
    >
      <canvas
        id="demo-canvas"
        className="absolute top-0 left-0 w-full h-full"
      ></canvas>

      {/* Integrated Header/Navbar */}
      <div className="relative z-10">
        <Header />
      </div>

      {/* Split Content Layout */}
      <div className="relative z-10 flex-1 flex items-center justify-center px-6 lg:px-12">
        <div className="w-full max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-16 items-center min-h-[70vh]">
          {/* Left Side - Rotating Text */}
          <div className="flex flex-col items-center lg:items-start text-center lg:text-left text-white space-y-6">
            {/* Greeting */}
            <div className="mb-4">
              <span className="inline-block px-4 py-2 bg-white/10 backdrop-blur-sm rounded-full text-sm font-medium border border-white/20">
                👋 Hello, I&apos;m Phan Thanh Hoa - A Full-stack Developer
              </span>
            </div>

            {/* Main Title with Rotating Text */}
            <div className="space-y-4">
              <h1 className="text-2xl md:text-5xl lg:text-6xl font-bold leading-tight flex gap-6 items-center">
                <span className="block mb-2">I&apos;m fluent</span>
                <RotatingText
                  texts={[
                    'React',
                    'Next',
                    'Angular',
                    'Node',
                    'Docker',
                    'Golang',
                    'Nest',
                    'Postgre',
                    'MySQL',
                    'Mongo',
                    'Redis',
                    '...'
                  ]}
                  mainClassName="px-2 sm:px-2 md:px-3 bg-cyan-300 text-black overflow-hidden py-0.5 sm:py-1 md:py-2 justify-center rounded-lg"
                  staggerFrom={'last'}
                  initial={{ y: '100%' }}
                  animate={{ y: 0 }}
                  exit={{ y: '-120%' }}
                  staggerDuration={0.025}
                  splitLevelClassName="overflow-hidden pb-0.5 sm:pb-1 md:pb-1"
                  transition={{ type: 'spring', damping: 30, stiffness: 400 }}
                  rotationInterval={3000}
                />
              </h1>
            </div>

            {/* Description */}
            <TextGenerateEffect
              duration={2}
              filter={false}
              words="Passionate about creating modern and creative web experiences. Specializing in Frontend Development with React, TypeScript, and modern technologies."
            />

            {/* Call to Action */}
            <div className="flex flex-col sm:flex-row items-center lg:items-start gap-4 pt-4">
              <button
                onClick={() =>
                  document
                    .getElementById('contact')
                    ?.scrollIntoView({ behavior: 'smooth' })
                }
                className="px-8 py-3 bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 rounded-full font-semibold text-white transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-xl"
              >
                Let&apos;s Connect
              </button>

              <a
                href="mailto:your.email@example.com"
                className="px-8 py-3 border border-white/30 hover:border-white/50 rounded-full font-semibold text-white transition-all duration-300 hover:bg-white/10 backdrop-blur-sm"
              >
                your.email@example.com
              </a>
            </div>
          </div>

          {/* Right Side - Compare Component */}
          <div className="flex items-center justify-center">
            <div className="relative">
              <Compare
                firstImage="https://images.unsplash.com/photo-1517336714731-489689fd1ca8?w=500&h=500&fit=crop&crop=center"
                secondImage="https://images.unsplash.com/photo-1484417894907-623942c8ee29?w=500&h=500&fit=crop&crop=center"
                className="w-[350px] h-[350px] md:w-[400px] md:h-[400px] lg:w-[600px] lg:h-[600px] rounded-2xl overflow-hidden shadow-2xl"
                autoplay={true}
                autoplayDuration={30000}
                firstImageClassName="object-cover"
                secondImageClassname="object-cover"
              />
              {/* Decorative elements */}
              <div className="absolute -top-4 -right-4 w-24 h-24 bg-gradient-to-br from-blue-500/20 to-purple-500/20 rounded-full blur-xl"></div>
              <div className="absolute -bottom-4 -left-4 w-32 h-32 bg-gradient-to-tr from-purple-500/20 to-pink-500/20 rounded-full blur-xl"></div>
            </div>
          </div>
        </div>
      </div>

      {/* Scroll Indicator */}
      <div className="relative z-10 pb-8 flex justify-center">
        <div className="animate-bounce">
          <div className="w-6 h-10 border-2 border-white/30 rounded-full flex justify-center">
            <div className="w-1 h-3 bg-white/60 rounded-full mt-2 animate-pulse"></div>
          </div>
        </div>
      </div>
    </div>
  );
}
