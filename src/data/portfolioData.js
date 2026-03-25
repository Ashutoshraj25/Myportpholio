import {
  FiArrowRight,
  FiGithub,
  FiExternalLink,
  FiCpu,
  FiDatabase,
  FiLayout,
  FiLinkedin,
  FiMail,
} from 'react-icons/fi'
import {
  FaReact,
  FaNodeJs,
  FaGitAlt,
  FaHackerrank,
  FaBrain,
  FaStar,
  FaRocket,
  FaCog,
  FaBriefcase,
  FaGraduationCap,
} from 'react-icons/fa'
import { SiExpress, SiMongodb, SiLeetcode } from 'react-icons/si'

export const sectionOrder = ['home', 'about', 'stack', 'stats', 'leetcode', 'projects', 'contact']

export const portfolioData = {
  hero: {
    availability: 'Open to Internship & Full-Time Opportunities',
    titlePrefix: 'Designing ambitious digital products as a',
    typedRoles: ['Full Stack Developer', 'ML Engineer', 'DSA Enthusiast', 'Data Scientist'],
    description:
      'Crafting high-performance web products from intuitive interfaces to scalable backend systems.',
    focus:
      'Building scalable React apps, API-driven systems, and high-performance full-stack solutions.',
    primaryCta: { label: 'Explore Projects', href: '#projects', icon: FiArrowRight },
    secondaryCta: { label: "Let's Connect", href: '#contact' },
    floatingBadges: [
      { label: 'React Systems', value: 'Scalable UI' },
      { label: 'Backend Delivery', value: 'Node + APIs' },
      { label: 'Production Focus', value: 'Perf + UX' },
    ],
  },
  profile: {
    name: 'Ashutosh Raj',
    role: 'Full Stack Developer',
    image: '/profile-photo.jpeg',
    description:
      'Full Stack Developer specializing in scalable applications, polished UI, and efficient backend systems.',
  },
  about: {
    kicker: 'About',
    heading:
      'I design and build high-performance full-stack applications with a focus on clean architecture, scalability, and real-world impact.',
    body: [
      "I'm Ashutosh Raj, a Computer Science student passionate about solving real-world problems through code.",
      'I specialize in building fast, responsive frontend experiences and reliable backend systems. From data structures to full-stack projects, I focus on writing clean, maintainable code that scales.',
      "I enjoy turning complex problems into simple, efficient solutions - whether it's optimizing algorithms or designing production-ready applications.",
    ],
    techStack: ['C++', 'Java', 'JavaScript', 'React', 'Node.js', 'Express', 'MongoDB', 'SQL', 'Git'],
    achievements: ['250+ DSA Problems Solved', 'Strong DSA Foundation', 'Full-Stack Project Experience'],
    current: ['Solving DSA daily (LeetCode)', 'Building full-stack projects', 'Learning system design fundamentals'],
    highlightLine: "I don't just write code - I build solutions that people actually use.",
    pillars: [
      {
        title: 'Frontend',
        text: 'React, Tailwind, animations, responsive UI',
        icon: FiLayout,
      },
      {
        title: 'Backend',
        text: 'Node.js, Express, APIs, database design',
        icon: FiDatabase,
      },
      {
        title: 'Problem Solving',
        text: 'DSA, LeetCode, optimization, clean logic',
        icon: FiCpu,
      },
    ],
  },
  stack: [
    { name: 'React', icon: FaReact, color: 'from-sky-400 to-cyan-300' },
    { name: 'Node.js', icon: FaNodeJs, color: 'from-emerald-400 to-lime-300' },
    { name: 'Express', icon: SiExpress, color: 'from-slate-300 to-slate-100' },
    { name: 'MongoDB', icon: SiMongodb, color: 'from-emerald-500 to-green-300' },
    { name: 'Git', icon: FaGitAlt, color: 'from-orange-400 to-amber-300' },
  ],
  stats: [
    {
      label: 'Problems Solved',
      value: 250,
      suffix: '+',
      description: 'Consistent DSA practice across arrays, trees, graphs, and dynamic programming.',
      icon: FaBrain,
    },
    {
      label: 'Coding Profile',
      display: '5? HackerRank',
      description: 'Strong problem-solving skills with consistent coding performance.',
      icon: FaStar,
    },
    {
      label: 'Projects',
      value: 3,
      suffix: '+',
      description: 'Built full-stack applications with real-world use cases and clean architecture.',
      icon: FaRocket,
    },
    {
      label: 'Core Strength',
      display: 'Problem Solving',
      description: 'Strong foundation in data structures, algorithms, and optimization techniques.',
      icon: FaCog,
    },
  ],
  projects: [
    {
      title: 'AcadMate',
      description:
        'A student-focused academic management platform designed to streamline notes, tasks, and collaboration.',
      features: ['Organized academic workflows', 'Clean and responsive UI', 'Focus on usability'],
      stack: ['React', 'Tailwind', 'Node.js', 'MongoDB'],
      impact: 'Improves productivity and organization for students',
      github: 'https://github.com/Ashutoshraj25',
      live: '#projects',
      accent: 'from-cyan-500/30 via-blue-500/15 to-transparent',
      icon: FaGraduationCap,
    },
    {
      title: 'Job Portal',
      description: 'A full-stack job portal connecting job seekers with recruiters.',
      features: ['Role-based authentication', 'Job posting and application system', 'Scalable backend APIs'],
      stack: ['React', 'Node.js', 'Express', 'MongoDB'],
      impact: 'Enables efficient job discovery and hiring workflow',
      github: 'https://github.com/Ashutoshraj25',
      live: '#projects',
      accent: 'from-fuchsia-500/28 via-violet-500/16 to-transparent',
      icon: FaBriefcase,
    },
    {
      title: 'Mental Health ML Dashboard',
      description: 'A data-driven dashboard analyzing mental health trends using machine learning.',
      features: ['Data visualization (charts/graphs)', 'ML-based insights', 'Real dataset analysis'],
      stack: ['Python', 'Pandas', 'Machine Learning', 'Visualization'],
      impact: 'Helps understand mental health trends through data',
      github: 'https://github.com/Ashutoshraj25',
      live: '#projects',
      accent: 'from-emerald-500/30 via-teal-400/16 to-transparent',
      icon: FaBrain,
    },
  ],
  socials: [
    { label: 'GitHub', value: 'github.com/Ashutoshraj25', href: 'https://github.com/Ashutoshraj25', icon: FiGithub },
    { label: 'LinkedIn', value: 'linkedin.com/in/ashutosh-raj01', href: 'https://www.linkedin.com/in/ashutosh-raj01/', icon: FiLinkedin },
    { label: 'LeetCode', value: 'leetcode.com/u/rajashutosh324a', href: 'https://leetcode.com/u/rajashutosh324a/', icon: SiLeetcode },
  ],
  contact: {
    heading: 'Let’s build something impactful together.',
    description:
      'I’m open to internships, full-time roles, and collaborations where I can contribute through strong problem-solving and full-stack development.',
    email: 'rajashutosh324a@gmail.com',
    badge: 'Available for New Opportunities',
    availability: ['Internships', 'Full-time roles', 'Freelance / projects'],
    reasons: [
      'Strong DSA and problem-solving skills',
      'Full-stack development experience',
      'Focus on clean, scalable code',
    ],
    quickActions: [
      { label: 'Email Me', href: 'mailto:rajashutosh324a@gmail.com', icon: FiMail },
      { label: 'View GitHub', href: 'https://github.com/Ashutoshraj25', icon: FiGithub },
      { label: 'View LinkedIn', href: 'https://www.linkedin.com/in/ashutosh-raj01/', icon: FiLinkedin },
    ],
  },
  icons: {
    external: FiExternalLink,
    github: FiGithub,
  },
}
