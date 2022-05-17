const AGE = 3600 //1hour
let all = 'all';
let colorMode = 'black';
let searchCountryFilter = '';
let searchRegionFilter = all;

const addCookie = (name, value) => {
    const dataCookie = name + '=' + encodeURIComponent(value);
    document.cookie = `${dataCookie}; max-age=${AGE}; path=/`;
}

const readCookie = () => {
    let decodedCookie = decodeURIComponent(document.cookie);
    let arrCookie = decodedCookie.split(';');
    if (decodedCookie.length !== 0) {
        for (let i = 0; i < arrCookie.length; i++) {
            let c = arrCookie[i];
            while (c.charAt(0) === ' ') {
                c = c.substring(1);
            }
            const keyCookie = c.substring(0, c.indexOf('='));
            const valueCookie = c.substring(c.indexOf('=') + 1, c.length);

            keyCookie === 'searchCountryFilter' ? searchCountryFilter = valueCookie :
                keyCookie === 'searchRegionFilter' ? searchRegionFilter = valueCookie :
                    keyCookie === 'colorMode' ? colorMode = valueCookie : false;

        }
    }
}
readCookie();


/*change color mode*/

const classAdd = (element, value) => {
    const arrContainerCountry = document.querySelectorAll(element);
    arrContainerCountry.forEach((item) => {
        item.classList.add(value);
    })
}
const classRemove = (element, value) => {
    const arrContainerCountry = document.querySelectorAll(element);
    arrContainerCountry.forEach((item) => {
        item.classList.remove(value);
    })
}
const styleColor = (element, value) => {
    const arrContainerCountry = document.querySelectorAll(element);
    arrContainerCountry.forEach((item) => {
        item.style.backgroundColor = value;
    })
}


document.querySelector('.dark_mode_button').addEventListener('click', () => {
    triggerColorMode();
})

const triggerColorMode = () => {
    document.querySelector('select').style.backgroundImage = `url(img/${colorMode}.svg)`;
    const textStyle = document.querySelectorAll('p, select, form, .search_input');
    textStyle.forEach((item) => {
        item.style.color = colorMode;
    })

    if (colorMode === 'white') {
        addCookie('colorMode', colorMode);
        whiteMode();
        colorMode = 'black';
    } else {
        addCookie('colorMode', colorMode);
        colorMode = 'white';
        blackMode();
    }
}

const whiteMode = () => {
    classAdd(`.search_input, select`, `${colorMode}Shadow`);
    classAdd(`.container_country`, `containerWhiteShadow`);
    classAdd(`input`, `${colorMode}Placeholder`);
    styleColor(`.body_countries`, `#4d545e`);
    styleColor(`body`, `#393939`);
    styleColor(`input, select, .container_country`, `#494949`);
};
const blackMode = () => {
    classRemove(`input`, `${colorMode}Placeholder`);
    classRemove(`.search_input, select`, `${colorMode}Shadow`);
    classRemove(`.container_country`, `containerWhiteShadow`);
    styleColor(`.body_countries`, `#bed2ea`);
    styleColor(`body, input, select, .container_country`, `${colorMode}`);
};


triggerColorMode()

/*TODO*/
const getListTown = () =>
    fetch(`https://restcountries.com/v2/${all}`)
        .then((resp) => {
            return resp.json();
        })
        .then((data) => data);


const itemHtml = ({name, flag, population, region, capital}) => `<div class="container_country">
        <div class="flag"><img src="${flag}" alt="${name}" class="img_flag"></div>
        <div class="name_country_block">
            <p class="name_country">${name}</p>
        </div>
        <p class="population_country"><span class="bold_country_text">Population:</span> ${population}</p>
        <p class="region_country"><span class="bold_country_text">Region:</span> ${region}</p>
        <p class="capital_country"><span class="bold_country_text">Capital:</span> ${capital}</p>
    </div>`;

const renderItem = (list) => list.map((country) => {
    console.log(list)
    console.log(country)
    const nextItem = document.createElement('div')
    nextItem.innerHTML = itemHtml(country)
    blockList.append(nextItem);
})

const blockList = document.querySelector('.container_lists');
const countries = getListTown();

countries.then(list => renderItem(list));


const clearList = () => {
    const blockListContent = blockList.innerHTML;
    blockList.innerHTML = ``;
}

/*TODO*/

const applyFilters = (searchRegionFilter, searchCountryFilter) => countries.then(list => {
        const filteredByRegion = searchRegionFilter !== all ? list.filter(({region}) => region === searchRegionFilter) : list;
        const filteredByCountry = searchCountryFilter ? filteredByRegion.filter(({name}) =>
            name.toLowerCase().slice(0, searchCountryFilter.length).includes(searchCountryFilter.toLowerCase())) : filteredByRegion;
        clearList();
        renderItem(filteredByCountry);
    }
);


const selectElementRegion = document.querySelector('.filter_region');
const selectElementInput = document.querySelector('input');

selectElementRegion.value = searchRegionFilter;
selectElementInput.value = searchCountryFilter;
applyFilters(searchRegionFilter, searchCountryFilter);


selectElementRegion.addEventListener('change', (event) => {
        searchRegionFilter = event.target.value;
        applyFilters(searchRegionFilter, searchCountryFilter);
        addCookie('searchRegionFilter', searchRegionFilter);
    }
);

selectElementInput.addEventListener('input', (event) => {
        searchCountryFilter = event.target.value;
        applyFilters(searchRegionFilter, searchCountryFilter);
        addCookie('searchCountryFilter', searchCountryFilter);
    }
)



