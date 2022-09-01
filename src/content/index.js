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
  title: 'Dimas Maulana Dwi Saputra',
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
    role: 'Lead Web and Cloud Curriculum',
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
    name: '5 years experience',
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
    name: 'Lead Web and Cloud Curriculum',
    company: 'Dicoding',
    logo: '/assets/images/icons/company/dicoding.png',
    startDate: '2022-01-01',
    endDate: null,
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

export const notebooks = [
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
    name: 'Associate Android Developer',
    image: '/assets/images/badges/associate-android-developer.png',
    link: 'https://graduation.udacity.com/confirm/55HC7FE9',
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
    name: 'Node.js Application Development',
    image: '/assets/images/badges/nodejs-application-development.jpg',
    link: '/assets/others/nodejs-application-development-certificate.pdf',
  },
];
