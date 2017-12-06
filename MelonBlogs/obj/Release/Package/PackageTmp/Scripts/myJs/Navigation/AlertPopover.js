var React = require('react');
var ReactDOM = require('react-dom');

class AlertPopover extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            style: this.props.type == 1 ? { backgroundColor: '#dff0d8' }
                : this.props.type == -1 ? { backgroundColor: '#f2dede' }
                    : { backgroundColor: '#EEE' },
            text: this.props.type == 1 ? 'Yes! Operation completed!'
                : this.props.type == -1 ? 'Oh snap! You got an error! Please try it again!'
                    : ''
        }
    }
    render() {
        return (<div
            style={{
                ...this.state.style,
                position: 'absolute',
                boxShadow: '0 5px 10px rgba(0, 0, 0, 0.2)',
                border: '1px solid #CCC',
                borderRadius: 3,
                marginLeft: 34,
                marginTop: -20,
                padding: 10,
                zIndex: 1050,
                width: '90%'
            }}
        >
            <strong>{this.state.text}</strong>
        </div>);
    }

}

export default AlertPopover