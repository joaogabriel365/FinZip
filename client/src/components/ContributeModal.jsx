import { useState } from 'react';
import { useApp } from '../context/AppContext';
import { formatCurrency, parseValor } from '../utils/format';
import Modal from './Modal';

export default function ContributeModal({ goal, onClose }) {
  const { contributeToGoal } = useApp();
  const [valor, setValor] = useState('');
  const [modo, setModo] = useState('adicionar');
  const [error, setError] = useState('');

  const falta = Math.max(0, goal.valorAlvo - goal.valorAtual);

  function handleSubmit(e) {
    e.preventDefault();
    const valorNum = parseValor(valor);
    if (!valorNum || valorNum <= 0) return setError('Informe um valor válido.');
    if (modo === 'retirar' && valorNum > goal.valorAtual) {
      return setError(`Você só tem ${formatCurrency(goal.valorAtual)} guardados nessa meta.`);
    }
    contributeToGoal(goal.id, modo === 'retirar' ? -valorNum : valorNum);
    onClose();
  }

  return (
    <Modal title={goal.titulo} onClose={onClose}>
      <p className="modal-subtitle">
        {formatCurrency(goal.valorAtual)} guardados de {formatCurrency(goal.valorAlvo)}
        {falta > 0 && <> · faltam {formatCurrency(falta)}</>}
      </p>
      <form onSubmit={handleSubmit}>
        <div className="segmented segmented-full" role="tablist">
          {['adicionar', 'retirar'].map((m) => (
            <button
              key={m}
              type="button"
              role="tab"
              aria-selected={modo === m}
              className={modo === m ? 'active' : ''}
              onClick={() => setModo(m)}
            >
              {m === 'adicionar' ? 'Guardar' : 'Retirar'}
            </button>
          ))}
        </div>
        <div className="field">
          <label htmlFor="c-valor">Valor</label>
          <div className="input-prefix">
            <span>R$</span>
            <input
              id="c-valor"
              type="text"
              inputMode="decimal"
              placeholder="0,00"
              autoFocus
              value={valor}
              onChange={(e) => setValor(e.target.value)}
            />
          </div>
        </div>

        {error && <p className="error-text">{error}</p>}

        <div className="modal-actions">
          <button type="button" className="btn btn-secondary" onClick={onClose}>Cancelar</button>
          <button type="submit" className="btn btn-primary">Confirmar</button>
        </div>
      </form>
    </Modal>
  );
}
