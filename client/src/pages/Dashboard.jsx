import { useMemo, useState } from 'react';
import { Link } from 'react-router-dom';
import Layout from '../components/Layout';
import TransactionModal from '../components/TransactionModal';
import GoalModal from '../components/GoalModal';
import TxTable from '../components/TxTable';
import Icon from '../components/Icon';
import { useApp } from '../context/AppContext';
import { formatCurrency, todayISO } from '../utils/format';

export default function Dashboard() {
  const { currentUser, transactions, goals, categorias } = useApp();
  const [modal, setModal] = useState(null);

  const mesAtual = todayISO().slice(0, 7);
  const nomeMes = new Date().toLocaleDateString('pt-BR', { month: 'long', year: 'numeric' });

  const resumo = useMemo(() => {
    let saldo = 0;
    let receitasMes = 0;
    let despesasMes = 0;
    const porCategoria = {};

    transactions.forEach((t) => {
      saldo += t.tipo === 'receita' ? t.valor : -t.valor;
      if (!t.data.startsWith(mesAtual)) return;
      if (t.tipo === 'receita') receitasMes += t.valor;
      else {
        despesasMes += t.valor;
        porCategoria[t.categoriaId] = (porCategoria[t.categoriaId] || 0) + t.valor;
      }
    });

    const categoriasMes = Object.entries(porCategoria)
      .sort((a, b) => b[1] - a[1])
      .map(([catId, valor]) => ({
        id: catId,
        nome: categorias.find((c) => c.id === catId)?.nome || catId,
        valor,
        pct: despesasMes ? (valor / despesasMes) * 100 : 0,
      }));

    const recentes = [...transactions]
      .sort((a, b) => (a.data < b.data ? 1 : -1))
      .slice(0, 6);

    const guardado = goals.reduce((acc, g) => acc + g.valorAtual, 0);

    return { saldo, receitasMes, despesasMes, categoriasMes, recentes, guardado };
  }, [transactions, goals, categorias, mesAtual]);

  const primeiroNome = currentUser?.nome?.split(' ')[0];
  const vazio = transactions.length === 0 && goals.length === 0;

  return (
    <Layout>
      <header className="page-header">
        <div>
          <p className="eyebrow">Olá, {primeiroNome}</p>
          <h1>Visão geral</h1>
        </div>
        <button className="btn btn-primary" onClick={() => setModal('tx')}>
          <Icon name="plus" size={16} /> Nova transação
        </button>
      </header>

      <section className="stats">
        <div className="stat">
          <span className="stat-label">Saldo atual</span>
          <span className={'stat-value' + (resumo.saldo < 0 ? ' negative' : '')}>{formatCurrency(resumo.saldo)}</span>
          <span className="stat-hint">soma de todas as transações</span>
        </div>
        <div className="stat">
          <span className="stat-label">Receitas</span>
          <span className="stat-value">{formatCurrency(resumo.receitasMes)}</span>
          <span className="stat-hint">{nomeMes}</span>
        </div>
        <div className="stat">
          <span className="stat-label">Despesas</span>
          <span className="stat-value">{formatCurrency(resumo.despesasMes)}</span>
          <span className="stat-hint">{nomeMes}</span>
        </div>
        <div className="stat">
          <span className="stat-label">Guardado em metas</span>
          <span className="stat-value">{formatCurrency(resumo.guardado)}</span>
          <span className="stat-hint">{goals.length} {goals.length === 1 ? 'meta' : 'metas'}</span>
        </div>
      </section>

      {vazio ? (
        <section className="panel onboarding">
          <h2>Comece pelo básico</h2>
          <p>
            Sua conta está vazia. Registre uma receita ou despesa para ver o saldo
            e os gastos por categoria, ou crie uma meta de economia.
          </p>
          <div className="onboarding-actions">
            <button className="btn btn-primary" onClick={() => setModal('tx')}>Registrar transação</button>
            <button className="btn btn-secondary" onClick={() => setModal('goal')}>Criar meta</button>
          </div>
        </section>
      ) : (
        <div className="dash-grid">
          <section className="panel">
            <div className="panel-header">
              <h2>Últimas transações</h2>
              <Link to="/transacoes" className="link-muted">Ver todas</Link>
            </div>
            {resumo.recentes.length === 0 ? (
              <p className="empty">Nenhuma transação registrada.</p>
            ) : (
              <TxTable items={resumo.recentes} />
            )}
          </section>

          <div className="dash-side">
            <section className="panel">
              <div className="panel-header">
                <h2>Gastos por categoria</h2>
                <span className="panel-meta">{nomeMes}</span>
              </div>
              {resumo.categoriasMes.length === 0 ? (
                <p className="empty">Sem despesas neste mês.</p>
              ) : (
                <ul className="breakdown">
                  {resumo.categoriasMes.map((c) => (
                    <li key={c.id}>
                      <div className="breakdown-row">
                        <span>{c.nome}</span>
                        <span className="num">{formatCurrency(c.valor)}</span>
                      </div>
                      <div className="meter"><div style={{ width: `${c.pct}%` }} /></div>
                    </li>
                  ))}
                </ul>
              )}
            </section>

            <section className="panel">
              <div className="panel-header">
                <h2>Metas</h2>
                <Link to="/metas" className="link-muted">Gerenciar</Link>
              </div>
              {goals.length === 0 ? (
                <p className="empty">
                  Nenhuma meta criada. <button className="link-button" onClick={() => setModal('goal')}>Criar meta</button>
                </p>
              ) : (
                <ul className="breakdown">
                  {goals.slice(0, 4).map((g) => {
                    const pct = Math.min(100, (g.valorAtual / g.valorAlvo) * 100);
                    return (
                      <li key={g.id}>
                        <div className="breakdown-row">
                          <span>{g.titulo}</span>
                          <span className="num muted">{Math.round(pct)}%</span>
                        </div>
                        <div className="meter meter-goal"><div style={{ width: `${pct}%` }} /></div>
                      </li>
                    );
                  })}
                </ul>
              )}
            </section>
          </div>
        </div>
      )}

      {modal === 'tx' && <TransactionModal onClose={() => setModal(null)} />}
      {modal === 'goal' && <GoalModal onClose={() => setModal(null)} />}
    </Layout>
  );
}
