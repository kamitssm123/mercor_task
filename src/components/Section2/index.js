import { useCallback, useEffect, useState, useRef } from 'react';
import './styles.css';
import image1 from '../../assets/images/1.png';
import image2 from '../../assets/images/2.png';
import image3 from '../../assets/images/3.png';
import { ReactComponent as Star } from '../../assets/images/star.svg';

const Section2 = () => {

  const ref = useRef(null);
  const [progress, setProgress] = useState(0);
  const [opacity, setOpacity] = useState([1, 0, 0]);

  const setHeight = useCallback(() => {
    if(ref.current) {
      document.getElementById('section2-wrapper').style.height = `${5*ref.current.clientHeight}px`;
      document.getElementById('section2-container').style.height = `${5*ref.current.clientHeight}px`;
    }
  }, [ref]);

  useEffect(() => {
    window.addEventListener('resize', setHeight);
    setHeight();
    return () => window.removeEventListener('resize', setHeight);
  }, [setHeight]);

  useEffect(() => {

    const updateProgress = (fraction) => {
      if(fraction < 0) fraction = 0;
      if(fraction > 1) fraction = 1;
      document.getElementById("progress-indicator").style.height = `${fraction*100}%`;
      const elements = document.getElementsByClassName("box");
      if(fraction <= 1/3) {
        elements[0].style.opacity = 1;
        elements[1].style.opacity = 0;
        elements[2].style.opacity = 0;
        setOpacity([1, 0, 0]);
      } else if(fraction <= 2/3) {
        elements[0].style.opacity = 0;
        elements[1].style.opacity = 1;
        elements[2].style.opacity = 0;
        setOpacity([0, 1, 0]);
      } else {
        elements[0].style.opacity = 0;
        elements[1].style.opacity = 0;
        elements[2].style.opacity = 1;
        setOpacity([0, 0, 1]);
      }
      setProgress(fraction);
    }

    const scrollHandler = () => {
      const scrollTop = document.scrollingElement.scrollTop - document.getElementById("section2-wrapper").scrollHeight + 400;
      const maxScrollTop = 4*ref.current.clientHeight;
      const scrollFraction = scrollTop / maxScrollTop;
      requestAnimationFrame(() => updateProgress(scrollFraction))
    }

    window.addEventListener('scroll', scrollHandler);

    return () => window.removeEventListener('scroll', scrollHandler);
  }, []);

  return (
    <div className="container" id="section2-container">
      <div id="section2-wrapper">
        <div className="section2-container" ref={ref}>
          <div className="elem">
            <div className="workflow-container">
              <Star />
              <div className="workflow">Workflow</div>
            </div>
            <div className="section2-heading">
              Create at the speed of thought.
            </div>
            <div className="section2-subheading">
              Focus on your getting your thoughts out and crafting the best message while Chronicle does the heavy lifting for you
            </div>
          </div>
          <div className="elem right-elem">
            <div className="box" style={{translate: opacity[0] === 0 ? "0 120px" : "none"}}>
              <div className="elem" style={{marginTop: '2.5rem'}}>
                <img src={image1} alt="svg" className="image" />
              </div>
              <div className="box-bottom elem">
                <div className="box-bottom-title">A keyboard<br />first experience.</div>
                <div className="box-bottom-subtitle">Powerful shortcuts and a keyboard-first workflow means you will get to your finish line in no time!</div>
              </div>
            </div>
            <div className="box" style={{translate: opacity[1] === 0 ? "0 120px" : "none"}}>
              <div className="elem" style={{marginTop: '2.5rem'}}>
                <img src={image2} alt="svg" className="image" />
              </div>
              <div className="box-bottom elem">
                <div className="box-bottom-title">Bullets to visuals<br />in a click.</div>
                <div className="box-bottom-subtitle">Transform any block to any other and try different  options without any design hassle</div>
              </div>
            </div>
            <div className="box" style={{translate: opacity[2] === 0 ? "0 120px" : "none"}}>
              <div className="elem">
                <img src={image3} alt="svg" className="image" />
              </div>
              <div className="box-bottom elem">
                <div className="box-bottom-title">A powerful assistant<br />just a click away</div>
                <div className="box-bottom-subtitle">Insert blocks, perform powerful actions and leverage the limitless power of AI - all without leaving your keyboard</div>
              </div>
            </div>
          </div>
          <div className="progress">
            <span className="progress-number">{progress <= 1/3 ? "01" : progress <= 2/3 ? "02" : "03"}</span>
            <div className="progress-container">
              <div className="progress-indicator" id="progress-indicator" />
            </div>
            <span className="progress-number">03</span>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Section2;