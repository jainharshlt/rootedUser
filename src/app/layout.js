import "../../public/assets/css/style.css";
import Footer from "../componets/Footer";
import Header from "../componets/Header";
import { GoogleOAuthProvider } from '@react-oauth/google';
//import ReactDOM from "react-dom";

export const metadata = {
  title: "Rooted",
  description: "Rooted",
};

export default function RootLayout({ children }) {
  //document.getElementById("root")

  return (
    <GoogleOAuthProvider clientId={'963272042874-tsl0jb1pb8h91uujehia46lqfd2hs9b2.apps.googleusercontent.com'}>
    <html lang="en">
      <head>
          <meta charset="UTF-8" />
          <meta name="viewport" content="width=device-width, initial-scale=1.0" />
          <link rel="shortcut icon" href="assets/images/logo/favicon.jpg" type="image/x-icon" />
          <title>Rooted</title>
          <script src="https://checkout.razorpay.com/v1/checkout.js"></script>
          <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/css/bootstrap.min.css" rel="stylesheet" />
          <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/swiper@11/swiper-bundle.min.css" />
          <link rel="stylesheet" href="assets/css/style.css" />
      </head>
      <body id="darkHeader">
          <Header />
            {children}
          <Footer />


        <script src="https://cdn.jsdelivr.net/gh/studio-freight/lenis@1.0.23/bundled/lenis.min.js"></script> 
        <script src="https://cdn.jsdelivr.net/npm/@popperjs/core@2.11.8/dist/umd/popper.min.js" integrity="sha384-I7E8VVD/ismYTF4hNIPjVp/Zjvgyol6VFvRkX/vR+Vc4jQkC+hVqc2pM8ODewa9r" crossorigin="anonymous"></script>
        <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/js/bootstrap.min.js" integrity="sha384-0pUGZvbkm6XF6gxjEnlmuGrJXVbNuzT9qBBavbLwCsOGabYfZo0T0to5eqruptLy" crossorigin="anonymous"></script>
        <script src='https://cdnjs.cloudflare.com/ajax/libs/jquery/3.7.0/jquery.min.js'></script>
        <script src="https://cdn.jsdelivr.net/npm/swiper@11/swiper-bundle.min.js"></script>
        <script type="text/javascript" src="assets/js/script.js"></script>
        
      </body>
    </html>
    </GoogleOAuthProvider>
  );
}
/* ReactDOM.render(
  <GoogleOAuthProvider clientId={clientId}>
    <RootLayout />
  </GoogleOAuthProvider>,
  document.getElementById("root")
); */