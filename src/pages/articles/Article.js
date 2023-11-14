// import fs from 'fs';
// import path from 'path';
// import matter from 'gray-matter';
// import readingTime from 'reading-time';
// import { POSTS_PATH, postFilePaths } from 'utils/mdx';
// import { formatTimecode } from 'utils/timecode';
import { Button } from 'components/Button';
import { DecoderText } from 'components/DecoderText';
import { Divider } from 'components/Divider';
import { Heading } from 'components/Heading';
import { Image } from 'components/Image';
import { Section } from 'components/Section';
import { Text } from 'components/Text';
import { useReducedMotion } from 'framer-motion';
import { useWindowSize } from 'hooks';
import RouterLink from 'next/link';
import { useState, useEffect } from 'react';
import { formatDate } from 'utils/date';
import { classes, cssProps } from 'utils/style';
import styles from './Article.module.css';
import { Input } from 'components/Input';
import { tokens } from 'components/ThemeProvider/theme';
import { useFormInput } from 'hooks';
import { Transition } from 'components/Transition';
import { msToNum, numToMs } from 'utils/style';
import { Icon } from 'components/Icon';
// import { getStaticProps } from './index.page';


const ArticleType = ["Engineering", "Electronics", "Computer Science"];


const ArticlesPost = ({
  slug,
  title,
  abstract,
  date,
  featured,
  banner,
  timecode,
  index,
  visible
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


  // console.log("ddd = ",!!featured && visible);

  return (

    <article
      className={styles.post}
      data-featured={!!featured && visible}
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
            delay={0}
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

            <Text as="p" style={{ fontSize: featured ? 55 : 27 }}>
              {title.toUpperCase()}
            </Text>

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



export const Article = ({ posts, featured, id, sectionRef, visible }) => {
  // console.log(featured);
  const { width } = useWindowSize();
  const singleColumnWidth = 1190;
  const isSingleColumn = width <= singleColumnWidth;
  const searchText = useFormInput('');
  const [menuShow, setMenuShow] = useState(false);
  const [value, setValue] = useState(0);
  const [enter, setEnter] = useState(false);
  const [leave, setLeave] = useState(false);
  const [full, setFull] = useState(false);
  const [filterType, setFilterType] = useState("");

  useEffect(() => {
    if (value >= 1) setFull(true);
  }, [value]);

  const postsHeader = (
    <header className={styles.header}>
      <Heading className={styles.heading} level={3} as="h1">
        <DecoderText text="Atricles" start={visible} />
      </Heading>
      <div className={styles.inputGroup}>
        <Input
          className={styles.btn}
          style={getDelay(tokens.base.durationXS, initDelay)}
          autoComplete="off"
          label="Search Articles"
          maxLength={512}
          {...searchText}
        />
        <Button
          secondary
          className={styles.button}
          data-visible={true}
          style={{
            paddingLeft: "0",
            paddingRight: "0",
            textAlign: "center"
          }}
          onClick={(e) => {
            // e.preventDefault();
            setMenuShow(!menuShow);
          }}

        >
          <Icon icon="filter" style={{
            width: "30px",
            height: "30px",
            margin: "0",
            marginLeft: "10px",
            padding: "0"
          }} />
        </Button>
        <div className={styles.modal} style={{
          position: "absolute",
          right: 10,
          top: menuShow ? "70px" : "60px",
          opacity: menuShow ? 1 : 0,
          zIndex: menuShow ? "var(--zIndex3)" : -100,
          display: "flex",
          flexDirection: "column",
          justifyContent: "flex-start",
          alignItems: "flex-start",
          height: "auto",
          transition: "all 0.2s ease-in"
        }}
          onMouseEnter={(e) => {
            // e.preventDefault();
            setEnter(true);
            setLeave(false);
          }}
          onMouseLeave={(e) => {
            // e.preventDefault();
            setLeave(true);
            setEnter(false);
          }}

        >
          {ArticleType.map((item, idx) => {
            return (
              <div key={idx} style={{
                position: "relative",
                paddingTop: "10px",
                paddingBottom: "10px"
              }}>
                <Button secondary as="button" onClick={(e) => {
                  setFilterType(item === filterType ? "" : item);
                }} style={{
                  backgroundColor: item === filterType ? "rgb(var(--rgbText) / 0.3)" : "transparent"
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

    return (String(item.title).toLowerCase().includes(searchText.value.toLowerCase()) || String(item.abstract).toLowerCase().includes(searchText.value.toLowerCase()));
  };

  const postList = (
    <div>
      <div className={styles.list}>
        {!isSingleColumn && postsHeader}
        {posts.filter(checkFunction).filter((item) => String(item.type).includes(filterType)).map(({ slug, ...post }, index) => (
          <ArticlesPost key={slug} slug={slug} index={index} {...post} />
        ))}
        {searchText.value == '' && Array(value)
          .fill()
          .map((skeleton, index) => (
            <SkeletonPost key={index} />
          ))}
      </div>
      <Button iconHoverShift iconEnd="arrowDown" style={{ marginTop: "20px", transition: "all 0.4s ease", opacity: full ? "0" : "1" }} onClick={(e) => {
        // e.preventDefault();
        setValue(value + 1);
      }}>
        LOAD MORE
      </Button>
    </div>
  );

  const featuredPost = <ArticlesPost {...featured} visible={visible} />;

  return (
    <section className={styles.articles} id={id} ref={sectionRef} onClick={(e) => {
      // e.preventDefault();
      if (!((enter === true) && (leave === false)) && (menuShow === true)) setMenuShow(false);
    }}>
      {/* <Meta
        title="Articles"
        description="A collection of technical design and development articles. May contain incoherent ramblings."
      /> */}
      <Transition in={visible} timeout={0}>
        {
          visible => {
            // console.log(visible);
            return (
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
              </Section>);
          }}
        {/* <Section className={styles.content}>
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
        </Section> */}
      </Transition>

    </section>
  );
};
