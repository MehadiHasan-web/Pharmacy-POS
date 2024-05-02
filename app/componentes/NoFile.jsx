import React from "react";

const NoFile = () => {
  const [startDate, setStartDate] = useState(new Date());
  const [endDate, setEndDate] = useState(new Date());
  const [userData, setUserData] = useState([]);
  const [selectedOption, setSelectedOption] = useState(1); // 1 == all data, 2==approve, 3==pending
  const [filteredData, setFilteredData] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [postPerPage, setPostPerPage] = useState(20);
  const [searchText, setSearchText] = useState("");

  const lastPostIndex = currentPage * postPerPage;
  const firstPostIndex = lastPostIndex - postPerPage;
  const currentPosts = filteredData.slice(firstPostIndex, lastPostIndex);
  const contentToPrintCustomer = useRef(null);
  const contentToPrintBR = useRef(null);
  const [URL, setUrl] = useState("");
  const [sheet, setSheet] = useState([]);

  useEffect(() => {
    setUrl(window.location.href);
  }, [URL, setUrl]);

  let page = [];
  for (let i = 1; i <= Math.ceil(filteredData.length / postPerPage); i++) {
    page.push(i);
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

  // get data
    // useEffect(() => {
    //   const token = localStorage.getItem("token");
    //   axios
    //     .get(`https://rpos.pythonanywhere.com/api/v1/sales/`, {
    //       headers: { 'Authorization': 'token ' + token }
    //     })
    //     .then((res) => res.data)
    //     .then((data) => {
    //       console.log(data)
    //       setUserData(data)
    //     })
    //     .catch((error) => console.error("Error fetching data:", error));
    // }, [setUserData]);

  const fetchData = async () => {
    try {
      const data = await getSales();
      return data;
    } catch (e) {
      console.error("Error fetching data:", error);
    }
  };

  fetchData()
    .then((data) => {
      setUserData(data);
    })
    .catch((error) => {
      console.error("Error occurred:", error);
    });

  // clear search
  const handleClearSearch = (e) => {
    e.preventDefault();
    setSearchText("");
  };

  // date filtering
  useEffect(() => {
    const formattedStartDate = format(startDate, "yyyy-MM-dd");
    const formattedEndDate = format(endDate, "yyyy-MM-dd");

    const dateSearch = userData.filter((record) => {
      const recordDate = new Date(record.created_date);
      const formattedRecordDate = format(recordDate, "yyyy-MM-dd");
      return (
        formattedRecordDate >= formattedStartDate &&
        formattedRecordDate <= formattedEndDate
      );
    });

    // make new array for excel sheet
    const newData = dateSearch.map((record) => {
      return {
        Sales_ID: record.id,
        Customer_Name: record.customer?.name,
        Customer_Number: record.customer?.phone_number,
        Customer_Address: record.customer?.address,
        Date: record?.created_date,
        Price: record?.total,
        Courier_ID: record.customer?.curierImgoice,
      };
    });
    setSheet(newData);

    setFilteredData(dateSearch);
    console.log(dateSearch);
  }, [userData, setFilteredData, startDate, endDate, setSheet]);

  // Filtering Data
  useEffect(() => {
    let filteredResults = userData;

    // Applying the search filter
    if (searchText.trim() !== "") {
      filteredResults = filteredResults.filter(
        (item) =>
          item.customer.name.toLowerCase().includes(searchText.toLowerCase()) ||
          item.customer.phone_number
            .toLowerCase()
            .includes(searchText.toLowerCase()) ||
          item.customer.address
            .toLowerCase()
            .includes(searchText.toLowerCase()) ||
          item.id.toString().toLowerCase().includes(searchText.toLowerCase())
      );
    }

    setFilteredData(filteredResults);
  }, [selectedOption, userData, searchText]);

  // Handle search input change
  const handleSearchInputChange = (e) => {
    setSearchText(e.target.value);
  };

  // show data PerPage
  const showDataPerPage = (e) => {
    e.preventDefault();
    setPostPerPage(parseInt(e.target.value));
  };

  // qr invoice customer code print
  const handlePrintCustomer = useReactToPrint({
    content: () => contentToPrintCustomer.current,
  });

  // barcode  code print
  const handlePrintBarcode = useReactToPrint({
    content: () => contentToPrintBR.current,
  });

  // download excel file
  const handleExcel = (e) => {
    e.preventDefault();
    console.log(sheet);

    // var XLSX = require("xlsx");
    var workbook = XLSX.utils.book_new();
    var worksheet = XLSX.utils.json_to_sheet(sheet);

    XLSX.utils.book_append_sheet(workbook, worksheet, "Mysheet");
    XLSX.writeFileXLSX(workbook, "MyExcelFile.xlsx");
  };



  return (
    <div>
      {/* search bar  */}
      <div className="py-2 mb-3 bg-slate-100 rounded-lg">
        <div className="flex justify-center mt-1">
          <form
            action=""
            className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-3 gap-1 sm:gap-2 lg:flex md:gap-0 lg:justify-around lg:items-center"
          >
            <select
              className="select select-sm select-bordered w-full xl:w-44 max-w-xs rounded-full mx-1 mb-1   shadow hover:shadow-lg"
              onChange={showDataPerPage}
            >
              <option value={20} className="font-bold">
                Show 20
              </option>
              <option value={30} className="font-bold">
                Show 30
              </option>
              <option value={40} className="font-bold">
                Show 40
              </option>
              <option value={50} className="font-bold">
                Show 50
              </option>
              <option value={100} className="font-bold">
                Show 100
              </option>
            </select>

            {/*start date  */}
            <div className="w-full xl:w-44 mx-1 mb-1">
              <DatePicker
                selected={startDate}
                onChange={(date) => setStartDate(date)}
                className="w-full overflow-hidden border input input-sm  rounded-full shadow hover:shadow-lg"
              />
            </div>

            {/*end date  */}
            <div className="w-full xl:w-44 mx-1 mb-1">
              <DatePicker
                selected={endDate}
                onChange={(date) => setEndDate(date)}
                className="w-full overflow-hidden border input input-sm  rounded-full shadow hover:shadow-lg"
              />
            </div>
            {/* search bar  */}
            <input
              value={searchText}
              onChange={handleSearchInputChange}
              type="text"
              placeholder="Type here"
              className="input input-bordered input-sm max-w-xs w-full xl:w-44 rounded-full mx-1 mb-1 shadow hover:shadow-lg"
            />
            <button
              onClick={handleClearSearch}
              type="button"
              className="btn btn-outline btn-sm rounded-full mx-1 hover:text-white shadow hover:shadow-lg"
            >
              Clear filter
            </button>
            <Link href={"sales/sales-entry"}>
              <button className="btn bg-green-500 text-white btn-sm rounded-full w-full ">
                Sales Entry
              </button>
            </Link>
            <button
              type="button"
              onClick={handleExcel}
              className="btn btn-outline btn-sm rounded-full mx-1 hover:text-white shadow hover:shadow-lg hover:gap-3"
            >
              Download <SiMicrosoftexcel className="text-lg " />
            </button>
          </form>

          {/* table data section start */}



                      {/* barcode  */}
                      <td className="text-center">
                        <button onClick={() => document.getElementById(`my_modal_bar_${index}`).showModal()} className="btn btn-outline btn-default btn-sm"><FaBarcode className="text-lg" /></button>
                        {/* bar code display */}
                        <dialog id={`my_modal_bar_${index}`} className="modal">
                          <div className="modal-box " style={{ maxWidth: '300px' }}>
                            <h3 className="font-bold text-lg text-center"> {data.customer?.name}</h3>
                            <h4 className="font-bold text-md text-center"> {data.customer?.phone_number}</h4>
                            <div className="flex justify-center">
                              {/* barcode  */}
                              <div ref={contentToPrintBR} className='p-2 mb-2'>
                                <Barcode value={data.id} className="rounded w-64 border" />
                              </div>
                            </div>
  
                            <div className="float-right flex gap-2">
                              <button onClick={() => { handlePrintBarcode() }} className="btn btn-active btn-ghost btn-sm">Print <PiPrinterThin /></button>
                              <form method="dialog">
                                <button className="btn btn-sm">Close</button>
                              </form>
                            </div>
                          </div>
                          <form method="dialog" className="modal-backdrop">
                            <button>close</button>
                          </form>
                        </dialog>
                      </td>
          {/* table data section end */}


                        {/* pagination section start */}
                        <div className="mx-auto text-center">
                <div className="join ">
                  <button className="join-item btn" onClick={prevPage}>
                    «
                  </button>
                  {page.map((page, index) => (
                    <button
                      key={index}
                      className="join-item btn"
                      onClick={() => setCurrentPage(page)}
                    >
                      {page}
                    </button>
                  ))}
                  <button className="join-item btn" onClick={nextPage}>
                    »
                  </button>
                </div>
              </div>
              {/* pagination section end */}



        </div>
      </div>
      {/* search bar end  */}
    </div>
  );
};

export default NoFile;
