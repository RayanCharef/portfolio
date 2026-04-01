export class Home {
  render(): HTMLElement {
    const main = document.createElement('main')
    main.innerHTML = `
      <section class="min-h-screen flex flex-col items-center justify-center bg-[#0a0a0a] relative">
        
        <p class="text-gray-400 text-2xl tracking-widest uppercase mb-2">
        Hi, I'm
        </p>

        <h1 class="text-9xl font-black text-white tracking-tight cursor-pointer
                   relative group select-none">
          Rayan
          <span class="absolute inset-0 flex items-center justify-center
                       text-9xl font-black tracking-tight
                       text-transparent opacity-0
                       group-hover:opacity-100 transition-opacity duration-300
                       pointer-events-none"
                style="
                  -webkit-text-stroke: 2px white;
                ">
            Rayan
          </span>
        </h1>

        <p class="text-xl text-gray-400 mt-6 tracking-widest uppercase">
          Developer <span class="animate-pulse">|</span>
        </p>

        <button class="mt-10 px-8 py-3 border border-white text-white text-sm 
                       tracking-widest uppercase hover:bg-white hover:text-black 
                       transition-all duration-300 cursor-pointer">
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