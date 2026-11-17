const STORAGE_KEY = 'achados_perdidos_db';

let itens = JSON.parse(localStorage.getItem(STORAGE_KEY)) || [
  {
    id: 1,
    nome: 'Garrafa Térmica Rosé',
    categoria: 'Outros',
    local: 'Quadra Poliesportiva',
    data: new Date().toISOString().split('T')[0],
    contato: 'Secretaria (Bloco A)',
    descricao: 'Garrafa metálica com tampa prateada.',
    status: 'Pendente'
  }
];

const form = document.getElementById('item-form');
const listaEl = document.getElementById('lista-itens');
const buscaEl = document.getElementById('busca');
const filtroStatusEl = document.getElementById('filtro-status');
const countPendentesEl = document.getElementById('count-pendentes');
const countDevolvidosEl = document.getElementById('count-devolvidos');

function salvarDados() {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(itens));
}

function atualizarContadores() {
  const pendentes = itens.filter(i => i.status === 'Pendente').length;
  const devolvidos = itens.filter(i => i.status === 'Devolvido').length;
  countPendentesEl.textContent = pendentes;
  countDevolvidosEl.textContent = devolvidos;
}

function renderizar() {
  atualizarContadores();
  const termo = buscaEl.value.toLowerCase();
  const statusFiltro = filtroStatusEl.value;

  const filtrados = itens.filter(item => {
    const bateTexto = item.nome.toLowerCase().includes(termo) ||
                      item.local.toLowerCase().includes(termo) ||
                      item.descricao.toLowerCase().includes(termo);
    const bateStatus = statusFiltro === 'Todos' || item.status === statusFiltro;
    return bateTexto && bateStatus;
  });

  if (filtrados.length === 0) {
    listaEl.innerHTML = '<p class="empty">Nenhum registro encontrado para os filtros selecionados.</p>';
    return;
  }

  listaEl.innerHTML = filtrados.map(item => `
    <article class="item-card ${item.status === 'Devolvido' ? 'devolvido' : ''}">
      <div>
        <div class="card-top">
          <span class="category-tag">${item.categoria}</span>
          <span class="badge ${item.status === 'Pendente' ? 'pendente' : 'devolvido'}">${item.status}</span>
        </div>
        <div class="item-title">${item.nome}</div>
        <div class="item-meta">
          <span><strong>Local:</strong> ${item.local}</span>
          <span><strong>Data:</strong> ${item.data.split('-').reverse().join('/')}</span>
          <span><strong>Retirada:</strong> ${item.contato}</span>
        </div>
        <p class="item-desc">${item.descricao || 'Sem observações adicionais.'}</p>
      </div>
      <div class="item-actions">
        <button class="btn-small ${item.status === 'Pendente' ? 'btn-status' : 'btn-reabrir'}" onclick="alternarStatus(${item.id})">
          ${item.status === 'Pendente' ? 'Confirmar Devolução' : 'Reabrir Item'}
        </button>
        <button class="btn-small btn-delete" onclick="excluirItem(${item.id})">Excluir</button>
      </div>
    </article>
  `).join('');
}

form.addEventListener('submit', (e) => {
  e.preventDefault();
  const novoItem = {
    id: Date.now(),
    nome: document.getElementById('nome').value.trim(),
    categoria: document.getElementById('categoria').value,
    local: document.getElementById('local').value.trim(),
    data: document.getElementById('data').value,
    contato: document.getElementById('contato').value.trim(),
    descricao: document.getElementById('descricao').value.trim(),
    status: 'Pendente'
  };
  itens.unshift(novoItem);
  salvarDados();
  form.reset();
  renderizar();
});

window.alternarStatus = (id) => {
  itens = itens.map(item =>
    item.id === id ? { ...item, status: item.status === 'Pendente' ? 'Devolvido' : 'Pendente' } : item
  );
  salvarDados();
  renderizar();
};

window.excluirItem = (id) => {
  if (confirm('Deseja realmente remover este registro?')) {
    itens = itens.filter(item => item.id !== id);
    salvarDados();
    renderizar();
  }
};

buscaEl.addEventListener('input', renderizar);
filtroStatusEl.addEventListener('change', renderizar);

if ('serviceWorker' in navigator) {
  window.addEventListener('load', () => {
    navigator.serviceWorker.register('./sw.js').catch(err => console.error('Erro SW:', err));
  });
}

renderizar();