import PropTypes from 'prop-types';
import { getRemainingTime, formatTime } from './utils.js';
import styled from 'styled-components';

const CountdownTimer = ({ id, timer, handlePlayAndPause, handleReset }) => {
  const { hours, minutes, seconds } = getRemainingTime(timer);

  return (
    <Wrapper className='cluster'>
      <div className='timer-container cluster'>
        <span>{formatTime(hours)}</span> : <span>{formatTime(minutes)}</span> :{' '}
        <span>{formatTime(seconds)}</span>
      </div>
      <div className='btn-container cluster'>
        <button
          type='button'
          className='btn'
          onClick={() => handlePlayAndPause(id)}
        >
          {timer.isRunning ? 'Start' : 'Pause'}
        </button>
        <button
          type='button'
          className='btn btn-outline'
          onClick={() => handleReset(id)}
        >
          Reset
        </button>
      </div>
    </Wrapper>
  );
};

CountdownTimer.propTypes = {
  id: PropTypes.string.isRequired,
  timer: PropTypes.number.isRequired,
  handlePlayAndPause: PropTypes.func.isRequired,
  handleReset: PropTypes.func.isRequired
};

const Wrapper = styled.article`
  --cluster-horizontal-alignment: center;

  width: var(--view-width);
  max-width: var(--fixed-width);
  padding: 2rem 2.5rem;
  margin: var(--space-xl) auto;
`;

export default CountdownTimer;
