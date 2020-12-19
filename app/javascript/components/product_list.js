import React, { useState, useEffect } from 'react';
import axios from 'axios';
import {AddProduct} from './product_add'
import {RemoveProduct} from './product_remove'
import {UpdateProduct} from './product_update'
import {AddRequest} from './request_add'


function ProductList({props}) {
    const [productState, setProductState] = useState({products:[], role: 'user', loaded: false});
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
                    url: '/api/products'
                }).then(({data}) => {
                    setProductState({loaded: true, role: user_role, products: data})
                    console.log(productState)
                })
            ])
        }())
    }, []);

    return (
        <div>
            <h1 align="center">These are our products</h1>
            <div className="row">
                {productState.role === 'manager' && props.page === 'manager'
                    ? productState.products.map((product, i)=>(
                        <div className="col-sm-6">
                            <div className="card">
                                <div class="card-body" key={product.id}>
                                    <div>{product.name}</div>
                                    <br/>
                                    <UpdateProduct id={product.id} i={i} setProduct={setProductState} productInfo={productState}/>
                                    <br/>
                                    <RemoveProduct id={product.id} i={i} setProduct={setProductState} state={productState}/>
                                    <br/>
                                    <AddRequest product_id={product.id} user_role={productState.role}/>
                                </div>
                            </div>
                        </div>
                    ))
                    : productState.products.map((product, i)=>(
                        <div className="col-sm-6">
                            <div className="card">
                                <div className="card-body" key={product.id}>
                                    <div>{product.name}</div>
                                    <br />
                                    <AddRequest product_id={product.id} user_role={productState.role}/>
                                </div>
                            </div>
                        </div>
                ))}
            </div>

            <div align="center">
                {productState.role === 'manager' && props.page === 'manager'
                    ? <AddProduct setProduct={setProductState}/>
                    : <div/>
                }
            </div>
        </div>
    )
}

export default ProductList;
