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

const getRandonPosition = (width, height) => ({
    left: `${getRandom(0, width * 2)}px`,
    top: `${getRandom(0, height * 2)}px`
})

const createStar = (size = 1, pulse = 1, backgroundColor, width, height) => {
    const star = document.createElement('div');
    const {left, top} = getRandonPosition(width, height);

    const style = {
        animation: `pulse ${pulse}s linear infinite`,
        backgroundColor,
        borderRadius: `${size}px`,
        height: `${size}px`,
        opacity: `0.${size}`,
        position: 'absolute',
        width: `${size}px`,
        inset:`${top} 0 0 ${left}`,
    }

    setStyle(star, style)

    return star;
}

const createConstellation = (stars, time, color, width, height) => {
    const constellation = document.createElement('div');

    for (let i = 0; i < stars; i++) {
        const size = getRandom(1, 4);
        const pulse = getRandom(1, 6);
        const star = createStar(size, pulse, color, width, height);

        constellation.appendChild(star)
    }

    const style = {
        animation: `rotation ${time}s linear infinite`,
        height: `${height * 2}px`,
        position: 'absolute',
        transform: 'rotate(0deg)',
        transformOrigin: 'center',
        width: `${width * 2}px`,
        inset: `-${height / 2}px 0 0 -${width / 2}px`
    }

    setStyle(constellation, style)

    return constellation;
}

const createBackground = (background, width, height) => {
    const backgroundNode = document.createElement('div');

    const style = {
        margin: 'auto',
        position: 'absolute',
        inset: '0 0 0 0',
        height: `${height}px`,
        width: `${width}px`,
        background
    }

    setStyle(backgroundNode, style);

    return backgroundNode;
}

const createClipart = () => {
    const clipart = document.createElement('img');
    clipart.src = './src/img/clipart.png';

    const style = {
        margin: 'auto',
        position: 'absolute',
        maxWidth: '50%',
        left: 0,
        bottom: 0,
        right: 0
    }

    setStyle(clipart, style)

    return clipart;
}

const createMoon = backgroundColor => {
    let moon =document.createElement('div');

    const styleMoon = {
        width: '100%',
        height: '100%',
        backgroundColor,
        border: '0 none',
        borderRadius: '50%'
    }

    setStyle(moon, styleMoon);

    const box = document.createElement('div');
    box.append(moon);

    const styleBox = {
        margin: 'auto',
        position: 'absolute',
        borderRadius: '50%',
        boxShadow: `0px 0px 100px 20px ${backgroundColor}`,
        height: '100px',
        inset: 'calc(70% - 100px) calc(70% - 100px) 0',
        width: '100px',
    }

    setStyle(box, styleBox);

    return box;
}

const getTheme = style => {
    let theme = {
        backgroundColor: 'linear-gradient(#090708 50%, #2A3990)',
        starColor: 'white',
        moonColor: 'white'
    };

    if (style === 'light') {
        theme = {
            ...theme,
            backgroundColor: 'linear-gradient(yellow 50%, red)',
            starColor: 'black',
            moonColor: 'yellow'
        }
    }

    return theme;
}

function StarrySky(element, attrs) {
    const node = document.querySelector(element);

    const {
        stars = 200,
        time = 200,
        theme = 'dark',
        width = node.clientWidth,
        height = node.clientHeight
    } = attrs;

    const {backgroundColor, starColor, moonColor} = getTheme(theme);

    node.append(
        //background
        createBackground(backgroundColor, width, height),

        //constellation
        createConstellation(stars, time, starColor, width, height),

        //moon
        createMoon(moonColor),

        //clipart
        createClipart()
    )
}