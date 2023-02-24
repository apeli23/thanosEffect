import Head from 'next/head'
import React, { useState, useRef } from 'react';
import Image from 'next/image'
import { Inter } from '@next/font/google'
import Layout from '@/components/Layout';
import html2canvas from "html2canvas";


const inter = Inter({ subsets: ['latin'] })

var Chance = require('chance');
export default function Home() {
  const [showEffect, setShowEffect] = useState(false);
  const [animationStarted, setAnimationStarted] = useState(false);
  const containerRef = useRef(null);
  const imageRef = useRef(null);

  let cnv, context, imageData, pixelArray, temporaryContext;
  var imageDataArray = [];
  var canvasCount = 35;
  var chance = new Chance();

  const handleSnap = () => {
    html2canvas(imageRef.current).then((canvas) => {
      context = canvas.getContext('2d');
      imageData = context.getImageData(0, 0, canvas.width, canvas.height);
      pixelArray = imageData.data;

      createBlankImageData(imageData);

      //put pixel info to imageDataArray (Weighted Distributed)
      for (let i = 0; i < pixelArray.length; i += 4) {
        //find the highest probability canvas the pixel should be in
        let p = Math.floor((i / pixelArray.length) * canvasCount);
        let a = imageDataArray[weightedRandomDistrib(p)];
        a[i] = pixelArray[i];
        a[i + 1] = pixelArray[i + 1];
        a[i + 2] = pixelArray[i + 2];
        a[i + 3] = pixelArray[i + 3];
      }

      for (let i = 0; i < canvasCount; i++) {
        let c = newCanvasFromImageData(imageDataArray[i], canvas.width, canvas.height);
        c.classList.add('list')
        container.appendChild(c)
      }

      //clear all children exept canvas
    });
    const container = containerRef.current;
    // create canvas for each imageData and append to target element
    
  };

  const newCanvasFromImageData = (imageDataArray, w, h) => {
    var canvas = document.createElement('canvas');
    canvas.width = w;
    canvas.height = h;
    temporaryContext = canvas.getContext('2d');
    temporaryContext.putImageData(new ImageData(imageDataArray, w, h), 0, 0);

    console.log('canvas :>> ', canvas);
    return canvas
  }

  const weightedRandomDistrib = (peak) => {
    var prob = [], seq = [];
    for (let i = 0; i < canvasCount; i++) {
      prob.push(Math.pow(canvasCount - Math.abs(peak - i), 3));
      seq.push(i);
    }
    return chance.weighted(seq, prob);
  }

  const createBlankImageData = (imageData) => {
    for (let i = 0; i < canvasCount; i++) {
      let arr = new Uint8ClampedArray(imageData.data);
      for (let j = 0; j < arr.length; j++) {
        arr[j] = 0;
      }
      imageDataArray.push(arr);
    }
  }



  return (
    <Layout className="bg-black w-full">
      <button className='text-blue-900' onClick={handleSnap}>Snap</button>

      <div className="flex flex-col justify-center items-center" >
        <div ref={containerRef} style={{ border: '2px solid blue' }}>
          <Image ref={imageRef} width={400} height={50} src="/images/model.png" className={animationStarted ? "hidden" : ""} alt="thanos" />
        </div>
      </div>
    </Layout>
  )
}
