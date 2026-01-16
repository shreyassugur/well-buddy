import { Outlet } from "react-router";
import Sidebar from "./Sidebar";
import { Bell } from "lucide-react";
import { useAuth } from "../context/AuthContext";

const Layout = () => {
    const { user } = useAuth();

    // Get first letter of user's name, fallback to 'U' if no user
    const userInitial = user?.name ? user.name.charAt(0).toUpperCase() : 'U';

    return (
        <div className="flex h-screen bg-slate-50">
            <Sidebar />

            <div className="flex-1 flex flex-col overflow-hidden">
                {/* Top Header */}
                <header className="h-16 bg-white border-b border-gray-200 flex items-center justify-end px-8 space-x-4">
                    <button className="p-2 text-gray-500 hover:bg-gray-100 rounded-full">
                        <Bell className="w-5 h-5" />
                    </button>

                    <div className="w-8 h-8 bg-green-600 rounded-full flex items-center justify-center text-white font-medium">
                        {userInitial}
                    </div>
                </header>

                {/* Main Content */}
                <main className="flex-1 overflow-y-auto p-8">
                    <Outlet />
                </main>
            </div>
        </div>
    );
};

export default Layout;
