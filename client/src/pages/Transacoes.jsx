import { useMemo, useState } from 'react';
import Layout from '../components/Layout';
import TransactionModal from '../components/TransactionModal';
import TxTable from '../components/TxTable';
import Icon from '../components/Icon';
import { useApp } from '../context/AppContext';
import { formatCurrency } from '../utils/format';

const filtros = [
  { id: 'todas', label: 'Todas' },
  { id: 'receita', label: 'Receitas' },
  { id: 'despesa', label: 'Despesas' },
];

export default function Transacoes() {
  const { transactions, deleteTransaction } = useApp();
  const [showModal, setShowModal] = useState(false);
  const [editingTx, setEditingTx] = useState(null);
  const [filtro, setFiltro] = useState('todas');

  const listaOrdenada = useMemo(() => {
    const filtradas = transactions.filter((t) => filtro === 'todas' || t.tipo === filtro);
    return [...filtradas].sort((a, b) => (a.data < b.data ? 1 : -1));
  }, [transactions, filtro]);

  const totalFiltrado = listaOrdenada.reduce(
    (acc, t) => acc + (t.tipo === 'receita' ? t.valor : -t.valor),
    0
  );

  function openEdit(t) {
    setEditingTx(t);
    setShowModal(true);
  }

  function closeModal() {
    setShowModal(false);
    setEditingTx(null);
  }

  function handleDelete(t) {
    if (window.confirm(`Excluir "${t.descricao}"?`)) deleteTransaction(t.id);
  }

  return (
    <Layout>
      <header className="page-header">
        <div>
          <h1>Transações</h1>
          <p className="page-subtitle">
            {transactions.length === 0
              ? 'Nenhum lançamento ainda.'
              : `${transactions.length} ${transactions.length === 1 ? 'lançamento' : 'lançamentos'}`}
          </p>
        </div>
        <button className="btn btn-primary" onClick={() => setShowModal(true)}>
          <Icon name="plus" size={16} /> Nova transação
        </button>
      </header>

      <section className="panel">
        <div className="panel-header">
          <div className="segmented" role="tablist">
            {filtros.map((f) => (
              <button
                key={f.id}
                role="tab"
                aria-selected={f.id === filtro}
                className={f.id === filtro ? 'active' : ''}
                onClick={() => setFiltro(f.id)}
              >
                {f.label}
              </button>
            ))}
          </div>
          {listaOrdenada.length > 0 && (
            <span className="panel-meta">
              Total: <strong className="num">{formatCurrency(totalFiltrado)}</strong>
            </span>
          )}
        </div>

        {listaOrdenada.length === 0 ? (
          <div className="empty empty-block">
            <p>
              {transactions.length === 0
                ? 'Registre sua primeira receita ou despesa para começar.'
                : 'Nenhuma transação neste filtro.'}
            </p>
            {transactions.length === 0 && (
              <button className="btn btn-secondary" onClick={() => setShowModal(true)}>Registrar transação</button>
            )}
          </div>
        ) : (
          <TxTable items={listaOrdenada} onEdit={openEdit} onDelete={handleDelete} />
        )}
      </section>

      {showModal && <TransactionModal onClose={closeModal} editingTx={editingTx} />}
    </Layout>
  );
}
