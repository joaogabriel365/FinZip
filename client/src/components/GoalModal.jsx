import { useState } from 'react';
import { useApp } from '../context/AppContext';
import { parseValor } from '../utils/format';
import Modal from './Modal';

export default function GoalModal({ onClose }) {
  const { addGoal } = useApp();
  const [form, setForm] = useState({ titulo: '', valorAlvo: '', prazo: '' });
  const [error, setError] = useState('');

  function handleSubmit(e) {
    e.preventDefault();
    const valorNum = parseValor(form.valorAlvo);
    if (!form.titulo.trim()) return setError('Dê um nome para a meta.');
    if (!valorNum || valorNum <= 0) return setError('Informe um valor-alvo válido.');
    if (!form.prazo) return setError('Informe um prazo.');

    addGoal({ titulo: form.titulo.trim(), valorAlvo: valorNum, prazo: form.prazo });
    onClose();
  }

  return (
    <Modal title="Nova meta" onClose={onClose}>
      <form onSubmit={handleSubmit}>
        <div className="field">
          <label htmlFor="g-titulo">Nome da meta</label>
          <input
            id="g-titulo"
            type="text"
            placeholder="Ex: Viagem de fim de ano"
            autoFocus
            value={form.titulo}
            onChange={(e) => setForm({ ...form, titulo: e.target.value })}
          />
        </div>
        <div className="field-row">
          <div className="field">
            <label htmlFor="g-valor">Valor-alvo</label>
            <div className="input-prefix">
              <span>R$</span>
              <input
                id="g-valor"
                type="text"
                inputMode="decimal"
                placeholder="0,00"
                value={form.valorAlvo}
                onChange={(e) => setForm({ ...form, valorAlvo: e.target.value })}
              />
            </div>
          </div>
          <div className="field">
            <label htmlFor="g-prazo">Prazo</label>
            <input
              id="g-prazo"
              type="date"
              value={form.prazo}
              onChange={(e) => setForm({ ...form, prazo: e.target.value })}
            />
          </div>
        </div>

        {error && <p className="error-text">{error}</p>}

        <div className="modal-actions">
          <button type="button" className="btn btn-secondary" onClick={onClose}>Cancelar</button>
          <button type="submit" className="btn btn-primary">Criar meta</button>
        </div>
      </form>
    </Modal>
  );
}
