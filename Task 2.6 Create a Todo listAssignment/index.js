const AGE = 3600 //1hour
const AGE_DELETE = 0;
let arrId = [];
const value = document.querySelector('input').value;
const blockList = document.querySelector('.body_list');


const addStartList = () => {
    let decodedCookie = decodeURIComponent(document.cookie);
    let ca = decodedCookie.split(';');
    for (let i = 0; i < ca.length; i++) {
        let name = i.toString() + "=";
        let c = ca[i];
        while (c.charAt(0) === ' ') {
            c = c.substring(1);
        }
        if (c.indexOf(name) === 0) {
            addList(c.substring(name.length, c.length));
            arrId.push(c.substring(name.length, c.length))
        }
    }
}


document.querySelector('form').addEventListener('click', (ev) => {
    if (ev.target.classList[1] === 'fa-trash') {
        clearList(ev);
    }
    if (ev.target.classList[1] === 'fa-pen-to-square') {
        changeList(ev);
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
            const idElem = currentEl.parentNode.parentNode.id;

            currentEl.setAttribute('disabled', 'disabled');
            currentEl.style.backgroundColor = 'transparent';
            deleteAllCookie();
            arrId[idElem] = currentEl.value;
            addAllCookie();
        }
    }
})



const clickListButton = () => {
    const value = document.querySelector('input').value;
    addList(value);
    arrId.push(value);
}


const addList = (value) => {
    const blockListContent = blockList.innerHTML;
    addCookie(arrId.length, value);
    console.log(arrId.length);
    blockList.innerHTML = `${blockListContent}<div id="${arrId.length}" class="list">
                <div class="list_text">
                    <input disabled type="text" class="" value="${value}"/>
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
    arrId = [];
}
const clearList = (ev) => {
    const currentList = ev.target.parentNode.parentNode;
    const currentId = ev.target.parentNode.parentNode.id;
    currentList.remove();
    deleteCookie(currentId);
    updateIdList(currentId);

}


const changeList = (ev) => {
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
    arrId[idElem] = currentEl.value;
    addCookie(idElem, currentEl.value);
}

const addCookie = (name, value) => {
    const dataCookie = name + '=' + encodeURIComponent(value);
    document.cookie = `${dataCookie}; max-age=${AGE}; path=/`;
}
const deleteCookie = (currentId) => {
    deleteAllCookie();
    arrId.splice(Number(currentId), 1);
    addAllCookie();
}

const addAllCookie = () => {
    for (let i = 0; i < arrId.length; i++) {
        const dataCookie = i + '=' + encodeURIComponent(arrId[i]);
        document.cookie = `${dataCookie}; max-age=${AGE}; path=/`;
    }
}
const deleteAllCookie = () => {
    for (let i = 0; i < arrId.length; i++) {
        const dataCookie = i + '=';
        document.cookie = `${dataCookie}; max-age=${AGE_DELETE}; path=/`;
    }
}

const updateIdList = (currentId) => {
    let currentIdArr = document.querySelectorAll('.list');
    for (let j = currentId; j < currentIdArr.length; j++) {
        currentIdArr[j].id = j.toString();
    }
}

addStartList();



