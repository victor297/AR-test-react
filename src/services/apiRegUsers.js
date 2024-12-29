import { BASE_URL } from "../constants";

export const accessToken = JSON.parse(localStorage.getItem("acesssToken"));
console.log(accessToken);
export async function getUsers() {
  const options = {
    method: "GET",
    headers: {
      Authorization: `Bearer ${accessToken}`,
      "Content-Type": "application/json",
    },
  };

  try {
    const res = await fetch(`${BASE_URL}/admins/users`, options);

    if (!res.ok) {
      const errorMessage = `Failed with status: ${res.status}, ${res.statusText}`;
      throw new Error(errorMessage);
    }

    const userData = await res.json();
    console.log(userData);
    return userData;
  } catch (error) {
    console.error("Error during user creation:", error.message);
    throw error;
  }
}