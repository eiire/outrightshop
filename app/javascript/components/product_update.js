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

    const update = event => {
        event.preventDefault()
        const formData = new FormData(event.target)
        formData.append('name', event.target.name.value)
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
            <hr />
            <div className="form-group">
                <label htmlFor="name">Name: </label>
                <input onChange={changeHandler} type="text" id="name" value={productInfo.name} className="form-control"/>
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
                <input type="submit" value="Update" className="btn btn-light"/>
            </div>
        </form>
    )
}
