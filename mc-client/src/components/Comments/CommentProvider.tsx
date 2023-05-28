import React, { JSX, useEffect, useState } from "react";
import { Comment } from "../../types";
import { createComment, getComments } from "../../api";
import CommentInput from "./CommentInput";
import CommentList from "./CommentList";
import { useInterval } from "../../util/hooks";

export default function CommentProvider(): JSX.Element {
  const [comments, setComments] = useState<Comment[] | undefined>(undefined);
  const [error, setError] = useState<Error | undefined>(undefined);
  useEffect(() => {
    fetchComments();
  }, []);

  const fetchComments = async () => {
    try {
      const response = await getComments();
      setComments(response);
    } catch (err) {
      console.error(err);
      setError(new Error("something went wrong"));
    }
  };

  useInterval(fetchComments, 10000);

  const submitComment = async (name: string, message: string): Promise<any> => {
    try {
      validateName(name);
      validateMessage(message);
      setError(undefined);
      const response = await createComment(name, message);
      if (response) {
        fetchComments();
      }
    } catch (err) {
      if (err instanceof Error) {
        setError(err);
        window.alert(err.message);
      }
    }
  };

  const validateName = (name: string) => {
    if (name.length === 0) {
      throw new Error("Name cannot be blank");
    }
  };

  const validateMessage = (message: string) => {
    if (message.length === 0) {
      throw new Error("Message cannot be blank");
    }
  };

  return (
    <>
      <CommentInput submitComment={submitComment} />
      <CommentList comments={comments} error={error} />
    </>
  );
}
