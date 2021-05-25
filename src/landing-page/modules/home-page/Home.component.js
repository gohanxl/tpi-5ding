import React from "react";
import emailjs from "emailjs-com";
import { emailJsCredentials } from "../../../config/env-config";
import { RoughNotation } from "react-rough-notation";

import "./Home.styles.scss";
import TeacherImage1 from "../../../assets/img/teacher-1.svg";
import Logo from "../../../assets/img/logo.svg";

import Mica from "../../../assets/img/team/foto-mica.png";
import Lucho from "../../../assets/img/team/foto-lucho.png";
import Lucas from "../../../assets/img/team/foto-lacqua.png";
import Isa from "../../../assets/img/team/foto-isa.png";
import Marce from "../../../assets/img/team/foto-marce.png";

export const Home = () => {
  const teamImages = [
    { name: "Lucas", img: Lucas },
    { name: "Luciano", img: Lucho },
    { name: "Micaela", img: Mica },
    { name: "Isaias", img: Isa },
    { name: "Marcelo", img: Marce },
  ];

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

  function sendEmail(e) {
    e.preventDefault();

    emailjs
      .sendForm(
        emailJsCredentials.serviceId,
        emailJsCredentials.templateId,
        e.target,
        emailJsCredentials.userId
      )
      .then(
        (result) => {
          console.log(result.text);
        },
        (error) => {
          console.error(error.text);
        }
      );
  }

  return (
    <div>
      <nav className="landing-nav navbar is-transparent" id="navbar">
        <div id="navbarExampleTransparentExample" className="navbar-menu">
          <div className="navbar-start">
            <a onClick={() => scrollTo("inicio")}>
              <img src={Logo} width="40px" />
            </a>
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
        <div className="section-content">
          <h1>EducApp</h1>
          <h3>Gestión total para tu escuela</h3>
          <p>
            Amet ea ea et est aute commodo cillum cillum nulla nulla. Quis
            mollit cillum ut ex sit sunt aliquip quis magna cupidatat officia ut
            amet tempor. Commodo officia laborum sint minim adipisicing in
            nostrud officia proident laboris cillum pariatur ea commodo.
          </p>
          <RoughNotation
            className="roughNotation"
            type="circle"
            show={true}
            animationDelay={500}
            color={"#8bd1af"}
            animationDuration={2000}
            iterations={3}
            strokeWidth={2}
          >
            <button
              className="button is-success is-rounded start-button"
              onClick={() => scrollTo("contacto")}
            >
              ¡Comenzá ya!
            </button>
          </RoughNotation>
        </div>
        <div>
          <img src={TeacherImage1} width="100%" height="100%" />
        </div>
      </section>
      <section id="servicios">
        <div className="section-content">
          <div>
            <div className="card">
              <div className="card-content">
                <div className="content">
                  <p>Plataforma accesible</p>
                  <p>-Inserte texto sobre accesibilidad aquí-</p>
                </div>
              </div>
            </div>

            <div className="card">
              <div className="card-content">
                <div className="content">
                  <p>Comunicación más fluida</p>
                  <p>
                    Mayor facilidad para conectar con integrantes de la
                    institución
                  </p>
                </div>
              </div>
            </div>

            <div className="card">
              <div className="card-content">
                <div className="content">
                  <p>Padres informados</p>
                  <p>
                    Estarán al tanto de las últimas novedades de la institución
                    y sus hijos
                  </p>
                </div>
              </div>
            </div>

            <div className="card">
              <div className="card-content">
                <div className="content">
                  <p>Otro</p>
                  <p>-Inserte algun texto aquí-</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      <section id="quienes-somos">
        <div className="section-content">
          <h3>¿Quiénes Somos?</h3>
          <p>
            Somos un grupo de estudiantes universitarios enfocados en solucionar
            una problematica que surgió a partir de la necesidad de realizar las
            clases a larga distancia. --Amet ea ea et est aute commodo cillum
            cillum nulla nulla. Quis mollit cillum ut ex sit sunt aliquip quis
            magna cupidatat officia ut amet tempor. Commodo officia laborum sint
            minim adipisicing in--
          </p>
          <div className="team-images-container">
            {teamImages.map((member, i) => (
              <div key={i} className="team-image">
                <img src={member.img} width="100%" />
                <p>{member.name}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
      <section id="contacto">
        <div className="section-content">
          <h3>Contacto</h3>
          <p>
            Si tenés alguna consulta o estás interesado, no dudes en
            contactarnos.
          </p>
          <form onSubmit={(e) => sendEmail(e)}>
            <input
              className="input"
              type="text"
              name="from_name"
              placeholder="Nombre y apellido"
              required
            />
            <input
              className="input"
              type="text"
              name="user_phone"
              placeholder="Teléfono"
            />
            <input
              className="input"
              type="email"
              name="reply_to"
              placeholder="Email"
              required
            />
            <textarea
              className="textarea"
              name="message"
              placeholder="Mensaje"
              required
            />
            <button className="button is-warning is-rounded" type="submit">
              Enviar
            </button>
          </form>
        </div>
      </section>
      <footer className="footer">
        <div className="content has-text-centered">
          <p>
            Created by <b>5Ding</b>
          </p>
        </div>
      </footer>
    </div>
  );
};
