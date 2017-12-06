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
    Icon,
} from 'amazeui-touch';

class Nav_Body extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            colNum: 0,
            data: [],
            id: this.props.match.params.id
        }
        this.getNavData = this.getNavData.bind(this)
    }
    componentDidMount() {
        this.getNavData()
    }
    getNavData() {
        var userId = 1;
        if (this.state.id) {
            userId = this.state.id;
        }
        fetch(`../../home/GetAllData?id=${userId}`, {
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

    render() {
        var items = [];
        for (var i = 0; i < this.state.colNum; i++) {
            items.push({
                'key': i, 'value': <Group header={this.state.data[i].CategoryName} key={i} >
                    {this.state.data[i].Sites.map((site, j) => {
                        return (
                            <Button hollow key={j}
                                amStyle="dark"
                                target="_blank"
                                href={site.Url}
                            ><Icon name="star-filled" />{site.Name}</Button>
                        );
                    })}
                </Group>
            });
        }
        return (
            <Router>
                <div>
                    {
                        items.map(function (item) {
                            return item.value;
                        })
                    }
                </div>
            </Router>
        )
    }
}

export default Nav_Body