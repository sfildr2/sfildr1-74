import { databases, appwriteConfig } from '@/lib/appwrite';

export const equipmentService = {
    async getEquipments() {
        try {
            const response = await databases.listDocuments(
                appwriteConfig.databaseId,
                appwriteConfig.collections.equipments
            );
            return response.documents;
        } catch (error) {
            console.error('Error fetching equipments:', error);
            throw error;
        }
    },

    async getEquipment(id: string) {
        try {
            return await databases.getDocument(
                appwriteConfig.databaseId,
                appwriteConfig.collections.equipments,
                id
            );
        } catch (error) {
            console.error('Error fetching equipment:', error);
            throw error;
        }
    }
};