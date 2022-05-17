const AGE = 3600 //1hour
const AGE_DELETE = 0;
let arrId = [];
let objId = {};
let idKeyValue;

const value = document.querySelector('input').value;
const blockList = document.querySelector('.body_list');


const getRandomId = () => {
    const x = 'List_' + Math.floor(Math.random() * 99).toString();
    if (!(x in objId)) {
        return x;
    } else getRandomId();
}


const addStartList = () => {
    let decodedCookie = decodeURIComponent(document.cookie);
    let ca = decodedCookie.split(';');
    if (decodedCookie.length !== 0) {
        for (let i = 0; i < ca.length; i++) {
            let c = ca[i];
            while (c.charAt(0) === ' ') {
                c = c.substring(1);
            }
            const keyCookie = c.substring(0, c.indexOf('='));
            const valueCookie = c.substring(c.indexOf('=') + 1, c.length);
            addList(keyCookie, valueCookie);
            objId[keyCookie] = valueCookie;
        }
    }
}


document.querySelector('form').addEventListener('click', (ev) => {
    if (ev.target.classList[1] === 'fa-trash') {
        clearList(ev);
    }
    if (ev.target.classList[1] === 'fa-pen-to-square') {
        changeListBefore(ev);
    }
    if (ev.target.classList.value === 'clear_button') {
        clearAllList();
    }
    if (ev.target.classList.value === 'toDoList_button') {
        clickListButton();
    }
})

/*Enter key list*/
document.querySelector('form').addEventListener('keydown', (ev) => {
    if (ev.keyCode === 13) {
        if (ev.target.classList.value === 'toDoList_input') {
            clickListButton();
        } else {
            const currentEl = ev.target;
            changeListAfter(currentEl);
        }
    }
})


const clickListButton = () => {
    idKeyValue = getRandomId();
    const value = document.querySelector('input').value;
    addList(idKeyValue, value);
    objId[idKeyValue] = value;
}


const addList = (idKey, value) => {
    const blockListContent = blockList.innerHTML;
    addCookie(idKey, value);
    blockList.innerHTML = `${blockListContent}<div id="${idKey}" class="list">
                <div class="list_text">
                    <input disabled type="text" value="${value}"/>
                </div>
                <div class="list_icons">
                    <i class="fa-solid fa-pen-to-square"></i>
                    <i class="fa-solid fa-trash"></i>
                </div>
            </div>`;
}


const clearAllList = () => {
    blockList.innerHTML = '';
    deleteAllCookie();
    objId = {};
}
const clearList = (ev) => {
    const currentList = ev.target.parentNode.parentNode;
    const currentId = ev.target.parentNode.parentNode.id;
    currentList.remove();
    deleteCookie(currentId);
}


const changeListBefore = (ev) => {
    const currentList = ev.target.parentNode.parentNode;
    let currentText = currentList.querySelector('input')
    currentText.removeAttribute('disabled');
    currentText.style.backgroundColor = '#fad8d8';
    currentText.focus();

    currentText.onblur = () =>{
        changeListAfter(currentText);
    }
}
const changeListAfter = (currentEl) => {
    const idElem = currentEl.parentNode.parentNode.id;
    currentEl.setAttribute('disabled', 'disabled');
    currentEl.style.backgroundColor = 'transparent';
    objId[idElem] = currentEl.value;
    addCookie(idElem, currentEl.value);
}

const addCookie = (name, value) => {
    const dataCookie = name + '=' + encodeURIComponent(value);
    document.cookie = `${dataCookie}; max-age=${AGE}; path=/`;
}
const deleteCookie = (currentId) => {
    delete objId[currentId];
    const dataCookie = currentId + '=';
    document.cookie = `${dataCookie}; max-age=${AGE_DELETE}; path=/`;
}


const deleteAllCookie = () => {
    for (let key in objId) {
        const dataCookie = key + '=';
        document.cookie = `${dataCookie}; max-age=${AGE_DELETE}; path=/`;
    }
}


addStartList();



