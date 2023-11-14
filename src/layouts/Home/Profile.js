import profileImgPlaceholder from 'assets/profile-placeholder.jpg';
import profileKatakana from 'assets/katakana-profile.svg?url';
import profileImg1 from 'assets/profile-1.jpg';
import Signature from 'assets/signature.png';
import SignaturePlaceholder from 'assets/signaturePlaceholder.png';
import profileImg2 from 'assets/profile-2.jpg';
import { Button } from 'components/Button';
import { DecoderText } from 'components/DecoderText';
import { Divider } from 'components/Divider';
import { Heading } from 'components/Heading';
import { Image } from 'components/Image';
import { Link } from 'components/Link';
import { Section } from 'components/Section';
import { Text } from 'components/Text';
import { Transition } from 'components/Transition';
import { Fragment, useState } from 'react';
import { media } from 'utils/style';
import styles from './Profile.module.css';
import TiltPhaseSix from 'components/Image/tiltPhaseSix';

const options = {
  max: 10,
  perspective: 1000,
  scale: 1.05,
}

const ProfileText = ({ visible, titleId }) => (
  <Fragment>
    <Heading className={styles.title} data-visible={visible} level={3} id={titleId}>
      <DecoderText text="Hi there" start={visible} delay={500} />
    </Heading>

    <Text
      className={styles.description}
      data-visible={visible}
      size="l"
      as="p"
      style={{ color: '#808080' }}
    >
      {"I'm "}
      <Link href="/resume">Chase Roll</Link>
      {`, a grade 12 high school student passionate about learning and improvement. Driven by an insatiable curiosity and inspired by innovators like Elon Musk,`}
      <Link href="">{` I've combined my passions for learning and building`}</Link>
      {`to develop a myriad of projects and launch various entrepreneurial ventures.`}
      <br />
      <br />
      {`In each of these projects,`}
      <Link href="">{` I have aimed not just to build something cool but also to understand the principles behind them.`}</Link>
      {` This duality has been a cardinal theme in my life, introducing me to fields of study I may not have otherwise explored.`}
      <br />
      <br />
      {`As I near the end of my high school years, I'm preparing myself for university.`}
      <Link href="">{` I plan to major in physics and pursue a dual minor in electrical engineering and computer science.`}</Link>
      <br />
      <br />
      {`Aware of life's fleeting nature, `}
      <Link href="">{`I strive to make the most of every second I have on this planet.`}</Link>
      {` My ultimate ambition is to become the best possible version of myself and to spearhead impactful technologies that improve the human condition.`}
    </Text>

    {/* <div className = {styles.signature}>
      <Image
        delay={0}
        placeholder={SignaturePlaceholder}
        srcSet={[Signature]}
        sizes={`(max-width: ${media.mobile}px) 100vw, 480px`}
        alt="Me standing in front of the Torii on Miyajima, an island off the coast of CA in USA"
        style={{ position: "absolute", top: "100", left: "0", right: "0", bottom: "0"}}
      />
    </div> */}
  </Fragment>
);


export const Profile = ({ id, visible, sectionRef }) => {
  const [focused, setFocused] = useState(false);
  const titleId = `${id}-title`;

  return (
    <Section
      className={styles.profile}
      onFocus={() => setFocused(true)}
      onBlur={() => setFocused(false)}
      as="section"
      id={id}
      ref={sectionRef}
      aria-labelledby={titleId}
      tabIndex={-1}
    >
      <Transition in={visible || focused} timeout={0}>
        {visible => (
          <div className={styles.content}>
            <div className={styles.column}>
              <ProfileText visible={visible} titleId={titleId} />
              <div style={{
                display: "flex",
                gap: "30px"
              }}>
                <Button
                  secondary
                  className={styles.button}
                  data-visible={visible}
                  href="/#contact"
                  icon="send"
                >
                  Send me a message
                </Button>
                <Button
                  secondary
                  className={styles.button}
                  data-visible={visible}
                  href="/resume"
                  icon='resume'
                >
                  My Resume
                </Button>
              </div>
            </div>
            <div className={styles.column} style={{ marginTop: "-100px" }}>
              <div className={styles.tag} aria-hidden>
                <Divider
                  notchWidth="64px"
                  notchHeight="8px"
                  collapsed={!visible}
                  collapseDelay={2000}

                />
                <div className={styles.tagText} data-visible={visible}>
                  About Me
                </div>
              </div>
              <div className={styles.image}>
                {/* <Image
                  noPauseButton
                  play={true}
                  reveal
                  delay={100}
                  srcSet={[profileImg1, profileImg1]}
                  placeholder={profileImgPlaceholder}
                  sizes={`(max-width: ${media.mobile}px) 100vw, 480px`}
                  // delay={0}
                  alt=""
                  role="presentation"
                /> */}
                {/* <TiltPhaseSix
                  options={options}
                >
                  <img src={profileImg1} alt="" />
                </TiltPhaseSix> */}
                <Image
                  reveal
                  delay={100}
                  placeholder={profileImgPlaceholder}
                  srcSet={[profileImg1, profileImg1]}
                  sizes={`(max-width: ${media.mobile}px) 100vw, 480px`}
                  alt="Me as a child with my mother"
                  className={styles.imageZoom}
                />
                {/* <Image
                  reveal
                  delay={3500}
                  placeholder={profileImgPlaceholder}
                  srcSet={[profileImg2, profileImg2]}
                  sizes={`(max-width: ${media.mobile}px) 100vw, 480px`}
                  alt="Me standing in front of the UF soccer field with my father"
                  style={{ position: "absolute", top: "0", left: "0", right: "0", bottom: "0"}}
                /> */}
                <svg
                  aria-hidden="true"
                  width="135"
                  height="900"
                  viewBox="0 0 135 900"
                  className={styles.svg}
                  data-visible={visible}
                  style={{
                    position: "absolute",
                    top: "0px"
                  }}
                >
                  <use href={`${profileKatakana}#katakana-profile`} />
                </svg>
              </div>
            </div>
          </div>
        )}
      </Transition>
    </Section>
  );
};
