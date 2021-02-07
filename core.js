function clearCanvas (canvas) {
    // более быстрый способ очистки canvas
    canvas.width = canvas.width;
}

function setCanvasSize (canvas, width, height) {
    canvas.width = width;
    canvas.height = height;
}

function drawCirlce (canvas, x, y, r, color) {
    const context = canvas.getContext('2d');
    context.beginPath();
    
    context.fillStyle= color;
    context.arc(x, y, r, 0, Math.PI * 2);
    context.fill();       
}

function drawLine(canvas, x1, y1, x2, y2, width, color) {
    const context = canvas.getContext('2d');
    context.beginPath();
    
    context.strokeStyle = color;
    context.lineWidth = width;
    
    context.moveTo(x1, y1);
    context.lineTo(x2, y2);
    context.stroke();       
}

//добиваемся постаянного выполнения функции
function tick (handler) {   
    timer(0);
    // пример рекрсивной функции
    function timer (timestamp) {
        handler(timestamp)
        // регистрирует вызов функции с частотой обновления экрана ( примерно 60 раз в секунду) и 1 раз вызывает ее
        requestAnimationFrame(timer);
    // позволяет вызывать функцию с определенной периодичностью
    // setInterval(handler, 0)
    }
}
// расчет координат точки
function getSymmetry (pointA, pointB) {
    const dx = pointB.x - pointA.x;
    const dy = pointB.y - pointA.y;

    return {
        x: pointA.x + 2 * dx,
        y: pointA.y + 2 * dy,
    }
}
