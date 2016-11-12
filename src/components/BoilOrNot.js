import React, { Component } from 'react';

function boilOrNot(props) {
  if (props.celcisus >= 100) {
    return (
      <p>보글보글 물이 끓습니다!.</p>;
    );
  }
  else {
    return (
      <p>물이 아직은 끓지 않네요...</p>
    );
  }
}
