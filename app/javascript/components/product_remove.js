import axios from "axios";
import React from "react";

export function RemoveProduct({id, i, setProduct, state}) {
    const remove = () => axios({
            method: 'DELETE',
            url: `/api/products/${id}`
        }).then(() => {
            let new_products = [...state.products]
            new_products.splice(i, 1)
            setProduct({products: new_products, role: state.role, loaded: state.loaded});
        })
    return (
        <form>
            <div className="form-group">
                <button onClick={remove} className="btn btn-light">Remove</button>
            </div>
        </form>
    )
}
