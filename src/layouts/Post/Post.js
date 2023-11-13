import ArrowDown from 'assets/arrow-down.svg';
import { Divider } from 'components/Divider';
import { Footer } from 'components/Footer';
import { Heading } from 'components/Heading';
import { Image } from 'components/Image';
import { Meta } from 'components/Meta';
import { Section } from 'components/Section';
import { Text } from 'components/Text';
import { tokens } from 'components/ThemeProvider/theme';
import { Transition } from 'components/Transition';
import { useParallax, useScrollToHash } from 'hooks';
import RouterLink from 'next/link';
import { useRef, useState, useEffect } from 'react';
import { clamp } from 'utils/clamp';
import { formatDate } from 'utils/date';
import { cssProps, msToNum, numToMs } from 'utils/style';
import styles from './Post.module.css';
import { CustomCursor } from 'components/CustomCursor';
import { CustomCursorCore } from 'components/CustomCursorCore';

export const Post = ({ children, title, date, abstract, banner, timecode, ogImage }) => {
  const scrollToHash = useScrollToHash();
  const imageRef = useRef();
  const [dateTime, setDateTime] = useState(null);
  
  useEffect(() => {
    setDateTime(formatDate(date));
  }, [date, dateTime]);

  useEffect(() => {
    
    let isHovering1 = false;
    let isHovering2 = false;
    const LERP_SCALE = 0.15;
    const LERP_SCALE_SLOW = 0.14;  // New: Slower lerp scale

    let currentBorderOpacity = 1;
    let targetBorderOpacity = 1;
    let currentBorderWidth = 1;
    let targetBorderWidth = 1;

    function isDarkMode() {
      let isDark = document.body.getAttribute('data-theme')  === 'light' ? false : true; 
      // console.log(isDark);
      return isDark;
  }

    function updateCursors() {
        const cursor1 = document.querySelector('.custom-cursor');
        const cursor2 = document.querySelector('.custom-cursor-2');
        const darkMode = isDarkMode();

        cursor1.style.backgroundColor = darkMode ? "white" : "black";
        let cursorColor2 = darkMode
            ? `rgba(255, 255, 255, ${currentBorderOpacity})`
            : `rgba(0, 0, 0, ${currentBorderOpacity})`;
        cursor2.style.borderColor = cursorColor2;
    }

    function lerp(a, b, t) {
        return a + (b - a) * t;
    }

    let scale = 1.0;
    let targetScale = 1.0;
    
    let mouseX = 0;
    let mouseY = 0;
    let prevCursorX1 = 0;
    let prevCursorY1 = 0;
    let prevCursorX2 = 0;
    let prevCursorY2 = 0;
    let prevWindowWidth = window.innerWidth;


    function update() {
        if (window.angular) {
            return;
        }

        const cursor1 = document.querySelector('.custom-cursor');
        const cursor2 = document.querySelector('.custom-cursor-2');

        prevCursorX1 = lerp(prevCursorX1, mouseX, LERP_SCALE * 4);
        prevCursorY1 = lerp(prevCursorY1, mouseY, LERP_SCALE * 4);

        prevCursorX2 = lerp(prevCursorX2, mouseX, LERP_SCALE * 3);
        prevCursorY2 = lerp(prevCursorY2, mouseY, LERP_SCALE * 3);

        const transform1 = `translate3D(${prevCursorX1}px, ${prevCursorY1}px, 0) scale(1.0)`;
        cursor1.style.transform = transform1;

        let scaleLerpScale = isHovering1 && isHovering2 ? LERP_SCALE_SLOW : LERP_SCALE;
        scale = lerp(scale, targetScale, scaleLerpScale);
        currentBorderWidth = lerp(currentBorderWidth, targetBorderWidth, LERP_SCALE);
        currentBorderOpacity = lerp(currentBorderOpacity, targetBorderOpacity, LERP_SCALE);

        const transform2 = `translate3D(${prevCursorX2}px, ${prevCursorY2}px, 0) scale(${scale})`;
        cursor2.style.transform = transform2;
        cursor2.style.borderWidth = `${currentBorderWidth}px`;

        updateCursors();

        requestAnimationFrame(update);
    }

    

    window.addEventListener('mousemove', (e) => {
        const cursor2 = document.querySelector('.custom-cursor-2');
        const cursor1 = document.querySelector('.custom-cursor');

        cursor1.style.opacity = 1;
        cursor2.style.opacity = 1;
        const widthRatio = window.innerWidth / prevWindowWidth;
        mouseX = e.clientX - 16 * widthRatio;
        mouseY = e.clientY - 16;
        prevWindowWidth = window.innerWidth;
    });

    function setupCursors() {
        // const cursor1 = document.querySelector('.custom-cursor');
        const button = document.querySelectorAll('a');
        const link = document.querySelectorAll('button');

        button.forEach(function (button) {
            button.addEventListener("mouseenter", function () {
                isHovering2 = true;
                targetScale = 1.5;
                targetBorderWidth = 15.5;
                targetBorderOpacity = 0.5;
            });

            button.addEventListener("mouseleave", function () {
                isHovering2 = false;
                targetScale = 1.0;
                targetBorderWidth = 1;
                targetBorderOpacity = 1;
            });
        });

        link.forEach(function (link) {
            link.addEventListener("mouseenter", function () {
                isHovering2 = true;
                targetScale = 1.5;
                targetBorderWidth = 15.5;
                targetBorderOpacity = 0.5;
            });

            link.addEventListener("mouseleave", function () {
                isHovering2 = false;
                targetScale = 1.0;
                targetBorderWidth = 1;
                targetBorderOpacity = 1;
            });
        });
    }

    setupCursors();
    updateCursors();

    // document.querySelector('.mode-switcher').addEventListener('click', function () {
    //     setTimeout(updateCursors, 100);
    // });

    // const prefersDarkScheme = window.matchMedia("(prefers-color-scheme: dark)");
    // prefersDarkScheme.addEventListener("change", function () {
    //     updateCursors();
    // });

    update();
  },[]);

  useParallax(0.004, value => {
    if (!imageRef.current) return;
    imageRef.current.style.setProperty('--blurOpacity', clamp(value, 0, 1));
  });

  const handleScrollIndicatorClick = event => {
    event.preventDefault();
    scrollToHash(event.currentTarget.href);
  };

  return (
    <>
    <CustomCursor />
    <CustomCursorCore />
    <article className={styles.post}>
      <Meta title={title} prefix="" description={abstract} ogImage={ogImage} />
      <Section>
        {banner && (
          <div className={styles.banner} ref={imageRef}>
            <div className={styles.bannerImage}>
              <Image
                role="presentation"
                src={{ src: banner }}
                placeholder={{ src: `${banner.split('.')[0]}-placeholder.jpg` }}
                alt=""
              />
            </div>
            <div className={styles.bannerImageBlur}>
              <Image
                role="presentation"
                src={{ src: `${banner.split('.')[0]}-placeholder.jpg` }}
                placeholder={{ src: `${banner.split('.')[0]}-placeholder.jpg` }}
                alt=""
              />
            </div>
          </div>
        )}
        <header className={styles.header}>
          <div className={styles.headerText}>
            <Transition in timeout={msToNum(tokens.base.durationM)}>
              {visible => (
                <div className={styles.date}>
                  <Divider notchWidth="64px" notchHeight="8px" collapsed={!visible} />
                  <Text className={styles.dateText} data-visible={visible}>
                    {dateTime}
                  </Text>
                </div>
              )}
            </Transition>
            <Heading level={2} as="h1" className={styles.title} aria-label={title}>
              {title.split(' ').map((word, index) => (
                <span className={styles.titleWordWrapper} key={`${word}-${index}`}>
                  <span
                    className={styles.titleWord}
                    style={cssProps({ delay: numToMs(index * 100 + 100) })}
                    index={index}
                  >
                    {word}
                    {index !== title.split(' ').length - 1 ? ' ' : ''}
                  </span>
                </span>
              ))}
            </Heading>
            <div className={styles.details}>
              <RouterLink href="#postContent">
                <a
                  className={styles.arrow}
                  aria-label="Scroll to post content"
                  onClick={handleScrollIndicatorClick}
                >
                  <ArrowDown aria-hidden />
                </a>
              </RouterLink>
              <div className={styles.timecode}>{timecode}</div>
            </div>
          </div>
        </header>
      </Section>
      <Section className={styles.wrapper} id="postContent" tabIndex={-1}>
        <Text as="div" size="l" className={styles.content}>
          {children}
        </Text>
      </Section>
      <Footer />
    </article>
    </>
  );
};
