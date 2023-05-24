import React, { useEffect, useState } from "react";
import { daysOfTheWeek } from "../../constants";
import { Comment } from "../../types";
import Grid from "@mui/material/Grid";
import { getComments } from "../../api";
import Card from '@mui/material/Card';
import { CardContent } from "@mui/material";
import Typography from "@mui/material/Typography";

export default function Comments() {
  const [comments, setComments] = useState<Comment[]>([]);
  
  const fetchComments = async () => {
    try {
    const result = await getComments();
    setComments(result);
    } catch(err) {
      console.error({err})
    }
  };

  useEffect(() => {
    fetchComments();
  }, []);

  const formatDate = (dateString : string) : string => {
    const created = new Date(dateString)
    console.log(created)
    const day = created.getDay()
    const hours = created.getHours()
    const time = hours % 12 || 12
    const meridian = hours >= 12 ? 'PM' : 'AM'
    return `${daysOfTheWeek[day]} at ${time}${meridian}`
  } 

  return ( 
  <Grid container spacing={4} direction='row' justifyContent='center' alignContent='flex-start'>
    {comments?.map(c => {
        return <Grid item xs={8}>
          <Card>
            <CardContent>
              <Typography variant='body1' sx={{paddingBottom: '1rem'}}>{c.message}</Typography>
              <Typography variant='h6'>{`${c.name} on ${formatDate(c.created)}`}</Typography>
            </CardContent>
          </Card>
        </Grid>
    })}
  </Grid>
  )
}
