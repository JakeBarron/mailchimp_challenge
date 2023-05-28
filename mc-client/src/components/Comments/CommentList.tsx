import React from "react";
import { formatDate } from "../../util/transforms";
import { Comment } from "../../types";
import Grid from "@mui/material/Grid";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import CircularProgress from "@mui/material/CircularProgress";

interface CommentsProps {
  comments: Comment[] | undefined;
  error: Error | undefined;
}

export default function Comments({ comments, error }: CommentsProps) {
  if (!comments) {
    return (
      <Box sx={{ width: "100%", height: "60vh", display: "flex", justifyContent: 'center', alignContent: 'center' }}>
        <CircularProgress />
      </Box>
    );
  }

  return (
    <Box sx={{ width: "100%", height: "60vh", overflowY: "scroll" }}>
      <Grid
        container
        spacing={4}
        direction="row"
        justifyContent="center"
        alignContent="flex-start"
      >
        {comments?.map((c: Comment) => {
          return (
            <Grid item xs={8} key={`comment-${c.id}`}>
              <Card>
                <CardContent>
                  <Typography variant="body1" sx={{ paddingBottom: "1rem" }}>
                    {c.message}
                  </Typography>
                  <Typography variant="h6">{`${c.name} on ${formatDate(
                    c.created
                  )}`}</Typography>
                </CardContent>
              </Card>
            </Grid>
          );
        })}
      </Grid>
    </Box>
  );
}
