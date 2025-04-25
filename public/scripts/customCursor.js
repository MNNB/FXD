class CustomCursor {
  constructor() {
    this.dot = document.querySelector('.cursor-dot');
    this.outline = document.querySelector('.cursor-outline');
    this.init();
  }

  init() {
    document.addEventListener('mousemove', (e) => {
      const { clientX, clientY } = e;
      if (this.dot) {
        this.dot.style.transform = `translate(${clientX - 4}px, ${clientY - 4}px)`;
      }
      if (this.outline) {
        this.outline.style.transform = `translate(${clientX - 20}px, ${clientY - 20}px)`;
      }
    });
  }
}

new CustomCursor();