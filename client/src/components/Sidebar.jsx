import { NavLink, useNavigate } from 'react-router-dom';
import { useApp } from '../context/AppContext';
import Icon from './Icon';
import Logo from './Logo';

const links = [
  { to: '/', label: 'Visão geral', icon: 'overview', end: true },
  { to: '/transacoes', label: 'Transações', icon: 'transactions' },
  { to: '/metas', label: 'Metas', icon: 'target' },
  { to: '/perfil', label: 'Perfil', icon: 'user' },
];

function initials(nome = '') {
  const parts = nome.trim().split(/\s+/).filter(Boolean);
  return ((parts[0]?.[0] || '') + (parts.length > 1 ? parts[parts.length - 1][0] : '')).toUpperCase();
}

export default function Sidebar() {
  const { logout, currentUser } = useApp();
  const navigate = useNavigate();

  function handleLogout() {
    logout();
    navigate('/login');
  }

  return (
    <aside className="sidebar">
      <div className="sidebar-brand">
        <Logo />
        <button className="icon-btn mobile-only" onClick={handleLogout} aria-label="Sair">
          <Icon name="logout" />
        </button>
      </div>

      <nav className="sidebar-nav">
        {links.map((l) => (
          <NavLink
            key={l.to}
            to={l.to}
            end={l.end}
            className={({ isActive }) => 'nav-link' + (isActive ? ' active' : '')}
          >
            <Icon name={l.icon} />
            <span>{l.label}</span>
          </NavLink>
        ))}
      </nav>

      <div className="sidebar-footer">
        <div className="user-chip">
          <div className="avatar">{initials(currentUser?.nome)}</div>
          <div className="user-chip-text">
            <strong>{currentUser?.nome}</strong>
            <span>{currentUser?.email}</span>
          </div>
        </div>
        <button className="nav-link nav-button" onClick={handleLogout}>
          <Icon name="logout" />
          <span>Sair</span>
        </button>
      </div>
    </aside>
  );
}
