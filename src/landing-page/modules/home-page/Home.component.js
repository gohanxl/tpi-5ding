import React from "react";
import "./Home.styles.scss";
import TeacherImage1 from "../../../assets/img/teacher-1.svg";

export const Home = () => {
  window.onscroll = function () {
    const navbar = document.getElementById("navbar");
    if (window.scrollY !== 0) {
      navbar.classList.remove("hide-navbar");
      navbar.classList.add("white-navbar");
    } else {
      navbar.classList.remove("white-navbar");
      navbar.classList.add("hide-navbar");
    }
  };

  const scrollTo = (elId) => {
    const element = document.getElementById(elId);
    element.scrollIntoView({ behavior: "smooth", block: "end" });
  };

  return (
    <div>
      <nav className="landing-nav navbar is-transparent" id="navbar">
        <div id="navbarExampleTransparentExample" className="navbar-menu">
          <div className="navbar-start">
            <a className="navbar-item" onClick={() => scrollTo("inicio")}>
              Inicio
            </a>
            <a className="navbar-item" onClick={() => scrollTo("servicios")}>
              Servicios
            </a>
            <a
              className="navbar-item"
              onClick={() => scrollTo("quienes-somos")}
            >
              ¿Quiénes Somos?
            </a>
            <a className="navbar-item" onClick={() => scrollTo("contacto")}>
              Contacto
            </a>
          </div>
        </div>
      </nav>
      <section id="inicio">
        <div>
          <h1>EducApp</h1>
          <h3>Gestión total para tu escuela</h3>
          <p>
            Amet ea ea et est aute commodo cillum cillum nulla nulla. Quis
            mollit cillum ut ex sit sunt aliquip quis magna cupidatat officia ut
            amet tempor. Commodo officia laborum sint minim adipisicing in
            nostrud officia proident laboris cillum pariatur ea commodo.
          </p>
          <button
            className="button is-success start-button"
            onClick={() => scrollTo("contacto")}
          >
            ¡Comenzá ya!
          </button>
        </div>
        <div>
          <img src={TeacherImage1} width="100%" height="100%" />
        </div>
      </section>
      <section id="servicios">
        <div>
          <p>Servicios</p>
        </div>
      </section>
      <section id="quienes-somos">
        <div>
          <p>¿Quiénes Somos?</p>
        </div>
      </section>
      <section id="contacto">
        <div>
          <p>Contacto</p>
        </div>
      </section>
    </div>
  );
};
