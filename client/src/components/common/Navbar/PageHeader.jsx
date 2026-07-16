import React from 'react'
import { useLocation } from "react-router-dom";
import PAGE_METADATA from '../../../constants/pageMetaData';

const PageHeader = () => {

     const location = useLocation();

    const page = PAGE_METADATA[location.pathname] || { title: "AI Leetcode Assistant", subtitle: "", icon: "🤖", }
    
  return (
    <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-8 mt-5">
            {/* Left */}
            <div>
              <h1 className="text-2xl font-bold text-slate-900">
                 {page.icon} {page.title}
              </h1>

              <p className="text-slate-500 mt-2 text-sm">
                {page.subtitle}
              </p>
            </div>

          </div>
  )
}

export default PageHeader
