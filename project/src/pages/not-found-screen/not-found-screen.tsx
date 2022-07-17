import {Link} from 'react-router-dom';
import Footer from '../../components/footer/footer';
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
          <Link to="/">Go back to the main page</Link>
        </section>
      </main>

      <Footer />
    </div>
  );
}

export default NotFoundScreen;
