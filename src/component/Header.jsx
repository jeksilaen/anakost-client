import React, {useState, useEffect} from 'react'
import axios from 'axios'
import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';
import Button from '@mui/material/Button';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: '70%',
  bgcolor: 'background.paper',
  border: '2px solid #000',
  boxShadow: 24,
  p: 5,
  height:'200px',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'space-around'
};

function BasicSelect(props) {
  const [source, setSource] = useState('All');
  const [newSource, setNewSource] = useState('');
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  
  const handleChange = (event) => {
    setSource(event.target.value);
  };

  const handleSourceChange = (event) => {
    setNewSource(event.target.value);
  };

  function addNewSource(){
    axios.post(`/api/sources/add/${props.user}`, {source : newSource});
    props.updateSourceList([...props.sourceList, {source : newSource}])
    setNewSource('')
  }

  useEffect(() => {
    props.updateSource(source)
  }, [source, props])

  return (
    <div>
      <Box sx={{ minWidth: 100, m:1}}>
          <FormControl variant="standard" fullWidth>
            <InputLabel sx={{fontFamily:'Montserrat, sans-serif', color:'white'}}>Source</InputLabel>
            <Select
              value={source}
              onChange={handleChange}
              sx={{fontFamily:'Montserrat, sans-serif', color:'white'}}
            >
              <MenuItem value="All">All</MenuItem>
              <MenuItem value="Cash">Cash</MenuItem>
              {props.sourceList.map((source, id) => <MenuItem key={id} value={source.source}>{source.source}</MenuItem>)}
              <MenuItem sx={{fontFamily:'Montserrat, sans-serif', color:'green'}} onClick={handleOpen}>Add Source +</MenuItem>
            </Select>
          </FormControl>
        </Box>

        <Modal
          open={open}
          onClose={handleClose}
        >
          <Box sx={style} className='box-header'>
            <div className='popup-container'>
              <div>
                <label style={{marginRight:'15px'}} htmlFor="source">New Source: </label>
                <input onChange={handleSourceChange} name="source" placeholder='ex. BCA, OVO' value={newSource}></input>
              </div>
              <Button onClick={() => {
                addNewSource()
                handleClose();
                }}>Add</Button>  
            </div>
          </Box>
        </Modal>
    </div>
    
  );
}

function Header(props) {
  return (
    <div className='header'>
        <div className='source-container'>
            <BasicSelect user={props.user} updateSource={props.updateSource} sourceList={props.sourceList} updateSourceList={props.updateSourceList}></BasicSelect>
        </div>
       
        <div className='container'>
            <h1>Rp. {props.total}</h1>
        </div>
    </div>
  )
}

export default Header

