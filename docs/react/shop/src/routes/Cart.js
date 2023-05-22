import {Table} from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import { plusnum } from '../store.js';
import { changeAge } from '../store/userSlice.js';


function Cart(){

    let a = useSelector((state) => {return state.cart});
    let state = useSelector((state) => {return state});
    let dispatch = useDispatch()
    return(
        <div>

            {state.user.name} {state.user.age}의 장바구니
            <button onClick={() => { dispatch(changeAge(100)) }}>버튼</button>

            <Table>
                <thead>
                    <tr>
                    <th>#</th>
                    <th>상품명</th>
                    <th>수량</th>
                    <th>변경하기</th>
                    </tr>
                </thead>
                <tbody>
                    {
                    a.map((x,y) => {
                        return(
                            <tr key={y}>
                                <td>{y}</td>
                                <td>{a[y].title}</td>
                                <td>{a[y].count}</td>
                                <td><button onClick={() => {
                                    dispatch(plusnum(y))
                                }}>+</button></td>
                            </tr>
                        )
                    })
                    }
                </tbody>
            </Table> 
        </div>
    )
}

export default Cart