import PropTypes from 'prop-types';
import styled from 'styled-components';

const FAQComponent = ({ questions }) => {
  return (
    <Wrapper className='flow'>
      {questions.map((q, index) => {
        const { question, answer } = q;

        return (
          <details key={index} open={index === 0}>
            <summary>{question}</summary>
            <p>{answer}</p>
          </details>
        );
      })}
    </Wrapper>
  );
};

FAQComponent.propTypes = {
  questions: PropTypes.array.isRequired
};

const Wrapper = styled.article`
  details {
    border: 1px solid #000;
  }

  summary {
    display: block;
    position: relative;
    cursor: pointer;
    padding: 1rem;
    padding-left: 2.2rem;
    font-weight: 600;
  }

  summary {
    list-style: none;
  }

  summary::-webkit-details-marker {
    display: none;
  }

  summary::before {
    content: '';
    border-width: 0.4rem;
    border-style: solid;
    border-color: transparent transparent transparent #000;
    position: absolute;
    top: 1.3em;
    left: 1em;
    transform: rotate(0);
    transform-origin: 0.2rem 50%;
    transition: transform 0.3s ease;
  }

  details[open] > summary:before {
    transform: rotate(90deg);
  }

  details p {
    margin: 0;
    padding-block-end: 1rem;
    padding-left: 2.2rem;
    color: var(--grey-600);
  }
`;

export default FAQComponent;
