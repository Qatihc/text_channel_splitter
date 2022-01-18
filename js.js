const throttleDelay = 50;
const movementFactor = 1/40;
const snap = true;

const throttleFunction = (f, delay) => {
  let canBeCalled = true;
  return (...params) => {
    if (canBeCalled){
      f(...params);
      canBeCalled = false;
      setTimeout(() => canBeCalled = true, delay);
    }
  }
}

window.onload = () => {

  const root = document.documentElement;
  const mainContainer = document.getElementsByClassName('main-container')[0]

  const setChannelOffset = (channel, x, y, unit) => {
    unit = unit || 'px';
    root.style.setProperty('--vertical-' + channel, y + unit);
    root.style.setProperty('--horizontal-' + channel, x + unit);
  }

  const handleMouseMove = (e) => {
    const xCenter = Math.floor(window.innerWidth / 2);
    const yCenter = Math.floor(window.innerHeight / 2);

    let x = (e.clientX - xCenter) * movementFactor;
    let y = (e.clientY - yCenter) * movementFactor;

    /* Snap */
    if (snap) {
      if (Math.abs(x) < 1) x = 0;
      if (Math.abs(y) < 1) y = 0;
    }

    setChannelOffset('r', x - y, y - x);
    setChannelOffset('g', y, x);
    setChannelOffset('b', x, y);

  }

  mainContainer.addEventListener('mousemove', throttleFunction(handleMouseMove, throttleDelay))
}
