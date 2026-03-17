import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { RouterProvider } from 'react-router-dom'
import './index.css'
import { router } from "./routing/router"
import { MsalProvider } from "@azure/msal-react"; 
import { msalInstance } from './Config/AuthConfig'


createRoot(document.getElementById('root')!).render(
  <StrictMode>
       <MsalProvider instance={msalInstance}>

        <RouterProvider router={router} />
       </MsalProvider>
      
  </StrictMode>,
)
