var React = require('react');
var ReactDOM = require('react-dom');
var Carousel = require('react-bootstrap').Carousel;

class Home extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
        }
    }
    render() {
        return (<Carousel>
            <Carousel.Item>
                <div className='container'><div className='jumbotron'>
                    <h1>Welcome to Melon's blog!</h1>
                    <p>Now, this blog is currently under development.</p>
                    <p><a className='btn btn-primary btn-lg' href='/touch/login' role='button'>Use Touch</a></p>
                </div></div>
            </Carousel.Item>
            <Carousel.Item>
                <div className='text-center'><img width={1200} height={330} alt="1200x330" src="../img/2.jpg" /></div>
                <Carousel.Caption>
                    <h3>Second slide label</h3>
                    <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p>
                </Carousel.Caption>
            </Carousel.Item>
            <Carousel.Item>
                <div className='text-center'><img width={1200} height={330} alt="1200x330" src="../img/3.jpg" /></div>
                <Carousel.Caption>
                    <h3>Third slide label</h3>
                    <p>Praesent commodo cursus magna, vel scelerisque nisl consectetur.</p>
                </Carousel.Caption>
            </Carousel.Item>
        </Carousel>);
    }

}

export default Home