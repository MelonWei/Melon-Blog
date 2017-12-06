import React, { Component, PropTypes } from 'react';
import ReactDOM from 'react-dom';

import { Panel, InputGroup, DropdownButton, MenuItem, FormControl } from 'react-bootstrap';

class CellModel extends Component {
    constructor(props) {
        super(props)
        this.state = {
            name: this.props.name,
            url: this.props.url,
            preUrl: 'https://'
        }
        this.save = this.save.bind(this);
    }
    inputEvent() {
        if (this.state.name && this.state.url && this.state.name.length < 30 && this.state.url.length < 200) {
            this.props.setButtonState(false);
        } else
            this.props.setButtonState(true);
    }
    save() {
        this.props.showWaiting(true)
        $.ajax({
            url: "../Home/AddBookmark",
            type: "POST",
            data: JSON.stringify({
                "category": this.props.category,
                "name": this.state.name,
                "url": this.state.preUrl + this.state.url,
                "userId": this.props.curUserId
            }),
            contentType: "application/json; charset=utf-8",
            dataType: "json",
            success: (res) => {
                this.props.setSaveResult(res.ok);
            }
        })
    }
    render() {
        let bookmarkName = this.state.name;
        let nameEvent = (event) => { this.setState({ name: event.target.value }, () => { this.inputEvent() }) }
        let urlEvent = (event) => { this.setState({ url: event.target.value }, () => { this.inputEvent() }) }
        let preUrlEvent = (event) => { this.setState({ preUrl: event.target.text }) }
        return (<div className='container-fluid'>
            <h3><span className='label label-default'>书签名称</span></h3>
            <input type='text' className='form-control' placeholder='请控制在30字以内' value={bookmarkName} onChange={nameEvent} />
            <h3><span className='label label-default'>Url地址</span></h3>
            <InputGroup>
                <DropdownButton
                    componentClass={InputGroup.Button}
                    id="input-dropdown-addon"
                    title={this.state.preUrl}
                >
                    <MenuItem onClick={preUrlEvent} >Https://</MenuItem>
                    <MenuItem onClick={preUrlEvent} >Http://</MenuItem>
                </DropdownButton>
                <FormControl type="text" placeholder='目前仅支持200字符以内的url' id='basic-url' value={this.state.url} onChange={urlEvent} />
            </InputGroup>
        </div>);
    }
}

export default CellModel