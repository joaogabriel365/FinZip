import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useApp } from '../context/AppContext';
import AuthLayout from '../components/AuthLayout';

export default function Cadastro() {
  const { register } = useApp();
  const navigate = useNavigate();
  const [nome, setNome] = useState('');
  const [email, setEmail] = useState('');
  const [senha, setSenha] = useState('');
  const [error, setError] = useState('');

  function handleSubmit(e) {
    e.preventDefault();
    if (!nome.trim()) return setError('Informe seu nome.');
    if (senha.length < 4) return setError('A senha precisa ter pelo menos 4 caracteres.');
    const result = register(nome, email, senha);
    if (!result.ok) return setError(result.error);
    navigate('/');
  }

  return (
    <AuthLayout
      title="Criar conta"
      subtitle="Leva menos de um minuto."
      footer={<>Já tem conta? <Link to="/login">Entrar</Link></>}
    >
      <form onSubmit={handleSubmit}>
        <div className="field">
          <label htmlFor="cad-nome">Nome</label>
          <input id="cad-nome" type="text" autoComplete="name" value={nome} onChange={(e) => setNome(e.target.value)} placeholder="Seu nome" required />
        </div>
        <div className="field">
          <label htmlFor="cad-email">E-mail</label>
          <input id="cad-email" type="email" autoComplete="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="voce@email.com" required />
        </div>
        <div className="field">
          <label htmlFor="cad-senha">Senha</label>
          <input id="cad-senha" type="password" autoComplete="new-password" value={senha} onChange={(e) => setSenha(e.target.value)} placeholder="Mínimo de 4 caracteres" required />
        </div>
        {error && <p className="error-text">{error}</p>}
        <button type="submit" className="btn btn-primary btn-block btn-lg">Criar conta</button>
      </form>
    </AuthLayout>
  );
}
