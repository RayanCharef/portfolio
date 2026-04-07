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

interface JourneyEntry {
  period: string
  title: string
  company: string
  type: 'education' | 'internship'
  description: string
  tags?: string[]
  status?: string
}

export class Home {
  private currentlyItems: InfoItem[]
  private interestItems: InfoItem[]
  private skills: Skill[]
  private journeyEntries: JourneyEntry[]

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
      { name: 'PHP',         level: 55, color: '#777bb4' },
      { name: 'SQL',         level: 80, color: '#00758f' },
      { name: 'Python',      level: 55, color: '#3572A5' },
      { name: 'Java',        level: 50, color: '#b07219' },
      { name: 'C#',          level: 45, color: '#178600' },
    ]

    this.journeyEntries = [
      {
        period: '2022 — June 2026',
        title: 'MBO 4 Software Development',
        company: 'Firda',
        type: 'education',
        description: 'Studying software development with a focus on full-stack web development. Building real projects using TypeScript, PHP, MySQL and more.',
        tags: ['JavaScript', 'Java', 'MySQL', 'HTML', 'CSS', 'Documentation,', 'C#'],
        status: 'Expected graduation June 2026'
      },
      {
        period: '2024 / 2025',
        title: 'Junior Developer Intern',
        company: 'Leerbedrijf Bronnen',
        type: 'internship',
        description: 'Built web based applications using TypeScript. Worked in a professional development environment and learned how to think and work like a real developer.',
        tags: ['TypeScript', 'Web Development']
      },
      {
        period: '2025 / 2026',
        title: 'Exam Internship — Junior Developer',
        company: 'Leerbedrijf Bronnen',
        type: 'internship',
        description: 'Exam internship where I wrote full technical documentation for an application, built it according to the documentation, verified it worked as specified and presented the entire project. This internship marked the moment I became a developer.',
        tags: ['TypeScript', 'Documentation', 'Web Development']
      }
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
    window.location.href = '/projects'
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
    primary.textContent = `I'm a developer who loves solving problems. Not just the obvious ones  the small annoyances that most people just accept. I've been coding for 4 years, mostly through school but just as much in my free time, because for me it never really feels like work.`

    const secondary = document.createElement('p')
    secondary.className = 'text-gray-500 text-base leading-relaxed'
    secondary.textContent = `What drives me is the bugs. Most developers dread them  I actually enjoy them. If something works perfectly on the first try it almost feels less satisfying. I'm currently finishing my MBO 4 in Software Development and planning to continue into HBO, because I'm not done learning  not even close.`

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

    private createSkillTag(skill: Skill, index: number): HTMLElement {
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
    barFill.className = 'h-full rounded-full'
    barFill.style.width = '0%'
    barFill.style.backgroundColor = skill.color
    barFill.style.transition = `width 1.6s ease ${index * 0.1}s`
    barBg.appendChild(barFill)
    wrapper.appendChild(tag)
    wrapper.appendChild(barBg)

    wrapper.dataset.level = String(skill.level)
    wrapper.dataset.fill = 'false'

    return wrapper
    }

    private createSkillsSection(): HTMLElement {
    const div = document.createElement('div')
    div.className = 'w-full'
    div.id = 'skillsSection'

    const label = document.createElement('p')
    label.className = 'text-xs text-gray-600 tracking-widest uppercase mb-6'
    label.textContent = 'Languages'

    const grid = document.createElement('div')
    grid.className = 'grid grid-cols-2 gap-6'

    this.skills.forEach((skill, index) => grid.appendChild(this.createSkillTag(skill, index)))

    div.appendChild(label)
    div.appendChild(grid)

    // Trigger fill when section scrolls into view
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
        if (entry.isIntersecting) {
            div.querySelectorAll<HTMLElement>('[data-fill="false"]').forEach(wrapper => {
            const fill = wrapper.querySelector<HTMLElement>('.h-full')
            if (fill) fill.style.width = `${wrapper.dataset.level}%`
            wrapper.dataset.fill = 'true'
            })
            observer.disconnect()
        }
        })
    }, { threshold: 0.3 })

    setTimeout(() => observer.observe(div), 100)

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

  // ─── JOURNEY ──────────────────────────────────────────────

  private createJourneyLabel(): HTMLElement {
    const p = document.createElement('p')
    p.className = 'text-gray-400 text-xs tracking-[0.4em] uppercase mb-4'
    p.textContent = 'My path'
    return p
  }

  private createJourneyTitle(): HTMLElement {
    const h2 = document.createElement('h2')
    h2.className = 'text-5xl font-black text-white tracking-tight mb-16 relative'
    h2.textContent = 'Journey'

    const underline = document.createElement('span')
    underline.className = 'absolute -bottom-3 left-0 w-full h-[2px] bg-white opacity-10'
    h2.appendChild(underline)
    return h2
  }

  private createJourneyEntry(entry: JourneyEntry, index: number): HTMLElement {
    const wrapper = document.createElement('div')
    wrapper.className = 'journey-entry relative pl-12 pb-12 opacity-0'
    wrapper.style.transform = 'translateX(-20px)'
    wrapper.style.transition = `opacity 0.6s ease ${index * 0.15}s, transform 0.6s ease ${index * 0.15}s`
    wrapper.dataset.index = String(index)

    // Dot on the line
    const dot = document.createElement('div')
    dot.className = `
      absolute left-0 top-1 w-4 h-4 rounded-full border-2 border-white
      ${entry.type === 'education' ? 'bg-white' : 'bg-[#0a0a0a]'}
      z-10
    `

    // Period
    const period = document.createElement('span')
    period.className = 'text-xs text-gray-600 tracking-widest uppercase'
    period.textContent = entry.period

    // Title
    const title = document.createElement('h3')
    title.className = 'text-xl font-bold text-white mt-1 mb-1'
    title.textContent = entry.title

    // Company + type badge
    const companyRow = document.createElement('div')
    companyRow.className = 'flex items-center gap-3 mb-3'

    const company = document.createElement('span')
    company.className = 'text-gray-400 text-sm'
    company.textContent = entry.company

    const badge = document.createElement('span')
    badge.className = `
      text-xs px-2 py-0.5 rounded border
      ${entry.type === 'education'
        ? 'border-white/20 text-white/50'
        : 'border-gray-700 text-gray-600'}
    `
    badge.textContent = entry.type === 'education' ? 'Education' : 'Internship'

    companyRow.appendChild(company)
    companyRow.appendChild(badge)

    // Description
    const desc = document.createElement('p')
    desc.className = 'text-gray-500 text-sm leading-relaxed mb-3 max-w-lg'
    desc.textContent = entry.description

    wrapper.appendChild(dot)
    wrapper.appendChild(period)
    wrapper.appendChild(title)
    wrapper.appendChild(companyRow)
    wrapper.appendChild(desc)

    // Status badge if present
    if (entry.status) {
      const status = document.createElement('span')
      status.className = 'inline-block text-xs text-white/40 border border-white/10 px-2 py-0.5 rounded mb-3'
      status.textContent = entry.status
      wrapper.appendChild(status)
    }

    // Tags
    if (entry.tags && entry.tags.length) {
      const tagsRow = document.createElement('div')
      tagsRow.className = 'flex flex-wrap gap-2'
      entry.tags.forEach(tag => {
        const t = document.createElement('span')
        t.className = 'text-xs text-gray-400 border border-[#333] px-2 py-0.5 rounded'
        t.textContent = tag
        tagsRow.appendChild(t)
      })
      wrapper.appendChild(tagsRow)
    }

    return wrapper
  }

  private initJourneyAnimation(): void {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          this.animateJourney()
          observer.disconnect()
        }
      })
    }, { threshold: 0.1 })

    setTimeout(() => {
      const section = document.getElementById('journey')
      if (section) observer.observe(section)
    }, 100)
  }

private animateJourney(): void {
  const line = document.getElementById('journeyLine')
  const timeline = document.getElementById('journeyTimeline')
  const entries = document.querySelectorAll('.journey-entry')

  if (!line || !timeline) return

  const totalHeight = (timeline as HTMLElement).offsetHeight
  const duration = 1500 // 1.5 seconds total
  let startTime: number | null = null

  const animate = (timestamp: number) => {
    if (!startTime) startTime = timestamp
    const elapsed = timestamp - startTime
    const progress = Math.min(elapsed / duration, 1)

    // Ease in out for smooth feel
    const eased = progress < 0.5
      ? 2 * progress * progress
      : 1 - Math.pow(-2 * progress + 2, 2) / 2

    const currentHeight = totalHeight * eased
    line.style.height = `${currentHeight}px`

    entries.forEach((entry) => {
      const entryTop = (entry as HTMLElement).offsetTop
      if (currentHeight >= entryTop) {
        ;(entry as HTMLElement).style.opacity = '1'
        ;(entry as HTMLElement).style.transform = 'translateX(0)'
      }
    })

    if (progress < 1) {
      requestAnimationFrame(animate)
    }
  }

  requestAnimationFrame(animate)
}

  private createJourneySection(): HTMLElement {
    const section = document.createElement('section')
    section.id = 'journey'
    section.className = `
      min-h-screen bg-[#0a0a0a] flex flex-col items-center
      justify-center px-8 py-24 relative
    `

    section.appendChild(this.createJourneyLabel())
    section.appendChild(this.createJourneyTitle())

    const timeline = document.createElement('div')
    timeline.className = 'relative max-w-2xl w-full'
    timeline.id = 'journeyTimeline'

    const line = document.createElement('div')
    line.id = 'journeyLine'
    line.className = 'absolute left-[7px] top-0 w-[2px] bg-white'
    line.style.height = '0px'

    timeline.appendChild(line)

    this.journeyEntries.forEach((entry, i) => {
      timeline.appendChild(this.createJourneyEntry(entry, i))
    })

    section.appendChild(timeline)

    this.initJourneyAnimation()

    return section
  }

  // ─── CONTACT ──────────────────────────────────────────────

private createContactSection(): HTMLElement {
  const section = document.createElement('section')
  section.id = 'contact'
  section.className = `
    bg-[#111111] flex flex-col items-center
    justify-center px-8 py-24 relative
  `

  const label = document.createElement('p')
  label.className = 'text-gray-400 text-xs tracking-[0.4em] uppercase mb-4'
  label.textContent = 'Get in touch'

  const title = document.createElement('h2')
  title.className = 'text-5xl font-black text-white tracking-tight mb-4 relative'
  title.textContent = 'Contact'

  const underline = document.createElement('span')
  underline.className = 'absolute -bottom-3 left-0 w-full h-[2px] bg-white opacity-10'
  title.appendChild(underline)

  const subtitle = document.createElement('p')
  subtitle.className = 'text-gray-500 text-base mb-12 mt-6'
  subtitle.textContent = 'Want to work together or just say hi? Feel free to reach out. Rayan300505@gmail.com'


  const links = document.createElement('div')
  links.className = 'flex items-center gap-6'

  // Email
  const emailLink = document.createElement('a')
  emailLink.href = 'mailto:rayan300505@gmail.com'
  emailLink.className = `
    flex items-center gap-3 px-6 py-3
    border border-[#222] rounded
    text-gray-400 text-sm tracking-wider uppercase
    hover:border-white hover:text-white
    transition-all duration-300
  `
  const emailIcon = document.createElement('i')
  emailIcon.className = 'fa-solid fa-envelope text-base'
  const emailText = document.createElement('span')
  emailText.textContent = 'Email me'
  emailLink.appendChild(emailIcon)
  emailLink.appendChild(emailText)

  // LinkedIn
  const linkedinLink = document.createElement('a')
  linkedinLink.href = 'https://www.linkedin.com/in/rayan-ck-9b1b4a309/'
  linkedinLink.target = '_blank'
  linkedinLink.className = `
    flex items-center gap-3 px-6 py-3
    border border-[#222] rounded
    text-gray-400 text-sm tracking-wider uppercase
    hover:border-white hover:text-white
    transition-all duration-300
  `
  const linkedinIcon = document.createElement('i')
  linkedinIcon.className = 'fa-brands fa-linkedin text-base'
  const linkedinText = document.createElement('span')
  linkedinText.textContent = 'LinkedIn'
  linkedinLink.appendChild(linkedinIcon)
  linkedinLink.appendChild(linkedinText)

  // GitHub
  const githubLink = document.createElement('a')
  githubLink.href = 'https://github.com/RayanCharef'
  githubLink.target = '_blank'
  githubLink.className = `
    flex items-center gap-3 px-6 py-3
    border border-[#222] rounded
    text-gray-400 text-sm tracking-wider uppercase
    hover:border-white hover:text-white
    transition-all duration-300
  `
  const githubIcon = document.createElement('i')
  githubIcon.className = 'fa-brands fa-github text-base'
  const githubText = document.createElement('span')
  githubText.textContent = 'GitHub'
  githubLink.appendChild(githubIcon)
  githubLink.appendChild(githubText)

  links.appendChild(emailLink)
  links.appendChild(linkedinLink)
  links.appendChild(githubLink)

  section.appendChild(label)
  section.appendChild(title)
  section.appendChild(subtitle)
  section.appendChild(links)

  return section
}

  // ─── RENDER ───────────────────────────────────────────────

render(): HTMLElement {
  const main = document.createElement('main')
  main.appendChild(this.createHeroSection())
  main.appendChild(this.createAboutSection())
  main.appendChild(this.createJourneySection())
  main.appendChild(this.createContactSection())
  return main
}
}