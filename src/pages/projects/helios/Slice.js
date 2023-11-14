import sliceAnnotationLarge from 'assets/slice-annotation-large.png';
import sliceAnnotationPlaceholder from 'assets/slice-annotation-placeholder.png';
import sliceAnnotation from 'assets/slice-annotation.png';
import sliceAppLarge from 'assets/slice-app-large.jpg';
import sliceAppPlaceholder from 'assets/slice-app-placeholder.jpg';
import sliceApp from 'assets/slice-app.jpg';
import sliceBackgroundBarLarge from 'assets/slice-background-bar-large.jpg';
import sliceBackgroundBarPlaceholder from 'assets/slice-background-bar-placeholder.jpg';
import sliceBackgroundBar from 'assets/slice-background-bar.jpg';
import sliceBackgroundLarge from 'assets/slice-background-large.jpg';
import sliceBackgroundPlaceholder from 'assets/slice-background-placeholder.jpg';
import sliceBackground from 'assets/slice-background.jpg';
import sliceIrlPlaceholder from 'assets/slice-irl-placeholder.jpg';
import sliceIrl from 'assets/slice-irl.jpg';
import sliceSidebarAnnotationsLarge from 'assets/slice-sidebar-annotations-large.png';
import sliceSidebarAnnotationsPlaceholder from 'assets/slice-sidebar-annotations-placeholder.png';
import sliceSidebarAnnotations from 'assets/slice-sidebar-annotations.png';
import sliceSidebarLayersLarge from 'assets/slice-sidebar-layers-large.png';
import sliceSidebarLayersPlaceholder from 'assets/slice-sidebar-layers-placeholder.png';
import sliceSidebarLayers from 'assets/slice-sidebar-layers.png';
import sliceSlidesLarge from 'assets/slice-slides-large.jpg';
import sliceSlidesPlaceholder from 'assets/slice-slides-placeholder.jpg';
import sliceSlides from 'assets/slice-slides.jpg';
import heliosNext from 'assets/helios-next.jpg'; // Replace with actual path to your image
import heliosNextLarge from 'assets/helios-next-large.jpg'; // Replace with actual path
import { Footer } from 'components/Footer';
import { Image } from 'components/Image';
import { Meta } from 'components/Meta';
import {
  ProjectBackground,
  ProjectContainer,
  ProjectHeader,
  ProjectImage,
  ProjectSection,
  ProjectSectionColumns,
  ProjectSectionContent,
  ProjectSectionHeading,
  ProjectSectionText,
  ProjectTextRow,
} from 'layouts/Project';
import { Fragment, useEffect } from 'react';
import { media } from 'utils/style';
import styles from './Slice.module.css';
import { CustomCursor } from 'components/CustomCursor';
import { CustomCursorCore } from 'components/CustomCursorCore';

const title = 'Helios App';
const description =
  'Creating a cross platform AI-powered app designed to elevate user productivity, physicality, and fulfillment.';
const roles = ['UI / UX Design', 'Front / Backend Development', 'Artificial Intelligence'];

export const Slice = () => {

  useEffect(() => {

    let isHovering1 = false;
    let isHovering2 = false;
    const LERP_SCALE = 0.15;
    const LERP_SCALE_SLOW = 0.13;  // New: Slower lerp scale

    let currentBorderOpacity = 1;
    let targetBorderOpacity = 1;
    let currentBorderWidth = 1;
    let targetBorderWidth = 1;

    function isDarkMode() {
      let isDark = document.body.getAttribute('data-theme') === 'light' ? false : true;
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
  }, []);

  return (
    <Fragment>

      <Meta title={title} prefix="Projects" description={description} />
      <CustomCursor />
      <CustomCursorCore />
      <ProjectContainer className={styles.slice}>
        <ProjectBackground
          src={sliceBackground}
          srcSet={`${sliceBackground.src} 1280w, ${sliceBackgroundLarge.src} 2560w`}
          placeholder={sliceBackgroundPlaceholder}
          opacity={0.8}
        />
        <ProjectHeader
          title={title}
          description={description}
          url="https://www.best.edu.au/s/q2yjjvl7?data=8%404!9%4020303!10%40-15087&version=1"
          roles={roles}
        />
        <ProjectSection padding="top">
          <ProjectSectionContent>
            {/* <ProjectImage
              srcSet={[sliceApp, sliceAppLarge]}
              placeholder={sliceAppPlaceholder}
              alt="The Slice web application showing a selected user annotation."
              sizes={`(max-width: ${media.mobile}px) 100vw, (max-width: ${media.tablet}px) 90vw, 80vw`}
            /> */}
          </ProjectSectionContent>
        </ProjectSection>
        <ProjectSection light>
          <ProjectSectionContent>

            <ProjectTextRow>
              <ProjectSectionHeading>How It All Started</ProjectSectionHeading>
              <ProjectSectionText>
                Helios was born from my struggle for discipline and the ambition to help others facing similar struggles.  The app provides a robust toolkit for individuals looking to enhance their productivity, physicality, and mental acuity.  If successful, Helios will aid users on the journey of realizing their full potential.
              </ProjectSectionText>

            </ProjectTextRow>
            <Image
              srcSet={[sliceSlides, sliceSlidesLarge]}
              placeholder={sliceSlidesPlaceholder}
              alt="The new My Slides tab in slice, showing annotated and favorited slides."
              sizes={`(max-width: ${media.mobile}px) 500px, (max-width: ${media.tablet}px) 800px, 1000px`}
            />
          </ProjectSectionContent>
        </ProjectSection>
        <ProjectSection>
          <ProjectSectionColumns centered className={styles.columns}>
            <div className={styles.imagesText}>
              <ProjectSectionHeading>Bringing it together</ProjectSectionHeading>
              <ProjectSectionText>
                I aimed to integrate the best features from existing time management, fitness, and motivational apps, and enhance them with AI.
              </ProjectSectionText>
              <ProjectSectionText>
                Helios achieves this all while maintaining a simple, clean, and easy to use user interface.
              </ProjectSectionText>
            </div>
            <div className={styles.sidebarImages}>
              <Image
                className={styles.sidebarImage}
                srcSet={[sliceSidebarLayers, sliceSidebarLayersLarge]}
                placeholder={sliceSidebarLayersPlaceholder}
                alt="The layers sidebar design, now with user profiles."
                sizes={`(max-width: ${media.mobile}px) 200px, 343px`}
              />
              <Image
                className={styles.sidebarImage}
                srcSet={[sliceSidebarAnnotations, sliceSidebarAnnotationsLarge]}
                placeholder={sliceSidebarAnnotationsPlaceholder}
                alt="Multiple user annotations on a shared layer."
                sizes={`(max-width: ${media.mobile}px) 200px, 343px`}
              />
            </div>
          </ProjectSectionColumns>
        </ProjectSection>

        <ProjectSection padding="top">
          <ProjectSectionContent className={styles.grid}>
            <div className={styles.gridImage}>
              <div className={styles.gridBackground}>
                <Image
                  srcSet={[sliceBackgroundBar, sliceBackgroundBarLarge]}
                  placeholder={sliceBackgroundBarPlaceholder}
                  alt=""
                  role="presentation"
                  sizes={`(max-width: ${media.mobile}px) 312px, (max-width: ${media.tablet}px) 408px, 514px`}
                />
              </div>
              <div className={styles.gridForeground}>
                <Image
                  srcSet={[sliceAnnotation, sliceAnnotationLarge]}
                  placeholder={sliceAnnotationPlaceholder}
                  alt="An annotation preview popover with statistics for shape perimeter and area."
                  sizes={`(max-width: ${media.mobile}px) 584px, (max-width: ${media.tablet}px) 747px, 556px`}
                />
              </div>
            </div>
            <div className={styles.gridText}>
              <ProjectSectionHeading>Professional Feedback</ProjectSectionHeading>
              <ProjectSectionText>
                {`Throughout the development phase of Helios, I've engaged with industry experts, from UI/UX designers to successful CEOs, to refine the app's functionality and business approach. This invaluable feedback has not only shaped Helios to better meet user needs but has also expanded my professional network and applied learning.`}
              </ProjectSectionText>
            </div>
          </ProjectSectionContent>
        </ProjectSection>

        <ProjectSection dark>
          <ProjectSectionContent>
            <ProjectTextRow>
              <ProjectSectionHeading>Whats Next?</ProjectSectionHeading>
              <ProjectSectionText>
                {`Slated for a 2024 release, Helios is set to revolutionize personal productivity. We're currently adding additional features, polishing the user experience, and preparing post-launch support. Excitement mounts as we ready Helios to be available to the public.`}
              </ProjectSectionText>
            </ProjectTextRow>
            <Image
              srcSet={[heliosNext, heliosNextLarge]}
              placeholder={sliceSlidesPlaceholder}
              alt="The new My Slides tab in slice, showing annotated and favorited slides."
              sizes={`(max-width: ${media.mobile}px) 500px, (max-width: ${media.tablet}px) 800px, 1000px`}
            />
          </ProjectSectionContent>
        </ProjectSection>

        <ProjectSection>
          <ProjectSectionContent>
            <ProjectTextRow center centerMobile noMargin>
              <ProjectSectionHeading>Project Release</ProjectSectionHeading>
              <ProjectSectionText>
                Completion of this project is on the horizon. Expect this page to be updated with comprehensive details soon.
              </ProjectSectionText>
            </ProjectTextRow>
          </ProjectSectionContent>
        </ProjectSection>
      </ProjectContainer>
      <Footer />
    </Fragment>
  );
};
