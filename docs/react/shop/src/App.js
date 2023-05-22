import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Navbar,Container,Nav,Row,Col } from 'react-bootstrap';
import { Routes, Route, useNavigate, Outlet } from 'react-router-dom'
import Detail from './routes/Detail.js';
import axios from 'axios'
import Cart from './routes/Cart'
import { useDispatch, useSelector } from 'react-redux';
import { setShoes } from './data.js';
import { useEffect } from 'react';

function App() {

  let obj = {name : 'kim'};
  localStorage.setItem('data',JSON.stringify(obj))

  let navigate = useNavigate();
  let dispatch = useDispatch();
  let data = useSelector((state) => {return state.data});

  return (
    <div className="App">

      <Navbar bg="light" variant="light">
        <Container>
          <Navbar.Brand href="/">ShoeShop</Navbar.Brand>
          <Nav className="me-auto">
            <Nav.Link onClick={() => { navigate('/') }}>Home</Nav.Link>
            <Nav.Link onClick={() => { navigate('/Cart') }}>Cart</Nav.Link>
          </Nav>
        </Container>
      </Navbar>

      <div className='main-bg'></div>

      <Routes>
        <Route path='/' element={
          <>
          <Container>
            <Row>
              {
                data.map((a,b) => {
                  return(
                    <Card b = {b} navigate={navigate} data = {data}/>
                  )
                })
              }
            </Row>
          </Container>
          <button onClick={() => {
            axios.get('https://codingapple1.github.io/shop/data2.json')
            .then((result) => {
              dispatch(setShoes(result.data))
            }).catch(() => {
              console.log('실패')
            })
          }}>버튼</button>
          </>
        }/>
        <Route path='/detail/:id' element={ <Detail data = {data}/> }/>
        <Route path="*" element={ <div>없는페이지예여</div> }/>
        <Route path='/cart' element={<Cart/>}/>

        <Route path='/about' element={ <About/> }>
          <Route path='member' element={ <div>멤버임</div> }/>
          <Route path='location' element={ <div>위치정보임</div> }/>
        </Route>

        <Route path='/event' element={ <h4>오늘의 이벤트</h4> }>
          <Route path='one' element={ <div>첫 주문시 양배추즙 서비스</div> }/>
          <Route path='two' element={ <div>생일기념 쿠폰받기</div> }/>
        </Route>
      </Routes>

    </div>
  );
}

function About(){
  return(
    <div>
      <h4>회사정보임</h4>
      <Outlet></Outlet>
    </div>
  )
}

function Card(props){
  return(
      <Col onClick={() => {
        props.navigate('/detail/'+props.b);
      }} key={props.b}>
        <img src={'https://codingapple1.github.io/shop/shoes' + (props.b + 1) + '.jpg'} width="80%"/>
        <h4>{ props.data[props.b].title }</h4>
        <p>{ props.data[props.b].content }</p>
      </Col>
  )
}

export default App;
