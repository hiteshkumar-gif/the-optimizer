import { DayTask } from './types';

export interface ChallengeDefinition extends DayTask {
  dayNumber: number;
  category: 'Foundation' | 'Frontend' | 'Fullstack' | 'Backend & API' | 'Mobile & Performance' | 'Capstone';
  submissionRequirements: {
    githubRequired: boolean;
    linkedinRequired: boolean;
    description: string;
  };
}

export const DAY_0_TASK: ChallengeDefinition = {
  id: 0,
  dayNumber: 0,
  title: 'Day 0: Developer Profile & Trajectory Setup',
  subtitle: 'Initialize your 60-day challenge environment, connect proof profiles, and set your baseline.',
  category: 'Foundation',
  difficulty: 'Beginner',
  estimatedTime: '15 min',
  skills: ['Git', 'GitHub', 'LinkedIn', 'Profile Setup'],
  mission: [
    'Connect your public GitHub profile handle for repository verification',
    'Add your LinkedIn profile URL to share your daily proof of work',
    'Select your targeted 60-day engineering learning track',
    'Confirm your program start date to calculate your dynamic daily schedule'
  ],
  beforeYouStart: 'Ensure you have active GitHub and LinkedIn accounts ready.',
  whatYoullLearn: [
    'Public proof-of-work accountability',
    'Professional profile optimization',
    'Streak momentum tracking principles'
  ],
  proTips: [
    'Use your primary GitHub handle so recruiters can verify your daily commit graph.',
    'Keep your LinkedIn profile public to maximize networking reach.'
  ],
  resources: [
    { title: 'GitHub Profile README Best Practices', url: 'https://docs.github.com/en/get-started/quickstart/setting-up-git', type: 'Documentation' },
    { title: 'Optimizing Your LinkedIn Developer Profile', url: 'https://www.linkedin.com', type: 'Guide' }
  ],
  submissionRequirements: {
    githubRequired: true,
    linkedinRequired: true,
    description: 'Connect your active GitHub handle and LinkedIn URL to complete Day 0 Onboarding.'
  }
};

// Fixed 60-Day Program Curriculum
const FIXED_CHALLENGES: Record<number, Omit<ChallengeDefinition, 'id' | 'dayNumber'>> = {
  1: {
    title: 'Day 1: Version Control & Modern Git Workflows',
    subtitle: 'Master terminal Git commands, branching models, and GitHub repository setup.',
    category: 'Foundation',
    difficulty: 'Beginner',
    estimatedTime: '30 min',
    skills: ['Git', 'GitHub', 'Terminal'],
    mission: [
      'Initialize a new local Git repository via terminal',
      'Create a README.md file documenting your 60-day challenge goals',
      'Commit your changes with clear semantic commit messages',
      'Push your branch to GitHub and make your repository public'
    ],
    beforeYouStart: 'Make sure Git is installed on your machine and authenticated with GitHub.',
    whatYoullLearn: ['Semantic Git commits', 'Remote repository origin setup', 'Public documentation standards'],
    proTips: ['Use descriptive commit messages like feat: add initial readme instead of generic updates.'],
    resources: [{ title: 'Git Official Reference Manual', url: 'https://git-scm.com/docs', type: 'Documentation' }],
    submissionRequirements: { githubRequired: true, linkedinRequired: true, description: 'Submit your GitHub repository link and post Day 1 proof to LinkedIn.' }
  },
  2: {
    title: 'Day 2: Semantic HTML5 & Web Accessibility Foundations',
    subtitle: 'Structure content using accessible HTML elements and ARIA landmarks.',
    category: 'Frontend',
    difficulty: 'Beginner',
    estimatedTime: '35 min',
    skills: ['HTML5', 'Accessibility', 'ARIA'],
    mission: [
      'Refactor generic <div> elements into semantic <header>, <main>, <article>, and <footer> tags',
      'Add proper alt attributes to all images and aria-labels to interactive elements',
      'Test screen reader focus order and keyboard navigation using Tab key'
    ],
    beforeYouStart: 'Review WCAG 2.1 accessibility guidelines.',
    whatYoullLearn: ['Semantic document structure', 'Screen reader compatibility', 'Accessible focus rings'],
    proTips: ['Never use non-interactive elements like <div> as buttons without role="button" and tabindex.'],
    resources: [{ title: 'MDN Semantic HTML Guide', url: 'https://developer.mozilla.org/en-US/docs/Glossary/Semantics', type: 'Documentation' }],
    submissionRequirements: { githubRequired: true, linkedinRequired: true, description: 'Submit GitHub repository link and LinkedIn proof update.' }
  },
  3: {
    title: 'Day 3: Responsive Layout Systems & CSS Grid',
    subtitle: 'Design multi-column responsive interfaces that adapt seamlessly to mobile viewports.',
    category: 'Frontend',
    difficulty: 'Intermediate',
    estimatedTime: '40 min',
    skills: ['CSS Grid', 'Flexbox', 'Responsive Design'],
    mission: [
      'Create a 3-column CSS Grid layout that collapses to 1-column on 390px mobile screens',
      'Use CSS repeat(auto-fit, minmax(...)) for fluid container sizing',
      'Eliminate horizontal scrollbars across all screen widths'
    ],
    beforeYouStart: 'Review CSS Grid template areas and media queries.',
    whatYoullLearn: ['Fluid typography', 'CSS Grid implicit/explicit tracks', 'Mobile-first breakpoints'],
    proTips: ['Design for 390px mobile screens first before writing desktop media queries.'],
    resources: [{ title: 'Complete Guide to CSS Grid', url: 'https://css-tricks.com/snippets/css/complete-guide-grid/', type: 'Guide' }],
    submissionRequirements: { githubRequired: true, linkedinRequired: true, description: 'Submit GitHub repository link and LinkedIn update.' }
  },
  4: {
    title: 'Day 4: Interactive DOM Manipulation & JS Event Handling',
    subtitle: 'Build dynamic user interfaces powered by event listeners and DOM state updates.',
    category: 'Frontend',
    difficulty: 'Intermediate',
    estimatedTime: '40 min',
    skills: ['JavaScript', 'DOM API', 'Event Delegation'],
    mission: [
      'Attach event delegation listeners to parent container elements',
      'Dynamically update DOM nodes without reloading the browser page',
      'Handle input validation and toggle error states smoothly'
    ],
    beforeYouStart: 'Review addEventListener and event bubbling principles.',
    whatYoullLearn: ['Event bubbling', 'DOM element creation', 'Interactive state updates'],
    proTips: ['Use event delegation to handle dynamic list items efficiently.'],
    resources: [{ title: 'JavaScript Event Reference', url: 'https://developer.mozilla.org/en-US/docs/Web/Events', type: 'Documentation' }],
    submissionRequirements: { githubRequired: true, linkedinRequired: true, description: 'Submit GitHub repo link and LinkedIn update.' }
  },
  5: {
    title: 'Day 5: Asynchronous JavaScript & RESTful API Consumption',
    subtitle: 'Fetch, parse, and render live data from remote REST endpoints using fetch and async/await.',
    category: 'Backend & API',
    difficulty: 'Intermediate',
    estimatedTime: '45 min',
    skills: ['JavaScript', 'Fetch API', 'Promises', 'JSON'],
    mission: [
      'Fetch JSON payload from a public REST API endpoint using async/await',
      'Implement loading spinner states while data is being fetched',
      'Handle network failure states gracefully with try/catch error UI'
    ],
    beforeYouStart: 'Understand HTTP response status codes and Promise states.',
    whatYoullLearn: ['Async/await syntax', 'API error handling', 'JSON parsing'],
    proTips: ['Always test HTTP 404 and 500 error responses to ensure your error UI renders properly.'],
    resources: [{ title: 'Fetch API Guide', url: 'https://developer.mozilla.org/en-US/docs/Web/API/Fetch_API', type: 'Guide' }],
    submissionRequirements: { githubRequired: true, linkedinRequired: true, description: 'Submit GitHub repository link and LinkedIn post.' }
  },
  12: {
    title: 'Day 12: Build a Responsive Developer Portfolio',
    subtitle: 'Turn your progress into something you can show the world.',
    category: 'Frontend',
    difficulty: 'Intermediate',
    estimatedTime: '45 min',
    skills: ['HTML', 'CSS', 'JavaScript', 'Responsive UI'],
    mission: [
      'Create a clean Hero section with your headline and primary contact CTA',
      'Add an About section detailing your developer background & goals',
      'Build an interactive Skills section with category tags',
      'Implement a responsive Projects section showcasing your recent work',
      'Include a Contact section with accessible social links and contact form'
    ],
    beforeYouStart: 'Ensure your project structure is organized cleanly with semantic HTML tags (<header>, <main>, <section>, <footer>) and responsive CSS media queries.',
    whatYoullLearn: [
      'Mobile-first responsive design strategies',
      'Semantic HTML5 element hierarchy',
      'Modern CSS Flexbox & Grid layouts',
      'Component-driven structure thinking'
    ],
    proTips: [
      'Design for 390px mobile viewport first before scaling up to desktop screens.',
      'Keep color contrast high and font sizes readable on smaller mobile screens.',
      'Add subtle transition effects on hover and tap states to make the interface feel responsive.'
    ],
    resources: [
      { title: 'CSS Grid & Flexbox Complete Guide', url: 'https://css-tricks.com', type: 'Documentation' },
      { title: 'Semantic HTML5 Checklist', url: 'https://developer.mozilla.org', type: 'Article' },
      { title: 'Responsive Typography Guidelines', url: 'https://web.dev', type: 'Guide' }
    ],
    submissionRequirements: { githubRequired: true, linkedinRequired: true, description: 'Submit your GitHub portfolio repository link and share proof of work on LinkedIn.' }
  }
};

// Helper to retrieve challenge by day number deterministically
export const getChallengeByDay = (dayId: string | number): ChallengeDefinition => {
  const num = Math.max(0, Math.min(60, Number(dayId) || 0));

  if (num === 0) {
    return DAY_0_TASK;
  }

  if (FIXED_CHALLENGES[num]) {
    return {
      ...FIXED_CHALLENGES[num],
      id: num,
      dayNumber: num,
    };
  }

  // Structured fallback for days 6..60 to ensure zero undefined errors
  const categories: ('Foundation' | 'Frontend' | 'Fullstack' | 'Backend & API' | 'Mobile & Performance' | 'Capstone')[] = [
    'Foundation', 'Frontend', 'Backend & API', 'Fullstack', 'Mobile & Performance', 'Capstone'
  ];
  const category = categories[num % categories.length];

  return {
    id: num,
    dayNumber: num,
    title: `Day ${num}: ${getCategoryTitle(num, category)}`,
    subtitle: `Day ${num} of your 60-day developer trajectory. Build production features daily.`,
    category,
    difficulty: num < 20 ? 'Beginner' : num < 45 ? 'Intermediate' : 'Advanced',
    estimatedTime: `${30 + (num % 4) * 10} min`,
    skills: getCategorySkills(category),
    mission: [
      `Review Day ${num} requirements and architectural specifications`,
      'Implement clean, modular code components following design patterns',
      'Perform responsive testing across 390px mobile and desktop viewports',
      'Submit GitHub repository commit and LinkedIn proof of work'
    ],
    beforeYouStart: 'Ensure your development environment is active and previous day features are committed.',
    whatYoullLearn: ['Production modular design', 'State management patterns', 'Automated code quality testing'],
    proTips: ['Focus on clean mobile responsiveness first before desktop layout enhancements.'],
    resources: [
      { title: 'Developer Architecture Guide', url: 'https://developer.mozilla.org', type: 'Documentation' },
      { title: 'Mobile UI Best Practices', url: 'https://web.dev', type: 'Guide' }
    ],
    submissionRequirements: {
      githubRequired: true,
      linkedinRequired: true,
      description: `Submit your Day ${num} GitHub repository link and LinkedIn post to claim your streak.`
    }
  };
};

function getCategoryTitle(day: number, category: string): string {
  switch (category) {
    case 'Frontend': return 'Modern React Component Architecture';
    case 'Backend & API': return 'RESTful API Server & Database Modeling';
    case 'Fullstack': return 'Fullstack Integration & Authentication Workflow';
    case 'Mobile & Performance': return 'Mobile Optimization & Performance Metrics';
    case 'Capstone': return 'Capstone Production Deployment & CI/CD Pipeline';
    default: return 'Production Engineering Best Practices';
  }
}

function getCategorySkills(category: string): string[] {
  switch (category) {
    case 'Frontend': return ['React', 'TypeScript', 'Tailwind CSS'];
    case 'Backend & API': return ['Node.js', 'Express', 'SQL/NoSQL'];
    case 'Fullstack': return ['Next.js', 'PostgreSQL', 'Auth'];
    case 'Mobile & Performance': return ['React Native', 'Web Vitals', 'PWA'];
    case 'Capstone': return ['Vercel', 'Docker', 'GitHub Actions'];
    default: return ['JavaScript', 'TypeScript', 'Git'];
  }
}
