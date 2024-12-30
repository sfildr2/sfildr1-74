export interface EquipmentAttributes {
  str?: number;
  hab?: number;
  int?: number;
  esp?: number;
  arm?: number;
  res?: number;
  ten?: number;
}

export interface Equipment {
  name: string;
  type: 'weapon' | 'shield' | 'armor' | 'ring';
  rarity: 'common' | 'rare' | 'epic' | 'legendary';
  damage?: string;
  defense?: string;
  attributes: EquipmentAttributes;
  element?: string;
  description: string;
}