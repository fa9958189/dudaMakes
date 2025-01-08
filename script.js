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
    for(let i = 0; i < 30; i++) {
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

document.querySelectorAll('.buy-button').forEach(button => {
    button.addEventListener('click', function(e) {
        alert('Produto adicionado ao carrinho!');
        this.style.transform = 'scale(0.95)';
        spawnHearts(0, 0); // Agora os corações aparecem por toda a tela
        setTimeout(() => {
            this.style.transform = 'scale(1)';
        }, 200);
    });
});

