const whatsappNumero = "5511999999999"; // 🔴 TROQUE PELO SEU

const produtos = [
  {
    marca: "mi",
    nome: "Xiaomi Mi 11 Lite",
    imagem: "https://i.imgur.com/3ZQ3ZQp.png",
    cores: ["Preto", "Azul"],
    memorias: [{ tamanho: "128GB", preco: 1800 }]
  },
  {
    marca: "iphone",
    nome: "iPhone 11",
    imagem: "https://i.imgur.com/3ZQ3ZQp.png",
    cores: ["Preto", "Branco"],
    memorias: [
      { tamanho: "64GB", preco: 2200 },
      { tamanho: "128GB", preco: 2600 }
    ]
  },
  {
    marca: "redmi",
    nome: "Redmi Note 12",
    imagem: "https://i.imgur.com/3ZQ3ZQp.png",
    cores: ["Azul", "Preto"],
    memorias: [{ tamanho: "128GB", preco: 1100 }]
  },
  {
    marca: "poco",
    nome: "Poco X5",
    imagem: "https://i.imgur.com/3ZQ3ZQp.png",
    cores: ["Preto", "Verde"],
    memorias: [{ tamanho: "128GB", preco: 1400 }]
  },
  {
    marca: "realme",
    nome: "Realme C75",
    imagem: "https://i.imgur.com/3ZQ3ZQp.png",
    cores: ["Verde", "Preto", "Prata"],
    memorias: [
      { tamanho: "128GB", preco: 1300 },
      { tamanho: "256GB", preco: 1500 }
    ]
  }
];

const vitrine = document.getElementById("vitrine");
const modal = document.getElementById("modal");
let produtoAtual = null;

/* MOSTRAR PRODUTOS */
function mostrarProdutos(marca) {
  vitrine.innerHTML = "";
  vitrine.style.animation = "none";
  vitrine.offsetHeight;
  vitrine.style.animation = null;

  produtos.filter(p => p.marca === marca).forEach(produto => {
    const card = document.createElement("div");
    card.className = "card";
    card.innerHTML = `
      <img src="${produto.imagem}">
      <h3>${produto.nome}</h3>
      <p class="preco">A partir de R$ ${produto.memorias[0].preco},00</p>
    `;
    card.onclick = () => abrirModal(produto);
    vitrine.appendChild(card);
  });
}

/* ABAS */
function filtrar(marca, botao) {
  document.querySelectorAll(".abas button").forEach(b => b.classList.remove("ativo"));
  botao.classList.add("ativo");
  mostrarProdutos(marca);
}

/* MODAL */
function abrirModal(produto) {
  produtoAtual = produto;
  modal.style.display = "flex";

  modalImagem.src = produto.imagem;
  modalNome.textContent = produto.nome;

  modalCor.innerHTML = "";
  modalMemoria.innerHTML = "";

  produto.cores.forEach(c => modalCor.innerHTML += `<option>${c}</option>`);
  produto.memorias.forEach((m,i) => modalMemoria.innerHTML += `<option value="${i}">${m.tamanho}</option>`);

  atualizarPreco();
}

function atualizarPreco() {
  modalPreco.textContent =
    `R$ ${produtoAtual.memorias[modalMemoria.value].preco},00`;
}

modalMemoria.addEventListener("change", atualizarPreco);

function fecharModal() {
  modal.style.display = "none";
}

/* WHATSAPP */
function comprar() {
  const msg = `
Olá! Tenho interesse no produto:

📱 ${produtoAtual.nome}
🎨 Cor: ${modalCor.value}
💾 Memória: ${produtoAtual.memorias[modalMemoria.value].tamanho}
💰 Preço: R$ ${produtoAtual.memorias[modalMemoria.value].preco},00
`;

  window.open(
    `https://wa.me/${whatsappNumero}?text=${encodeURIComponent(msg)}`,
    "_blank"
  );
}

/* INICIAL (MI PADRÃO) */
mostrarProdutos("mi");
