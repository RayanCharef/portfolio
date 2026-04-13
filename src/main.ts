/// <reference types="vite/client" />
import './style.css'
import { Navbar } from './components/Navbar'
import { Home } from './pages/Home'
import { Projects } from './pages/Projects'

interface LetterPoint {
  x: number
  y: number
}

class PaintDrop {
  x: number
  y: number
  private targetX: number
  private targetY: number
  private size: number
  private speed: number
  landed: boolean
  private alpha: number
  private ctx: CanvasRenderingContext2D

  constructor(targetX: number, targetY: number, ctx: CanvasRenderingContext2D) {
    this.x = targetX
    this.y = -20
    this.targetX = targetX
    this.targetY = targetY
    this.size = Math.random() * 4 + 3
    this.speed = Math.random() * 0.12 + 0.1
    this.landed = false
    this.alpha = 1
    this.ctx = ctx
  }

  update(): void {
    if (!this.landed) {
      this.x += (this.targetX - this.x) * this.speed
      this.y += (this.targetY - this.y) * this.speed

      const dx = this.targetX - this.x
      const dy = this.targetY - this.y
      if (Math.sqrt(dx * dx + dy * dy) < 2) {
        this.x = this.targetX
        this.y = this.targetY
        this.landed = true
      }
    }
  }

  draw(): void {
    if (!this.landed) {
      this.ctx.beginPath()
      this.ctx.arc(this.x, this.y, this.size / 2, 0, Math.PI * 2)
      this.ctx.fillStyle = `rgba(255, 255, 255, 0.6)`
      this.ctx.fill()
    } else {
      this.ctx.beginPath()
      this.ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2)
      this.ctx.fillStyle = `rgba(255, 255, 255, ${this.alpha})`
      this.ctx.fill()
    }
  }
}

class PaintAnimation {
  private overlay: HTMLDivElement
  private canvas: HTMLCanvasElement
  private ctx: CanvasRenderingContext2D
  private cx: number
  private cy: number
  private allDrops: PaintDrop[]
  private currentLetter: number
  private letters: string[]
  private letterWidth: number
  private startOffset: number

  constructor() {
    this.letters = ['R', 'A', 'Y', 'A', 'N']
    this.letterWidth = 110
    this.allDrops = []
    this.currentLetter = 0

    const totalWidth = this.letters.length * this.letterWidth
    this.startOffset = -totalWidth / 2 + this.letterWidth / 2

    this.overlay = document.createElement('div')
    this.overlay.style.cssText = `
      position: fixed;
      inset: 0;
      background: #0a0a0a;
      z-index: 9999;
      transition: opacity 1s ease;
    `

    this.canvas = document.createElement('canvas')
    this.canvas.width = window.innerWidth
    this.canvas.height = window.innerHeight

    this.ctx = this.canvas.getContext('2d')!
    this.cx = this.canvas.width / 2
    this.cy = this.canvas.height / 2

    this.overlay.appendChild(this.canvas)
    document.body.appendChild(this.overlay)
  }

  private getLetterPoints(letter: string, offsetX: number): LetterPoint[] {
    const offscreen = document.createElement('canvas')
    const size = 200
    offscreen.width = size
    offscreen.height = size
    const offCtx = offscreen.getContext('2d')!

    offCtx.fillStyle = 'black'
    offCtx.fillRect(0, 0, size, size)
    offCtx.fillStyle = 'white'
    offCtx.font = `900 ${size * 0.85}px Arial Black, sans-serif`
    offCtx.textAlign = 'center'
    offCtx.textBaseline = 'middle'
    offCtx.fillText(letter, size / 2, size / 2)

    const imageData = offCtx.getImageData(0, 0, size, size)
    const points: LetterPoint[] = []

    for (let py = 0; py < size; py += 4) {
      for (let px = 0; px < size; px += 4) {
        const index = (py * size + px) * 4
        if (imageData.data[index] > 128) {
          points.push({
            x: this.cx + offsetX + (px - size / 2) * 0.9,
            y: this.cy + (py - size / 2) * 0.9
          })
        }
      }
    }

    return points
  }

  private spawnLetter(index: number): void {
    if (index >= this.letters.length) {
      setTimeout(() => {
        this.overlay.style.opacity = '0'
        setTimeout(() => this.overlay.remove(), 1000)
      }, 2500)
      return
    }

    const letter = this.letters[index]
    const offsetX = this.startOffset + index * this.letterWidth
    const points = this.getLetterPoints(letter, offsetX)

    points.forEach((point, i) => {
      setTimeout(() => {
        this.allDrops.push(new PaintDrop(point.x, point.y, this.ctx))
      }, i * 2)
    })

    setTimeout(() => {
      this.currentLetter++
      this.spawnLetter(this.currentLetter)
    }, 400)
  }

  private animate(): void {
    this.ctx.fillStyle = '#0a0a0a'
    this.ctx.fillRect(0, 0, this.canvas.width, this.canvas.height)

    this.allDrops.forEach(drop => {
      drop.update()
      drop.draw()
    })

    requestAnimationFrame(() => this.animate())
  }

  start(): void {
    setTimeout(() => {
      this.spawnLetter(0)
      this.animate()
    }, 300)
  }
}

class App {
  private navbar: Navbar

  constructor() {
    this.navbar = new Navbar()
  }

  private setupScrollBehavior(): void {
    window.onbeforeunload = () => {
      window.scrollTo(0, 0)
    }
  }

  private mountNavbar(): void {
    document.querySelector<HTMLDivElement>('#navbar')!
      .appendChild(this.navbar.render())
  }

  private async mountPage(): Promise<void> {
    const app = document.querySelector<HTMLDivElement>('#app')!
    const path = window.location.pathname

    if (path.endsWith('/projects')) {
      const projects = new Projects()
      app.appendChild(await projects.render())
    } else {
      const animation = new PaintAnimation()
      const home = new Home()
      app.appendChild(home.render())
      animation.start()
    }
  }

  async init(): Promise<void> {
    this.setupScrollBehavior()
    this.mountNavbar()
    await this.mountPage()
  }
}

const app = new App()
app.init()