import React from 'react'
import Header from './components/Header'
import Container from '@mui/material/Container'
import Box from '@mui/material/Box'
import Comments from './components/Comments'

function App() {
    return (
        <div className="App" data-testid="app">
            <Container maxWidth="md">
                <Box sx={{ height: '100vh' }}>
                    <Header />
                    <Comments />
                </Box>
            </Container>
        </div>
    )
}

export default App
