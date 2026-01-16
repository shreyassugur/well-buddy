import { useEffect, useState } from "react";
import api from "../api/axios";
import { Medal } from "lucide-react";

const Leaderboard = () => {
    const [users, setUsers] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchLeaderboard = async () => {
            try {
                const res = await api.get("/leaderboard");
                setUsers(res.data);
            } catch (error) {
                console.error(error);
            } finally {
                setLoading(false);
            }
        };
        fetchLeaderboard();
    }, []);

    return (
        <div className="space-y-6">
            <div className="text-center md:text-left">
                <h1 className="text-2xl font-bold text-gray-900">Leaderboard</h1>
                <p className="text-gray-500">See how you rank against the community</p>
            </div>

            <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
                <div className="overflow-x-auto">
                    <table className="w-full">
                        <thead className="bg-gray-50 text-gray-500 text-sm">
                            <tr>
                                <th className="px-6 py-4 text-left font-medium">Rank</th>
                                <th className="px-6 py-4 text-left font-medium">User</th>
                                <th className="px-6 py-4 text-right font-medium">Points</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-gray-100">
                            {users.map((user) => (
                                <tr key={user.userId} className="hover:bg-gray-50 transition-colors">
                                    <td className="px-6 py-4">
                                        <div className="flex items-center space-x-2">
                                            {user.rank === 1 && <Medal className="w-5 h-5 text-yellow-500" />}
                                            {user.rank === 2 && <Medal className="w-5 h-5 text-gray-400" />}
                                            {user.rank === 3 && <Medal className="w-5 h-5 text-orange-400" />}
                                            <span className={`font-bold ${user.rank <= 3 ? "text-gray-900" : "text-gray-500"}`}>
                                                #{user.rank}
                                            </span>
                                        </div>
                                    </td>
                                    <td className="px-6 py-4">
                                        <div className="flex items-center space-x-3">
                                            <div className="w-8 h-8 rounded-full bg-green-100 flex items-center justify-center text-green-700 font-bold text-xs">
                                                {user.name.charAt(0).toUpperCase()}
                                            </div>
                                            <span className="text-gray-900 font-medium">{user.name}</span>
                                        </div>
                                    </td>
                                    <td className="px-6 py-4 text-right">
                                        <span className="text-green-600 font-bold">{user.points.toLocaleString()}</span>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
                {users.length === 0 && !loading && (
                    <p className="text-gray-500 text-center py-8">Leaderboard empty.</p>
                )}
            </div>
        </div>
    );
};

export default Leaderboard;
