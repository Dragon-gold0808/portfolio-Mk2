import { DecoderText } from 'components/DecoderText';
import { Heading } from 'components/Heading';
import { Section } from 'components/Section';
import { theme, useTheme } from 'components/ThemeProvider';
import { Transition } from 'components/Transition';
import { Text } from 'components/Text';
import { useInterval, usePrevious, useScrollToHash } from 'hooks';
import dynamic from 'next/dynamic';
import { Fragment, useEffect, useState } from 'react';
import styles from './Resume.module.css';
import { Link } from 'components/Link';
import { Footer } from 'components/Footer';
import { CustomCursor } from 'components/CustomCursor';
import { CustomCursorCore } from 'components/CustomCursorCore';
import { Button } from 'components/Button';

const DisplacementSphere = dynamic(() =>
  import('layouts/Home/DisplacementSphere').then(mod => mod.DisplacementSphere)
);

export function Resume({ id, sectionRef, scrollIndicatorHidden, ...rest }) {
  const titleId = `${id}-title`;
  const theme = useTheme();
  const prevTheme = usePrevious(theme);

  
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

  useEffect(() => {
  }, [theme.themeId, prevTheme]);

  const skills = ["Rapid Learner", "Dependable and Reliable", "Excellent Communication", "Detail-Oriented", "Self-Motivated and Disciplined", "Great Team Collaboration", "Critical and Analytical Thinking"];

  const experience = [
    {
        company: "Conservative Political Action Conference (CPAC), Washington, DC & Orlando, FL",
        type: "Intern/Volunteer",
        skills: ["Aided in the development and implementation of CPAC's social media outreach strategies, coordinating closely with speakers and their staff.",
        "Conducted interviews with various political officials.",
        "Enhanced CPAC's social media presence by creating and uploading quality posts, thereby improving traffic and engagement.",
        "Worked with a variety of audio and visual equipment to create compelling videos and content."]
    },
    {
        company: "Cashes Creek Farms, Blue Ridge, GA",
        type: "Farm Hand",
        skills: ["Maintained expansive land holdings, pasture, and grazing areas using all-terrain vehicles, tractors, and mowers.",
        "Managed animal care, including feed and medication preparation, and shifting animals between grazing areas.",
        "Constructed and maintained fences around grazing areas to ensure animal safety.",
        "Managed transportation and distribution of large quantities of hay and straw."]
    },
  ];

  const education = [
    "Maintaining a strong academic performance with a 3.96 cumulative unweighted GPA while enrolled in advanced courses.",
    <span>
      {"Pursuing advanced math and science curriculums from "}
      <Link href="https://www.artofproblemsolving.com">Art of Problem Solving</Link>
      {". Some of the courses I am taking are BC Calculus 2, AP Physics, and Advanced CompSci Principles."}
    </span>,
    "Homeschool courses in subjects including but not limited to Philosophy, Spanish, and Apologetics. Also possesses three years of Latin study and experience with the Institute for Excellence in Writing (IEW).",
    "Exploring MIT OpenCourseWare for additional educational opportunities. Future courses include Introduction to Special Relativity and Introduction to Aerospace Engineering.",
    <span>
      {"Gearing up for participation in academic competitions such as the "} <Link href="https://maa.org/math-competitions/amc-1012">American Math Competition (AMC 12)</Link> {" and "}  <Link href="https://hsmd.math.gatech.edu">Georgia Tech High School Math Day (HSMD).</Link> {"Also set to undertake a range of "}
      <Link href="https://artofproblemsolving.com/woot?gtmlist=Schedule_Side">Worldwide Online Olympiad Training (WOOT)</Link>
      {" courses - including Math WOOT, Physics WOOT, Chemistry WOOT, and Code WOOT - through Art of Problem Solving."}
    </span>
  ];
  
  // Render this array in your component
  const EducationComponent = () => (
    <div>
      {education.map((item, index) => (
        <p key={index}>{item}</p>
      ))}
    </div>
  );
  
  
  const projects =   
  [['Developing','Helios,', ' an innovative productivity app that leverages sophisticated LLMs and combines task management, fitness tracking, dietary planning, and social networking for improved lifestyle efficiency.','helios'],
  ['Building a small hybrid','rocket engine', 'with variable thrust and thrust vectoring capabilities', 'rocket-engine'],
  ['Designing an autonomous ','paintball turret', 'with advanced targeting capabilities facilitated  by deep learning neural networks.', 'paintball-turret'],
  ['Creating a small-scale','neural network', 'in Python for image recognition and classification.', 'neural-network'],
  ['Aided in the creation of','Avata,', ' a startup streamlining local event planning and coordination processes.', 'avata'],];

  const extra = ['Active in Rocketry, Debate, Chess, and Astronomy Clubs.', 'Eagle Scout Candidate in the Boy Scouts.','Participating  in Piano, Jujitsu, Wrestling, and Cross Country.', 'Volunteering with Feed Fannin.'];

  const website = ['ChaseRoll.com', 'Avata.events', 'UseHelios.com'];

  return (
    <>
    <CustomCursor />
    <CustomCursorCore />
    <Section
      className={styles.resume}
      as="section"
      ref={sectionRef}
      id={id}
      aria-labelledby={titleId}
      tabIndex={-1}
      {...rest}
    >
      <Transition in key = {theme.themeId} timeout={1000}>
        {(visible, status) => (
          <Fragment>    
            <DisplacementSphere style = {{
                position: "fixed",
                top: 0,
            }}/>
            <Heading className = {styles.heading} data-visible = {visible} level = {3} weight = "bold">
                <DecoderText text = "RESUME" start = {true} />
                <Button style = {{zIndex: "-1"}}  href= 'Resume.pdf' target = "_blank" download>Download CV</Button>
            </Heading>
            <div className = {styles.resumeWrapper}>
                <div className={styles.resumeContent}>
                    <div className={styles.section}>
                        <Heading data-visible = {true} level={4}>
                            Chase Roll
                        </Heading>
                        <p className={styles.textContent}><p>Phone Number: <Link href = "/#contact">706-633-9432</Link></p>
                        <p >E-mail: <Link href = "/#contact">rollchase@gmail.com</Link></p>
                        </p>
                        
                    </div>

                    <div className={styles.section}>
                        <Heading data-visible = {true} level={5}>
                            Profile
                        </Heading>
                        <p className={styles.textContent}>Grade 12 high school student with a passion for learning and striving for excellence. Seeking diverse experiences to foster personal and professional growth. Demonstrated abilities include quick learning, unparalleled work ethic, reliability, and keen attention to detail.</p>
                    </div>
                    
                    <div className={styles.section}>
                        <Heading data-visible = {true} level={5}>
                            Key Skills
                        </Heading>
                        <ul className={styles.listContent}>
                            {skills.map((item, idx) => (<li key = {idx}>{item}</li>))}
                        </ul>
                    </div>
                    
                    <div className={styles.section}>
                        <Heading data-visible = {true} level={5}>
                            Experience
                        </Heading>
                        {experience.map((item, idx) => (
                            <div key={idx}>
                                <p className = {styles.textContent} style={{paddingBottom: "0px", paddingTop: "15px"}}>
                                    <Link href="">{item.type}</Link>
                                </p>
                                <i className = {styles.textContent} style={{textDecoration: "italic"}}>
                                    {item.company} 
                                </i>
                                <ul className={styles.listContent}>
                                    {item.skills.map((item, idx) => (<li key = {idx}>{item}</li>))}
                                </ul>
                            </div>
                        ))}
                    </div>

                    <div className={styles.section}>
                        <Heading data-visible = {true} level={5}>
                            Education
                        </Heading>
                        <ul className={styles.listContent}>
                            {education.map((item, idx) => (<li key = {idx}>{item}</li>))}
                        </ul>
                    </div>
                    
                    <div className={styles.section}>
                        <Heading data-visible = {true} level={5}>
                            Projects
                        </Heading>
                        <ul className={styles.listContent}>
                            {projects.map((item, idx) => (<li key = {idx}>{item[0]}{" "}<Link href = {`/projects/${item[3]}`}>{item[1].toUpperCase()}</Link>{" "}{item[2]}</li>))}
                        </ul>
                    </div>
                    
                    <div className={styles.section}>
                        <Heading data-visible = {true} level={5}>
                            Extracurriculars
                        </Heading>
                        <ul className={styles.listContent}>
                            {extra.map((item, idx) => (<li key = {idx}>{item}</li>))}
                        </ul>
                    </div>

                    <div className={styles.section}>
                        <Heading data-visible = {true} level={5}>
                            Websites
                        </Heading>
                        <ul className={styles.listContent}>
                            {website.map((item, idx) => (<li key = {idx}><Link href = {`https://${item}`}>{item}</Link></li>))}
                        </ul>
                        <p className={styles.listContent}> ... ... ...</p>
                    </div>

                </div>
            </div>
            <div className={styles.download}>
                <Button style = {{ width: "300px"}}  href= 'Resume.pdf' download>Download CV</Button>
            </div>
          </Fragment>
        )}
      </Transition>
      
    </Section>
    <Footer />
    </>
  );
}
