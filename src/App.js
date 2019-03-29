import React, { Component } from 'react';
import {
    Jumbotron,
} from 'reactstrap';
import Timer from './components/Timer';

class App extends Component {
    constructor(props) {
        super(props);

        this.toggle = this.toggle.bind(this);
        this.state = {
            isOpen: false
        };
    }
    toggle() {
        this.setState({
            isOpen: !this.state.isOpen
        });
    }
    render() {
        return (
            <div>
                <Jumbotron>
                    <Timer/>
                </Jumbotron>
            </div>
        );
    }
}

export default App;
