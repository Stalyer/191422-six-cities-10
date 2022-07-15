import Logo from '../../components/logo/logo';
import UserNav from '../../components/user-nav/user-nav';

function NotFoundScreen(): JSX.Element {
  return (
    <div className="page">
      <header className="header">
        <div className="container">
          <div className="header__wrapper">
            <Logo />
            <UserNav />
          </div>
        </div>
      </header>
      <main className="page__main">
        <section className="container not-found">
          <h1>404. Page not found</h1>
          <a href="/">Go back to the main page</a>
        </section>
      </main>
      <footer className="footer">
        <a className="footer__logo-link" href="/">
          <img className="footer__logo" src="img/logo.svg" alt="6 cities logo" width="64" height="33" />
        </a>
      </footer>
    </div>
  );
}

export default NotFoundScreen;
