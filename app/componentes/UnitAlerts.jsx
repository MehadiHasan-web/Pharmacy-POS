
import { MdCrisisAlert } from "react-icons/md";
import { AiOutlineExclamationCircle } from "react-icons/ai";
import { LuDot } from "react-icons/lu";

const UnitAlerts = ({data}) => {

  const unitAlert = data?.unit_alerts;
  return (
    <div>
      <h1 className="mt-3 text-3xl font-extrabold tracking-tight text-slate-900 mb-4">Unit Alerts</h1>
      <div className="border-2 border-green-500 p-4 rounded">


        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5  gap-5">
          {unitAlert?.map((item, index) => (
            <div className="flex gap-5 items-center bg-white shadow-lg shadow-slate-300 w-full h-32 md:h-40 px-3 mb-5 rounded-xl  hover:shadow-slate-400 hover:border-solid hover:border-[3px] hover:border-red-100 hover:cursor-pointer" data-aos="flip-left" key={index}>
              <div className="">
                {/* <img className="w-16 h-16 sm:h-14 sm:w-14 md:h-20 md:w-20 lg:h-20 lg:w-24" ></img> */}
                <MdCrisisAlert className="w-16 h-16 sm:h-14 sm:w-14 md:h-20 md:w-20 lg:h-20 lg:w-24" />
              </div>
              <div className="w-full">
                <ul className="space-y-2">
                  <li className="flex justify-between items-center"><span className="text-gray-500 text-xs sm:text-sm md:text-base lg:text-lg font-semibold">{item?.itemName}</span><AiOutlineExclamationCircle className="text-sm sm:text-base md:text-lg lg:text-xl text-gray-500"></AiOutlineExclamationCircle></li>
                  <li className="text-xl sm:text-2xl md:text-3xl lg:text-2xl text-gray-500 font-semibold">{item?.unit}</li>
                  <li className="flex items-center">
                    <span><LuDot className="text-gray-600"></LuDot></span>
                  </li>
                </ul>
              </div>
            </div>
          ))}


        </div>

      </div>
    </div>
  );
};

export default UnitAlerts;