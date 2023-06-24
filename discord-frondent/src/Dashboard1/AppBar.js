import React from 'react'
import {styled} from '@mui/system'
function AppBar() {
    const MainContainer = styled("div")({
        height: "48px",
        borderBottom: "1px solid black",
        backgroundColor: "#36393",
        width: "calc(100% - 326px)",
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        padding: "0 15px",
    })
  return (
    <MainContainer>AppBar</MainContainer>
  )
}

export default AppBar