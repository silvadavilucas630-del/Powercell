let produtoAtual = null;

function carregarProdutos(lista) {
  const vitrine = document.getElementById("vitrine");
  vitrine.innerHTML = "";

  lista.forEach(p => {
    vitrine.innerHTML += `
      <div class="card" onclick="abrirModal(${p.id})">
        <img src="${p.imagem}">
        <h3>${p.nome}</h3>
        <p>A partir de R$ ${Math.min(...Object.values(p.memorias))}</p>
      </div>
    `;
  });
}

function filtrar(marca) {
  document.querySelectorAll(".menu img").forEach(i => i.classList.remove("ativo"));
  event.target.classList.add("ativo");

  if (marca === "todos") {
    carregarProdutos(produtos);
  } else {
    carregarProdutos(produtos.filter(p => p.marca === marca));
  }
}

function abrirModal(id) {
  produtoAtual = produtos.find(p => p.id === id);

  document.getElementById("modalTitulo").innerText = produtoAtual.nome;

  const select = document.getElementById("modalMemoria");
  select.innerHTML = "";

  for (let m in produtoAtual.memorias) {
    select.innerHTML += `<option value="${m}">${m}</option>`;
  }

  atualizarPreco();
  document.getElementById("modal").style.display = "flex";
}

function atualizarPreco() {
  const mem = document.getElementById("modalMemoria").value;
  document.getElementById("modalPreco").innerText =
    "R$ " + produtoAtual.memorias[mem].toLocaleString("pt-BR");
}

function fecharModal() {
  document.getElementById("modal").style.display = "none";
}

function comprarWhats() {
  const mem = document.getElementById("modalMemoria").value;
  const preco = produtoAtual.memorias[mem];

  const msg = `Olá! Quero comprar o ${produtoAtual.nome} (${mem}) por R$ ${preco}`;
  window.open(`https://wa.me/55SEUNUMERO?text=${encodeURIComponent(msg)}`);
}

carregarProdutos(produtos);
