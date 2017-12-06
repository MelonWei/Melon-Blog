import React from 'react'
var Button = require('react-bootstrap').Button;

class Cell extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            siteName: this.props.name,
            siteUrl: this.props.site
        }
        this.delete = this.delete.bind(this)
        this.handleClick = this.handleClick.bind(this)
    }
    delete(e) {
        e.stopPropagation()
        e.nativeEvent.stopImmediatePropagation();
        this.props.showWaiting(true)
        $.ajax({
            url: "../Home/DelBookmark",
            type: "POST",
            data: JSON.stringify({
                "category": this.props.category,
                "name": this.state.siteName,
                "url": this.state.siteUrl,
                "userId": this.props.curUserId
            }),
            contentType: "application/json; charset=utf-8",
            dataType: "json",
            success: (res) => {
                this.props.setSaveResult(res.ok);
            }
        })
    }
    handleClick() {
        window.open(this.state.siteUrl, 'newwindow');
        console.log(this);
    }
    render() {
        return (
            <div className='col-md-2'>
                <div className='btn btn-default btn-block' onClick={this.handleClick} role='del'>
                    <button type='button' onClick={e => this.delete(e)} className='close' data-dismiss='del' aria-label='Close'>
                        <span aria-hidden='true'>&times;</span></button>
                    <span className='glyphicon glyphicon-bookmark' aria-hidden='true'></span> {this.state.siteName}
                </div>
            </div>
        )
    }
}

export default Cell