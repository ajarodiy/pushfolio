import type { GitHubDataResponse } from '@/types/github';

// Helper function to generate realistic mock data
export const mockGitHubData = (username: string): GitHubDataResponse => {
  // Generate random data based on username to make it look somewhat unique
  const nameHash = hashString(username);
  
  // Mock user data
  const user = {
    login: username,
    name: generateName(username),
    avatarUrl: `https://avatars.githubusercontent.com/u/${nameHash % 10000}?v=4`,
    bio: generateBio(username),
    location: generateLocation(nameHash),
    company: generateCompany(nameHash),
    blog: generateBlog(username),
    email: `${username.toLowerCase()}@example.com`,
    followers: 50 + (nameHash % 950),
    following: 20 + (nameHash % 280),
    createdAt: generateDate(2013, 2019),
    updatedAt: generateDate(2022, 2024),
    hireable: Boolean(nameHash % 2),
    aiSummary: generateAiSummary(username, nameHash),
  };
  
  // Generate top repositories
  const repoCount = 4 + (nameHash % 3); // 4-6 repositories
  const topRepositories = Array.from({ length: repoCount }, (_, i) => 
    generateRepository(username, nameHash, i)
  );
  
  // Generate GitHub statistics
  const stats = {
    languages: generateLanguages(nameHash),
    metrics: {
      totalLinesOfCode: 10000 + (nameHash % 990000),
      totalRepositories: 10 + (nameHash % 90),
      activeDays: 100 + (nameHash % 265),
      totalContributors: 5 + (nameHash % 95),
      totalStars: 50 + (nameHash % 9950),
    },
    commitCalendar: generateCommitCalendar(),
    commitActivity: generateCommitActivity(),
  };
  
  return {
    user,
    topRepositories,
    stats,
  };
};

// Helper functions
function hashString(str: string): number {
  let hash = 0;
  for (let i = 0; i < str.length; i++) {
    const char = str.charCodeAt(i);
    hash = ((hash << 5) - hash) + char;
    hash = hash & hash; // Convert to 32bit integer
  }
  return Math.abs(hash);
}

function generateName(username: string): string {
  const firstNames = ["Alex", "Jordan", "Taylor", "Casey", "Morgan", "Jamie", "Riley", "Avery", "Quinn", "Dakota"];
  const lastNames = ["Smith", "Johnson", "Williams", "Brown", "Jones", "Garcia", "Miller", "Davis", "Wilson", "Martinez"];
  
  const hash = hashString(username);
  const firstName = firstNames[hash % firstNames.length];
  const lastName = lastNames[(hash + 1) % lastNames.length];
  
  return `${firstName} ${lastName}`;
}

function generateBio(username: string): string {
  const bios = [
    "Software engineer passionate about web technologies and open source",
    "Full-stack developer focused on building scalable applications",
    "Coding enthusiast with interests in AI, machine learning, and data science",
    "Frontend specialist crafting beautiful and responsive user interfaces",
    "Backend developer who loves solving complex performance problems",
    "DevOps engineer building reliable infrastructure and deployment pipelines",
    "Mobile app developer creating seamless experiences across platforms",
    "Open source contributor and community builder",
  ];
  
  return bios[hashString(username) % bios.length];
}

function generateLocation(hash: number): string {
  const locations = [
    "San Francisco, CA",
    "New York, NY",
    "Seattle, WA",
    "Austin, TX",
    "Boston, MA",
    "London, UK",
    "Berlin, Germany",
    "Toronto, Canada",
    "Sydney, Australia",
    "Tokyo, Japan",
  ];
  
  return locations[hash % locations.length];
}

function generateCompany(hash: number): string {
  const companies = [
    "Google",
    "Microsoft",
    "Amazon",
    "Facebook",
    "Apple",
    "Netflix",
    "Tesla",
    "Airbnb",
    "Uber",
    "Twitter",
    "",
  ];
  
  return hash % 3 === 0 ? "" : companies[hash % companies.length];
}

function generateBlog(username: string): string {
  return hash % 3 === 0 ? "" : `https://${username.toLowerCase()}.dev`;
}

function generateDate(startYear: number, endYear: number): string {
  const year = startYear + Math.floor(Math.random() * (endYear - startYear + 1));
  const month = Math.floor(Math.random() * 12) + 1;
  const day = Math.floor(Math.random() * 28) + 1;
  
  return new Date(year, month - 1, day).toISOString();
}

function generateRepository(username: string, nameHash: number, index: number): any {
  const prefixes = ["awesome", "react", "node", "go", "python", "rust", "typescript", "project", "app", "lib", "tool"];
  const suffixes = ["ui", "api", "app", "cli", "core", "utils", "tools", "starter", "boilerplate", "sdk"];
  
  const prefix = prefixes[(nameHash + index) % prefixes.length];
  const suffix = suffixes[(nameHash + index * 3) % suffixes.length];
  const name = `${prefix}-${suffix}`;
  
  // Tech stack based on repository name
  const techStackMap: Record<string, string[]> = {
    react: ["React", "TypeScript", "JavaScript", "CSS"],
    node: ["Node.js", "Express", "JavaScript", "MongoDB"],
    go: ["Go", "Docker"],
    python: ["Python", "Flask", "Django", "SQLAlchemy"],
    rust: ["Rust", "WebAssembly"],
    typescript: ["TypeScript", "Node.js", "React"],
  };
  
  // Get tech stack based on the prefix or default to JavaScript
  const baseTechStack = techStackMap[prefix] || ["JavaScript"];
  
  // Add some random additional tech
  const additionalTech = ["Docker", "GraphQL", "Redis", "PostgreSQL", "AWS", "Jest", "Webpack", "Vite"];
  const additionalCount = 1 + (nameHash % 3);
  
  for (let i = 0; i < additionalCount; i++) {
    const tech = additionalTech[(nameHash + i) % additionalTech.length];
    if (!baseTechStack.includes(tech)) {
      baseTechStack.push(tech);
    }
  }
  
  const descriptions = [
    `A modern ${prefix} ${suffix} library for building scalable applications`,
    `Lightweight ${prefix} toolkit for ${suffix} development`,
    `Production-ready ${prefix} ${suffix} with best practices`,
    `High-performance ${prefix} implementation for ${suffix}`,
    `Customizable ${prefix} framework for building ${suffix}`,
  ];
  
  const aiSummaries = [
    `This repository shows exceptional code organization and documentation, demonstrating ${baseTechStack[0]} expertise.`,
    `A well-maintained project with regular updates and thorough test coverage.`,
    `This showcases advanced ${baseTechStack[0]} patterns and optimization techniques.`,
    `An innovative approach to solving common ${prefix} challenges with clean architecture.`,
    `Demonstrates strong system design skills and attention to performance details.`,
  ];
  
  return {
    id: `repo-${nameHash}-${index}`,
    name,
    description: descriptions[(nameHash + index) % descriptions.length],
    url: `https://github.com/${username}/${name}`,
    stars: 5 + ((nameHash + index * 7) % 995),
    forks: 1 + ((nameHash + index * 3) % 99),
    watchers: 2 + ((nameHash + index * 5) % 98),
    techStack: baseTechStack,
    createdAt: generateDate(2020, 2023),
    updatedAt: generateDate(2023, 2024),
    aiSummary: aiSummaries[(nameHash + index) % aiSummaries.length],
  };
}

function generateLanguages(hash: number): any[] {
  const languages = [
    { name: "JavaScript", color: "#f1e05a" },
    { name: "TypeScript", color: "#2b7489" },
    { name: "Python", color: "#3572A5" },
    { name: "Go", color: "#00ADD8" },
    { name: "Rust", color: "#dea584" },
    { name: "C++", color: "#f34b7d" },
    { name: "Java", color: "#b07219" },
    { name: "Ruby", color: "#701516" },
    { name: "PHP", color: "#4F5D95" },
    { name: "Swift", color: "#ffac45" },
  ];
  
  // Select 3-6 languages
  const selectedCount = 3 + (hash % 4);
  const selectedLanguages = [];
  
  // Ensure total percentage adds up to 100%
  let remainingPercentage = 1.0;
  
  for (let i = 0; i < selectedCount; i++) {
    const language = languages[(hash + i) % languages.length];
    
    // For the last language, use the remaining percentage
    let percentage;
    if (i === selectedCount - 1) {
      percentage = remainingPercentage;
    } else {
      // Generate a percentage between 5% and 60% of the remaining
      const maxPercentage = Math.min(0.6, remainingPercentage * 0.8);
      percentage = 0.05 + ((hash + i * 7) % 100) / 100 * (maxPercentage - 0.05);
      remainingPercentage -= percentage;
    }
    
    selectedLanguages.push({
      name: language.name,
      percentage,
      linesOfCode: Math.round(percentage * (50000 + (hash % 950000))),
    });
  }
  
  // Sort by percentage (descending)
  return selectedLanguages.sort((a, b) => b.percentage - a.percentage);
}

function generateCommitCalendar(): any[] {
  const today = new Date();
  const oneYearAgo = new Date();
  oneYearAgo.setFullYear(today.getFullYear() - 1);
  
  const calendar: any[] = [];
  let currentDate = new Date(oneYearAgo);
  
  // Generate a commit count for each day in the past year
  while (currentDate <= today) {
    const dayOfWeek = currentDate.getDay();
    
    // Weekend days have fewer commits on average
    const isWeekend = dayOfWeek === 0 || dayOfWeek === 6;
    
    // Generate a base level of activity that varies by day of week
    let baseActivity = isWeekend ? 0.2 : 0.6;
    
    // Add some random variation
    const randomFactor = Math.random();
    
    // Occasionally add a spike of activity
    const activitySpike = Math.random() > 0.95 ? 3 : 1;
    
    // Calculate final commit count (0-12)
    const commitCount = Math.floor(baseActivity * randomFactor * activitySpike * 12);
    
    calendar.push({
      date: new Date(currentDate).toISOString().split('T')[0],
      count: commitCount,
    });
    
    // Move to the next day
    currentDate.setDate(currentDate.getDate() + 1);
  }
  
  return calendar;
}

function generateCommitActivity(): any[] {
  const today = new Date();
  const oneYearAgo = new Date();
  oneYearAgo.setFullYear(today.getFullYear() - 1);
  
  const activity: any[] = [];
  let currentDate = new Date(oneYearAgo);
  
  // Generate monthly commit activity
  while (currentDate <= today) {
    // Base level of activity
    let baseActivity = 20 + Math.floor(Math.random() * 30);
    
    // Add seasonal variations - more activity in winter months (Northern Hemisphere)
    const month = currentDate.getMonth();
    if (month >= 10 || month <= 2) { // November to March
      baseActivity += 10;
    }
    
    // Add some random spikes
    const randomSpike = Math.random() > 0.8 ? Math.floor(Math.random() * 50) : 0;
    
    activity.push({
      date: new Date(currentDate).toISOString().split('T')[0],
      commits: baseActivity + randomSpike,
    });
    
    // Move to the next month
    currentDate.setMonth(currentDate.getMonth() + 1);
  }
  
  return activity;
}

function generateAiSummary(username: string, hash: number): string {
  const adjectives = [
    "dedicated", "innovative", "detail-oriented", "passionate", "skilled", "experienced",
    "thorough", "methodical", "enthusiastic", "versatile"
  ];
  
  const verbs = [
    "specializes in", "excels at", "focuses on", "demonstrates expertise in", 
    "shows strong skills in", "has mastered", "contributes actively to", "builds"
  ];
  
  const domains = [
    "web development", "backend systems", "frontend architecture", "mobile applications",
    "data visualization", "developer tools", "API design", "cloud infrastructure",
    "performance optimization", "open source projects"
  ];
  
  const technologies = [
    "React", "Node.js", "TypeScript", "GraphQL", "Python", "Go", "Docker", "Kubernetes",
    "AWS", "PostgreSQL", "Next.js", "Vue.js", "TensorFlow", "MongoDB"
  ];
  
  const adjective1 = adjectives[hash % adjectives.length];
  const adjective2 = adjectives[(hash + 3) % adjectives.length];
  const verb = verbs[(hash + 5) % verbs.length];
  const domain = domains[(hash + 7) % domains.length];
  const tech1 = technologies[(hash + 11) % technologies.length];
  const tech2 = technologies[(hash + 13) % technologies.length];
  
  const summaries = [
    `${generateName(username)} is a ${adjective1} developer who ${verb} ${domain}. Their GitHub profile reveals a ${adjective2} approach to code organization and documentation. They show particular strength with ${tech1} and ${tech2}, consistently implementing best practices and modern development patterns.`,
    
    `A ${adjective1} software engineer with a strong focus on ${domain}. ${generateName(username)}'s repositories demonstrate ${adjective2} attention to detail and code quality. They have developed impressive skills in ${tech1} and ${tech2}, with a consistent history of well-structured projects.`,
    
    `${generateName(username)} stands out as a ${adjective1} contributor to ${domain}. Their work shows ${adjective2} problem-solving abilities and technical depth. They have particular expertise in ${tech1} and ${tech2}, evident through their thoughtfully architected projects.`,
    
    `A ${adjective1} ${domain} specialist who creates elegant, efficient solutions. ${generateName(username)} demonstrates ${adjective2} coding standards and documentation practices. Their projects showcase advanced knowledge of ${tech1} and ${tech2}, with a focus on maintainability and scalability.`
  ];
  
  return summaries[hash % summaries.length];
}

// For testing, this creates a hash
const hash = Math.floor(Math.random() * 10000);