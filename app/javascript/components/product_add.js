import axios from "axios";
import React, {useState} from "react";

export function AddProduct({setProduct}) {
    const [productInfo, setProductInfo] = useState({name: ''});
    const changeHandler = ({target}) => {
        setProductInfo((prev) => ({...prev, [target.id]:target.value}));
    }
    axios.defaults.headers.common = {
        'X-Requested-With': 'XMLHttpRequest',
        'X-CSRF-TOKEN' : document.querySelector('meta[name="csrf-token"]').getAttribute('content')
    };
    const add = () => axios({
            method: 'POST',
            url: '/products',
            data: productInfo,
        }).then(({data}) => {
            setProduct((prev) => {
                const newList = [...prev];
                newList.push(data);
                return newList;
            });
        })

    return (
        <form>
            <hr />
            <label>Name:
                <input onChange={changeHandler} type="text" id="name" value={productInfo.name}/>
            </label>
            <button onClick={add}>Add Product</button>
        </form>
    )
}
