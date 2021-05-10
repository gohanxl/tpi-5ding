import React, {useEffect} from "react";
import { Routes } from "./App.routes";
import { Sidebar } from "./modules/shared-components/Sidebar/Sidebar.component";
import './App.styles.scss'
import { useAuth0 } from "@auth0/auth0-react";
import loading from "./loading.svg";
import { useDispatch } from 'react-redux';
import { setUser } from "./modules/user/store/user.actions";


const Loading = () => (
    <div className="spinner">
      <img src={loading} alt="Loading" />
    </div>
);


export const App = () => {
  const dispatch = useDispatch();
  const {
      user,
      isAuthenticated,
      loginWithRedirect,
      logout,
      error,
      isLoading,
      getAccessTokenSilently
  } = useAuth0();

    useEffect(() => {
        if (isAuthenticated) {
          getAccessTokenSilently()
          .then(token => 
              dispatch(setUser({
                ['token']: token,
                ['metadata']: user
               }))
            )
          .catch(err => console.log(err))
        }
    }, [isAuthenticated]);

    if (error) {
        return <div>Oops... {error.message}</div>;
    }

    if (isLoading) {
        return <Loading />;
    }

  return (
    <div>
      <header>
        <nav className="navbar is-info" role="navigation" aria-label="main navigation">
          <div className="navbar-brand">
            <a className="navbar-item" href="https://bulma.io">
              <img
                src="https://bulma.io/images/bulma-logo.png"
                alt="Bulma: Free, open source, and modern CSS framework based on Flexbox"
                width="112"
                height="28"
              />
            </a>

            <a
              role="button"
              className="navbar-burger"
              aria-label="menu"
              aria-expanded="false"
            >
              <span aria-hidden="true"></span>
              <span aria-hidden="true"></span>
              <span aria-hidden="true"></span>
            </a>
            {isAuthenticated &&
            <button onClick={() => logout({ returnTo: window.location.origin })}>
              Log Out
            </button>
            }

          </div>
        </nav>
      </header>
      <div className="App is-flex">
        <div>
          <Sidebar />
        </div>
        <div className="">
          {isAuthenticated && <Routes />}
          {!isAuthenticated && loginWithRedirect()}
        </div>
      </div>
    </div>
  );
};
