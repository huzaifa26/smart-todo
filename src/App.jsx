import { BrowserRouter, Route, Router, Routes } from "react-router-dom";
import AddTask from "./components/AddTask";
import Layout from "./components/Layout";
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
          <Route path="/dashboard" element={<Layout />}>
            <Route index element={<Dashboard />}></Route>
            <Route path="tasks" element={<Tasks />}></Route>
            <Route path="add-task" element={<AddTask />}></Route>
            <Route path="setting" element={<Setting />}></Route>
          </Route>
        </Routes>
      </BrowserRouter>
    </DialogProvider>
  )
}