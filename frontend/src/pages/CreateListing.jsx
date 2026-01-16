import { useState } from 'react';
import { useNavigate } from 'react-router';
import api from '../api/axios';
import toast from 'react-hot-toast';

const CreateListing = () => {
    const navigate = useNavigate();
    const [formData, setFormData] = useState({
        name: '',
        location: '',
        price: '',
        image: '' // Single image URL for simplicity
    });

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            // Convert single image to array for backend
            const payload = {
                ...formData,
                price: Number(formData.price),
                images: formData.image ? [formData.image] : []
            };
            delete payload.image;

            await api.post('/vehicles', payload);
            toast.success('Vehicle listed successfully!');
            navigate('/dashboard');
        } catch (error) {
            toast.error('Failed to create listing');
        }
    };

    return (
        <div className="container mx-auto p-4 max-w-lg">
            <h1 className="text-2xl font-bold mb-4">List Your Vehicle</h1>
            <form onSubmit={handleSubmit} className="space-y-4">
                <input
                    type="text"
                    placeholder="Vehicle Name (e.g. Honda Activa)"
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
                    List Vehicle
                </button>
            </form>
        </div>
    );
};

export default CreateListing;
