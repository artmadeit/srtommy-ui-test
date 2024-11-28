import React from "react";

const CallToAction: React.FC = () => {
  return (
    <div className="cta-container">
      <button className="cta-button">Solicita una demo</button>
      <div className="divider" />
      <div className="action-buttons">
        <button className="login-button">Iniciar sesión</button>
        <a href="#price" className="product-link">
          Obtén el Producto
        </a>
      </div>
      <style jsx>{`
        .cta-container {
          position: relative;
          display: flex;
          flex-direction: row;
          flex-grow: 0;
          width: auto;
          margin: 1px 0 0 auto;
        }
        .cta-button,
        .login-button,
        .product-link {
          all: unset;
          position: relative;
          display: flex;
          flex-direction: column;
          appearance: none;
          border-radius: 4px;
          text-align: center;
          cursor: pointer;
          flex-grow: 0;
          padding: 12px;
          font-family: Helvetica;
        }
        .cta-button,
        .login-button {
          color: rgba(78, 77, 77, 1);
        }
        .cta-button {
          margin: 0 16px 0 auto;
        }
        .divider {
          display: flex;
          flex-direction: column;
          position: relative;
          height: 32px;
          width: 2px;
          background-color: rgba(207, 207, 207, 1);
          margin: auto 0;
        }
        .action-buttons {
          position: relative;
          display: flex;
          flex-direction: row;
          margin-left: 16px;
          gap: 16px;
        }
        .product-link {
          background-color: black;
          color: white;
          text-decoration: none;
        }
        @media (max-width: 991px) {
          .cta-container {
            display: none;
          }
        }
        @media (max-width: 640px) {
          .cta-container {
            display: none;
          }
        }
      `}</style>
    </div>
  );
};

export default CallToAction;
