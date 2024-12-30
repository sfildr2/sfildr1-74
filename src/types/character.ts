import { Models } from 'appwrite';
import { Equipment } from './equipment';

export interface CharacterStatus {
  hp: {
    current: number;
    max: number;
  };
  mp: {
    current: number;
    max: number;
  };
}

export interface CharacterAttributes {
  strength: number;
  dexterity: number;
  constitution: number;
  intelligence: number;
  wisdom: number;
  charisma: number;
}

export interface Character extends Models.Document {
  name: string;
  level: number;
  imageUrl?: string;
  gold: number;
  equipment: {
    primaryWeapon: Equipment | null;
    secondaryWeapon: Equipment | null;
    armor: Equipment | null;
    rings: (Equipment | null)[];
  };
  attributes: CharacterAttributes;
  status: CharacterStatus;
  inventory: Equipment[];
}