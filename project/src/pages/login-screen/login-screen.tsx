import {useState, FormEvent, ChangeEvent} from 'react';
import {Link} from 'react-router-dom';
import {useAppSelector, useAppDispatch} from '../../hooks';
import {getAuthorizationStatus} from '../../store/user-process/selectors';
import {changeCity} from '../../store/main-process/main-process';
import {redirectToRoute} from '../../store/action';
import {loginAction} from '../../store/api-actions';
import {AuthData} from '../../types/auth-data';
import {AppRoute, AuthorizationStatus, CITIES} from '../../const';
import Logo from '../../components/logo/logo';
import {toast} from 'react-toastify';

const checkEmailPattern = /^[a-zA-Z0-9+_.-]+@[a-zA-Z0-9.-]+$/;
const сheckPasswordPattern = /(.+\d+)|(\d+.+)/gm;
const randomIndex = Math.floor(Math.random() * (CITIES.length - 1));
const randomCity = CITIES[randomIndex];

function LoginScreen(): JSX.Element {
  const dispatch = useAppDispatch();
  const authorizationStatus = useAppSelector(getAuthorizationStatus);
  const [loginForm, setLoginForm] = useState({
    email: '',
    password: ''
  });

  if (authorizationStatus === AuthorizationStatus.Auth) {
    dispatch(redirectToRoute(AppRoute.Root));
  }

  const onSubmit = (authData: AuthData) => {
    dispatch(loginAction(authData));
  };

  const handleSubmit = (evt: FormEvent<HTMLFormElement>) => {
    evt.preventDefault();

    if (!checkEmailPattern.test(loginForm.email)) {
      toast('Please enter a valid email');
      return;
    }

    if (!сheckPasswordPattern.test(loginForm.password)) {
      toast('Please enter at least one letter and number');
      return;
    }

    onSubmit({
      login: loginForm.email,
      password: loginForm.password,
    });
  };

  return (
    <div className="page page--gray page--login">
      <header className="header">
        <div className="container">
          <div className="header__wrapper">
            <Logo />
          </div>
        </div>
      </header>

      <main className="page__main page__main--login">
        <div className="page__login-container container">
          <section className="login">
            <h1 className="login__title">Sign in</h1>
            <form
              className="login__form form"
              action=""
              method="post"
              onSubmit={handleSubmit}
            >
              <div className="login__input-wrapper form__input-wrapper">
                <label className="visually-hidden">E-mail</label>
                <input
                  className="login__input form__input"
                  type="email"
                  name="email"
                  placeholder="Email"
                  required
                  value={loginForm.email}
                  onChange={({target}: ChangeEvent<HTMLInputElement>) => {
                    setLoginForm({...loginForm, email: target.value});
                  }}
                />
              </div>
              <div className="login__input-wrapper form__input-wrapper">
                <label className="visually-hidden">Password</label>
                <input
                  className="login__input form__input"
                  type="password"
                  name="password"
                  placeholder="Password"
                  required
                  value={loginForm.password}
                  onChange={({target}: ChangeEvent<HTMLInputElement>) => {
                    setLoginForm({...loginForm, password: target.value});
                  }}
                />
              </div>
              <button className="login__submit form__submit button" type="submit">Sign in</button>
            </form>
          </section>
          <section className="locations locations--login locations--current">
            <div className="locations__item">
              <Link to="/" className="locations__item-link" onClick={() => dispatch(changeCity(randomCity))}>
                <span>{randomCity}</span>
              </Link>
            </div>
          </section>
        </div>
      </main>
    </div>
  );
}

export default LoginScreen;
