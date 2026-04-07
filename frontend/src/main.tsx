import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { RouterProvider } from 'react-router-dom'
import './index.css'
import { router } from "./routing/router"
import { MsalProvider } from "@azure/msal-react"; 
import { msalInstance } from './Config/AuthConfig'
import { FavoritesProvider } from './contexts/FavoritesContext'
import { Toaster } from "react-hot-toast";
import { AuthProvider } from './contexts/AtuhContext'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <AuthProvider>

       <MsalProvider instance={msalInstance}>
         <FavoritesProvider> 
          
            <RouterProvider router={router} />
             <Toaster position="top-right" />
          </FavoritesProvider> 
       </MsalProvider>
    </AuthProvider>
      
  </StrictMode>,
)
