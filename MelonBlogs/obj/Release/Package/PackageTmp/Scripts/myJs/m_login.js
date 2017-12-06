
var React = require('react');
var ReactDOM = require('react-dom');
var LoginTouch = require('./Login_Touch/LoginTouch').default;
import {
    Container,
    amStyles,
    view,
    NavBar
} from 'amazeui-touch';

import '../../Content/style.scss';

ReactDOM.render(<Container fill direction="column">
    <view style={{ height: '92%' }}>
        <Container>
            <NavBar title="Melon's Blog" amStyle="dark" />
        </Container>
        <Container fill scrollable style={{ background: 'white' }}>
            <LoginTouch />
        </Container>
    </view>
</Container>, document.getElementById('app'));
