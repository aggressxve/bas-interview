import { Given, When, Then } from "@cucumber/cucumber";
import { APIResponse, expect, request } from "@playwright/test";
import Ajv from 'ajv';
const schema = require('../../../utils/response.schema.json');

let baseURL = 'https://petstore.swagger.io/v2'
let response: APIResponse;
const randomNumber: number = Math.round(Math.random() * 1000 + 1);
let petName: string = "Snoop doggy dogg";
const ajv = new Ajv();
let requestAPI: any;

Given('the request context is created', async function(){
    requestAPI = await request.newContext();
})

When('user sends a post request to create a pet', async function () {
    response = await requestAPI.post(`${baseURL}/pet/`, {
        data: {
            "id": randomNumber,
            "category": {
                "id": randomNumber,
                "name": "categoryname"
            },
            "name": petName,
            "photoUrls": ['https://www.google.com/url?sa=i&url=https%3A%2F%2Fwww.hartz.com%2Ffive-things-all-small-dog-owners%2F&psig=AOvVaw3YhKWa-lFw7GsCsS0v6w84&ust=1702968517485000&source=images&cd=vfe&opi=89978449&ved=0CBEQjRxqFwoTCKjk0J6ymIMDFQAAAAAdAAAAABAI'],
            "tags": [
                {
                    "id": randomNumber,
                    "name": "test tag"
                }
            ],
            "status": "available"
        }
    });
});

Then('response should be schema compliant', async function () {
    let responseJson = await response.json();
    const validate = ajv.compile(schema);
    const valid = validate(responseJson);
    await expect(valid).toBe(true);
})

Given('response should get a 200 status code', async function () {
    await expect(response).toBeOK();
});

When('user sends a get request with an existing pet id', async function () {
    response = await requestAPI.get(`${baseURL}/pet/${randomNumber}`);
});

When('user sends a put request with new data and an existing pet id', async function () {
    response = await requestAPI.put(`${baseURL}/pet/`, {
        data: {
            "id": randomNumber,
            "category": {
                "id": 0,
                "name": "updated pet"
            },
            "name": petName,
            "photoUrls": ['pet has been updated'],
            "tags": [
                {
                    "id": 0,
                    "name": "this has been updated"
                }
            ],
            "status": "available"
        }
    });
  });