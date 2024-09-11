// steamController.js

// Function to fetch all games from your API
export async function getFrontPageGames(page = 0) {
    try {
      const response = await fetch(`http://localhost:8080/api/igdb/frontpage_games?page=${page}`);
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      const data = await response.json();
      return data; // Return the array of games
    } catch (error) {
      console.error('Error fetching games:', error);
      return []; // Return an empty array on error
    }
  }

// Function to fetch all games from your API
export async function getGameById(id: string) {
  try {
    const response = await fetch(`http://localhost:8080/api/igdb/game_by_id?id=${id}`);
    if (!response.ok) {
      throw new Error('Network response was not ok');
    }
    const data = await response.json();
    return data; // Return the array of games
  } catch (error) {
    console.error('Error fetching games:', error);
    return []; // Return an empty array on error
  }
}

  //function to fetch games base on query
  export async function getGamesByQuery(name: string, genre: string) {
    try {
      const response = await fetch(`http://localhost:8080/api/igdb/get_games_by_query?name=${name}&genre=${genre}`);
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      const data = await response.json();
      return data; // Return the array of games
    } catch (error) {
      console.error('Error fetching games:', error);
      return []; // Return an empty array on error
    }
  }