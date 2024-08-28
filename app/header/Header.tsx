"use client";

import React from "react";
import Logo from "./Logo";
import Navigation from "./Navigation";
import CallToAction from "./CallToAction";
// import MobileMenu from "./MobileMenu";

interface HeaderProps {
  logoSrc: string;
  navItems: Array<{ label: string; href: string }>;
}

const Header: React.FC<HeaderProps> = ({ logoSrc, navItems }) => {
  return (
    <div className="header-box">
      <header className="header">
        <div className="header-content">
          <Logo src={logoSrc} alt="Company Logo" />
          <Navigation items={navItems} />
          <CallToAction />
        </div>
        {/* <MobileMenu /> */}
      </header>
      <style jsx>{`
        .header-box {
          padding: 8px 20px 8px 20px;
          display: flex;
          flex-direction: column;
          position: relative;
          flex-shrink: 0;
          box-sizing: border-box;
          height: auto;
          flex-grow: 0;
          box-shadow: 1px 2px 8px 1px rgba(0, 0, 0, 0.12);
        }
        // .header {
        //   display: flex;
        //   flex-direction: row;
        //   width: 100%;
        // }
        .header-content {
          position: relative;
          // align-self: stretch;
          display: flex;
          flex-direction: row;
          // gap: 20px;
          justify-content: space-between;
          width: 100%;
          align-items: center;
          margin: 12px 0;
        }
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
