// Utility function to handle unknown errors
function handleError(error: unknown): string {
    if (error instanceof Error) {
      return error.message;
    }
    return 'An unknown error occurred';
  }
  
  const BASE_URL = "https://respawnrecordv2-api.onrender.com/api/auth0"; // Adjust your base URL as needed
  
  // Get a user by user_id
  export async function getUserById(userId: string) {
    const url = `${BASE_URL}/get_user/${userId}`;
    
    try {
      const response = await fetch(url, {
        method: 'GET',
      });
      
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      
      const data = await response.json();
      return data;
    } catch (error) {
      console.error('Error getting user by ID:', handleError(error));
      throw new Error(`Failed to get user: ${handleError(error)}`);
    }
  }
  
  // Function to follow a user by their user ID
  export async function followUser(userId: string, followUserId: string) {
    userId = decodeURI(userId);
    followUserId = decodeURI(followUserId);
    const url = `${BASE_URL}/follow/${userId}/${followUserId}`;
    console.log(`Following user with ID: ${followUserId}`);
    
    try {
      const response = await fetch(url, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({}), // You can include additional data here if needed
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

  // Function to unfollow a user by their user ID
export async function unfollowUser(userId: string, followUserId: string) {
    userId = decodeURI(userId);
    followUserId = decodeURI(followUserId);
    const url = `${BASE_URL}/unfollow/${userId}/${followUserId}`;
    console.log(`Unfollowing user with ID: ${followUserId}`);
    
    try {
      const response = await fetch(url, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({}), // You can include additional data here if needed
      });
      
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      
      const data = await response.json();
      return data;
    } catch (error) {
      console.error('Error unfollowing user:', handleError(error));
      throw new Error(`Failed to unfollow user: ${handleError(error)}`);
    }
  }
  
  // Function to get a user by their nickname
export async function getUserByNickname(nickname: string) {
  const encodedNickname = encodeURIComponent(nickname); // Safely encode the nickname
  const url = `${BASE_URL}/get_user_by_nickname/${encodedNickname}`;
  
  try {
    const response = await fetch(url, {
      method: 'GET',
    });
    
    if (!response.ok) {
      throw new Error('Network response was not ok');
    }
    
    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Error getting user by nickname:', handleError(error));
    throw new Error(`Failed to get user by nickname: ${handleError(error)}`);
  }
}

// Function to update a user's nickname
export async function updateNickname(userId: string, nickname: string) {
  userId = decodeURI(userId); // Decode the userId if needed
  const url = `${BASE_URL}/add_nickname_tag/${userId}/${nickname}`; // Adjust the endpoint as needed

  try {
    const response = await fetch(url, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({}), // Include any additional data if needed
    });

    if (!response.ok) {
      throw new Error('Network response was not ok');
    }

    const data = await response.json();
    return data; // Return response data if needed
  } catch (error) {
    console.error('Error updating nickname:', handleError(error));
    throw new Error(`Failed to update nickname: ${handleError(error)}`);
  }
}

// Function to add a game to a user's games list
export async function addGame(userId: string, gameId: number) {
  userId = decodeURI(userId); // Decode the userId if needed
  const url = `${BASE_URL}/add_game/${userId}`; // Adjust the endpoint to match your backend route

  try {
    const response = await fetch(url, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ gameId }), // Pass the gameId in the request body
    });

    if (!response.ok) {
      throw new Error('Network response was not ok');
    }

    const data = await response.json();
    return data; // Return response data if needed
  } catch (error) {
    console.error('Error adding game:', handleError(error));
    throw new Error(`Failed to add game: ${handleError(error)}`);
  }
}

// Function to remove a game from a user's games list
export async function removeGame(userId: string, gameId: number) {
  console.log(gameId)
  userId = decodeURI(userId); // Decode the userId if needed
  const url = `${BASE_URL}/remove_game/${userId}`; // Adjust the endpoint to match your backend route

  try {
    const response = await fetch(url, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ gameId }), // Pass the gameId in the request body
    });

    if (!response.ok) {
      throw new Error('Network response was not ok');
    }

    const data = await response.json();
    return data; // Return response data if needed
  } catch (error) {
    console.error('Error removing game:', handleError(error));
    throw new Error(`Failed to remove game: ${handleError(error)}`);
  }
}
