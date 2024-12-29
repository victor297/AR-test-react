import { BASE_URL } from "../constants";

export async function login({ email, password }) {
  const options = {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ email, password }),
  };

  try {
    const res = await fetch(`${BASE_URL}/admins`, options);

    if (!res.ok) {
      const errorMessage = `Failed with status: ${res.status}, ${res.statusText}`;
      throw new Error(errorMessage);
    }

    const userData = await res.json();
    console.log(userData);
    return userData;
  } catch (error) {
    console.error("Error during login:", error.message);
    throw error;
  }
}


export const accessToken = JSON.parse(localStorage.getItem("acesssToken"));
console.log(accessToken);
export async function createNewUser({
  email,
  name,
  password,
  mobileNumber,
  role,
}) {
  const options = {
    method: "POST",
    headers: {
      Authorization: `Bearer ${accessToken}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ email, name, password, mobileNumber, role }),
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
