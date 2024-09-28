// profileInterface.ts
import { Game } from "./GameInterface"; // Import the Game interface

export interface UserProfile {
  user_id: string; // User's unique identifier
  email: string; // User's email address
  picture: string; // URL to the user's profile picture
  nickname: string; // User's nickname
  games: Game[]; // Array of Game objects
  following: string[];
  user_metadata: {
    nickname: string,
    followed_users: string[],
    games: number[],
  };
}
