import { useCallback, useEffect, useMemo, useRef } from 'react';
import './styles.css';

const Section1 = () => {
  const text = useMemo(() => "In Chronicle everything is made with Blocks that come with pixel perfect design, interactivity and motion out of the box. Instead of designing from scratch, simply choose the right one from our library of blocks and see the magic unfold.".split(" "), []);
  const frameCount = useMemo(() => text.length + 1, [text]);

  const containerRef = useRef(null);

  useEffect(() => {
    const updateOpacity = (index) => {
      let element;
      for(let i = 1; i <= index; i++) {
        element = document.querySelector(`#text-container :nth-child(${i})`);
        if(element) element.style.opacity = 1;
      }
      for(let i = index + 1; i <= frameCount; i++) {
        element = document.querySelector(`#text-container :nth-child(${i})`);
        if(element) element.style.opacity = 0.2;
      }
    }

    const scrollHandler = () => {
      const scrollTop = document.scrollingElement.scrollTop;
      const maxScrollTop = 4*containerRef.current.clientHeight - 200;
      const scrollFraction = scrollTop / maxScrollTop;
      const frameIndex = Math.min(
        frameCount-1,
        Math.floor(scrollFraction * frameCount)
      );
      requestAnimationFrame(() => updateOpacity(frameIndex))
    }

    window.addEventListener('scroll', scrollHandler);

    return () => window.removeEventListener('scroll', scrollHandler);
  }, [frameCount]);

  const setHeight = useCallback(() => {
    if(containerRef.current) {
      document.getElementById('text-wrapper').style.height = `${5*containerRef.current.clientHeight}px`;
      document.getElementById('section1-container').style.height = `${5*containerRef.current.clientHeight}px`;
    }
  }, [containerRef]);

  useEffect(() => {
    window.addEventListener('resize', setHeight);
    setHeight();
    return () => window.removeEventListener('resize', setHeight);
  }, [setHeight]);

  return (
    <div className="container" id="section1-container">
      <div id="text-wrapper">
        <div className="text-container" id="text-container" ref={containerRef}>
          {
            text.map((val, index) => (
              <span key={index}>{val}</span>
            ))
          }
        </div>
      </div>
    </div>
  );
}

export default Section1;
