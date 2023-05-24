import React from "react";
import Header from "./components/Header";
import CommentInput from "./components/CommentInput";
import Comments from "./components/Comments"
import Container from "@mui/material/Container";
import Box from "@mui/material/Box";

function App() {
  return (
    <div className="App">
      <Container maxWidth="md">
        <Box sx={{ bgcolor: "grey", height: '100vh'}}>
            <Header />
            <CommentInput />
            <Comments />
        </Box>
      </Container>
    </div>
  );
}

export default App;
