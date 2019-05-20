const main = document.querySelector('#main');

const SIZE = {
    width: window.innerWidth,
    height: window.innerHeight
}

const STYLE_FULL_SIZE = {
    bottom: 0,
    left: 0,
    margin: 'auto',
    position: 'absolute',
    right: 0,
    top: 0
}

const TIME_ROTATE = 240;

const TOTAL_STARS = 1000;

const setStyle = (element, style) => {
    for (item in style) {
        element.style[item] = style[item];
    }
}

const getRandom = (min, max) => {
    min = Math.ceil(min);
    max = Math.floor(max);

    return Math.floor(Math.random() * (max - min)) + min;
}

const getRandonPosition = () => ({
    left: `${getRandom(0, SIZE.width * 2)}px`,
    top: `${getRandom(0, SIZE.height * 2)}px`
})

const createStar = (size = 1, pulse = 1) => {
    const star = document.createElement('div');
    const {left, top} = getRandonPosition();
    
    const style = {
        animation: `pulse ${pulse}s linear infinite`,
        backgroundColor: 'white',
        borderRadius: `${size}px`,
        height: `${size}px`,
        left,
        opacity: `0.${size}`,
        position: 'absolute',
        top,
        width: `${size}px`
    }

    setStyle(star, style)

    return star;
}

const createConstellation = () => {
    const constellation = document.createElement('div');

    for (let i = 0; i < TOTAL_STARS; i++) {
        const size = getRandom(1, 4);
        const pulse = getRandom(1, 6);
        const star = createStar(size, pulse);

        constellation.appendChild(star)
    }

    const style = {
        animation: `rotation ${TIME_ROTATE}s linear infinite`,
        height: `${SIZE.height * 2}px`,
        left: `-${SIZE.width / 2}px`,
        position: 'fixed',
        top: `-${SIZE.height / 2}px`,
        transform: 'rotate(0deg)',
        transformOrigin: 'center',
        width: `${SIZE.width * 2}px`
    }

    setStyle(constellation, style)

    return constellation;
}

const createBackground = () => {
    const background = document.createElement('div');

    const style = {
        ...STYLE_FULL_SIZE,
        height: `${SIZE.height}px`,
        width: `${SIZE.width}px`,
        background: 'linear-gradient(#090708 50%, #121735)'
    }

    setStyle(background, style);

    return background;
}

const createClipart = () => {
    const clipart = document.createElement('img');
    clipart.src = './src/img/clipart.png';

    const style = {
        ...STYLE_FULL_SIZE,
        top: 'initial',
        maxWidth: '50%'
    }

    setStyle(clipart, style)

    return clipart;
}

function render() {
    main.append(
        //background
        createBackground(),
        //constellation
        createConstellation(),
        //clipart
        createClipart()
    );
}

window.addEventListener('DOMContentLoaded', () => render())