import { NavLink } from "react-router";
import {
    LayoutDashboard,
    CheckSquare,
    Dumbbell,
    Target,
    Trophy,
    User,
    LogOut,
    MessageSquare
} from "lucide-react";

// Assuming we might have an auth context to call logout
// import { useAuth } from "../context/AuthContext";

const Sidebar = () => {
    // const { logout } = useAuth(); 

    const navItems = [
        { to: "/app/dashboard", icon: LayoutDashboard, label: "Dashboard" },
        { to: "/app/habits", icon: CheckSquare, label: "Habits" },
        { to: "/app/workouts", icon: Dumbbell, label: "Workouts" },
        { to: "/app/challenges", icon: Target, label: "Challenges" },
        { to: "/app/leaderboard", icon: Trophy, label: "Leaderboard" },
        { to: "/app/profile", icon: User, label: "Profile" },
        { to: "/app/chat", icon: MessageSquare, label: "AI Chat" },
    ];

    return (
        <div className="flex flex-col h-screen w-64 bg-white border-r border-gray-200">
            <div className="p-6 flex items-center space-x-2">
                <div className="w-8 h-8 bg-green-600 rounded-lg flex items-center justify-center text-white font-bold">W</div>
                <span className="text-xl font-bold text-gray-800">WellBuddy</span>
            </div>

            <nav className="flex-1 px-4 space-y-2 mt-4">
                {navItems.map((item) => (
                    <NavLink
                        key={item.to}
                        to={item.to}
                        className={({ isActive }) =>
                            `flex items-center space-x-3 px-4 py-3 rounded-lg transition-colors ${isActive
                                ? "bg-green-50 text-green-600 font-medium"
                                : "text-gray-600 hover:bg-gray-50 hover:text-gray-900"
                            }`
                        }
                    >
                        <item.icon className="w-5 h-5" />
                        <span>{item.label}</span>
                    </NavLink>
                ))}
            </nav>

            <div className="p-4 border-t border-gray-200">
                <button
                    onClick={() => {
                        // Dispatch logout event or call context
                        // For now just redirect or let Parent handle
                        window.location.href = "/users/login";
                    }}
                    className="flex items-center space-x-3 px-4 py-3 w-full text-left text-red-500 hover:bg-red-50 rounded-lg transition-colors"
                >
                    <LogOut className="w-5 h-5" />
                    <span>Logout</span>
                </button>
            </div>
        </div>
    );
};

export default Sidebar;
