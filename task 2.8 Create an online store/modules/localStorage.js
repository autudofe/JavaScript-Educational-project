import {applyBasketItem} from "./renderContent.js";
import {basketCount} from "../index.js";
import {decodeBasketId} from './basketProducts.js'

const keyLocalStorage = 'onlineStore';
let dataStorage = {};

const getLocalStorage = () => {
    let data = localStorage.getItem(keyLocalStorage);
    dataStorage = !!data ? JSON.parse(data) : dataStorage;
    basketCount(dataStorage);
}


const addLocalStorage = (id) => {
    id in dataStorage ? dataStorage[id]++ : dataStorage[id] = 1;
    localStorage.setItem(keyLocalStorage, JSON.stringify(dataStorage));
}
const deleteLocalStorage = (id) => {
    id in dataStorage ? dataStorage[id]-- : dataStorage[id] = 1;
    localStorage.setItem(keyLocalStorage, JSON.stringify(dataStorage));
}


const removeProduct = (id) => {
    id = decodeBasketId(id);
    if (id in dataStorage) {
        delete dataStorage[id];
        localStorage.setItem(keyLocalStorage, JSON.stringify(dataStorage));
        applyBasketItem(dataStorage);
    }
}
export {addLocalStorage, deleteLocalStorage, removeProduct, dataStorage, getLocalStorage}