import { useEffect, useRef, useState, useCallback } from 'react';
import Matter from 'matter-js';
import {
  SiReact,
  SiAngular,
  SiNodedotjs,
  SiNestjs,
  SiTypescript,
  SiJavascript,
  SiGit,
  SiMongodb,
  SiDocker,
  SiTailwindcss,
  SiExpress,
  SiMysql,
  SiJenkins,
  SiPhp,
  SiLaravel,
} from 'react-icons/si';
import type { IconType } from 'react-icons';

interface BallDef {
  name: string;
  icon: IconType;
  color: string;
  radius: number;
}

const BALLS: BallDef[] = [
  { name: 'React', icon: SiReact, color: '#61DAFB', radius: 46 },
  { name: 'Angular', icon: SiAngular, color: '#DD0031', radius: 46 },
  { name: 'Node.js', icon: SiNodedotjs, color: '#339933', radius: 46 },
  { name: 'NestJS', icon: SiNestjs, color: '#E0234E', radius: 46 },
  { name: 'TypeScript', icon: SiTypescript, color: '#3178C6', radius: 46 },
  { name: 'JavaScript', icon: SiJavascript, color: '#F7DF1E', radius: 46 },
  { name: 'MySQL', icon: SiMysql, color: '#4169E1', radius: 46 },
  { name: 'MongoDB', icon: SiMongodb, color: '#47A248', radius: 20 },
  { name: 'Express', icon: SiExpress, color: '#888888', radius: 50 },
  { name: 'Tailwind', icon: SiTailwindcss, color: '#06B6D4', radius: 46 },
  { name: 'Docker', icon: SiDocker, color: '#2496ED', radius: 26 },
  { name: 'Git', icon: SiGit, color: '#F05032', radius: 46 },
  { name: 'PHP', icon: SiPhp, color: '#777BB4', radius: 12 },
  { name: 'Laravel', icon: SiLaravel, color: '#FF2D20', radius: 12 },
  { name: 'Jenkins', icon: SiJenkins, color: '#F2C037', radius: 18 },
];

const PIT_HEIGHT = 500;
const CURSOR_RADIUS = 36;

export default function SkillBallPit() {
  const containerRef = useRef<HTMLDivElement>(null);
  const engineRef = useRef<Matter.Engine | null>(null);
  const runnerRef = useRef<Matter.Runner | null>(null);
  const ballBodiesRef = useRef<Matter.Body[]>([]);
  const cursorBodyRef = useRef<Matter.Body | null>(null);
  const rafRef = useRef<number>(0);
  const mouseRef = useRef({ x: -999, y: -999, prevX: -999, prevY: -999 });

  const [positions, setPositions] = useState<
    { x: number; y: number; angle: number }[]
  >([]);
  const [cursorPos, setCursorPos] = useState({ x: -999, y: -999 });

  const getWidth = useCallback(() => {
    const el = containerRef.current;
    return (el?.offsetWidth ?? 0) || Math.min(window.innerWidth - 48, 1100);
  }, []);

  useEffect(() => {
    const width = getWidth();

    const engine = Matter.Engine.create({ gravity: { x: 0, y: 1.4 } });
    engineRef.current = engine;

    const T = 80;
    const wallOpts: Matter.IChamferableBodyDefinition = {
      isStatic: true,
      restitution: 0.4,
      friction: 0.1,
      render: { visible: false },
    };
    Matter.World.add(engine.world, [
      Matter.Bodies.rectangle(
        width / 2,
        PIT_HEIGHT + T / 2,
        width * 3,
        T,
        wallOpts,
      ),
      Matter.Bodies.rectangle(
        -T / 2,
        PIT_HEIGHT / 2,
        T,
        PIT_HEIGHT * 4,
        wallOpts,
      ),
      Matter.Bodies.rectangle(
        width + T / 2,
        PIT_HEIGHT / 2,
        T,
        PIT_HEIGHT * 4,
        wallOpts,
      ),
    ]);

    // Cursor body — high-mass kinematic body that follows the mouse
    const cursor = Matter.Bodies.circle(-999, -999, CURSOR_RADIUS, {
      isStatic: false,
      collisionFilter: { category: 0x0002, mask: 0x0001 },
      frictionAir: 1,
      restitution: 0.6,
      density: 10,
      label: 'cursor',
    });
    Matter.Body.setMass(cursor, 80);
    cursorBodyRef.current = cursor;
    Matter.World.add(engine.world, cursor);

    // Ball bodies
    const bodies = BALLS.map((ball, i) => {
      const col = i % 6;
      const row = Math.floor(i / 6);
      const colWidth = (width - ball.radius * 2) / 5;
      const x = ball.radius + col * colWidth + (Math.random() - 0.5) * 24;
      const y = -ball.radius - row * 160 - Math.random() * 50;
      const body = Matter.Bodies.circle(
        Math.max(ball.radius + 2, Math.min(width - ball.radius - 2, x)),
        y,
        ball.radius,
        {
          restitution: 0.55,
          friction: 0.02,
          frictionAir: 0.009,
          density: 0.0015,
          collisionFilter: { category: 0x0001, mask: 0x0001 | 0x0002 },
          label: String(i),
        },
      );
      Matter.Body.setVelocity(body, { x: (Math.random() - 0.5) * 4, y: 1 });
      return body;
    });

    ballBodiesRef.current = bodies;
    Matter.World.add(engine.world, bodies);

    const runner = Matter.Runner.create();
    runnerRef.current = runner;
    Matter.Runner.run(runner, engine);

    const tick = () => {
      // Drive cursor body to mouse position kinematically
      const { x, y, prevX, prevY } = mouseRef.current;
      const cursorBody = cursorBodyRef.current!;
      const vx = (x - prevX) * 0.6;
      const vy = (y - prevY) * 0.6;
      Matter.Body.setPosition(cursorBody, { x, y });
      Matter.Body.setVelocity(cursorBody, { x: vx, y: vy });
      mouseRef.current.prevX = x;
      mouseRef.current.prevY = y;

      setPositions(
        bodies.map((b) => ({
          x: b.position.x,
          y: b.position.y,
          angle: b.angle,
        })),
      );
      setCursorPos({ x, y });

      rafRef.current = requestAnimationFrame(tick);
    };
    rafRef.current = requestAnimationFrame(tick);

    return () => {
      cancelAnimationFrame(rafRef.current);
      Matter.Runner.stop(runner);
      Matter.Engine.clear(engine);
      ballBodiesRef.current = [];
      cursorBodyRef.current = null;
    };
  }, [getWidth]);

  const handleMouseMove = useCallback((e: React.MouseEvent<HTMLDivElement>) => {
    const rect = containerRef.current!.getBoundingClientRect();
    mouseRef.current.x = e.clientX - rect.left;
    mouseRef.current.y = e.clientY - rect.top;
  }, []);

  const handleMouseLeave = useCallback(() => {
    mouseRef.current.x = -999;
    mouseRef.current.y = -999;
  }, []);

  const isInsidePit = cursorPos.x > 0 && cursorPos.x < 9000 && cursorPos.y > 0;

  return (
    <div
      ref={containerRef}
      className="relative w-full rounded-2xl overflow-hidden border border-white/10 bg-linear-to-b from-slate-900/80 to-slate-950/90"
      style={{ height: PIT_HEIGHT, cursor: 'none' }}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      data-testid="skills-ballpit"
    >
      {/* Subtle grid floor */}
      <div
        className="absolute inset-0 opacity-[0.04] pointer-events-none"
        style={{
          backgroundImage:
            'linear-gradient(to right, #fff 1px, transparent 1px), linear-gradient(to bottom, #fff 1px, transparent 1px)',
          backgroundSize: '40px 40px',
        }}
      />

      {/* Balls */}
      {positions.map((pos, idx) => {
        const ball = BALLS[idx];
        const Icon = ball.icon;
        const r = ball.radius;
        const isGold = ball.color === '#F7DF1E';

        return (
          <div
            key={idx}
            className="absolute pointer-events-none"
            style={{
              left: pos.x - r,
              top: pos.y - r,
              width: r * 2,
              height: r * 2,
            }}
            data-testid={`ball-${ball.name.toLowerCase().replace(/[\s.]/g, '')}`}
          >
            {/* Bubble shell */}
            <div
              className="absolute inset-0 rounded-full"
              style={{
                background: `
                  radial-gradient(circle at 32% 28%,
                    rgba(255,255,255,0.55) 0%,
                    rgba(255,255,255,0.08) 30%,
                    ${ball.color}22 60%,
                    ${ball.color}18 100%
                  )
                `,
                border: `1.5px solid ${ball.color}55`,
                boxShadow: `
                  0 0 18px ${ball.color}30,
                  inset 0 -2px 6px ${ball.color}30,
                  inset 0 2px 8px rgba(255,255,255,0.25)
                `,
                backdropFilter: 'blur(2px)',
              }}
            />
            {/* Specular highlight */}
            <div
              className="absolute rounded-full"
              style={{
                top: '12%',
                left: '20%',
                width: '30%',
                height: '18%',
                background:
                  'radial-gradient(ellipse, rgba(255,255,255,0.75) 0%, transparent 100%)',
                transform: 'rotate(-30deg)',
                filter: 'blur(1px)',
              }}
            />
            {/* Icon + label */}
            <div
              className="absolute inset-0 flex flex-col items-center justify-center"
              style={{ paddingTop: 4 }}
            >
              <Icon
                size={r * 0.48}
                style={{
                  color: isGold ? '#7a6700' : ball.color,
                  filter: `drop-shadow(0 0 6px ${ball.color}cc)`,
                }}
              />
              <span
                className="font-mono font-bold leading-none mt-1 pointer-events-none"
                style={{
                  fontSize: Math.max(8, r * 0.2),
                  color: isGold ? '#5a4d00' : 'rgba(255,255,255,0.9)',
                  textShadow: isGold ? 'none' : `0 1px 3px rgba(0,0,0,0.8)`,
                }}
              >
                {ball.name}
              </span>
            </div>
          </div>
        );
      })}

      {/* Custom cursor bubble */}
      {isInsidePit && (
        <div
          className="absolute pointer-events-none"
          style={{
            left: cursorPos.x - CURSOR_RADIUS,
            top: cursorPos.y - CURSOR_RADIUS,
            width: CURSOR_RADIUS * 2,
            height: CURSOR_RADIUS * 2,
          }}
        >
          <div
            className="absolute inset-0 rounded-full"
            style={{
              background:
                'radial-gradient(circle at 38% 32%, rgba(255,255,255,0.3) 0%, rgba(255,255,255,0.03) 60%, transparent 100%)',
              border: '1.5px solid rgba(255,255,255,0.3)',
              boxShadow:
                '0 0 12px rgba(255,255,255,0.08), inset 0 1px 4px rgba(255,255,255,0.2)',
            }}
          />
          {/* Small cross-hair dot */}
          <div
            className="absolute rounded-full bg-white/60"
            style={{
              width: 4,
              height: 4,
              top: '50%',
              left: '50%',
              transform: 'translate(-50%, -50%)',
            }}
          />
        </div>
      )}
    </div>
  );
}
