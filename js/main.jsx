function Welcome(props) {
  return <h1>Здравствуй, {props.name}.</h1>;
}

class Clock extends React.Component {
  constructor(props) {
    super(props);
    this.state = {date: new Date()};
  }

  componentDidMount() {
    this.timerID = setInterval(
      () => this.tick(),
      1000
    );
  }

  tick() {
    this.setState({
      date: new Date()
    });
  }

  componentWillUnmount() {
    clearInterval(this.timerID);
  }

  render() {
    return (
      <div>
        <h2>Сейчас {this.state.date.toLocaleTimeString()}.</h2>
      </div>
    );
  }
}

function Avatar(props) {
  return (
    <div className="flex-shrink-0">
      <img src={props.user.avatarUrl} alt={props.user.name} />
    </div>
  );
}

function Comment(props) {
  return (
    <div className="d-flex">
      <Avatar user={props.author} />
      <div className="flex-grow-1 ms-3">
        {props.text}
        <div>
          <i>{props.date.toLocaleTimeString()}</i>
        </div>
      </div>
    </div>
  );
}
const comment = {
  date: new Date(),
  text: 'I hope you enjoy learning React!',
  author: {
    name: 'Hello Kitty',
    avatarUrl: 'https://placekitten.com/g/64/64',
  },
};

function App() {
  return (
    <div>
      <Welcome name="Алиса" />
      <Clock />
      <Comment
        date={comment.date}
        text={comment.text}
        author={comment.author}
      />
    </div>
  );
}

const element = <App />;

// render a React element into a root DOM node
ReactDOM.render(
  element,
  document.getElementById('root')
);
