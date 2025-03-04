// Anima os story cards (caso existam) ao rolar a página
const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('visible');
    }
  });
}, { threshold: 0.1 });

document.querySelectorAll('.story-card').forEach(card => {
  observer.observe(card);
});

// Header minimal ao rolar a página
window.addEventListener('scroll', () => {
  const header = document.querySelector('header');
  if (window.scrollY > 100) {
    header.classList.add('minimal');
  } else {
    header.classList.remove('minimal');
  }
});

document.addEventListener('DOMContentLoaded', () => {
  // Animação de story cards (se houver)
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
      }
    });
  }, { threshold: 0.1 });
  document.querySelectorAll('.story-card').forEach(card => {
    observer.observe(card);
  });

  // Header minimal no scroll
  window.addEventListener('scroll', () => {
    const header = document.querySelector('header');
    if (window.scrollY > 100) {
      header.classList.add('minimal');
    } else {
      header.classList.remove('minimal');
    }
  });

  // Processamento do formulário de contato
  const contactForm = document.getElementById('contact-form');
  const formResponse = document.getElementById('form-response');

  contactForm.addEventListener('submit', (e) => {
    e.preventDefault();
    
    // Coleta os valores do formulário
    const nome = document.getElementById('nome').value.trim();
    const email = document.getElementById('email').value.trim();
    const mensagem = document.getElementById('mensagem').value.trim();

    if (!nome || !email || !mensagem) {
      formResponse.textContent = "Por favor, preencha todos os campos.";
      formResponse.style.display = 'block';
      return;
    }

    // Simulação de envio do formulário via AJAX
    fetch('https://example.com/api/contato', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ nome, email, mensagem })
    })
    .then(response => {
      if (!response.ok) {
        throw new Error("Erro ao enviar a mensagem.");
      }
      return response.json();
    })
    .then(data => {
      formResponse.textContent = "Mensagem enviada com sucesso! Entraremos em contato em breve.";
      formResponse.style.display = 'block';
      contactForm.reset();
      setTimeout(() => {
        formResponse.style.display = 'none';
      }, 5000);
    })
    .catch(error => {
      formResponse.textContent = "Ocorreu um erro ao enviar sua mensagem. Tente novamente.";
      formResponse.style.display = 'block';
    });
  });
});
