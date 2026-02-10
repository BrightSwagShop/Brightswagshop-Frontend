import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.tsx'
import RootLayout from './layouts/RootLayout.tsx'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import AdminLayout from './layouts/AdminLayout.tsx'
import Users from './Pages/Admin/Users.tsx'
import AdminDashboard from './Pages/Admin/AdminDashboard.tsx'
import Products from './Pages/Admin/Products.tsx'
import Bugs from './Pages/Admin/Bugs.tsx'
import Settings from './Pages/Admin/Settings.tsx'





const router = createBrowserRouter([
  {
    path: "/",
    element: <RootLayout />, 
    children: [
      { path: "/", element: <App />},
      
      // Admin page's
      { path: "admin", 
        element: <AdminLayout/>,
        children: [
          { path: "dashboard", element: <AdminDashboard />},
          { path: "users", element: <Users />},
          { path: "products", element: <Products />},
          { path: "bugs", element: <Bugs />},
          { path: "settings", element: <Settings />}

        ],
      },
    ],
  },
])

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <RouterProvider router={router} />
  </StrictMode>,
)
