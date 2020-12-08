import React, { useState, useEffect } from 'react';
import axios from 'axios';
import {AddProduct} from './product_add'
import {RemoveProduct} from './product_remove'
import {UpdateProduct} from './product_update'


function ProductList() {
    const [productState, setProductState] = useState([]);

    useEffect(() => {
        axios({
            method: 'GET',
            url: '/products'
        })
        .then(({data}) => {
            setProductState(data);
        })
    }, []);

    return (
        <div>
            <h1>These are our products</h1>
            {productState.map((product, i)=>(
                <div key={product.id}>
                    <br/>
                    <a href='#'>{product.name}</a>
                    <RemoveProduct id={product.id} i={i} setProduct={setProductState} />
                    <UpdateProduct id={product.id} i={i} setProduct={setProductState} productInfo={productState}/>
                </div>
            ))}
            <br/>
            <AddProduct setProduct={setProductState}/>
        </div>
    )
}

export default ProductList;
