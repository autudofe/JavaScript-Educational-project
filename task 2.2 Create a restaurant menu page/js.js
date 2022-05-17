
/*clean menu*/
let clearMenu = () => {
    const allContainers = document.querySelectorAll('.container');
    allContainers.forEach(key => key.remove());
    /*for (let key of allContainers){
        key.remove();
    }*/
}


/*add menu*/
let menu = (...typeMenu) => {
    let arr = typeMenu.reduce((acc, value) => [...acc, ...value], []);

    clearMenu();

    /*додаєм нове меню*/
    for (let key of arr) {
        const mainElement = document.querySelector('main');
        const mainElementContent = mainElement.innerHTML;
        mainElement.innerHTML = `${mainElementContent} 
        <div class="container">
        <div class="picture" style="background-image: url('img/${key.picture}')">        
        </div>
        <div class="head_container">
            <p class="name">${key.name}</p>
            <p class="price">$${key.price}</p>
        </div>
        <hr class="line_container">
        <p class="text">${key.text}</p>
    </div>`;
    }
}

/*document.getElementById('button_block').onclick = ev => {
    switch (ev.target.id) {
        case 'all': {
            menu(breakfast, lunch, shakes, dinner);
            break;
        }
        case 'breakfast': {
            menu(breakfast);
            break;
        }
        case 'lunch': {
            menu(lunch);
            break;
        }
        case 'shakes': {
            menu(shakes);
            break;
        }
        case 'dinner': {
            menu(dinner);
            break;
        }
    }
};*/

menu(breakfast, lunch, shakes, dinner);
document.getElementById('all').onclick = () => {
    menu(breakfast, lunch, shakes, dinner);
};
document.getElementById('breakfast').onclick = () => {
    menu(breakfast);
};
document.getElementById('lunch').onclick = () => {
    menu(lunch);
};
document.getElementById('shakes').onclick = () => {
    menu(shakes);
};
document.getElementById('dinner').onclick = () => {
    menu(dinner);
};






