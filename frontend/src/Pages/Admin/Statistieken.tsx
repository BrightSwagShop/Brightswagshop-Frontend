import React from 'react'
import { FiDollarSign, FiList, FiShoppingBag } from 'react-icons/fi';
import { useEffect, useState } from "react";
import {
  BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer,
  PieChart, Pie, Cell
} from "recharts";
import { getOrderStatusStats, getRevenueStats } from '../../services/stats';
 

const COLORS = ["#facc15", "#22c55e", "#3b82f6", "#ef4444", "#a855f7"];
const Statistieken = () => {
   const [revenue, setRevenue] = useState<any[]>([]);
  const [orders, setOrders] = useState<any[]>([]);

  useEffect(() => {
    const load = async () => {
      const rev = await getRevenueStats();
      const ord = await getOrderStatusStats();

      setRevenue(rev);
      setOrders(ord);
    };

    load();
  }, []);
interface DashboardCard{
  title: string;
  total:number;
  description:string;
  icon:React.ReactNode;
  type:string;

}


  const cards1: DashboardCard[] =[
    {
      title: "Bestellingen",
      total:128,
      description:"12% vs gisteren",
      type: "number",
      icon:<FiShoppingBag size={24}/>
  
    },
     {
      title: "Openstaande bestellingen",
      total:34,
      description:"8% vs gisteren",
      type: "number",
      icon:<FiList size={24}/>
  
    },
     {
      title: "Omzet",
      total:12000.00,
      type: "currency",
      description:"2% vs gisteren",
      icon:<FiDollarSign size={24}/>
  
    },
  ]
  return (
    <>
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-semibold text-gray-900">
         SwagShop
        </h1>
        <p className="text-xl text-gray-500 ">
         Statistieken
        </p>
      </div>
    
    
    <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6">
           {cards1.map((card) => (
             <div className="bg-white rounded-2xl p-6 hover:shadow-md transition group">
               <div className="flex items-center gap-3">
                  <div className="h-10 w-10 rounded-xl bg-[#fef4d5] flex items-center justify-center text-[#F4c709] text-2x1">
                    {card.icon}
                  </div>
               
                    <div className="text-center font-semibold text-gray-900">
                      {card.title}
                    </div>
                </div>

                <div className="mt-4 text-center">

                <div className="mt-4 text-3xl font-semibold text-gray-900">
                   {card.type === "currency"
                    ? new Intl.NumberFormat("nl-BE", {
                      style: "currency",
                      currency: "EUR",
                    }).format(card.total)
                    : card.total}

                </div>

                  {/* Trend */}
                <div className="mt-1 text-sm text-green-500">
                  ↑ {card.description} <span className="text-gray-500"></span>
                </div>
                </div>
            

            </div>
           ))}
           </div>
             <div className="p-6 bg-[#EDEDED] min-h-screen">
      <div className="grid grid-cols-3 gap-6">

        {/* BAR CHART */}
        <div className="col-span-2 bg-white p-4 rounded-2xl">
          <h3 className="mb-4 font-semibold">Omzet overzicht</h3>

          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={revenue}>
              <XAxis dataKey="date" />
              <YAxis />
              <Tooltip />
              <Bar dataKey="total" fill="#facc15" radius={[4,4,0,0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>

        {/* PIE CHART */}
        <div className="bg-white p-4 rounded-2xl">
          <h3 className="mb-4 font-semibold">Orders per status</h3>

          <ResponsiveContainer width="100%" height={300}>
            <PieChart>
              <Pie
                data={orders}
                dataKey="count"
                nameKey="status"
                cx="50%"
                cy="50%"
                innerRadius={60}
                outerRadius={90}
              >
                {orders.map((_, i) => (
                  <Cell key={i} fill={COLORS[i % COLORS.length]} />
                ))}
              </Pie>
              <Tooltip />
            </PieChart>
          </ResponsiveContainer>
        </div>

      </div>
    </div>


        </div>
        
        </>
  )
}

export default Statistieken