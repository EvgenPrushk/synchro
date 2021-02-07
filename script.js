const WIDTH = 500;
const HEIGHT = 500;
const R = 6;

const CENTER_POINT = {
    x: WIDTH / 2,
    y: HEIGHT / 2,
}

const appElement = document.querySelector('#app');
const  basicCanvas = document.querySelector('#basic');
const  viwerCanvas = document.querySelector('#viwer');
const  colorElement = document.querySelector('#color');
// не используем стрелочную функцию, чтобы не потерять контекст
colorElement.addEventListener('change', function () {
    color = this.value;
})

let mouse = {x: 0, y: 0};
let pmouse = {x: 0, y: 0};
let color = 'black';




setMouseWatcher(appElement, newMouse => {
   // запоминаем предыдущее состояние мыши
    pmouse = mouse;
    // обновляем тукущее состояние мыши
    mouse = newMouse;

    // т.к. setMouseWatcher вызывается чаще, чем tick мы переносим отрисовку сюда
    if (mouse.left) {
        const smouse = getSymmetry(mouse, CENTER_POINT);

        if (!pmouse.left) {   

            drawCirlce(basicCanvas, mouse.x, mouse.y, R, color);
            drawCirlce(basicCanvas, smouse.x, smouse.y, R, color);
             
        }

        else { 
            const spmouse = getSymmetry(pmouse, CENTER_POINT)
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

tick( timestamp => {
    clearCanvas(viwerCanvas);
    // рисуем новое положение мышки
    drawCirlce(viwerCanvas, mouse.x, mouse.y, R, color);
    // рисуем новое положение точки симетричной
    const smouse = getSymmetry(mouse, CENTER_POINT);
    drawCirlce(viwerCanvas, smouse.x, smouse.y, R, color);

})


