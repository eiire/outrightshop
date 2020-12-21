import axios from "axios";
import React from "react";

export function RemoveRequest({id, i, setReq, state}) {
    const remove = () => axios({
            method: 'DELETE',
            url: `/api/requests/${id}`
        }).then(() => {
            let new_requests = [...state.products]
            new_requests.splice(i, 1)
            setProduct({products: new_requests, role: state.role, loaded: state.loaded});
        })
    return (
        <form>
            <div className="form-group">
                <button onClick={remove} className="btn btn-light">Remove</button>
            </div>
        </form>
    )
}
