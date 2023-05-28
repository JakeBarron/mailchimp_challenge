import React, { JSX, useState } from "react";
import Grid from "@mui/material/Grid";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";

interface CommentInputProps {
  submitComment : (name : string, message : string) => void
}

export default function CommentInput({submitComment} : CommentInputProps): JSX.Element {
  const [name, setName] = useState("");
  const [message, setMessage] = useState("");

  const onSubmit = () => {
    submitComment(name, message)
  }

  return (
    <Grid
      container
      direction="column"
      alignItems="center"
      spacing={2}
      sx={{ marginBottom: "1rem", height: '30vh' }}
    >
      <Grid item>
        <TextField
          sx={{ minWidth: "30rem" }}
          id="name-input"
          label="Name"
          variant="outlined"
          onChange={(e) => setName(e?.target?.value)}
          value={name}
        />
      </Grid>
      <Grid item>
        <TextField
          sx={{ minWidth: "30rem" }}
          id="comment-input"
          label="Comment"
          multiline
          rows={5}
          variant="outlined"
          onChange={(e) => setMessage(e?.target?.value)}
          value={message}
        />
      </Grid>
      <Grid item>
        <Button onClick={onSubmit} variant="contained">
          Comment
        </Button>
      </Grid>
    </Grid>
  );
}
