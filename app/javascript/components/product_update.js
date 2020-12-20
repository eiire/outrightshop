import axios from "axios";
import React, {useState} from "react";

const submitProduct = (formData, id) => {
    const config = {
        method: "PUT",
        headers: {
            "Authorization": localStorage.getItem("token"),
            "Accept": "application/json",
            "X-CSRF-TOKEN" : document.querySelector('meta[name="csrf-token"]').getAttribute('content')
        },
        body: formData
    }
    return fetch('/api/products/' + id, config).then(res => res.json());
}

export function UpdateProduct({i, id, setProduct}) {
    const [productInfo, setProductInfo] = useState({name: ''});
    const changeHandler = ({target}) => {
        setProductInfo((prev) => ({...prev, [target.id]:target.value}));
    }
    axios.defaults.headers.common = {
        'X-Requested-With': 'XMLHttpRequest',
        'X-CSRF-TOKEN' : document.querySelector('meta[name="csrf-token"]').getAttribute('content')
    };
    const update = event => {
        event.preventDefault()
        const formData = new FormData(event.target)
        submitProduct(formData, id).then((data) => {
            setProduct((prev) => {
                const newList = [...prev.products];
                newList[i] = data;
                return {loaded: true, role: "manager", products: newList};
            });
        })
    }

    return (
        <form onSubmit={update}>
            <div>Name:&nbsp;
                <input onChange={changeHandler} type="text" id="name" value={productInfo.name}/>
            </div>
            Image: <input type="file" name="image" accept="image/*"/>
            <input type="submit" value="Update" className="btn btn-light"/>
        </form>
    )
}
