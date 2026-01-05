import {createRoot} from "react-dom/client";
import App from "./App.jsx";
import { GoogleOAuthProvider } from '@react-oauth/google';
import "./index.css";
createRoot(document.getElementById("root")).render(
  <GoogleOAuthProvider clientId="540952180572-umq2khmu4m523emshel1qa6bsc40nhae.apps.googleusercontent.com">
  <App />
</GoogleOAuthProvider>
);



