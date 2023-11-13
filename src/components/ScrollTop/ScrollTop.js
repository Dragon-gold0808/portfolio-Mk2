import { Button } from "components/Button";
import { useScrollToHash } from "hooks";
import RouterLink from 'next/link';
import styles from './ScrollTop.module.css';


export const ScrollTop = ({scrollIndicatorHidden}) => {

    const scrollToHash = useScrollToHash();

    const handleScrollClick = event => {
        event.preventDefault();
        scrollToHash(event.currentTarget.href);
    };

    return (
        <RouterLink href="/#intro">
              <a
                className={styles.scrollIndicator}
                data-hidden={scrollIndicatorHidden}
                onClick={handleScrollClick}
                
              >
                <div className={styles.wrapper}>
                  {/* <div style = {{
                    fontSize: "30px",
                    
                  }}>Δ</div> */}
                    <div className = {styles.topLeft}></div>
                    <div className = {styles.topRight}></div>
                    {/* <div className = {styles.bottom}></div> */}
                    <div className = {styles.bottomLeft}></div>
                    <div className = {styles.bottomRight}></div>
                </div>
              </a>
        </RouterLink>
    );
};