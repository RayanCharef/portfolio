export class Navbar {
  render(): HTMLElement {
    const nav = document.createElement('nav')
    nav.innerHTML = `
      <a href="#">Home</a>
      <a href="#projects">Projects</a>
    `
    return nav
  }
}