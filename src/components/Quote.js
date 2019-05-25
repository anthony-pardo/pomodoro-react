import React from 'react';
import fetch from 'cross-fetch';

export default class Quote extends React.Component {
    constructor(props) {
      super(props);
      this.state = {
        error: null,
        isLoaded: false,
        quote: '',
      };
    }
  
    componentDidMount() {
      fetch("https://quotes.rest/qod.json")
        .then(res => res.json())
        .then(
          (result) => {
            this.setState({
              isLoaded: true,
              quote: '"' + result.contents.quotes[0].quote + '"' + ' ' + '-' + ' ' + result.contents.quotes[0].author,
            });
          },
          // Note: it's important to handle errors here
          // instead of a catch() block so that we don't swallow
          // exceptions from actual bugs in components.
          (error) => {
            this.setState({
              isLoaded: true,
              error
            });
          }
        )
    }
  
    render() {
      const { error, isLoaded, quote } = this.state;
      if (error) {
        return <div>Error: {error.message}</div>;
      } else if (!isLoaded) {
        return <div>Loading...</div>;
      } else {
        return (
            <div>
                <p>{this.state.quote}</p>
            </div>
        );
      }
    }
  }