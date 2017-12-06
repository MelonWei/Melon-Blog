import React from 'react';
import {
    BrowserRouter as Router,
    Link,
    Route,
    Switch
} from 'react-router-dom';
import {
    Container,
    Group,
    TabBar,
    Icon,
    Badge,
    amStyles,
    view,
    NavBar,
    OffCanvas,
    OffCanvasTrigger,
} from 'amazeui-touch';

var Nav_Menu = require('./Nav_Menu').default;
var Nav_Body = require('./Nav_Body').default;
var About = require('./About').default;

const TabBarDemo = React.createClass({
    getInitialState() {
        return {
            selected: 'home'
        };
    },

    handleClick(key, e) {
        e.preventDefault();

        this.setState({
            selected: key
        }, function () {
            alert('选中了：' + this.state.selected);
        });
    },

    render() {
        return (
            <TabBar
                style={{ height: '8%' }}
                amStyle="dark"
                onAction={this.handleClick}
            >
                <TabBar.Item
                    eventKey="home"
                    selected={this.state.selected === 'home'}
                    icon="pages"
                />
                <TabBar.Item
                    selected={this.state.selected === 'info'}
                    eventKey="info"
                    icon="info"
                />
            </TabBar>
        )
    }
});

const clickHandler = (item, e) => {
    e.preventDefault();
    item.component.getDefaultProps = () => {
        return {
            ref: 'oct',
            placement: 'left',
            animation: 'slide',
            onOpen: function onOpen() { },
            onClosed: function onClosed() { }
        }
    }
};

class Nav_Container extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            userList: [],
            id: $("#h_userId").val()
        }
    }
    render() {
        let withOffCanvas = {
            title: "Melon's Blog",
            leftNav: [{
                icon: 'bars',
                component: OffCanvasTrigger,
                isClone: true, // IMPORTANT
                offCanvas: <OffCanvas><Nav_Menu /></OffCanvas>
            }],
            onAction: clickHandler,
        };
        let homeUrl = "/touch/nav/" + this.state.id;
        return (
            <Router>
                <Container fill direction="column">
                    <view style={{ height: '92%' }}>
                        <Container>
                            <NavBar {...withOffCanvas} amStyle="dark" />
                        </Container>
                        <Container fill scrollable style={{ background: 'white' }}>
                            <Switch>
                                <Route exact path="/touch/nav/:id" component={Nav_Body} />
                                <Route path="/touch/about" component={About} />
                            </Switch>
                        </Container>
                    </view>
                    <TabBar
                        style={{ height: '8%' }}
                        amStyle="dark"
                    >
                        <TabBar.Item
                            component={Link}
                            eventKey="home"
                            icon="pages"
                            to={homeUrl}
                        />
                        <TabBar.Item
                            component={Link}
                            eventKey="info"
                            icon="info"
                            to="/touch/about"
                        />
                    </TabBar>
                </Container>
            </Router>
        )
    }
}

export default Nav_Container;