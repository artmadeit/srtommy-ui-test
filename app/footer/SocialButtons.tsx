import React from 'react';

interface SocialButtonsProps {
  links: { src: string; alt: string }[];
}

const SocialButtons: React.FC<SocialButtonsProps> = ({ links }) => {
  return (
    <section className="social-section">
      <h2 className="section-title">SÍGUENOS EN</h2>
      <div className="social-buttons">
        {links.map((link, index) => (
          <img key={index} loading="lazy" src={link.src} alt={link.alt} className="social-icon" />
        ))}
      </div>
      <style jsx>{`
        .social-section {
          flex: 1;
        }
        .section-title {
          margin-top: 20px;
          color: #fff;
          font-size: 1em;
          font-weight: bold;
          font-family: Helvetica;
        }
        .social-buttons {
          display: flex;
          flex-direction: row;
          margin-top: 20px;
        }
        .social-icon {
          width: 41px;
          height: 41px;
          margin-right: 10px;
          object-fit: contain;
        }
      `}</style>
    </section>
  );
};

export default SocialButtons;