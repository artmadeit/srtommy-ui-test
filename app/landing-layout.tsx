import Footer from "./footer/Footer";
import Header from "./header/Header";

export default function LandingLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div>
      <Header
        navItems={[
          {
            href: "#tools",
            label: "Herramientas",
          },
          {
            href: "#product",
            label: "Producto",
          },
          {
            href: "#price",
            label: "Precio",
          },
        ]}
        logoSrc="https://cdn.builder.io/api/v1/image/assets%2FYJIGb4i01jvw0SRdL5Bt%2F1bc483cb64c5410099c519ed6e11be05"

        // logoSrc="Icon.jpeg"
      ></Header>
      <main>{children}</main>
      <Footer
        socialLinks={[
          {
            src: "https://cdn.builder.io/api/v1/image/assets%2F8bcc86290bcc406f950f314bd3e91ce3%2F9d2b20fa291c4acaad0f27aa6a18cd81",
            alt: "Whatsapp",
          },
          // {
          //   src: "https://cdn.builder.io/api/v1/image/assets%2F8bcc86290bcc406f950f314bd3e91ce3%2F99024afd4dab4fb881d161a933589f86",
          //   alt: "Facebook",
          // },
        ]}
        legalLinks={[
          { href: "/terms-conditions", text: "Términos y condiciones" },
          {
            href: "/privacy-policy",
            text: "Política de privacidad",
          },
          {
            href: "",
            text: "Libro de reclamaciones",
          },
        ]}
        contactEmail="info@sr-tommy.com"
        contactPhone="+51 941475889"
      ></Footer>
    </div>
  );
}
