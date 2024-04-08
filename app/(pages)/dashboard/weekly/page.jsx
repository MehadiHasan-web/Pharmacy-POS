import React from 'react';
import { Link } from 'next/link';
import { AiOutlineExclamationCircle } from "react-icons/ai";
import { VscGitPullRequestGoToChanges } from "react-icons/vsc";
import { LuDot } from "react-icons/lu";
import { GiReturnArrow, } from "react-icons/gi";
import { SiAwesomewm } from "react-icons/si";
import { TbCoinTakaFilled } from "react-icons/tb";

const Weekly = ({data}) => {

  return (
    <div>
      {/* weekly  */}
      <h1 className="mt-3 text-3xl font-extrabold tracking-tight text-slate-900 mb-4">Weekly</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3  gap-5">
        {/* total_amount_sold.week */}
        <div className="flex gap-5 items-center bg-white shadow-lg shadow-slate-300 w-full h-32 md:h-40 px-3 mb-5 rounded-xl  hover:shadow-slate-400 hover:border-solid hover:border-[3px] hover:border-red-100 hover:cursor-pointer" data-aos="flip-left">
          <div className="">
            {/* <img className="w-16 h-16 sm:h-14 sm:w-14 md:h-20 md:w-20 lg:h-20 lg:w-24" ></img> */}
            <VscGitPullRequestGoToChanges className="w-16 h-16 sm:h-14 sm:w-14 md:h-20 md:w-20 lg:h-20 lg:w-24" />
          </div>
          <div className="w-full">
            <ul className="space-y-2">
              <li className="flex justify-between items-center"><span className="text-gray-500 text-xs sm:text-sm md:text-base lg:text-lg font-semibold">Total Unit Sold</span><AiOutlineExclamationCircle className="text-sm sm:text-base md:text-lg lg:text-xl text-gray-500"></AiOutlineExclamationCircle></li>
              <li className="text-xl sm:text-2xl md:text-3xl lg:text-2xl text-gray-500 font-semibold">{data?.total_unit_sold?.week}</li>
              <li className="flex items-center">
                <span><LuDot className="text-gray-600"></LuDot></span>
              </li>
            </ul>
          </div>
        </div>

        {/* total_amount_sold */}
        <div className="flex gap-5 items-center bg-white shadow-lg shadow-slate-300 w-full h-32 md:h-40 px-3 mb-5 rounded-xl  hover:border-solid hover:border-[3px] hover:border-red-100 hover:cursor-pointer hover:shadow-slate-400" data-aos="flip-left">
          <div className="">
            {/* <img className="w-16 h-16 sm:h-14 sm:w-14 md:h-20 md:w-20 lg:h-20 lg:w-24" ></img> */}
            <SiAwesomewm className="w-16 h-16 sm:h-14 sm:w-14 md:h-20 md:w-20 lg:h-20 lg:w-24" />
          </div>
          <div className="w-full">
            <ul className="space-y-2">
              <li className="flex justify-between items-center"><span className="text-gray-500 text-xs sm:text-sm md:text-base lg:text-lg font-semibold">Total Amount Sold</span><AiOutlineExclamationCircle className="text-sm sm:text-base md:text-lg lg:text-xl text-gray-500"></AiOutlineExclamationCircle></li>
              <li className="text-xl sm:text-2xl md:text-3xl lg:text-2xl text-gray-500 font-semibold flex items-center gap-1"><TbCoinTakaFilled ></TbCoinTakaFilled>{data?.total_amount_sold?.week}</li>
            </ul>
          </div>
        </div>
        {/* total_sales_return */}
        <a to="/">
          <div className="flex gap-5 items-center bg-white shadow-lg shadow-slate-300 w-full h-32 md:h-40 px-3 mb-5 rounded-xl   hover:border-solid hover:border-[3px] hover:border-red-100 hover:cursor-pointer hover:shadow-slate-400" data-aos="flip-left">
            <div className="">
              {/* <img className="w-16 h-16 sm:h-14 sm:w-14 md:h-20 md:w-20 lg:h-20 lg:w-24" ></img> */}
              <GiReturnArrow className="w-16 h-16 sm:h-14 sm:w-14 md:h-20 md:w-20 lg:h-20 lg:w-24" />
            </div>
            <div className="w-full">
              <ul className="space-y-2">
                <li className="flex justify-between items-center"><span className="text-gray-500 text-xs sm:text-sm md:text-base lg:text-lg font-semibold">Total Sales Return</span><AiOutlineExclamationCircle className="text-sm sm:text-base md:text-lg lg:text-xl text-gray-500"></AiOutlineExclamationCircle></li>
                <li className="text-xl sm:text-2xl md:text-3xl lg:text-2xl text-gray-500 font-semibold">{data?.total_sales_return?.week}</li>

              </ul>
            </div>
          </div>
        </a>

      </div>
    </div>
  );
};

export default Weekly;