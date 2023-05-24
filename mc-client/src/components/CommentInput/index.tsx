import React, { JSX, useState } from "react";
import Grid from "@mui/material/Grid";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button"

export default function CommentInput(): JSX.Element {
  const [name, setName] = useState("");
  const [comment, setComment] = useState("");
  const onSubmit = () : void => {
    window.alert(JSON.stringify({name, comment}))
  }
  return (
    <Grid container direction="column" alignItems='center' spacing={2}>
      <Grid item>
        <TextField
          id="name-input"
          label="Name"
          variant="outlined"
          onChange={(e) => setName(e?.target?.value)}
          value={name}
        />
      </Grid>
      <Grid item>
        <TextField
          id="comment-input"
          label="Comment"
          multiline
          rows={5}
          variant="outlined"
          onChange={(e) => setComment(e?.target?.value)}
          value={comment}
        />
      </Grid>
      <Grid item >
        <Button onClick={onSubmit} >
            Comment
        </Button>
      </Grid>
    </Grid>
  );
}
