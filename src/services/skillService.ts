import { databases, appwriteConfig } from '@/lib/appwrite';

export const skillService = {
    async getSkills() {
        try {
            const response = await databases.listDocuments(
                appwriteConfig.databaseId,
                appwriteConfig.collections.skills
            );
            return response.documents;
        } catch (error) {
            console.error('Error fetching skills:', error);
            throw error;
        }
    },

    async getSkill(id: string) {
        try {
            return await databases.getDocument(
                appwriteConfig.databaseId,
                appwriteConfig.collections.skills,
                id
            );
        } catch (error) {
            console.error('Error fetching skill:', error);
            throw error;
        }
    }
};