import { useState } from 'react';
import { useApp } from '../context/AppContext';
import { parseValor, todayISO } from '../utils/format';
import Modal from './Modal';

const emptyForm = { tipo: 'despesa', categoriaId: '', valor: '', data: '', descricao: '' };

export default function TransactionModal({ onClose, editingTx, defaultTipo }) {
  const { categorias, addTransaction, updateTransaction } = useApp();
  const [form, setForm] = useState(
    editingTx
      ? { ...editingTx, valor: String(editingTx.valor).replace('.', ',') }
      : { ...emptyForm, tipo: defaultTipo || 'despesa', data: todayISO() }
  );
  const [error, setError] = useState('');

  const categoriasFiltradas = categorias.filter((c) => c.tipo === form.tipo);

  function handleSubmit(e) {
    e.preventDefault();
    const valorNum = parseValor(form.valor);
    if (!form.categoriaId) return setError('Escolha uma categoria.');
    if (!valorNum || valorNum <= 0) return setError('Informe um valor válido.');
    if (!form.data) return setError('Informe a data.');

    const payload = {
      tipo: form.tipo,
      categoriaId: form.categoriaId,
      valor: valorNum,
      data: form.data,
      descricao: form.descricao.trim() || categorias.find((c) => c.id === form.categoriaId)?.nome,
    };

    if (editingTx) {
      updateTransaction(editingTx.id, payload);
    } else {
      addTransaction(payload);
    }
    onClose();
  }

  return (
    <Modal title={editingTx ? 'Editar transação' : 'Nova transação'} onClose={onClose}>
      <form onSubmit={handleSubmit}>
        <div className="segmented segmented-full" role="tablist">
          {['despesa', 'receita'].map((tipo) => (
            <button
              key={tipo}
              type="button"
              role="tab"
              aria-selected={form.tipo === tipo}
              className={form.tipo === tipo ? 'active' : ''}
              onClick={() => setForm({ ...form, tipo, categoriaId: '' })}
            >
              {tipo === 'despesa' ? 'Despesa' : 'Receita'}
            </button>
          ))}
        </div>

        <div className="field">
          <label htmlFor="tx-valor">Valor</label>
          <div className="input-prefix">
            <span>R$</span>
            <input
              id="tx-valor"
              type="text"
              inputMode="decimal"
              placeholder="0,00"
              autoFocus
              value={form.valor}
              onChange={(e) => setForm({ ...form, valor: e.target.value })}
            />
          </div>
        </div>

        <div className="field-row">
          <div className="field">
            <label htmlFor="tx-cat">Categoria</label>
            <select
              id="tx-cat"
              value={form.categoriaId}
              onChange={(e) => setForm({ ...form, categoriaId: e.target.value })}
            >
              <option value="">Selecione</option>
              {categoriasFiltradas.map((c) => (
                <option key={c.id} value={c.id}>{c.nome}</option>
              ))}
            </select>
          </div>
          <div className="field">
            <label htmlFor="tx-data">Data</label>
            <input
              id="tx-data"
              type="date"
              value={form.data}
              onChange={(e) => setForm({ ...form, data: e.target.value })}
            />
          </div>
        </div>

        <div className="field">
          <label htmlFor="tx-desc">Descrição <span className="optional">opcional</span></label>
          <input
            id="tx-desc"
            type="text"
            placeholder="Ex: Mercado do mês"
            value={form.descricao}
            onChange={(e) => setForm({ ...form, descricao: e.target.value })}
          />
        </div>

        {error && <p className="error-text">{error}</p>}

        <div className="modal-actions">
          <button type="button" className="btn btn-secondary" onClick={onClose}>Cancelar</button>
          <button type="submit" className="btn btn-primary">Salvar</button>
        </div>
      </form>
    </Modal>
  );
}
