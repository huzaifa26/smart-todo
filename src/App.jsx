import { BrowserRouter, Route, Router, Routes } from "react-router-dom";
import AddTask from "./components/AddTask";
import EditTask from "./components/EditTask";
import Layout from "./components/Layout";
import Protected from "./components/Protected";
import DialogProvider from "./context/modal-context";
import Dashboard from "./pages/Dashboard";
import Login from "./pages/Login";
import Setting from "./pages/Setting";
import Signup from "./pages/Signup";
import Tasks from "./pages/Tasks";
import Profile from "./components/Profile";
import OtherSetting from "./components/OtherSetting";

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
            <Route path="Edit-task" element={<Layout><EditTask /></Layout>}></Route>
            <Route path="setting" element={<Layout><Setting /></Layout>}>
              <Route index element={<Profile></Profile>}></Route>
              <Route path="other" element={<OtherSetting></OtherSetting>}></Route>
            </Route>
          </Route>
        </Routes>
      </BrowserRouter>
    </DialogProvider >
  )
}