import { ProjectSummary } from 'layouts/Home/ProjectSummary';
import { Meta } from 'components/Meta';
import { Section } from 'components/Section';
import gamestackTexture2Large from 'assets/gamestack-list-large.jpg';
import gamestackTexture2Placeholder from 'assets/gamestack-list-placeholder.jpg';
import gamestackTexture2 from 'assets/gamestack-list.jpg';
import gamestackTextureLarge from 'assets/gamestack-login-large.jpg';
import gamestackTexturePlaceholder from 'assets/gamestack-login-placeholder.jpg';
import gamestackTexture from 'assets/gamestack-login.jpg';
import sliceTextureLarge from 'assets/slice-app-large.jpg';
import sliceTexturePlaceholder from 'assets/slice-app-placeholder.jpg';
import sliceTexture from 'assets/slice-app.jpg';
import sprTexturePlaceholder from 'assets/spr-lesson-builder-dark-placeholder.jpg';
import rocketEngine from 'assets/rocket-engine-dark-large.jpg';
import styles from './List.module.css';
import React, { useRef, useState, useEffect } from 'react';
import { Footer } from 'components/Footer';
import { Heading } from 'components/Heading';
import { DecoderText } from 'components/DecoderText';
import { Input } from 'components/Input';
import { msToNum, numToMs } from 'utils/style';
import { tokens } from 'components/ThemeProvider/theme';
import { classes, cssProps } from 'utils/style';
import { useFormInput } from 'hooks';
import { CustomCursor } from 'components/CustomCursor';
import { Text } from 'components/Text';
import { Button } from 'components/Button';
import { Icon } from 'components/Icon';
import { CustomCursorCore } from 'components/CustomCursorCore';

function getDelay(delayMs, offset = numToMs(0), multiplier = 1) {
  const numDelay = msToNum(delayMs) * multiplier;
  return cssProps({ delay: numToMs((msToNum(offset) + numDelay).toFixed(0)) });
}

const initDelay = tokens.base.durationS;


export const List = (props) => {

  const [visibleSections, setVisibleSections] = useState([]);
  const [scrollIndicatorHidden, setScrollIndicatorHidden] = useState(false);
  const projectOne = useRef();
  const projectTwo = useRef();
  const projectThree = useRef();
  const projectFour = useRef();
  const [size, setSize] = useState(4);
  const searchText = useFormInput('');
  const [filterType, setFilterType] = useState("");
  const [text, setText] = useState('');
  const refArray = [projectOne, projectTwo, projectThree, projectFour];
  const [menuShow, setMenuShow] = useState(0);
  const [enter, setEnter] = useState(false);
  const [leave, setLeave] = useState(false);
  const [sections, setSection] = useState([projectOne, projectTwo]);

  // console.log(projectThree);
  const projectType = ["Engineering", "Electronics", "Computer Science"];

  const projects =  [
    {
      id: "project-1",
      sectionRef: projectOne,
      index: 1,
      alternative: false,
      title: "Hybrid Rocket Engine",
      description: "Developing Phoenix, a small hybrid rocket engine with variable thrust and precise vectoring capabilities.",
      buttonText: "View project",
      buttonLink: "/projects/rocket-engine",
      type: "Engineering Electronics",
      model: {
        type: 'laptop',
        alt: 'Rocket Engine',
        textures: [
          {
            srcSet: [rocketEngine, rocketEngine],
            placeholder: sprTexturePlaceholder,
          },
        ]
      }
    },
    {
      id: "project-2",
      sectionRef: projectTwo,
      index: 2,
      title: "Helios App",
      alternative: true,
      description: "Creating a cross platform AI-powered app designed to elevate user productivity, physicality, and fulfillment.",
      buttonText: "View project",
      buttonLink: "/projects/helios",
      type: "Computer Science",
      model: {
        type: 'phone',
        alt: 'Digital Development',
        textures: [
          {
            srcSet: [gamestackTexture, gamestackTextureLarge],
            placeholder: gamestackTexturePlaceholder,
          },
          {
            srcSet: [gamestackTexture2, gamestackTexture2Large],
            placeholder: gamestackTexture2Placeholder,
          },
        ]
      }
    },
    {
      id: "project-3",
      sectionRef: projectThree,
      index: 3,
      title: "Avata",
      alternative: false,
      description: "Assisted in the creation of a startup poised to streamline local event planning and coordination.",
      buttonText: "Visit Website",
      buttonLink: "https://avata.events/",
      type: "Electronics",
      model: {
        type: 'laptop',
        alt: 'UAC Drone',
        textures: [
          {
            srcSet: [sliceTexture, sliceTextureLarge],
            placeholder: sliceTexturePlaceholder,
          },
        ]
      }
    }, 
    {
      id: "project-4",
      sectionRef: projectFour,
      index: 4,
      title: "Coming Soon",
      alternative: true,
      type: "",
      description: "Details Not Yet Available.",
      buttonText: "N/A",
      buttonLink: "",
      model: {
        type: '',
        alt: 'Digital Development',
        textures: [
          {
            srcSet: [gamestackTexture, gamestackTextureLarge],
            placeholder: gamestackTexturePlaceholder,
          },
          {
            srcSet: [gamestackTexture2, gamestackTexture2Large],
            placeholder: gamestackTexture2Placeholder,
          },
        ]
      }
    },
  ];


  // useEffect(() => {
  //   const newSection = size === 3 ? refArray[2] : size === 4 ? refArray[3] : null;
  //   if(newSection === null) {
  //     console.log('yes');
  //     setSection([refArray[0], refArray[1]]);
      
  //   }
  //   else setSection((prevSections) => [...prevSections, newSection]);
  // }, [size]);

  useEffect(() => {
    console.log(filterType);
    if(projects.slice(0, size).filter((item) => item.type.includes(filterType)).filter(checkFunction).length > 0) setSection(projects.slice(0, size).filter((item) => item.type.includes(filterType)).filter(checkFunction).map(item => (item.sectionRef)));
    else setSection([refArray[0], refArray[1]]);
  }, [text, size, filterType]);

  useEffect(() => {
    // if(projects.slice(0, size).filter(checkFunction).length === 0) return;
    // const sections = [projectOne, projectTwo];
    if(sections.length === 0) return;
    const sectionObserver = new IntersectionObserver(
      (entries, observer) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            const section = entry.target;
            observer.unobserve(section);
            if (visibleSections.includes(section)) return;
            setVisibleSections(prevSections => [...prevSections, section]);
          }
        });
      },
      { rootMargin: '0px 0px -10% 0px', threshold: 0.1 }
    );

    const indicatorObserver = new IntersectionObserver(
      ([entry]) => {
        setScrollIndicatorHidden(!entry.isIntersecting);
      },
      { rootMargin: '-100% 0px 0px 0px' }
    );
    // if(sections.length == 2) sectionObserver.observe(projectTwo.current);
    sections.forEach(section => {
      // console.log(section);
       sectionObserver.observe(section.current);
    });

    indicatorObserver.observe(sections[0].current);

    return () => {
      sectionObserver.disconnect();
      indicatorObserver.disconnect();
    };
  }, [visibleSections,sections]);

  const checkFunction = (item) => {
    return (String(item.title).toUpperCase().includes(text) || String(item.description).includes(text));
  };

  return (
    <div onClick = {(e) => {
      
      if(!((enter === true) && (leave === false)) && (menuShow === true)) setMenuShow(false);
    }}>

      <div className={styles.heading} ref = {props.sectionRef} id = {props.id} style={{
        marginBottom: "0px"
      }}>
        <Heading  level={3} as="h1" style = {{
          
        }}>
          <DecoderText text="PROJECTS"/>
          
        </Heading>
        <div className = {styles.inputGroup}>
        <Input
          className={styles.btn}
          style={getDelay(tokens.base.durationXS, initDelay)}
          autoComplete="off"
          label="Search Projects"
          maxLength={512}
          {...searchText}
          onChange={(e) => {
            
            setText(e.target.value);
          }}
          value = {text}
        />
       
        
        <Button
          secondary
          className={styles.button}
          data-visible={true}
          style = {{
            paddingLeft: "0",
            paddingRight: "0",
            textAlign: "center",
            // backgroundColor:  filterType === "" ? "rgb(var(--rgbText) / 0.0)" : "rgb(var(--varText) / 0.3)!important"
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
            padding: "",
            color: filterType === "" ? "rgb(var(--rgbText) / 0.5)" : "rgb(var(--varText) / 1)"
          }}/>
        </Button>
        <div className = {styles.modal} style = {{
          position: "absolute",
          right: 10,
          top: menuShow ? "70px" : "60px",
          opacity: menuShow ? 1 : 0,
          zIndex: menuShow ? "var(--zIndex3)" : -1000,
          display:"flex",
          flexDirection: "column",
          justifyContent: "flex-start",
          alignItems: "flex-start",
          height: "auto",
          transition: "all 0.2s ease-in",
          paddingTop: "10px",
          paddingBottom: "10px"
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
          {projectType.map((item, idx) => {
            return (
              <div key = {idx} style={{
                position: "relative",
                paddingTop: "4px",
                paddingBottom: "4px"
              }}>
                <Button secondary as="button" onClick = {(e) => {
                  setFilterType(item === filterType ? "" : item);
                }} style = {{
                  backgroundColor: item === filterType ? "rgb(var(--rgbText) / 0.3)" : "transparent"
                }}>
                  {item}
                </Button>
              </div>
            );
          })}
        </div>
        </div>
      
      </div>
      <div style={{
        position: "relative"
      }}>
      {projects.slice(0, size).filter((item) => item.type.includes(filterType)).filter(checkFunction).length > 0 && projects.slice(0, size).filter((item) => item.type.includes(filterType)).filter(checkFunction).map((item, idx) => {
        // console.log(item);
        return(
          <>
            <ProjectSummary
            key = {idx}
            id={item.id}
            alternate={item.alternative}
            sectionRef={item.sectionRef}
            visible={visibleSections.includes(item.sectionRef.current)}
            index={idx + 1}
            title={item.title}
            description={item.description}
            buttonText={item.buttonText}
            buttonLink={item.buttonLink}
            model={item.model}
          />
          </>
        );
      })}
      {projects.slice(0, size).filter((item) => item.type.includes(filterType)).filter(checkFunction).length == 0 &&projects.slice(0, size).map((item, idx) => {
        // console.log(item);
        return(
          <>
            <ProjectSummary
            key = {idx}
            id={item.id}
            alternate={item.alternative}
            sectionRef={item.sectionRef}
            visible={visibleSections.includes(item.sectionRef.current) && checkFunction(item)}
            index={idx + 1}
            title={item.title}
            description={item.description}
            buttonText={item.buttonText}
            buttonLink={item.buttonLink}
            model={item.model}
            style = {{
              display: checkFunction(item) ? "flex" : "none"
            }}
          />
          </>
        );
      })}
      {projects.slice(0, size).filter((item) => item.type.includes(filterType)).filter(checkFunction).length == 0 && <div style={{
        display: "flex",
        justifyContent: "center",
        paddingTop: "200px"
      }}><Heading level={4}>{"There is no result."}</Heading></div>}
      </div>
      <div style={{
          display: "flex",
          justifyContent: "center",
          position: "relative",
          marginBottom: "200px",
          marginTop: "200px",
        }}>
          {/* <Button iconHoverShift style = {{width: "300px"}} href = {size == 4 ? '/#article' : ""} onClick = {(e) =>{
            if(size == 4) setSize(2);
            else setSize(++size);
          }}>
              <Heading level = {5} style = {{color: "var(--rgbBackground)", letterSpacing: "5px"}} >{`${size == 4 ? "GO ARTICLE" : "VIEW MORE"} `}</Heading>
          </Button> */}
        </div>
    {/* <Footer className={styles.footer} /> */}
    </div>
  );
};
