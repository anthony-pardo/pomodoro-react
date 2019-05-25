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
      var activeTimer = this.props.active === 'workTime' ? 'Work' : 'Break';
  
      return (
        <div className="timer">
          <p className="timer_description">{activeTimer}</p>
          <p className="timer_time">{remainingTime}</p>
        </div>
      )
    }
  }