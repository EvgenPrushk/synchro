// принимает дувумя входными параметрами element и callback 
// element - тот самый дом элемент(тэг) над которомы мы хоти произволдить отслеживание мышки
// callback - это функция, которая вызывается, каждый раз, когда положение мыши обновляется
function setMouseWatcher (element, callback, avtoStart = true) {
	let started = false

	const mouse = {
		x: 0,
		y: 0,
		dx: 0,
		dy: 0,
		pleft: false,
		left: false
	}

	const manager = {
		start () {
			if (!started) {
				element.addEventListener('mousemove', mouseMoveHandler)
				element.addEventListener('mouseup', mouseUpHandler)
				element.addEventListener('mousedown', mouseDownHandler)
			}

			return started = true
		},

		finish () {
			if (started) {
				element.removeEventListener('mousemove', mouseMoveHandler)
				element.removeEventListener('mouseup', mouseUpHandler)
				element.removeEventListener('mousedown', mouseDownHandler)
			}

			return started = false
		},

		toggle () {
			return this[started ? 'finish' : 'start']()
		},

		get active () {
			return started
		},

		set active (value) {
			if (Boolean(value) !== started) {
				this.toggle()
			}

			return value
		},

		get mouse () {
			return getMouseCopy()
		}
	}

	if (avtoStart) {
		manager.start()
	}

	return manager

	function mouseMoveHandler (event) {
		const rect = element.getBoundingClientRect()
		const x = event.clientX - rect.left
		const y = event.clientY - rect.top

		mouse.dx = x - mouse.x
		mouse.dy = y - mouse.y

		mouse.x = x
		mouse.y = y

		mouse.pleft = mouse.left
		mouse.left = event.buttons === 1

		callback(getMouseCopy())
	}

	function mouseUpHandler (event) {
		mouse.pleft = mouse.left
		mouse.left = event.buttons === 1

		callback(getMouseCopy())
	}

	function mouseDownHandler (event) {
		mouse.pleft = mouse.left
		mouse.left = event.buttons === 1

		callback(getMouseCopy())
	}

	function getMouseCopy () {
		return {
			x: mouse.x,
			y: mouse.y,
			dx: mouse.dx,
			dy: mouse.dy,
			left: mouse.left,
			pleft: mouse.pleft
		}
	}
}