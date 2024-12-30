import { databases, storage, appwriteConfig } from '@/lib/appwrite';
import { ID, Query } from 'appwrite';
import { Character } from '@/types/character';

export const characterService = {
    async getCharacter(id: string): Promise<Character> {
        try {
            const character = await databases.getDocument(
                appwriteConfig.databaseId,
                appwriteConfig.collections.chars,
                id
            );

            const attributes = await databases.getDocument(
                appwriteConfig.databaseId,
                appwriteConfig.collections.attributes,
                character.attributesId
            );

            const status = await databases.getDocument(
                appwriteConfig.databaseId,
                appwriteConfig.collections.status,
                character.statusId
            );

            const inventory = await databases.listDocuments(
                appwriteConfig.databaseId,
                appwriteConfig.collections.inventory,
                [Query.equal('characterId', id)]
            );

            return {
                ...character,
                attributes,
                status,
                inventory: inventory.documents
            } as Character;
        } catch (error) {
            console.error('Error fetching character:', error);
            throw error;
        }
    },

    async uploadCharacterImage(file: File) {
        try {
            const upload = await storage.createFile(
                appwriteConfig.buckets.charsImages,
                ID.unique(),
                file
            );
            return upload;
        } catch (error) {
            console.error('Error uploading image:', error);
            throw error;
        }
    },

    async updateCharacterStatus(characterId: string, status: any) {
        try {
            return await databases.updateDocument(
                appwriteConfig.databaseId,
                appwriteConfig.collections.status,
                status.$id,
                status
            );
        } catch (error) {
            console.error('Error updating status:', error);
            throw error;
        }
    },

    async updateInventory(characterId: string, inventoryId: string, item: any) {
        try {
            return await databases.updateDocument(
                appwriteConfig.databaseId,
                appwriteConfig.collections.inventory,
                inventoryId,
                item
            );
        } catch (error) {
            console.error('Error updating inventory:', error);
            throw error;
        }
    }
};