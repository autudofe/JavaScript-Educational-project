import {applyBasketItem} from './modules/renderContent.js';
import {addLocalStorage, removeProduct, dataStorage, getLocalStorage} from './modules/localStorage.js'
import {basket, quantityProducts} from './modules/basketProducts.js'
import {searchCompany} from './modules/filters.js'

const displayItems = document.querySelectorAll('.display_class_none');


displayItems.forEach((item) => {
    item.style.display = 'none';
})


const basketCount = (dataStorage) => {
    const itemCount = document.querySelector('.fa-cart-shopping');
    const root = document.querySelector(':root');
    const count = Object.keys(dataStorage).length;
    const displayValue = count === 0 ? 'none' : 'block';
    itemCount.dataset.count = `${count}`;
    root.style.setProperty('--main-display-none', displayValue);
}

getLocalStorage();


document.addEventListener('click', (ev) => {
    const cardItem = ev.target.closest(".card");
    const elFilter = ev.target.closest('li');
    const currentClass = ev.target.className;

    if (!!cardItem) {
        addLocalStorage(cardItem.id);
        basketCount(dataStorage);
    }
    if (currentClass.includes('fa-xmark')) {
        basket('close');
    }
    if (currentClass.includes('fa-cart-shopping')) {
        applyBasketItem(dataStorage);
        basket('open');
    }
    if (currentClass.includes('fa-angle-up')) {
        quantityProducts('+', ev);
    }
    if (currentClass.includes('fa-angle-down')) {
        quantityProducts('-', ev);
    }
    if (currentClass.includes('bag_card_remove')) {
        removeProduct(ev.target.closest(".bag_card").id)
        basketCount(dataStorage);
    }
    if (!!elFilter) {
        searchCompany(elFilter);
    }
})


const clearList = (blockItem) => {
    const blockListContent = blockItem.innerHTML;
    blockItem.innerHTML = ``;
}


export {clearList, dataStorage, basketCount};

