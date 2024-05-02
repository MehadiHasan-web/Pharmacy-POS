'use client'

import { FaBarcode } from "react-icons/fa6";
import Barcode from "react-barcode";
import { PiPrinterThin } from "react-icons/pi";
import { useRef } from "react";
import { useReactToPrint } from "react-to-print";

const BarCode = ({ data, index }) => {

  const contentToPrintBR = useRef(null);

   // barcode  code print
   const handlePrintBarcode = useReactToPrint({
    content: () => contentToPrintBR.current,
  });


  return (
    <>
        <button
          onClick={() =>
            document.getElementById(`my_modal_bar_${index}`).showModal()
          }
          className="btn btn-outline btn-default btn-sm"
        >
          <FaBarcode className="text-lg" />
        </button>
        {/* bar code display */}
        <dialog id={`my_modal_bar_${index}`} className="modal">
          <div className="modal-box " style={{ maxWidth: "300px" }}>
            <h3 className="font-bold text-lg text-center">
              {" "}
              {data.customer?.name}
            </h3>
            <h4 className="font-bold text-md text-center">
              {" "}
              {data.customer?.phone_number}
            </h4>
            <div className="flex justify-center">
              {/* barcode  */}
              <div ref={contentToPrintBR} className="p-2 mb-2">
                <Barcode value={data.id} className="rounded w-64 border" />
              </div>
            </div>

            <div className="float-right flex gap-2">
              <button
                onClick={() => {
                  handlePrintBarcode();
                }}
                className="btn btn-active btn-ghost btn-sm"
              >
                Print <PiPrinterThin />
              </button>
              <form method="dialog">
                <button className="btn btn-sm">Close</button>
              </form>
            </div>
          </div>
          <form method="dialog" className="modal-backdrop">
            <button>close</button>
          </form>
        </dialog>
    </>
  );
};

export default BarCode;
