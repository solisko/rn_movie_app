// track searches made by a user

import { Client, Databases, ID, Query } from "react-native-appwrite";

const DATABASE_ID = process.env.EXPO_PUBLIC_APPWRITE_DATABASE_ID!;
const COLLECTION_ID = process.env.EXPO_PUBLIC_APPWRITE_COLLECTION_ID!;

const client = new Client()
  .setEndpoint("https://cloud.appwrite.io/v1") // Your Appwrite endpoint
  .setProject(process.env.EXPO_PUBLIC_APPWRITE_PROJECT_ID!); // Your Appwrite project ID

const database = new Databases(client);

export const updateSearchCount = async (query: string, movie: Movie) => {
  try {
    const result = await database.listDocuments(DATABASE_ID, COLLECTION_ID, [
      Query.equal("searchTerm", query),
    ]);

    if (result.documents.length > 0) {
      const existingMovie = result.documents[0];

      await database.updateDocument(
        DATABASE_ID,
        COLLECTION_ID,
        existingMovie.$id, // Use the ID of the existing document
        {
          count: existingMovie.count + 1, // Increment the search count
        }
      );
    } else {
      await database.createDocument(
        DATABASE_ID,
        COLLECTION_ID,
        ID.unique(), // Use a unique ID for the new document
        {
          searchTerm: query,
          movie_id: movie.id, // Store the movie ID or any other relevant data
          title: movie.title, // Store the movie title
          count: 1, // Initialize the search count to 1
          poster_url: `https://image.tmdb.org/t/p/w500${movie.poster_path}`, // Store the poster URL
        }
      );
    }
  } catch (error) {
    console.log(error);
    throw error;
  }
  // check if a record of that search has already been stored
  // if a document is found, increment the searchCount field
  // if no document is found
  // create a new document in Appwrite database -> 1
};

export const getTrendingMovies = async (): Promise<
  TrendingMovie[] | undefined
> => {
  try {
    const result = await database.listDocuments(DATABASE_ID, COLLECTION_ID, [
      Query.limit(5), // Limit to 5 results
      Query.orderDesc("count"), // Order by count in descending order
    ]);
    return result.documents as unknown as TrendingMovie[];
  } catch (error) {
    console.log("Error fetching trending movies:", error);
    return undefined;
  }
};
