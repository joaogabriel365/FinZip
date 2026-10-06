import { useApp } from '../context/AppContext';
import { formatCurrency, formatDate } from '../utils/format';
import Icon from './Icon';

export default function TxTable({ items, onEdit, onDelete }) {
  const { categorias } = useApp();
  const withActions = Boolean(onEdit || onDelete);

  return (
    <table className={'tx-table' + (withActions ? ' with-actions' : '')}>
      <thead>
        <tr>
          <th>Descrição</th>
          <th className="col-cat">Categoria</th>
          <th className="col-date">Data</th>
          <th className="num">Valor</th>
          {withActions && <th aria-label="Ações" />}
        </tr>
      </thead>
      <tbody>
        {items.map((t) => {
          const cat = categorias.find((c) => c.id === t.categoriaId);
          return (
            <tr key={t.id}>
              <td>
                <div className="tx-desc">
                  <span className={`tx-badge ${t.tipo}`}>
                    <Icon name={t.tipo === 'receita' ? 'arrowUp' : 'arrowDown'} size={14} />
                  </span>
                  <div>
                    <div className="tx-title">{t.descricao}</div>
                    <div className="tx-meta">{cat?.nome} · {formatDate(t.data)}</div>
                  </div>
                </div>
              </td>
              <td className="col-cat">{cat?.nome}</td>
              <td className="col-date">{formatDate(t.data)}</td>
              <td className={`num amount ${t.tipo}`}>
                {t.tipo === 'receita' ? '+' : '−'}{formatCurrency(t.valor)}
              </td>
              {withActions && (
                <td className="row-actions">
                  <button className="icon-btn" onClick={() => onEdit(t)} aria-label="Editar">
                    <Icon name="edit" size={16} />
                  </button>
                  <button className="icon-btn icon-btn-danger" onClick={() => onDelete(t)} aria-label="Excluir">
                    <Icon name="trash" size={16} />
                  </button>
                </td>
              )}
            </tr>
          );
        })}
      </tbody>
    </table>
  );
}
