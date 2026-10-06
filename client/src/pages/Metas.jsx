import { useState } from 'react';
import Layout from '../components/Layout';
import GoalModal from '../components/GoalModal';
import ContributeModal from '../components/ContributeModal';
import Icon from '../components/Icon';
import { useApp } from '../context/AppContext';
import { formatCurrency, formatDate, todayISO } from '../utils/format';

function prazoLabel(prazo) {
  const dias = Math.round((new Date(prazo) - new Date(todayISO())) / 86400000);
  if (dias < 0) return 'prazo encerrado';
  if (dias === 0) return 'vence hoje';
  if (dias === 1) return 'falta 1 dia';
  return `faltam ${dias} dias`;
}

export default function Metas() {
  const { goals, deleteGoal } = useApp();
  const [showModal, setShowModal] = useState(false);
  const [contributing, setContributing] = useState(null);

  function handleDelete(g) {
    if (window.confirm(`Excluir a meta "${g.titulo}"?`)) deleteGoal(g.id);
  }

  return (
    <Layout>
      <header className="page-header">
        <div>
          <h1>Metas</h1>
          <p className="page-subtitle">Objetivos de economia e quanto falta para cada um.</p>
        </div>
        <button className="btn btn-primary" onClick={() => setShowModal(true)}>
          <Icon name="plus" size={16} /> Nova meta
        </button>
      </header>

      {goals.length === 0 ? (
        <section className="panel">
          <div className="empty empty-block">
            <p>Você ainda não tem metas. Defina um valor e um prazo para acompanhar o progresso.</p>
            <button className="btn btn-secondary" onClick={() => setShowModal(true)}>Criar meta</button>
          </div>
        </section>
      ) : (
        <div className="goal-grid">
          {goals.map((g) => {
            const pct = Math.min(100, (g.valorAtual / g.valorAlvo) * 100);
            const concluida = g.valorAtual >= g.valorAlvo;
            return (
              <article className="panel goal" key={g.id}>
                <div className="goal-top">
                  <div>
                    <h2>{g.titulo}</h2>
                    <p className="goal-deadline">
                      {formatDate(g.prazo)} · {concluida ? 'concluída' : prazoLabel(g.prazo)}
                    </p>
                  </div>
                  <button className="icon-btn icon-btn-danger" onClick={() => handleDelete(g)} aria-label="Excluir meta">
                    <Icon name="trash" size={16} />
                  </button>
                </div>

                <div className="goal-amounts">
                  <span className="goal-current num">{formatCurrency(g.valorAtual)}</span>
                  <span className="goal-target num">de {formatCurrency(g.valorAlvo)}</span>
                </div>

                <div className={'meter meter-lg meter-goal' + (concluida ? ' done' : '')}>
                  <div style={{ width: `${pct}%` }} />
                </div>

                <div className="goal-bottom">
                  <span className="muted num">{Math.round(pct)}%</span>
                  <button className="btn btn-secondary btn-sm" onClick={() => setContributing(g)}>
                    Movimentar
                  </button>
                </div>
              </article>
            );
          })}
        </div>
      )}

      {showModal && <GoalModal onClose={() => setShowModal(false)} />}
      {contributing && (
        <ContributeModal
          goal={goals.find((g) => g.id === contributing.id) || contributing}
          onClose={() => setContributing(null)}
        />
      )}
    </Layout>
  );
}
