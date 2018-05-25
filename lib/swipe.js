var initTouchControls = function () {
    // Setup swipe controls for mobile devices.
    document.ontouchmove = function(event) {
        event.preventDefault();
    }
    window.touchLog = {};
    window.addEventListener("touchstart", touchStart, false);
    window.addEventListener("touchend", touchEnd, false);
}

window.addEventListener('load', initTouchControls)

var touchStart = function (evt) {
     // Fires when the user touches the screen.
     window.touchLog.startX = evt.changedTouches[0].screenX;
     window.touchLog.startY = evt.changedTouches[0].screenY;
}

var touchEnd = function (evt) {
      // Fires when the user picks their finger up.
      window.touchLog.endX = evt.changedTouches[0].screenX;
      window.touchLog.endY = evt.changedTouches[0].screenY;
      if (
          window.touchLog.endY < window.touchLog.startY - 40 &&
          Math.abs(window.touchLog.endX - window.touchLog.startX) < 200
      ) {
          window.swipeUp();
      } else if (
          window.touchLog.endY > window.touchLog.startY + 40 &&
          Math.abs(window.touchLog.endX - window.touchLog.startX) < 200
      ) {
          window.swipeDown();
      }
}
