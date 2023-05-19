import './App.css';
import { useState } from 'react';

function App() {

  let [글제목, 글제목변경] = useState(['남자코트추천','강남 우동맛집','파이썬독학']);
  let [logo, setLogo] = useState('ReactBlog');
  let [따봉,변경] = useState([0,0,0]);
  let [modal,setModal] = useState(false);
  let [c,b] = useState(0);
  let [입력값,입력값변경] = useState('');


  return (
    <div className="App">
      <div className='black-nav'>
        <h4>{logo}</h4>
      </div>

      {
        글제목.map(function(a,i){
          return (
            <div className='list' key={i}>
              <h4 onClick={() => { setModal(!modal); b(i) }}>{ a } <span onClick={ (e) => { e.stopPropagation(); let copy = [...따봉];
              copy[i] += 1
              변경(copy) } }>좋아요</span> { 따봉[i] } <button onClick={(e) => { e.stopPropagation();let a = [...글제목]; a.splice(i,1); 글제목변경(a)}}>삭제</button></h4>
              <p>2월 18일 발행</p>
            </div>
          )
        })
      }

      <input onChange={(e) => {입력값변경(e.target.value)}}/>
      <button onClick={() => { let copy = [...글제목]; copy.unshift(입력값); 글제목변경(copy)}}>버튼</button>

      {
        modal == true ? <Modal 글제목={글제목} 변경={글제목변경} c={c}/> : null
      }

    </div>
  );
}

function Modal(props){
  return (
    <div className='modal'>
        <h4>{props.글제목[props.c]}</h4>
        <p>날짜</p>
        <p>상세내용</p>
        <button onClick={() => {let a = [...props.글제목];
        a[0] = '여자코트 추천'
        props.변경(a)}}>글수정</button>
    </div>
  )
}

export default App;
