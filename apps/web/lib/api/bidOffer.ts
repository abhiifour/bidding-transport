import axios from 'axios'

export const createBidOffer = async (bidId:string, transporterId: string, offeredPrice: number, offerDate: Date, message: string) => {
    try {
        const response = await axios.post('http://localhost:3001/api/bid-offer/create', {
                bidId,
                transporterId,
                offeredPrice,
                offerDate,
                
        });
        return response.data;
    } catch (error) {
        console.error('Error creating Bid offer:', error);
        throw error;
    }
}

export const updateBidOffer = async (id: string, status:string) => {
    try {
        const response = await axios.post(`http://localhost:3001/api/bid-offer/update`, {
            id,
            status
        });
        return response.data;
    } catch (error) {
        console.error('Error editing manual deal', error);
        throw error;
    }
}


export const getAllBidOffers = async (id: string) => {
    try {
        const response = await axios.get(`http://localhost:3001/api/bid-offer/get/${id}`);
        return response.data;
    } catch (error) {
        console.error('Error fetching bid offers', error);
        throw error;
    }
}

export const getABidOffer = async (id: string) => {
    try {
        const response = await axios.get(`http://localhost:3001/api/bid-offer/get/accepted/${id}`);
        return response.data;
    } catch (error) {
        console.error('Error fetching bid offers', error);
        throw error;
    }
}
