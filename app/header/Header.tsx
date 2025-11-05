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
          padding: 8px 20px 8px 20px;
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

        .cta-button {
          margin-right: 10px;
        }

        .cta-button,
        .login-button {
          background: none;
          border: none;
          cursor: pointer;
          font-size: 16px;
          font-family: "Helvetica Neue", Helvetica, Arial, sans-serif;
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
        @media (max-width: 850px) {
          .cta-button,
          .login-button {
            font-size: 13px;
          }
        }

        @media (max-width: 640px) {
          .header-box {
            padding: 0;
          }

          header {
            flex-direction: row;
            justify-content: space-between;
            align-items: center;
          }

          .cta-button {
            margin: 0px;
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
            height: 90vh;
            gap: 10px;
            padding: 20px 0;
            background-color: #f8f8f8;
          }

          /* 3. Aparece el menú */
          #check:checked ~ .cta-container {
            display: flex;
          }
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
