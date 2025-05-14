import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { GoogleTagManager } from "@next/third-parties/google";
import { Providers } from "./Providers";
// import useSWR from "swr";
// import { Organization } from "./portal/MenuDrawer2";
// import { useAuth0 } from "@auth0/auth0-react";
// import axios from "axios";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: `Sr Tommy`,
  description: "Nuestra app te ayuda a marcar asistencias a tu iglesia :)",
};

//TODO change static title to a dynamic title
// type Props = {
//   params: Promise<{ organization: any }>;
// };

// export const generateMetadata = async ({
//   params,
// }: Props): Promise<Metadata> => {
//   const { user } = useAuth0();
//   const orgId = user?.["https://sr-tommy.com/orgId"];

//   axios
//     .get(`/organizations/${orgId}`, {
//       headers: {
//         "Content-type": "application/json",
//       },
//     })
//     .then((response) => console.log(response.data));

//   return {
//     title: `${organization?.name} - Sr Tommy`,
//   };
// };

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="es">
      <body className={inter.className}>
        <Providers>{children}</Providers>
      </body>
      <GoogleTagManager gtmId="GTM-KHZ22MM9" />
    </html>
  );
}
