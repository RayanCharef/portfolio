interface Project {
  id: number
  title: string
  description: string
  tags: string[]
  images: string[]
  video_url: string | null
  github_url: string | null
  code_language: string
}

export class Projects {
  private projects: Project[] = []

  // ─── HERO ─────────────────────────────────────────────────

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
    sub.textContent = 'A collection of things I\'ve made'

    section.appendChild(label)
    section.appendChild(h1)
    section.appendChild(sub)

    return section
  }

  // ─── LOADING STATE ────────────────────────────────────────

  private createLoadingGrid(): HTMLElement {
    const grid = document.createElement('div')
    grid.className = 'grid grid-cols-3 gap-6 w-full max-w-6xl'

    for (let i = 0; i < 6; i++) {
      const skeleton = document.createElement('div')
      skeleton.className = `
        bg-[#111] border border-[#1f1f1f] rounded-lg overflow-hidden
        animate-pulse
      `

      const imgSkeleton = document.createElement('div')
      imgSkeleton.className = 'w-full h-48 bg-[#1a1a1a]'

      const body = document.createElement('div')
      body.className = 'p-5 flex flex-col gap-3'

      const titleSkeleton = document.createElement('div')
      titleSkeleton.className = 'h-4 bg-[#1a1a1a] rounded w-2/3'

      const descSkeleton1 = document.createElement('div')
      descSkeleton1.className = 'h-3 bg-[#1a1a1a] rounded w-full'

      const descSkeleton2 = document.createElement('div')
      descSkeleton2.className = 'h-3 bg-[#1a1a1a] rounded w-4/5'

      body.appendChild(titleSkeleton)
      body.appendChild(descSkeleton1)
      body.appendChild(descSkeleton2)
      skeleton.appendChild(imgSkeleton)
      skeleton.appendChild(body)
      grid.appendChild(skeleton)
    }

    return grid
  }

  // ─── PROJECT CARD ─────────────────────────────────────────

  private createProjectCard(project: Project): HTMLElement {
    const card = document.createElement('div')
    card.className = `
      bg-[#111] border border-[#1f1f1f] rounded-lg overflow-hidden
      flex flex-col
      hover:border-[#333] transition-all duration-300
      opacity-0 translate-y-4
    `
    card.style.transition = 'opacity 0.5s ease, transform 0.5s ease, border-color 0.3s ease'

    // Trigger fade-in on next frame
    requestAnimationFrame(() => {
      card.style.opacity = '1'
      card.style.transform = 'translateY(0)'
    })

    // ── Image
    if (project.images.length > 0) {
      const img = document.createElement('img')
      img.src = `../uploads/${project.images[0]}`
      img.alt = project.title
      img.className = 'w-full h-48 object-cover'
      card.appendChild(img)
    } else {
      const placeholder = document.createElement('div')
      placeholder.className = `
        w-full h-48 bg-[#0f0f0f] flex items-center justify-center
        border-b border-[#1f1f1f]
      `
      const icon = document.createElement('i')
      icon.className = 'fa-solid fa-code text-2xl text-gray-700'
      placeholder.appendChild(icon)
      card.appendChild(placeholder)
    }

    // ── Body
    const body = document.createElement('div')
    body.className = 'p-5 flex flex-col gap-3 flex-1'

    // Title
    const title = document.createElement('h3')
    title.className = 'text-white font-bold text-lg tracking-tight'
    title.textContent = project.title

    // Description
    const desc = document.createElement('p')
    desc.className = 'text-gray-500 text-sm leading-relaxed flex-1'
    desc.textContent = project.description

    // Tags
    const tagsRow = document.createElement('div')
    tagsRow.className = 'flex flex-wrap gap-2'
    project.tags.forEach(tag => {
      const t = document.createElement('span')
      t.className = 'text-xs text-gray-400 border border-[#333] px-2 py-0.5 rounded'
      t.textContent = tag
      tagsRow.appendChild(t)
    })

    // Links
    const links = document.createElement('div')
    links.className = 'flex items-center gap-3 pt-2 border-t border-[#1f1f1f] mt-auto'

    if (project.github_url) {
      const gh = document.createElement('a')
      gh.href = project.github_url
      gh.target = '_blank'
      gh.className = `
        flex items-center gap-2 text-xs text-gray-400 tracking-widest uppercase
        hover:text-white transition-colors duration-200
      `
      const icon = document.createElement('i')
      icon.className = 'fa-brands fa-github'
      gh.appendChild(icon)
      gh.appendChild(document.createTextNode('GitHub'))
      links.appendChild(gh)
    }

    if (project.video_url) {
      const vid = document.createElement('a')
      vid.href = project.video_url
      vid.target = '_blank'
      vid.className = `
        flex items-center gap-2 text-xs text-gray-400 tracking-widest uppercase
        hover:text-white transition-colors duration-200
      `
      const icon = document.createElement('i')
      icon.className = 'fa-solid fa-play'
      vid.appendChild(icon)
      vid.appendChild(document.createTextNode('Video'))
      links.appendChild(vid)
    }

    body.appendChild(title)
    body.appendChild(desc)
    if (project.tags.length) body.appendChild(tagsRow)
    if (project.github_url || project.video_url) body.appendChild(links)

    card.appendChild(body)
    return card
  }

  // ─── EMPTY STATE ──────────────────────────────────────────

  private createEmptyState(): HTMLElement {
    const div = document.createElement('div')
    div.className = 'flex flex-col items-center gap-4 py-24 text-center'

    const icon = document.createElement('i')
    icon.className = 'fa-solid fa-folder-open text-4xl text-gray-700'

    const p = document.createElement('p')
    p.className = 'text-gray-600 text-sm tracking-widest uppercase'
    p.textContent = 'No projects yet'

    div.appendChild(icon)
    div.appendChild(p)
    return div
  }

  // ─── GRID SECTION ─────────────────────────────────────────

  private async createGridSection(): Promise<HTMLElement> {
    const section = document.createElement('section')
    section.className = `
      bg-[#111111] flex flex-col items-center
      px-8 py-24 min-h-screen
    `

    const loading = this.createLoadingGrid()
    section.appendChild(loading)

    try {
      const res = await fetch('../api/projects.php')
      this.projects = await res.json()

      section.removeChild(loading)

      if (!this.projects.length) {
        section.appendChild(this.createEmptyState())
        return section
      }

      const grid = document.createElement('div')
      grid.className = 'grid grid-cols-3 gap-6 w-full max-w-6xl'

      this.projects.forEach((project, i) => {
        const card = this.createProjectCard(project)
        card.style.transitionDelay = `${i * 0.07}s`
        grid.appendChild(card)
      })

      section.appendChild(grid)

    } catch {
      section.removeChild(loading)

      const error = document.createElement('p')
      error.className = 'text-gray-600 text-sm tracking-widest uppercase'
      error.textContent = 'Failed to load projects'
      section.appendChild(error)
    }

    return section
  }

  // ─── RENDER ───────────────────────────────────────────────

  async render(): Promise<HTMLElement> {
    const main = document.createElement('main')
    main.appendChild(this.createHeroSection())
    main.appendChild(await this.createGridSection())
    return main
  }
}