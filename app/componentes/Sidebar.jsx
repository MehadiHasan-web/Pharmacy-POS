'use client'
import  Link  from 'next/link';
import { FaSquareCaretRight} from "react-icons/fa6";
import { MdDashboard } from "react-icons/md";
import { GiExpense } from "react-icons/gi";
import { FaPlusSquare } from "react-icons/fa";
import { RiMoneyDollarCircleFill } from "react-icons/ri";
import { MdInventory } from "react-icons/md";
import { IoPersonCircleSharp } from "react-icons/io5";
import { IoMdSettings } from "react-icons/io";
import { useState } from 'react';

function Sidebar() {

    return (
    <div className="w-full bg-[#1E1E1E] h-screen">
      <div className="my-4 ">
        <FaSquareCaretRight className="text-green-500 text-2xl text-right"></FaSquareCaretRight> 
      </div>
      <ul className='space-y-2'>

      <li><Link href="/" className="flex justify-center items-center gap-2">
      <FaPlusSquare className="text-green-500"></FaPlusSquare>
      <span className="lg:text-xl font-semibold text-slate-200">Ara Creation</span></Link></li>

      <li><div className="border-[1px] border-x-slate-50 my-5"></div></li>

      <li><Link href="/dashboard" className="flex justify-center items-center gap-2">
      <MdDashboard className="text-green-500"></MdDashboard>
      <span className=" font-semibold text-slate-200">Dashboard</span>
      </Link></li>

      <li><Link href="/" className="flex justify-center items-center gap-2">
      <RiMoneyDollarCircleFill className="text-green-500 text-2xl"></RiMoneyDollarCircleFill>
      <span className=" font-semibold text-slate-200">Sales</span>
      </Link></li>

      <li><Link href="/" className="flex justify-center items-center gap-2">
      <MdInventory className="text-green-500"></MdInventory>
      <span className=" font-semibold text-slate-200">Sales Return</span>
      </Link></li>

      <li><Link href="/expenses" className="flex justify-center items-center gap-2"><GiExpense className="text-green-500"></GiExpense><span className=" font-semibold text-slate-200">Expenses</span>
      </Link></li>

      <li><Link href="/management" className="flex justify-center items-center gap-2"><IoPersonCircleSharp className="text-green-500"></IoPersonCircleSharp><span className=" font-semibold text-slate-200">Management</span>
      </Link></li>

      <li><Link href="/settings" className="flex justify-center items-center gap-2"><IoMdSettings className="text-green-500"></IoMdSettings><span className=" font-semibold text-slate-200">Settings</span>
      </Link></li>

      
      </ul>
    </div>
    )
}

export default Sidebar;
