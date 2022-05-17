let city_Name = 'Київ';
let currentSelected = 'Київ, Ukraine';
let currentSelectedShort = currentSelected;
let lat = 50.433334;
let lon = 30.516666;
const key = '5e36e9324463a5461643508c7020b435';
const lang = 'en';
const units = 'metric';
const limit = 5;
const countryCode = {
    UA: 'Ukraine',
    RU: 'Russia'
};


/*get long country name from short*/
const checkCode = (code) => {
    return typeof countryCode[code] === 'undefined' ? code : countryCode[code];
};


/* check "city_Name" and get coordinates */
const getListTown = (city_Name) => {
    fetch(`http://api.openweathermap.org/geo/1.0/direct?q=${city_Name}&limit=${limit}&appid=${key}`)
        .then((resp) => {
            return resp.json();
        })
        .then((data) => {
            if (data.length === 0) {
                currentSelected = `\"${city_Name}\" is not found`
                console.log('not found');
            } else {
                let currentCountry = checkCode(data[0]['country']);
                currentSelected = data[0]['name'] + ', ' + data[0]['local_names']['uk'] + ', ' + currentCountry;
                currentSelectedShort = data[0]['name'] + ', ' + currentCountry;
                lat = data[0]['lat'];
                lon = data[0]['lon'];
                getList();
            }
        })
}


/*get weather data about "city_Name"*/
const getList = () => {
    fetch(`http://api.openweathermap.org/data/2.5/onecall?lat=${lat}&lon=${lon}&appid=${key}&units=${units}&lang=${lang}`)
        .then((resp) => {
            return resp.json();
        })
        .then((data) => {
            headWeatherBlock(data);
            bodyWeatherBlock(data);
        })
        .catch(() => {
                //catch any errors
            }
        )
}
getListTown(city_Name);
getList();


/* add info to head weather block*/
const headWeatherBlock = (data) => {
    let head_description_info = data.current['weather'][0]['description'];
    head_description_info = head_description_info[0].toUpperCase() + head_description_info.slice(1);
    document.querySelector('.selected_info').textContent = currentSelected;
    document.querySelector('.main_temp').innerHTML = Math.round(data.current.temp) + '&deg;C';
    document.querySelector('.head_description_block').innerHTML =
        `<p class="head_description">${head_description_info}</p>
                <p>${currentSelectedShort}</p>`
    const iconName = data.current['weather'][0]['icon'];
    document.querySelector('.head_img').innerHTML = `<img src="http://openweathermap.org/img/wn/${iconName}@2x.png" alt="" >`;
    document.querySelector('.feels_like_temp').innerHTML = 'Feels like ' + Math.round(data.current.feels_like) + '&deg;C';
}


/* add info to body weather block*/
const bodyWeatherBlock = (data) => {
    const bodyWeather = document.querySelector('.widget_body');
    bodyWeather.innerHTML = '';
    let i = 0;
    while (i < 5) {
        const temp_max = Math.round(data.daily[i]['temp']['max']) + '&deg;C';
        const temp_min = Math.round(data.daily[i]['temp']['min']) + '&deg;C';
        const icon_img = data.daily[i]['weather'][0]['icon'];
        const description_info = data.daily[i]['weather'][0]['description'];
        const dayOfWeek = getWeekDay(i);
        const bodyWeatherContent = bodyWeather.innerHTML;
        bodyWeather.innerHTML =
            `${bodyWeatherContent}<div class="widget_body_block">
            <div class="week_day">
                <p class="">${dayOfWeek}</p>
            </div>
            <div class="body_img">
                <img src="http://openweathermap.org/img/wn/${icon_img}@2x.png" alt="">
            </div>
            <div class="body_description">
                <p class="">${description_info}</p>
            </div>
            <div class="main_temp_max_min">
                <p class="">${temp_max}</p>
                <p>${temp_min}</p>
            </div>
        </div>`
        i++;
    }
}


/*get short day of week*/
const getWeekDay = (nextDay) => {
    const date = new Date();
    const days = [' SUN', 'MON', 'TUE', 'WED', 'THU', 'FRI', 'SAT'];
    if (date.getDay() + nextDay > 6) {
        return days[date.getDay() + nextDay - 7];
    } else
        return days[date.getDay() + nextDay];
}

/*action after press enter*/
const input = document.querySelector('input');
input.addEventListener('keydown', (e) => {
    if (e.keyCode === 13) {
        city_Name = input.value;
        getListTown(city_Name);
    }
});

/*clear input*/
document.querySelector('.icon-close').onclick = () => input.value = '';



