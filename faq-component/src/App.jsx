import { FAQ } from './data.js';
import FAQComponent from './FAQComponent.jsx';
import styled from 'styled-components';

const App = () => {
  return (
    <Wrapper className='wrapper'>
      <h1>Frequently Asked Questions</h1>
      <FAQComponent questions={FAQ} />
    </Wrapper>
  );
};

const Wrapper = styled.main`
  h1 {
    text-align: center;
  }
`;

export default App;
