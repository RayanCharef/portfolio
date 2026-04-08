import { ApiService, type Project } from '../services/api'
import { ProjectCard } from '../components/ProjectCard'

export class Projects {

  // ─── HERO ───────────────────────────────────────────────────

  private createHeroSection(): HTMLElement {
    const section = document.createElement('section')
    section.className = `
      min-h-[40vh] flex flex-col items-center justify-center
      bg-[#0a0a0a] relative
    `

    const label = document.createElement('p')
    label.className = 'text-gray-400 text-xs tracking-[0.4em] uppercase mb-4'
    label.textContent = `What I've built`

    const h1 = document.createElement('h1')
    h1.className = 'text-9xl font-black text-white tracking-tight'
    h1.textContent = 'Projects'

    const sub = document.createElement('p')
    sub.className = 'text-xl text-gray-400 mt-6 tracking-widest uppercase'
    sub.textContent = `A collection of things I've made`

    section.appendChild(label)
    section.appendChild(h1)
    section.appendChild(sub)

    return section
  }

  // ─── SKELETON ───────────────────────────────────────────────

  private createLoadingGrid(): HTMLElement {
    const grid = document.createElement('div')
    grid.className = 'grid grid-cols-3 gap-6 w-full max-w-6xl'

    for (let i = 0; i < 6; i++) {
      const skeleton = document.createElement('div')
      skeleton.className = 'bg-[#111] border border-[#1f1f1f] rounded-lg overflow-hidden animate-pulse'

      const imgSkeleton = document.createElement('div')
      imgSkeleton.className = 'w-full h-48 bg-[#1a1a1a]'

      const body = document.createElement('div')
      body.className = 'p-5 flex flex-col gap-3'

      ;['h-4 w-2/3', 'h-3 w-full', 'h-3 w-4/5'].forEach(cls => {
        const line = document.createElement('div')
        line.className = `bg-[#1a1a1a] rounded ${cls}`
        body.appendChild(line)
      })

      skeleton.appendChild(imgSkeleton)
      skeleton.appendChild(body)
      grid.appendChild(skeleton)
    }

    return grid
  }

  // ─── EMPTY STATE ────────────────────────────────────────────

  private createEmptyState(): HTMLElement {
    const div = document.createElement('div')
    div.className = 'flex flex-col items-center gap-4 py-24'

    const icon = document.createElement('i')
    icon.className = 'fa-solid fa-folder-open text-4xl text-gray-700'

    const p = document.createElement('p')
    p.className = 'text-gray-600 text-sm tracking-widest uppercase'
    p.textContent = 'No projects yet'

    div.appendChild(icon)
    div.appendChild(p)
    return div
  }

  // ─── GRID ───────────────────────────────────────────────────

  private async createGridSection(): Promise<HTMLElement> {
    const section = document.createElement('section')
    section.className = `
      bg-[#111111] flex flex-col items-center
      px-8 py-24 min-h-screen
    `

    const loading = this.createLoadingGrid()
    section.appendChild(loading)

    const projects: Project[] = await ApiService.getProjects()

    section.removeChild(loading)

    if (!projects.length) {
      section.appendChild(this.createEmptyState())
      return section
    }

    const grid = document.createElement('div')
    grid.className = 'grid grid-cols-3 gap-6 w-full max-w-6xl'

    projects.forEach((project, i) => {
    const card = new ProjectCard(project).render()
    card.style.transitionDelay = `${i * 0.07}s`
    grid.appendChild(card)

    // Trigger fade-in after appended
    requestAnimationFrame(() => {
        requestAnimationFrame(() => {
        card.style.opacity = '1'
        card.style.transform = 'translateY(0)'
        })
    })
    })

    section.appendChild(grid)
    return section
  }

  // ─── RENDER ─────────────────────────────────────────────────

  async render(): Promise<HTMLElement> {
    const main = document.createElement('main')
    main.appendChild(this.createHeroSection())
    main.appendChild(await this.createGridSection())
    return main
  }
}