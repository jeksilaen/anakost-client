import React, {useState} from 'react'
import {Link} from 'react-router-dom'
import AttachMoneyIcon from '@mui/icons-material/AttachMoney';
import Button from '@mui/material/Button';
import '../styles/Login.css'

function Login(props) {
  const [username, setUsername] = useState('')

  function handleChange(event) {
    setUsername(event.target.value)
  }


  return (
    <div className='login'>
        <div>
            <h4>AnaKost</h4>
            <AttachMoneyIcon sx={{fontSize:'3rem'}}></AttachMoneyIcon>
        </div>
        <input placeholder='Enter your username..' style={{border:"6px solid #ffffff"}} onChange={handleChange} value={username}></input>
        <Button variant="contained" onClick={() => {
            props.setUser(username)
        }}><Link to={'/home'}>Login</Link></Button>
    </div>
  )
}

export default Login