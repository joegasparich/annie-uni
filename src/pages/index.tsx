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
          <p>The ‘90s feminist punk movement ’Riot Grrrl’ caused a wave of empowering mixed media posters and zines which tackled taboo topics such as abortion, patriarchy, sexual assault, and domestic abuse.</p>
          <p>The impact our relationship with our bodies has on us is critical.<br />
          We live in an age where we are constantly besieged with images of what ‘body perfection’ should be.</p>
          <p>Social media, TV, and advertising are the culprit for curating the idealistic physical form, it’s important to give people a chance to contemplate different perspectives using multi-media art as the catalyst for conversation.</p>
          <p>Research suggests that 86% of all women are dissatisfied with their bodies and want to lose weight. Both adult and adolescent women regard size as a definitive element of their identity.</p>
          <p>There is a difference between the persona carried with oneself versus the internalised insecurities that rule over everyday life. This project sheds light on a vulnerable personal experience; people rarely speak up regarding the hardships of learning to love themselves. </p>
          <p>In a way, it seems almost shameful in the modern age to admit you're not perfect. I wanted to show my relationship with body dysmorphia in the most accurate way possible by creating a long, online navigable art piece of two overlaying images; one being the side of myself that I show to others, and the other being my underlying silent struggle with body image.</p>
          <p>This project aims at helping others begin that journey of body positivity by opening their mind to the reality that perception of self is not necessarily aligned with the perception of others.</p>
          <p>You can navigate through the website exhibition using a scroll bar, and interact with the design itself by hovering over the art piece to reveal the underlying image, the inner self and the insecurities society has bestowed upon us.</p>
          <p>People need to know that they’re not alone, the inward battle many face with their self-image can feel so isolating, and this project serves as a reminder that self-love begins with yourself.</p>
          <p>Although many strive for body positivity in their communities and peers, it can so often feel fraudulent when perceiving our own bodies. It’s normal. It’s what we’ve been conditioned to feel, and it’s something that has to be unlearned with time.</p>
          <p>It's important to feel recognised and understood; whilst also bringing light to the difference between the perception of self, versus how others may view you.</p>
        </div>
      </div>
    </div>
  )
}

export default IndexPage
