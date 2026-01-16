import { useEffect, useState } from "react";
import api from "../api/axios";
import { User, Mail, Shield, Award, Scale, Ruler, Calendar, Edit2, Save, X } from "lucide-react";

const Profile = () => {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);
    const [isEditing, setIsEditing] = useState(false);
    const [editForm, setEditForm] = useState({
        age: "",
        weight: "",
        height: ""
    });

    useEffect(() => {
        fetchProfile();
    }, []);

    const fetchProfile = async () => {
        try {
            const res = await api.get("/auth/profile");
            setUser(res.data);
            setEditForm({
                age: res.data.age || "",
                weight: res.data.weight || "",
                height: res.data.height || ""
            });
        } catch (error) {
            console.error(error);
        } finally {
            setLoading(false);
        }
    };

    const handleResetPoints = async () => {
        if (!window.confirm("Are you sure you want to reset your points to 0? This action cannot be undone!")) {
            return;
        }

        try {
            const res = await api.post("/auth/reset-points");
            alert("Points reset successfully!");
            setUser(res.data.user);
        } catch (error) {
            console.error(error);
            alert("Error resetting points");
        }
    };

    const handleEditToggle = () => {
        if (isEditing) {
            // Cancel editing - reset form
            setEditForm({
                age: user.age || "",
                weight: user.weight || "",
                height: user.height || ""
            });
        }
        setIsEditing(!isEditing);
    };

    const handleSave = async () => {
        try {
            const updates = {
                age: editForm.age ? parseInt(editForm.age) : null,
                weight: editForm.weight ? parseFloat(editForm.weight) : null,
                height: editForm.height ? parseFloat(editForm.height) : null
            };

            const res = await api.put("/auth/profile", updates);
            setUser(res.data.user);
            setIsEditing(false);
            alert("Profile updated successfully!");
        } catch (error) {
            console.error(error);
            alert("Error updating profile");
        }
    };

    // Calculate BMI if weight and height are available
    const calculateBMI = () => {
        if (user?.weight && user?.height) {
            const heightInMeters = user.height / 100;
            const bmi = (user.weight / (heightInMeters * heightInMeters)).toFixed(1);
            return bmi;
        }
        return null;
    };

    const bmi = calculateBMI();

    if (loading) return <div>Loading...</div>;
    if (!user) return <div>Error loading profile</div>;

    return (
        <div className="space-y-6">
            <h1 className="text-2xl font-bold text-gray-900">My Profile</h1>

            <div className="bg-white p-8 rounded-xl shadow-sm border border-gray-100 flex flex-col md:flex-row items-center md:items-start space-y-4 md:space-y-0 md:space-x-8">
                <div className="w-24 h-24 bg-green-100 rounded-full flex items-center justify-center text-green-700 text-3xl font-bold">
                    {user.name ? user.name.charAt(0).toUpperCase() : "U"}
                </div>

                <div className="flex-1 text-center md:text-left space-y-2">
                    <h2 className="text-2xl font-bold text-gray-900">{user.name}</h2>
                    <p className="text-gray-500">@{user.email.split('@')[0]}</p>

                    <div className="pt-2 flex flex-wrap justify-center md:justify-start gap-4">
                        <div className="flex items-center space-x-2 text-gray-600 bg-gray-50 px-3 py-1 rounded-full text-sm">
                            <Mail className="w-4 h-4" />
                            <span>{user.email}</span>
                        </div>
                        <div className="flex items-center space-x-2 text-gray-600 bg-gray-50 px-3 py-1 rounded-full text-sm">
                            <Shield className="w-4 h-4" />
                            <span className="capitalize">{user.role}</span>
                        </div>
                    </div>
                </div>

                <div className="bg-green-50 p-6 rounded-xl text-center min-w-[150px]">
                    <p className="text-green-600 font-medium mb-1">Total Points</p>
                    <p className="text-3xl font-bold text-green-700">{user.totalPoints}</p>
                    <div className="mt-2 flex justify-center text-green-600">
                        <Award className="w-5 h-5" />
                    </div>
                </div>
            </div>

            {/* Health Metrics Section */}
            <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
                <div className="flex justify-between items-center mb-4">
                    <h3 className="font-bold text-lg">Health Metrics</h3>
                    {!isEditing ? (
                        <button
                            onClick={handleEditToggle}
                            className="flex items-center space-x-2 px-4 py-2 bg-green-50 text-green-600 rounded-lg hover:bg-green-100 transition-colors"
                        >
                            <Edit2 className="w-4 h-4" />
                            <span>Edit</span>
                        </button>
                    ) : (
                        <div className="flex space-x-2">
                            <button
                                onClick={handleSave}
                                className="flex items-center space-x-2 px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors"
                            >
                                <Save className="w-4 h-4" />
                                <span>Save</span>
                            </button>
                            <button
                                onClick={handleEditToggle}
                                className="flex items-center space-x-2 px-4 py-2 bg-gray-100 text-gray-600 rounded-lg hover:bg-gray-200 transition-colors"
                            >
                                <X className="w-4 h-4" />
                                <span>Cancel</span>
                            </button>
                        </div>
                    )}
                </div>

                {!isEditing ? (
                    // Display mode
                    <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                        <div className="flex items-center space-x-3 p-4 bg-blue-50 rounded-lg">
                            <Calendar className="w-5 h-5 text-blue-600" />
                            <div>
                                <p className="text-xs text-gray-500">Age</p>
                                <p className="font-bold text-gray-900">{user.age || "Not set"} {user.age && "years"}</p>
                            </div>
                        </div>
                        <div className="flex items-center space-x-3 p-4 bg-purple-50 rounded-lg">
                            <Scale className="w-5 h-5 text-purple-600" />
                            <div>
                                <p className="text-xs text-gray-500">Weight</p>
                                <p className="font-bold text-gray-900">{user.weight || "Not set"} {user.weight && "kg"}</p>
                            </div>
                        </div>
                        <div className="flex items-center space-x-3 p-4 bg-green-50 rounded-lg">
                            <Ruler className="w-5 h-5 text-green-600" />
                            <div>
                                <p className="text-xs text-gray-500">Height</p>
                                <p className="font-bold text-gray-900">{user.height || "Not set"} {user.height && "cm"}</p>
                            </div>
                        </div>
                        {bmi && (
                            <div className="flex items-center space-x-3 p-4 bg-orange-50 rounded-lg">
                                <Award className="w-5 h-5 text-orange-600" />
                                <div>
                                    <p className="text-xs text-gray-500">BMI</p>
                                    <p className="font-bold text-gray-900">{bmi}</p>
                                </div>
                            </div>
                        )}
                    </div>
                ) : (
                    // Edit mode
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">Age (years)</label>
                            <input
                                type="number"
                                value={editForm.age}
                                onChange={(e) => setEditForm({ ...editForm, age: e.target.value })}
                                placeholder="Enter age"
                                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
                            />
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">Weight (kg)</label>
                            <input
                                type="number"
                                step="0.1"
                                value={editForm.weight}
                                onChange={(e) => setEditForm({ ...editForm, weight: e.target.value })}
                                placeholder="Enter weight"
                                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
                            />
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">Height (cm)</label>
                            <input
                                type="number"
                                step="0.1"
                                value={editForm.height}
                                onChange={(e) => setEditForm({ ...editForm, height: e.target.value })}
                                placeholder="Enter height"
                                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
                            />
                        </div>
                    </div>
                )}
            </div>

            {/* Actions Section */}
            <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
                <h3 className="font-bold text-lg mb-4">Actions</h3>
                <div className="space-y-3">
                    <button
                        onClick={handleResetPoints}
                        className="w-full md:w-auto px-6 py-3 bg-red-50 text-red-600 rounded-lg hover:bg-red-100 transition-colors font-medium flex items-center justify-center space-x-2"
                    >
                        <span>🔄</span>
                        <span>Reset Points to 0</span>
                    </button>
                    <p className="text-gray-500 text-sm">
                        Use this to start a new wellness journey or participate in a new leaderboard season.
                    </p>
                </div>
            </div>
        </div>
    );
};

export default Profile;
