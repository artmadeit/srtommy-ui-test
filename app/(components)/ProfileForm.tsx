import Script from "next/script";
import { Typography } from "@mui/material";
import Grid from "@mui/material/Unstable_Grid2/Grid2";
import { FormContainer, TextFieldElement } from "react-hook-form-mui";

const publicKey =
  process.env.NEXT_PUBLIC_CULQI_API_KEY || "some other culqi key";

export const ProfileForm = () => {
  return (
    <FormContainer>
      <Grid container spacing={2} margin={4}>
        <Grid xs={12}>
          <Typography variant="h5" gutterBottom>
            Perfil
          </Typography>
        </Grid>
        <Grid xs={6}>
          <TextFieldElement name="email" label="Email" type="email" fullWidth />
        </Grid>
        <Grid xs={12}>
          <Typography variant="h5">Pagar en: </Typography>
          {/* <button
            onClick={(e) => {
              Culqi.open();
              e.preventDefault();
            }}
          >
            Proceder pago
          </button> */}
          <div id="culqi-container" style={{ height: "80vw" }}></div>
        </Grid>
      </Grid>
      <Script
        src="https://js.culqi.com/checkout-js"
        onLoad={() => {
          const settings = {
            title: "Culqi  store 2",
            currency: "PEN", // Este parámetro es requerido para realizar pagos yape
            amount: 8000, // Este parámetro es requerido para realizar pagos yape(80.00)
            order: "ord_live_d1P0Tu1n7Od4nZdp", // Este parámetro es requerido para realizar pagos con pagoEfectivo, billeteras y Cuotéalo
            xculqirsaid: "Inserta aquí el id de tu llave pública RSA",
            rsapublickey: "Inserta aquí tu llave pública RSA",
          };

          const client = {
            email: "test2@demo.com",
          };

          const paymentMethods = {
            // las opciones se ordenan según se configuren
            tarjeta: true,
            yape: true,
            billetera: true,
            bancaMovil: true,
            agente: false,
            cuotealo: false,
          };

          const options = {
            lang: "auto",
            installments: true, // Habilitar o deshabilitar el campo de cuotas
            modal: false,
            container: "#culqi-container", // Opcional - Div donde quieres cargar el checkout
            paymentMethods: paymentMethods,
            paymentMethodsSort: Object.keys(paymentMethods), // las opciones se ordenan según se configuren en paymentMethods
          };

          const appearance = {
            theme: "default",
            hiddenCulqiLogo: false,
            hiddenBannerContent: false,
            hiddenBanner: false,
            hiddenToolBarAmount: false,
            menuType: "sidebar", // sidebar / sliderTop / select
            buttonCardPayText: "Pagar tal monto", //
            logo: null, // 'http://www.childrensociety.ms/wp-content/uploads/2019/11/MCS-Logo-2019-no-text.jpg',
            defaultStyle: {
              bannerColor: "blue", // hexadecimal
              buttonBackground: "yellow", // hexadecimal
              menuColor: "pink", // hexadecimal
              linksColor: "green", // hexadecimal
              buttonTextColor: "blue", // hexadecimal
              priceColor: "red",
            },
          };

          const config = {
            settings,
            client,
            options,
            appearance,
          };

          const Culqi = new CulqiCheckout(publicKey, config);
          Culqi.open();
        }}
      />
    </FormContainer>
  );
};
