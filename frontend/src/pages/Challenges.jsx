import { useEffect, useState } from "react";
import api from "../api/axios";
import { Plus, Trophy, Calendar, X } from "lucide-react";

const Challenges = () => {
    const [challenges, setChallenges] = useState([]);
    const [myChallenges, setMyChallenges] = useState([]);
    const [loading, setLoading] = useState(true);
    const [filter, setFilter] = useState("all"); // 'all' or 'joined'
    const [showForm, setShowForm] = useState(false);
    const [newChallenge, setNewChallenge] = useState({
        title: "",
        description: "",
        goal: 0,
        points: 0,
        endDate: ""
    });

    useEffect(() => {
        fetchData();
    }, []);

    const fetchData = async () => {
        try {
            const [allRes, myRes] = await Promise.all([
                api.get("/challenges"),
                api.get("/challenges/my")
            ]);
            setChallenges(allRes.data);
            setMyChallenges(myRes.data);
        } catch (error) {
            console.error(error);
        } finally {
            setLoading(false);
        }
    };

    const handleCreate = async (e) => {
        e.preventDefault();
        try {
            await api.post("/challenges", newChallenge);
            alert("Challenge created successfully!");
            setShowForm(false);
            setNewChallenge({ title: "", description: "", goal: 0, points: 0, endDate: "" });
            fetchData(); // Refresh list
        } catch (error) {
            console.error(error);
            alert("Error creating challenge");
        }
    };

    const handleJoin = async (id) => {
        try {
            await api.post(`/challenges/${id}/join`);
            alert("Joined challenge!");
            fetchData(); // Refresh to update UI
        } catch (error) {
            console.error(error);
            alert("Error joining challenge");
        }
    };

    const handleUpdateProgress = async (challengeId, currentProgress, goal) => {
        const newProgress = parseInt(prompt(`Update progress (current: ${currentProgress}/${goal}):`, currentProgress));
        if (newProgress === null || isNaN(newProgress)) return;

        try {
            const res = await api.put(`/challenges/${challengeId}/progress`, { progress: newProgress });
            alert(res.data.message);
            fetchData(); // Refresh to show updates
        } catch (error) {
            console.error(error);
            alert("Error updating progress");
        }
    };

    const getParticipantInfo = (challengeId) => {
        return myChallenges.find(p =>
            (p.challengeId._id === challengeId || p.challengeId === challengeId)
        );
    };

    const isJoined = (challengeId) => {
        return !!getParticipantInfo(challengeId);
    };

    const filteredChallenges = filter === "joined"
        ? challenges.filter(c => isJoined(c._id))
        : challenges;

    return (
        <div className="space-y-6">
            <div className="flex justify-between items-center">
                <h1 className="text-2xl font-bold text-gray-900">Challenges</h1>
                <div className="flex items-center space-x-3">
                    <div className="flex bg-white rounded-lg p-1 border border-gray-200">
                        <button
                            onClick={() => setFilter("all")}
                            className={`px-4 py-2 rounded-md text-sm font-medium transition-colors ${filter === "all" ? "bg-green-100 text-green-700" : "text-gray-500 hover:text-gray-900"}`}
                        >
                            Browse All
                        </button>
                        <button
                            onClick={() => setFilter("joined")}
                            className={`px-4 py-2 rounded-md text-sm font-medium transition-colors ${filter === "joined" ? "bg-green-100 text-green-700" : "text-gray-500 hover:text-gray-900"}`}
                        >
                            My Challenges
                        </button>
                    </div>
                    <button
                        onClick={() => setShowForm(!showForm)}
                        className="flex items-center space-x-2 bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700 transition-colors"
                    >
                        <Plus className="w-5 h-5" />
                        <span>Create Challenge</span>
                    </button>
                </div>
            </div>

            {showForm && (
                <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
                    <div className="flex justify-between items-center mb-4">
                        <h3 className="font-bold text-lg">Create New Challenge</h3>
                        <button onClick={() => setShowForm(false)} className="text-gray-400 hover:text-gray-600">
                            <X className="w-5 h-5" />
                        </button>
                    </div>
                    <form onSubmit={handleCreate} className="space-y-4">
                        <input
                            type="text"
                            placeholder="Challenge Title (e.g., 30-Day Yoga Challenge)"
                            className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
                            value={newChallenge.title}
                            onChange={(e) => setNewChallenge({ ...newChallenge, title: e.target.value })}
                            required
                        />
                        <textarea
                            placeholder="Description"
                            className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
                            rows="3"
                            value={newChallenge.description}
                            onChange={(e) => setNewChallenge({ ...newChallenge, description: e.target.value })}
                            required
                        />
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                            <input
                                type="number"
                                placeholder="Goal (e.g., 30 days)"
                                className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
                                value={newChallenge.goal}
                                onChange={(e) => setNewChallenge({ ...newChallenge, goal: parseInt(e.target.value) })}
                                required
                            />
                            <input
                                type="number"
                                placeholder="Points Reward"
                                className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
                                value={newChallenge.points}
                                onChange={(e) => setNewChallenge({ ...newChallenge, points: parseInt(e.target.value) })}
                                required
                            />
                            <input
                                type="date"
                                className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
                                value={newChallenge.endDate}
                                onChange={(e) => setNewChallenge({ ...newChallenge, endDate: e.target.value })}
                                required
                            />
                        </div>
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
                                Create Challenge
                            </button>
                        </div>
                    </form>
                </div>
            )}

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {filteredChallenges.map((challenge) => {
                    const participantInfo = getParticipantInfo(challenge._id);
                    const joined = !!participantInfo;
                    const progress = participantInfo?.progress || 0;
                    const isCompleted = participantInfo?.completed || false;
                    const progressPercent = (progress / challenge.goal) * 100;

                    return (
                        <div key={challenge._id} className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 flex flex-col justify-between">
                            <div>
                                <div className="flex justify-between items-start mb-4">
                                    <span className="px-3 py-1 bg-blue-50 text-blue-600 text-xs font-semibold rounded-full">
                                        {challenge.points} PTS
                                    </span>
                                    {isCompleted && <span className="text-green-600 text-xs font-bold">✓ COMPLETED</span>}
                                    {joined && !isCompleted && <span className="text-green-600 text-xs font-bold">ACTIVE</span>}
                                </div>
                                <h3 className="font-bold text-lg text-gray-900 mb-2">{challenge.title}</h3>
                                <p className="text-gray-500 text-sm mb-4">{challenge.description}</p>

                                <div className="space-y-2 text-sm text-gray-400">
                                    <div className="flex items-center space-x-2">
                                        <Trophy className="w-4 h-4" />
                                        <span>Goal: {challenge.goal} units</span>
                                    </div>
                                    <div className="flex items-center space-x-2">
                                        <Calendar className="w-4 h-4" />
                                        <span>Ends {new Date(challenge.endDate).toLocaleDateString()}</span>
                                    </div>
                                </div>

                                {joined && (
                                    <div className="mt-4">
                                        <div className="flex justify-between text-sm mb-1">
                                            <span className="text-gray-600">Progress</span>
                                            <span className="font-semibold text-green-600">{progress}/{challenge.goal}</span>
                                        </div>
                                        <div className="w-full bg-gray-200 rounded-full h-2">
                                            <div
                                                className="bg-green-600 h-2 rounded-full transition-all"
                                                style={{ width: `${Math.min(progressPercent, 100)}%` }}
                                            ></div>
                                        </div>
                                    </div>
                                )}
                            </div>

                            {!joined ? (
                                <button
                                    onClick={() => handleJoin(challenge._id)}
                                    className="w-full mt-6 py-2 rounded-lg font-medium transition-colors bg-green-600 text-white hover:bg-green-700"
                                >
                                    Join Challenge
                                </button>
                            ) : (
                                <button
                                    onClick={() => !isCompleted && handleUpdateProgress(challenge._id, progress, challenge.goal)}
                                    disabled={isCompleted}
                                    className={`w-full mt-6 py-2 rounded-lg font-medium transition-colors ${isCompleted
                                            ? "bg-gray-100 text-gray-400 cursor-default"
                                            : "bg-black text-white hover:bg-gray-800"
                                        }`}
                                >
                                    {isCompleted ? "Completed!" : "Update Progress"}
                                </button>
                            )}
                        </div>
                    );
                })}
                {filteredChallenges.length === 0 && !loading && (
                    <p className="text-gray-500 col-span-3 text-center py-8">No challenges found.</p>
                )}
            </div>
        </div>
    );
};

export default Challenges;
