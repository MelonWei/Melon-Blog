var React = require('react');
var ReactDOM = require('react-dom');
var Form = require('react-bootstrap').Form;
var FormGroup = require('react-bootstrap').FormGroup;
var ControlLabel = require('react-bootstrap').ControlLabel;
var FormControl = require('react-bootstrap').FormControl;
var HelpBlock = require('react-bootstrap').HelpBlock;
var Button = require('react-bootstrap').Button;
var Col = require('react-bootstrap').Col;
var InputGroup = require('react-bootstrap').InputGroup;
var Glyphicon = require('react-bootstrap').Glyphicon;

class UserForm extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            name: '',
            phone: '',
            owner:''
        }
    }

    getOwnerValidationState() {
        if (this.state.owner=='魏梦龙') return 'success'
        else if (this.state.owner) return 'error'
        return null
    }
    getNameValidationState() {
        const length = this.state.name.length
        if (length > 0 && length < 6) return 'success'
        else if (length > 0 && length < 10) return 'warning'
        else if (length >= 10) return 'error'
        return null
    }
    getPhoneNumberValidationState() {
        var regex = /^((\+)?86|((\+)?86)?)0?1[3458]\d{9}$/;
        if (this.state.phone)
            if (regex.test(this.state.phone))
                return 'success'
            else
                return 'error'
        return null
    }
    nameChange(e) {
        this.setState({ name: e.target.value })
    }
    ownerChange(e) {
        this.setState({ owner: e.target.value })
    }
    phoneChange(e) {
        this.setState({ phone: e.target.value })
    }
    render() {
        return (<Form horizontal method="post" action="../home/Login">
            <FormGroup controlId="veriCode" validationState={this.getOwnerValidationState()}>
                <Col sm={10}>
                    <ControlLabel>Verification code:</ControlLabel>
                    <InputGroup>
                        <InputGroup.Addon>
                            <Glyphicon glyph="thumbs-up" />
                        </InputGroup.Addon>
                        <FormControl
                            type="text"
                            name="veriCode"
                            placeholder="Please tell me your verification code."
                            onChange={this.ownerChange.bind(this)}
                            value={this.state.owner} />
                    </InputGroup>
                    <FormControl.Feedback />
                    <HelpBlock>Please input right verification code.</HelpBlock>
                </Col>
            </FormGroup>
            <FormGroup controlId="userName" validationState={this.getNameValidationState()}>
                <Col sm={10}>
                    <ControlLabel>Your name:</ControlLabel>
                    <InputGroup>
                        <InputGroup.Addon>
                            <Glyphicon glyph="user" />
                        </InputGroup.Addon>
                        <FormControl
                            type="text"
                            name="userName"
                            placeholder="Please tell me your English nickname."
                            onChange={this.nameChange.bind(this)}
                            value={this.state.name} />
                    </InputGroup>
                    <FormControl.Feedback />
                    <HelpBlock>Please input name in 10 words.</HelpBlock>
                </Col>
            </FormGroup>
            <FormGroup controlId="userTel" validationState={this.getPhoneNumberValidationState()}>
                <Col sm={10}>
                    <ControlLabel>Your Phone number:</ControlLabel>
                    <InputGroup>
                        <InputGroup.Addon>
                            <Glyphicon glyph="phone" />
                        </InputGroup.Addon>
                        <FormControl
                            type="text"
                            name="userTel"
                            placeholder="Please input phone number with 11 numbers."
                            onChange={this.phoneChange.bind(this)}
                            value={this.state.phone} />
                    </InputGroup>
                    <FormControl.Feedback />
                    <HelpBlock>It is not essential.</HelpBlock>
                </Col>
            </FormGroup>
            <FormGroup>
                <Col smOffset={2} sm={10}>
                    <Button type="submit">
                        Submit
                    </Button>
                </Col>
            </FormGroup>
        </Form>);
    }
}

export default UserForm