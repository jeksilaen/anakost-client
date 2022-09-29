import React, {useState} from 'react'
import {BrowserRouter as Router, Route, Routes} from 'react-router-dom';
import {isEmpty } from 'lodash'

import Login from './Login';
import Header from './Header'
import Notes from './Notes'
import Content from './Content'
import Buttons from './Buttons'
import Footer from './Footer'

import '../styles/Main.css'

function App() {
  return (
    <Router>
      <Main></Main>
    </Router>
  ) 
}

function Main() {
  const[username, setUsername] = useState('')
  function userLogin(username) {
    setUsername(username);
  }

  return(
    <Routes>
      <Route exact path="/" element={<Login setUser={userLogin} />} />
      <Route exact path="/home" element={<Home username={username}/>} />
    </Routes>
  );
}

function Home(props) {
  const [total, setTotal] = useState(0);
  const [userInput, setUserInput] = useState({})
  const [source, setSource] = useState('')
  const [notes, setNotes] = useState([]);
  const [sourceList, setSourceList] = useState([]);

  function updateTotal(newTotal) {
    setTotal(newTotal);
  }

  function newInput(input) {
    setUserInput(input);
  }

  function updateSource(source) {
    setSource(source);
  }

  function updateNotes(notes) {
    setNotes(notes);
  }

  function updateSourceList(newSource) {
    if (!isEmpty(newSource)) {
      setSourceList(newSource);
    }
  }

  return(
    <div className='container'>
            <Header user={props.username} total={total} updateSource={updateSource} sourceList={sourceList} updateSourceList={updateSourceList}></Header>
            <Notes notes={notes} updateNotes={updateNotes} user={props.username}></Notes>
            <Content update={updateTotal} user={props.username} input={userInput} source={source} updateNotes={updateNotes} updateSourceList={updateSourceList}></Content>
            <Buttons newInput={newInput} user={props.username} sourceList={sourceList}></Buttons>
            <Footer></Footer>
    </div>
  )
}
export default App