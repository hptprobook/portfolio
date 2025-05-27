'use client';

import { useEffect } from 'react';

// Define types for the animation
interface Point {
  x: number;
  y: number;
  originX: number;
  originY: number;
  active?: number;
  closest?: Point[];
  circle?: Circle;
}

interface Target {
  x: number;
  y: number;
}

class Circle {
  pos: Point;
  radius: number;
  color: string;
  active: number = 0;

  constructor(pos: Point, rad: number, color: string) {
    this.pos = pos;
    this.radius = rad;
    this.color = color;
  }

  draw(ctx: CanvasRenderingContext2D): void {
    if (!this.active) return;
    ctx.beginPath();
    ctx.arc(this.pos.x, this.pos.y, this.radius, 0, 2 * Math.PI, false);
    ctx.fillStyle = `rgba(156,217,249,${this.active})`;
    ctx.fill();
  }
}

export default function Home() {
  useEffect(() => {
    let width: number, height: number, largeHeader: HTMLElement | null, canvas: HTMLCanvasElement | null, ctx: CanvasRenderingContext2D | null, points: Point[], target: Target, animateHeader = true;

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
          const px = x + Math.random() * width / 20;
          const py = y + Math.random() * height / 20;
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
        const c = new Circle(point, 2 + Math.random() * 2, 'rgba(255,255,255,0.3)');
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
      let posx = 0, posy = 0;
      if (e.pageX || e.pageY) {
        posx = e.pageX;
        posy = e.pageY;
      } else if (e.clientX || e.clientY) {
        posx = e.clientX + document.body.scrollLeft + document.documentElement.scrollLeft;
        posy = e.clientY + document.body.scrollTop + document.documentElement.scrollTop;
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
        const easing = progress < 0.5 ? 2 * progress * progress : 1 - Math.pow(-2 * progress + 2, 2) / 2;
        
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
    <div id="large-header" className="large-header">
      <canvas id="demo-canvas"></canvas>
      <h1 className="main-title">
        TAO TÊN HOÁ
      </h1>
    </div>
  );
}
