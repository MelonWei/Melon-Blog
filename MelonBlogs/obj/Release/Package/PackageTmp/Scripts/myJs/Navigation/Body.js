var React = require('react');
var ReactDOM = require('react-dom');
var Overlay = require('react-bootstrap').Overlay;
var AlertPopover = require('./AlertPopover').default;
var Tab = require('react-bootstrap').Tab;
var Row = require('react-bootstrap').Row;
var Col = require('react-bootstrap').Col;
var Nav = require('react-bootstrap').Nav;
var NavItem = require('react-bootstrap').NavItem;
var Right = require('./Right').default;
var Button = require('react-bootstrap').Button;
var UserForm = require('./UserForm').default;
import { Modal, ProgressBar} from 'react-bootstrap';


class Body extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            alertShown: 0,
            userList: [],
            waiting: false
        }
        this.alertShowFunc = this.alertShowFunc.bind(this)
        this.getData = this.getData.bind(this)
        this.showWaiting = this.showWaiting.bind(this)
    }
    showWaiting(val) {
        this.setState({ waiting: val })
    }
    componentDidMount() {
        this.getData()
    }
    getData() {
        this.showWaiting(true)
        fetch("../home/GetUserData", {
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json'
            }
        }).then((res) => res.json())
            .then((list) => {
                this.setState({
                    userList: list
                }, () => {
                    this.showWaiting(false)
                    });
            });
    }
    alertShowFunc(val) {
        this.setState({ alertShown: val }, () => {
            this.showWaiting(false)
            setTimeout(() => {
            this.setState({ alertShown: 0 })
            }, 1000)
        });
    }
    render() {
        var leftItems = [];
        var rightItems = [];
        for (var i = 0; i < this.state.userList.length; i++) {
            leftItems.push({ 'key': i, 'value': <NavItem key={i} eventKey={this.state.userList[i].Id} > {this.state.userList[i].Name} </NavItem> });
            rightItems.push({ 'key': i, 'value': <Right showWaiting={this.showWaiting} alertShowFunc={this.alertShowFunc} key={i} userId={this.state.userList[i].Id} /> });
        }
        let generateChildId = (eventKey, type) => { return `${this.props.id}-${type}-${eventKey}` }
        let closeWaiting = () => this.setState({ waiting: false });
        return (
            <Tab.Container generateChildId={generateChildId} defaultActiveKey={1}>
                <Row className="clearfix">
                    <Col sm={2}>
                        <Nav bsStyle="pills" stacked>
                            {
                                leftItems.map(function (item) {
                                    return item.value
                                })
                            }
                            <NavItem eventKey={-1}> New Navigaion Page </NavItem> 
                        </Nav>
                    </Col>
                    <Col sm={10}>
                        <Tab.Content animation>
                            {
                                rightItems.map(function (item) {
                                    return item.value
                                })
                            }
                            <Tab.Pane eventKey={-1}>
                                <UserForm />
                            </Tab.Pane>
                        </Tab.Content>
                    </Col>
                    <Overlay
                        show={this.state.alertShown != 0}
                        onHide={() => this.setState({ alertShown: 0 })}
                        container={this}
                        rootClose={true}
                    >
                        <AlertPopover type={this.state.alertShown} />
                    </Overlay>
                    <Modal
                        show={this.state.waiting}
                        style={{ paddingTop: '18%' }}
                    >
                        <div style={{ height: 20 }}>
                            <ProgressBar active now={100} />
                        </div>
                    </Modal>
                </Row>
            </Tab.Container>
        );
    }
}

export default Body