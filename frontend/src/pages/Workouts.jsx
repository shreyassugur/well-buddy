import { useEffect, useState } from "react";
import api from "../api/axios";
import { Plus, Play, Dumbbell } from "lucide-react";

const Workouts = () => {
    const [workouts, setWorkouts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [showForm, setShowForm] = useState(false);
    const [newWorkout, setNewWorkout] = useState({ name: "", type: "strength", durationMinutes: 30 });

    const fetchWorkouts = async () => {
        try {
            const res = await api.get("/workouts");
            setWorkouts(res.data);
        } catch (error) {
            console.error(error);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchWorkouts();
    }, []);

    const handleCreate = async (e) => {
        e.preventDefault();
        try {
            const res = await api.post("/workouts", newWorkout);
            setWorkouts([...workouts, res.data]);
            setShowForm(false);
            setNewWorkout({ name: "", type: "strength", durationMinutes: 30 });
        } catch (error) {
            console.error(error);
        }
    };

    const handleLogWorkout = async (workoutId) => {
        try {
            await api.post("/workouts/log", { workoutId });
            alert("Workout logged! +50 Points");
        } catch (error) {
            console.error(error);
            alert("Error logging workout");
        }
    };

    return (
        <div className="space-y-6">
            <div className="flex justify-between items-center">
                <h1 className="text-2xl font-bold text-gray-900">My Workouts</h1>
                <button
                    onClick={() => setShowForm(!showForm)}
                    className="flex items-center space-x-2 bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700 transition-colors"
                >
                    <Plus className="w-5 h-5" />
                    <span>Add Workout</span>
                </button>
            </div>

            {showForm && (
                <form onSubmit={handleCreate} className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
                    <h3 className="font-bold mb-4">Create Workout Plan</h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <input
                            type="text"
                            placeholder="Workout Name (e.g., Full Body HIIT)"
                            className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 col-span-2"
                            value={newWorkout.name}
                            onChange={(e) => setNewWorkout({ ...newWorkout, name: e.target.value })}
                            required
                        />
                        <select
                            className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
                            value={newWorkout.type}
                            onChange={(e) => setNewWorkout({ ...newWorkout, type: e.target.value })}
                        >
                            <option value="strength">Strength</option>
                            <option value="cardio">Cardio</option>
                            <option value="flexibility">Flexibility</option>
                        </select>
                        <input
                            type="number"
                            placeholder="Duration (minutes)"
                            className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
                            value={newWorkout.durationMinutes}
                            onChange={(e) => setNewWorkout({ ...newWorkout, durationMinutes: parseInt(e.target.value) })}
                            required
                        />
                    </div>
                    <div className="flex justify-end space-x-2 mt-4">
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
                            Save Plan
                        </button>
                    </div>
                </form>
            )}

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {workouts.map((workout) => (
                    <div key={workout._id} className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 flex flex-col justify-between h-48">
                        <div>
                            <div className="flex justify-between items-start">
                                <div className="p-2 bg-green-50 rounded-lg inline-block text-green-600 mb-3">
                                    <Dumbbell className="w-5 h-5" />
                                </div>
                                <span className="text-xs font-semibold px-2 py-1 bg-gray-100 text-gray-600 rounded-full capitalize">{workout.type}</span>
                            </div>
                            <h3 className="font-bold text-lg text-gray-900">{workout.name}</h3>
                            <p className="text-gray-500 text-sm">{workout.durationMinutes} mins</p>
                        </div>
                        <button
                            onClick={() => handleLogWorkout(workout._id)}
                            className="w-full mt-4 flex items-center justify-center space-x-2 bg-black text-white px-4 py-2 rounded-lg hover:bg-gray-800 transition-colors"
                        >
                            <Play className="w-4 h-4" />
                            <span>Start Session</span>
                        </button>
                    </div>
                ))}
                {workouts.length === 0 && !loading && (
                    <p className="text-gray-500 col-span-3 text-center py-8">No workouts found. Create one to get started!</p>
                )}
            </div>
        </div>
    );
};

export default Workouts;
