import {
  FaGithub,
  FaLinkedin,
  FaCode,
  FaAws,
  FaChrome,
  FaGraduationCap,
  FaGithubAlt,
  FaReact,
  FaNodeJs,
} from 'react-icons/fa';

export const navigation = {
  title: '',
  menus: [
    {
      name: 'home',
      url: '/',
    },
    {
      name: 'notebooks',
      url: '/notebooks',
    },
    {
      name: 'talks',
      url: '/talks',
    },
    {
      name: 'about',
      url: '/about',
    },
  ],
};

export const personalInformation = {
  name: 'Dimas Maulana Dwi Saputra',
  description: `
Hi there! 👋

Welcome to my profile. Nice to meet you! My name is Dimas, I'm an independent Software Engineer with 5+ years of experience. I'm doing my best to make high-quality content for Dicoding Academy. I have contributed to many courses with more than 100K students enrolled. My passion in the engineering world is web development and software testing. Also, I'm a long-live learner in the Software Architecture field.

Apart from the engineering world, I am passionate about music and history. In the slack time, I read a lot of historical facts while listening to music.
  `,
  mention: 'dimasmds',
  location: 'Bandung',
  currentJob: {
    role: 'Engineering Manager',
    at: 'Dicoding',
  },
  pictureUrl: '/assets/images/profile.jpg',
};

export const tags = [
  {
    name: 'Software Engineer',
    icon: FaCode,
  },
  {
    name: 'AWS Certified',
    icon: FaAws,
  },
  {
    name: 'Web Developer',
    icon: FaChrome,
  },
  {
    name: '5+ years experience',
    icon: FaGraduationCap,
  },
  {
    name: 'Github Star',
    icon: FaGithubAlt,
  },
  {
    name: 'React Developer',
    icon: FaReact,
  },
  {
    name: 'Node.js',
    icon: FaNodeJs,
  },
];

export const socialMedias = [
  {
    name: 'Github',
    url: 'https://github.com/dimasmds',
    icon: FaGithub,
  },
  {
    name: 'LinkedIn',
    url: 'https://www.linkedin.com/in/dimasmds/',
    icon: FaLinkedin,
  },
];

export const techStack = {
  'Cloud Storage': [
    {
      name: 'Amazon S3',
      icon: '/assets/images/icons/tech-stack/amazon-s3.png',
    },
  ],
  'State Management': [
    {
      name: 'Redux',
      icon: '/assets/images/icons/tech-stack/redux.png',
    },
  ],
  'Code Review': [
    {
      name: 'ESLint',
      icon: '/assets/images/icons/tech-stack/eslint.png',
    },
  ],
  'JavaScript Testing': [
    {
      name: 'Jest',
      icon: '/assets/images/icons/tech-stack/jest.png',
    },
    {
      name: 'Jasmine',
      icon: '/assets/images/icons/tech-stack/jasmine.png',
    },
  ],
  IDE: [
    {
      name: 'VSCode',
      icon: '/assets/images/icons/tech-stack/vscode.png',
    },
    {
      name: 'WebStorm',
      icon: '/assets/images/icons/tech-stack/webstorm.png',
    },
  ],
  'API Tools': [
    {
      name: 'Amazon API Gateway',
      icon: '/assets/images/icons/tech-stack/amazon-api-gateway.png',
    },
  ],
  'Mobile Development': [
    {
      name: 'React Native',
      icon: '/assets/images/icons/tech-stack/react-native.png',
    },
    {
      name: 'Android Native',
      icon: '/assets/images/icons/tech-stack/android-native.png',
    },
  ],
  'In-Memory Database': [
    {
      name: 'Redis',
      icon: '/assets/images/icons/tech-stack/redis.png',
    },
  ],
  'Web Server': [
    {
      name: 'nginx',
      icon: '/assets/images/icons/tech-stack/nginx.png',
    },
  ],
  'Frameworks (Full Stack)': [
    {
      name: 'Next.js',
      icon: '/assets/images/icons/tech-stack/nextjs.png',
    },
    {
      name: 'Node.js',
      icon: '/assets/images/icons/tech-stack/nodejs.png',
    },
  ],
  Languages: [
    {
      name: 'JavaScript',
      icon: '/assets/images/icons/tech-stack/javascript.png',
    },
    {
      name: 'Kotlin',
      icon: '/assets/images/icons/tech-stack/kotlin.png',
    },
  ],
  'Task Processing': [
    {
      name: 'AWS Lambda',
      icon: '/assets/images/icons/tech-stack/aws-lambda.png',
    },
    {
      name: 'Serverless Framework',
      icon: '/assets/images/icons/tech-stack/serverless.png',
    },
  ],
  'Static Web Hosting': [
    {
      name: 'Netlify',
      icon: '/assets/images/icons/tech-stack/netlify.png',
    },
  ],
  'Virtual Machine Platforms': [
    {
      name: 'Docker',
      icon: '/assets/images/icons/tech-stack/docker.png',
    },
  ],
  'NoSQL Database': [
    {
      name: 'DynamoDB',
      icon: '/assets/images/icons/tech-stack/dynamodb.png',
    },
  ],
  Databases: [
    {
      name: 'PostgreSQL',
      icon: '/assets/images/icons/tech-stack/postgresql.png',
    },
  ],
  'Message Queue': [
    {
      name: 'RabbitMQ',
      icon: '/assets/images/icons/tech-stack/rabbitmq.png',
    },
  ],
  'Build Tools': [
    {
      name: 'Webpack',
      icon: '/assets/images/icons/tech-stack/webpack.png',
    },
  ],
  'Templating Languages': [
    {
      name: 'TypeScript',
      icon: '/assets/images/icons/tech-stack/typescript.png',
    },
  ],
  Microframeworks: [
    {
      name: 'Hapi',
      icon: '/assets/images/icons/tech-stack/hapi.png',
    },
  ],
  'JavaScript UI': [
    {
      name: 'React',
      icon: '/assets/images/icons/tech-stack/react.png',
    },
  ],
};

export const workHistories = [
  {
    name: 'Engineering Manager',
    company: 'Dicoding',
    logo: '/assets/images/icons/company/dicoding.png',
    startDate: '2025-11-01',
    endDate: null,
  },
  {
    name: 'Lead Web and Cloud Curriculum',
    company: 'Dicoding',
    logo: '/assets/images/icons/company/dicoding.png',
    startDate: '2022-01-01',
    endDate: '2025-10-31',
  },
  {
    name: 'Web Curriculum Developer',
    company: 'Dicoding',
    logo: '/assets/images/icons/company/dicoding.png',
    startDate: '2019-09-01',
    endDate: '2022-01-01',
  },
  {
    name: 'Submission Project Reviewer',
    company: 'Dicoding',
    logo: '/assets/images/icons/company/dicoding.png',
    startDate: '2019-02-01',
    endDate: '2019-08-31',
  },
];

export const credentials = {};

export const techTalks = [
  {
    title: 'AWS X Dicoding LIVE : Storage dan Database di AWS',
    videoId: 'eaSoKJJ67yE',
  },
  {
    title: 'Web Developer From Zero to Hero',
    videoId: 'LTIaYXvz__4',
  },
  {
    title: 'AWS X Dicoding LIVE: Automation on AWS',
    videoId: 'NC8TswA7PiM',
  },
  {
    title: 'Dicoding Developer Coaching #56: Back-End | Pengenalan Bahasa Pemrograman JavaScript',
    videoId: 'axFB3XOE_y8',
  },
  {
    title: 'Dicoding Dev Coaching #60: Back-End | Mengenal Operator, Control Flow, dan Perulangan di JavaScript',
    videoId: 'FaWGkWB59vA',
  },
  {
    title: 'Dicoding Developer Coaching #62 : Back-End | Object, Array, Map, dan Sets di JavaScript',
    videoId: 'YjSPw9aZFZg',
  },
  {
    title: 'Dicoding Developer Coaching #70 : Back-End | Package Manager di JavaScript',
    videoId: '_GYr7G7NCKE',
  },
  {
    title: 'Dicoding Developer Coaching #76 : Back-End | JavaScript Concurrency',
    videoId: 'QyXqZqJhInc',
  },
  {
    title: 'Dicoding Developer Coaching #78 : Back-End | Menulis Unit Testing di JavaScript',
    videoId: 'UdQpwR1ub7E',
  },
  {
    title: 'AWS x Dicoding LIVE : "Agile vs DevOps"',
    videoId: 'mo391NjVx4U',
  },
  {
    title: 'Developer Coaching #83 : Back-End | Ketahui Node.js API yang Penting untuk Pengembangan Back-End',
    videoId: 'sDXZqe2rGuM',
  },
  {
    title: 'Dicoding Developer Coaching #86 : Back-End | Membuat HTTP Server dengan Node.js',
    videoId: 'GaWlgj6QrP8',
  },
  {
    title: 'Dicoding Developer Coaching #91: Back-End | Membuat HTTP Server di berbagai Framework Node.js',
    videoId: 'Y2EV1vRBE3A',
  },
  {
    title: 'Dicoding Developer Coaching #92 : Back-End | Deploy Aplikasi Node.js di AWS',
    videoId: '9QzA1rULMQo',
  },
  {
    title: 'AWS x Dicoding LIVE : "Serverless Microservices, Container, dan Orchestration"',
    videoId: 'PbZyl4IE35M',
  },
  {
    title: 'Dicoding Developer Coaching #99 : Back-End | Automation Testing dengan Postman',
    videoId: '7ao-9pWDRUs',
  },
  {
    title: 'Dicoding Developer Coaching #100 | Special Episode',
    videoId: '5HAu7hJ3oYY',
  },
  {
    title: 'Dicoding Developer Coaching #101: Back-End | Hapi Plugin dan Data Validation',
    videoId: 'zwN3NRPlrsI',
  },
  {
    title: '#DevCoach 175: React | Kenalan dengan React: UI Web Masa Kini!',
    videoId: '-0kstDNdhA8',
  },
  {
    title: '#DevCoach 178: React | Teknik React Menghidupkan UI dengan State',
    videoId: 'ltOervtEmHc',
  },
  {
    title: '#DevCoach 193: React | Hooks Mengubah Segalanya!',
    videoId: 'gtQ_QqC7vfQ',
  },
  {
    title: '#DevCoach 189: React | Kenalan dengan Lifecycle Component',
    videoId: 'icsirDtMu1o',
  },
  {
    title: 'DevCoach 210: React | JANGAN LANGSUNG RTK! Pahami Dulu Redux Fundamental Di Sini.',
    videoId: 'Wb5WxpFguVg',
  },
  {
    title: 'DevCoach 212: New Course | Belajar Pemrograman Rust untuk Pemula',
    videoId: 'KOK0qGasby0',
  },
  {
    title: 'Baparekraf Developer Day 2021',
    videoId: 'VXFvAthCSqQ',
  },
  {
    title: 'Baparekraf Developer Day 2022',
    videoId: 'W5soN70ajb0',
  },
  {
    title: 'Baparekraf Developer Day 2023',
    videoId: 'aLCc9XG-Uqk',
  },
  {
    title: 'Back End Track - BDD 2024',
    videoId: 'zlfGihNfRSo',
  },
];

export const notebooks = [
  {
    slug: 'good-enough-parenting-mengapa-menjadi-cukup-justru-lebih-baik',
    title: 'Good Enough Parenting: Mengapa Menjadi Orang Tua yang "Cukup" Justru Lebih Baik',
    tags: ['Parenting', 'Psikologi Anak', 'Fatherhood'],
    date: '2026-05-10',
    content: '/contents/notebooks/26/05/10_01.md',
  },
  {
    slug: 'bun-runtime-javascript-yang-menantang-dominasi-nodejs',
    title: 'Bun: Runtime JavaScript yang Menantang Dominasi Node.js',
    tags: ['JavaScript', 'Bun', 'Node.js', 'Web Development'],
    date: '2026-05-04',
    content: '/contents/notebooks/26/05/04_01.md',
  },
  {
    slug: 'tadabbur-al-quran-membaca-dengan-hati-bukan-sadar-huruf',
    title: 'Tadabbur Al-Quran: Membaca dengan Hati, Bukan Sekadar Sadar Huruf',
    tags: ['Islami', 'Al-Quran', 'Tadabbur'],
    date: '2026-05-01',
    content: '/contents/notebooks/26/05/01_01.md',
  },
  {
    slug: 'penyakit-ain-pada-anak-antara-keyakinan-dan-keseimbangan',
    title: 'Penyakit Ain pada Anak: Antara Keyakinan, Kewaspadaan, dan Keseimbangan',
    tags: ['Islam', 'Parenting', 'Kesehatan Anak'],
    date: '2026-04-28',
    content: '/contents/notebooks/26/04/28_01.md',
  },
  {
    slug: 'mengukur-produktivitas-tim-engineering-tanpa-menyakiti',
    title: 'Mengukur Produktivitas Tim Engineering Tanpa Menyakiti',
    tags: ['Engineering Management', 'DORA Metrics', 'Developer Experience'],
    date: '2026-04-22',
    content: '/contents/notebooks/26/04/22_01.md',
  },
  {
    slug: 'webassembly-bahasa-apapun-jalan-di-browser',
    title: 'WebAssembly: Bahasa Apapun, Jalan di Browser',
    tags: ['WebAssembly', 'Frontend', 'Web Development'],
    date: '2026-04-21',
    content: '/contents/notebooks/26/04/21_01.md',
  },
  {
    slug: 'server-components-dan-paradigma-baru-arsitektur-frontend',
    title: 'Server Components dan Paradigma Baru Arsitektur Frontend',
    tags: ['React', 'Frontend', 'Software Architecture'],
    date: '2026-04-20',
    content: '/contents/notebooks/26/04/20_01.md',
  },
  {
    slug: 'dua-anak-dua-dunia-mengapa-adil-tidak-selalu-berarti-sama',
    title: 'Dua Anak, Dua Dunia: Mengapa "Adil" Tidak Selalu Berarti "Sama"',
    tags: ['Parenting', 'Fatherhood', 'Family'],
    date: '2026-04-19',
    content: '/contents/notebooks/26/04/19_01.md',
  },
  {
    slug: 'tiga-belas-tahun-di-makkah',
    title: 'Tiga Belas Tahun di Makkah: Pelajaran dari Seerah yang Mengubah Cara Saya Melihat Perjalanan Spiritual',
    tags: ['Islami', 'Seerah', 'Spiritual'],
    date: '2026-04-17',
    content: '/contents/notebooks/26/04/17_01.md',
  },
  {
    slug: 'lima-detik-yang-lebih-berharga-dari-lima-jam',
    title: 'Lima Detik yang Lebih Berharga dari Lima Jam',
    tags: ['Parenting', 'Fatherhood', 'Engineering Manager'],
    date: '2026-04-16',
    content: '/contents/notebooks/26/04/16_01.md',
  },
  {
    slug: 'mengenal-clawdbot-asisten-ai-pribadi',
    title: 'Mengenal ClawDBot: Asisten AI Pribadi',
    tags: ['AI', 'OpenClaw', 'Zai'],
    date: '2026-03-08',
    content: '/contents/notebooks/26/03/08_01.md',
  },
  {
    slug: 'seru-seruan-bareng-ai-pakai-node-js',
    title: 'Seru-seruan bareng AI pakai Node.js',
    tags: ['AI', 'Developer', 'Node.js'],
    date: '2024-02-28',
    content: '/contents/notebooks/24/02/28_01.md',
  },
  {
    slug: 'bulan-unordinary-woman-bab-1',
    title: 'Bulan, Unordinary Woman - Bab 1: Dahaga',
    tags: ['story', 'bulan'],
    date: '2022-02-24',
    content: '/contents/notebooks/22/02/24_01.md',
  },
  {
    slug: 'bulan-unordinary-woman-pengantar',
    title: 'Bulan, Unordinary Woman - Pengantar',
    tags: ['story', 'bulan'],
    date: '2022-02-23',
    content: '/contents/notebooks/22/02/23_01.md',
  },
];

export const badges = [
  {
    name: 'OpenJS Node.js Services Developer',
    image: '/assets/images/badges/openjs-nodejs-services-developer.png',
    link: 'https://www.credly.com/badges/8168076b-d532-4f3b-b987-b3571e046b1d/public_url',
  },
  {
    name: 'OpenJS Node.js Application Developer',
    image: '/assets/images/badges/openjs-nodejs-application-developer.png',
    link: 'https://www.credly.com/badges/bdcf10e4-ecc2-496a-bd2c-b74a00034297/public_url',
  },
  {
    name: 'Associate Android Developer',
    image: '/assets/images/badges/associate-android-developer.png',
    link: 'https://www.credential.net/bb599703-294b-4c07-bbf0-f892a6225c85',
  },
  {
    name: 'Cloud Practitioner Essentials',
    image: '/assets/images/badges/cloud-practitioner-essentials.png',
    link: 'https://www.credly.com/badges/33dd24c0-142c-40c0-b986-f600a068b07c/public_url',
  },
  {
    name: 'React Developer Nanodegree',
    image: '/assets/images/badges/react-nanodegree.jpg',
    link: 'https://graduation.udacity.com/confirm/2C9QTMM',
  },
  {
    name: 'Cloud Developer Nanodegree',
    image: '/assets/images/badges/cloud-developer-nanodegree.jpg',
    link: 'https://graduation.udacity.com/confirm/55HC7FE9',
  },
  {
    name: 'Node.js Service Development',
    image: '/assets/images/badges/nodejs-service-development.jpg',
    link: '/assets/others/nodejs-service-development-certificate.pdf',
  },
  {
    name: 'Node.js Application Development',
    image: '/assets/images/badges/nodejs-application-development.jpg',
    link: '/assets/others/nodejs-application-development-certificate.pdf',
  },
];
