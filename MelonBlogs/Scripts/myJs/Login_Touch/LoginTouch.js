import React from 'react';
import {
    BrowserRouter as Router,
    Link,
} from 'react-router-dom';
import {
    Container,
    Field,
    Button,
    List,
    Icon,
} from 'amazeui-touch';

class LoginTouch extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            name: '',
            phone: ''
        }
        this.handleSubmit = this.handleSubmit.bind(this)
    }

    componentDidMount() {
        // cookie
        var objString = this.getCookie("mb_login");
        if (objString) {
            var obj = JSON.parse(objString)
            this.setState({ "name": obj.name, "phone": obj.tel })
        }
    }

    setCookie(name, value) {
        var Days = 30;
        var exp = new Date();
        exp.setTime(exp.getTime() + Days * 24 * 60 * 60 * 1000);
        document.cookie = name + "=" + escape(value) + ";expires=" + exp.toGMTString();
    }

    getCookie(name) {
        var arr, reg = new RegExp("(^| )" + name + "=([^;]*)(;|$)");
        if (arr = document.cookie.match(reg))
            return unescape(arr[2]);
        else
            return null;
    }

    handleSubmit(e) {
        //e.preventDefault();
        this.setCookie("mb_login", JSON.stringify({ "name": this.state.name, "tel": this.state.phone }))
    }

    render() {
        let nameEvent = (event) => { this.setState({ name: event.target.value }) }
        let phoneEvent = (event) => { this.setState({ phone: event.target.value }) }

        let fields = [
            {
                placeholder: 'Input your name',
                type: 'text',
                icon: 'person',
                name: 'userName',
                value: this.state.name||'',
                onChange: nameEvent
            },
            {
                placeholder: 'Input your phone number',
                type: 'text',
                icon: 'info',
                name: 'userTel',
                value: this.state.phone||'',
                onChange: phoneEvent
            }
        ];
        return (
            <Container {...this.props}>
                <form method="post" action="../touch/Login">
                    <List>
                        {fields.map((field, i) => {
                            return (
                                <List.Item
                                    key={i}
                                    media={<Icon name={field.icon} />}
                                    nested="input"
                                >
                                    <Field
                                        {...field}
                                    />
                                </List.Item>
                            );
                        })}
                    </List>
                    <Field
                        value="提交"
                        type="submit"
                        amStyle="dark"
                        block
                        onClick={this.handleSubmit}
                    />
                </form>
            </Container>
        )
    }
}

export default LoginTouch