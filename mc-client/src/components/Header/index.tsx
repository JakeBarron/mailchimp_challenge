import React, { JSX } from 'react'
import { Typography } from '@mui/material'

export default function Header(): JSX.Element {
    return (
        <Typography sx={{ marginTop: '1rem' }} textAlign="center" variant="h3">
            Jake Barron's UI Adventure
        </Typography>
    )
}
