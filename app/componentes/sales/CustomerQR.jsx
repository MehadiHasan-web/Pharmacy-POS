'use client'
import { IoQrCodeOutline } from "react-icons/io5";
import { QRCodeSVG } from "qrcode.react";
import { PiPrinterThin } from "react-icons/pi";
import { useRef } from "react";
import { useReactToPrint } from "react-to-print";

const CustomerQR = ({ data, index }) => {
  const contentToPrintCustomer = useRef(null);

  // qr invoice customer code print
  const handlePrintCustomer = useReactToPrint({
    content: () => contentToPrintCustomer.current,
  });

  return (
    <>
        <button
          onClick={() =>
            document.getElementById(`my_modal_customer_${index}`).showModal()
          }
          className="btn btn-outline btn-default btn-sm"
        >
          <IoQrCodeOutline className="text-lg" />
        </button>
        {/* qr code display */}
        <dialog id={`my_modal_customer_${index}`} className="modal">
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
              {/* qrcode  */}
              <div ref={contentToPrintCustomer} className="p-2 mb-2">
                <QRCodeSVG
                  size={140}
                  value={URL + "/" + data.id}
                  className="p-2 border"
                />
              </div>
            </div>

            <div className="float-right flex gap-2">
              <button
                onClick={() => {
                  handlePrintCustomer();
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

export default CustomerQR;
