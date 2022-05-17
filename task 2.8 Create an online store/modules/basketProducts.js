import {addLocalStorage, dataStorage, deleteLocalStorage} from "./localStorage.js";
import {filteredByDataStorage} from "./renderContent.js";


const basket = (value) => {
    const arrClass = document.querySelectorAll('.dark_area, .your_bag');
    const bodyItem = document.querySelector('body');
    let bodyOverflow;

    if (value === 'open') {
        value = 'flex';
        bodyOverflow = 'hidden';
    } else {
        value = 'none';
        bodyOverflow = 'auto';
    }

    bodyItem.style.overflow = bodyOverflow;
    arrClass.forEach((item) => {
        item.style.display = value;
    })
}

const decodeBasketId = (id) => {
    return id.replace(/_basket/g, '');
}

const quantityProducts = (value, ev) => {
    const bagCardId = ev.target.closest(".bag_card");
    const currentID = decodeBasketId(bagCardId.id);
    const quantity = bagCardId.querySelector('.quantity-num');
    const quantityValue = parseInt(quantity.value);

    if (value === '+' && quantityValue < 100) {
        quantity.value = quantityValue + 1;
        addLocalStorage(currentID);
    }else if (value === '-' && quantityValue > 1) {
        quantity.value = quantityValue - 1;
        deleteLocalStorage(currentID);
    }

    totalPrice(dataStorage);
}


const totalPrice = (dataStorage) => {
    const total = document.querySelector('.your_bag_total');
    let sum = 0;

    filteredByDataStorage.filter(({id, price}) => sum = sum + price * dataStorage[id]);
    sum = Number(sum.toFixed(2));
    total.innerHTML = `${sum}`;
}

export {decodeBasketId, basket, quantityProducts, totalPrice};
