import React, { MouseEventHandler, useLayoutEffect, useState } from "react";
import { Helmet } from "react-helmet";
import { isMobile } from "react-device-detect";

import { useInView } from 'react-intersection-observer';
import { StaticImage } from "gatsby-plugin-image";

import Slider from "../components/Slider";

import "./index.css";

function useWindowSize() {
  const [size, setSize] = useState([0, 0]);
  useLayoutEffect(() => {
    const updateSize = () => {
      setSize([window.innerWidth, window.innerHeight]);
    }
    window.addEventListener('resize', updateSize);
    updateSize();
    return () => window.removeEventListener('resize', updateSize);
  }, []);
  return size;
}

const IndexPage = () => {
  const [mouseX, setMouseX] = useState(0)
  const [mouseY, setMouseY] = useState(0)
  const [offset, setOffset] = useState(0);
  const [windowWidth, windowHeight] = useWindowSize();
  const aboutRef = React.useRef(null);
  const windowWidthRef = React.useRef(0);
  const windowHeightRef = React.useRef(0);
  windowWidthRef.current = windowWidth;
  windowHeightRef.current = windowHeight;
  const circleSize = windowWidth * 0.2;
  const [inViewRef, inView, entry] = useInView({
    threshold: 0.05,
  });

  const handleMouseMove: MouseEventHandler<HTMLDivElement> = e => {
    const { height, width, top, left } = e.currentTarget.getBoundingClientRect();

    const x = e.clientX - left - circleSize/2;
    const y = e.clientY - top - circleSize/2;

    const xPercent = (x / (width - circleSize)) * 100;
    const yPercent = (y / (height - circleSize)) * 100;

    setMouseX(xPercent);
    setMouseY(yPercent);
  }

  if (isMobile) {
    return (
      <div className="mobile">
        <StaticImage
          src="../images/logo.png"
          alt="logo"
          className="logo"
          width={322}
          height={ 440}
        />
        <p>This site is not suitable for mobile, please come back on a desktop.</p>
      </div>
    );
  }

  return (
    <div className="page">
      <Helmet>
          <meta charSet="utf-8" />
          <title>Reality Check</title>
          {/* <link rel="preconnect" href="https://fonts.googleapis.com" />
          <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin />
          <link href="https://fonts.googleapis.com/css2?family=Montserrat&display=swap" rel="stylesheet" /> */}
      </Helmet>
      <div className="logo" onClick={() => {aboutRef.current?.scrollIntoView({ behavior: "smooth" })}}>
        <StaticImage
          src="../images/logo.png"
          alt="logo"
          width={322}
          height={ 440}
        />
      </div>
      <div className="images-wrapper">
        <div className="images" onMouseMove={handleMouseMove} style={{transform: `translate(-${offset}px, 0)`}}>
          <div className="overlay">
            <StaticImage
              src="../images/original.jpg"
              alt="overlay"
              className="image"
              placeholder="blurred"
              width={6805}
              height={1080}
              quality={100}
            />
          </div>
          <div
            className="underlay"
            style={{
              WebkitMaskSize: `${circleSize}px ${circleSize}px`,
              WebkitMaskPosition: `${mouseX}% ${mouseY}%`,
            }}
          >
            <StaticImage
              src="../images/hover.jpg"
              alt="underlay"
              className="image"
              placeholder="blurred"
              width={6805}
              height={1080}
              quality={100}
            />
          </div>
        </div>
        <div className="border" />
      </div>
      <Slider onChange={value => {
        const imageWidth = windowHeightRef.current  * 0.7 * 6.3;
        const imageContainerWidth = windowWidthRef.current * 0.85;

        setOffset((imageWidth - imageContainerWidth) * value)}
      } />
      <div ref={aboutRef} />
      <div className={`info ${inView ? 'fade-in' : ''}`} ref={inViewRef}>
        <StaticImage
          src="../images/about.png"
          alt="about"
          className="about"
          width={290}
          height={196}
        />
        <div>
          <p>I don’t have that much to say about my own body image, I suppose it’s because I try so hard not to think about it - which is ironic because it truly does, and always has, consumed my life.</p>
          <p>I found it hard to love my body from a very young age. This may have been due to the warped perception I had of myself, or comparison to peers, or the times I received anonymous messages linking to a wikihow of how I could lose fat in my arms.</p>
          <p>I have this incredible ability to shake off any compliments I may have received throughout my life, and yet fixate on the smallest flaws or details of my skin, body and mind. </p>
          <p>I went through a period of 5 or so weeks where I felt like this project was going nowhere. I didn’t know how to empower others, because in reality, I didn’t even know how to empower myself.</p>
          <p>Selfishly I realised I had to pivot this project inwards. I had to be the one I was empowering, I couldn't convince anyone else to love their body when my own losing battle with self love made me feel like a fraud.</p>
          <p>I fell in love with the collage art style because it made so much sense to me. The disjointed imagery felt similar to the way I view myself. Like parts of my body had been stuck on to create a whole but they didn’t really belong, my body didn’t make sense to me, and therefore it couldn’t have made sense to anyone else</p>
          <p>This is my own personal experience with body dysmorphia, a disorder in which you can't stop fixating on one or more flaws in your appearance — a flaw that appears so minor it usually can't even be seen by others.</p>
          <p>It took me a long time to figure out how to cope with the way I view myself. I’ve been in and out of therapy from a very young age, however like many others I’ve met, I was let down by New Zealand’s public mental health system. I realised I had to figure out how to love myself on my own, but I had no idea how. I felt so alone for the longest time, like no one understood what I was going through or how I felt. </p>
          <p>When I was younger, I often felt belittled and invalidated by those I looked up to when I expressed my distaste for the way I looked. I’d often be met with comments like ‘you have nothing to complain about’ or ‘when you’re older you’ll feel differently’ - but if anything, with age it got progressively worse.</p>
          <p>I tried everything I could to be someone else; painting my face with makeup everyday as if it were a mask. I couldn’t even leave to walk up the road to the supermarket at age 13 without putting layers on my face because I was so afraid of what people would think when they looked at me.</p>
          <p>Early on in high school, I developed a compulsive skin picking disorder called dermatillomania; I now know with the help of my current therapist that this is inadvertently a way I delt with my self hatred, by fixating and trying to eradicate flaws that others couldn’t even see; however as expected, the damage I was doing to myself only made my self confidence worsen.</p>
          <p>I even tried chest binders to manipulate the way my body looked, when I was still unhappy I began to develop issues with my eating habits, something very common in people struggling with their self image just like I was.</p>
          <p>The only true solace I found was talking to others just like me, and understanding that the way one views themself often isn’t aligned with the way others may perceive them. That’s where the motivation for this project began.</p>
        </div>
      </div>
    </div>
  )
}

export default IndexPage
