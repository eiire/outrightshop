import axios from "axios";
import React from "react";

export function RemoveRequest({id, i, setReq, state}) {
    axios.defaults.headers.common = {
        'X-Requested-With': 'XMLHttpRequest',
        'X-CSRF-TOKEN' : document.querySelector('meta[name="csrf-token"]').getAttribute('content')
    };

    const remove = () => axios({
            method: 'DELETE',
            url: `/api/requests/${id}`
        }).then(() => {
            let new_requests = [...state.products]
            new_requests.splice(i, 1)
            setReq({products: new_requests, role: state.role, loaded: state.loaded});
        })
    return (
        <form>
            <div className="form-group">
                <button onClick={remove} className="btn btn-light">Remove</button>
            </div>
        </form>
    )
}
