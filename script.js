function createButterfly() {
    const butterfly = document.createElement('div');
    butterfly.innerHTML = `
    <svg class="butterfly" width="30" height="30" viewBox="0 0 100 100">
        <path fill="#ff69b4" d="M50 30 C20 0, 0 20, 0 50 C0 80, 20 100, 50 70 C80 100, 100 80, 100 50 C100 20, 80 0, 50 30 Z"/>
    </svg>`;
    butterfly.style.position = 'fixed';
    butterfly.style.left = Math.random() * window.innerWidth + 'px';
    butterfly.style.top = window.innerHeight + 'px';
    butterfly.style.animation = `fly ${15 + Math.random() * 10}s linear infinite`;
    document.body.appendChild(butterfly);
}

function createHeart(x, y) {
    const heart = document.createElement('div');
    heart.innerHTML = `
    <svg class="heart" width="20" height="20" viewBox="0 0 100 100">
        <path fill="#ff69b4" d="M50,30 C35,10 0,10 0,40 C0,65 50,90 50,90 C50,90 100,65 100,40 C100,10 65,10 50,30 Z"/>
    </svg>`;
    heart.style.position = 'fixed';
    heart.style.left = x + 'px';
    heart.style.top = y + 'px';
    heart.style.setProperty('--moveX', (Math.random() * 400 - 200) + 'px');
    document.body.appendChild(heart);
    
    setTimeout(() => {
        heart.remove();
    }, 2000);
}

function spawnHearts(x, y) {
    for (let i = 0; i < 30; i++) {
        setTimeout(() => {
            createHeart(
                Math.random() * window.innerWidth,
                Math.random() * window.innerHeight
            );
        }, i * 50);
    }
}

for (let i = 0; i < 10; i++) {
    setTimeout(createButterfly, i * 1000);
}

document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        document.querySelector(this.getAttribute('href')).scrollIntoView({
            behavior: 'smooth'
        });
    });
});

let cart = []; // Array para armazenar os produtos selecionados

document.addEventListener("DOMContentLoaded", () => {
    const cartButton = document.getElementById("cart-button");
    const overlay = document.getElementById("overlay");
    const popup = document.getElementById("popup");
    const closePopupButton = document.getElementById("close-popup");
    const sendWhatsappButton = document.getElementById("send-whatsapp");
    const productList = document.getElementById("product-list");
    const cartTotal = document.getElementById("cart-total");
    const buyButtons = document.querySelectorAll(".buy-button");

    let cart = JSON.parse(localStorage.getItem("cart")) || [];

    const updateCartDisplay = () => {
        productList.innerHTML = "";
        let total = 0;

        if (cart.length === 0) {
            productList.innerHTML = "<li>Seu carrinho está vazio!</li>";
        } else {
            cart.forEach((item, index) => {
                const li = document.createElement("li");
                li.textContent = `${item.name} - R$ ${parseFloat(item.price).toFixed(2)}`;
                
                // Cria o botão de excluir
                const deleteButton = document.createElement("button");
                deleteButton.textContent = "Excluir";
                deleteButton.classList.add("delete-button");
                deleteButton.onclick = () => removeItem(index);
                li.appendChild(deleteButton);
                
                productList.appendChild(li);
                total += parseFloat(item.price);
            });
        }

        cartTotal.textContent = total.toFixed(2);
    };

    const addToCart = (name, price) => {
        cart.push({ name, price });
        localStorage.setItem("cart", JSON.stringify(cart));
        updateCartDisplay();
    };

    const removeItem = (index) => {
        cart.splice(index, 1);
        localStorage.setItem("cart", JSON.stringify(cart));
        updateCartDisplay();
    };

    buyButtons.forEach((button) => {
        button.addEventListener("click", () => {
            const name = button.dataset.name;
            const price = button.dataset.price;
            addToCart(name, price);
            alert("Produto adicionado no carrinho");
        });
    });

    cartButton.addEventListener("click", () => {
        updateCartDisplay();
        overlay.style.display = "block";
        popup.style.display = "block";
    });

    closePopupButton.addEventListener("click", () => {
        overlay.style.display = "none";
        popup.style.display = "none";
    });

    overlay.addEventListener("click", () => {
        overlay.style.display = "none";
        popup.style.display = "none";
    });

    sendWhatsappButton.addEventListener("click", () => {
        if (cart.length === 0) {
            return;
        }

        let message = "🛍️ *Itens do Carrinho*:\n";
        let total = 0;

        cart.forEach((item) => {
            message += `- ${item.name}: R$ ${parseFloat(item.price).toFixed(2)}\n`;
            total += parseFloat(item.price);
        });

        message += `\n*Total: R$ ${total.toFixed(2)}*`;

        const whatsappURL = `https://wa.me/63992393705?text=${encodeURIComponent(message)}`;
        window.open(whatsappURL, "_blank");

        // Limpar o carrinho
        cart = [];
        localStorage.removeItem("cart");
        updateCartDisplay();
    });

    // Atualizar a exibição inicial
    updateCartDisplay();
});
