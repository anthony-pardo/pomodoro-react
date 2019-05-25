import React, { Component } from 'react'
import {
    Container,
    Row,
    Col,
} from 'reactstrap';
import TimerDisplay from './TimerDisplay';
import TimeType from './TimeType';
import ProgressBar from './ProgressBar';

const Button1 = (props) => <button className="btn btn-success button1" onClick={props.action}>{props.children}</button>
const ButtonInc = (props) => <button className="btn btn-primary buttonIncDec" onClick={props.action}>+ 5 minutes</button>
const ButtonDec = (props) => <button className="btn btn-warning buttonIncDec" onClick={props.action}>- 5 minutes</button>
const SaveButton = (props) => <button className="btn btn-secondary" onClick={props.action}>Save</button>



export default class Timer extends Component {
    constructor (props) {
        super(props);

        this.state = {
            breakTime: 300,
            workTime: 1500,
            seconds: 1500,
            timerId: false,
            active: 'workTime',
            tallies: 0,
            activity: 'not specified',
        }

        this.playStop = this.playStop.bind(this);
        this.updateTime = this.updateTime.bind(this);

    }

    updateTime() {
        this.setState(function(prevState, props) {
            const currentState = Object.assign(prevState);
            const stillActive = (prevState.seconds - 1) > 0;
            const nextTimer = prevState.active === 'workTime' ? 'breakTime' : 'workTime'
    
            currentState.seconds = stillActive ? currentState.seconds - 1 : currentState[nextTimer];

            if ( (currentState.seconds === 1) && (currentState.active === 'workTime') )
                currentState.tallies = currentState.tallies + 1;
                
            currentState.active = stillActive ? currentState.active : nextTimer;
            if (this.timerID) {
            currentState.timerId = this.timerID;
            }
            return currentState;
        });
    }


    incrementTime = () => {
        this.setState({
            seconds : this.state.seconds + 5 * 60
        })
    }

    decrementTime = () => {
        this.setState({
            seconds : this.state.seconds - 5 * 60
        })
    }
    
       
    playStop() {
        if (this.state.timerId) {
            clearInterval(this.state.timerId);

            return this.setState({
                seconds: this.state.workTime,
                timerId: false,
                active: 'workTime'
            });
        }

        this.timerID = setInterval(() => this.updateTime(), 1000)
    }
         
    updateLength(timer, e) {
        if (this.state.timerId) {
            return false;
        }
    
        const state = Object.assign({}, this.state);
        state[timer] = e.target.value * 60;
        state.seconds = timer === 'workTime' ? e.target.value * 60 : state.seconds
        this.setState(state);
    }



    render() {
        const buttonString = this.state.timerId ? 'Stop' : 'Start';

        return (
            <div>
                <Container>
                    <div>
                    <h1 className="main-title text-center">Pomodoro Timer</h1>
                    </div>

                            <Row>
                                <Col>
                                    <p>
                                        <ButtonInc className="button" action={this.incrementTime} updateLength={this.updateLength.bind(this)}/>
                                    </p>
                                    <p>
                                        <ButtonDec action={this.decrementTime} updateLength={this.updateLength.bind(this)}/>
                                    </p>
                                </Col>
                                    
                                <Col>
                                    <p>
                                        <Button1
                                            action={this.playStop}
                                            color="success"
                                            size="large"
                                        >
                                            {buttonString}
                                        </Button1>
                                    </p>
                                    <TimerDisplay active={this.state.active} seconds={this.state.seconds}/>
                                </Col>
                                <Col>
                                    <TimeType value={this.state.workTime} timer="workTime" updateLength={this.updateLength.bind(this)}>Minutes of work</TimeType>
                                    <TimeType value={this.state.breakTime} timer="breakTime" updateLength={this.updateLength.bind(this)}>Minutes of break</TimeType>
                                </Col>
                                
                            </Row>
                        </Container>
                    
                            
                        <ProgressBar tallies={this.state.tallies}/>                            
                        

                    </div>
        )
    }
}