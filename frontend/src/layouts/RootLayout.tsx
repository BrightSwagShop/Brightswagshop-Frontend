import Header from '../components/Header'
import { Outlet } from 'react-router-dom'
import Footer from '../components/Footer'


const RootLayout = () => {
  return (
    <div>
      <Header />
      <div className="mt-24">
        <Outlet />
      </div>
      <Footer />
    </div>
  );
}

export default RootLayout