import type { Project } from '../services/api'
import { IMAGE_BASE } from '../services/api'

export class ProjectCard {
  private project: Project

  constructor(project: Project) {
    this.project = project
  }

  // ─── MODAL ──────────────────────────────────────────────────

  private createModal(): HTMLElement {
    const overlay = document.createElement('div')
    overlay.className = `
    fixed inset-0 z-50 flex items-center justify-center p-8
    opacity-0
    `
    overlay.style.backgroundColor = 'rgba(0, 0, 0, 0.85)'
    overlay.style.backdropFilter = 'blur(4px)'
    overlay.style.transition = 'opacity 0.3s ease'

    const modal = document.createElement('div')
    modal.className = `
      bg-[#111] border border-[#222] rounded-lg w-full max-w-3xl
      max-h-[85vh] overflow-y-auto
      translate-y-4
    `
    modal.style.transition = 'transform 0.3s ease'

    overlay.addEventListener('click', (e) => {
      if (e.target === overlay) this.closeModal(overlay)
    })

    // ── Header image
    if (this.project.images.length > 0) {
      const img = document.createElement('img')
      img.src = `${IMAGE_BASE}/${this.project.images[0]}`
      img.alt = this.project.title
      img.className = 'w-full object-contain rounded-t-lg bg-[#0a0a0a]'
      modal.appendChild(img)
    }

    // ── Content
    const content = document.createElement('div')
    content.className = 'p-8 flex flex-col gap-6'

    // Title row + close button
    const titleRow = document.createElement('div')
    titleRow.className = 'flex items-start justify-between gap-4'

    const title = document.createElement('h2')
    title.className = 'text-white font-black text-3xl tracking-tight'
    title.textContent = this.project.title

    const closeBtn = document.createElement('button')
    closeBtn.className = `
      text-gray-600 hover:text-white transition-colors duration-200
      text-xl w-8 h-8 flex items-center justify-center flex-shrink-0
    `
    closeBtn.innerHTML = '<i class="fa-solid fa-xmark"></i>'
    closeBtn.addEventListener('click', () => this.closeModal(overlay))

    titleRow.appendChild(title)
    titleRow.appendChild(closeBtn)

    // Description
    const desc = document.createElement('p')
    desc.className = 'text-gray-400 text-base leading-relaxed'
    desc.textContent = this.project.description

    // Tags
    if (this.project.tags.length) {
      const tagsLabel = document.createElement('p')
      tagsLabel.className = 'text-xs text-gray-600 tracking-widest uppercase w-full mb-1'
      tagsLabel.textContent = 'Stack'

      const tagsRow = document.createElement('div')
      tagsRow.className = 'flex flex-wrap gap-2'

      this.project.tags.forEach(tag => {
        const t = document.createElement('span')
        t.className = 'text-xs text-gray-400 border border-[#333] px-2 py-0.5 rounded'
        t.textContent = tag
        tagsRow.appendChild(t)
      })

      content.appendChild(tagsLabel)
      content.appendChild(tagsRow)
    }
    // Code snippet
    if (this.project.code && this.project.code.trim()) {
    const codeLabel = document.createElement('p')
    codeLabel.className = 'text-xs text-gray-600 tracking-widest uppercase mb-1'
    codeLabel.textContent = 'Code snippet'

    const codeLanguage = document.createElement('span')
    codeLanguage.className = 'text-xs text-gray-600 tracking-widest uppercase'
    codeLanguage.textContent = this.project.code_language ?? 'plaintext'

    const codeLabelRow = document.createElement('div')
    codeLabelRow.className = 'flex items-center justify-between mb-2'
    codeLabelRow.appendChild(codeLabel)
    codeLabelRow.appendChild(codeLanguage)

    const pre = document.createElement('pre')
    pre.className = `
        bg-[#0a0a0a] border border-[#222] rounded p-4
        text-sm text-gray-300 overflow-x-auto
        font-mono leading-relaxed
    `

    const code = document.createElement('code')
    code.textContent = this.project.code

    pre.appendChild(code)

    const codeBlock = document.createElement('div')
    codeBlock.appendChild(codeLabelRow)
    codeBlock.appendChild(pre)

    content.appendChild(codeBlock)
    }

    // Extra images
    if (this.project.images.length > 1) {
      const galleryLabel = document.createElement('p')
      galleryLabel.className = 'text-xs text-gray-600 tracking-widest uppercase mb-1'
      galleryLabel.textContent = 'Screenshots'

      const galleryGrid = document.createElement('div')
      galleryGrid.className = 'grid grid-cols-3 gap-2'

    this.project.images.slice(1).forEach(imgPath => {
    const img = document.createElement('img')
    img.src = `${IMAGE_BASE}/${imgPath}`
    img.className = 'w-full h-32 object-cover rounded border border-[#222] cursor-pointer hover:opacity-80 transition-opacity duration-200'
    img.addEventListener('click', () => {
        const lightbox = document.createElement('div')
        lightbox.style.cssText = 'position:fixed;inset:0;z-index:60;display:flex;align-items:center;justify-content:center;background:rgba(0,0,0,0.95);cursor:zoom-out'
        const full = document.createElement('img')
        full.src = `${IMAGE_BASE}/${imgPath}`
        full.style.cssText = 'max-width:90vw;max-height:90vh;object-fit:contain;border-radius:4px'
        lightbox.appendChild(full)
        lightbox.addEventListener('click', () => lightbox.remove())
        document.body.appendChild(lightbox)
    })
    galleryGrid.appendChild(img)
    })

      const gallery = document.createElement('div')
      gallery.className = 'flex flex-col gap-2'
      gallery.appendChild(galleryLabel)
      gallery.appendChild(galleryGrid)
      content.appendChild(gallery)
    }

    // Links
    if (this.project.github_url || this.project.video_url) {
      const links = document.createElement('div')
      links.className = 'flex items-center gap-4 pt-4 border-t border-[#1f1f1f]'

      if (this.project.github_url) {
        const gh = document.createElement('a')
        gh.href = this.project.github_url
        gh.target = '_blank'
        gh.className = `
          flex items-center gap-2 px-5 py-2.5
          border border-[#333] rounded text-sm text-gray-400
          tracking-widest uppercase
          hover:border-white hover:text-white transition-all duration-200
        `
        gh.innerHTML = '<i class="fa-brands fa-github"></i>'
        gh.appendChild(document.createTextNode(' GitHub'))
        links.appendChild(gh)
      }

      if (this.project.video_url) {
        const vid = document.createElement('a')
        vid.href = this.project.video_url
        vid.target = '_blank'
        vid.className = `
          flex items-center gap-2 px-5 py-2.5
          border border-[#333] rounded text-sm text-gray-400
          tracking-widest uppercase
          hover:border-white hover:text-white transition-all duration-200
        `
        vid.innerHTML = '<i class="fa-solid fa-play"></i>'
        vid.appendChild(document.createTextNode(' Video'))
        links.appendChild(vid)
      }

      content.appendChild(links)
    }

    content.insertBefore(titleRow, content.firstChild)
    content.insertBefore(desc, content.children[1])

    modal.appendChild(content)
    overlay.appendChild(modal)

    // Animate in
    requestAnimationFrame(() => {
      overlay.style.opacity = '1'
      modal.style.transform = 'translateY(0)'
    })

    // Close on Escape
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        this.closeModal(overlay)
        document.removeEventListener('keydown', onKeyDown)
      }
    }
    document.addEventListener('keydown', onKeyDown)

    return overlay
  }

  private closeModal(overlay: HTMLElement): void {
    overlay.style.opacity = '0'
    setTimeout(() => overlay.remove(), 300)
  }

  // ─── CARD ───────────────────────────────────────────────────

  render(): HTMLElement {
    const card = document.createElement('div')
    card.className = `
      bg-[#111] border border-[#1f1f1f] rounded-lg overflow-hidden
      flex flex-col cursor-pointer
      hover:border-[#333] transition-all duration-300
      opacity-0
    `
    card.style.transform = 'translateY(16px)'
    card.style.transition = 'opacity 0.5s ease, transform 0.5s ease, border-color 0.3s ease'

    card.addEventListener('click', () => {
      const modal = this.createModal()
      document.body.appendChild(modal)
    })

    // ── Image
    if (this.project.images.length > 0) {
      const img = document.createElement('img')
      img.src = `${IMAGE_BASE}/${this.project.images[0]}`
      img.alt = this.project.title
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

    const title = document.createElement('h3')
    title.className = 'text-white font-bold text-lg tracking-tight'
    title.textContent = this.project.title

    const desc = document.createElement('p')
    desc.className = 'text-gray-500 text-sm leading-relaxed flex-1 line-clamp-3'
    desc.textContent = this.project.description

    const tagsRow = document.createElement('div')
    tagsRow.className = 'flex flex-wrap gap-2'
    this.project.tags.forEach(tag => {
      const t = document.createElement('span')
      t.className = 'text-xs text-gray-400 border border-[#333] px-2 py-0.5 rounded'
      t.textContent = tag
      tagsRow.appendChild(t)
    })

    const footer = document.createElement('div')
    footer.className = 'flex items-center justify-between pt-2 border-t border-[#1f1f1f] mt-auto'

    const viewMore = document.createElement('span')
    viewMore.className = 'text-xs text-gray-600 tracking-widest uppercase'
    viewMore.textContent = 'View details'

    const arrow = document.createElement('i')
    arrow.className = 'fa-solid fa-arrow-right text-xs text-gray-600'

    footer.appendChild(viewMore)
    footer.appendChild(arrow)

    body.appendChild(title)
    body.appendChild(desc)
    if (this.project.tags.length) body.appendChild(tagsRow)
    body.appendChild(footer)

    card.appendChild(body)
    return card
  }
}