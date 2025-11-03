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
        <div className="logo-container">
          <input type="checkbox" id="check" />
          <label htmlFor="check" className="checkbtn">
            <MenuIcon />
          </label>

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
            {/* <a href="#price" className="product-link">
                      Obtén el Producto
                    </a> */}
          </div>
          {/* </div> */}

          {/* </div> */}
          {/* <Logo src={bowTie} alt="Company Logo" /> */}
          {/* <Navigation items={navItems} /> */}
          {/* <CallToAction /> */}
        </div>
        {/* <MobileMenu /> */}
      </header>
      <style jsx>{`
        .header-box {
          box-sizing: border-box;
          padding: 8px 20px 8px 20px;
        }

        .header {
          display: flex;
          justify-content: space-between;
          margin: 12px 0;
        }

        .logo-container {
          display: flex;
          align-items: center;
        }

        .cta-container {
          display: flex;
          align-items: center;
        }

        .cta-button,
        .login-button {
          background: none;
          border: none;
          cursor: pointer;
          font-family: Helvetica;
        }

        .login-button {
          background-color: black;
          color: white;
          padding: 12px;
          border-radius: 4px;
        }

        .checkbtn {
          cursor: pointer;
          display: none;
        }

        #check {
          display: none;
        }

        // .divider {
        //   display: flex;
        //   flex-direction: column;
        //   // position: relative;
        //   height: 32px;
        //   width: 2px;
        //   background-color: rgba(207, 207, 207, 1);
        //   margin: auto 0;
        // }

        //estilos comentados
        // .header {
        //   display: flex;
        //   flex-direction: row;
        //   width: 100%;
        // }

        .header-box {
          // padding: 8px 20px 8px 20px;
          // display: flex;
          // flex-direction: column;
          // position: relative;
          // flex-shrink: 0;
          // box-sizing: border-box;
          // height: auto;
          // flex-grow: 0;
          // box-shadow: 1px 2px 8px 1px rgba(0, 0, 0, 0.12);
        }
        .header-content {
          // position: relative;
          // align-self: stretch;
          // display: flex;
          // flex-direction: row;
          // gap: 20px;
          // justify-content: space-between;
          // width: 100%;
          // align-items: center;
          // margin: 12px 0;
        }

        //media queries
        @media (max-width: 991px) {
          .header {
            justify-content: flex-start;
            align-items: flex-start;
          }
        }
        @media (max-width: 640px) {
          .header {
            align-items: center;
          }
        }
      `}</style>
    </div>
  );
};

export default Header;
