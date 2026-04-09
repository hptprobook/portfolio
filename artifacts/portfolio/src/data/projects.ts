import {
  SiReact,
  SiNestjs,
  SiAngular,
  SiTypescript,
  SiMysql,
} from 'react-icons/si';
import Gamora from '@/assets/images/gamora.png';
import VietArtSpace from '@/assets/images/vietartspace.png';
import InAnhViet from '@/assets/images/inanhviet.png';
import type { ComponentType } from 'react';

export interface TechItem {
  name: string;
  icon: ComponentType<{ size?: number; className?: string }>;
}

export interface Project {
  number: string;
  title: string;
  description: string;
  stack: TechItem[];
  github: string;
  live: string;
  featured: boolean;
  image: string;
}

export const projects: Project[] = [
  {
    number: '01',
    title: 'Booking Court Management System',
    description:
      'A real-time project management platform with drag-and-drop boards, team collaboration, and analytics dashboards. Built with a NestJS microservices backend and React frontend.',
    stack: [
      { name: 'Angular', icon: SiAngular },
      { name: 'NestJS', icon: SiNestjs },
      { name: 'MySQL', icon: SiMysql },
      { name: 'TypeScript', icon: SiTypescript },
    ],
    github: '',
    live: '',
    featured: true,
    image: Gamora,
  },
  {
    number: '02',
    title: 'Selling paintings website',
    description:
      'A full-stack e-commerce platform for selling paintings online. Features include user authentication, product listings, shopping cart, and secure payment processing.',
    stack: [
      { name: 'NestJS', icon: SiNestjs },
      { name: 'MySQL', icon: SiMysql },
      { name: 'TypeScript', icon: SiTypescript },
      { name: 'Angular', icon: SiAngular },
    ],
    github: '',
    live: '',
    featured: true,
    image: VietArtSpace,
  },
  {
    number: '03',
    title: 'Print pictures website',
    description:
      'Feature-rich enterprise admin dashboard with role-based access control, data visualization, and real-time notification system. Uses Angular Material and RxJS.',
    stack: [
      { name: 'React', icon: SiReact },
      { name: 'TypeScript', icon: SiTypescript },
      { name: 'NestJS', icon: SiNestjs },
      { name: 'MySQL', icon: SiMysql },
    ],
    github: '',
    live: '',
    featured: false,
    image: InAnhViet,
  },
];
