// Component
import Issue from "./pages/issue/Issue";
import { ToastContainer } from "react-toastify";

// CSS
import "./App.css";

export default function SearchForm() {
  return (
    <div className="font-notothai h-screen w-screen bg-gray-100 p-4 sm:p-6">
      <ToastContainer position="bottom-center" autoClose={1500} />
      <Issue />
    </div>
  );
}
