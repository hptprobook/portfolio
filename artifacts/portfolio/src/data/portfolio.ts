import type { ComponentType, CSSProperties } from 'react';
import {
  BadgeCheck,
  Briefcase,
  Code2,
  FileCode2,
  GraduationCap,
  Layers,
  Lightbulb,
  Rocket,
  Server,
  Sparkles,
  Trophy,
  Zap,
} from 'lucide-react';
import {
  SiAngular,
  SiDocker,
  SiGit,
  SiJenkins,
  SiJavascript,
  SiLaravel,
  SiMysql,
  SiNestjs,
  SiNodedotjs,
  SiPhp,
  SiReact,
  SiTypescript,
} from 'react-icons/si';
import AegonaImg from '@/assets/images/aegona.jpg';
import CuoiAgencyImg from '@/assets/images/cuoiagency.webp';
import FptEduImg from '@/assets/images/fptedu.jpg';
import Gamora from '@/assets/images/gamora.png';
import VietArtSpace from '@/assets/images/vietartspace.png';

export const languages = ['vi', 'en'] as const;
export type Language = (typeof languages)[number];
export type ThemeMode = 'light' | 'dark';

type IconComponent = ComponentType<{
  size?: number;
  className?: string;
  style?: CSSProperties;
}>;

export interface TechItem {
  name: string;
  icon: IconComponent;
}

export interface Project {
  number: string;
  title: string;
  period: string;
  description: string;
  stack: TechItem[];
  github: string;
  live: string;
  featured: boolean;
  image: string;
}

export interface TimelineItem {
  type: 'work' | 'edu';
  icon: IconComponent;
  title: string;
  org: string;
  period: string;
  desc: string;
  tags: string[];
  image: string;
  imageAlt: string;
  projectIndices: number[];
  showProjects: boolean;
}

export interface SkillGroup {
  category: string;
  items: {
    name: string;
    icon: IconComponent;
    color: string;
    level: number;
    experience: string;
  }[];
}

export interface Certification {
  title: string;
  issuer: string;
  date: string;
  credentialId: string;
  credentialUrl: string;
  Icon: IconComponent;
  iconColor: string;
  bgColor: string;
}

export interface PortfolioContent {
  profile: {
    name: string;
    logo: string;
    role: string;
    phone: string;
    birthday: string;
    email: string;
    website: string;
    websiteUrl: string;
    location: string;
    github: string;
    linkedin: string;
    cvUrl: string;
  };
  nav: {
    links: { label: string; href: string; testId: string }[];
    cta: string;
    languageLabel: string;
    themeLabel: string;
  };
  hero: {
    words: string[];
    badge: string;
    titleSuffix: string;
    subtitle: string;
    primaryCta: string;
    secondaryCta: string;
    cvCta: string;
    scroll: string;
    snippets: { code: string; x: string; y: string; delay: number; depth: number }[];
  };
  sectionLabels: {
    about: string;
    skills: string;
    projects: string;
    experience: string;
    certifications: string;
    contact: string;
  };
  about: {
    headingTop: string;
    headingAccent: string;
    paragraphs: string[];
    tags: string[];
    traits: { icon: IconComponent; title: string; desc: string }[];
  };
  skills: {
    titlePrefix: string;
    titleAccent: string;
    intro: string;
    groups: SkillGroup[];
  };
  projects: {
    titlePrefix: string;
    titleAccent: string;
    featuredLabel: string;
    moreGithub: string;
    periodLabel: string;
    items: Project[];
  };
  experience: {
    titlePrefix: string;
    titleAccent: string;
    modalTitle: string;
    modalCountSeparator: string;
    viewProjects: string;
    preview: string;
    live: string;
    items: TimelineItem[];
  };
  certifications: {
    titlePrefix: string;
    titleAccent: string;
    intro: string;
    issued: string;
    idLabel: string;
    verify: string;
    items: Certification[];
  };
  contact: {
    titlePrefix: string;
    titleAccent: string;
    intro: string;
    labels: {
      email: string;
      phone: string;
      website: string;
      location: string;
      findMe: string;
      name: string;
      message: string;
    };
    placeholders: {
      name: string;
      email: string;
      message: string;
    };
    send: string;
    sent: string;
    footerLeft: string;
    footerRight: string;
  };
}

const profile = {
  name: 'Phan Thanh Hóa',
  logo: '<HoaPhanDev />',
  role: 'JavaScript Fullstack Developer',
  phone: '0332741249',
  birthday: '14/04/2000',
  email: 'hptpro.dev@gmail.com',
  website: 'hoaphan-dev.vercel.app',
  websiteUrl: 'https://hoaphan-dev.vercel.app',
  location: 'Đường Văn Nga, Buôn Ma Thuột, Đắk Lắk',
  github: 'https://github.com/hptprobook',
  linkedin: 'https://www.linkedin.com/in/phan-thanh-hoa-519920359/',
  cvUrl: '/Phan_Thanh_Hóa_cv.pdf',
};

const stack = {
  angular: { name: 'Angular', icon: SiAngular },
  react: { name: 'ReactJS', icon: SiReact },
  node: { name: 'NodeJS', icon: SiNodedotjs },
  nest: { name: 'Nest.js', icon: SiNestjs },
  mysql: { name: 'MySQL', icon: SiMysql },
  typescript: { name: 'TypeScript', icon: SiTypescript },
  javascript: { name: 'JavaScript', icon: SiJavascript },
  git: { name: 'Git', icon: SiGit },
  docker: { name: 'Docker', icon: SiDocker },
  jenkins: { name: 'Jenkins', icon: SiJenkins },
  laravel: { name: 'Laravel', icon: SiLaravel },
  php: { name: 'PHP', icon: SiPhp },
};

const navLinksVi = [
  { label: 'Giới thiệu', href: '#about', testId: 'about' },
  { label: 'Kỹ năng', href: '#skills', testId: 'skills' },
  { label: 'Dự án', href: '#projects', testId: 'projects' },
  { label: 'Kinh nghiệm', href: '#experience', testId: 'experience' },
  { label: 'Chứng chỉ', href: '#certifications', testId: 'certifications' },
  { label: 'Liên hệ', href: '#contact', testId: 'contact' },
];

const navLinksEn = [
  { label: 'About', href: '#about', testId: 'about' },
  { label: 'Skills', href: '#skills', testId: 'skills' },
  { label: 'Projects', href: '#projects', testId: 'projects' },
  { label: 'Experience', href: '#experience', testId: 'experience' },
  { label: 'Certificates', href: '#certifications', testId: 'certifications' },
  { label: 'Contact', href: '#contact', testId: 'contact' },
];

const viProjects: Project[] = [
  {
    number: '01',
    title: 'Dự án quản lý trường học',
    period: 'Đang phát triển',
    description:
      'Phát triển hệ thống quản lý trường học đa chi nhánh, hỗ trợ quản lý học sinh, phụ huynh, học phí và thông tin lớp học. Hệ thống tích hợp thanh toán học phí trực tuyến, quản lý bán hàng và Zalo Mini App phục vụ tra cứu thông tin, thanh toán và tương tác giữa nhà trường với phụ huynh.',
    stack: [stack.react, stack.nest, stack.mysql, stack.typescript],
    github: '',
    live: '',
    featured: true,
    image: FptEduImg,
  },
  {
    number: '02',
    title: 'Website bán tranh',
    period: 'Đang phát triển',
    description:
      'Xây dựng nền tảng e-commerce bán tranh trực tuyến với quản lý sản phẩm, giỏ hàng, thanh toán, đơn hàng và khách hàng. Website cũng tích hợp dịch vụ in ảnh theo yêu cầu, cho phép khách hàng tải ảnh cá nhân, chọn kích thước, chất liệu in và đặt in trực tiếp.',
    stack: [stack.angular, stack.nest, stack.mysql, stack.typescript],
    github: '',
    live: '',
    featured: true,
    image: VietArtSpace,
  },
  {
    number: '03',
    title: 'Dự án quản lý đặt sân',
    period: 'Đang phát triển',
    description:
      'Phát triển hệ thống booking và POS quản lý đặt sân thể thao, hỗ trợ quản lý khách hàng, lịch đặt sân dạng calendar, kiểm tra cập nhật lịch theo thời gian thực, quản lý bán hàng tại quầy, thanh toán và theo dõi doanh thu.',
    stack: [stack.angular, stack.nest, stack.mysql, stack.typescript],
    github: '',
    live: '',
    featured: true,
    image: Gamora,
  },
];

const enProjects: Project[] = [
  {
    number: '01',
    title: 'School Management System',
    period: 'In development',
    description:
      'Developing a multi-branch school management system for students, parents, tuition fees, classes, and academic information. The system includes online tuition payment, student/parent sales operations, and a Zalo Mini App for information lookup, payment, and parent-school communication.',
    stack: [stack.react, stack.nest, stack.mysql, stack.typescript],
    github: '',
    live: '',
    featured: true,
    image: FptEduImg,
  },
  {
    number: '02',
    title: 'Online Painting Store',
    period: 'In development',
    description:
      'Building an e-commerce website for selling paintings online with product management, cart, payment, orders, and customer management. The platform also integrates on-demand photo printing so customers can upload personal images, choose print sizes/materials, and order directly.',
    stack: [stack.angular, stack.nest, stack.mysql, stack.typescript],
    github: '',
    live: '',
    featured: true,
    image: VietArtSpace,
  },
  {
    number: '03',
    title: 'Sports Court Booking System',
    period: 'In development',
    description:
      'Developing a booking and POS system for sports court operations, including customer management, calendar-based bookings, real-time schedule updates, counter sales, payment processing, and revenue tracking.',
    stack: [stack.angular, stack.nest, stack.mysql, stack.typescript],
    github: '',
    live: '',
    featured: true,
    image: Gamora,
  },
];

export const portfolioContent: Record<Language, PortfolioContent> = {
  vi: {
    profile,
    nav: {
      links: navLinksVi,
      cta: 'Liên hệ',
      languageLabel: 'Đổi ngôn ngữ',
      themeLabel: 'Đổi giao diện',
    },
    hero: {
      words: ['JavaScript Fullstack', 'ReactJS', 'Angular', 'Node.js', 'NestJS'],
      badge: 'Sẵn sàng cho cơ hội mới',
      titleSuffix: 'Developer',
      subtitle:
        'Lập trình viên Junior Fullstack JavaScript, tập trung xây dựng ứng dụng web nhanh, thân thiện với người dùng và có giao diện hiện đại.',
      primaryCta: 'Xem dự án',
      secondaryCta: 'Liên hệ',
      cvCta: 'Tải CV',
      scroll: 'cuộn',
      snippets: [
        { code: "const dev = 'Hoa';", x: '5%', y: '20%', delay: 0, depth: 0.4 },
        { code: 'npm run build', x: '75%', y: '15%', delay: 0.3, depth: 0.6 },
        { code: '@nestjs/core', x: '80%', y: '60%', delay: 0.6, depth: 0.3 },
        { code: "import React from 'react'", x: '2%', y: '70%', delay: 0.9, depth: 0.5 },
        { code: 'git push origin main', x: '60%', y: '80%', delay: 1.2, depth: 0.7 },
      ],
    },
    sectionLabels: {
      about: 'Giới thiệu',
      skills: 'Kỹ năng',
      projects: 'Dự án',
      experience: 'Kinh nghiệm',
      certifications: 'Chứng chỉ & giải thưởng',
      contact: 'Liên hệ',
    },
    about: {
      headingTop: 'Xây dựng sản phẩm web',
      headingAccent: 'từ API đến giao diện.',
      paragraphs: [
        'Tôi là một lập trình viên Junior Fullstack JavaScript với niềm đam mê xây dựng các ứng dụng web nhanh, thân thiện với người dùng và có giao diện hiện đại. Tôi có khả năng làm việc trên toàn bộ hệ thống - từ thiết kế REST API, GraphQL có khả năng mở rộng bằng Node.js và NestJS đến phát triển giao diện mượt mà với React và Angular.',
        'Ngoài thời gian lập trình, tôi thường tìm hiểu các framework mới, tham gia vào các dự án mã nguồn mở và không ngừng học hỏi để nâng cao kỹ năng phát triển phần mềm của bản thân.',
      ],
      tags: ['Angular', 'Git', 'Nest.js', 'NodeJS', 'ReactJS', 'Docker', 'Jenkins', 'Laravel', 'PHP', 'REST API', 'GraphQL', 'MySQL'],
      traits: [
        {
          icon: Server,
          title: 'Fullstack JavaScript',
          desc: 'Có thể làm việc trên cả backend Node.js/NestJS và frontend React/Angular.',
        },
        {
          icon: Code2,
          title: 'REST API & GraphQL',
          desc: 'Thiết kế API rõ ràng, dễ mở rộng và phù hợp với luồng dữ liệu sản phẩm.',
        },
        {
          icon: Zap,
          title: 'Giao diện hiện đại',
          desc: 'Tập trung trải nghiệm mượt, dễ dùng và phản hồi tốt trên nhiều thiết bị.',
        },
        {
          icon: Sparkles,
          title: 'Luôn học hỏi',
          desc: 'Chủ động tìm hiểu framework mới và cải thiện kỹ năng qua dự án thực tế.',
        },
      ],
    },
    skills: {
      titlePrefix: 'Core',
      titleAccent: 'Skills',
      intro: 'Các kỹ năng chính được tổng hợp từ CV, kết hợp với trải nghiệm thực tế trong dự án.',
      groups: [
        {
          category: 'Frontend',
          items: [
            { name: 'Angular', icon: SiAngular, color: '#DD0031', level: 84, experience: '2 năm' },
            { name: 'ReactJS', icon: SiReact, color: '#61DAFB', level: 82, experience: '2 năm' },
            { name: 'JavaScript', icon: SiJavascript, color: '#F7DF1E', level: 86, experience: '2 năm' },
            { name: 'TypeScript', icon: SiTypescript, color: '#3178C6', level: 80, experience: 'Dự án' },
          ],
        },
        {
          category: 'Backend',
          items: [
            { name: 'NodeJS', icon: SiNodedotjs, color: '#339933', level: 84, experience: '2 năm' },
            { name: 'Nest.js', icon: SiNestjs, color: '#E0234E', level: 82, experience: '2 năm' },
            { name: 'MySQL', icon: SiMysql, color: '#4169E1', level: 80, experience: 'Dự án' },
          ],
        },
        {
          category: 'Tools & Workflow',
          items: [
            { name: 'Git', icon: SiGit, color: '#F05032', level: 86, experience: '2 năm' },
            { name: 'Docker', icon: SiDocker, color: '#2496ED', level: 68, experience: '1 năm' },
            { name: 'Jenkins', icon: SiJenkins, color: '#F2C037', level: 66, experience: '1 năm' },
            { name: 'Laravel/PHP', icon: SiLaravel, color: '#FF2D20', level: 45, experience: '< 1 năm' },
          ],
        },
      ],
    },
    projects: {
      titlePrefix: 'Dự án',
      titleAccent: 'nổi bật',
      featuredLabel: 'nổi bật',
      moreGithub: 'Xem thêm trên GitHub',
      periodLabel: 'Trạng thái',
      items: viProjects,
    },
    experience: {
      titlePrefix: 'Hành trình',
      titleAccent: 'làm việc',
      modalTitle: 'Dự án',
      modalCountSeparator: '/',
      viewProjects: 'xem dự án liên quan',
      preview: 'nhấn để xem ảnh',
      live: 'Xem live',
      items: [
        {
          type: 'work',
          icon: Briefcase,
          title: 'JavaScript Fullstack Developer',
          org: 'Aegona',
          period: '10/2024 - Hiện tại',
          desc: 'Tham gia phát triển ứng dụng web fullstack với ReactJS, Angular, NodeJS và Nest.js; xây dựng REST API/GraphQL, làm việc với MySQL và hỗ trợ quy trình triển khai bằng Docker, Jenkins.',
          tags: ['Angular', 'ReactJS', 'NodeJS', 'Nest.js', 'MySQL', 'Docker', 'Jenkins'],
          image: AegonaImg,
          imageAlt: 'Aegona',
          projectIndices: [0, 1, 2],
          showProjects: true,
        },
        {
          type: 'work',
          icon: Briefcase,
          title: 'Frontend Nocode Developer',
          org: 'Cuoi Agency',
          period: '08/2024 - 10/2024',
          desc: 'Phát triển giao diện website bằng các công cụ no-code, tập trung dựng layout, tối ưu trải nghiệm người dùng và phối hợp hoàn thiện yêu cầu khách hàng.',
          tags: ['Frontend', 'No-code', 'Web UI'],
          image: CuoiAgencyImg,
          imageAlt: 'Cuoi Agency',
          projectIndices: [],
          showProjects: false,
        },
        {
          type: 'edu',
          icon: GraduationCap,
          title: 'Cao đẳng - Website Developer',
          org: 'FPT Polytechnic Tay Nguyen',
          period: '04/2022 - 08/2024',
          desc: 'Theo học chuyên ngành Website Developer, tập trung nền tảng lập trình web, cơ sở dữ liệu và các dự án ứng dụng thực tế.',
          tags: ['Website Developer', 'Web Dev', 'Databases'],
          image: FptEduImg,
          imageAlt: 'FPT Polytechnic Tay Nguyen',
          projectIndices: [0],
          showProjects: true,
        },
      ],
    },
    certifications: {
      titlePrefix: 'Chứng chỉ',
      titleAccent: 'và giải thưởng',
      intro: 'Các chứng chỉ và thành tích học tập được ghi nhận trong CV.',
      issued: 'Thời gian',
      idLabel: 'ID',
      verify: 'Xem chứng chỉ',
      items: [
        {
          title: 'Development of LOS Grade Export Tool',
          issuer: 'FPT Polytechnic Tay Nguyen',
          date: '04/2024',
          credentialId: 'FPT-LOS-EXPORT',
          credentialUrl: 'https://xuongthuchanh.poly.edu.vn/certificate/PK02909/',
          Icon: FileCode2,
          iconColor: '#3178C6',
          bgColor: 'hsl(213 76% 48% / 0.08)',
        },
        {
          title: 'Building AI Applications for Code Debugging and Optimisation',
          issuer: 'FPT Polytechnic Tay Nguyen',
          date: '04/2024',
          credentialId: 'FPT-AI-CODE',
          credentialUrl: 'https://xuongthuchanh.poly.edu.vn/certificate/PK02909/',
          Icon: BadgeCheck,
          iconColor: '#06B6D4',
          bgColor: 'hsl(187 92% 43% / 0.08)',
        },
        {
          title: 'Creativity and Idea Award - Game Viet Hackathon',
          issuer: 'FPT Polytechnic',
          date: '08/2024',
          credentialId: 'GAME-VIET-HACKATHON',
          credentialUrl: '#',
          Icon: Lightbulb,
          iconColor: '#F59E0B',
          bgColor: 'hsl(38 92% 50% / 0.1)',
        },
        {
          title: 'Encouragement Award - Landing Page Hackathon',
          issuer: 'FPT Polytechnic',
          date: '04/2023',
          credentialId: 'LANDING-PAGE-HACKATHON',
          credentialUrl: '#',
          Icon: Trophy,
          iconColor: '#22C55E',
          bgColor: 'hsl(142 71% 45% / 0.1)',
        },
      ],
    },
    contact: {
      titlePrefix: 'Cùng',
      titleAccent: 'làm việc',
      intro: 'Bạn có dự án cần triển khai hoặc muốn trao đổi cơ hội phù hợp? Tôi luôn sẵn sàng kết nối.',
      labels: {
        email: 'Email',
        phone: 'Điện thoại',
        website: 'Website',
        location: 'Địa chỉ',
        findMe: 'Tìm tôi tại',
        name: 'Tên',
        message: 'Nội dung',
      },
      placeholders: {
        name: 'Tên của bạn',
        email: 'email@domain.com',
        message: 'Nói ngắn gọn về dự án hoặc cơ hội của bạn...',
      },
      send: 'Gửi email',
      sent: 'Đã mở email',
      footerLeft: 'Designed & Built by Phan Thanh Hóa - 2026',
      footerRight: 'React · NestJS · TypeScript',
    },
  },
  en: {
    profile,
    nav: {
      links: navLinksEn,
      cta: 'Contact',
      languageLabel: 'Change language',
      themeLabel: 'Change theme',
    },
    hero: {
      words: ['JavaScript Fullstack', 'ReactJS', 'Angular', 'Node.js', 'NestJS'],
      badge: 'Available for new opportunities',
      titleSuffix: 'Developer',
      subtitle:
        'Junior JavaScript Fullstack Developer focused on fast, user-friendly, modern web applications.',
      primaryCta: 'View Projects',
      secondaryCta: 'Contact Me',
      cvCta: 'Download CV',
      scroll: 'scroll',
      snippets: [
        { code: "const dev = 'Hoa';", x: '5%', y: '20%', delay: 0, depth: 0.4 },
        { code: 'npm run build', x: '75%', y: '15%', delay: 0.3, depth: 0.6 },
        { code: '@nestjs/core', x: '80%', y: '60%', delay: 0.6, depth: 0.3 },
        { code: "import React from 'react'", x: '2%', y: '70%', delay: 0.9, depth: 0.5 },
        { code: 'git push origin main', x: '60%', y: '80%', delay: 1.2, depth: 0.7 },
      ],
    },
    sectionLabels: {
      about: 'About Me',
      skills: 'Skills',
      projects: 'Projects',
      experience: 'Experience',
      certifications: 'Certificates & Awards',
      contact: 'Contact',
    },
    about: {
      headingTop: 'Building web products',
      headingAccent: 'from API to interface.',
      paragraphs: [
        'I am a Junior JavaScript Fullstack Developer with a passion for building fast, user-friendly web applications with modern interfaces. I can work across the system - from scalable REST API and GraphQL design with Node.js and NestJS to smooth interfaces with React and Angular.',
        'Outside of coding time, I explore new frameworks, join open-source projects, and keep improving my software development skills through hands-on work.',
      ],
      tags: ['Angular', 'Git', 'Nest.js', 'NodeJS', 'ReactJS', 'Docker', 'Jenkins', 'Laravel', 'PHP', 'REST API', 'GraphQL', 'MySQL'],
      traits: [
        {
          icon: Server,
          title: 'Fullstack JavaScript',
          desc: 'Able to work on both Node.js/NestJS backends and React/Angular frontends.',
        },
        {
          icon: Code2,
          title: 'REST API & GraphQL',
          desc: 'Designing clear, extensible APIs aligned with product data flows.',
        },
        {
          icon: Zap,
          title: 'Modern Interfaces',
          desc: 'Focused on smooth, usable, responsive experiences across devices.',
        },
        {
          icon: Sparkles,
          title: 'Continuous Learning',
          desc: 'Actively learning new frameworks and improving through real projects.',
        },
      ],
    },
    skills: {
      titlePrefix: 'Core',
      titleAccent: 'Skills',
      intro: 'Main skills from the CV, paired with hands-on project experience.',
      groups: [
        {
          category: 'Frontend',
          items: [
            { name: 'Angular', icon: SiAngular, color: '#DD0031', level: 84, experience: '2 yrs' },
            { name: 'ReactJS', icon: SiReact, color: '#61DAFB', level: 82, experience: '2 yrs' },
            { name: 'JavaScript', icon: SiJavascript, color: '#F7DF1E', level: 86, experience: '2 yrs' },
            { name: 'TypeScript', icon: SiTypescript, color: '#3178C6', level: 80, experience: 'Projects' },
          ],
        },
        {
          category: 'Backend',
          items: [
            { name: 'NodeJS', icon: SiNodedotjs, color: '#339933', level: 84, experience: '2 yrs' },
            { name: 'Nest.js', icon: SiNestjs, color: '#E0234E', level: 82, experience: '2 yrs' },
            { name: 'MySQL', icon: SiMysql, color: '#4169E1', level: 80, experience: 'Projects' },
          ],
        },
        {
          category: 'Tools & Workflow',
          items: [
            { name: 'Git', icon: SiGit, color: '#F05032', level: 86, experience: '2 yrs' },
            { name: 'Docker', icon: SiDocker, color: '#2496ED', level: 68, experience: '1 yr' },
            { name: 'Jenkins', icon: SiJenkins, color: '#F2C037', level: 66, experience: '1 yr' },
            { name: 'Laravel/PHP', icon: SiPhp, color: '#777BB4', level: 45, experience: '< 1 yr' },
          ],
        },
      ],
    },
    projects: {
      titlePrefix: 'Featured',
      titleAccent: 'Projects',
      featuredLabel: 'featured',
      moreGithub: 'More on GitHub',
      periodLabel: 'Status',
      items: enProjects,
    },
    experience: {
      titlePrefix: 'Work',
      titleAccent: 'Journey',
      modalTitle: 'Projects',
      modalCountSeparator: '/',
      viewProjects: 'view related projects',
      preview: 'click to preview',
      live: 'Live',
      items: [
        {
          type: 'work',
          icon: Briefcase,
          title: 'JavaScript Fullstack Developer',
          org: 'Aegona',
          period: '10/2024 - Present',
          desc: 'Building fullstack web applications with ReactJS, Angular, NodeJS, and Nest.js; implementing REST API/GraphQL, working with MySQL, and supporting deployment workflows with Docker and Jenkins.',
          tags: ['Angular', 'ReactJS', 'NodeJS', 'Nest.js', 'MySQL', 'Docker', 'Jenkins'],
          image: AegonaImg,
          imageAlt: 'Aegona',
          projectIndices: [0, 1, 2],
          showProjects: true,
        },
        {
          type: 'work',
          icon: Briefcase,
          title: 'Frontend Nocode Developer',
          org: 'Cuoi Agency',
          period: '08/2024 - 10/2024',
          desc: 'Built website interfaces with no-code tools, focusing on layout, user experience, and delivery against client requirements.',
          tags: ['Frontend', 'No-code', 'Web UI'],
          image: CuoiAgencyImg,
          imageAlt: 'Cuoi Agency',
          projectIndices: [],
          showProjects: false,
        },
        {
          type: 'edu',
          icon: GraduationCap,
          title: 'College - Website Developer',
          org: 'FPT Polytechnic Tay Nguyen',
          period: '04/2022 - 08/2024',
          desc: 'Studied Website Development with a focus on web programming fundamentals, databases, and practical application projects.',
          tags: ['Website Developer', 'Web Dev', 'Databases'],
          image: FptEduImg,
          imageAlt: 'FPT Polytechnic Tay Nguyen',
          projectIndices: [0],
          showProjects: true,
        },
      ],
    },
    certifications: {
      titlePrefix: 'Certificates',
      titleAccent: 'and Awards',
      intro: 'Certificates and academic achievements listed in the CV.',
      issued: 'Date',
      idLabel: 'ID',
      verify: 'View credential',
      items: [
        {
          title: 'Development of LOS Grade Export Tool',
          issuer: 'FPT Polytechnic Tay Nguyen',
          date: '04/2024',
          credentialId: 'FPT-LOS-EXPORT',
          credentialUrl: 'https://xuongthuchanh.poly.edu.vn/certificate/PK02909/',
          Icon: FileCode2,
          iconColor: '#3178C6',
          bgColor: 'hsl(213 76% 48% / 0.08)',
        },
        {
          title: 'Building AI Applications for Code Debugging and Optimisation',
          issuer: 'FPT Polytechnic Tay Nguyen',
          date: '04/2024',
          credentialId: 'FPT-AI-CODE',
          credentialUrl: 'https://xuongthuchanh.poly.edu.vn/certificate/PK02909/',
          Icon: BadgeCheck,
          iconColor: '#06B6D4',
          bgColor: 'hsl(187 92% 43% / 0.08)',
        },
        {
          title: 'Creativity and Idea Award - Game Viet Hackathon',
          issuer: 'FPT Polytechnic',
          date: '08/2024',
          credentialId: 'GAME-VIET-HACKATHON',
          credentialUrl: '#',
          Icon: Lightbulb,
          iconColor: '#F59E0B',
          bgColor: 'hsl(38 92% 50% / 0.1)',
        },
        {
          title: 'Encouragement Award - Landing Page Hackathon',
          issuer: 'FPT Polytechnic',
          date: '04/2023',
          credentialId: 'LANDING-PAGE-HACKATHON',
          credentialUrl: '#',
          Icon: Trophy,
          iconColor: '#22C55E',
          bgColor: 'hsl(142 71% 45% / 0.1)',
        },
      ],
    },
    contact: {
      titlePrefix: "Let's",
      titleAccent: 'Work Together',
      intro: 'Have a project to build or a role that fits? I am open to connecting.',
      labels: {
        email: 'Email',
        phone: 'Phone',
        website: 'Website',
        location: 'Location',
        findMe: 'Find me on',
        name: 'Name',
        message: 'Message',
      },
      placeholders: {
        name: 'Your name',
        email: 'you@domain.com',
        message: 'Briefly describe your project or opportunity...',
      },
      send: 'Send Email',
      sent: 'Email Opened',
      footerLeft: 'Designed & Built by Phan Thanh Hóa - 2026',
      footerRight: 'React · NestJS · TypeScript',
    },
  },
};
