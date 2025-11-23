import { Outlet } from "react-router-dom";
import AdminPanel from "../pages/AdminPanel"; 

export default function AdminPanelLayout() {
  return (
    <div className="flex min-h-screen bg-gray-50">
    
      <AdminPanel />

      <main className="flex-1 transition-all duration-300" style={{ marginLeft: "5rem" }}>
        <div className="pt-24 px-6 pb-6">  
          <Outlet />  
        </div>
      </main>
    </div>
  );
}