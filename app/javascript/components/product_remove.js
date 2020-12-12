import axios from "axios";
import React from "react";

export function RemoveProduct({id, i, setProduct}) {
    const remove = () => axios({
            method: 'DELETE',
            url: `/api/products/${id}`
        }).then(() => {
            setProduct((prev) => {
                const newList = [...prev]
                newList.splice(i, 1);
                return newList;
            });
        })
    return <button onClick={remove}>Remove</button>
}
