'use client';

import { CanvasOptions } from '@/types';
import React, { useEffect, useRef } from 'react';

const NeonHexagon = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    // Ensure canvas and context are available before proceeding
    const canvas = canvasRef.current;
    if (!canvas) return () => {};

    // Non-null assertion is safe here as we've already checked canvas exists
    const ctx = canvas.getContext('2d')!;

    const opts: CanvasOptions = {
      len: 20,
      count: 50,
      baseTime: 10,
      addedTime: 10,
      dieChance: 0.05,
      spawnChance: 1,
      sparkChance: 0.1,
      sparkDist: 10,
      sparkSize: 2,

      color: 'hsl(hue,100%,light%)',
      baseLight: 50,
      addedLight: 10,
      shadowToTimePropMult: 6,
      baseLightInputMultiplier: 0.01,
      addedLightInputMultiplier: 0.02,

      cx: 0,
      cy: 0,
      repaintAlpha: 0.04,
      hueChange: 1, // Increased for faster color change
    };

    let w = (canvas.width = window.innerWidth);
    let h = (canvas.height = window.innerHeight);
    opts.cx = w / 2;
    opts.cy = h / 2;

    let tick = 0;
    const lines: Line[] = [];
    const localDieX = w / 2 / opts.len;
    const localDieY = h / 2 / opts.len;

    const baseRad = (Math.PI * 2) / 6;

    ctx.fillStyle = 'black';
    ctx.fillRect(0, 0, w, h);

    class Line {
      x: number = 0;
      y: number = 0;
      addedX: number = 0;
      addedY: number = 0;
      rad: number = 0;
      time: number = 0;
      targetTime: number = 0;
      lightInputMultiplier: number = 0;
      color: string = '';
      cumulativeTime: number = 0;
      hue: number = 0;

      constructor(
        private ctx: CanvasRenderingContext2D,
        private opts: CanvasOptions,
        private tick: number,
        private localDieX: number,
        private localDieY: number,
        private baseRad: number
      ) {
        this.reset();
      }

      reset() {
        this.x = 0;
        this.y = 0;
        this.addedX = 0;
        this.addedY = 0;

        this.rad = 0;

        this.lightInputMultiplier =
          this.opts.baseLightInputMultiplier +
          this.opts.addedLightInputMultiplier * Math.random();

        // Generate a smooth rainbow color
        this.hue = (this.tick * this.opts.hueChange) % 360;

        this.color = `hsl(${this.hue}, 100%, ${
          this.opts.baseLight +
          this.opts.addedLight *
            Math.sin(this.cumulativeTime * this.lightInputMultiplier)
        }%)`;

        this.cumulativeTime = 0;

        this.beginPhase();
      }

      beginPhase() {
        this.x += this.addedX;
        this.y += this.addedY;

        this.time = 0;
        this.targetTime = Math.floor(
          this.opts.baseTime + this.opts.addedTime * Math.random()
        );

        this.rad += this.baseRad * (Math.random() < 0.5 ? 1 : -1);
        this.addedX = Math.cos(this.rad);
        this.addedY = Math.sin(this.rad);

        if (
          Math.random() < this.opts.dieChance ||
          this.x > this.localDieX ||
          this.x < -this.localDieX ||
          this.y > this.localDieY ||
          this.y < -this.localDieY
        ) {
          this.reset();
        }
      }

      step() {
        ++this.time;
        ++this.cumulativeTime;

        if (this.time >= this.targetTime) this.beginPhase();

        const prop = this.time / this.targetTime;
        const wave = Math.sin((prop * Math.PI) / 2);
        const x = this.addedX * wave;
        const y = this.addedY * wave;

        // Update hue for continuous rainbow effect
        this.hue = (this.hue + 1) % 360;

        this.color = `hsl(${this.hue}, 100%, ${
          this.opts.baseLight +
          this.opts.addedLight *
            Math.sin(this.cumulativeTime * this.lightInputMultiplier)
        }%)`;

        this.ctx.shadowBlur = prop * this.opts.shadowToTimePropMult;
        this.ctx.fillStyle = this.ctx.shadowColor = this.color;
        this.ctx.fillRect(
          this.opts.cx + (this.x + x) * this.opts.len,
          this.opts.cy + (this.y + y) * this.opts.len,
          2,
          2
        );

        if (Math.random() < this.opts.sparkChance) {
          this.ctx.fillRect(
            this.opts.cx +
              (this.x + x) * this.opts.len +
              Math.random() *
                this.opts.sparkDist *
                (Math.random() < 0.5 ? 1 : -1) -
              this.opts.sparkSize / 2,
            this.opts.cy +
              (this.y + y) * this.opts.len +
              Math.random() *
                this.opts.sparkDist *
                (Math.random() < 0.5 ? 1 : -1) -
              this.opts.sparkSize / 2,
            this.opts.sparkSize,
            this.opts.sparkSize
          );
        }
      }
    }

    function loop() {
      window.requestAnimationFrame(loop);

      ++tick;

      ctx.globalCompositeOperation = 'source-over';
      ctx.shadowBlur = 0;
      ctx.fillStyle = `rgba(0,0,0,${opts.repaintAlpha})`;
      ctx.fillRect(0, 0, w, h);
      ctx.globalCompositeOperation = 'lighter';

      if (lines.length < opts.count && Math.random() < opts.spawnChance)
        lines.push(new Line(ctx, opts, tick, localDieX, localDieY, baseRad));

      lines.forEach((line) => line.step());
    }

    const resizeHandler = () => {
      w = canvas.width = window.innerWidth;
      h = canvas.height = window.innerHeight;

      ctx.fillStyle = 'black';
      ctx.fillRect(0, 0, w, h);

      opts.cx = w / 2;
      opts.cy = h / 2;
    };

    window.addEventListener('resize', resizeHandler);

    loop();

    // Cleanup function
    return () => {
      window.removeEventListener('resize', resizeHandler);
    };
  }, []);

  return (
    <div>
      <canvas
        ref={canvasRef}
        id="canvas"
        style={{
          position: 'fixed',
          top: 0,
          left: 0,
          width: '100%',
          height: '100%',
          zIndex: -1,
        }}
      />
    </div>
  );
};

export default NeonHexagon;
