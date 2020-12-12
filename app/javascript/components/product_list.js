import React, { useState, useEffect } from 'react';
import axios from 'axios';
import {AddProduct} from './product_add'
import {RemoveProduct} from './product_remove'
import {UpdateProduct} from './product_update'


function ProductList({props}) {
    const [productState, setProductState] = useState({products:[], role: 'user', loaded: false});
    let user_role;

    useEffect(() => {
        // self-invoking so that there is no redirect to '/api/roles'
        (function () {
            axios({
                method: 'GET',
                url: '/api/roles'
            }).then(({data}) => {
                user_role = data.role
            })
        }())

        axios({
            method: 'GET',
            url: '/api/products'
        }).then(({data}) => {
            setProductState({loaded: true, role: user_role, products: data})
            console.log(productState)
        })
    }, []);

    return (
        <div>
            <h1>These are our products </h1>
            {productState.role === 'manager' && props.page === 'manager'
                ? productState.products.map((product, i)=>(
                    <div key={product.id}>
                        <br/>
                        <a href='#'>{product.name}</a>
                        <RemoveProduct id={product.id} i={i} setProduct={setProductState} />
                        <UpdateProduct id={product.id} i={i} setProduct={setProductState} productInfo={productState}/>
                    </div>
                ))
                : productState.products.map((product, i)=>(
                    <div key={product.id}>
                        <br/>
                        <a href='#'>{product.name}</a>
                    </div>
            ))}

            {productState.role === 'manager' && props.page === 'manager'
                    ? <AddProduct setProduct={setProductState}/>
                    : <div/>
            }
        </div>
    )
}

export default ProductList;
