import axios from 'axios'

export const createUser = async (email:string, password: string) => {
    try {
        const response = await axios.post('http://localhost:3001/api/user/create', {
            email,
            password,
        });
        return response.data;
    } catch (error) {
        console.error('Error creating user:', error);
        throw error;
    }
}

export const resetUserPassword = async (email:string, password: string) => {
    try {
        const response = await axios.post('http://localhost:3001/api/user/reset-password', {
            email,
            password,
        });
        return response.data;
    } catch (error) {
        console.error('Error resetting user password:', error);
        throw error;
    }
}





export const deleteUser = async (email: string) => {
    try {
        const response = await axios.post(`http://localhost:3001/api/user/remove`, {
          email: email,
        });
        return response.data;
    } catch (error) {
        console.error('Error deleting user:', error);
        throw error;
    }
}

export const getAllUsers = async () => {
    try {
        const response = await axios.get('http://localhost:3001/api/user/get-all');

        return response.data;
    } catch (error) {
        console.error('Error fetching users:', error);
        throw error;
    }
}