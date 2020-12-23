import ProductList from '../components/product_list'
import React from "react";
import { render, unmountComponentAtNode } from "react-dom";
import { act } from "react-dom/test-utils";
import {jest} from "@jest/globals";
global.fetch = jest.fn().mockImplementation(() => mockFetchPromise);


let container = null;
beforeEach(() => {
    container = document.createElement("div");
    document.body.appendChild(container);
});

afterEach(() => {
    unmountComponentAtNode(container);
    container.remove();
    container = null;
});

it("Renders page for manager", async () => {
    jest.spyOn(global, "fetch").mockImplementation(() =>
        Promise.resolve({
            json: () => Promise.resolve(
                {
                    loaded:true,
                    products: [],
                    role: "manager"
                })
        })
    );

    await act(async () => {
        render(<ProductList props={{page:"manager"}} />, container);
    });

    // User is manager and can add products
    expect(container.querySelector("h3").innerHTML).toBe(" Add products: ")
    expect(container.querySelector("form").lastChild.childNodes[0].value).toBe("Submit")

    global.fetch.mockRestore();
});

it("Renders page for user", async () => {
    jest.spyOn(global, "fetch").mockImplementation(() =>
        Promise.resolve({
            json: () => Promise.resolve({loaded:true, products: [], role: "user"})
        })
    );

    await act(async () => {
        render(<ProductList props={{page:"manager"}} />, container);
    });

    expect(container.querySelector("h3")).toBeNull()

    global.fetch.mockRestore();
});

it("Renders user page for manager", async () => {
    jest.spyOn(global, "fetch").mockImplementation(() =>
        Promise.resolve({
            json: () => Promise.resolve({loaded:true, products: [], role: "manager"})
        })
    );

    await act(async () => {
        render(<ProductList props={{page:"user"}} />, container);
    });

    expect(container.querySelector("h3")).toBeNull()

    global.fetch.mockRestore();
});

it("Renders user page for user", async () => {
    jest.spyOn(global, "fetch").mockImplementation(() =>
        Promise.resolve({
            json: () => Promise.resolve({loaded:true, products: [], role: "user"})
        })
    );

    await act(async () => {
        render(<ProductList props={{page:"user"}} />, container);
    });

    expect(container.querySelector("h3")).toBeNull()

    global.fetch.mockRestore();
});
