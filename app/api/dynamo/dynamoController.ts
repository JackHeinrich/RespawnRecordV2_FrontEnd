// Utility function to handle unknown errors
function handleError(error: unknown): string {
    if (error instanceof Error) {
      return error.message;
    }
    return 'An unknown error occurred';
  }
  
  const BASE_URL = "https://localhost:8080/api/dynamo"

  // Add a game to a user's games set
  export async function addGame(userNickname: string, gameId: number) {
    try {
      const response = await fetch(`${BASE_URL}/add_game/${userNickname}/${gameId}`, {
        method: 'PUT',
      });
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      const data = await response.json();
      return data;
    } catch (error) {
      console.error('Error adding game:', handleError(error));
      throw new Error(`Failed to add game: ${handleError(error)}`);
    }
  }
  
  // Add a new user
  export async function addUser(nickname: string) {
    try {
      const response = await fetch(`${BASE_URL}/add_user/${nickname}`, {
        method: 'POST',
      });
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      const data = await response.json();
      return data;
    } catch (error) {
      console.error('Error adding user:', handleError(error));
      throw new Error(`Failed to add user: ${handleError(error)}`);
    }
  }
  
  // Delete a user
  export async function deleteUser(nickname: string) {
    try {
      const response = await fetch(`${BASE_URL}/delete_user/${nickname}`, {
        method: 'DELETE',
      });
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      const data = await response.json();
      return data;
    } catch (error) {
      console.error('Error deleting user:', handleError(error));
      throw new Error(`Failed to delete user: ${handleError(error)}`);
    }
  }
  
  // Follow another user
  export async function followUser(nickname: string, nicknameToFollow: string) {
    try {
      const response = await fetch(`${BASE_URL}/follow/${nickname}/${nicknameToFollow}`, {
        method: 'PUT',
      });
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      const data = await response.json();
      return data;
    } catch (error) {
      console.error('Error following user:', handleError(error));
      throw new Error(`Failed to follow user: ${handleError(error)}`);
    }
  }
  
  // Get a user by nickname
  export async function getUser(nickname: string) {
    try {
      const response = await fetch(`${BASE_URL}/get_user/${nickname}`, {
        method: 'GET',
      });
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      const data = await response.json();
      return data;
    } catch (error) {
      console.error('Error getting user:', handleError(error));
      throw new Error(`Failed to get user: ${handleError(error)}`);
    }
  }
  
  // Get all users
  export async function getUsers() {
    try {
      const response = await fetch(`${BASE_URL}/get_users`, {
        method: 'GET',
      });
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      const data = await response.json();
      return data;
    } catch (error) {
      console.error('Error getting users:', handleError(error));
      throw new Error(`Failed to get users: ${handleError(error)}`);
    }
  }
  
  // Remove a follow
  export async function removeFollow(userNickname: string, nicknameToUnfollow: string) {
    try {
      const response = await fetch(`${BASE_URL}/remove_follow/${userNickname}/${nicknameToUnfollow}`, {
        method: 'DELETE',
      });
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      const data = await response.json();
      return data;
    } catch (error) {
      console.error('Error removing follow:', handleError(error));
      throw new Error(`Failed to remove follow: ${handleError(error)}`);
    }
  }
  
  // Remove a game from a user's games set
  export async function removeGame(userNickname: string, gameId: number) {
    try {
      const response = await fetch(`${BASE_URL}/remove_game/${userNickname}/${gameId}`, {
        method: 'PUT',
      });
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      const data = await response.json();
      return data;
    } catch (error) {
      console.error('Error removing game:', handleError(error));
      throw new Error(`Failed to remove game: ${handleError(error)}`);
    }
  }
  