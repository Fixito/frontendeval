import PropTypes from 'prop-types';

const Title = ({ title }) => {
  return (
    <div className='title'>
      <h1>{title}</h1>
      <div className='title-underline'></div>
    </div>
  );
};

Title.propTypes = {
  title: PropTypes.string.isRequired
};

export default Title;
