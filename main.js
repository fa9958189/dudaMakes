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

// Inicializa o carrinho a partir do localStorage ou cria um array vazio
let cart = JSON.parse(localStorage.getItem('cart')) || [];

// Função para salvar o carrinho no localStorage
function saveCart() {
  localStorage.setItem('cart', JSON.stringify(cart));
}

function toggleCart() {
  document.querySelector('.cart-sidebar').classList.toggle('open');
}

function updateCartCount() {
  document.querySelector('.cart-count').textContent = cart.length;
}

function updateCartTotal() {
  const total = cart.reduce((sum, item) => sum + item.price, 0);
  document.querySelector('.cart-total span').textContent = `R$ ${total.toFixed(2)}`;
}

function updateCartDisplay() {
  const cartItems = document.querySelector('.cart-items');
  cartItems.innerHTML = ''; // Limpa a lista de itens no carrinho

  cart.forEach((item, index) => {
    const itemElement = document.createElement('div');
    itemElement.className = 'cart-item';
    itemElement.innerHTML = `
      <span>${item.name}</span>
      <div class="cart-item-right">
        <span>R$ ${item.price.toFixed(2)}</span>
        <button class="remove-item" onclick="removeFromCart(${index})">✕</button>
      </div>
    `;
    cartItems.appendChild(itemElement);
  });
}

function addToCart(button) {
  const produto = button.closest('.produto');
  const name = produto.querySelector('h3').textContent.trim();
  const price = parseFloat(produto.querySelector('p').textContent.replace('R$', '').trim());

  cart.push({ name, price });
  saveCart(); // Salva o carrinho no localStorage
  updateCartCount();
  updateCartDisplay();
  updateCartTotal();

  // Animação de corações ao adicionar ao carrinho
  const rect = button.getBoundingClientRect();
  const centerX = rect.left + rect.width / 2;
  const centerY = rect.top + rect.height / 2;

  for (let i = 0; i < 20; i++) {
    setTimeout(() => {
      const randomOffset = (Math.random() - 0.5) * 60;
      createHeart(centerX + randomOffset, centerY);
    }, i * 50);
  }
}

function removeFromCart(index) {
  cart.splice(index, 1);
  saveCart(); // Atualiza o localStorage após remover o item
  updateCartCount();
  updateCartDisplay();
  updateCartTotal();
}

// Fecha o carrinho se clicar fora dele
document.addEventListener('click', (e) => {
  const cartSidebar = document.querySelector('.cart-sidebar');
  const cartIcon = document.querySelector('.cart-icon');
  if (!cartSidebar.contains(e.target) && !cartIcon.contains(e.target)) {
    cartSidebar.classList.remove('open');
  }
});

// Funcionalidade das tabs de categoria
document.querySelectorAll('.tab-btn').forEach(button => {
  button.addEventListener('click', () => {
    document.querySelectorAll('.tab-btn').forEach(btn => btn.classList.remove('active'));
    document.querySelectorAll('.categoria-content').forEach(content => content.classList.remove('active'));
    
    button.classList.add('active');
    const categoria = button.dataset.categoria;
    document.getElementById(categoria).classList.add('active');
  });
});

// Carregar produtos dinamicamente a partir do backend
async function loadProducts() {
  try {
    const response = await fetch('http://localhost:3000/api/produtos');
    const produtos = await response.json();

    produtos.forEach(produto => {
      const categorySection = document.getElementById(produto.categoria);
      if (categorySection) {
        const gridProdutos = categorySection.querySelector('.grid-produtos');

        const productElement = document.createElement('div');
        productElement.classList.add('produto');
        productElement.innerHTML = `
          <div class="produto-img">
            <img src="${produto.imagem}" alt="${produto.nome}">
          </div>
          <h3>${produto.nome}</h3>
          <p>R$ ${produto.preco.toFixed(2)}</p>
          <button onclick="addToCart(this)">Comprar</button>
        `;
        gridProdutos.appendChild(productElement);
      }
    });
  } catch (error) {
    console.error('Erro ao carregar produtos:', error);
  }
}

// Ao carregar a página, atualiza o carrinho com os itens do localStorage e carrega os produtos
document.addEventListener('DOMContentLoaded', () => {
  updateCartCount();
  updateCartDisplay();
  updateCartTotal();
  loadProducts();
});

// Função para criar animação de corações
function createHeart(x, y) {
  const heart = document.createElement('div');
  heart.className = 'heart';
  heart.textContent = '❤️';
  heart.style.left = x + 'px';
  heart.style.top = y + 'px';
  document.getElementById('hearts').appendChild(heart);

  heart.addEventListener('animationend', () => heart.remove());
}

// Função para enviar as informações do carrinho para o WhatsApp
function finalizarCompra() {
  if (cart.length === 0) {
    alert("O carrinho está vazio. Adicione produtos antes de finalizar a compra.");
    return;
  }

  const numeroWhatsApp = "63992649114";
  let mensagem = "Olá, gostaria de finalizar minha compra com os seguintes itens:\n\n";

  // Adicionar produtos à mensagem
  cart.forEach((item, index) => {
    mensagem += `${index + 1}. ${item.name} - R$ ${item.price.toFixed(2)}\n`;
  });

  // Adicionar o total à mensagem
  const total = cart.reduce((sum, item) => sum + item.price, 0);
  mensagem += `\nTotal: R$ ${total.toFixed(2)}`;

  // Codificar a mensagem para URL
  const mensagemCodificada = encodeURIComponent(mensagem);

  // Redirecionar para o WhatsApp
  window.open(`https://wa.me/${numeroWhatsApp}?text=${mensagemCodificada}`, "_blank");
}

// Evento para finalizar a compra
document.querySelector('.finalizar-compra').addEventListener('click', finalizarCompra);
