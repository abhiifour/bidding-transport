import axios from 'axios'

export const createBid = async (requirement:string, createdById: string, materialType: string, quantity: number, pickupLocation: string, deliveryLocation: string, deadline: Date) => {
    try {
        const response = await axios.post('http://localhost:3001/api/bid/create', {
            requirement,
            createdById,
            materialType,
            quantity,
            pickupLocation,
            deliveryLocation,
            deadline
        });
        return response.data;
    } catch (error) {
        console.error('Error creating bid:', error);
        throw error;
    }
}


export const deleteBid = async (id: string) => {
    try {
        const response = await axios.delete(`http://localhost:3001/api/bid/remove/${id}`);
        return response.data;
    } catch (error) {
        console.error('Error deleting bid:', error);
        throw error;
    }
}

export const getAllBids = async () => {
    try {
        const response = await axios.get('http://localhost:3001/api/bid/get');
        return response.data;
    } catch (error) {
        console.error('Error fetching all bids:', error);
        throw error;
    }
}