var React = require('react');
var ReactDOM = require('react-dom');
var Group = require('./Group').default;
var Panel = require('react-bootstrap').Panel;
var PanelGroup = require('react-bootstrap').PanelGroup;
var Modal = require('react-bootstrap').Modal;
var Tab = require('react-bootstrap').Tab;
var Button = require('react-bootstrap').Button;

class Right extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            userId: this.props.userId,
            colNum: 0,
            data: [],
            showcateModal: false,
            buttonState: false,
            cateName: '',
        }
        this.getNavData = this.getNavData.bind(this)
        this.inputEvent = this.inputEvent.bind(this)
    }
    componentDidMount() {
        this.getNavData(this.state.userId)
    }
    inputEvent() {
        if (this.state.cateName) {
            this.setState({ buttonState: true });
        } else {
            this.setState({ buttonState: false });
        }
    }
    getNavData() {
        fetch(`../home/GetAllData?id=${this.state.userId}`, {
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json'
            }
        }).then((res) => res.json())
            .then((list) => {
                this.setState({
                    colNum: list.length,
                    data: list
                });
            });
    }
    savecateData() {
        this.props.showWaiting(true)
        $.ajax({
            url: "../Home/SaveCategory",
            type: "POST",
            data: JSON.stringify({
                "category": this.state.cateName,
                "userId": this.state.userId
            }),
            contentType: "application/json; charset=utf-8",
            dataType: "json",
            success: (res) => {
                this.props.alertShowFunc(res.ok ? 1 : -1)
                this.getNavData()
            }
        })
    }
    render() {
        var items = [];
        for (var i = 0; i < this.state.colNum; i++) {
            items.push({ 'key': i, 'value': <Group key={i} showWaiting={this.props.showWaiting} getNavData={this.getNavData} curUserId={this.props.userId} alertShowFunc={this.props.alertShowFunc} data={this.state.data[i]} /> });
        }
        let addbookcate = () => this.setState({ showcateModal: true })
        let closeModal = () => this.setState({ showcateModal: false })
        let saveAndClose = () => {
            this.savecateData();
            this.setState({ showcateModal: false });
        }
        const titleC = (<div onClick={addbookcate}>
            <span className='glyphicon glyphicon-plus' aria-hidden='true'></span>&nbsp;&nbsp;&nbsp;点击添加分类</div>);
        let nameEvent = (event) => { this.setState({ cateName: event.target.value }, () => { this.inputEvent() }) }
        return (
            <Tab.Pane eventKey={this.state.userId}>
                <PanelGroup accordion>
                    {
                        items.map(function (item) {
                            return item.value;
                        })
                    }
                    <Panel header={titleC}>
                        请先添加分类
                    </Panel>
                </PanelGroup>
                <Modal show={this.state.showcateModal} onHide={closeModal}>
                    <Modal.Header closeButton>
                        <Modal.Title>添加书签分类</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <h3><span className='label label-default'>书签分类名称</span></h3>
                        <input type='text' className='form-control' value={this.state.cateName} onChange={e => nameEvent(e)} />
                    </Modal.Body>
                    <Modal.Footer>
                        <Button bsStyle="primary" disabled={!this.state.buttonState} onClick={saveAndClose}>Submit</Button>
                        <Button onClick={closeModal}>Cancel</Button>
                    </Modal.Footer>
                </Modal>
            </Tab.Pane>
        );
    }

}

export default Right