
let swipeListener = new SwipeListener(_vocHelper)
let preventSwiping = false
const SWIPE_OFFSET = 40 // minimum x distance to trigger animation (in px)
let currentOffSet // SWIPE_OFFSET | -SWIPE_OFFSET

window.addEventListener('scroll', () => preventSwiping = true)

swipeListener.handleTouchStart = ((originPoint) => {
    _vocHelper.style.transition = ''
})

swipeListener.handleTouchMove = (originPoint, lastPoint, distance) => {

    if (preventSwiping) return

    if (!swipeListener.preventScrolling && Math.abs(distance.x) > SWIPE_OFFSET) {
        swipeListener.preventScrolling = true
        currentOffSet = distance.x > 0 ? SWIPE_OFFSET : -SWIPE_OFFSET
    }

    if (swipeListener.preventScrolling) {
        _vocHelper.style.transform = `translateX(${-(distance.x) + currentOffSet}px)`
    } else {
        _vocHelper.style.transform = 'translateX(0)'
    }
}

swipeListener.handleTouchEnd = (originPoint, lastPoint, distance) => {

    if (preventSwiping) {
        preventSwiping = false
        return
    }

    _vocHelper.style.transition = 'transform 200ms'

    // Swiping right
    if (distance.x < -200) {
        _vocHelper.style.transform = `translateX(100vw)` // go right

        wait(200).then(() => {
            //_vocHelper.style.display = 'hidden'
            _vocHelper.style.transition = ''
            _vocHelper.style.transform = `translateX(-100vw)` // go left

            wait(30).then(() => {
                _vocHelper.style.transition = 'transform 200ms'
                _vocHelper.style.transform = 'translateX(0)' // get back to normal

                onNextAction()
            })
        })
    }
    else if (distance.x > 200) {
        _vocHelper.style.transform = `translateX(-100vw)`

        wait(200).then(() => {
            //_vocHelper.style.display = 'hidden'
            _vocHelper.style.transition = ''
            _vocHelper.style.transform = `translateX(100vw)` // go left

            wait(30).then(() => {
                _vocHelper.style.transition = 'transform 200ms'
                _vocHelper.style.transform = 'translateX(0)' // get back to normal

                onPreviousAction()
            })
        })
    } else {
        _vocHelper.style.transform = 'translateX(0)'
    }

    swipeListener.preventScrolling = false
}


function wait(ms) {
    return new Promise((resolve) => {
        setTimeout(() => resolve(), ms)
    })
}