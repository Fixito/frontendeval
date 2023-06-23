import { useEffect, useRef, useState } from 'react';
import Form from './Form.jsx';
import CountdownTimer from './CountdownTimer.jsx';
import Title from './Title.jsx';
import { getRemainingTime, formatTime } from './utils.js';
import styled from 'styled-components';
import { nanoid } from 'nanoid';

const App = () => {
  const [timers, setTimers] = useState([
    {
      id: nanoid(),
      showTimer: false,
      time: null,
      isRunning: false,
      intervalID: null,
      message: ''
    }
  ]);
  const audioRef = useRef(null);

  useEffect(() => {
    timers.forEach((timer) => {
      const { hours, minutes, seconds } = getRemainingTime(timer.time);
      if (timer.isRunning) {
        document.title = `${formatTime(hours)} : ${formatTime(
          minutes
        )} : ${formatTime(seconds)}`;
      }
      if (timer.time === 0) {
        clearInterval(timer.intervalID);
        if (audioRef) {
          audioRef.current.play();
        }
        alert(timer.message);
      }
    });
  }, [timers]);

  const handlePlayAndPause = (id) => {
    setTimers((prevTimers) => {
      return prevTimers.map((timer) => {
        if (timer.id === id) {
          if (timer.intervalID) {
            clearInterval(timer.intervalID);
            return {
              ...timer,
              time: timer.time - 1000,
              isRunning: false,
              intervalID: null
            };
          } else {
            const timerID = setInterval(() => {
              setTimers((prevTimers) => {
                return prevTimers.map((timer) => {
                  if (timer.id === id && timer.time > 0) {
                    return {
                      ...timer,
                      time: timer.time - 1000,
                      isRunning: true
                    };
                  }
                  return timer;
                });
              });
            }, 1000);
            return { ...timer, intervalID: timerID, isRunning: true };
          }
        }
        return timer;
      });
    });
  };

  const handleReset = (id) => {
    setTimers((prevTimers) => {
      return prevTimers.map((timer) => {
        if (timer.id === id) {
          clearInterval(timer.intervalID);
          audioRef.current.pause();
          audioRef.current.currentTime = 0;
          document.title = 'Countdown timer';
          return {
            ...timer,
            time: null,
            isRunning: false,
            intervalID: null,
            message: ''
          };
        }
        return timer;
      });
    });
  };

  const addTimer = () => {
    const newTimer = {
      id: nanoid(),
      showTimer: false,
      time: null,
      isRunning: false,
      intervalID: null,
      message: ''
    };
    setTimers((prevTimers) => [...prevTimers, newTimer]);
  };

  return (
    <Wrapper className='container'>
      <section className='section'>
        <Title title='Countdown timer' />
        {timers.map((timer) => {
          const { id, showTimer, time, isRunning } = timer;

          if (showTimer) {
            return (
              <CountdownTimer
                key={id}
                id={id}
                timer={time}
                handlePlayAndPause={handlePlayAndPause}
                handleReset={handleReset}
                isRunning={isRunning}
              />
            );
          } else {
            return <Form key={id} setTimers={setTimers} id={id} />;
          }
        })}
        <audio
          ref={audioRef}
          preload='auto'
          src='https://raw.githubusercontent.com/freeCodeCamp/cdn/master/build/testable-projects-fcc/audio/BeepSound.wav'
        />
        <div className='btn-container'>
          <button className='btn' onClick={addTimer}>
            Add timer
          </button>
        </div>
      </section>
    </Wrapper>
  );
};

const Wrapper = styled.main`
  .btn-container {
    max-width: var(--fixed-width);
    margin-inline: auto;
    padding-inline: 2.5rem;
    text-align: center;
  }
`;

export default App;
