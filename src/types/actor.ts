export interface Actor {
  id: number;
  name: string;
  photoUrl: string;
  biography: string;
  movies: number[]; // Movie IDs
} 