import React from 'react';

const HomePage = props => {
  props.history.push('/drivers');
  return (
    <div>
      <h1>HomePage</h1>
    </div>
  );
};

export default HomePage;
