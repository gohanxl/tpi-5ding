import React from "react";
import { Routes } from "./App.routes";
import { Sidebar } from "./modules/shared-components/Sidebar/Sidebar.component";
import './App.styles.scss'

export const App = () => {
  return (
    <div>
      <header>
        <nav className="navbar is-info" role="navigation" aria-label="main navigation">
          <div className="navbar-brand">
            <a className="navbar-item" href="/home">
              <img
                src="https://bulma.io/images/bulma-logo.png"
                alt="Bulma: Free, open source, and modern CSS framework based on Flexbox"
                width="112"
                height="28"
              />
            </a>
          </div>
        </nav>
      </header>
      <div className="App is-flex">
        <div>
          <Sidebar />
        </div>
        <div className="app-container">
          <div className="app-content">
            <Routes />
          </div>
          <footer className="footer">
            <p className="has-text-centered">Created by <b>5ding</b></p>
          </footer>
        </div>
      </div>
    </div>
  );
};
