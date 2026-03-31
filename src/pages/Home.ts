export class Home {
  render(): HTMLElement {
    const section = document.createElement('section')
    section.innerHTML = `
      <h1>Hi, I'm Rayan</h1>
      <p>Student developer</p>
    `
    return section
  }
}