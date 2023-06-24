import React from 'react'
import {styled} from '@mui/system'
import SideBar from './SideBar';
import FriendsSideBar from './FriendsSideBar';
import Messanger from './Messanger';
import AppBar from './AppBar';

function Dashboard() {

  const Wrapper = styled('div')({
    width:'100%',
    height:"100vh",
    display:'flex',
  })

  return (
    <Wrapper>
      <SideBar />
      <FriendsSideBar />
      <Messanger />
      <AppBar />
    </Wrapper>
  )
}

export default Dashboard