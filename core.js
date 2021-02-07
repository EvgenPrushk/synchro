function clearCanvas(canvas) {
    // более быстрый способ очистки canvas
    canvas.width = canvas.width;
}

function setCanvasSize(canvas, width, height) {
    canvas.width = width;
    canvas.height = height;
}

function drawCirlce(canvas, x, y, r, color) {
    const context = canvas.getContext('2d');
    context.beginPath();

    context.fillStyle = color;
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
function tick(handler) {
    timer(0);
    // пример рекрсивной функции
    function timer(timestamp) {
        handler(timestamp)
        // регистрирует вызов функции с частотой обновления экрана ( примерно 60 раз в секунду) и 1 раз вызывает ее
        requestAnimationFrame(timer);
        // позволяет вызывать функцию с определенной периодичностью
        // setInterval(handler, 0)
    }
}
// расчет координат точки
function getCenterSymmetry(pointA, pointB) {
    const dx = pointB.x - pointA.x;
    const dy = pointB.y - pointA.y;

    return {
        x: pointA.x + 2 * dx,
        y: pointA.y + 2 * dy,
    }
}


function getSymmetry(blackPoint, greenPoint, n) {
    // квадрат разности по координате х + квадрат расзностей по координате y. Берет квадратный корень из этой суммы
    const distance = ((blackPoint.x - greenPoint.x) ** 2 + (blackPoint.y - greenPoint.y) ** 2) ** 0.5;
    // смотри определение угла через atan 2
    const angle = Math.atan2 (blackPoint.y - greenPoint.y, blackPoint.x - greenPoint.x);
    // определяем угол шага
    const step = Math.PI * 2 / n;

    const points = [];
    for (let i = 0; i < n; i++) {
        points.push({
            x: greenPoint.x + distance * Math.cos(angle + step * i),
            y: greenPoint.y + distance * Math.sin(angle + step * i),
        })
    }

    return points;    
}

