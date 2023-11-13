import notFoundPoster from 'assets/notfound.jpg';
import notFoundVideo from 'assets/notfound.mp4';
import { Button } from 'components/Button';
import { DecoderText } from 'components/DecoderText';
import { Heading } from 'components/Heading';
import { Meta } from 'components/Meta';
import { Text } from 'components/Text';
import { Transition } from 'components/Transition';
import { Fragment, useEffect } from 'react';
import styles from './404.module.css';
import { CustomCursor } from 'components/CustomCursor';
import { CustomCursorCore } from 'components/CustomCursorCore';

export function Page404() {
  
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

  return (
    <>
    <CustomCursor />
    <CustomCursorCore />
    <section className={styles.page}>
      <Meta
        title="404 Not Found"
        description="404 page not found. This page doesn't exist"
      />
      <Transition in>
        {visible => (
          <Fragment>
            <div className={styles.details}>
              <div className={styles.text}>
                <Heading
                  className={styles.title}
                  data-visible={visible}
                  level={0}
                  weight="bold"
                >
                  404
                </Heading>
                <Heading
                  aria-hidden
                  className={styles.subheading}
                  data-visible={visible}
                  as="h2"
                  level={3}
                >
                  <DecoderText text="Error: Redacted" start={visible} delay={300} />
                </Heading>
                <Text className={styles.description} data-visible={visible} as="p">
                  This page could not be found. It either doesn’t exist or was deleted. Or
                  perhaps you don’t exist.
                </Text>
                <Button
                  secondary
                  iconHoverShift
                  className={styles.button}
                  data-visible={visible}
                  href="/"
                  icon="chevronRight"
                >
                  Back to homepage
                </Button>
              </div>
            </div>

            <div className={styles.videoContainer} data-visible={visible}>
              <video
                autoPlay
                muted
                loop
                playsInline
                className={styles.video}
                data-visible={visible}
                poster={notFoundPoster.src}
              >
                <source src={notFoundVideo} type="video/mp4" />
              </video>
              <a
                className={styles.credit}
                data-visible={visible}
                href="https://www.imdb.com/title/tt0113568/"
                target="_blank"
                rel="noopener noreferrer"
              >
                Animation from Ghost in the Shell (1995)
              </a>
            </div>
          </Fragment>
        )}
      </Transition>
    </section>
    </>
  );
}
