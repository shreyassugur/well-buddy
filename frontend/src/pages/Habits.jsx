import { useEffect, useState } from "react";
import api from "../api/axios";
import { Plus, Trash2, Check, X } from "lucide-react";

const Habits = () => {
    const [habits, setHabits] = useState([]);
    const [loading, setLoading] = useState(true);
    const [showForm, setShowForm] = useState(false);
    const [newHabit, setNewHabit] = useState({ title: "", description: "" });

    const fetchHabits = async () => {
        try {
            const res = await api.get("/habits");
            setHabits(res.data);

            // Also fetch today's logs to mark as completed?
            // Ideally backend would return 'isCompletedToday' field or we fetch logs separately.
            // For simplicity, we just show the list for now. To be robust, we need logs.
            // Let's assume user just clicks to log and we show success toast/state change.
        } catch (error) {
            console.error(error);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchHabits();
    }, []);

    const handleCreateWrapper = async (e) => {
        e.preventDefault();
        try {
            const res = await api.post("/habits", newHabit);
            setHabits([...habits, res.data]);
            setShowForm(false);
            setNewHabit({ title: "", description: "" });
        } catch (error) {
            console.error(error);
        }
    };

    const handleDelete = async (id) => {
        if (!window.confirm("Delete this habit?")) return;
        try {
            await api.delete(`/habits/${id}`);
            setHabits(habits.filter(h => h._id !== id));
        } catch (error) {
            console.error(error);
        }
    };

    const handleLog = async (id) => {
        try {
            await api.post(`/habits/${id}/log`);
            alert("Habit logged! +10 Points");
            // Ideally update UI to show "Done" for today
        } catch (error) {
            console.error(error);
            alert("Error logging habit");
        }
    };

    return (
        <div className="space-y-6">
            <div className="flex justify-between items-center">
                <h1 className="text-2xl font-bold text-gray-900">Your Habits</h1>
                <button
                    onClick={() => setShowForm(!showForm)}
                    className="flex items-center space-x-2 bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700 transition-colors"
                >
                    <Plus className="w-5 h-5" />
                    <span>Add Habit</span>
                </button>
            </div>

            {showForm && (
                <form onSubmit={handleCreateWrapper} className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
                    <h3 className="font-bold mb-4">New Habit</h3>
                    <div className="space-y-4">
                        <input
                            type="text"
                            placeholder="Habit Title (e.g., Morning Jog)"
                            className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
                            value={newHabit.title}
                            onChange={(e) => setNewHabit({ ...newHabit, title: e.target.value })}
                            required
                        />
                        <input
                            type="text"
                            placeholder="Description (Optional)"
                            className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
                            value={newHabit.description}
                            onChange={(e) => setNewHabit({ ...newHabit, description: e.target.value })}
                        />
                        <div className="flex justify-end space-x-2">
                            <button
                                type="button"
                                onClick={() => setShowForm(false)}
                                className="px-4 py-2 text-gray-500 hover:bg-gray-100 rounded-lg"
                            >
                                Cancel
                            </button>
                            <button
                                type="submit"
                                className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700"
                            >
                                Create
                            </button>
                        </div>
                    </div>
                </form>
            )}

            <div className="grid gap-4">
                {habits.map((habit) => (
                    <div key={habit._id} className="bg-white p-4 rounded-xl shadow-sm border border-gray-100 flex justify-between items-center">
                        <div>
                            <h3 className="font-bold text-lg text-gray-900">{habit.title}</h3>
                            <p className="text-gray-500 text-sm">{habit.description || "Daily"}</p>
                        </div>
                        <div className="flex items-center space-x-2">
                            <button
                                onClick={() => handleLog(habit._id)}
                                className="p-2 bg-green-50 text-green-600 rounded-lg hover:bg-green-100"
                                title="Mark Complete"
                            >
                                <Check className="w-5 h-5" />
                            </button>
                            <button
                                onClick={() => handleDelete(habit._id)}
                                className="p-2 text-gray-400 hover:text-red-500 rounded-lg"
                                title="Delete"
                            >
                                <Trash2 className="w-5 h-5" />
                            </button>
                        </div>
                    </div>
                ))}
                {habits.length === 0 && !loading && (
                    <p className="text-gray-500 text-center py-8">No habits yet. Start by adding one!</p>
                )}
            </div>
        </div>
    );
};

export default Habits;
