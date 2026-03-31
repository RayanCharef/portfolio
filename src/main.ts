/// <reference types="vite/client" />
import './style.css'
import { Navbar } from './components/Navbar'
import { Home } from './pages/Home'

const navbar = new Navbar()
document.querySelector<HTMLDivElement>('#navbar')!.appendChild(navbar.render())

const home = new Home()
document.querySelector<HTMLDivElement>('#app')!.appendChild(home.render())