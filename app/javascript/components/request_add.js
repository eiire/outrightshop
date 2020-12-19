import axios from "axios";
import React, {useState} from "react";

export function AddRequest({product_id, user_role}) {
    axios.defaults.headers.common = {
        'X-Requested-With': 'XMLHttpRequest',
        'X-CSRF-TOKEN' : document.querySelector('meta[name="csrf-token"]').getAttribute('content')
    };

    const [reqInfo, setReqInfo] = useState({user_id: Number});
    const changeHandler = ({target}) => {
        setReqInfo((prev) => ({...prev, [target.id]:target.value}));
    }
    const user_add = () => axios({
            method: 'POST',
            url: '/api/requests',
            data: {product_id: product_id, type_req: 'processing'},
        })
    const operator_add = () => axios({
        method: 'POST',
        url: '/api/requests',
        data: {product_id: product_id, type_req: 'processing', user_id: reqInfo.user_id},
    })
    const render_req = () => {
        if (user_role === 'operator') {
             return (
                 <form>
                    <label>Add request to user by user_id:&nbsp;
                        <input onChange={changeHandler} type="text" id="user_id" value={reqInfo.user_id}/>
                    </label>

                    <button className="btn btn-light" onClick={operator_add}>Add request</button>
                </form>
             )
        } else if (user_role !== 'anonymous') {
            return <button className="btn btn-light" onClick={user_add}>Add request</button>
        } else {
            return <div />
        }
    };

    return render_req()
}
