export const IMAGE_BASE = import.meta.env.DEV
  ? 'https://mbo-portal.nl/student/2025-2026/S349635/uploads'
  : '/student/2025-2026/S349635/uploads'

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

export class ApiService {
  private static baseUrl: string = import.meta.env.DEV
    ? 'https://mbo-portal.nl/student/2025-2026/S349635/api'
    : '/student/2025-2026/S349635/api'

  // ─── PROJECTS ─────────────────────────────────────────────

  static async getProjects(): Promise<Project[]> {
    try {
      const response = await fetch(`${this.baseUrl}/projects.php`)
      //console.log('Status:', response.status)
      //console.log('URL:', response.url)
      const data = await response.json()
      //console.log('Data:', data)
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
}