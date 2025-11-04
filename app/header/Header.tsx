"use client";

import React from "react";
// import Logo from "./Logo";
import Image, { StaticImageData } from "next/image";
import Link from "next/link";
// import Navigation from "./Navigation";
// import CallToAction from "./CallToAction";
// import MobileMenu from "./MobileMenu";
import bowTie from "../bow-tie.webp";
import MenuIcon from "@mui/icons-material/Menu";

interface HeaderProps {
  navItems: Array<{ label: string; href: string }>;
  src: StaticImageData;
  alt: string;
}

const Header: React.FC<HeaderProps> = ({ navItems, src, alt }) => {
  return (
    <div className="header-box">
      <header className="header">
        {/* <div className="header-content"> */}
        {/* <div className="logo-wrapper"> */}
        <input type="checkbox" id="check" />
        <label htmlFor="check" className="checkbtn">
          <MenuIcon />
        </label>
        <div className="logo-container">
          <Link href="/">
            <Image
              style={{ width: "60px", height: "60px" }}
              src={src}
              alt={alt}
              className="logo"
            />
          </Link>
        </div>
        <div className="cta-container">
          <button className="cta-button">Solicita una demo</button>
          <div className="divider" />
          <div className="action-buttons">
            <Link href="/portal" style={{ textDecoration: "none" }}>
              <button className="login-button">Iniciar sesión</button>
            </Link>
          </div>
        </div>
        {/* <MobileMenu /> */}
      </header>

      <style jsx>{`
        .header-box {
          box-sizing: border-box;
          // padding: 8px 20px 8px 20px;
          // box-shadow: 1px 2px 8px 1px rgba(0, 0, 0, 0.12);
        }

        .header {
          display: flex;
          justify-content: space-between;
          align-items: center;
          margin: 12px 0;
          position: relative;
        }

        .logo-container,
        .cta-container {
          display: flex;
          align-items: center;
          //order:1
        }

        // .cta-container {
        //   display: flex; /* Visible en desktop */
        //   align-items: center;
        //   order: 2;
        // }

        // /* Logo: Hacerlo siempre responsive a su contenedor */
        // .logo-container img {
        //   /* Esto sobreescribe el style inline y lo hace flexible */
        //   width: 100% !important;
        //   height: auto !important;
        // }

        // /* Contenedor del logo para controlar su tamaño máximo */
        // .logo-container > a {
        //   width: 60px; /* Tamaño fijo para desktop */
        //   height: 60px;
        // }

        .cta-button,
        .login-button {
          background: none;
          border: none;
          cursor: pointer;
          font-family: "Helvetica";
        }

        .login-button {
          background-color: black;
          color: white;
          padding: 12px;
          border-radius: 4px;
        }

        .checkbtn {
          display: none;
          cursor: pointer;
          margin-right: 15px;
        }

        #check {
          display: none;
        }

        // media queries
        @media (max-width: 640px) {
          header {
            flex-direction: row;
            justify-content: space-between;
            align-items: center;
          }

          /* 1. Mostramos el botón de menú hamburguesa */
          .checkbtn {
            display: block;
            order: 2;
          }

          .logo-container {
            order: 1;
          }

          /* 2. Ocultamos los botones de acción para móvil */
          .cta-container {
            display: none;
            flex-direction: column;
            position: absolute;
            z-index: 1;
            top: 76px;
            width: 100%;
            height: 78vh;
            gap: 10px;
            padding: 20px 0;
            background-color: #f8f8f8;
          }
        }

        #check:checked ~ .cta-container {
          display: flex; /* NUEVO: Aparece el menú */
        }

        //   /* 3. Ajustamos el tamaño del logo en móvil */
        //   .logo-container > a {
        //     width: 45px; /* Reducimos el logo para móvil */
        //     height: 45px;
        //   }
        // }
      `}</style>
    </div>
  );
};

export default Header;
