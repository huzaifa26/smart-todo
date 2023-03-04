import React, { useCallback, useEffect, useRef, useState } from 'react';
import { DialogContext } from '../components/constants';

export default function DialogProvider({ children }) {
  const [isOpen, setIsOpen] = useState(false);
  const [title, setTitle] = useState("");
  const [type, setType] = useState("success");
  const [counter, setCounter] = useState(5);

  const openDialog = useCallback(({ type, title }) => {
    setType(type);
    setTitle(title);
    setCounter(5);
    setIsOpen(true);
  }, [isOpen])

  const closeDialog = () => setIsOpen(false);

  useEffect(() => {
    const interval = setInterval(() => {
      setCounter((counter) => {
        if (counter === 1) {
          setIsOpen(false);
        }
        return counter - 1
      });
    }, 1000)
    return () => clearInterval(interval);
  }, []);



  return (
    <DialogContext.Provider value={{ openDialog, closeDialog }}>
        <div style={{opacity:isOpen?"100":"0",transform:isOpen?"scale(1)":"scale(0)"}} className={`w-full absolute transition-all duration-200`}>
          <div style={type === "error" ? {background:"#fee2e2",borderColor:"#B91C1C",color:"#B91C1C"} : type === "info" ? {background:"#DBEAFE",borderColor:"#1D4ED8",color:"#1D4ED8"} : {background:"#DCFCE7",borderColor:"#15803D",color:"#15803D"}} className={` border-l-4 px-4 py-3 min-h-[70px] flex items-center justify-between min-w-[260px] w-[30%] max-w-[600px] rounded  mt-2 mx-auto shadow-md`} role="alert">
            <span className="block sm:inline">{title}</span>
            <span onClick={() => closeDialog()} className="px-4 py-3 flex items-center">
              <svg className={`fill-current h-6 w-6`} role="button" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20"><title>Close</title><path d="M14.348 14.849a1.2 1.2 0 0 1-1.697 0L10 11.819l-2.651 3.029a1.2 1.2 0 1 1-1.697-1.697l2.758-3.15-2.759-3.152a1.2 1.2 0 1 1 1.697-1.697L10 8.183l2.651-3.031a1.2 1.2 0 1 1 1.697 1.697l-2.758 3.152 2.758 3.15a1.2 1.2 0 0 1 0 1.698z" /></svg>
            </span>
          </div>
        </div>
      {children}
    </DialogContext.Provider>
  );
}

