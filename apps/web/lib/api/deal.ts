import axios from 'axios'

export const createManualDeal = async (transporterId:string, loggedById: string, materialType: string, amount: number, quantity: number, dealDate: Date) => {
    try {
        const response = await axios.post('http://localhost:3001/api/deal/manual/log', {
            transporterId,
            loggedById,
            materialType,
            amount,
            quantity,
            dealDate
        });
        return response.data;
    } catch (error) {
        console.error('Error creating manual deal:', error);
        throw error;
    }
}

export const editManualDeal = async (id: string, transporterId:string, loggedById: string, materialType: string, amount: number, quantity: number, dealDate: Date) => {
    try {
        const response = await axios.post(`http://localhost:3001/api/deal/manual/edit`, {
            id,
            transporterId,
            loggedById,
            materialType,
            amount,
            quantity,
            dealDate
        });
        return response.data;
    } catch (error) {
        console.error('Error editing manual deal', error);
        throw error;
    }
}

export const deleteManualDeal = async (id: string) => {
    try {
        const response = await axios.delete(`http://localhost:3001/api/deal/manual/remove/${id}`);
        return response.data;
    } catch (error) {
        console.error('Error deleting manual deal', error);
        throw error;
    }
}

export const createDeal = async (bidId:string, transporterId:string, userId: string) => {
    try {
        const response = await axios.post('http://localhost:3001/api/deal/create', {
            bidId,
            transporterId,
            userId
        });
        return response.data;
    } catch (error) {
        console.error('Error creating  deal:', error);
        throw error;
    }
}


export const getAllDeals = async () => {
    try {
        const response = await axios.get('http://localhost:3001/api/deal/get');
        return response.data;
    } catch (error) {
        console.error('Error fetching all deals:', error);
        throw error;
    }
}


export const getAllManualDeals = async () => {
    try {
        const response = await axios.get('http://localhost:3001/api/deal/manual/get');
        return response.data;
    } catch (error) {
        console.error('Error fetching all manual deals:', error);
        throw error;
    }
}