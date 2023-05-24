import { Comment } from "../types";

export async function getComments(): Promise<Comment[]> {
  const url = `${process.env.REACT_APP_API_URL}/getComments`;
  const response = await fetch(url, {
    method: "GET"
  });
  const data = await response.json();
  if (response.ok) {
    return data;
  } else {
    return Promise.reject(new Error("Something went wrong . . ."));
  }
}
