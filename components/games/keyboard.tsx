import * as PIXI from 'pixi.js';

export let app: PIXI.Application<HTMLCanvasElement>

export function initApp(element) {
  app = new PIXI.Application<HTMLCanvasElement>({ background: '#1099bb', resizeTo: element })
  setUpKeyboard()
  setUpSprites()
  return app
}

export function start() {
  // Listen for animate update
  app.ticker.add((delta) => gameLoop(delta));
}

export function gameLoop(delta) {
  updateSpeed()
  bunny.x = bunny.x + xSpeed * delta
  bunny.y = bunny.y + ySpeed * delta
  speedText.text = `Speed: (${xSpeed},${ySpeed})`
  locationText.text = `(${Math.floor(bunny.x)},${Math.floor(bunny.y)})`
}

export function reset() {
  bunny.x = app.screen.width / 2;
  bunny.y = app.screen.height / 2;
  xSpeed = 0
  ySpeed = 0
}

function updateSpeed() {
  const speedChangeFactor = 1
  if (left.isDown) {
    xSpeed -= speedChangeFactor
  } else if (right.isDown) {
    xSpeed += speedChangeFactor
  } else if (xSpeed != 0) {
    xSpeed = xSpeed > 0 ? xSpeed - 1 : xSpeed + 1
  }

  if (down.isDown) {
    ySpeed += speedChangeFactor
  } else if (up.isDown) {
    ySpeed -= speedChangeFactor
  } else if (ySpeed != 0 ) {
    ySpeed = ySpeed > 0 ? ySpeed - 1 : ySpeed + 1
  }
}

let left, up, right, down;

function setUpKeyboard() {
  // Define the keyboard code variables
   left = keyboard(37)
    up = keyboard(38)
    right = keyboard(39)
    down = keyboard(40)
  
  left.press = () => {};
  left.release = () => {};
  right.press = () => {};
  right.release = () => {};
  up.press = () => {};
  up.release = () => {};
  down.press = () => {};
  down.release = () => {};
}

let bunny
let xSpeed = 0
let ySpeed = 0
let speedText
let locationText

function setUpSprites() {
  bunny = new PIXI.Container()
  speedText = new PIXI.Text()
  locationText = new PIXI.Text()
  // create a new Sprite from an image path
  app.stage.addChild(bunny);
  
  const bunnySprite = PIXI.Sprite.from('https://pixijs.com/assets/bunny.png');
  // center the sprite's anchor point
  bunnySprite.anchor.set(0.5);
  // start the sprite at the center of the screen
  bunny.x = app.screen.width / 2;
  bunny.y = app.screen.height / 2;
  bunny.addChild(bunnySprite)

  locationText.x = -50
  locationText.y = -bunny.height - 10
  bunny.addChild(locationText)
  
  app.stage.addChild(speedText)
}







interface LooseObject {
  [key: string]: any
}

// The keyboard helper
function keyboard(keyCode) {
    const key: LooseObject = {};
    key.code = keyCode;
    key.isDown = false;
    key.isUp = true;
    key.press = undefined;
    key.release = undefined;

    // Key is pressed
    key.downHandler = (event) => {
        if (event.keyCode === key.code) {
            if (key.isUp && key.press) {
                key.press();
            }
            key.isDown = true;
            key.isUp = false;
            event.preventDefault();
        }
    };

    // Key is released
    key.upHandler = (event) => {
        if (event.keyCode === key.code) {
            if (key.isDown && key.release) {
                key.release();
            }
            key.isDown = false;
            key.isUp = true;
            event.preventDefault();
        }
    };

    // Attach keydown and keyup event listeners
    window.addEventListener("keydown", key.downHandler.bind(key), false);
    window.addEventListener("keyup", key.upHandler.bind(key), false);
    return key;
}