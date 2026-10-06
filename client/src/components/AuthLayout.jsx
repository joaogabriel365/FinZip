import Logo from './Logo';

export default function AuthLayout({ title, subtitle, children, footer }) {
  return (
    <div className="auth-screen">
      <section className="auth-aside">
        <Logo inverted />
        <div className="auth-aside-copy">
          <h1>Suas finanças, num zip.</h1>
          <p>
            Registre o que entra e o que sai, veja para onde vai o seu dinheiro
            e acompanhe suas metas de economia — sem planilha.
          </p>
        </div>
        <ul className="auth-aside-list">
          <li><strong>Transações</strong> receitas e despesas por categoria</li>
          <li><strong>Visão geral</strong> saldo e gastos do mês</li>
          <li><strong>Metas</strong> quanto falta para chegar lá</li>
        </ul>
      </section>

      <section className="auth-main">
        <div className="auth-form">
          <div className="auth-form-logo"><Logo /></div>
          <h2>{title}</h2>
          <p className="auth-subtitle">{subtitle}</p>
          {children}
          <p className="auth-footer">{footer}</p>
        </div>
      </section>
    </div>
  );
}
