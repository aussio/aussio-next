import type { NextPage } from 'next'
import * as PIXI from 'pixi.js';
import Head from 'next/head'
import { useEffect, useState } from 'react';

function rocket(totalDudes) {
  // holder to store the aliens
  const aliens = [];

  for (let i = 0; i < totalDudes; i++)
  {
      // create a new Sprite that uses the image name that we just generated as its source
      const dude = PIXI.Sprite.from('gameImages/sample.png');

      // set the anchor point so the texture is centered on the sprite
      dude.anchor.set(0.5);

      // set a random scale for the dude - no point them all being the same size!
      dude.scale.set(0.4 + Math.random() * 0.3);

      // finally lets set the dude to be at a random position..
      dude.x = Math.random() * global.app.screen.width;
      dude.y = Math.random() * global.app.screen.height;

      dude.tint = Math.random() * 0xFFFFFF;

      // create some extra properties that will control movement :
      // create a random direction in radians. This is a number between 0 and PI*2 which is the equivalent of 0 - 360 degrees
      dude.direction = Math.random() * Math.PI * 2;
      // this number will be used to modify the direction of the dude over time
      dude.turningSpeed = Math.random() - 0.8;
      // create a random speed for the dude between 2 - 4
      dude.speed = 2 + Math.random() * 2;

      // finally we push the dude into the aliens array so it it can be easily accessed later
      aliens.push(dude);
      global.app.stage.addChild(dude);
  }

  // create a bounding box for the little dudes
  const dudeBoundsPadding = 100;
  const dudeBounds = new PIXI.Rectangle(
    -dudeBoundsPadding,
    -dudeBoundsPadding,
    global.app.screen.width + dudeBoundsPadding * 2,
    global.app.screen.height + dudeBoundsPadding * 2
  );

  global.app.ticker.add(() =>
  {
      // iterate through the dudes and update their position
      for (let i = 0; i < aliens.length; i++)
      {
          const dude = aliens[i];

          dude.direction += dude.turningSpeed * 0.01;
          dude.x += Math.sin(dude.direction) * dude.speed;
          dude.y += Math.cos(dude.direction) * dude.speed;
          dude.rotation = -dude.direction - Math.PI / 2;

          // wrap the dudes by testing their bounds...
          if (dude.x < dudeBounds.x)
          {
              dude.x += dudeBounds.width;
          }
          else if (dude.x > dudeBounds.x + dudeBounds.width)
          {
              dude.x -= dudeBounds.width;
          }

          if (dude.y < dudeBounds.y)
          {
              dude.y += dudeBounds.height;
          }
          else if (dude.y > dudeBounds.y + dudeBounds.height)
          {
              dude.y -= dudeBounds.height;
          }
      }
  });
}

const Home: NextPage = () => {

  const [isPixiLoaded, setIsPixiLoaded] = useState(null)
  const [numDudes, setNumDudes] = useState(1)

  useEffect(() => {
    if (!global.app) {
      const element = document.getElementById("firstExample")
      global.app = new PIXI.Application<HTMLCanvasElement>({ resizeTo: element });
      element.appendChild(global.app.view)
    } else {
      // Start from the beginning!
      // Clear the app of all previously added children.
      global.app.stage.removeChildren()
    }
    setIsPixiLoaded(true)
  }, []);

  useEffect(()=> {
    if (isPixiLoaded) {
      rocket(1)
    }
  }, [isPixiLoaded,numDudes])

  return (
    <>
      <Head>
        <title>Some games I've made</title>
        <script src="https://pixijs.download/release/pixi.js" />
        {/* <script src="https://pixijs.download/release/pixi.min.js" /> */}
      </Head>
      <main className="mx-auto max-w-[1960px] p-4 text-white">
        <h1>Games here pls</h1>
        <div className="w-full h-96 border-dashed border-2 border-sky-500" id="firstExample"/>
        <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded" onClick={() => setNumDudes(numDudes+1)}>{`More rockets: ${numDudes}`}</button>
        <button className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded" onClick={() => {setNumDudes(1); global.app.stage.removeChildren()}}>Reset</button>
      </main>
    </>
  )
}

export default Home