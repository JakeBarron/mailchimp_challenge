import React, {JSX} from 'react'
import Grid from "@mui/material/Grid"

export default function Header() : JSX.Element {
    return (
    <Grid container className='header' justifyContent='center' sx={{padding: '2rem'}}>
        <Grid item>
        Jake Barron MC Challenge Submission
        </Grid>
    </Grid>
    )
}