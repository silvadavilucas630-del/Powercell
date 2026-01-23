let lista = produtos;
let atual;

function render() {
  vitrine.innerHTML = "";
  lista.forEach((p, i) => {
    vitrine.innerHTML += `
      <div class="card" onclick="abrirModal(${i})">
        <img src="${p.imagem}">
        <h3>${p.nome}</h3>
        <p>A partir de R$ ${Object.values(p.memorias)[0]}</p>
      </div>
    `;
  });
}

function filtrar(marca) {
  document.querySelectorAll('.menu button').forEach(b => b.classList.remove('ativo'));
  event.currentTarget.classList.add('ativo');

  lista = marca === "todos" ? produtos : produtos.filter(p => p.marca === marca);
  render();
}

function abrirModal(i) {
  atual = lista[i];
  modal.style.display = "flex";
  modalImg.src = atual.imagem;
  modalNome.innerText = atual.nome;

  memoria.innerHTML = "";
  for (let m in atual.memorias) {
    memoria.innerHTML += `<option value="${m}">${m}</option>`;
  }
  atualizarPreco();
}

function atualizarPreco() {
  const m = memoria.value;
  modalPreco.innerText = `R$ ${atual.memorias[m]}`;
  whats.href = `https://wa.me/55SEUNUMERO?text=Quero%20${atual.nome}%20${m}`;
}

function fecharModal() {
  modal.style.display = "none";
}

render();
