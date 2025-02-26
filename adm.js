// Evento para autenticação do administrador
document.getElementById('auth-form').addEventListener('submit', async function (e) {
    e.preventDefault();

    const usuario = 'admin'; // Nome fixo do usuário
    const senha = document.getElementById('admin-password').value;

    try {
        console.log("Tentando autenticar...");
        const response = await fetch('http://localhost:3000/api/login', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ usuario, senha }),
        });

        const result = await response.json();

        if (response.ok) {
            console.log("Login bem-sucedido!");
            document.getElementById('login-form').style.display = 'none';
            document.getElementById('admin-content').style.display = 'block';
            displayProducts(); // Carrega os produtos ao fazer login
        } else {
            console.error("Erro no login:", result.error);
            document.getElementById('error-message').textContent = result.error;
            document.getElementById('error-message').style.display = 'block';
            setTimeout(() => {
                document.getElementById('error-message').style.display = 'none';
            }, 3000);
        }
    } catch (error) {
        console.error('Erro ao fazer login:', error);
    }
});

// Evento para cadastrar produtos no Firestore
document.getElementById('product-form').addEventListener('submit', async function (e) {
    e.preventDefault();

    const nome = document.getElementById('product-name').value.trim();
    const preco = parseFloat(document.getElementById('product-price').value).toFixed(2);
    const categoria = document.getElementById('product-category').value;
    const imagemInput = document.getElementById('product-image');

    if (!nome || !preco || !categoria) {
        alert("Por favor, preencha todos os campos!");
        return;
    }

    // Converte a imagem para Base64 antes de enviar ao backend
    if (imagemInput.files.length > 0) {
        const reader = new FileReader();
        reader.onload = async function (event) {
            const imagemBase64 = event.target.result;

            const produto = { nome, preco, categoria, imagem: imagemBase64 };

            try {
                console.log("Enviando novo produto para o backend...");
                const response = await fetch('http://localhost:3000/api/produtos', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify(produto),
                });

                if (response.ok) {
                    alert('Produto cadastrado com sucesso!');
                    document.getElementById('product-form').reset();
                    displayProducts(); // Atualiza a tabela de produtos
                } else {
                    alert('Erro ao cadastrar produto.');
                }
            } catch (error) {
                console.error('Erro ao cadastrar produto:', error);
            }
        };
        reader.readAsDataURL(imagemInput.files[0]);
    } else {
        alert('Por favor, selecione ou tire uma foto do produto.');
    }
});

// ✅ FUNÇÃO PARA LISTAR PRODUTOS NO FIRESTORE ✅
async function displayProducts() {
    try {
        console.log("Carregando produtos...");
        const response = await fetch('http://localhost:3000/api/produtos');
        const produtos = await response.json();

        const tableBody = document.querySelector('#product-table tbody');
        tableBody.innerHTML = ''; // Limpa a tabela antes de renderizar os produtos

        produtos.forEach((produto) => {
            const row = document.createElement('tr');
            row.innerHTML = `
                <td>${produto.id}</td>
                <td>${produto.nome}</td>
                <td>R$ ${produto.preco}</td>
                <td>${produto.categoria}</td>
                <td><img src="${produto.imagem}" alt="${produto.nome}" width="50"></td>
                <td>
                    <button onclick="deleteProduct('${produto.id}')">Excluir</button>
                </td>
            `;
            tableBody.appendChild(row);
        });

    } catch (error) {
        console.error('Erro ao listar produtos:', error);
    }
}

// ✅ FUNÇÃO PARA EXCLUIR PRODUTOS DO FIRESTORE ✅
async function deleteProduct(id) {
    try {
        console.log(`Tentando excluir produto com ID: ${id}`);

        const response = await fetch(`http://localhost:3000/api/produtos/${id}`, {
            method: 'DELETE',
        });

        if (!response.ok) {
            const result = await response.json();
            console.error(`Erro ao excluir produto ID ${id}:`, result.error);
            alert(`Erro ao excluir produto: ${result.error}`);
            return;
        }

        alert('Produto excluído com sucesso!');
        displayProducts(); // Atualiza a tabela

    } catch (error) {
        console.error('Erro ao excluir produto:', error);
        alert("Erro ao excluir o produto. Verifique o console para mais detalhes.");
    }
}

// Atualizar a tabela ao carregar a página
document.addEventListener('DOMContentLoaded', displayProducts);
