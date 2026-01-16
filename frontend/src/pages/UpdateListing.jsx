import { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router';
import api from '../api/axios';
import toast from 'react-hot-toast';

const UpdateListing = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const [loading, setLoading] = useState(true);
    const [formData, setFormData] = useState({
        name: '',
        location: '',
        price: '',
        image: ''
    });

    useEffect(() => {
        const fetchVehicle = async () => {
            try {
                const res = await api.get(`/vehicles/${id}`);
                const vehicle = res.data;
                setFormData({
                    name: vehicle.name,
                    location: vehicle.location,
                    price: vehicle.price,
                    image: vehicle.images && vehicle.images.length > 0 ? vehicle.images[0] : ''
                });
            } catch (error) {
                toast.error("Failed to load vehicle details");
                navigate('/dashboard');
            } finally {
                setLoading(false);
            }
        };
        fetchVehicle();
    }, [id, navigate]);

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const payload = {
                ...formData,
                price: Number(formData.price),
                images: formData.image ? [formData.image] : []
            };
            delete payload.image;

            await api.put(`/vehicles/${id}`, payload);
            toast.success('Vehicle updated successfully!');
            navigate('/dashboard');
        } catch (error) {
            toast.error(error.response?.data?.message || 'Failed to update listing');
        }
    };

    if (loading) return <div className="text-center p-10">Loading...</div>;

    return (
        <div className="container mx-auto p-4 max-w-lg">
            <h1 className="text-2xl font-bold mb-4">Update Listing</h1>
            <form onSubmit={handleSubmit} className="space-y-4">
                <input
                    type="text"
                    placeholder="Vehicle Name"
                    className="w-full border p-2 rounded"
                    value={formData.name}
                    onChange={e => setFormData({ ...formData, name: e.target.value })}
                    required
                />
                <input
                    type="text"
                    placeholder="Location"
                    className="w-full border p-2 rounded"
                    value={formData.location}
                    onChange={e => setFormData({ ...formData, location: e.target.value })}
                    required
                />
                <input
                    type="number"
                    placeholder="Price per day"
                    className="w-full border p-2 rounded"
                    value={formData.price}
                    onChange={e => setFormData({ ...formData, price: e.target.value })}
                    required
                />
                <input
                    type="text"
                    placeholder="Image URL"
                    className="w-full border p-2 rounded"
                    value={formData.image}
                    onChange={e => setFormData({ ...formData, image: e.target.value })}
                />
                <button type="submit" className="w-full bg-blue-600 text-white p-2 rounded hover:bg-blue-700">
                    Update Listing
                </button>
            </form>
        </div>
    );
};

export default UpdateListing;
