import React, { useState } from "react";
import emailjs from "emailjs-com";
import { emailJsCredentials } from "../../../config/env-config";
import { RoughNotation, RoughNotationGroup } from "react-rough-notation";

import "./Home.styles.scss";

import TeacherImage1 from "../../../assets/img/teacher-1.svg";
import ContactImage1 from "../../../assets/img/contact-1.svg";
import Logo from "../../../assets/img/logo.svg";
import Instagram from "../../../assets/img/instagram.svg";
import LinkedIn from "../../../assets/img/linkedin.svg";
import Email from "../../../assets/img/email.svg";

import Mica from "../../../assets/img/team/foto-mica.png";
import Lucho from "../../../assets/img/team/foto-lucho.png";
import Lucas from "../../../assets/img/team/foto-lacqua.png";
import Isa from "../../../assets/img/team/foto-isa.png";
import Marce from "../../../assets/img/team/foto-marce.png";

export const Home = () => {
  const [shouldUnderlineBenefits, setShouldUnderlineBenefits] = useState(false);
  const [shouldCircleMembers, setShouldCircleMembers] = useState(false);
  const [shouldHighlightContact, setShouldHighlightContact] = useState(false);

  const teamImages = [
    { name: "Lucas", img: Lucas },
    { name: "Luciano", img: Lucho },
    { name: "Micaela", img: Mica },
    { name: "Isaias", img: Isa },
    { name: "Marcelo", img: Marce },
  ];

  const benefits = [
    {
      title: "Plataforma accesible",
      description:
        "Nos enfocamos en que todos puedan utilizar la plataforma facilmente",
    },
    {
      title: "Motivación",
      description:
        "Facilitamos medios para mantener a los profesores y alumnos motivados",
    },
    {
      title: "Integral",
      description:
        "Damos todas las herramientas necesarias para dar clases a distancia",
    },
    {
      title: "Padres informados",
      description:
        "Estarán al tanto de las últimas novedades de la institución y sus hijos",
    },
    {
      title: "Más organización",
      description:
        "Desde la creación de recordatorios hasta dar aviso de algún evento",
    },
    {
      title: "Comodidad garantizada",
      description:
        "Nos dedicamos a dar la mejor experiencia para todos los usuarios",
    },
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

    if (window.scrollY > 245) {
      setShouldUnderlineBenefits(true);
    }

    if (window.scrollY > 1165) {
      setShouldCircleMembers(true);
    }

    if (window.scrollY > 2160) {
      setShouldHighlightContact(true);
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
              ¿Por qué elegirnos?
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
          <div>
            <h1>EducApp</h1>
            <RoughNotation
              show={true}
              type="underline"
              color="#8bd2b0"
              animationDelay={500}
              animationDuration={2000}
              iterations={5}
            >
              <h3>¡La escuela en tu casa!</h3>
            </RoughNotation>

            <h4>Una aplicación sencilla de usar y accesible para todos.</h4>
            <RoughNotation
              className="button-roughNotation"
              type="circle"
              show={true}
              animationDelay={2500}
              color={"#f5dc17"}
              animationDuration={2000}
              iterations={3}
              strokeWidth={2}
              padding={9}
            >
              <button
                className="button is-success is-rounded start-button is-large"
                onClick={() => scrollTo("contacto")}
              >
                ¡Me interesa!
              </button>
            </RoughNotation>
          </div>
          <img src={TeacherImage1} width="45%" />
        </div>
      </section>
      <section id="servicios">
        <div className="section-content">
          <h3>¿Por qué elegirnos?</h3>
          <div className="benefits-container">
            <RoughNotationGroup show={shouldUnderlineBenefits}>
              {benefits.map((benefit, i) => (
                <div key={i} className="card">
                  <div className="card-content">
                    <div className="content">
                      <RoughNotation order={i} type="underline">
                        <p>
                          <b>{benefit.title}</b>
                        </p>
                      </RoughNotation>
                      <p className="benefits-desc">{benefit.description}</p>
                    </div>
                  </div>
                </div>
              ))}
            </RoughNotationGroup>
          </div>
        </div>
      </section>
      <section id="quienes-somos">
        <div className="section-content container">
          <h3>¿Quiénes Somos?</h3>
          <p>
            Somos un grupo de estudiantes universitarios con el objetivo de
            solucionar distintas problemáticas que comenzaron a surgir al
            momento de dar clases a distancia, como por ejemplo: herramientas
            insuficientes, falta de atención, poca motivación, entre otras. Por
            estas razones, decidimos construir una aplicación que integre todas
            las herramientas educativas necesarias.
          </p>
          <p>
            Nuestra principal meta es lograr una{" "}
            <strong>inclusión total</strong>, enfocándonos en que personas con
            capacidades diferentes puedan utilizar nuestra aplicación.
          </p>
          <div className="team-images-container">
            <RoughNotationGroup show={shouldCircleMembers}>
              {teamImages.map((member, i) => (
                <div key={i} className="team-image-container">
                  <RoughNotation
                    order={i}
                    type="circle"
                    animationDelay={500}
                    color="#f5dc17"
                    animationDuration={1000}
                    iterations={3}
                    strokeWidth={2}
                  >
                    <div>
                      <img src={member.img} className="member-image" />
                    </div>
                  </RoughNotation>
                  <p>{member.name}</p>
                </div>
              ))}
            </RoughNotationGroup>
          </div>
        </div>
      </section>
      <section id="contacto">
        <div className="section-content">
          <div className="contact-container">
            <h3>Contacto</h3>
            <RoughNotation
              show={shouldHighlightContact}
              type="highlight"
              color="#aadbc7"
              animationDuration={2000}
              animationDelay={500}
              iterations={3}
              strokeWidth={2}
              padding={10}
            >
              <p>
                Contactanos a través del <b>formulario</b> o nuestras
                <b> redes sociales.</b>
              </p>
            </RoughNotation>

            <div className="social-media">
              <a href="https://instagram.com/educapp.ar" target="blank">
                <img src={Instagram} width="40px" />
                instagram.com/educapp.ar
              </a>
              <a
                href="https://www.linkedin.com/company/educapp-ar"
                target="blank"
              >
                <img src={LinkedIn} width="40px" />
                linkedin.com/company/educapp-ar
              </a>
              <a href="mailto:contacto.educapp@gmail.com">
                <img src={Email} width="40px" />
                contacto.educapp@gmail.com
              </a>
            </div>
            <form onSubmit={(e) => sendEmail(e)}>
              <input
                className="input"
                type="text"
                name="from_name"
                placeholder="Nombre*"
                required
              />
              <input
                className="input"
                type="email"
                name="reply_to"
                placeholder="Email*"
                required
              />
              <input
                className="input"
                type="text"
                name="institution"
                placeholder="Nombre de la institución (opcional)"
              />
              <RoughNotation
                className="button-container"
                show={shouldHighlightContact}
                type="circle"
                color="#1eaac3"
                animationDuration={2000}
                animationDelay={2500}
                iterations={3}
                strokeWidth={2}
                padding={10}
              >
                <button className="button is-warning is-rounded" type="submit">
                  Enviar
                </button>
              </RoughNotation>
            </form>
          </div>
          <img src={ContactImage1} width="55%" />
        </div>
      </section>
      <footer className="footer landing-footer">
        <div className="content has-text-centered">
          <div className="footer-nav-container">
            <div className="logo">
              <a onClick={() => scrollTo("inicio")}>
                <img src={Logo} width="40px" />
              </a>
              <h3>EducApp</h3>
            </div>
            <div className="footer-nav">
              <a className="navbar-item" onClick={() => scrollTo("inicio")}>
                Inicio
              </a>
              <a className="navbar-item" onClick={() => scrollTo("servicios")}>
                ¿Por qué elegirnos?
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
          <div className="social-media">
            <h4>Contactanos</h4>
            <a href="https://instagram.com/educapp.ar" target="blank">
              <img src={Instagram} width="25px" />
              instagram.com/educapp.ar
            </a>
            <a
              href="https://www.linkedin.com/company/educapp-ar"
              target="blank"
            >
              <img src={LinkedIn} width="25px" />
              linkedin.com/company/educapp-ar
            </a>
            <a href="mailto:contacto.educapp@gmail.com">
              <img src={Email} width="25px" />
              contacto.educapp@gmail.com
            </a>
          </div>
        </div>
      </footer>
    </div>
  );
};
