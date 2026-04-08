export const IMAGE_BASE = import.meta.env.DEV
  ? 'https://mbo-portal.nl/student/2025-2026/S349635/uploads'
  : '/uploads'

export class ApiService {
  private static baseUrl: string = import.meta.env.DEV 
  ? 'https://mbo-portal.nl/student/2025-2026/S349635/api'
  : '/api'

  
  private static githubUsername: string = 'RayanCharef'

  // ─── PROJECTS  ───────────────────────────

  
static async getProjects(): Promise<Project[]> {
  try {
    const response = await fetch(`${this.baseUrl}/projects.php`)
    console.log('Status:', response.status)
    console.log('URL:', response.url)
    const data = await response.json()
    console.log('Data:', data)
    return data
  } catch (error) {
    console.error('Failed to fetch projects:', error)
    return []
  }
}

  static async addProject(project: NewProject): Promise<boolean> {
    try {
      const response = await fetch(`${this.baseUrl}/projects.php`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(project)
      })
      return response.ok
    } catch (error) {
      console.error('Failed to add project:', error)
      return false
    }
  }

  static async deleteProject(id: number): Promise<boolean> {
    try {
      const response = await fetch(`${this.baseUrl}/projects.php?id=${id}`, {
        method: 'DELETE'
      })
      return response.ok
    } catch (error) {
      console.error('Failed to delete project:', error)
      return false
    }
  }

  
  // ─── GITHUB ────────────────────────────────────────────────

  static async getGithubRepos(): Promise<GithubRepo[]> {
    try {
      const response = await fetch(
        `https://api.github.com/users/${this.githubUsername}/repos?sort=updated&per_page=6`
      )
      const data = await response.json()
      return data
    } catch (error) {
      console.error('Failed to fetch GitHub repos:', error)
      return []
    }
  }

  static async getGithubProfile(): Promise<GithubProfile | null> {
    try {
      const response = await fetch(
        `https://api.github.com/users/${this.githubUsername}`
      )
      const data = await response.json()
      return data
    } catch (error) {
      console.error('Failed to fetch GitHub profile:', error)
      return null
    }
  }
}

// ─── TYPES ───────────────────────────────────────────────────

export interface Project {
  id: number
  title: string
  description: string
  tags: string[]
  images: string[]
  code: string
  code_language: string
  video_url: string | null
  github_url: string | null
  created_at: string
}

export interface NewProject {
  title: string
  description: string
  tags: string[]
  code: string
}

export interface GithubRepo {
  id: number
  name: string
  description: string
  html_url: string
  language: string
  stargazers_count: number
  updated_at: string
}

export interface GithubProfile {
  login: string
  avatar_url: string
  public_repos: number
  followers: number
  following: number
}