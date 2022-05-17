import {clearList, dataStorage } from '../index.js'
import {all,blockList,products} from './filters.js'
import {totalPrice} from './basketProducts.js'

let filteredByDataStorage;
const basketList = document.querySelector('.bag_container');
const homeBlockList = document.querySelector('.short_content');


!!blockList && products.then(list => {
    clearList(blockList);
    renderItem(list)
});

const itemProductHtml = ({name, price, img}) => `
                <div class="img_card">
                    <img class="img_card_curr" src="img/${img}" alt="${name}">
                </div>
                <p class="name_card">${name}</p>
                <p class="price_card">$${price}</p>`;


const itemBasketHtml = ({id, name, price, company, img}, dataStorage) => `
            <div class="bag_card_img_text">
                <img class="bag_card_img" src="img/${img}" alt="${name}">
                <div class="bag_card_text">
                    <p class="bag_card_name">${name}</p>
                    <p class="bag_card_price">$${price}</p>
                    <p class="bag_card_remove">remove</p>
                </div>
            </div>
            <div class="quantity-block">
                <label>
                    <i class="fa-solid fa-angle-up "></i>
                    <input class="quantity-num" type="number" value="${dataStorage[id]}"/>
                    <i class="fa-solid fa-angle-down"></i>
                </label>
            </div>`;


const renderBasketItem = (list) => list.map((product) => {
    const nextItem = document.createElement('div');
    nextItem.classList.add('bag_card');
    nextItem.id = `${product.id}_basket`;
    nextItem.innerHTML = itemBasketHtml(product, dataStorage);
    basketList.append(nextItem);
})

const applyBasketItem = (dataStorage) => products.then(list => {
        filteredByDataStorage = dataStorage !== null ? list.filter(({id}) => id in dataStorage) : dataStorage;
        clearList(basketList);
        totalPrice(dataStorage);
        renderBasketItem(filteredByDataStorage);
    }
);

const renderItem = (list) => list.map((product) => {
    const nextItem = document.createElement('div');
    nextItem.classList.add('card');
    nextItem.id = product.id;
    nextItem.innerHTML = itemProductHtml(product);
    renderItem.append(nextItem);
})

const renderThreeItem = (list) => list.map((product) => {
    const nextItem = document.createElement('div');
    nextItem.classList.add('card');
    nextItem.id = product.id;
    nextItem.innerHTML = itemProductHtml(product);
    homeBlockList.append(nextItem);
})

const applyThreeItem = (searchCompanyFilter) => products.then(list => {
        const filteredByCompany = searchCompanyFilter !== all ? list.filter(({company}) => company.toLowerCase() === searchCompanyFilter) : list;
    renderThreeItem(filteredByCompany);
    }
);

!!homeBlockList && applyThreeItem('ikea');



export {renderItem,applyBasketItem, filteredByDataStorage, basketList, blockList, products};