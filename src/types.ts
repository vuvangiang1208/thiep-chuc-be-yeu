export interface Wish {
  id: string;
  sender: string;
  content: string;
  createdAt: string;
  color: string;
  x: number; // percentage coordinate on wishing board
  y: number; // percentage coordinate on wishing board
}

export interface RomanticLetterResponse {
  title: string;
  letter: string;
  poeticNote: string;
}

export interface MagicGiftBox {
  id: number;
  label: string;
  opened: boolean;
  message: string;
  icon: string;
}
