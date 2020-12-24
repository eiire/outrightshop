import RequestList from '../components/requests_list'
import React from "react";
import { render, unmountComponentAtNode } from "react-dom";
import { act } from "react-dom/test-utils";
import {afterEach, beforeEach, it, jest} from "@jest/globals";
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

it("Delete and change request by operator", async () => {
    jest.spyOn(global, "fetch").mockImplementation(() =>
        Promise.resolve({
            json: () => Promise.resolve({
                    role: 'operator',
                    requests: [
                        {
                            "id":1,
                            "type_req":"processing",
                            "operator_id":2,"user_id":1,
                            "product_id":1,
                            "created_at":"2020-12-22T04:46:09.804Z",
                            "updated_at":"2020-12-22T04:46:09.804Z"
                        }
                    ],
                    loaded: true,
                }
            )
        })
    );

    await act(async () => {
        render(<RequestList props={{page:"operator"}} />, container);
    });

    expect(container.querySelector("form > div > button").innerHTML)
        .toBe("Remove")
    expect(container.querySelector("form + form > div > button").innerHTML)
        .toBe(" Next state ")

    global.fetch.mockRestore();
});

it("Request by user", async () => {
    jest.spyOn(global, "fetch").mockImplementation(() =>
        Promise.resolve({
            json: () => Promise.resolve({
                    role: 'user',
                    requests: [
                        {
                            "id":1,
                            "type_req":"processing",
                            "operator_id":2,"user_id":1,
                            "product_id":1,
                            "created_at":"2020-12-22T04:46:09.804Z",
                            "updated_at":"2020-12-22T04:46:09.804Z"
                        }
                    ],
                    loaded: true,
                }
            )
        })
    );

    await act(async () => {
        render(<RequestList props={{page:"user"}} />, container);
    });

    expect(container.querySelector("form > div > button"))
        .toBeNull()
    expect(container.querySelector("form + form > div > button"))
        .toBeNull()

    global.fetch.mockRestore();
});