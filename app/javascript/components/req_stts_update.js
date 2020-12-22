import axios from "axios";
import React, {useState} from "react";

const submitReq = (formData, id) => {
    const config = {
        method: "PUT",
        headers: {
            "Authorization": localStorage.getItem("token"),
            "Accept": "application/json",
            "X-CSRF-TOKEN" : document.querySelector('meta[name="csrf-token"]').getAttribute('content')
        },
        body: formData
    }
    return fetch('/api/requests/' + id, config).then(res => res.json());
}

export function UpdateReq({i, id, setReq, state}) {
    const update = event => {
        event.preventDefault()
        const formData = new FormData(event.target)
        formData.append('type_req', event.target.type_req.value)
        submitReq(formData, id).then((data) => {
            setReq((prev) => {
                const newList = [...prev.requests];
                newList[i] = data;
                return {loaded: true, role: "operator", requests: newList};
            });
        })
    }

    return (
        <form onSubmit={update}>
            <hr />
            <div className="form-group">
                <button type="submit" id="type_req" className="btn btn-light" value={state}> Next state </button>
            </div>
        </form>
    )
}
