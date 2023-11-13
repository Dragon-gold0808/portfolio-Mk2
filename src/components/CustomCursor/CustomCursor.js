import styles from './CustomCursor.module.css';
import { useEffect, useState } from 'react';
import { useTheme } from 'components/ThemeProvider';
import { useWindowSize } from 'hooks';
import { useRouter } from 'next/router';

export const CustomCursor = () => {

  // const { themeId } = useTheme();
  // const windowSize = useWindowSize();
  // console.log(windowSize);
  // const { route, asPath } = useRouter();
  // const [flag, setFlag] = useState(false);
  // const [show, setShow] = useState(true);
  // const [prevScroll, setPrevScroll] = useState(0);

  // const scrolls = () => {
  //   if(window.scrollY > prevScroll && flag) setShow(false);
  //   else setShow(true);
  //   setPrevScroll(window.scrollY);
  //   setFlag(true);
  // };

  // useEffect(() => {
  //   window.addEventListener('scroll', scrolls);
  //   return window.removeEventListener('scroll', scrolls);
  // },[prevScroll]);

  // useEffect(() => {
  //   const navItems = document.querySelectorAll('.custom-cursor-2');
  //   // console.log("navItems", navItems);
  //   const inverseTheme = themeId === 'dark' ? 'light' : 'dark';

  //   // console.log(themeId);
  //   const { innerHeight } = window;

  //   let inverseMeasurements = [];
  //   let navItemMeasurements = [];

  //   const isOverlap = (rect1, rect2, scrollY) => {
  //     return !(rect1.bottom - scrollY < rect2.top || rect1.top - scrollY > rect2.bottom);
  //   };

  //   const resetNavTheme = () => {
  //     for (const measurement of navItemMeasurements) {
  //       measurement.element.dataset.theme = '';
  //     }
  //   };

  //   const handleInversion = (e) => {
  //     const invertedElements = document.querySelectorAll(
  //       `[data-theme='${inverseTheme}'][data-invert]`
  //     );

  //     // console.log("invert", invertedElements);

  //     if (!invertedElements) return;

  //     inverseMeasurements = Array.from(invertedElements).map(item => ({
  //       element: item,
  //       top: item.offsetTop,
  //       bottom: item.offsetTop + item.offsetHeight,
  //     }));

  //     // console.log(inverseMeasurements);
  //     const { scrollY } = window;
  //     // console.log(e.clientX);
      
  //     resetNavTheme();

  //     for (const inverseMeasurement of inverseMeasurements) {
  //       if (
  //         inverseMeasurement.top - scrollY > innerHeight ||
  //         inverseMeasurement.bottom - scrollY < 0
  //       ) {
  //         continue;
  //       }

  //       for (const measurement of navItemMeasurements) {
  //         // console.log("measurement", measurement);
  //         if (isOverlap(inverseMeasurement, measurement, scrollY)) {
  //           console.log(measurement.element.dataset.theme);
  //           measurement.element.dataset.theme = inverseTheme;
  //         } else {
  //           measurement.element.dataset.theme = '';
  //         }
  //       }
  //     }
  //   };
  //   // console.log(themeId);
  //   // Currently only the light theme has dark full-width elements
  //   if (themeId === 'light') {
  //     navItemMeasurements = Array.from(navItems).map(item => {
  //       const rect = item.getBoundingClientRect();
  //       console.log("rect",rect);
  //       return {
  //         element: item,
  //         top: rect.top,
  //         bottom: rect.bottom,
  //       };
  //     });

  //     document.addEventListener('mousemove', handleInversion);
  //     // handleInversion();
  //   }

  //   return () => {
  //     document.removeEventListener('mousemove', handleInversion);
  //     resetNavTheme();
  //   };
  // }, [themeId, windowSize, asPath]);


  return (
    <div className={styles.custom_cursor_2 + " custom-cursor-2"} data-invert>


    </div>
  );
};

