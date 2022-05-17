/*#*/
get_random_color_pris = () => {
    let r = Math.floor(Math.random() * (256));
    let g = Math.floor(Math.random() * (256));
    let b = Math.floor(Math.random() * (256));
    return '#' + r.toString(16) + g.toString(16) + b.toString(16);
}

/*rgb*/
get_random_color_rgb = () => {
    let r = () => {
        return Math.floor(Math.random() * 256)
    };
    let arr = [r(), r(), r()]
    return arr.join(',');
}

/*text colors*/
const colors_arr = ['red', 'orange', 'yellow', 'green', 'blue', 'purple'];
get_random_color_text = (arr) => arr[Math.floor(Math.random() * arr.length)]

get_random_color = () => {
    let arr = [];
    arr.push(get_random_color_rgb(), get_random_color_pris(), get_random_color_text(colors_arr));
    return arr[Math.floor(Math.random() * arr.length)];
}

document.getElementById('button').onclick = (event) => {
    const container = document.body;
    const display = document.querySelector('.text_color');
    container.style.backgroundColor = display.textContent = get_random_color();
}

