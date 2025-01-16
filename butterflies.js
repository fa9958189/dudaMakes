class Butterfly {
  constructor() {
    this.element = document.createElementNS("http://www.w3.org/2000/svg", "svg");
    this.element.setAttribute("viewBox", "0 0 100 100");
    this.element.style.position = "absolute";
    this.element.style.width = "30px";
    this.element.style.height = "30px";
    
    // Array of makeup items to randomly choose from
    const makeupShapes = [
      // Lipstick
      {
        shape: "path",
        attrs: {
          d: "M40,20 L60,20 L65,80 L35,80 Z",
          fill: `hsl(${Math.random() * 50 + 300}, 80%, 75%)`
        }
      },
      // Compact powder
      {
        shape: "circle",
        attrs: {
          cx: "50",
          cy: "50",
          r: "35",
          fill: `hsl(${Math.random() * 50 + 300}, 70%, 85%)`
        }
      },
      // Mascara
      {
        shape: "path",
        attrs: {
          d: "M45,20 L55,20 L58,70 L42,70 Z M40,70 L60,70 L65,85 L35,85 Z",
          fill: `hsl(${Math.random() * 50 + 300}, 75%, 80%)`
        }
      }
    ];
    
    // Randomly select a makeup item
    const randomItem = makeupShapes[Math.floor(Math.random() * makeupShapes.length)];
    const shape = document.createElementNS("http://www.w3.org/2000/svg", randomItem.shape);
    
    // Apply attributes
    Object.entries(randomItem.attrs).forEach(([attr, value]) => {
      shape.setAttribute(attr, value);
    });
    
    this.element.appendChild(shape);
    
    // Position and movement
    this.x = Math.random() * window.innerWidth;
    this.y = Math.random() * window.innerHeight;
    this.dx = (Math.random() - 0.5) * 1.5;
    this.dy = (Math.random() - 0.5) * 1.5;
    this.rotation = 0;
    this.rotationSpeed = (Math.random() - 0.5) * 2;
    
    this.updatePosition();
  }
  
  updatePosition() {
    this.x += this.dx;
    this.y += this.dy;
    this.rotation += this.rotationSpeed;
    
    // Wrap around screen
    if (this.x < -50) this.x = window.innerWidth + 50;
    if (this.x > window.innerWidth + 50) this.x = -50;
    if (this.y < -50) this.y = window.innerHeight + 50;
    if (this.y > window.innerHeight + 50) this.y = -50;
    
    this.element.style.transform = `translate(${this.x}px, ${this.y}px) rotate(${this.rotation}deg)`;
  }
}

// Create container
const container = document.getElementById('butterflies');

// Create makeup items
const butterflies = Array.from({ length: 10 }, () => new Butterfly());
butterflies.forEach(item => container.appendChild(item.element));

// Animate items
function animate() {
  butterflies.forEach(item => item.updatePosition());
  requestAnimationFrame(animate);
}

animate();