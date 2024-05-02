// "use client"
// import { useEffect, useState, useRef } from "react";
// import DatePicker from "react-datepicker";
// import "react-datepicker/dist/react-datepicker.css";
// import axios from "axios";
import Link from "next/link";
// import { IoQrCodeOutline } from "react-icons/io5";
// import { FaBarcode } from "react-icons/fa6";
// import { PiPrinterThin } from "react-icons/pi";
// import { SiMicrosoftexcel } from "react-icons/si";
// import { QRCodeSVG } from 'qrcode.react';
// import { useReactToPrint } from "react-to-print";
// import Barcode from "react-barcode";
// import { format } from "date-fns";
// import * as XLSX from 'xlsx/xlsx.mjs';
import getSales from "@/lib/getSales";
import CustomerQR from "@/app/componentes/sales/CustomerQR";
import BarCode from "@/app/componentes/sales/BarCode";

// import * as fs from 'fs';
// XLSX.set_fs(fs);

export default async function SalesRequest() {
  // data loaded from server
  const data = await getSales();


  return (
    <>
      {/* title section end */}
      {/* table history  */}
      <div>
        <div className="md:container md:mx-auto px-2 md:px-12">
          <div className="flex justify-start my-3 ">
            <h2 className="w-34  font-semibold border-b-[1px] border-indigo-500 mx-auto text-lg">
              Sales Request:
            </h2>
          </div>

          <div className="overflow-x-auto  shadow-lg rounded">
            <table className="table text-base">
              {/* head */}
              <thead className="bg-slate-200	">
                <tr>
                  <th className="text-black text-center">No.</th>
                  <th className="text-black text-center">Sales ID</th>
                  <th className="text-black text-center">Customer Name</th>
                  <th className="text-black text-center">Customer Number</th>
                  <th className="text-black text-center">Customer Address</th>
                  <th className="text-black text-center">Date</th>
                  <th className="text-black text-center">Total Price</th>
                  <th className="text-black text-center">Invoice</th>
                  <th className="text-black text-center">Invoice QR</th>
                  <th className="text-black text-center">Barcode</th>
                </tr>
              </thead>
              <tbody>
                {data.map((data, index) => (
                  <tr
                    key={data.id}
                    className={`${
                      index % 2 == 1
                        ? "bg-slate-100 border-b-[1px] border-slate-100"
                        : "bg-white border-b-[1px] border-slate-100"
                    } hover:bg-green-50`}
                  >
                    <td className="text-center">{++index}</td>
                    <td className="text-center">{data.id}</td>
                    <td className="text-center">
                      <div className="flex items-center gap-1">
                        <div>
                          <div className="font-bold capitalize">
                            {data.customer?.name}
                          </div>
                        </div>
                      </div>
                    </td>
                    <td className="text-center">
                      <p>{data.customer?.phone_number} </p>
                    </td>
                    <td className="text-center">
                      <p>{data.customer?.address}</p>
                    </td>
                    <td className="text-center">
                      <p>{data.created_date} </p>
                    </td>
                    <td className="text-center">
                      <p>TK {data.total}</p>
                    </td>
                    {/* invoice start */}
                    <td className="text-center">
                      <Link href={`sales/${data.id}`}>
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
                    {/* invoice end */}
                    {/*customer QR start*/}
                    <td className="text-center">
                      <CustomerQR data={data} index={index}></CustomerQR>
                    </td>
                    {/*customer QR end*/}
                    {/* barCode start */}
                    <td className="text-center">
                      <BarCode data={data} index={index}></BarCode>
                    </td>
                    {/* barCode end */}
                  </tr>
                ))}
              </tbody>
              {/* foot */}
              <tfoot className="bg-slate-200	">
                <tr>
                  <th className="text-black text-center">No.</th>
                  <th className="text-black text-center">Sales ID</th>
                  <th className="text-black text-center">Customer Name</th>
                  <th className="text-black text-center">Customer Number</th>
                  <th className="text-black text-center">Customer Address</th>
                  <th className="text-black text-center">Date</th>
                  <th className="text-black text-center">Total Price</th>
                  <th className="text-black text-center">Invoice</th>
                  <th className="text-black text-center">Invoice QR </th>
                  <th className="text-black text-center">Barcode</th>
                </tr>
              </tfoot>
            </table>
          </div>
        </div>
      </div>
    </>
  );
}
