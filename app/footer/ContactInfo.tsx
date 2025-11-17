import React from "react";
interface ContactInfoProps {
  email: string;
  phone: string;
}

const ContactInfo: React.FC<ContactInfoProps> = ({ email, phone }) => {
  return (
    <section className="contact-section">
      <h2 className="section-title">CONTACTO</h2>
      <p>
        <a href="mailto:mauricioandre91@gmail.com" className="contact-media">
          {email}
        </a>
      </p>
      <p>
        <a href="tel:+51941475889" className="contact-media">
          Consultas al: {phone}
        </a>
      </p>
      <style jsx>{`
        .contact-section {
          flex: 1;
        }
        .section-title {
          margin-top: 20px;
          color: #fff;
          font-size: 1em;
          font-weight: bold;
          font-family: Helvetica;
        }
        .contact-media {
          color: #fff;
          font-size: 15px;
          font-family: Helvetica;
          text-decoration: none;
        }
      `}</style>
    </section>
  );
};

export default ContactInfo;
