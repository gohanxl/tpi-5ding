import React, { useState } from "react";
import emailjs from "emailjs-com";
import { emailJsCredentials } from "../../../config/env-config";
import { RoughNotation, RoughNotationGroup } from "react-rough-notation";

import "./Home.styles.scss";

import TeacherImage1 from "../../../assets/img/teacher-1.svg";
import ContactImage1 from "../../../assets/img/contact-1.svg";
import Logo from "../../../assets/img/logo.svg";

import Mica from "../../../assets/img/team/foto-mica.png";
import Lucho from "../../../assets/img/team/foto-lucho.png";
import Lucas from "../../../assets/img/team/foto-lacqua.png";
import Isa from "../../../assets/img/team/foto-isa.png";
import Marce from "../../../assets/img/team/foto-marce.png";

export const Home = () => {
  const [shouldUnderlineBenefits, setShouldUnderlineBenefits] = useState(false);
  const [shouldCircleMembers, setShouldCircleMembers] = useState(false);

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
        "Nos enfocamos en brindar oportunidad de uso para toda persona",
    },
    {
      title: "Comunicación más fluida",
      description:
        "Mayor facilidad para conectar con integrantes de la institución",
    },
    {
      title: "Padres informados",
      description:
        "Estarán al tanto de las últimas novedades de la institución y sus hijos",
    },
    {
      title: "Todo en uno",
      description: "Asistencias, notas, eventos y más en un solo lugar",
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
          <h1>EducApp</h1>
          <h3>¡La escuela en tu casa!</h3>
          <h4>Una aplicacion sencilla de usar, accesible para todxs</h4>
          <RoughNotation
            className="roughNotation"
            type="circle"
            show={true}
            animationDelay={500}
            color={"#8bd1af"}
            animationDuration={3000}
            iterations={3}
            strokeWidth={2}
            padding={15}
          >
            <button
              className="button is-success is-rounded start-button is-medium"
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
            Somos un grupo de estudiantes universitarios enfocados en solucionar
            distintas problemáticas al momento de dar clases a distancia, por
            ejemplo: herramientas insuficientes, falta de atención en las
            clases, poca motivación, entre otras. Por estas razones, decidimos
            construir una aplicación que integre todas las herramientas
            educativas necesarias.
          </p>
          <p>
            Además nos esforzamos en lograr una <strong>inclusión total</strong>
            , enfocándonos en que personas con capacidades diferentes puedan
            utilizar nuestra aplicación.
          </p>
          <div className="team-images-container">
            <RoughNotationGroup show={shouldCircleMembers}>
              {teamImages.map((member, i) => (
                <div key={i} className="team-image-container">
                  <RoughNotation
                    order={i}
                    type="circle"
                    animationDelay={500}
                    color="#b8e3ec"
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
          <div>
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
          <div>
            <img src={ContactImage1} width="100%" height="100%" />
          </div>
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
