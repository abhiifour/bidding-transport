import axios from 'axios'

export const createTransporter = async (name:string, contact: string, vehicleType: string, capacity: number) => {
    try {
        const response = await axios.post('http://localhost:3001/api/transporter/create', {
        name,
        contact,
        vehicleType,
        capacity
        });
        return response.data;
    } catch (error) {
        console.error('Error creating transporter:', error);
        throw error;
    }
}

export const editTransporter = async (name:string, contact: string, vehicleType: string, capacity: number, id: string, status: string) => {
    try {
        const response = await axios.post(`http://localhost:3001/api/transporter/edit`, {
        name,
        contact,
        vehicleType,
        capacity,
        id,
        status
        });
        return response.data;
    } catch (error) {
        console.error('Error creating transporter:', error);
        throw error;
    }
}

export const deleteTransporter = async (id: string) => {
    try {
        const response = await axios.delete(`http://localhost:3001/api/transporter/remove`,{
            data:{
                id:id
            }
        });
        return response.data;
    } catch (error) {
        console.error('Error creating transporter:', error);
        throw error;
    }
}

export const getAllTransporters = async () => {
    try {
        const response = await axios.get('http://localhost:3001/api/transporter/get');
        return response.data;
    } catch (error) {
        console.error('Error creating transporter:', error);
        throw error;
    }
}