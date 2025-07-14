import { BrowserRouter as Router, Routes, Route } from "react-router-dom";


import {Home} from "./pages/Home";
import {Login} from "./pages/Login";
import {Register} from "./pages/Register";
import Navbar from "./components/Navbar";
import {AdminDashboard} from "./pages/AdminDashboard";
import CourseList from "./pages/CourseList";
import CourseDetail from "./pages/CourseDetail";

function App() {
  return (
    <Router>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/courselist" element={<CourseList />} />
        <Route path="/course/:id" element={<CourseDetail />} />
        <Route path="/admin" element={<AdminDashboard />} />
      </Routes>
    </Router>
  );
}

export default App;
