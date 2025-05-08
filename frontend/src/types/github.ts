// GitHub User Types
export interface User {
    login: string;
    name: string;
    avatarUrl: string;
    bio: string;
    location: string;
    company: string;
    blog: string;
    email: string;
    followers: number;
    following: number;
    createdAt: string;
    updatedAt: string;
    hireable: boolean;
    aiSummary: string;
}

// Repository Types
export interface Repository {
    id: string;
    name: string;
    description: string;
    url: string;
    stars: number;
    forks: number;
    watchers: number;
    techStack: string[];
    createdAt: string;
    updatedAt: string;
    aiSummary: string;
}

// GitHub Statistics Types
export interface LanguageData {
    name: string;
    percentage: number;
    linesOfCode: number;
}

export interface CodeMetricsData {
    totalLinesOfCode: number;
    totalRepositories: number;
    activeDays: number;
    totalContributors: number;
    totalStars: number;
}

export interface HeatmapData {
    date: string;
    count: number;
}

export interface CommitActivityData {
    date: string;
    commits: number;
}

export interface GitHubStatistics {
    languages: LanguageData[];
    metrics: CodeMetricsData;
    commitCalendar: HeatmapData[];
    commitActivity: CommitActivityData[];
}

// Overall GitHub Data Response
export interface GitHubDataResponse {
    user: User;
    topRepositories: Repository[];
    stats: GitHubStatistics;
}