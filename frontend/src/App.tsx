import { useEffect } from 'react'
import { InteractionStatus } from '@azure/msal-browser'
import { useIsAuthenticated, useMsal } from '@azure/msal-react'
import { useNavigate } from 'react-router-dom'
import './App.css'
import HomePage from './Pages/HomePage'
 

const App = () => {
  const isAuthenticated = useIsAuthenticated()
  const { accounts, inProgress } = useMsal()
  const navigate = useNavigate()

  useEffect(() => {
    if (inProgress !== InteractionStatus.None) {
      return
    }

    if (!isAuthenticated || accounts.length === 0) {
      return
    }

    const claims = accounts[0].idTokenClaims as Record<string, unknown>
    const roles = (claims?.roles as string[]) ?? []

    if (roles.includes('App.Admin')) {
      navigate('/admin/dashboard', { replace: true })
      return
    }

    navigate('/unauthorized', { replace: true })
  }, [accounts, inProgress, isAuthenticated, navigate])

    
  return (
    <div className="min-h-screen bg-gray-100">
        
      <HomePage/>
    </div>
  )
}

export default App
