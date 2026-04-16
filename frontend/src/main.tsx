import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { RouterProvider } from "react-router-dom";
import { MsalProvider } from "@azure/msal-react";
import { Toaster } from "react-hot-toast";

import "./index.css";
import { router } from "./routing/router";
import { msalInstance } from "./Config/AuthConfig";
import { AuthProvider } from "./providers/AuthProvider";
import { FavoritesProvider } from "./providers/FavoritesProvider";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <MsalProvider instance={msalInstance}>
      <AuthProvider>
        <FavoritesProvider>
          <RouterProvider router={router} />
          <Toaster position="top-right" />
        </FavoritesProvider>
      </AuthProvider>
    </MsalProvider>
  </StrictMode>,
);
