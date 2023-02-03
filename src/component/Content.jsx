import React, {useState, useEffect} from 'react'
import axios from 'axios'

import toMoney from 'number-to-money';
import {isEmpty} from 'lodash'

import '../styles/Main.css'

function Content(props) {
  const [posts, setPosts] = useState([])

  useEffect(() => {
    async function getPosts() {
      try {
        const response = await axios.get(`/api/${props.user}`);
        setPosts(response.data.posts);
        props.updateNotes(response.data.notes);
        props.updateSourceList(response.data.sources)
      } catch(err) {
        console.log('error', err);
      }
    }   
    getPosts();
  }, []);

  useEffect(() => {
    if (!isEmpty(props.input)) {
      setPosts(prevPost => {
        return [...prevPost, props.input]
      })
    }
  }, [props.input])

  useEffect(() => {
    let amount = calculateTotal(props.source)
    props.update(amount)
  })

  function calculateTotal(source){
    let total = 0;

    if (source !== 'All') {
      let newArr = posts.filter(post => post.source === source)
      newArr.forEach(element => {
        total += element.amount
      });
    } else {
      posts.forEach(element => {
          total += element.amount
      });
    }
    
    return toMoney(total)
  }
  
  function Newpost(props){
    return (
        <div className='transaction'>
            <div>
              <h4 style={{color: props.amount<0 ? 'red' : 'green'}}>Rp. {toMoney(props.amount)}</h4>
              <h4>{props.source}</h4>
            </div>
            <div>
              <p>{props.desc}</p>
              <p className='date'>{props.date}</p>
            </div>
        </div>
    )
  }

  function filterPost(post, id) {
    if (props.source !== "All") {
      if (post.source === props.source){
        return <Newpost key={id}
                        amount={post.amount}
                        source={post.source}
                        desc={post.desc}
                        date={post.date}></Newpost>
      }
    }
    else{
        return <Newpost key={id}
                        amount={post.amount}
                        source={post.source}
                        desc={post.desc}
                        date={post.date}></Newpost>
    }
  }
    
  return (
    <div className='content'>
        <div>
            {posts.map((post, id) => filterPost(post, id))}
        </div>
    </div>
  )
}

export default Content
