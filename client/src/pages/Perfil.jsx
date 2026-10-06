import { useState } from 'react';
import Layout from '../components/Layout';
import { useApp } from '../context/AppContext';
import { formatDate } from '../utils/format';

export default function Perfil() {
  const { currentUser, updateProfile } = useApp();
  const [nome, setNome] = useState(currentUser?.nome || '');
  const [email, setEmail] = useState(currentUser?.email || '');
  const [saved, setSaved] = useState(false);

  function handleSubmit(e) {
    e.preventDefault();
    updateProfile({ nome: nome.trim(), email: email.trim().toLowerCase() });
    setSaved(true);
    setTimeout(() => setSaved(false), 2500);
  }

  return (
    <Layout>
      <header className="page-header">
        <div>
          <h1>Perfil</h1>
          <p className="page-subtitle">Conta criada em {formatDate(currentUser?.dataCriacao)}</p>
        </div>
      </header>

      <section className="panel panel-narrow">
        <div className="panel-header">
          <h2>Dados pessoais</h2>
        </div>
        <form onSubmit={handleSubmit}>
          <div className="field">
            <label htmlFor="p-nome">Nome</label>
            <input id="p-nome" type="text" value={nome} onChange={(e) => setNome(e.target.value)} required />
          </div>
          <div className="field">
            <label htmlFor="p-email">E-mail</label>
            <input id="p-email" type="email" value={email} onChange={(e) => setEmail(e.target.value)} required />
          </div>
          <div className="form-footer">
            {saved && <span className="success-text">Alterações salvas.</span>}
            <button type="submit" className="btn btn-primary">Salvar alterações</button>
          </div>
        </form>
      </section>
    </Layout>
  );
}
