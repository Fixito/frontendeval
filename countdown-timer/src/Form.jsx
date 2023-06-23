import PropTypes from 'prop-types';
import { convertTimeToMs } from './utils.js';
import styled from 'styled-components';

const Form = ({ id, setTimers }) => {
  const handleSubmit = (e) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const timerData = Object.fromEntries(formData);
    if (!timerData.hours && !timerData.minutes && !timerData.seconds) return;

    const timerInMs = convertTimeToMs(timerData);
    setTimers((prevTimers) => {
      return prevTimers.map((timer) => {
        if (timer.id === id) {
          return { ...timer, showTimer: true, time: timerInMs };
        }

        return timer;
      });
    });

    e.currentTarget.reset();
  };

  return (
    <Wrapper className='flow' onSubmit={handleSubmit}>
      <div>
        <label htmlFor='message' className='visually-hidden'>
          Message
        </label>
        <input
          type='text'
          name='message'
          id='message'
          className='form-input'
          placeholder='Message'
        />
      </div>
      <div className='cluster'>
        <label htmlFor='hours' className='visually-hidden'>
          Hours
        </label>
        <input
          type='number'
          name='hours'
          id='hours'
          min='0'
          max='60'
          className='form-input'
          placeholder='HH'
        />{' '}
        :{' '}
        <label htmlFor='minutes' className='visually-hidden'>
          Minutes
        </label>
        <input
          type='number'
          name='minutes'
          id='minutes'
          min='0'
          max='60'
          className='form-input'
          placeholder='MM'
        />{' '}
        :{' '}
        <label htmlFor='seconds' className='visually-hidden'>
          Seconds
        </label>
        <input
          type='number'
          name='seconds'
          id='seconds'
          min='0'
          max='60'
          className='form-input'
          placeholder='SS'
          defaultValue='3'
        />
        <button type='submit' className='btn'>
          Start
        </button>
      </div>
    </Wrapper>
  );
};

Form.propTypes = {
  id: PropTypes.string.isRequired,
  setTimers: PropTypes.func.isRequired
};

const Wrapper = styled.form`
  --cluster-horizontal-alignment: space-between;

  width: var(--view-width);
  max-width: var(--fixed-width);
  padding: 2rem 2.5rem;
  margin: var(--space-xl) auto;

  .form-input {
    background: var(--white);
  }
`;

export default Form;
