class Welcome extends React.Component {
  render() {
    return <h1>Здравствуй, {this.props.name}.</h1>;
  }
}

const name = 'Алиса';
const element = <Welcome name={name} />;

// render a React element into a root DOM node
ReactDOM.render(
  element,
  document.getElementById('root')
);
