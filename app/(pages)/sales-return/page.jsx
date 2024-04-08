"use client"

import { useEffect, useState } from "react";
import DatePicker from "react-datepicker";
import axios from "axios";

import { BiBarcodeReader } from "react-icons/bi";
import  Link  from "next/link";
import { format } from "date-fns";

export default function SalesReturn() {


    const [startDate, setStartDate] = useState(new Date());
    const [adminData, setAdminData] = useState([]);
    // const { baseURL } = useContext(AuthContext)
    const [searchText, setSearchText] = useState("");
    const [filteredData, setFilteredData] = useState([]);

    const [currentPage, setCurrentPage] = useState(1);
    const [postPerPage, setPostPerPage] = useState(20);
    const lastPostIndex = currentPage * postPerPage;
    const firstPostIndex = lastPostIndex - postPerPage;
    const currentPosts = filteredData.slice(firstPostIndex, lastPostIndex)

    const token = '72dbf14411791344bbd2044ff82473c2e58e72b5'
    localStorage.setItem('token',token)

    let page = [];
    for (let i = 1; i <= Math.ceil(filteredData.length / postPerPage); i++) {
        page.push(i)
    }

    const nextPage = () => {
        if (currentPage < page.length) {
            setCurrentPage(currentPage + 1);
        }
    };

    const prevPage = () => {
        if (currentPage > 1) {
            setCurrentPage(currentPage - 1);
        }
    };

    // get return data 
    useEffect(() => {
       

        axios.get(`https://rpos.pythonanywhere.com/api/v1/salesReturn/`, {
            headers: { 'Authorization': 'token ' + token }
        })
            .then((res) => res.data)
            .then((data) => {
                console.log(data)
                setAdminData(data)
            })
            .catch((error) => console.error("Error fetching data:", error));
    }, [setAdminData]);



    const showDataPerPage = (e) => {
        e.preventDefault();
        setPostPerPage(parseInt(e.target.value));
    }

    // Handle search input change
    const handleSearchInputChange = (e) => {
        setSearchText(e.target.value);
    };
    // const handleDateSearch = () => {
        
    // }
    console.log(startDate)
    // clear search
    const handleClearSearch = (e) => {
        e.preventDefault();
        setSearchText("");
    };

    useEffect(()=>{
        const originalDate = new Date(startDate)
        const formattedDate = format(originalDate, 'yyyy-MM-dd');
        const dateSearch = adminData.filter((item) => item.sale_created_date
        === formattedDate)
        setFilteredData(dateSearch)
       console.log(dateSearch)
    },[adminData, setFilteredData,startDate]) 
    useEffect(() => {
        let filteredResults = adminData;
        // Applying the search filter
        if (searchText.trim() !== "") {
            filteredResults = filteredResults.filter((item) =>
                item.sale?.customer.name.toLowerCase().includes(searchText.toLowerCase()) ||
                item.sale?.customer.phone_number.toLowerCase().includes(searchText.toLowerCase()) ||
                item.sale?.customer.address.toLowerCase().includes(searchText.toLowerCase()) ||
                item.sale?.id.toString().toLowerCase().includes(searchText.toLowerCase())
            );
        }

        setFilteredData(filteredResults);
    }, [adminData, searchText]);



    return (
        <div>
            
            {/* title section end */}
            {/* table history  */}
            <div >
                <div className="md:container md:mx-auto md:px-12 px-2">
                    <div className="flex justify-center my-3 ">
                        <h2 className="font-semibold border-b-[1px] border-indigo-500 text-2xl  ">Sales Return </h2>
                    </div>

                    {/* search bar  */}
                    <div className="py-2 mb-3 bg-slate-100 rounded-lg">
                        <div className="flex justify-center mt-1">
                            <form action="" className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-3 gap-1 sm:gap-2  lg:flex md:gap-0 lg:justify-around lg:items-center">
                                <select className="select select-sm select-bordered w-full xl:w-44 max-w-xs rounded-full mx-1 mb-1   shadow hover:shadow-lg"
                                    onChange={showDataPerPage}>
                                    <option value={20} className="font-bold">Show 20</option>
                                    <option value={30} className="font-bold">Show 30</option>
                                    <option value={40} className="font-bold">Show 40</option>
                                    <option value={50} className="font-bold">Show 50</option>
                                    <option value={100} className="font-bold">Show 100</option>
                                </select>
                                <div className="w-full xl:w-44 mx-1 mb-1">
                                    <DatePicker selected={startDate} onChange={(date) => setStartDate(date)} className="w-full overflow-hidden border input input-sm  rounded-full" />
                                </div>
                                {/* search bar  */}
                                <input value={searchText} onChange={handleSearchInputChange} type="text" placeholder="Type here" className="input input-bordered input-sm max-w-xs w-full xl:w-44 rounded-full mx-1 mb-1  shadow hover:shadow-lg" />
                                <button type="submit" className="btn btn-outline btn-sm rounded-full mx-3  hover:text-white ">Search</button>
                                <button onClick={handleClearSearch} type="button" className="btn btn-outline btn-sm rounded-full mx-1  hover:text-white ">Clear filter</button>

                                <Link href={"/sales-return/scanner"} type="button" className="btn btn-outline btn-sm rounded mx-1  hover:text-white "><BiBarcodeReader className="text-2xl" /></Link>

                            </form>
                        </div>
                    </div>
                    {/* search bar end  */}

                    <div className="overflow-x-auto  shadow-lg rounded">
                        <table className="table table-base">
                            {/* head */}
                            <thead className="bg-slate-200	">
                                <tr>
                                    <th className="text-black">No.</th>
                                    <th className="text-black">Sales ID</th>
                                    <th className="text-black">Customer Name</th>
                                    <th className="text-black">Customer Number</th>
                                    <th className="text-black">Customer Address</th>
                                    <th className="text-black">Date</th>
                                    <th className="text-black">Returned Date</th>
                                    <th className="text-black">Total Price</th>
                                    <th className="text-black">Invoice</th>
                                </tr>
                            </thead>
                            <tbody>
                                {
                                    currentPosts.map((tableData, index) => <tr key={tableData.id} className={`${index % 2 == 1 ? 'bg-slate-200 border-b-[1px] border-slate-300' : 'bg-white border-b-[1px] border-slate-300'}`}>
                                        <td>{++index}</td>
                                        <td>{tableData.sale?.id}</td>
                                        <td>
                                            <div className="flex items-center gap-3">

                                                <div>
                                                    <div className="font-bold">{tableData.sale?.customer?.name}</div>
                                                </div>
                                            </div>
                                        </td>
                                        <td>
                                            <p>{tableData.sale?.customer?.phone_number}</p>
                                        </td>
                                        <td>
                                            <p>{tableData.sale?.customer?.address}</p>
                                        </td>
                                        <td>
                                            <p>{tableData.sale_created_date}</p>
                                        </td>
                                        <td>  <p>{tableData?.date}</p></td>
                                        <td>  <p>TK. {tableData?.sale?.total}</p></td>
                                        {/* invoice  */}  
                                        <td className="text-center">
                                            <Link href={`sales-return/${tableData?.sale?.id}`}>
                                                <button className="btn btn-outline btn-success btn-sm">
                                                    <svg
                                                        xmlns="http://www.w3.org/2000/svg"
                                                        fill="none"
                                                        viewBox="0 0 24 24"
                                                        strokeWidth={1.5}
                                                        stroke="currentColor"
                                                        className="w-6 h-6"
                                                    >
                                                        <path
                                                            strokeLinecap="round"
                                                            strokeLinejoin="round"
                                                            d="M9 12h3.75M9 15h3.75M9 18h3.75m3 .75H18a2.25 2.25 0 0 0 2.25-2.25V6.108c0-1.135-.845-2.098-1.976-2.192a48.424 48.424 0 0 0-1.123-.08m-5.801 0c-.065.21-.1.433-.1.664 0 .414.336.75.75.75h4.5a.75.75 0 0 0 .75-.75 2.25 2.25 0 0 0-.1-.664m-5.8 0A2.251 2.251 0 0 1 13.5 2.25H15c1.012 0 1.867.668 2.15 1.586m-5.8 0c-.376.023-.75.05-1.124.08C9.095 4.01 8.25 4.973 8.25 6.108V8.25m0 0H4.875c-.621 0-1.125.504-1.125 1.125v11.25c0 .621.504 1.125 1.125 1.125h9.75c.621 0 1.125-.504 1.125-1.125V9.375c0-.621-.504-1.125-1.125-1.125H8.25ZM6.75 12h.008v.008H6.75V12Zm0 3h.008v.008H6.75V15Zm0 3h.008v.008H6.75V18Z"
                                                        />
                                                    </svg>
                                                </button>
                                            </Link>
                                        </td>

                                    </tr>)
                                }
                            </tbody>
                            {/* foot */}
                            <tfoot className="bg-slate-200	">
                                <tr>
                                    <th className="text-black">No.</th>
                                    <th className="text-black">Sales ID</th>
                                    <th className="text-black">Customer Name</th>
                                    <th className="text-black">Customer Number</th>
                                    <th className="text-black">Customer Address</th>
                                    <th className="text-black">Date</th>
                                    <th className="text-black">Returned Date</th>
                                    <th className="text-black">Total Price</th>
                                    <th className="text-black">Invoice</th>
                                </tr>
                            </tfoot>

                        </table>
                        {/* pagination section start */}
                        <div className="mx-auto text-center">
                            <div className="join ">
                                <button className="join-item btn" onClick={prevPage}>«</button>
                                {page.map((page, index) => (
                                    <button key={index} className="join-item btn" onClick={() => setCurrentPage(page)}>{page}</button>
                                ))}
                                <button className="join-item btn" onClick={nextPage}>»</button>
                            </div>
                        </div>
                        {/* pagination section end */}

                    </div>
                </div>
            </div>
        </div>
    )




}


