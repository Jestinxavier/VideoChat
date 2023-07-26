import { IconButton } from '@mui/material'
import React, { useState } from 'react'
import VideoCameraIcon from '@mui/icons-material/Videocam'
import VideoCameraOffIcon from '@mui/icons-material/VideocamOff'

function CameraButton() {
    const [cameraEnabled, setCameraEnabled] = useState(false)
    const toggleCamera = () => setCameraEnabled(!cameraEnabled)
  return (
    <IconButton onClick={toggleCamera} sx={{color:'white'}}>
        {cameraEnabled? <VideoCameraIcon /> : <VideoCameraOffIcon />}
    </IconButton>
  )
}

export default CameraButton