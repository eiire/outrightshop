import React, {useState} from "react";

const submitProduct = formData => {
    console.log(formData)
    const config = {
        method: "POST",
        headers: {
            "Authorization": localStorage.getItem("token"),
            "Accept": "application/json",
            "X-CSRF-TOKEN" : document.querySelector('meta[name="csrf-token"]').getAttribute('content')
        },
        body: formData
    }
    return fetch('/api/products/', config).then(res => res.json());
}

export function AddProduct({setProduct}) {
    const [productInfo, setProductInfo] = useState({name: ''});
    const changeHandler = ({target}) => {
        setProductInfo((prev) => ({...prev, [target.name]:target.value}));
    }
    const add = event => {
        event.preventDefault()
        const formData = new FormData(event.target)
        submitProduct(formData).then((data) => {
            setProduct((prev) => {
                const newList = [...prev.products];
                newList.push(data);
                return {loaded: true, role: "manager", products: newList};
            });
        })
    }

    return (
        <form onSubmit={add}>
            <hr />
            <label htmlFor="name">Name:
                <input onChange={changeHandler} type="text" name="name" value={productInfo.name}/>
            </label>
            Image: <input type="file" name="image" accept="image/*"/>
            <input type="submit" value="Submit" className="btn btn-light"/>
        </form>
    )
}
