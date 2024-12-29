import { BASE_URL } from "../constants";
import { useLocalStorageState } from "../hooks/useLocalStorageState";

// const accessToken= useLocalStorageState(null, "accessToken")
export const accessToken = JSON.parse(localStorage.getItem("acesssToken"));
export async function getCircles() {
  const options = {
    method: "GET",
    headers: {
      Authorization: `Bearer ${accessToken}`,
      "Content-Type": "application/json",
    },
  };
  try {
    const res = await fetch(`${BASE_URL}/admins/circles`, options);

    if (!res.ok) {
      const errorMessage = `Failed with status: ${res.status}, ${res.statusText}`;
      throw new Error(errorMessage);
    }

    const userData = await res.json();
    console.log(userData);
    return userData;
  } catch (error) {
    console.error("Error during fetch:", error.message);
    throw error;
  }
}

export async function getCirclesAlone() {
  const options = {
    method: "GET",
    headers: {
      Authorization: `Bearer ${accessToken}`,
      "Content-Type": "application/json",
    },
  };
  try {
    const res = await fetch(`${BASE_URL}/admins/only-circles`, options);

    if (!res.ok) {
      const errorMessage = `Failed with status: ${res.status}, ${res.statusText}`;
      throw new Error(errorMessage);
    }

    const userData = await res.json();
    console.log(userData);
    return userData;
  } catch (error) {
    console.error("Error during fetching:", error.message);
    throw error;
  }
}

export async function createCircles({ circleName }) {
  const options = {
    method: "POST",
    headers: {
      Authorization: `Bearer ${accessToken}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ circleName }),
  };
  try {
    const res = await fetch(`${BASE_URL}/admins/circles`, options);
    console.log(options.body);

    if (!res.ok) {
      const errorMessage = `Failed with status: ${res.status}, ${res.statusText}`;
      throw new Error(errorMessage);
    }

    const userData = await res.json();
    console.log(userData);
    return userData;
  } catch (error) {
    console.error("Error during creation:", error.message);
    throw error;
  }
}

export async function assignCircleToUser({ circleName, nameOfUser }) {
  const options = {
    method: "PATCH",
    headers: {
      Authorization: `Bearer ${accessToken}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ nameOfUser, circleName }),
  };
  try {
    const res = await fetch(`${BASE_URL}/admins/circles`, options);
    console.log(options.body);

    if (!res.ok) {
      const errorMessage = `Failed with status: ${res.status}, ${res.statusText}`;
      throw new Error(errorMessage);
    }

    const userData = await res.json();
    console.log(userData);
    return userData;
  } catch (error) {
    console.error("Error during creation:", error.message);
    throw error;
  }
}

export async function editCircle({ id, circleName }) {
  const options = {
    method: "PUT",
    headers: {
      Authorization: `Bearer ${accessToken}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ circleName }),
  };
  try {
    const res = await fetch(`${BASE_URL}/admins/circles/${id}`, options);
    console.log(options.body);

    if (!res.ok) {
      const errorMessage = `Failed with status: ${res.status}, ${res.statusText}`;
      throw new Error(errorMessage);
    }

    const userData = await res.json();
    console.log(userData);
    return userData;
  } catch (error) {
    console.error("Error during editing:", error.message);
    throw error;
  }
}

export async function deleteCircle() {
  return;
}
