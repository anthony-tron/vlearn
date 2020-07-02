class SwipeListener {
    constructor(htmlElementToListen) {
        this.preventScrolling = false
        this.listenedElement = htmlElementToListen

        this.listenedElement.addEventListener('touchstart', (e) => this._onTouchStart(e))
        this.listenedElement.addEventListener('touchmove', (e) => this._onTouchMove(e))
        this.listenedElement.addEventListener('touchend', (e) => this._onTouchEnd(e))
    }

    _extractTouchPoint(event) {
        return { x: event.changedTouches[0].pageX, y: event.changedTouches[0].pageY }
    }

    _distanceBetween(p1, p2) {
        return {
            x: p1.x - p2.x,
            y: p1.y - p2.y,
            raw: Math.sqrt(((p1.x - p2.x) ** 2) + ((p1.y - p2.y) ** 2)),
        }
    }

    _onTouchStart(event) {
        this.originPoint = this._extractTouchPoint(event)
        this.handleTouchStart(this.originPoint)
    }

    _onTouchMove(event) {
        if (this.preventScrolling && event.cancelable)
            event.preventDefault()

        this.lastTouchPoint = this._extractTouchPoint(event)
        this.handleTouchMove(
            this.originPoint,
            this.lastTouchPoint,
            this._distanceBetween(this.originPoint, this.lastTouchPoint)
        )
    }

    _onTouchEnd(event) {
        this.lastTouchPoint = this._extractTouchPoint(event)
        this.handleTouchEnd(
            this.originPoint,
            this.lastTouchPoint,
            this._distanceBetween(this.originPoint, this.lastTouchPoint)
        )
    }

    handleTouchStart(originPoint) {
    }

    handleTouchMove(originPoint, lastTouchPoint, distance) {
    }

    handleTouchEnd(originPoint, lastTouchPoint, distance) {
    }
}