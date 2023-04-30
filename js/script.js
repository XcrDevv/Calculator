const images = ['source/background-d.jpg', 'source/background-w.jpg'];
const boxIcon = ['bx-sun', 'bx-moon']
const preloadedImages = [];

const illButton = document.getElementById('ill-mode');
const main = document.body.querySelector("main");

const root = document.documentElement;

for (let i = 0; i < images.length; i++) {
    const img = new Image();
    img.onload = () => {
        preloadedImages.push(img);
        if (preloadedImages.length === images.length) {
            const illButton = document.getElementById('ill-mode');
            const main = document.body.querySelector('main');
            let selector = parseInt(illButton.getAttribute('mode'));
            selector = selector === 0 ? 1 : 0;
            main.style.backgroundImage = `url(${images[selector]})`;
            illButton.setAttribute('mode', selector.toString());
        }
    };
    img.src = images[i];
}

illButton.addEventListener('click', ()=> {
    mode = illButton.getAttribute('mode');
    selector = (mode==0) ? 1 : (mode==1) ? 0 : 0;
    main.style.backgroundImage = `url(${images[selector]})`;
    setTheme(selector);
    illButton.classList.remove(boxIcon[mode]);
    illButton.setAttribute('mode', String(selector));
    illButton.classList.add(boxIcon[selector]);
});

function setTheme(t) {
    (t == 1) ? root.style.setProperty('--buttonColor', "#e0e0e0cc") : root.style.setProperty('--buttonColor', "#1f1f1fcc"); 
    (t == 1) ? root.style.setProperty('--buttonColor_h', "#c0c0c0cc") : root.style.setProperty('--buttonColor_h', "#3f3f3fcc");
    (t == 1) ? root.style.setProperty('--buttonColor_o', "#fff8") : root.style.setProperty('--buttonColor_0', "#0008");
    (t == 1) ? root.style.setProperty('--padsBg', "#fcfcfccc") : root.style.setProperty('--padsBg', "#010101cc");
    (t == 1) ? root.style.setProperty('--middleColor', "#cbcbcbcc") : root.style.setProperty('--middleColor', "#141414cc");
    (t == 1) ? root.style.setProperty('--bspColor_h', "#333") : root.style.setProperty('--bspColor_h', "#ccc");
    (t == 1) ? root.style.setProperty('--fontColor', "#000") : root.style.setProperty('--fontColor', "#fff");
    (t == 1) ? root.style.setProperty('--fontColor_l', "#333") : root.style.setProperty('--fontColor_l', "#ddd");
}