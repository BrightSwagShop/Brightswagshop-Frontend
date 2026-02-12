import React from 'react'
import { VscLoading } from "react-icons/vsc";

const Loading = () => {
  return (
    <div className="flex items-center justify-center min-h-screen">
        <VscLoading className="animate-spin text-amber-500" size={40} />
    </div>
  )
}

export default Loading