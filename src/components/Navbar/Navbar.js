import { Icon } from 'components/Icon';
import { Monogram } from 'components/Monogram';
import { useTheme } from 'components/ThemeProvider';
import { tokens } from 'components/ThemeProvider/theme';
import { Transition } from 'components/Transition';
import { useAppContext, useScrollToHash, useWindowSize } from 'hooks';
import RouterLink from 'next/link';
import { useRouter } from 'next/router';
import { useEffect, useRef, useState } from 'react';
import { cssProps, media, msToNum, numToMs } from 'utils/style';
import { NavToggle } from './NavToggle';
import styles from './Navbar.module.css';
import { ThemeToggle } from './ThemeToggle';
import { navLinks, socialLinks } from './navData';
import { DecoderText } from 'components/DecoderText';
import profileKatakana from 'assets/katakana-profile.svg?url';

export function Navbar() {
  const [current, setCurrent] = useState();
  const [target, setTarget] = useState();
  const [show, setShow] = useState(true);
  const [flag, setFlag] = useState(false);
  const [prevScroll, setPrevScroll] = useState(0);
  const { themeId } = useTheme();
  const { menuOpen, section, dispatch } = useAppContext();
  const { route, asPath } = useRouter();
  const windowSize = useWindowSize();
  const headerRef = useRef();
  const isMobile = windowSize.width <= media.mobile || windowSize.height <= 696;
  const scrollToHash = useScrollToHash();

  useEffect(() => {
    // Prevent ssr mismatch by storing this in state
    setCurrent(asPath);
  }, [asPath]);

  const scrolls = () => {
    if (window.scrollY > prevScroll && flag) setShow(false);
    else setShow(true);
    setPrevScroll(window.scrollY);
    setFlag(true);
  };

  useEffect(() => {
    window.addEventListener('scroll', scrolls);
    return window.removeEventListener('scroll', scrolls);
  }, [prevScroll]);

  // Handle smooth scroll nav items
  useEffect(() => {
    if (!target || route !== '/') return;
    setCurrent(`${route}${target}`);
    scrollToHash(target, () => setTarget(null));
  }, [route, scrollToHash, target]);

  // Handle swapping the theme when intersecting with inverse themed elements
  useEffect(() => {
    const navItems = document.querySelectorAll('[data-navbar-item]');
    const inverseTheme = themeId === 'dark' ? 'light' : 'dark';
    const { innerHeight } = window;

    let inverseMeasurements = [];
    let navItemMeasurements = [];

    const isOverlap = (rect1, rect2, scrollY) => {
      return !(rect1.bottom - scrollY < rect2.top || rect1.top - scrollY > rect2.bottom);
    };

    const resetNavTheme = () => {
      for (const measurement of navItemMeasurements) {
        measurement.element.dataset.theme = '';
      }
    };

    const handleInversion = () => {
      const invertedElements = document.querySelectorAll(
        `[data-theme='${inverseTheme}'][data-invert]`
      );

      if (!invertedElements) return;

      inverseMeasurements = Array.from(invertedElements).map(item => ({
        element: item,
        top: item.offsetTop,
        bottom: item.offsetTop + item.offsetHeight,
      }));

      const { scrollY } = window;

      resetNavTheme();

      for (const inverseMeasurement of inverseMeasurements) {
        if (
          inverseMeasurement.top - scrollY > innerHeight ||
          inverseMeasurement.bottom - scrollY < 0
        ) {
          continue;
        }

        for (const measurement of navItemMeasurements) {
          if (isOverlap(inverseMeasurement, measurement, scrollY)) {
            // console.log(measurement.element);
            measurement.element.dataset.theme = inverseTheme;
          } else {
            measurement.element.dataset.theme = '';
          }
        }
      }
    };

    // Currently only the light theme has dark full-width elements
    if (themeId === 'light') {
      navItemMeasurements = Array.from(navItems).map(item => {
        const rect = item.getBoundingClientRect();

        return {
          element: item,
          top: rect.top,
          bottom: rect.bottom,
        };
      });

      document.addEventListener('scroll', handleInversion);
      handleInversion();
    }

    return () => {
      document.removeEventListener('scroll', handleInversion);
      resetNavTheme();
    };
  }, [themeId, windowSize, asPath]);

  // Check if a nav item should be active
  const getCurrent = (url = '') => {
    const nonTrailing = current?.endsWith('/') ? current?.slice(0, -1) : current;

    if (url === nonTrailing) {
      return 'page';
    }

    return '';
  };

  // Store the current hash to scroll to
  const handleNavItemClick = event => {
    const hash = event.currentTarget.href.split('#')[1];
    // console.log(hash);
    setTarget(null);

    if (hash && route === '/') {
      setTarget(`#${hash}`);
      event.preventDefault();
    }
  };

  const handleMobileNavClick = event => {
    handleNavItemClick(event);
    if (menuOpen) dispatch({ type: 'toggleMenu' });
  };

  return (
    <header className={styles.navbar} ref={headerRef}>

      <RouterLink href={route === '/' ? '/#intro' : '/'} scroll={false}>
        <a
          data-navbar-item
          className={styles.logo}
          aria-label="Chase Roll, Student"
          onClick={handleMobileNavClick}
          style={{
            transition: "all 0.3s ease-in-out",
            opacity: !isMobile || menuOpen ? 1 : (show ? 1 : 0)
          }}
        >
          <Monogram highlight />
        </a>
      </RouterLink>
      <NavToggle onClick={() => dispatch({ type: 'toggleMenu' })} menuOpen={menuOpen} style={{
        transition: "all 0.3s ease-in-out",
        opacity: !isMobile || menuOpen ? 1 : (show ? 1 : 0)
      }} />

      <nav className={styles.nav}>
        <div className={styles.navList}>
          {navLinks.map(({ label, pathname }) => (
            <RouterLink href={pathname} scroll={false} key={label}>
              <a
                data-navbar-item
                className={styles.navLink}
                aria-current={getCurrent(pathname) || section.id == label.toLowerCase() ? "page" : ""}
                onClick={handleNavItemClick}
              >
                {label}
              </a>
            </RouterLink>
          ))}
        </div>
        <NavbarIcons desktop />
      </nav>

      <Transition unmount in={menuOpen} timeout={msToNum(tokens.base.durationL)}>
        {visible => (
          <nav className={styles.mobileNav} data-visible={visible}>
            {navLinks.map(({ label, pathname }, index) => (
              <RouterLink href={pathname} scroll={false} key={label}>
                <a
                  className={styles.mobileNavLink}
                  data-visible={visible}
                  aria-current={getCurrent(pathname) == 'page' || section.id == label.toLowerCase() ? 'page' : ""}
                  onClick={handleMobileNavClick}
                  style={cssProps({
                    transitionDelay: numToMs(
                      Number(msToNum(tokens.base.durationS)) + index * 50
                    ),
                  })}
                >
                  {label}
                </a>
              </RouterLink>
            ))}
            <NavbarIcons />
            <ThemeToggle isMobile />
          </nav>
        )}
      </Transition>
      {!isMobile && <ThemeToggle data-navbar-item />}
    </header>
  );
};

const NavbarIcons = ({ desktop }) => (
  <div className={styles.navIcons}>

    {socialLinks.map(({ label, url, icon }) => (<NavIconLink label={label} url={url} icon={icon} key={label} desktop={desktop} />))
    }
  </div>
);

const NavIconLink = ({ label, url, icon, desktop }) => {

  const [visible, setVisible] = useState(false);

  return (
    <a
      key={label}
      data-navbar-item={desktop || undefined}
      className={styles.navIconLink}
      aria-label={label}
      href={url}
      target="_blank"
      rel="noopener noreferrer"
      onMouseOver={(e) => {
        // e.preventDefault();
        setVisible(true);
      }}
      onMouseOut={(e) => {
        // e.preventDefault();
        setVisible(false);
      }}
    >
      <Icon className={styles.navIcon} icon={icon} />
      <span className={styles.navSpan} style={{

        margin: "0",
        display: "flex",
        justifyContent: "center",
        alignItems: "flex-start",
        position: "relative",
        padding: "0",
      }}>
        {visible && <div style={
          {
            position: "absolute",
            top: "-8px",
            left: visible ? "20px" : "0px",
            opacity: visible ? 1 : 0,
            width: "100px"
          }
        } className={styles.navAnim} data-show={visible}><DecoderText text={label} start={visible} startDelay={1000} />
        </div>
        }
      </span>

    </a>
  );
};