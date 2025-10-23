import React from "react";

interface ContactInfoProps {
  email: string;
  phone: string;
}

const ContactInfo: React.FC<ContactInfoProps> = ({ email, phone }) => {
  return (
    <section className="contact-section">
      <h2 className="section-title">CONTACTO</h2>
      <p className="contact-media">{email}</p>
      <p className="contact-media">Consultas al: {phone}</p>
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
        }
      `}</style>
    </section>
  );
};

export default ContactInfo;
