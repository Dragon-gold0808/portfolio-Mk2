import { Button } from 'components/Button';
import { DecoderText } from 'components/DecoderText';
import { Divider } from 'components/Divider';
import { Heading } from 'components/Heading';
import { Icon } from 'components/Icon';
import { Input } from 'components/Input';
import { Section } from 'components/Section';
import { Text } from 'components/Text';
import { tokens } from 'components/ThemeProvider/theme';
import { Transition } from 'components/Transition';
import { useFormInput } from 'hooks';
import { useRef, useState, useEffect } from 'react';
import { cssProps, msToNum, numToMs } from 'utils/style';
import emailjs from 'emailjs-com';
import styles from './Contact.module.css';
// import { useEffect } from 'react/cjs/react.production.min';

export const Contact = (props) => {
  const errorRef = useRef();
  const email = useFormInput('');
  const message = useFormInput('');
  const [sending, setSending] = useState(false);
  const [complete, setComplete] = useState(false);
  const [statusError, setStatusError] = useState('');
  const [back, setBack] = useState(false);
  const [key, setKey] = useState(Date.now());
  const initDelay = tokens.base.durationS;


  useEffect(() => {
    // console.log(complete, props.visible);
  }, [complete]);

  const onSubmit = async event => {
    event.preventDefault();
    if (sending) return;

    try {
      setSending(true);
      emailjs.send("service_cude9xe", "template_snjxh4k", {
        to_name: "Chase Roll",
        user_email: email.value,
        message: message.value,
        from_name: email.value,
        reply_to: email.value
      }, "rLC560Ku25eSknF2G")
        .then((result) => {
          setBack(false);
          setSending(false);
          setComplete(true);
          // console.log(result.text);
        });

    }
    catch {
      (error) => {
        setSending(false);
        setStatusError(error.text);
      };
    }
    // setStatusError('');

    // if (sending) return;

    // try {
    //   setSending(true);

    //   const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/message`, {
    //     method: 'POST',
    //     mode: 'cors',
    //     headers: {
    //       'Content-Type': 'application/json',
    //     },
    //     body: JSON.stringify({
    //       email: email.value,
    //       message: message.value,
    //     }),
    //   });

    //   const responseMessage = await response.json();

    //   const statusError = getStatusError({
    //     status: response?.status,
    //     errorMessage: responseMessage?.error,
    //     fallback: 'There was a problem sending your message',
    //   });

    //   if (statusError) throw new Error(statusError);

    //   setComplete(true);
    //   setSending(false);
    // } catch (error) {
    //   setSending(false);
    //   setStatusError(error.message);
    // }
    // let data = {

    //   email : email.value,
    //   message : message.value
    // };

    // let response = await fetch('/api/mail', {
    //   method: "POST",
    //   header: {
    //     "Content-Type" : "application/json"
    //   },
    //   body: JSON.stringify(data)
    // });

    // let responseJson = await response.json();
    // console.log(responseJson);

  };

  return (
    <section className={styles.contact} id={props.id} ref={props.sectionRef}>
      {/* <Meta
        title="Contact"
        description="Send me a message if you’re interested in discussing a project or if you just want to say hi"
      /> */}
      <Transition unmount in={!complete && props.visible} key={key} timeout={1600}>
        {(visible, status) => {

          return (
            <form className={styles.form} method="post" onSubmit={onSubmit}>
              <Heading
                className={styles.title}
                data-status={status}
                level={3}
                as="h1"
                style={getDelay(tokens.base.durationXS, initDelay, 0.3)}
              >
                <DecoderText text="Let's Connect" start={visible} delay={300} />
              </Heading>
              <Divider
                className={styles.divider}
                data-status={status}
                style={getDelay(tokens.base.durationXS, initDelay, 0.4)}
              />
              <Input
                required
                className={styles.input}
                data-status={status}
                style={getDelay(tokens.base.durationXS, initDelay)}
                autoComplete="email"
                label="Your Email"
                type="email"
                maxLength={512}
                {...email}
              />
              <Input
                required
                multiline
                className={styles.input}
                data-status={status}
                style={getDelay(tokens.base.durationS, initDelay)}
                autoComplete="off"
                label="Message"
                maxLength={4096}
                {...message}
              />
              <Transition in={statusError} timeout={msToNum(tokens.base.durationM)}>
                {errorStatus => (
                  <div
                    className={styles.formError}
                    data-status={errorStatus}
                    style={cssProps({
                      height: errorStatus ? errorRef.current?.offsetHeight : 0,
                    })}
                  >
                    <div className={styles.formErrorContent} ref={errorRef}>
                      <div className={styles.formErrorMessage}>
                        <Icon className={styles.formErrorIcon} icon="error" />
                        {statusError}
                      </div>
                    </div>
                  </div>
                )}
              </Transition>
              <Button
                className={styles.button}
                data-status={status}
                data-sending={sending}
                style={getDelay(tokens.base.durationM, initDelay)}
                disabled={sending}
                loading={sending}
                loadingText="Sending..."
                icon="send"
                type="submit"

              >
                Send message
              </Button>
            </form>);
        }}
      </Transition>
      <Transition unmount in={complete}>
        {(visible, status) => (
          <div className={styles.complete} aria-live="polite">
            <Heading
              level={3}
              as="h3"
              className={styles.completeTitle}
              data-status={status}
            >
              Message Sent
            </Heading>
            <Text
              size="l"
              as="p"
              className={styles.completeText}
              data-status={status}
              style={getDelay(tokens.base.durationXS)}
            >
              I’ll get back to you within a couple days, sit tight
            </Text>
            <Button
              secondary
              iconHoverShift
              className={styles.completeButton}
              data-status={status}
              style={getDelay(tokens.base.durationM)}
              href="/"
              icon="chevronRight"
              onClick={(e) => {
                // e.preventDefault();
                setKey(Date.now());
                setComplete(false);
              }}
            >
              Back to homepage
            </Button>
          </div>
        )}
      </Transition>
      {/* <Footer className={styles.footer} /> */}
    </section>
  );
};

function getStatusError({
  status,
  errorMessage,
  fallback = 'There was a problem with your request',
}) {
  if (status === 200) return false;

  const statuses = {
    500: 'There was a problem with the server, try again later',
    404: 'There was a problem connecting to the server. Make sure you are connected to the internet',
  };

  if (errorMessage) {
    return errorMessage;
  }

  return statuses[status] || fallback;
}

function getDelay(delayMs, offset = numToMs(0), multiplier = 1) {
  const numDelay = msToNum(delayMs) * multiplier;
  return cssProps({ delay: numToMs((msToNum(offset) + numDelay).toFixed(0)) });
}
