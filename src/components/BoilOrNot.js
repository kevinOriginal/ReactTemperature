import React from 'react';

const BoilOrNot = (props) => {
  if (props.celsius >= 100) {
    return (
      <p>보글보글 물이 끓습니다!.</p>
    );
  }
  return (
    <p>물이 아직은 끓지 않네요...</p>
  );
}

export default BoilOrNot;
