import React from "react";

export function RemoveRequest({id, i, setReq, state}) {
    const remove = () => fetch( '/api/requests/' + id,{
            method: 'DELETE',
            headers: {
                "Authorization": localStorage.getItem("token"),
                "Accept": "application/json",
                "X-CSRF-TOKEN" : document.querySelector('meta[name="csrf-token"]').getAttribute('content')
            }
        }).then(res => res.json()).then(() => {
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
