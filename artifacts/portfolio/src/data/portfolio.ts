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
import VaSchool from '@/assets/images/vaschool.png';

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
  detail: {
    overview: string;
    demoUrl: string;
    demoConfidential: boolean;
    demoStatus: string;
    responsibilities: string[];
  };
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
    viewDetail: string;
    modalTitle: string;
    demoLabel: string;
    responsibilitiesLabel: string;
    closeLabel: string;
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
  role: 'Software Engineer',
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
  express: { name: 'ExpressJS', icon: Server },
  mongodb: { name: 'MongoDB', icon: Server },
  material: { name: 'Material UI', icon: Layers },
  socket: { name: 'Socket.IO', icon: Zap },
  firebase: { name: 'Firebase', icon: Rocket },
  redis: { name: 'Redis', icon: Server },
  elasticsearch: { name: 'Elasticsearch', icon: Sparkles },
  next: { name: 'Next.js', icon: Code2 },
  redux: { name: 'Redux', icon: Layers },
  axios: { name: 'Axios', icon: Zap },
  dndkit: { name: 'DndKit', icon: Layers },
  ai: { name: 'AI Tooling', icon: Lightbulb },
  chrome: { name: 'Chrome Extension', icon: FileCode2 },
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
    stack: [stack.react, stack.laravel, stack.mysql, stack.typescript],
    github: '',
    live: '',
    featured: true,
    image: VaSchool,
    // PROJECT_DETAIL_EDIT_MARKER vi-01-school-management
    detail: {
      overview:
        'Hệ thống quản lý trường học đa chi nhánh, kết nối dữ liệu học sinh, phụ huynh, lớp học, học phí và các nghiệp vụ vận hành nội bộ. Dự án có thêm luồng thanh toán học phí, quản lý bán hàng và Zalo Mini App để phụ huynh tra cứu thông tin.',
      demoUrl: '',
      demoConfidential: true,
      demoStatus: 'Bảo mật theo yêu cầu dự án, không công khai website demo.',
      responsibilities: [
        'Phát triển giao diện quản trị bằng ReactJS và TypeScript.',
        'Xây dựng các màn hình nghiệp vụ cho học sinh, phụ huynh, lớp học và học phí.',
        'Tích hợp API với backend Laravel, xử lý form, bảng dữ liệu và trạng thái tải dữ liệu.',
        'Phối hợp kiểm thử luồng thanh toán, tra cứu thông tin và các tính năng trong Zalo Mini App.',
      ],
    },
  },
  {
    number: '02',
    title: 'Website bán tranh',
    period: 'Đang phát triển',
    description:
      'Xây dựng nền tảng e-commerce bán tranh trực tuyến với quản lý sản phẩm, giỏ hàng, thanh toán, đơn hàng và khách hàng. Website cũng tích hợp dịch vụ in ảnh theo yêu cầu, cho phép khách hàng tải ảnh cá nhân, chọn kích thước, chất liệu in và đặt in trực tiếp.',
    stack: [stack.angular, stack.php, stack.mysql, stack.typescript],
    github: '',
    live: '',
    featured: true,
    image: VietArtSpace,
    // PROJECT_DETAIL_EDIT_MARKER vi-02-art-store
    detail: {
      overview:
        'Website thương mại điện tử bán tranh trực tuyến, hỗ trợ quản lý sản phẩm, giỏ hàng, đơn hàng, khách hàng và dịch vụ in ảnh theo yêu cầu. Người dùng có thể tải ảnh cá nhân, chọn kích thước, chất liệu in và gửi yêu cầu đặt in.',
      demoUrl: '',
      demoConfidential: false,
      demoStatus: 'Website demo công khai, cập nhật URL demo tại trường demoUrl này.',
      responsibilities: [
        'Xây dựng giao diện người dùng bằng Angular và TypeScript.',
        'Phát triển luồng danh sách sản phẩm, chi tiết sản phẩm, giỏ hàng và đặt hàng.',
        'Tích hợp API PHP/MySQL cho dữ liệu sản phẩm, khách hàng và đơn hàng.',
        'Thiết kế trải nghiệm tải ảnh, chọn thông số in và gửi yêu cầu in ảnh.',
      ],
    },
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
    // PROJECT_DETAIL_EDIT_MARKER vi-03-court-booking
    detail: {
      overview:
        'Hệ thống booking và POS cho sân thể thao, hỗ trợ quản lý lịch đặt sân, khách hàng, bán hàng tại quầy, thanh toán và theo dõi doanh thu. Dữ liệu lịch được tổ chức theo dạng calendar để nhân viên dễ kiểm tra và cập nhật.',
      demoUrl: '',
      demoConfidential: true,
      demoStatus: 'Bảo mật theo yêu cầu dự án, không công khai website demo.',
      responsibilities: [
        'Phát triển giao diện quản lý đặt sân bằng Angular và TypeScript.',
        'Xây dựng các màn hình calendar, cập nhật lịch đặt sân và trạng thái booking.',
        'Tích hợp backend Nest.js/MySQL cho nghiệp vụ khách hàng, đặt sân và doanh thu.',
        'Hoàn thiện các luồng POS tại quầy gồm bán hàng, thanh toán và kiểm tra doanh thu.',
      ],
    },
  },
  {
    number: '04',
    title: 'Dự án Aegona 01',
    period: 'Đang cập nhật',
    description:
      'Dự án placeholder thuộc nhóm Aegona, được thêm để cập nhật thông tin chi tiết sau.',
    stack: [stack.react, stack.node, stack.mysql, stack.typescript],
    github: '',
    live: '',
    featured: false,
    image: AegonaImg,
    // PROJECT_DETAIL_EDIT_MARKER vi-04-aegona-placeholder-01
    detail: {
      overview:
        'Placeholder cho dự án Aegona 01. Cập nhật mục tiêu, bối cảnh, phạm vi và nghiệp vụ dự án tại đây.',
      demoUrl: '',
      demoConfidential: true,
      demoStatus: 'Bảo mật theo yêu cầu dự án, không công khai website demo.',
      responsibilities: [
        'Cập nhật vai trò của tôi trong dự án này.',
        'Cập nhật các màn hình, API hoặc module đã tham gia.',
      ],
    },
  },
  {
    number: '05',
    title: 'Dự án Aegona 02',
    period: 'Đang cập nhật',
    description:
      'Dự án placeholder thuộc nhóm Aegona, được thêm để cập nhật thông tin chi tiết sau.',
    stack: [stack.angular, stack.nest, stack.mysql, stack.typescript],
    github: '',
    live: '',
    featured: false,
    image: AegonaImg,
    // PROJECT_DETAIL_EDIT_MARKER vi-05-aegona-placeholder-02
    detail: {
      overview:
        'Placeholder cho dự án Aegona 02. Cập nhật mục tiêu, bối cảnh, phạm vi và nghiệp vụ dự án tại đây.',
      demoUrl: '',
      demoConfidential: true,
      demoStatus: 'Bảo mật theo yêu cầu dự án, không công khai website demo.',
      responsibilities: [
        'Cập nhật vai trò của tôi trong dự án này.',
        'Cập nhật các màn hình, API hoặc module đã tham gia.',
      ],
    },
  },
  {
    number: '06',
    title: 'BMT Life Fashion E-Commerce',
    period: 'Dự án tại FPT Polytechnic',
    description:
      'Nền tảng e-commerce thời trang với giỏ hàng, đơn hàng thời gian thực và AI chatbot hỗ trợ người dùng.',
    stack: [stack.react, stack.node, stack.mongodb, stack.material, stack.socket, stack.firebase],
    github: 'https://github.com/hptprobook/datn',
    live: '',
    featured: false,
    image: FptEduImg,
    // PROJECT_DETAIL_EDIT_MARKER vi-06-school-bmt-life-fashion
    detail: {
      overview:
        'Dự án tốt nghiệp theo nhóm, xây dựng website e-commerce thời trang với các luồng sản phẩm, giỏ hàng, đơn hàng, thông báo thời gian thực và chatbot AI.',
      demoUrl: '',
      demoConfidential: false,
      demoStatus: 'Cập nhật URL demo nếu còn hoạt động.',
      responsibilities: [
        'Làm leader nhóm và phân chia công việc.',
        'Phát triển API cho giỏ hàng, đơn hàng và tìm kiếm.',
        'Xây dựng giao diện người dùng và phối hợp tích hợp realtime.',
      ],
    },
  },
  {
    number: '07',
    title: 'Todo App',
    period: 'Dự án tại FPT Polytechnic',
    description:
      'Ứng dụng quản lý công việc lấy cảm hứng từ Trello, hỗ trợ realtime, thông báo và kéo thả.',
    stack: [stack.react, stack.node, stack.mongodb, stack.socket, stack.firebase, stack.dndkit],
    github: 'https://github.com/hptprobook/frontend-framework',
    live: '',
    featured: false,
    image: FptEduImg,
    // PROJECT_DETAIL_EDIT_MARKER vi-07-school-todo-app
    detail: {
      overview:
        'Dự án cá nhân mô phỏng Trello, tập trung vào quản lý task, board, thông báo realtime và trải nghiệm kéo thả.',
      demoUrl: '',
      demoConfidential: false,
      demoStatus: 'Cập nhật URL demo nếu còn hoạt động.',
      responsibilities: [
        'Phát triển end-to-end từ thiết kế giao diện đến tích hợp backend.',
        'Xây dựng luồng realtime, thông báo và kéo thả task.',
      ],
    },
  },
  {
    number: '08',
    title: '3000 E-Commerce Website',
    period: 'Dự án tại FPT Polytechnic',
    description:
      'Website e-commerce theo nhóm với chức năng cho người dùng và trang quản trị.',
    stack: [stack.next, stack.react, stack.laravel, stack.material, stack.axios, stack.redux],
    github: 'https://github.com/hptprobook/3000',
    live: '',
    featured: false,
    image: FptEduImg,
    // PROJECT_DETAIL_EDIT_MARKER vi-08-school-3000-commerce
    detail: {
      overview:
        'Dự án e-commerce theo nhóm, bao gồm luồng mua hàng, quản lý sản phẩm, người dùng và admin dashboard.',
      demoUrl: '',
      demoConfidential: false,
      demoStatus: 'Cập nhật URL demo nếu còn hoạt động.',
      responsibilities: [
        'Làm leader nhóm, phân tích chức năng và phân chia công việc.',
        'Phát triển API và xây dựng giao diện user/admin.',
      ],
    },
  },
  {
    number: '09',
    title: 'Support Learning IT',
    period: 'Dự án tại FPT Polytechnic',
    description:
      'Công cụ hỗ trợ debug và tối ưu code bằng AI, tham gia cuộc thi Thiết bị đào tạo tự làm tại Đắk Lắk.',
    stack: [stack.ai, stack.react, stack.node, stack.javascript],
    github: 'https://github.com/hptprobook/trainning_equipment_2024',
    live: '',
    featured: false,
    image: FptEduImg,
    // PROJECT_DETAIL_EDIT_MARKER vi-09-school-support-learning-it
    detail: {
      overview:
        'Công cụ hỗ trợ học lập trình, tập trung vào gợi ý debug code, phân tích lỗi và hỗ trợ tối ưu hóa.',
      demoUrl: '',
      demoConfidential: false,
      demoStatus: 'Cập nhật URL demo nếu còn hoạt động.',
      responsibilities: [
        'Xây dựng API và giao diện cho luồng debug/tối ưu code.',
        'Phối hợp hoàn thiện sản phẩm để tham gia cuộc thi.',
      ],
    },
  },
  {
    number: '10',
    title: 'IT Store',
    period: 'Dự án tại FPT Polytechnic',
    description:
      'Website e-commerce cho thiết bị điện tử, có xác thực, giỏ hàng và trang quản trị.',
    stack: [stack.react, stack.javascript, stack.material],
    github: 'https://github.com/hptprobook/DuAnMau-NoCode',
    live: '',
    featured: false,
    image: FptEduImg,
    // PROJECT_DETAIL_EDIT_MARKER vi-10-school-it-store
    detail: {
      overview:
        'Dự án website bán hàng cho thiết bị điện tử, hỗ trợ xác thực người dùng, giỏ hàng và admin dashboard.',
      demoUrl: '',
      demoConfidential: false,
      demoStatus: 'Cập nhật URL demo nếu còn hoạt động.',
      responsibilities: [
        'Phát triển giao diện user và admin.',
        'Xây dựng các luồng xác thực, giỏ hàng và quản lý dữ liệu.',
      ],
    },
  },
  {
    number: '11',
    title: 'Tool Export LMS',
    period: 'Dự án tại FPT Polytechnic',
    description:
      'Chrome extension hỗ trợ trích xuất điểm LMS ra Excel.',
    stack: [stack.chrome, stack.javascript],
    github: '',
    live: 'https://chromewebstore.google.com/detail/export-score/nligchepkpodlccjkjliepebgloolfee?authuser=0&hl=vi',
    featured: false,
    image: FptEduImg,
    // PROJECT_DETAIL_EDIT_MARKER vi-11-school-tool-export-lms
    detail: {
      overview:
        'Tiện ích Chrome hỗ trợ lấy dữ liệu điểm từ LMS và xuất ra file Excel phục vụ quy trình học tập/nội bộ.',
      demoUrl: 'https://chromewebstore.google.com/detail/export-score/nligchepkpodlccjkjliepebgloolfee?authuser=0&hl=vi',
      demoConfidential: false,
      demoStatus: 'Có thể xem trên Chrome Web Store.',
      responsibilities: [
        'Xây dựng logic trích xuất dữ liệu.',
        'Phát triển luồng xuất điểm ra Excel.',
      ],
    },
  },
];

const enProjects: Project[] = [
  {
    number: '01',
    title: 'School Management System',
    period: 'In development',
    description:
      'Developing a multi-branch school management system for students, parents, tuition fees, classes, and academic information. The system includes online tuition payment, student/parent sales operations, and a Zalo Mini App for information lookup, payment, and parent-school communication.',
    stack: [stack.react, stack.laravel, stack.mysql, stack.typescript],
    github: '',
    live: '',
    featured: true,
    image: VaSchool,
    // PROJECT_DETAIL_EDIT_MARKER en-01-school-management
    detail: {
      overview:
        'A multi-branch school management system that connects student, parent, class, tuition, and internal operation data. The project also includes tuition payment flows, sales management, and a Zalo Mini App for parent-facing information lookup.',
      demoUrl: '',
      demoConfidential: true,
      demoStatus: 'Confidential by project requirement, so the demo website is not public.',
      responsibilities: [
        'Developed admin interfaces with ReactJS and TypeScript.',
        'Built business screens for students, parents, classes, and tuition fees.',
        'Integrated Laravel APIs, including forms, data tables, and loading states.',
        'Supported testing for payment, information lookup, and Zalo Mini App flows.',
      ],
    },
  },
  {
    number: '02',
    title: 'Online Painting Store',
    period: 'In development',
    description:
      'Building an e-commerce website for selling paintings online with product management, cart, payment, orders, and customer management. The platform also integrates on-demand photo printing so customers can upload personal images, choose print sizes/materials, and order directly.',
    stack: [stack.angular, stack.php, stack.mysql, stack.typescript],
    github: '',
    live: '',
    featured: true,
    image: VietArtSpace,
    // PROJECT_DETAIL_EDIT_MARKER en-02-art-store
    detail: {
      overview:
        'An e-commerce website for selling paintings online, with product, cart, order, customer, and on-demand photo printing workflows. Customers can upload personal images, choose print size/material, and submit print orders.',
      demoUrl: '',
      demoConfidential: false,
      demoStatus: 'Public demo website, update the demoUrl field here when the URL is ready.',
      responsibilities: [
        'Built the user interface with Angular and TypeScript.',
        'Developed product listing, product detail, cart, and checkout flows.',
        'Integrated PHP/MySQL APIs for product, customer, and order data.',
        'Designed the upload, print option selection, and print order request experience.',
      ],
    },
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
    // PROJECT_DETAIL_EDIT_MARKER en-03-court-booking
    detail: {
      overview:
        'A booking and POS system for sports court operations, covering booking schedules, customers, counter sales, payments, and revenue tracking. Booking data is organized in a calendar format so staff can check and update schedules quickly.',
      demoUrl: '',
      demoConfidential: true,
      demoStatus: 'Confidential by project requirement, so the demo website is not public.',
      responsibilities: [
        'Developed the sports court booking admin UI with Angular and TypeScript.',
        'Built calendar screens, booking updates, and booking status flows.',
        'Integrated Nest.js/MySQL backend APIs for customer, booking, and revenue features.',
        'Completed POS flows for counter sales, payment handling, and revenue checks.',
      ],
    },
  },
  {
    number: '04',
    title: 'Aegona Project 01',
    period: 'Updating',
    description:
      'Placeholder project under Aegona, added so the details can be updated later.',
    stack: [stack.react, stack.node, stack.mysql, stack.typescript],
    github: '',
    live: '',
    featured: false,
    image: AegonaImg,
    // PROJECT_DETAIL_EDIT_MARKER en-04-aegona-placeholder-01
    detail: {
      overview:
        'Placeholder for Aegona Project 01. Update the goal, context, scope, and business domain here.',
      demoUrl: '',
      demoConfidential: true,
      demoStatus: 'Confidential by project requirement, so the demo website is not public.',
      responsibilities: [
        'Update my role in this project.',
        'Update the screens, APIs, or modules I worked on.',
      ],
    },
  },
  {
    number: '05',
    title: 'Aegona Project 02',
    period: 'Updating',
    description:
      'Placeholder project under Aegona, added so the details can be updated later.',
    stack: [stack.angular, stack.nest, stack.mysql, stack.typescript],
    github: '',
    live: '',
    featured: false,
    image: AegonaImg,
    // PROJECT_DETAIL_EDIT_MARKER en-05-aegona-placeholder-02
    detail: {
      overview:
        'Placeholder for Aegona Project 02. Update the goal, context, scope, and business domain here.',
      demoUrl: '',
      demoConfidential: true,
      demoStatus: 'Confidential by project requirement, so the demo website is not public.',
      responsibilities: [
        'Update my role in this project.',
        'Update the screens, APIs, or modules I worked on.',
      ],
    },
  },
  {
    number: '06',
    title: 'BMT Life Fashion E-Commerce',
    period: 'In-school project',
    description:
      'A fashion e-commerce platform with realtime cart/orders and an AI chatbot for user support.',
    stack: [stack.react, stack.node, stack.mongodb, stack.material, stack.socket, stack.firebase],
    github: 'https://github.com/hptprobook/datn',
    live: '',
    featured: false,
    image: FptEduImg,
    // PROJECT_DETAIL_EDIT_MARKER en-06-school-bmt-life-fashion
    detail: {
      overview:
        'A team graduation project that built a fashion e-commerce website with product, cart, order, realtime notification, and AI chatbot flows.',
      demoUrl: '',
      demoConfidential: false,
      demoStatus: 'Update the demo URL if it is still available.',
      responsibilities: [
        'Led the team and split implementation tasks.',
        'Developed APIs for cart, orders, and search.',
        'Built user interfaces and coordinated realtime integration.',
      ],
    },
  },
  {
    number: '07',
    title: 'Todo App',
    period: 'In-school project',
    description:
      'A Trello-inspired task management app with realtime updates, notifications, and drag-and-drop interactions.',
    stack: [stack.react, stack.node, stack.mongodb, stack.socket, stack.firebase, stack.dndkit],
    github: 'https://github.com/hptprobook/frontend-framework',
    live: '',
    featured: false,
    image: FptEduImg,
    // PROJECT_DETAIL_EDIT_MARKER en-07-school-todo-app
    detail: {
      overview:
        'An individual Trello-style project focused on task management, boards, realtime notifications, and drag-and-drop UX.',
      demoUrl: '',
      demoConfidential: false,
      demoStatus: 'Update the demo URL if it is still available.',
      responsibilities: [
        'Developed the app end-to-end from UI design to backend integration.',
        'Built realtime, notification, and drag-and-drop task flows.',
      ],
    },
  },
  {
    number: '08',
    title: '3000 E-Commerce Website',
    period: 'In-school project',
    description:
      'A team e-commerce website with user-facing shopping features and an admin panel.',
    stack: [stack.next, stack.react, stack.laravel, stack.material, stack.axios, stack.redux],
    github: 'https://github.com/hptprobook/3000',
    live: '',
    featured: false,
    image: FptEduImg,
    // PROJECT_DETAIL_EDIT_MARKER en-08-school-3000-commerce
    detail: {
      overview:
        'A team e-commerce project covering shopping flows, product management, users, and an admin dashboard.',
      demoUrl: '',
      demoConfidential: false,
      demoStatus: 'Update the demo URL if it is still available.',
      responsibilities: [
        'Led the team, analyzed features, and split tasks.',
        'Developed APIs and built user/admin interfaces.',
      ],
    },
  },
  {
    number: '09',
    title: 'Support Learning IT',
    period: 'In-school project',
    description:
      'An AI-powered code debugging and optimization tool built for a self-made training equipment competition in Dak Lak.',
    stack: [stack.ai, stack.react, stack.node, stack.javascript],
    github: 'https://github.com/hptprobook/trainning_equipment_2024',
    live: '',
    featured: false,
    image: FptEduImg,
    // PROJECT_DETAIL_EDIT_MARKER en-09-school-support-learning-it
    detail: {
      overview:
        'A programming learning support tool focused on code debugging suggestions, error analysis, and optimization support.',
      demoUrl: '',
      demoConfidential: false,
      demoStatus: 'Update the demo URL if it is still available.',
      responsibilities: [
        'Built APIs and interfaces for code debugging/optimization flows.',
        'Coordinated product completion for the competition.',
      ],
    },
  },
  {
    number: '10',
    title: 'IT Store',
    period: 'In-school project',
    description:
      'An electronics e-commerce website with authentication, cart, and admin dashboard features.',
    stack: [stack.react, stack.javascript, stack.material],
    github: 'https://github.com/hptprobook/DuAnMau-NoCode',
    live: '',
    featured: false,
    image: FptEduImg,
    // PROJECT_DETAIL_EDIT_MARKER en-10-school-it-store
    detail: {
      overview:
        'An electronics store website supporting user authentication, cart flows, and an admin dashboard.',
      demoUrl: '',
      demoConfidential: false,
      demoStatus: 'Update the demo URL if it is still available.',
      responsibilities: [
        'Developed user and admin interfaces.',
        'Built authentication, cart, and data management flows.',
      ],
    },
  },
  {
    number: '11',
    title: 'Tool Export LMS',
    period: 'In-school project',
    description:
      'A Chrome extension for exporting LMS grades to Excel.',
    stack: [stack.chrome, stack.javascript],
    github: '',
    live: 'https://chromewebstore.google.com/detail/export-score/nligchepkpodlccjkjliepebgloolfee?authuser=0&hl=vi',
    featured: false,
    image: FptEduImg,
    // PROJECT_DETAIL_EDIT_MARKER en-11-school-tool-export-lms
    detail: {
      overview:
        'A Chrome extension that extracts grade data from LMS and exports it to Excel for academic/internal workflows.',
      demoUrl: 'https://chromewebstore.google.com/detail/export-score/nligchepkpodlccjkjliepebgloolfee?authuser=0&hl=vi',
      demoConfidential: false,
      demoStatus: 'Available on the Chrome Web Store.',
      responsibilities: [
        'Built the core data extraction logic.',
        'Developed the Excel grade export flow.',
      ],
    },
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
      words: ['Software Engineer', 'ReactJS', 'Angular', 'Node.js', 'NestJS'],
      badge: 'Sẵn sàng cho cơ hội mới',
      titleSuffix: 'Developer',
      subtitle:
        'Lập trình viên Fullstack, tập trung xây dựng ứng dụng web nhanh, thân thiện với người dùng và có giao diện hiện đại.',
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
        'Là một lập trình viên Junior Fullstack, tôi có niềm đam mê lớn trong việc xây dựng các ứng dụng web tốc độ cao, giao diện hiện đại và tối ưu trải nghiệm người dùng. Thế mạnh của tôi là khả năng làm việc toàn diện trên toàn bộ hệ thống — từ việc thiết kế REST API, tối ưu hóa backend bằng PHP & Laravel, cho đến phát triển các giao diện mượt mà với ReactJS & Angular. Ngoài giờ làm việc, tôi thường xuyên tìm hiểu các công nghệ mới và tham gia vào các workshop IT để không ngừng nâng cao tư duy cũng như kỹ năng phát triển phần mềm.',
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
            { name: 'Angular', icon: SiAngular, color: '#DD0031', level: 75, experience: '> 1 năm' },
            { name: 'ReactJS', icon: SiReact, color: '#61DAFB', level: 86, experience: '> 1 năm' },
            { name: 'JavaScript', icon: SiJavascript, color: '#F7DF1E', level: 86, experience: '> 1 năm' },
            { name: 'TypeScript', icon: SiTypescript, color: '#3178C6', level: 80, experience: '> 1 năm' },
          ],
        },
        {
          category: 'Backend',
          items: [
            { name: 'NodeJS', icon: SiNodedotjs, color: '#339933', level: 84, experience: '> 1 năm' },
            { name: 'Nest.js', icon: SiNestjs, color: '#E0234E', level: 82, experience: '> 1 năm' },
            { name: 'MySQL', icon: SiMysql, color: '#4169E1', level: 80, experience: '> 1 năm' },
            { name: 'PHP', icon: SiPhp, color: '#777BB4', level: 70, experience: '1 năm' },
            { name: 'Laravel', icon: SiLaravel, color: '#FF2D20', level: 70, experience: '1 năm' },
          ],
        },
        {
          category: 'Tools & Workflow',
          items: [
            { name: 'Git', icon: SiGit, color: '#F05032', level: 86, experience: '> 1 năm' },
            { name: 'Docker', icon: SiDocker, color: '#2496ED', level: 68, experience: '1 năm' },
            { name: 'Jenkins', icon: SiJenkins, color: '#F2C037', level: 66, experience: '1 năm' },
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
      viewDetail: 'Xem chi tiết',
      modalTitle: 'Chi tiết dự án',
      demoLabel: 'Website demo',
      responsibilitiesLabel: 'Tôi đã làm gì',
      closeLabel: 'Đóng',
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
          desc: 'Tham gia phát triển ứng dụng web fullstack với ReactJS, Angular, NodeJS, Nest.js, PHP và Laravel; xây dựng REST API/GraphQL, làm việc với MySQL và hỗ trợ quy trình triển khai bằng Docker, Jenkins.',
          tags: ['Angular', 'ReactJS', 'NodeJS', 'Nest.js', 'PHP', 'Laravel', 'MySQL', 'Docker', 'Jenkins'],
          image: AegonaImg,
          imageAlt: 'Aegona',
          projectIndices: [0, 1, 2, 3, 4],
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
          projectIndices: [5, 6, 7, 8, 9, 10],
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
          credentialUrl: 'https://xuongthuchanh.poly.edu.vn/certificate/PK02909/65d447264c768e0c1dbef624',
          Icon: FileCode2,
          iconColor: '#3178C6',
          bgColor: 'hsl(213 76% 48% / 0.08)',
        },
        {
          title: 'Building AI Applications for Code Debugging and Optimisation',
          issuer: 'FPT Polytechnic Tay Nguyen',
          date: '04/2024',
          credentialId: 'FPT-AI-CODE',
          credentialUrl: 'https://xuongthuchanh.poly.edu.vn/certificate/PK02909/65fbb01783e27d8e3458d8a6',
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
      footerLeft: 'Designed & Built by Hoa Phan - 2026',
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
      words: ['Software Engineer', 'ReactJS', 'Angular', 'Node.js', 'NestJS', 'PHP', 'Laravel', 'MySQL', 'Docker', 'Jenkins'],
      badge: 'Available for new opportunities',
      titleSuffix: 'Developer',
      subtitle:
        'Fullstack Developer focused on fast, user-friendly, modern web applications.',
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
        'As a Junior Fullstack Developer, I have a strong passion for building high-speed, modern, and user-friendly web applications. My strength lies in my ability to work across the entire system — from designing scalable REST APIs and optimizing backends with PHP & Laravel to developing smooth interfaces with ReactJS & Angular.',
        'Beyond coding, I proactively explore new technologies and actively participate in tech workshops to continuously enhance my software development mindset and technical skills.',
      ],
      tags: ['Angular', 'Git', 'Nest.js', 'NodeJS', 'ReactJS', 'Docker', 'Jenkins', 'Laravel', 'PHP', 'REST API', 'GraphQL', 'MySQL'],
      traits: [
        {
          icon: Server,
          title: 'Fullstack Developer',
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
            { name: 'Angular', icon: SiAngular, color: '#DD0031', level: 75, experience: '> 1 yr' },
            { name: 'ReactJS', icon: SiReact, color: '#61DAFB', level: 86, experience: '> 1 yr' },
            { name: 'JavaScript', icon: SiJavascript, color: '#F7DF1E', level: 86, experience: '> 1 yr' },
            { name: 'TypeScript', icon: SiTypescript, color: '#3178C6', level: 80, experience: '> 1 yr' },
          ],
        },
        {
          category: 'Backend',
          items: [
            { name: 'NodeJS', icon: SiNodedotjs, color: '#339933', level: 84, experience: '> 1 yr' },
            { name: 'Nest.js', icon: SiNestjs, color: '#E0234E', level: 82, experience: '> 1 yr' },
            { name: 'MySQL', icon: SiMysql, color: '#4169E1', level: 80, experience: '> 1 yr' },
            { name: 'PHP', icon: SiPhp, color: '#777BB4', level: 70, experience: '1 yr' },
            { name: 'Laravel', icon: SiLaravel, color: '#FF2D20', level: 70, experience: '1 yr' },
          ],
        },
        {
          category: 'Tools & Workflow',
          items: [
            { name: 'Git', icon: SiGit, color: '#F05032', level: 86, experience: '> 1 yr' },
            { name: 'Docker', icon: SiDocker, color: '#2496ED', level: 68, experience: '1 yr' },
            { name: 'Jenkins', icon: SiJenkins, color: '#F2C037', level: 66, experience: '1 yr' },
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
      viewDetail: 'View detail',
      modalTitle: 'Project detail',
      demoLabel: 'Demo website',
      responsibilitiesLabel: 'What I did',
      closeLabel: 'Close',
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
          title: 'Fullstack Developer',
          org: 'Aegona',
          period: '10/2024 - Present',
          desc: 'Building fullstack web applications with ReactJS, Angular, NodeJS, Nest.js, PHP and Laravel; implementing REST API/GraphQL, working with MySQL, and supporting deployment workflows with Docker and Jenkins.',
          tags: ['Angular', 'ReactJS', 'NodeJS', 'Nest.js', 'PHP', 'Laravel', 'MySQL', 'Docker', 'Jenkins'],
          image: AegonaImg,
          imageAlt: 'Aegona',
          projectIndices: [0, 1, 2, 3, 4],
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
          projectIndices: [5, 6, 7, 8, 9, 10],
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
          credentialUrl: 'https://xuongthuchanh.poly.edu.vn/certificate/PK02909/65d447264c768e0c1dbef624',
          Icon: FileCode2,
          iconColor: '#3178C6',
          bgColor: 'hsl(213 76% 48% / 0.08)',
        },
        {
          title: 'Building AI Applications for Code Debugging and Optimisation',
          issuer: 'FPT Polytechnic Tay Nguyen',
          date: '04/2024',
          credentialId: 'FPT-AI-CODE',
          credentialUrl: 'https://xuongthuchanh.poly.edu.vn/certificate/PK02909/65fbb01783e27d8e3458d8a6',
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
