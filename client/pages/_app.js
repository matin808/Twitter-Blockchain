import "../styles/globals.css";
import "../lib/hexStyles.css";
// import type { AppProps } from "next/app";
import { TwitterProvider } from "../context/TwitterContext";

function MyApp({ Component, pageProps }) {
  return (
    <TwitterProvider>
      <Component {...pageProps} />
    </TwitterProvider>
  );
}

export default MyApp;
