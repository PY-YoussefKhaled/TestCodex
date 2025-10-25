export interface Note {
  id: number;
  title: string;
  content: string;
  createdAt: string;
  updatedAt: string;
}

export type NoteDraft = Omit<Note, 'id' | 'createdAt' | 'updatedAt'>;
