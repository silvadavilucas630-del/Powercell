const produtos = [
  {
    nome: "iPhone 11",
    marca: "apple",
    img: "img/produtos/iphone11.png",
    precos: {
      "64GB": 2300,
      "128GB": 2600
    }
  },
  {
    nome: "Redmi Note 12",
    marca: "xiaomi",
    img: "img/produtos/redmi12.png",
    precos: {
      "128GB": 1300,
      "256GB": 1500
    }
  },
  {
    nome: "Poco X5",
    marca: "poco",
    img: "img/produtos/pocox5.png",
    precos: {
      "128GB": 1500,
      "256GB": 1700
    }
  },
  {
    nome: "Realme C75",
    marca: "realme",
    img: "img/produtos/realmec75.png",
    precos: {
      "128GB": 1300,
      "256GB": 1500
    }
  }
];

const vitrine = document.getElementById("vitrine");
const modal = document.getElementById("modal");
let produtoAtual = null;

function render(lista) {
  vitrine.innerHTML = "";
  lista.forEach(p => {
    vitrine.innerHTML += `
      <div class="card" onclick="abrirModal('${p.nome}')">
        <img src="${p.img}">
        <h3>${p.nome}</h3>
        <div class="preco">A partir de R$ ${Math.min(...Object.values(p.precos))}</div>
      </div>
    `;
  });
}

function filtrar(marca, btn) {
  document.querySelectorAll(".menu button").forEach(b => b.classList.remove("ativo"));
  btn.classList.add("ativo");

  if (marca === "todos") render(produtos);
  else render(produtos.filter(p => p.marca === marca));
}

function abrirModal(nome) {
  produtoAtual = produtos.find(p => p.nome === nome);

  document.getElementById("modalImg").src = produtoAtual.img;
  document.getElementById("modalNome").innerText = produtoAtual.nome;

  const select = document.getElementById("memoria");
  select.innerHTML = "";

  for (let mem in produtoAtual.precos) {
    select.innerHTML += `<option value="${mem}">${mem}</option>`;
  }

  atualizarPreco();
  modal.style.display = "flex";
}

function atualizarPreco() {
  const mem = document.getElementById("memoria").value;
  const preco = produtoAtual.precos[mem];
  document.getElementById("modalPreco").innerText = `R$ ${preco}`;
}

function fecharModal() {
  modal.style.display = "none";
}

function comprar() {
  const mem = document.getElementById("memoria").value;
  const preco = produtoAtual.precos[mem];

  const msg = `Olá! Quero comprar o ${produtoAtual.nome} ${mem} por R$ ${preco}`;
  window.open(`https://wa.me/55SEUNUMERO?text=${encodeURIComponent(msg)}`);
}

render(produtos);
