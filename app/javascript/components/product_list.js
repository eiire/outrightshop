import React, { useState, useEffect } from 'react';
import {AddProduct} from './product_add'
import {RemoveProduct} from './product_remove'
import {UpdateProduct} from './product_update'
import {AddRequest} from './request_add'


function ProductList({props}) {
    const [productState, setProductState] = useState({products:[], role: 'user', loaded: false});

    useEffect(() => {
        (async function() {
            await Promise.all([
                await fetch('/api/products', {
                    method: 'GET',
                    headers: {
                        "Authorization": localStorage.getItem("token"),
                        "Accept": "application/json",
                        // "X-CSRF-TOKEN" : document.querySelector('meta[name="csrf-token"]').getAttribute('content')
                    },
                }).then((response) => {
                    return response.json();
                }).then((data) => {
                    setProductState(() => {
                        return data
                    })
                })
            ])
        }())
    }, []);

    return (
        <div>
            <h1 align="center">These are our products</h1>
            <div className="row" style={{margin: 'auto'}}>
                {productState.role === 'manager' && props.page === 'manager'
                    ? productState.products.map((product, i)=>(
                        <div className="col-sm-2">
                            <div className="card">
                                <img className="card-img-top" src={product.image} style={{height: '25%'}}/>
                                <div className="card-body" key={product.id}>
                                    <div>{product.name}</div>
                                    <br/>
                                    <UpdateProduct id={product.id} i={i} setProduct={setProductState} productInfo={productState}/>
                                    <br/>
                                    <RemoveProduct id={product.id} i={i} setProduct={setProductState} state={productState}/>
                                    <br/>
                                    <AddRequest product_id={product.id} user_role={productState.role}/>
                                </div>
                            </div>
                            <br />
                        </div>
                    ))
                    : productState.products.map((product, i)=>(
                        <div className="col-sm-3">
                            <div className="card">
                                <img className="card-img-top" src={product.image}/>
                                <div className="card-body" key={product.id}>
                                    <div>{product.name}</div>
                                    <br />
                                    <AddRequest product_id={product.id} user_role={productState.role}/>
                                </div>
                            </div>
                            <br />
                        </div>
                ))}
            </div>

            <div className="container">
                <div className="row justify-content-center align-items-center">
                    {productState.role === 'manager' && props.page === 'manager'
                        ? <div>
                            <h3 id={"manager_entry_title"} align="center" style={{margin:'5% 0 0 0'}}> Add products: </h3>
                            <AddProduct setProduct={setProductState}/>
                        </div>
                        : <div/>
                    }
                </div>
            </div>
        </div>
    )
}

export default ProductList;
