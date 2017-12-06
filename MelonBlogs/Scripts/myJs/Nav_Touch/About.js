import React from 'react';
import ReactDOM from 'react-dom';

import {
    Container,
    NavBar,
    Group,
} from 'amazeui-touch';

class About extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            year: new Date().getFullYear()
        }
    }

    render() {
        
        return (
            <Container>
                <Group
                    header="关于 Melon's Blog"
                    footer={`ver 1.0.0`}
                >
                    <p>随便搞搞</p>
                </Group>
                <Group
                    header="版权"
                >
                    <p>Melon © 2017 - {this.state.year} </p>
                </Group>
                <Group
                    header="UA"
                >
                    <p><code>{navigator.userAgent}</code></p>
                </Group>
            </Container>
        )
    }
}

export default About;