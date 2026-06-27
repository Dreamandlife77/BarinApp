import axios from "axios";

const API =
  `${import.meta.env.VITE_API_URL}/api`


export const verifyMission =
  async (
    mission,
    image
  ) => {

    const formData =
      new FormData();

    formData.append(
      "mission",
      mission
    );

    formData.append(
      "image",
      image
    );

    const response =
      await axios.post(
        `${API}/missions/verify`,
        formData,
        {
          headers: {
            "Content-Type":
              "multipart/form-data",
          },
        }
      );

    return response.data;
  };