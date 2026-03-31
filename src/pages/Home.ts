export class Home {
  render(): HTMLElement {
    const main = document.createElement('main')
    main.innerHTML = `
      <section class="min-h-screen flex flex-col items-center justify-center bg-[#0a0a0a]">
        <h1 class="text-8xl font-black text-white tracking-tight cursor-pointer
                   hover:text-gray-300 transition-colors duration-300">
          Rayan
        </h1>
        <p class="text-2xl text-gray-400 mt-4 tracking-widest uppercase">
          Developer <span class="animate-pulse">|</span>
        </p>
        <button class="mt-10 px-8 py-3 border border-white text-white text-sm 
                       tracking-widest uppercase hover:bg-white hover:text-black 
                       transition-all duration-300">
          View my work
        </button>
        <div class="absolute bottom-8 flex flex-col items-center gap-2 text-gray-600">
          <span class="text-xs tracking-widest uppercase">Scroll</span>
          <i class="fa-solid fa-chevron-down animate-bounce text-xs"></i>
        </div>
      </section>
    `
    return main
  }
}