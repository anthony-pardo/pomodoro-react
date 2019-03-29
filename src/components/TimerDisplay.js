import React, { Component } from 'react'

export default class TimerDisplay extends Component {
    twoDigits(num) {
      return num > 9 ? "" + num : "0" + num;
    }
  
    convertToHhMmSs(seconds) {
      const h = this.twoDigits(Math.floor(seconds / 3600));
      const m = this.twoDigits(Math.floor((seconds % 3600) / 60));
      const s = this.twoDigits(Math.floor(seconds % 3600 % 60));
      return `${h}:${m}:${s}`;
    };
  
    render() {
      var remainingTime = this.convertToHhMmSs(this.props.seconds);
      var activeTimer = this.props.active === 'workTime' ? 'Working' : 'Break';
  
      return (
        <div className="timer">
          <p className="timer__description">{activeTimer}</p>
          <p className="timer__time">{remainingTime}</p>
        </div>
      )
    }
  }