import { renderItem} from "./renderContent.js";
import { clearList} from "../index.js";

const blockList = document.querySelector('main');
const selectElementInput = document.querySelector('.search_element');
const selectElementPrice = document.querySelector('.price_filter');
const startPriceItem = 0;
let filterValue = document.querySelector('.filter_value');
let expectPriceItem = null;
let all = 'all';
let searchProductFilter = '';
let searchCompanyFilter = all;
let maxPriceItem = startPriceItem;
let oldSearchCompanyFilter;


const getListProducts = () =>
    fetch(`json/comfy.json`)
        .then((resp) => {
            return resp.json();
        })
        .then((data) => data);
const products = getListProducts();


const applyFilters = (searchCompanyFilter, searchProductFilter, searchPriceFilter) => products.then(list => {
        const filteredByCompany = searchCompanyFilter !== all ? list.filter(({company}) => company.toLowerCase() === searchCompanyFilter) : list;
        const filteredByProduct = searchProductFilter ? filteredByCompany.filter(({name}) =>
            name.toLowerCase().slice(0, searchProductFilter.length).includes(searchProductFilter.toLowerCase())) : filteredByCompany;
        const filteredByPrice = searchPriceFilter !== null ? filteredByProduct.filter(({price}) => price <= searchPriceFilter) : filteredByProduct;
        clearList(blockList);
        renderItem(filteredByPrice);

        if (oldSearchCompanyFilter !== searchCompanyFilter) {
            maxPrice(filteredByCompany);
        }
        oldSearchCompanyFilter = searchCompanyFilter;
    }
);


/*let expectPriceItem = null;*/
const maxPrice = (list) => {
    maxPriceItem = startPriceItem;
    list.filter(({price}) => {
        maxPriceItem < price ? maxPriceItem = price : price;
    });
    selectElementPrice.max = maxPriceItem;
    selectElementPrice.value = maxPriceItem;
    filterValue.innerHTML = maxPriceItem;
    expectPriceItem = null;
}


selectElementInput.value = searchProductFilter;
!!blockList && applyFilters(searchCompanyFilter, searchProductFilter, expectPriceItem);


selectElementInput.addEventListener('input', (event) => {
        searchProductFilter = event.target.value;
        applyFilters(searchCompanyFilter, searchProductFilter, expectPriceItem);
    }
)


const searchCompany = (elFilter) => {
    searchCompanyFilter = elFilter.textContent.toLowerCase();
    changeFilterColor(elFilter);
    expectPriceItem = null;
    applyFilters(searchCompanyFilter, searchProductFilter, expectPriceItem);
}


selectElementPrice.addEventListener('input', (ev) => {
    filterValue.innerHTML = ev.target.value;
    expectPriceItem = ev.target.value;
    applyFilters(searchCompanyFilter, searchProductFilter, expectPriceItem);
})


const changeFilterColor = (currentElement) => {
    const filterList = document.querySelectorAll('.filter_item');
    filterList.forEach((item) => {
        item.classList.remove('filter_item_current');
    })
    currentElement.classList.add('filter_item_current');
}


export {applyFilters, searchProductFilter, searchCompanyFilter, all, blockList,products,searchCompany};
