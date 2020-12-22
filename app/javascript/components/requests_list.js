import React, { useState, useEffect } from 'react';
import axios from 'axios';
import {RemoveRequest} from "./request_remove";
import {UpdateReq} from "./req_stts_update";


function RequestList({props}) {
    const [reqState, setReqState] = useState({requests:[], role: 'user', loaded: false});
    let user_role;

    useEffect(() => {
        (async function() {
            await Promise.all([
                await axios({
                    method: 'GET',
                    url: '/api/roles'
                }).then(({data}) => {
                    user_role = data.role
                }),
                await axios({
                    method: 'GET',
                    url: '/api/requests'
                }).then(({data}) => {
                    console.log(data)
                    setReqState({loaded: true, role: user_role, requests: data})
                })
            ])
        }())
    }, []);

    return (
        <div>
            <h1 align="center">There is your requests: </h1>
            <div className="row" style={{margin: 'auto'}}>
                {reqState.role === 'operator' && props.page === 'operator'
                    ? reqState.requests.map((requests, i)=>(
                        <div className="col-sm-12">
                            <div className="card">
                                <div className="card-body" key={requests.id}>
                                    <div> Status: {requests.type_req}</div>
                                    <div> Product id: {requests.product_id}</div>
                                    <RemoveRequest i={i} id={requests.id} setReq={setReqState} state={reqState}/>
                                    <UpdateReq i={i} id={requests.id} setReq={setReqState} state={requests.type_req}/>
                                </div>
                            </div>
                        </div>
                    ))
                    : <div />
                }
            </div>
        </div>
    )
}

export default RequestList;
