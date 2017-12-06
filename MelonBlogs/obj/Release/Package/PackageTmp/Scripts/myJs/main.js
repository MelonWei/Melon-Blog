import 'bootstrap';
import '../classie';

var ReactDOM = require('react-dom');
var React = require('react');
var Container = require('./Navigation/Container').default;
var Home = require('./Home').default;

if ($("#apphidden").val()) {
    $("#Navigation").parent().addClass("active");
    ReactDOM.render(<Container />, document.getElementById('app'));
}
else
    ReactDOM.render(<Home />, document.getElementById('app'));
$("#BlogHome").click(function() {
    ReactDOM.render(<Home />, document.getElementById('app'));
    $(".nav .active").each(function(index, obj) {
        $(obj).removeClass("active");
    });
});
$("#Navigation").click(function() {
    ReactDOM.render(<Container />, document.getElementById('app'));
    $("#Navigation").parent().addClass("active");
});
