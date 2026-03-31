export class Navbar {
  render(): HTMLElement {
    const nav = document.createElement('nav')
    nav.className = `
      fixed top-0 left-0 w-full h-16 
      bg-[#0a0a0a] border-b border-[#1a1a1a]
      flex items-center justify-between px-8
      z-50 backdrop-blur-sm
    `

    const left = document.createElement('div')
    left.className = 'flex items-center gap-8'
    left.innerHTML = `
      <div class="flex items-center gap-4">
        <div class="w-8 h-8 bg-white rounded flex items-center justify-center 
                    text-black font-bold text-sm cursor-pointer
                    hover:bg-gray-200 transition-colors duration-200">
          RC
        </div>
      </div>

      <a href="#about"
         class="text-gray-400 text-base tracking-wider uppercase
                hover:text-white transition-colors duration-200
                relative after:absolute after:bottom-[-4px] after:left-0 
                after:w-0 after:h-[1px] after:bg-white
                after:transition-all after:duration-200
                hover:after:w-full">
        About me
      </a>

      <a href="#projects" 
         class="text-gray-400 text-base tracking-wider uppercase
                hover:text-white transition-colors duration-200
                relative after:absolute after:bottom-[-4px] after:left-0 
                after:w-0 after:h-[1px] after:bg-white
                after:transition-all after:duration-200
                hover:after:w-full">
        Projects
      </a>

      <a href="#contact" 
         class="text-gray-400 text-base tracking-wider uppercase
                hover:text-white transition-colors duration-200
                relative after:absolute after:bottom-[-4px] after:left-0 
                after:w-0 after:h-[1px] after:bg-white
                after:transition-all after:duration-200
                hover:after:w-full">
        Contact
      </a>
    `

    const right = document.createElement('div')
    right.className = 'flex items-center gap-5'
    right.innerHTML = `
      <i class="fa-brands fa-linkedin text-gray-600 text-lg 
                cursor-not-allowed opacity-50"></i>
      <i class="fa-brands fa-github text-gray-600 text-lg 
                cursor-not-allowed opacity-50"></i>
      <i class="fa-solid fa-right-to-bracket text-gray-400 text-lg 
                cursor-pointer hover:text-white
                transition-colors duration-200"></i>
    `

    nav.appendChild(left)
    nav.appendChild(right)

    return nav
  }
}