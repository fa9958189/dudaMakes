// Smooth scroll para links do menu
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', function (e) {
    e.preventDefault();
    document.querySelector(this.getAttribute('href')).scrollIntoView({
      behavior: 'smooth'
    });
  });
});

// Adicionar efeito de parallax no hero
window.addEventListener('scroll', () => {
  const hero = document.querySelector('.hero');
  const scrolled = window.pageYOffset;
  hero.style.backgroundPosition = `center ${scrolled * 0.5}px`;
});

// Animação dos produtos ao aparecer na tela
const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.style.opacity = '1';
      entry.target.style.transform = 'translateY(0)';
    }
  });
}, { threshold: 0.1 });

document.querySelectorAll('.produto').forEach(produto => {
  produto.style.opacity = '0';
  produto.style.transform = 'translateY(20px)';
  produto.style.transition = 'opacity 0.5s, transform 0.5s';
  observer.observe(produto);
});

// Header minimal on scroll
window.addEventListener('scroll', () => {
  const header = document.querySelector('header');
  if (window.scrollY > 100) {
    header.classList.add('minimal');
  } else {
    header.classList.remove('minimal');
  }
});

// Shopping Cart functionality
let cart = [];

function toggleCart() {
  document.querySelector('.cart-sidebar').classList.toggle('open');
}

function updateCartCount() {
  document.querySelector('.cart-count').textContent = cart.length;
}

function updateCartTotal() {
  const total = cart.reduce((sum, item) => sum + item.preco, 0);
  document.querySelector('.cart-total span').textContent = `R$ ${total.toFixed(2)}`;
}

function createHeart(x, y) {
  const heart = document.createElement('div');
  heart.className = 'heart';
  heart.textContent = '❤️';
  heart.style.left = x + 'px';
  heart.style.top = y + 'px';
  document.getElementById('hearts').appendChild(heart);
  
  heart.addEventListener('animationend', () => heart.remove());
}

function removeFromCart(index) {
  cart.splice(index, 1);
  updateCartDisplay();
  updateCartCount();
  updateCartTotal();
}

function updateCartDisplay() {
  const cartItems = document.querySelector('.cart-items');
  cartItems.innerHTML = '';
  
  cart.forEach((item, index) => {
    const itemElement = document.createElement('div');
    itemElement.className = 'cart-item';
    itemElement.innerHTML = `
      <span>${item.nome}</span>
      <div class="cart-item-right">
        <span>R$ ${item.preco.toFixed(2)}</span>
        <button class="remove-item" onclick="removeFromCart(${index})">✕</button>
      </div>
    `;
    cartItems.appendChild(itemElement);
  });
}

function addToCart(button) {
  const produto = button.closest('.produto');
  const nome = produto.dataset.nome;
  const preco = parseFloat(produto.dataset.preco);
  
  cart.push({ nome, preco });
  updateCartCount();
  updateCartDisplay();
  updateCartTotal();
  
  // Create hearts animation
  const rect = button.getBoundingClientRect();
  const centerX = rect.left + rect.width / 2;
  const centerY = rect.top + rect.height / 2;
  
  // Create more hearts (20 instead of 12)
  for (let i = 0; i < 20; i++) {
    setTimeout(() => {
      const randomOffset = (Math.random() - 0.5) * 60; // Increased spread
      createHeart(
        centerX + randomOffset,
        centerY
      );
    }, i * 50); // Reduced delay between hearts
  }
}

// Initialize cart sidebar close when clicking outside
document.addEventListener('click', (e) => {
  const cartSidebar = document.querySelector('.cart-sidebar');
  const cartIcon = document.querySelector('.cart-icon');
  if (!cartSidebar.contains(e.target) && !cartIcon.contains(e.target)) {
    cartSidebar.classList.remove('open');
  }
});

// Adicionar funcionalidade das tabs de categoria
document.querySelectorAll('.tab-btn').forEach(button => {
  button.addEventListener('click', () => {
    // Remove active class from all buttons and contents
    document.querySelectorAll('.tab-btn').forEach(btn => btn.classList.remove('active'));
    document.querySelectorAll('.categoria-content').forEach(content => content.classList.remove('active'));
    
    // Add active class to clicked button and corresponding content
    button.classList.add('active');
    const categoria = button.dataset.categoria;
    document.getElementById(categoria).classList.add('active');
  });
});