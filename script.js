const WIDTH = 500;
const HEIGHT = 500;
const R = 6;
const N = 5;

const CENTER_POINT = {
    x: WIDTH / 2,
    y: HEIGHT / 2,
};

const appElement = document.querySelector('#app');
const basicCanvas = document.querySelector('#basic');
const viwerCanvas = document.querySelector('#viwer');
const colorElement = document.querySelector('#color');
// не используем стрелочную функцию, чтобы не потерять контекст
colorElement.addEventListener('change', function () {
    color = this.value;
});

let mouse = {
    x: 0,
    y: 0
};
let pmouse = {
    x: 0,
    y: 0
};
let color = 'black';

setMouseWatcher(appElement, newMouse => {
    // запоминаем предыдущее состояние мыши
    pmouse = mouse;
    // обновляем тукущее состояние мыши
    mouse = newMouse;

    // т.к. setMouseWatcher вызывается чаще, чем tick мы переносим отрисовку сюда
    if (mouse.left) {
        const points = getSymmetry(mouse, CENTER_POINT, N);

        if (!pmouse.left) {
            for (const point of points) {
                drawCirlce(viwerCanvas, point.x, point.y, R, color);
            }  
            // drawCirlce(basicCanvas, mouse.x, mouse.y, R, color);
            // drawCirlce(basicCanvas, smouse.x, smouse.y, R, color);

        } else {
            const ppoints = getSymmetry(pmouse, CENTER_POINT, N)
            for (let i = 0; i < N; i++) {
                const element = array[i];
                
            }
            drawLine(basicCanvas, pmouse.x, pmouse.y, mouse.x, mouse.y, 2 * R, color);
            drawLine(basicCanvas, spmouse.x, spmouse.y, smouse.x, smouse.y, 2 * R, color);
        }
    }
});

setCanvasSize(basicCanvas, WIDTH, HEIGHT);
setCanvasSize(viwerCanvas, WIDTH, HEIGHT);

drawCirlce(basicCanvas, CENTER_POINT.x, CENTER_POINT.y, R, 'red');


// tick(timestamp => {console.log(timestamp);
//     clearCanvas(basicCanvas);

//     const x = mouse.x + 100 * Math.cos(timestamp / 500);
//     const y = mouse.y - 100 * Math.sin(timestamp / 500);
//     drawCirlce(basicCanvas, mouse.x, mouse.y, R, 'red');
//     drawCirlce(basicCanvas, x, y, R, 'black');

// })

tick(timestamp => {
    clearCanvas(viwerCanvas);
  
    const points = getSymmetry(mouse, CENTER_POINT, 3);

    for (const point of points) {
        drawCirlce(viwerCanvas, point.x, point.y, R, color);
    }  
});