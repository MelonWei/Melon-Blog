var React = require('react');
var ReactDOM = require('react-dom');
var Body = require('./Body').default;

class Container extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
        }
    }
    render() {
        return (<Body  source='../Home/GetAllData' id='Nav_body' />);
    }

}

export default Container