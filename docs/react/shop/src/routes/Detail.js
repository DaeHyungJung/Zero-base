import { useEffect, useState } from "react";
import { useParams } from "react-router-dom"
import styled from 'styled-components'
import {Nav} from 'react-bootstrap'
import { useDispatch } from "react-redux";
import { carts } from '../store.js'

let Box = styled.div`
  background : yellow;
  width : 100%;
  line-height : 100px;
  font-size : 50px;
`

function Detail(props){

  let [count , setCount] = useState(0)

  let {id} = useParams();
  let a = props.data.find((x) => x.id == id)
  let [box,setBox] = useState(true);
  let [value,setValue] = useState('');
  let [탭,탭변경] = useState(0);
  let dispatch = useDispatch()

  useEffect(() => {
    setTimeout(function(){
      setBox(false)
    },2000);
    if(isNaN(value) == true){
      alert('그러지마세요')
    }
  },[value])

  useEffect(() => {
    let 꺼낸거 = localStorage.getItem('watched')
    꺼낸거 = JSON.parse(꺼낸거)
    꺼낸거.push(a.id)
    꺼낸거 = new Set(꺼낸거)
    꺼낸거 = Array.from(꺼낸거)
    localStorage.setItem('watched',JSON.stringify(꺼낸거))
  },[])

    return(
      <div className="container">
        {
          box == true ? <Box>2초이내 구매시 할인</Box> : null
        }
        {count}
        <button onClick={() => {setCount(count+1)}}>버튼</button>
            <div className="row">
              <div className="col-md-6">
              <img src={"https://codingapple1.github.io/shop/shoes" + (a.id + 1) + ".jpg"} width="100%" />
              </div>
              <div className="col-md-6">
                <input onChange={(e) => {setValue(e.target.value)}}></input>
                <h4 className="pt-5">{a.title}</h4>
                <p>{a.content}</p>
                <p>{a.price}</p>
                <button className="btn btn-danger" onClick={() => { dispatch(carts(a)) }}>주문하기</button> 
              </div>
            </div>
            <Nav variant="tabs"  defaultActiveKey="link0">
              <Nav.Item>
                <Nav.Link eventKey="link0" onClick={() => { 탭변경(0) }}>버튼0</Nav.Link>
              </Nav.Item>
              <Nav.Item>
                <Nav.Link eventKey="link1" onClick={() => { 탭변경(1) }}>버튼1</Nav.Link>
              </Nav.Item>
              <Nav.Item>
                <Nav.Link eventKey="link2" onClick={() => { 탭변경(2) }}>버튼2</Nav.Link>
              </Nav.Item>
            </Nav>
            <TabContent 탭 = {탭} shoes = {props.data}/>
      </div> 
    )
  }

  function TabContent({탭,shoes}){
    let [fade,setFade] = useState('');
    useEffect(() => {
      setTimeout(()=>{setFade('end')},100)
      return () => {
        setFade('')
      }
    },[탭])
    return(
      <div className={'start' + fade}>
        {[<div>{shoes[0].title}</div>,<div>내용1</div>,<div>내용2</div>][탭]}
      </div>
    )
  }

  export default Detail