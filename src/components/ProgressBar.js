import React from 'react';
import { Progress } from 'reactstrap';

const ProgressBar = (props) => {
  return (
    <div>
      <Progress value={props.tallies * 12.5}/>
    </div>
  );
};

export default ProgressBar;