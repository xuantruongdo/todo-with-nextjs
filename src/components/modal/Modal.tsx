"use client"

import React from "react";

interface IProps{
    isOpen: boolean;
    closeModal: () => void;
    children: React.ReactNode;
}
const Modal = (props: IProps) => {
    const { isOpen, closeModal, children } = props;
    return ( 
        <>
        {isOpen && (
          <div className="fixed inset-0 overflow-y-auto z-50">
            <div className="flex items-center justify-center min-h-screen">
              <div className="fixed inset-0 transition-opacity" onClick={closeModal}>
                <div className="absolute inset-0 bg-gray-500 opacity-75"></div>
              </div>
              <div className="bg-white p-4 rounded shadow-md z-10 min-w-[50vw]">
                {children}
              </div>
            </div>
          </div>
        )}
      </>
     );
}
 
export default Modal;