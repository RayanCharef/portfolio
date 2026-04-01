interface NavLink {
  label: string
  href: string
}

interface SocialIcon {
  icon: string
  href?: string
  disabled?: boolean
}

export class Navbar {
  private links: NavLink[]
  private socialIcons: SocialIcon[]
  private adminUrl: string

  constructor() {
    this.adminUrl = 'https://mbo-portal.nl/student/2025-2026/S349635/admin/'
    
    this.links = [
      { label: 'About me', href: '#about' },
      { label: 'Projects', href: '#projects' },
      { label: 'Contact', href: '#contact' }
    ]

    this.socialIcons = [
      { icon: 'fa-brands fa-linkedin', disabled: true },
      { icon: 'fa-brands fa-github', disabled: true }
    ]
  }

  private createLogo(): HTMLElement {
    const wrapper = document.createElement('div')
    wrapper.className = 'flex items-center gap-4'

    const logo = document.createElement('div')
    logo.className = `
      w-8 h-8 bg-white rounded flex items-center justify-center 
      text-black font-bold text-sm cursor-pointer
      hover:bg-gray-200 transition-colors duration-200
    `
    logo.textContent = 'RC'

    wrapper.appendChild(logo)
    return wrapper
  }

  private createNavLink(link: NavLink): HTMLElement {
    const a = document.createElement('a')
    a.href = link.href
    a.textContent = link.label
    a.className = `
      text-gray-400 text-base tracking-wider uppercase
      hover:text-white transition-colors duration-200
      relative after:absolute after:bottom-[-4px] after:left-0 
      after:w-0 after:h-[1px] after:bg-white
      after:transition-all after:duration-200
      hover:after:w-full
    `
    return a
  }

  private createSocialIcon(social: SocialIcon): HTMLElement {
    const i = document.createElement('i')
    i.className = `
      ${social.icon} text-gray-600 text-lg
      ${social.disabled ? 'cursor-not-allowed opacity-50' : 'cursor-pointer hover:text-white transition-colors duration-200'}
    `
    return i
  }

  private createLoginIcon(): HTMLElement {
    const a = document.createElement('a')
    a.href = this.adminUrl
    a.target = '_blank'

    const i = document.createElement('i')
    i.className = `
      fa-solid fa-right-to-bracket text-gray-400 text-lg
      cursor-pointer hover:text-white transition-colors duration-200
    `

    a.appendChild(i)
    return a
  }

  private createLeft(): HTMLElement {
    const left = document.createElement('div')
    left.className = 'flex items-center gap-8'

    left.appendChild(this.createLogo())
    this.links.forEach(link => left.appendChild(this.createNavLink(link)))

    return left
  }

  private createRight(): HTMLElement {
    const right = document.createElement('div')
    right.className = 'flex items-center gap-5'

    this.socialIcons.forEach(icon => right.appendChild(this.createSocialIcon(icon)))
    right.appendChild(this.createLoginIcon())

    return right
  }

  render(): HTMLElement {
    const nav = document.createElement('nav')
    nav.className = `
      fixed top-0 left-0 w-full h-16 
      bg-[#0a0a0a] border-b border-[#1a1a1a]
      flex items-center justify-between px-8
      z-50 backdrop-blur-sm
    `

    nav.appendChild(this.createLeft())
    nav.appendChild(this.createRight())

    return nav
  }
}