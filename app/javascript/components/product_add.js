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
            console.log(data)
            setProduct((prev) => {
                const newList = [...prev.products];
                newList.push(data);
                return {loaded: true, role: "manager", products: newList};
            });
        }).catch(error => console.log(error))
    }

    return (
        <form onSubmit={add}>
            <hr />
            <div className="form-group">
                <label htmlFor="name">Name: </label>
                <input className="form-control" onChange={changeHandler} type="text" name="name"
                       value={productInfo.name}/>
                <small id="emailHelp" className="form-text text-muted"> * Required field  </small>
            </div>
            <br />
            <div className="form-group">
                <label htmlFor="image">Image:</label>
                <input className="form-control" type="file" name="image" accept="image/*"/>
                <small id="emailHelp" className="form-text text-muted"> * Required field </small>
            </div>
            <br />
            <div className="form-group">
                <input type="submit" value="Submit" className="btn btn-light"/>
            </div>
        </form>
    )
}
