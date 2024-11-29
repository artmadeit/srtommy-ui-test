import React from 'react';

interface LegalLinksProps {
  links: { text: string; href: string }[];
}

const LegalLinks: React.FC<LegalLinksProps> = ({ links }) => {
  return (
    <section className="legal-section">
      <h2 className="section-title">LEGAL</h2>
      <nav>
        <ul className="legal-links">
          {links.map((link, index) => (
            <li key={index}>
              <a href={link.href} className="legal-link">
                {link.text}
              </a>
            </li>
          ))}
        </ul>
      </nav>
      <style jsx>{`
        .legal-section {
          flex: 1;
        }
        .section-title {
          margin-top: 20px;
          color: #fff;
          font-size: 1em;
          font-weight: bold;
          font-family: Helvetica;
        }
        .legal-links {
          list-style-type: none;
          padding: 0;
          margin: 0;
        }
        .legal-link {
          display: block;
          margin-top: 20px;
          color: #fff;
          font-size: 15px;
          text-decoration: none;
          font-family: Helvetica;
        }
      `}</style>
    </section>
  );
};

export default LegalLinks;