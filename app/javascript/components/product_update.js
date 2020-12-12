import axios from "axios";
import React, {useState} from "react";

export function UpdateProduct({i, id, setProduct}) {
    const [productInfo, setProductInfo] = useState({name: ''});
    const changeHandler = ({target}) => {
        setProductInfo((prev) => ({...prev, [target.id]:target.value}));
    }
    axios.defaults.headers.common = {
        'X-Requested-With': 'XMLHttpRequest',
        'X-CSRF-TOKEN' : document.querySelector('meta[name="csrf-token"]').getAttribute('content')
    };
    const update = () => axios({
            method: 'PUT',
            url: `/api/products/${id}`,
            data: productInfo
        })
        .then(({data}) => {
            setProduct((prev) => {
                const newList = [...prev];
                newList[i] = data;
                return newList;
            })
        })

    return (
        <form>
            <label>Name:
                <input onChange={changeHandler} type="text" id="name" value={productInfo.name}/>
            </label>
            <button onClick={update}>Update Product</button>
        </form>
    )
}
