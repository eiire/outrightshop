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
    const req_types = ['processing', 'accepted', 'completed']
    const update = event => {
        event.preventDefault()
        const formData = new FormData(event.target)
        const idx_type = req_types.indexOf(event.target.type_req.value)

        formData.append('type_req', req_types[idx_type] === 'completed'
            ? 'completed'
            : req_types[idx_type + 1]
        )

        submitReq(formData, id).then((data) => {
            if (data.error) alert(data.error.massages)
            else {
                setReq((prev) => {
                    const newList = [...prev.requests];
                    newList[i] = data;
                    return {loaded: true, role: "operator", requests: newList};
                });
            }
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
