import React, { useCallback, useEffect, useState } from 'react';

export const DialogContext = React.createContext();

export default function DialogProvider({ children }) {
  const [isOpen, setIsOpen] = useState(false);
  const [title, setTitle] = useState("");
  const [type, setType] = useState("success");
  const [counter, setCounter] = useState(5);
  let color = "";

  const openDialog = useCallback(({ type, title }) => {
    setType(type);
    setTitle(title);
    setCounter(5);
    setIsOpen(true);
  }, [isOpen])
  const closeDialog = () => setIsOpen(false);



  if (type === "success") {
    color = "green";
  } else if (type === "error") {
    color = "red";
  } else if (type === "info") {
    color = "blue";
  }

  useEffect(() => {

      // const timer = setTimeout(() => {
      //   setIsOpen(false);
      // }, counter);
      // return () =>  {clearTimeout(timer)};

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
      {isOpen && (
        <div className={`w-full absolute transition-opacity duration-1000 ${isOpen ? 'opacity-100' : 'opacity-0'}`}>
          <div class={`bg-${color}-100 border-l-4 border-${color}-700 text-${color}-700 px-4 py-3 min-h-[70px] flex items-center justify-between min-w-[260px] w-[30%] max-w-[600px] rounded  mt-2 mx-auto shadow-md`} role="alert">
            <span class="block sm:inline">{title}</span>
            <span onClick={() => closeDialog()} class=" px-4 py-3 flex items-center">
              <svg class={`fill-current h-6 w-6 text-${color}-500`} role="button" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20"><title>Close</title><path d="M14.348 14.849a1.2 1.2 0 0 1-1.697 0L10 11.819l-2.651 3.029a1.2 1.2 0 1 1-1.697-1.697l2.758-3.15-2.759-3.152a1.2 1.2 0 1 1 1.697-1.697L10 8.183l2.651-3.031a1.2 1.2 0 1 1 1.697 1.697l-2.758 3.152 2.758 3.15a1.2 1.2 0 0 1 0 1.698z" /></svg>
            </span>
          </div>
        </div>
      )}
      {children}
    </DialogContext.Provider>
  );
}

