import { BrowserRouter, Route, Router, Routes } from "react-router-dom";
import AddTask from "./components/AddTask";
import Layout from "./components/Layout";
import Protected from "./components/Protected";
import DialogProvider from "./context/modal-context";
import Dashboard from "./pages/Dashboard";
import Login from "./pages/Login";
import Setting from "./pages/Setting";
import Signup from "./pages/Signup";
import Tasks from "./pages/Tasks";

export default function App() {
  return (
    <DialogProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Login />}></Route>
          <Route path="/signup" element={<Signup />}></Route>
          <Route path="/home" element={<Protected />}>
            <Route path="dashboard" element={<Layout><Dashboard /></Layout>}></Route>
            <Route path="tasks" element={<Layout><Tasks /></Layout>}></Route>
            <Route path="add-task" element={<Layout><AddTask /></Layout>}></Route>
            <Route path="setting" element={<Layout><Setting /></Layout>}></Route>
          </Route>
        </Routes>
      </BrowserRouter>
    </DialogProvider >
  )
}