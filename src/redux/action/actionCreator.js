import axios from "axios";

export const fetchAlbums = () => {
  return async (dispatch) => {
    try {
      const response = await axios.get(
        "https://jsonplaceholder.typicode.com/albums"
      );
      dispatch({ type: "album/getAll", payload: response.data });
    } catch (error) {
      console.error("Error fetching albums:", error);
    }
  };
};
