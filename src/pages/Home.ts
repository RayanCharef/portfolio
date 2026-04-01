interface InfoItem {
  icon: string
  text: string
}

interface InfoCard {
  label: string
  items: InfoItem[]
}

interface Skill {
  name: string
  level: number
  color: string
}

export class Home {
  private currentlyItems: InfoItem[]
  private interestItems: InfoItem[]
  private skills: Skill[]

  constructor() {
    this.currentlyItems = [
      { icon: 'fa-solid fa-graduation-cap', text: 'Studying at — Firda' },
      { icon: 'fa-solid fa-location-dot', text: 'Based in — Leeuwarden' },
      { icon: 'fa-solid fa-briefcase', text: 'Open to — Internships' }
    ]

    this.interestItems = [
      { icon: 'fa-solid fa-code', text: 'Full-stack Development' },
      { icon: 'fa-solid fa-database', text: 'Databases' },
      { icon: 'fa-solid fa-gears', text: 'DevOps' }
    ]

    this.skills = [
      { name: 'HTML & CSS',  level: 90, color: '#e34c26' },
      { name: 'JavaScript',  level: 80, color: '#f7df1e' },
      { name: 'TypeScript',  level: 90, color: '#3178c6' },
      { name: 'PHP',         level: 60, color: '#777bb4' },
      { name: 'SQL',       level: 80, color: '#00758f' },
      { name: 'Python',      level: 60, color: '#3572A5' },
      { name: 'Java',        level: 50, color: '#b07219' },
      { name: 'C#',          level: 45, color: '#178600' },
    ]
  }

  // ─── HERO ─────────────────────────────────────────────────

  private createHeroGreeting(): HTMLElement {
    const p = document.createElement('p')
    p.className = 'text-gray-400 text-2xl tracking-widest uppercase mb-2'
    p.textContent = "Hi, I'm"
    return p
  }

  private createHeroName(): HTMLElement {
    const h1 = document.createElement('h1')
    h1.className = `
      text-9xl font-black text-white tracking-tight 
      cursor-pointer relative group select-none
    `
    h1.textContent = 'Rayan'

    const outline = document.createElement('span')
    outline.className = `
      absolute inset-0 flex items-center justify-center
      text-9xl font-black tracking-tight
      text-transparent opacity-0
      group-hover:opacity-100 transition-opacity duration-300
      pointer-events-none
    `
    outline.style.webkitTextStroke = '2px white'
    outline.textContent = 'Rayan'

    h1.appendChild(outline)
    return h1
  }

  private createHeroSubtitle(): HTMLElement {
    const p = document.createElement('p')
    p.className = 'text-xl text-gray-400 mt-6 tracking-widest uppercase'

    const cursor = document.createElement('span')
    cursor.className = 'animate-pulse'
    cursor.textContent = ' |'

    p.textContent = 'Developer'
    p.appendChild(cursor)
    return p
  }

  private createHeroButton(): HTMLElement {
    const button = document.createElement('button')
    button.className = `
      mt-10 px-8 py-3 border border-white text-white text-sm 
      tracking-widest uppercase hover:bg-white hover:text-black 
      transition-all duration-300 cursor-pointer
    `
    button.textContent = 'View my work'
    button.addEventListener('click', () => {
      document.getElementById('projects')?.scrollIntoView({ behavior: 'smooth' })
    })
    return button
  }

  private createScrollIndicator(): HTMLElement {
    const div = document.createElement('div')
    div.className = 'absolute bottom-8 flex flex-col items-center gap-2 text-gray-600'

    const label = document.createElement('span')
    label.className = 'text-xs tracking-widest uppercase'
    label.textContent = 'Scroll'

    const icon = document.createElement('i')
    icon.className = 'fa-solid fa-chevron-down animate-bounce text-xs'

    div.appendChild(label)
    div.appendChild(icon)
    return div
  }

  private createHeroSection(): HTMLElement {
    const section = document.createElement('section')
    section.className = `
      min-h-screen flex flex-col items-center justify-center 
      bg-[#0a0a0a] relative
    `

    section.appendChild(this.createHeroGreeting())
    section.appendChild(this.createHeroName())
    section.appendChild(this.createHeroSubtitle())
    section.appendChild(this.createHeroButton())
    section.appendChild(this.createScrollIndicator())

    return section
  }

  // ─── ABOUT ────────────────────────────────────────────────

  private createAboutLabel(): HTMLElement {
    const p = document.createElement('p')
    p.className = 'text-gray-400 text-xs tracking-[0.4em] uppercase mb-4'
    p.textContent = 'Who I am'
    return p
  }

  private createAboutTitle(): HTMLElement {
    const h2 = document.createElement('h2')
    h2.className = 'text-5xl font-black text-white tracking-tight mb-16 relative'
    h2.textContent = 'About Me'

    const underline = document.createElement('span')
    underline.className = 'absolute -bottom-3 left-0 w-full h-[2px] bg-white opacity-10'

    h2.appendChild(underline)
    return h2
  }

  private createPhotoPlaceholder(): HTMLElement {
    const wrapper = document.createElement('div')
    wrapper.className = `
      w-40 h-40 rounded-full border-2 border-[#333] bg-[#1a1a1a]
      flex items-center justify-center relative group cursor-pointer
    `

    const icon = document.createElement('i')
    icon.className = `
      fa-solid fa-user text-4xl text-gray-600
      group-hover:text-gray-400 transition-colors duration-300
    `

    const hoverRing = document.createElement('div')
    hoverRing.className = `
      absolute inset-0 rounded-full border-2 border-white opacity-0
      group-hover:opacity-10 transition-opacity duration-300
    `

    const label = document.createElement('span')
    label.className = 'absolute -bottom-6 text-xs text-gray-600 tracking-widest uppercase'
    label.textContent = 'Photo coming soon'

    wrapper.appendChild(icon)
    wrapper.appendChild(hoverRing)
    wrapper.appendChild(label)
    return wrapper
  }

    private createBio(): HTMLElement {
    const div = document.createElement('div')
    div.className = 'text-center max-w-2xl'

    const primary = document.createElement('p')
    primary.className = 'text-gray-300 text-lg leading-relaxed mb-6'
    primary.textContent = `I'm a developer who loves solving problems. 
        Not just the obvious ones  the small annoyances that most people just accept. 
        I've been coding for 4 years, mostly through school but just as much in my free time, 
        because for me it never really feels like work.`

    const secondary = document.createElement('p')
    secondary.className = 'text-gray-500 text-base leading-relaxed'
    secondary.textContent = `What drives me is the bugs. Most developers dread them 
        I actually enjoy them. If something works perfectly on the first try it almost feels 
        less satisfying. I'm currently finishing my MBO 4 in Software Development and planning 
        to continue into HBO, because I'm not done learning  not even close.`

    div.appendChild(primary)
    div.appendChild(secondary)
    return div
    }


  private createInfoItem(item: InfoItem): HTMLElement {
    const li = document.createElement('li')
    li.className = 'flex items-center gap-3 text-gray-400 text-sm'

    const icon = document.createElement('i')
    icon.className = `${item.icon} text-gray-600 w-4`

    const span = document.createElement('span')
    span.textContent = item.text

    li.appendChild(icon)
    li.appendChild(span)
    return li
  }

  private createInfoCard(card: InfoCard): HTMLElement {
    const div = document.createElement('div')
    div.className = `
      bg-[#0f0f0f] border border-[#1f1f1f] rounded-lg p-6
      hover:border-[#333] transition-colors duration-300
    `

    const label = document.createElement('p')
    label.className = 'text-xs text-gray-600 tracking-widest uppercase mb-4'
    label.textContent = card.label

    const ul = document.createElement('ul')
    ul.className = 'space-y-3'
    card.items.forEach(item => ul.appendChild(this.createInfoItem(item)))

    div.appendChild(label)
    div.appendChild(ul)
    return div
  }

  // ─── SKILLS ───────────────────────────────────────────────

  private createSkillTag(skill: Skill): HTMLElement {
    const wrapper = document.createElement('div')
    wrapper.className = 'flex flex-col gap-2'

    const tag = document.createElement('div')
    tag.className = 'flex items-center justify-between'

    const name = document.createElement('span')
    name.className = 'text-sm font-medium'
    name.style.color = skill.color
    name.textContent = skill.name

    const percent = document.createElement('span')
    percent.className = 'text-xs text-gray-600'
    percent.textContent = `${skill.level}%`

    tag.appendChild(name)
    tag.appendChild(percent)

    const barBg = document.createElement('div')
    barBg.className = 'w-full h-[3px] bg-[#1f1f1f] rounded-full overflow-hidden'

    const barFill = document.createElement('div')
    barFill.className = 'h-full rounded-full transition-all duration-1000'
    barFill.style.width = '0%'
    barFill.style.backgroundColor = skill.color

    setTimeout(() => {
      barFill.style.width = `${skill.level}%`
    }, 300)

    barBg.appendChild(barFill)
    wrapper.appendChild(tag)
    wrapper.appendChild(barBg)

    return wrapper
  }

  private createSkillsSection(): HTMLElement {
    const div = document.createElement('div')
    div.className = 'w-full'

    const label = document.createElement('p')
    label.className = 'text-xs text-gray-600 tracking-widest uppercase mb-6'
    label.textContent = 'Languages'

    const grid = document.createElement('div')
    grid.className = 'grid grid-cols-2 gap-6'

    this.skills.forEach(skill => grid.appendChild(this.createSkillTag(skill)))

    div.appendChild(label)
    div.appendChild(grid)
    return div
  }

  // ─── ABOUT SECTION ────────────────────────────────────────

  private createAboutSection(): HTMLElement {
    const section = document.createElement('section')
    section.id = 'about'
    section.className = `
      min-h-screen bg-[#111111] flex flex-col items-center 
      justify-center px-8 py-24 relative
    `

    const content = document.createElement('div')
    content.className = 'max-w-3xl w-full flex flex-col items-center gap-12'

    const divider = document.createElement('div')
    divider.className = 'w-full border-t border-[#1f1f1f]'

    const grid = document.createElement('div')
    grid.className = 'w-full grid grid-cols-2 gap-8'

    grid.appendChild(this.createInfoCard({
      label: 'Currently',
      items: this.currentlyItems
    }))

    grid.appendChild(this.createInfoCard({
      label: 'Interests',
      items: this.interestItems
    }))

    content.appendChild(this.createPhotoPlaceholder())
    content.appendChild(this.createBio())
    content.appendChild(divider)
    content.appendChild(grid)
    content.appendChild(this.createSkillsSection())

    section.appendChild(this.createAboutLabel())
    section.appendChild(this.createAboutTitle())
    section.appendChild(content)

    return section
  }

  // ─── RENDER ───────────────────────────────────────────────

  render(): HTMLElement {
    const main = document.createElement('main')
    main.appendChild(this.createHeroSection())
    main.appendChild(this.createAboutSection())
    return main
  }
}