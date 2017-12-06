var React = require('react');
var ReactDOM = require('react-dom');
var Button = require('react-bootstrap').Button;
var Modal = require('react-bootstrap').Modal;
var Cell = require("./Cell").default;
var CellModal = require("./CellModal").default;
var Panel = require('react-bootstrap').Panel;
var PanelGroup = require('react-bootstrap').PanelGroup;



class Group extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            cellNum: this.props.data.Sites.length,
            data: this.props.data.Sites,
            category: this.props.data.CategoryName,
            showModal: false,
            name: "",
            url: "",
            disabled: true
        }
        this.setButtonState = this.setButtonState.bind(this)
        this.setSaveResult = this.setSaveResult.bind(this)
        this.deletecate = this.deletecate.bind(this)
    }
    componentWillReceiveProps(nextProps) {
        this.setState({
            cellNum: this.props.data.Sites.length,
            data: this.props.data.Sites,
            category: this.props.data.CategoryName
        });
    }
    setButtonState(val) {
        this.setState({ disabled: val });
    }

    saveData() {
        this.refs.inputCell.save();
    }

    setSaveResult(val) {
        this.props.alertShowFunc(val ? 1 : -1);
        this.props.getNavData()
    }

    deletecate() {
        this.props.showWaiting(true);
        $.ajax({
            url: "../Home/DelCategory",
            type: "POST",
            data: JSON.stringify({
                "category": this.state.category,
                "userId": this.props.curUserId
            }),
            contentType: "application/json; charset=utf-8",
            dataType: "json",
            success: (res) => {
                this.setSaveResult(res.ok)
            }
        })
    }
    //@autobind
    render() {
        var items = [];
        for (var i = 0; i < this.state.cellNum; i++) {
            items.push({ 'key': i, 'value': <Cell key={this.state.data[i].Name} showWaiting={this.props.showWaiting} curUserId={this.props.curUserId} setSaveResult={this.setSaveResult} category={this.state.category} name={this.state.data[i].Name} site={this.state.data[i].Url} /> });
        }
        let addbookmark = () => this.setState({ showModal: true })
        let closeModal = () => this.setState({ showModal: false })
        let saveAndClose = () => {
            this.saveData();
            this.setState({ showModal: false });
        }
        const title = (<div><button type='button' onClick={this.deletecate} className='close' data-dismiss='delcate' aria-label='Close'>
            <span aria-hidden='true'>&times;</span></button>
            <span className='glyphicon glyphicon-book' aria-hidden='true'></span>&nbsp;&nbsp;&nbsp;{this.state.category}</div>);
        return (
            <Panel header={title}>
                {
                    items.map(function (item) {
                        return item.value;
                    })
                }
                <div className='col-md-2'>
                    <div className='btn btn-default btn-block' onClick={addbookmark}>
                        <span className='glyphicon glyphicon-plus' aria-hidden='true'></span> Add
                    </div>
                </div>
                <Modal show={this.state.showModal} onHide={closeModal}>
                    <Modal.Header closeButton>
                        <Modal.Title>添加书签</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <CellModal ref='inputCell' showWaiting={this.props.showWaiting} curUserId={this.props.curUserId} setSaveResult={this.setSaveResult} category={this.state.category} name={this.state.name} url={this.state.url} setButtonState={this.setButtonState} />
                    </Modal.Body>
                    <Modal.Footer>
                        <Button bsStyle="primary" ref="target" disabled={this.state.disabled} onClick={saveAndClose}>Submit</Button>
                        <Button onClick={closeModal}>Cancel</Button>
                    </Modal.Footer>
                </Modal>
            </Panel>
        )
    }
}

Group.defaultProps = {
    data: {}
}

export default Group