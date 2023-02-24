import { BrowserRouter, Route, Router, Routes } from "react-router-dom";
import DialogProvider from "./context/modal-context";
import Login from "./pages/Login";
import Signup from "./pages/Signup";

export default function App() {
  return (
    <DialogProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Login />}></Route>
          <Route path="/signup" element={<Signup />}></Route>
        </Routes>
      </BrowserRouter>
    </DialogProvider>
  )
}