/// <reference types="vite/client" />
import './style.css'
import { Navbar } from './components/Navbar'
import { Home } from './pages/Home'


const overlay = document.createElement('div')
overlay.style.cssText = `
  position: fixed;
  inset: 0;
  background: #0a0a0a;
  z-index: 9999;
  transition: opacity 1s ease;
`

const canvas = document.createElement('canvas')
canvas.width = window.innerWidth
canvas.height = window.innerHeight
overlay.appendChild(canvas)
document.body.appendChild(overlay)

const ctx = canvas.getContext('2d')!
const cx = canvas.width / 2
const cy = canvas.height / 2


class PaintDrop {
  x: number
  y: number
  targetX: number
  targetY: number
  size: number
  speed: number
  landed: boolean
  alpha: number

  constructor(targetX: number, targetY: number) {
    this.x = targetX
    this.y = -20
    this.targetX = targetX
    this.targetY = targetY
    this.size = Math.random() * 4 + 3
    this.speed = Math.random() * 0.04 + 0.03
    this.landed = false
    this.alpha = 1
  }

  update() {
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

  draw() {
    if (!this.landed) {
      ctx.beginPath()
      ctx.arc(this.x, this.y, this.size / 2, 0, Math.PI * 2)
      ctx.fillStyle = `rgba(255, 255, 255, 0.6)`
      ctx.fill()
    } else {
      ctx.beginPath()
      ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2)
      ctx.fillStyle = `rgba(255, 255, 255, ${this.alpha})`
      ctx.fill()
    }
  }
}

function getLetterPoints(
  letter: string,
  offsetX: number
): { x: number; y: number }[] {
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
  const points: { x: number; y: number }[] = []

  for (let py = 0; py < size; py += 4) {
    for (let px = 0; px < size; px += 4) {
      const index = (py * size + px) * 4
      if (imageData.data[index] > 128) {
        const x = cx + offsetX + (px - size / 2) * 0.9
        const y = cy + (py - size / 2) * 0.9
        points.push({ x, y })
      }
    }
  }

  return points
}


const letters = ['R', 'A', 'Y', 'A', 'N']
const letterWidth = 85
const totalWidth = letters.length * letterWidth
const startOffset = -totalWidth / 2 + letterWidth / 2

const allDrops: PaintDrop[] = []
let currentLetter = 0
let animationDone = false

function spawnLetter(index: number) {
  if (index >= letters.length) {
    setTimeout(() => {
      overlay.style.opacity = '0'
      setTimeout(() => {
        overlay.remove()
      }, 1000)
    }, 2500)
    animationDone = true
    return
  }

  const letter = letters[index]
  const offsetX = startOffset + index * letterWidth
  const points = getLetterPoints(letter, offsetX)

  points.forEach((point, i) => {
    setTimeout(() => {
      allDrops.push(new PaintDrop(point.x, point.y))
    }, i * 2)
  })

  setTimeout(() => {
    currentLetter++
    spawnLetter(currentLetter)
  }, 400)
}


function animate() {
  ctx.fillStyle = '#0a0a0a'
  ctx.fillRect(0, 0, canvas.width, canvas.height)

  allDrops.forEach(drop => {
    drop.update()
    drop.draw()
  })

  requestAnimationFrame(animate)
}


const navbar = new Navbar()
document.querySelector<HTMLDivElement>('#navbar')!.appendChild(navbar.render())

const home = new Home()
document.querySelector<HTMLDivElement>('#app')!.appendChild(home.render())

setTimeout(() => {
  spawnLetter(0)
  animate()
}, 300)