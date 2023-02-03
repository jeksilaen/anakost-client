import React, {useState} from 'react'
import axios from 'axios'
import '../styles/Main.css'
import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';
import AddCircleRoundedIcon from '@mui/icons-material/AddCircleRounded';
import RemoveCircleRoundedIcon from '@mui/icons-material/RemoveCircleRounded';
import Button from '@mui/material/Button';

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
  height:'200px'
};


function Buttons(props) {
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const [post, setPost] = useState({
    status:'',
    amount:'',
    source:'Cash',
    desc:''
  });

  function handleChange(event) {
    const { name, value } = event.target;
    setPost(prevPost => {
      return {
        ...prevPost,
        [name]: value
      };
    });
  }

  function formatDate(date) {
    var hours = date.getHours();
    var minutes = date.getMinutes();
    minutes = minutes < 10 ? '0'+minutes : minutes;
    var strTime = hours + ':' + minutes;
    return  date.getDate() + "/" + (date.getMonth()+1) + "  " + strTime;
  }

  function insertDoc(){
    async function getPosts() {
      try {
        if (post.status === 'minus') {
          post.amount = post.amount * -1
        }else{
          post.amount = post.amount * 1
        }
        const newDoc = {
          amount : post.amount,
          source : post.source,
          desc : post.desc,
          date : formatDate(new Date())
        }
        props.newInput(newDoc)
        await axios.post(`https://web-production-3897.up.railway.app/api/${props.user}`, newDoc);

      } catch(err) {
        console.log('error', err);
      }
    }   
    getPosts();

    setPost({
      status:'',
      amount:'',
      source:'Cash',
      desc:''
    });
  }

    

  return (
    <div className='buttons'>
        <div className='funcButton'>
          <Button onClick={() => {
              handleOpen()
              setPost(prevPost => {
                return {
                  ...prevPost,
                  status: 'minus'
                };
              });
              }} sx={{borderRadius:'90px'}}><RemoveCircleRoundedIcon sx={{ fontSize: "70px", color:"red" }}></RemoveCircleRoundedIcon></Button>
          <Button onClick={() => {
              handleOpen()
              setPost(prevPost => {
                return {
                  ...prevPost,
                  status: 'plus'
                };
              });
              }} sx={{borderRadius:'90px'}}><AddCircleRoundedIcon  sx={{ fontSize: "70px", color:"green"}}></AddCircleRoundedIcon></Button>
        </div>

        <Modal
          open={open}
          onClose={handleClose}
        >
          <Box sx={style}>
            <div className='popup-container'>
              <div>
                <label htmlFor="amount">Amount: </label>
                <input onChange={handleChange} name="amount" placeholder='ex. 50.000' value={post.amount}></input>
              </div>
              
              <div>
                <label htmlFor="desc">Description: </label>
                <textarea onChange={handleChange} name="desc" value={post.desc}></textarea>
              </div>
              
              <div>
                <label htmlFor="source">Source: </label>
                <select onChange={handleChange} name="source">
                  <option value="Cash">Cash</option>
                  {props.sourceList.map((source, id) => <option key={id} value={source.source}>{source.source}</option>)}
                </select>
              </div>
              <Button onClick={() => {
                handleClose();
                insertDoc();
                }}>Add</Button>  
            </div>
          </Box>
      </Modal>
    </div> 
  )
}

export default Buttons



