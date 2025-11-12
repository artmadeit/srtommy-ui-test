"use client";

import React from "react";
import SocialButtons from "./SocialButtons";
import ContactInfo from "./ContactInfo";
import LegalLinks from "./LegalLinks";

interface FooterProps {
  socialLinks: { src: string; alt: string }[];
  contactEmail: string;
  contactPhone: string;
  legalLinks: { text: string; href: string }[];
}

const Footer: React.FC<FooterProps> = ({
  socialLinks,
  contactEmail,
  contactPhone,
  legalLinks,
}) => {
  return (
    <footer className="footer" id="footer-contact">
      <div className="footer-content">
        <div className="footer-columns">
          <SocialButtons links={socialLinks} />
          <ContactInfo email={contactEmail} phone={contactPhone} />
          <LegalLinks links={legalLinks} />
        </div>
      </div>
      <style jsx>{`
        .footer {
          display: flex;
          flex-direction: column;
          position: relative;
          margin-top: 20px;
          padding: 20px 0 30px;
          background-color: #000;
        }
        .footer-content {
          padding: 0 40px;
          margin: 0 40px 0 0;
        }
        .footer-columns {
          display: flex;
          gap: 20px;
        }
        @media (max-width: 991px) {
          .footer-columns {
            flex-direction: column;
            align-items: stretch;
            gap: 0;
          }
        }
      `}</style>
    </footer>
  );
};

export default Footer;

// import { Typography } from "@mui/material";

// export default function Footer() {
//   return (
// <div id="footer">
//   <div>
//     <Typography>SÍGUENOS EN</Typography>
//   </div>
//   <div>
//     <Typography>CONTACTO</Typography>
//     <p>info@sr-tommy.com</p>
//     <p>Consultas al: 941475889</p>
//   </div>
//   <div>
//     <Typography>LEGAL</Typography>
//     <p>Términos de servicio</p>
//     <p>Términos de uso</p>
//     <p>Privacidad</p>
//   </div>
// </div>
//   );
// }
