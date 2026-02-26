import React from 'react'
import { FaHeart, FaShoppingCart } from 'react-icons/fa'
import { Link } from 'react-router-dom'
import Dropdown from '../components/Dropdown'

const Dashboard = () => {
  return (
    <>
    <div className="hidden lg:flex items-center gap-6 text-gray-700 font-medium">
            
            <Link to="/favoriten" className="flex items-center gap-4 hover:text-yellow-500 transition">
                <FaHeart className="text-lg cursor-pointer" />
            </Link>
            
            <Link to="/winkelwagen" className="flex items-center gap-4 hover:text-yellow-500 transition">
                <FaShoppingCart className="text-lg cursor-pointer" />
            </Link>
            
            {/* Todo: Als user ingelogd is, profiel naam toevoegen. (Zie bol.com) */}
            <Dropdown
            label="Dashboard"
            items={[
                { label: "Overview", to: "/dashboard/overview" },
                { label: "Profile", to: "/dashboard/profile" },
                { label: "Settings", to: "/dashboard/settings" },
                { label: "Logout", to: "/logout"}
            ]}
            />
            
        </div>
        </>
  )
}

export default Dashboard