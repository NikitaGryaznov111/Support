import axios from "axios";

export const registerUser = async (user: {
  name: string;
  email: string;
  password: string;
}) => {
  try {
    return await axios.post("http://localhost:5000/api/registration", user);
  } catch (error) {
    console.log("Error registering user:", error);
    return null;
  }
};
