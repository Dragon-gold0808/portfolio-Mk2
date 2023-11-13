// import fs from 'fs';
// import path from 'path';
// import matter from 'gray-matter';
// import readingTime from 'reading-time';
// import { POSTS_PATH, postFilePaths } from 'utils/mdx';
// import { formatTimecode } from 'utils/timecode';
import Barcode from 'assets/barcode.svg';
import { Button } from 'components/Button';
import { DecoderText } from 'components/DecoderText';
import { Divider } from 'components/Divider';
import { Footer } from 'components/Footer';
import { Heading } from 'components/Heading';
import { Image } from 'components/Image';
import { Meta } from 'components/Meta';
import { Section } from 'components/Section';
import { Text } from 'components/Text';
import { useReducedMotion } from 'framer-motion';
import { useWindowSize } from 'hooks';
import RouterLink from 'next/link';
import { useState, useEffect } from 'react';
import { formatDate } from 'utils/date';
import { classes, cssProps } from 'utils/style';
import styles from './Articles.module.css';
import { Input } from 'components/Input';
import { tokens } from 'components/ThemeProvider/theme';
import { useFormInput } from 'hooks';

import { msToNum, numToMs } from 'utils/style';
import { CustomCursor } from 'components/CustomCursor';
import { CustomCursorCore } from 'components/CustomCursorCore';
import { Icon } from 'components/Icon';
// import { getStaticProps } from './index.page';

const ArticleType = ["Engineering", "Electronics", "Computer Science", "Chemical"];

const ArticlesPost = ({
  slug,
  title,
  abstract,
  date,
  featured,
  banner,
  timecode,
  index,
}) => {
  const [hovered, setHovered] = useState(false);
  const [dateTime, setDateTime] = useState(null);
  const reduceMotion = useReducedMotion();

  useEffect(() => {
    setDateTime(formatDate(date));
  }, [date, dateTime]);
  
  const handleMouseEnter = () => {
    setHovered(true);
  };

  const handleMouseLeave = () => {
    setHovered(false);
  };

  // useEffect(() => {
  //   console.log(featured);
  // }, [!!featured])

  return (
    <article
      className={styles.post}
      data-featured={!!featured}
      style={index !== undefined ? cssProps({ delay: index * 100 + 200 }) : undefined}
    >
      {featured && (
        <Text className={styles.postLabel} size="s">
          Featured
        </Text>
      )}
      {featured && !!banner && (
        <div className={styles.postImage}>
          <Image
            noPauseButton
            play={!reduceMotion ? hovered : undefined}
            src={{ src: banner }}
            placeholder={{ src: `${banner.split('.')[0]}-placeholder.jpg` }}
            alt=""
            role="presentation"
            
          />
        </div>
      )}
      <RouterLink href={`/articles/${slug}`} scroll={false}>
        <a
          className={styles.postLink}
          onMouseEnter={handleMouseEnter}
          onMouseLeave={handleMouseLeave}
        >
          <div className={styles.postDetails}>
            <div aria-hidden className={styles.postDate}>
              <Divider notchWidth="64px" notchHeight="8px" />
              {dateTime}
            </div>
            <Heading as="h2" level={featured ? 2 : 4}>
              {title}
            </Heading>
            <Text size={featured ? 'l' : 's'} as="p">
              {abstract}
            </Text>
            <div className={styles.postFooter}>
              <Button secondary iconHoverShift icon="chevronRight" as="div">
                Read article
              </Button>
              <Text className={styles.timecode} size="s">
                {timecode}
              </Text>
            </div>
          </div>
        </a>
      </RouterLink>
      {featured && (
        <Text aria-hidden className={styles.postTag} size="s">
          477
        </Text>
      )}
    </article>
  );
};



const SkeletonPost = ({ index }) => {
  return (
    <article
      aria-hidden="true"
      className={classes(styles.post, styles.skeleton)}
      style={index !== undefined ? cssProps({ delay: index * 100 + 200 }) : undefined}
    >
      <div className={styles.postLink}>
        <div className={styles.postDetails}>
          <div aria-hidden className={styles.postDate}>
            <Divider notchWidth="64px" notchHeight="8px" />
            Coming soon...
          </div>
          <Heading
            className={styles.skeletonBone}
            as="h2"
            level={4}
            style={{ height: 24, width: '70%' }}
          />
          <Text
            className={styles.skeletonBone}
            size="s"
            as="p"
            style={{ height: 90, width: '100%' }}
          />
          <div className={styles.postFooter}>
            <Button secondary iconHoverShift icon="chevronRight" as="div">
              Read more
            </Button>
            <Text className={styles.timecode} size="s">
              00:00:00:00
            </Text>
          </div>
        </div>
      </div>
    </article>
  );
};

function getDelay(delayMs, offset = numToMs(0), multiplier = 1) {
  const numDelay = msToNum(delayMs) * multiplier;
  return cssProps({ delay: numToMs((msToNum(offset) + numDelay).toFixed(0)) });
}

const initDelay = tokens.base.durationS;

export const Articles = ({posts, featured}) => {

  const { width } = useWindowSize();
  const singleColumnWidth = 1190;
  const isSingleColumn = width <= singleColumnWidth;
  const searchText = useFormInput('');
  const [menuShow, setMenuShow] = useState(false);
  
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

  const postsHeader = (
    <header className={styles.header}>
      <Heading className={styles.heading} level={5} as="h1">
        <DecoderText text="All articles" />
      </Heading>
      <div className = {styles.inputGroup}>
        <Input
          className={styles.btn}
          style={getDelay(tokens.base.durationXS, initDelay)}
          autoComplete="off"
          label="Search"
          maxLength={512}
          {...searchText}
        />
        <Button
            secondary
            className={styles.button}
            data-visible={true}
            style = {{
              paddingLeft: "0",
              paddingRight: "0",
              textAlign: "center"
            }}
            onClick = {(e) => {
              // e.preventDefault();
              setMenuShow(!menuShow);
            }}
          >
            <Icon icon="filter" style = {{
              width: "30px",
              height: "30px",
              margin: "0",
              marginLeft: "10px",
              padding: ""
            }}/>
          </Button>
          <div className = {styles.modal} style = {{
            position: "absolute",
            right: 10,
            top: menuShow ? "70px" : "60px",
            opacity: menuShow ? 1 : 0,
            zIndex: menuShow ? 1000 : -1000,
            display:"flex",
            flexDirection: "column",
            justifyContent: "flex-start",
            alignItems: "flex-start",
            height: "auto",
            transition: "all 0.2s ease-in"
          }}
          onMouseLeave={(e) => {
            // e.preventDefault();
            setMenuShow(false);
          }}
          >
            {ArticleType.map((item, idx) => {
              return (
                <div key = {idx} style={{
                  position: "relative",
                  paddingTop: "10px",
                  paddingBottom: "10px"
                }}>
                  <Button secondary as="button" style = {{
                    
                  }}>
                    {item}
                  </Button>
                </div>
              );
            })}
          </div>
        </div>
    </header>
  );

  const checkFunction = (item) => {
    return (String(item.title).toLowerCase().includes(searchText.value) || String(item.abstract).toLowerCase().includes(searchText.value));
  };
  
  const postList = (
    <div className={styles.list}>
      {!isSingleColumn && postsHeader}
      {posts.filter(checkFunction).map(({ slug, ...post }, index) => (
        <ArticlesPost key={slug} slug={slug} index={index} {...post} />
      ))}
      {searchText.value == '' && Array(6)
        .fill()
        .map((skeleton, index) => (
          <SkeletonPost key={index} />
        ))}
    </div>
  );

  const featuredPost = <ArticlesPost {...featured} />;

  return (
    <>
      <CustomCursor />
      <CustomCursorCore />
      <article className={styles.articles}>
        <Meta
          title="Articles"
          description="A collection of technical design and development articles. May contain incoherent ramblings."
        />
        <Section className={styles.content}>
          {!isSingleColumn && (
            <div className={styles.grid}>
              {postList}
              {featuredPost}
            </div>
          )}
          {isSingleColumn && (
            <div className={styles.grid}>
              {postsHeader}
              {featuredPost}
              {postList}
            </div>
          )}
        </Section>
        <Footer />
      </article>
    </>
  );
};
