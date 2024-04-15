'use client'
import axios from "axios";
import { useRouter } from 'next/navigation'
import { useEffect, useState } from "react";
import { IoIosArrowRoundBack } from "react-icons/io";


const ExpensesDetails = ({params}) => {
  const [expensesDetails, setExpensesDetails] = useState([]);
  const {id} = params;
  const token = '72dbf14411791344bbd2044ff82473c2e58e72b5'
  const router = useRouter();

  // get Expenses data
  useEffect(() => {
    axios
      .get(`https://rpos.pythonanywhere.com/api/v1/expenses/`, {
        headers: { Authorization: "token " + token },
      })
      .then((res) => res.data)
      .then((data) => setExpensesDetails(data))
      .catch((error) => console.error("Error fetching data:", error));
  }, []);

  const findData = expensesDetails.find((item) => item.id === parseInt(id));

  const previousPage = () => {
    router.push('/expenses',  { scroll: false })
  }


  return (
    <div className=" h-screen flex flex-col justify-center items-center  bg-slate-200">
      <div className="max-w-xl w-full h-96  bg-white shadow-md rounded-xl">
        <div className="bg-green-500 w-full text-center p-4 rounded-t-xl">
          <h2 className="font-bold text-2xl text-white">
            {findData?.category?.name}
          </h2>
        </div>
        <div className="p-4">
          <p className="my-5">{findData?.note}</p>
          <p className="  font-semibold">Date: {findData?.date}</p>
          <p className="flex justify-between items-center mt-20 text-xl font-bold bg-slate-100 p-3">
            <span>Total Expenses</span>
            <span className="">{findData?.amount} TK</span>
          </p>
        </div>
      </div>
      <div className="flex justify-end">
        <button
          onClick={previousPage}
          className="mt-10 bg-green-500 text-white btn btn-sm hover:bg-black flex items-center "
        >
          <IoIosArrowRoundBack className="text-xl" />
          Return
        </button>
      </div>
    </div>
  );
};

export default ExpensesDetails;