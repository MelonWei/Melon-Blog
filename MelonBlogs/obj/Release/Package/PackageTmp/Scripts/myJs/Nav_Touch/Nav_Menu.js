import React from 'react';
import {
    BrowserRouter as Router,
    Link,
} from 'react-router-dom';
import {
    Container,
    Group,
    Button,
    OffCanvas,
    OffCanvasTrigger,
    List,
} from 'amazeui-touch';

class Nav_Menu extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            userList: []
        }
        this.getData = this.getData.bind(this)
        this.onDismiss = this.onDismiss.bind(this)
    }
    componentDidMount() {
        this.getData()
    }
    onDismiss(e) {
        // 从 OffCanvas 内部元素关闭 OffCanvas
        // 紧耦合，需要重构 OffCanvas
        this.refs.oct.close();
    }
    getData() {
        fetch("../../home/GetUserData", {
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json'
            }
        }).then((res) => res.json())
            .then((list) => {
                this.setState({
                    userList: list
                });
            });
    }
    render() {
        return (
            <div>
                <h3 className="margin">用户切换</h3>
                <List>
                    {
                        this.state.userList.map((user, i) => {
                            return (
                                <List.Item
                                    key={user.Id}
                                    linkComponent={Link}
                                    linkProps={{
                                        to: `/touch/nav/${user.Id}`,
                                        onClick: this.onDismiss,
                                    }}
                                    title={user.Name}
                                />
                            )
                        })
                    }
                </List>
            </div>
        )
    }
}

export default Nav_Menu