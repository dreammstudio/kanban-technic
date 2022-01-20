import {useState,useEffect} from 'react';
export default function Home() {
  const [future,setFuture] = useState([]);
  const [past,setPast] = useState([]);
  const [present,setPresent] = useState([]);
  function add(type,item){

    switch(type){
      case 'future':
        setFuture([...future,item]);
        break;
      case 'past':
        setPast([...past,item]);
        break;
      case 'present':
        setPresent([...present,item]);
        break;
    }
  }
  function left(type,item){
    switch(type){
      case 'future':
        setFuture(future.filter(i=>i!==item));
        setPast([...past,item]);
        break;
      case 'past':
        setPast(past.filter(i=>i!==item));
        setPresent([...present,item]);
        break;
      case 'present':
        setPresent(present.filter(i=>i!==item));
        setFuture([...future,item]);
        break;
    }
  }
  function right(type,item){
    switch(type){
      case 'future':
        setFuture(future.filter(i=>i!==item));
        setPresent([...present,item]);
        break;
      case 'past':
        setPast(past.filter(i=>i!==item));
        setFuture([...future,item]);
        break;
      case 'present':
        setPresent(present.filter(i=>i!==item));
        setPast([...past,item]);
        break;
    }
  }
  function deleteItem(type,item){
    switch(type){
      case 'future':
        setFuture(future.filter(i=>i!==item));
        break;
      case 'past':
        setPast(past.filter(i=>i!==item));
        break;
      case 'present':
        setPresent(present.filter(i=>i!==item));
        break;
    }
  }

  useEffect(() => {
    if(localStorage.getItem('future')){
      setFuture(JSON.parse(localStorage.getItem('future')));
    }
    if(localStorage.getItem('past')){
      setPast(JSON.parse(localStorage.getItem('past')));
    }
    if(localStorage.getItem('present')){
      setPresent(JSON.parse(localStorage.getItem('present')));
    }
  },[])
  useEffect(() => {
    localStorage.setItem('future',JSON.stringify(future));
    localStorage.setItem('past',JSON.stringify(past));
    localStorage.setItem('present',JSON.stringify(present));
  },[future,past,present]);
  return (
    <div className="app">
      <div className="items">
        <div className="item future">
          <h1>I will do</h1>
          <ul>
          <li className="text">
              <input type="text" className="input" placeholder="What I will do?"/>
              <button className="btn" onClick={() => {
                if(document.querySelector('.future .input').value.trim().length > 0) {
                add('future',document.querySelector('.future .input').value);
                document.querySelector('.future .input').value = '';
                }else {
                  alert('Please input something');
                }
              }}>Add</button>
            </li>
            {future.map((item,index) => (
            <li className="text" key={`${item}.${index}`}>
              <div className="buttons">
              <button className="btn" onClick={(event) => left("future",event.target.parentElement.parentElement.children[1].textContent)}>Previous</button>
              <button className="btn" onClick={(event) => right("future",event.target.parentElement.parentElement.children[1].textContent)}>Next</button>
              <button className="btn" onClick={(event) => deleteItem("future",event.target.parentElement.parentElement.children[1].textContent)}>Delete</button>
              </div>
              <p>{item}</p>
            </li>
            ))}
          </ul>
        </div>
        <div className="item present">
          <h1>I doing</h1>
          <ul>
            <li className="text">
              <input type="text" className="input" placeholder="What I doing?"/>
              <button className="btn" onClick={() => {
                if(document.querySelector('.present .input').value.trim().length > 0) {
                add('present',document.querySelector('.present .input').value);
                document.querySelector('.present .input').value = '';
                }else {
                  alert('Please input something');
                }
              }}>Add</button>
            </li>
            {present.map((item,index) => (
            <li className="text"  key={`${item}.${index}`}>
              <div className="buttons">
              <button className="btn" onClick={(event) => left("present",event.target.parentElement.parentElement.children[1].textContent)}>Previous</button>
              <button className="btn" onClick={(event) => right("present",event.target.parentElement.parentElement.children[1].textContent)}>Next</button>
              <button className="btn" onClick={(event) => deleteItem("present",event.target.parentElement.parentElement.children[1].textContent)}>Delete</button>
              </div>
              <p>{item}</p>
            </li>
            ))}

          </ul>
        </div>
        <div className="item past">
          <h1>I did</h1>
          <ul>
          <li className="text">
              <input type="text" className="input" placeholder="What I doing?"/>
              <button className="btn" onClick={() => {
                if(document.querySelector('.past .input').value.trim().length > 0) {
                add('past',document.querySelector('.past .input').value);
                document.querySelector('.past .input').value = '';
                }else {
                  alert('Please input something');
                }
              }}>Add</button>
            </li>
            {past.map((item,index) => (
            <li className="text"  key={`${item}.${index}`}>
              <div className="buttons">
              <button className="btn" onClick={(event) => left("past",event.target.parentElement.parentElement.children[1].textContent)}>Previous</button>
              <button className="btn" onClick={(event) => right("past",event.target.parentElement.parentElement.children[1].textContent)}>Next</button>
              <button className="btn" onClick={(event) => deleteItem("past",event.target.parentElement.parentElement.children[1].textContent)}>Delete</button>
              </div>
              <p>{item}</p>
            </li>
            ))}
          </ul>
        </div>
        <button className="btn" style={{margin:"auto","marginTop":"2rem"}} onClick={() => {
          setFuture([]);
          setPast([]);
          setPresent([]);
        }}>Delete All</button>
      </div>
      <style jsx>
        {
          `
          .items {
            display: flex;
            justify-content: space-between;
            width: 95%;
            height: 100%;
            flex-direction:row;
            flex-wrap: wrap;
            margin:1rem;
            margin-top:2rem;
          }
          .item {
            width:33%;
            padding-bottom:1rem;
            border: 1px solid black;
          }
          .item ul {
            list-style: none;
            margin: 0;
            padding:0;
            padding:1rem;
          }
          .item  h1{
            text-align: center;
            margin:0;
            border-bottom: 1px solid black;
          }
          .text {
            display:flex;
            background-color: #f5f5f5;
            margin:auto;
            padding:.5rem;
            margin-bottom:1rem;
            border-radius:7px;
          }
          .item ul li p {
            margin:0;
            padding:0;
           word-break: break-all;

          }
          .buttons {
            margin:auto 0;
            margin-right:1rem;
          }
          .btn {
            margin:5px;
            border:1px solid black;
            border-radius:7px;
            padding:.25rem .75rem;
            background:transparent;
            color:black;
            cursor:pointer;
            transition:.2s
          }
          .btn:hover {
            background:black;
            color:white;
            transition:.2s
          }
          .input {
            width:80%;
            margin-right:1rem;
            border:1px solid black;
            border-radius:7px;
            padding:.25rem .75rem;
            background:transparent;
            color:black;
          }
          .input:focus {
            border:1px solid #00bcd4;
          }
          @media screen and (max-width:800px) {
            .items {
              flex-direction:column;
              margin:0;
              width:100%;
              padding:0;
              margin-top:2rem;
            }
            .item {
              width:95%;
              margin:auto;
              margin-bottom:1rem;
            }
          }

          `
        }
      </style>
    </div>
  );
}
