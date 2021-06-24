function Answer(props) {
  // TODO: change button colors
  let btnStyle = 'btn-secondary'
  if (!props.questionEnabled) {
    if (props.answer.id !== props.correctAnswerId) {
      btnStyle = 'btn-danger'
    } else {
      btnStyle = 'btn-success'
    }
  }
  return (
    <div className="col-lg-4 col-md-6 col-sm-12 p-2">
      <button className={"btn " + btnStyle}
              disabled={!props.questionEnabled}
              onClick={() => {props.onAnswerSelected(props.answer.id)}}>{props.answer.text}</button>
    </div>
  );
}

function Continue(props) {
  let text = props.nextQuestionExists ? 'Next' : 'Done';
  return (
    <div>
      <button disabled={props.questionEnabled || !props.nextQuestionExists}
              onClick={props.nextEvent}
              className="btn btn-primary">{text}</button>
    </div>
  );
}

class QuizApp extends React.Component {
  constructor(props) {
    super(props);
    this.onAnswerSelected = this.onAnswerSelected.bind(this);
    this.getQuestion = this.getQuestion.bind(this);
    this.state = {
      error: null,
      correctAnswersCount: 0,
      answersCount: 0,
      question: null,
      questionEnabled: true,
      nextQuestionUrl: '/data/question-1.json'
    };
  }

  getQuestion() {
    console.info('---getQuestion---')
    fetch('https://reactjs-exercises.cansadadeserfeliz.com' + this.state.nextQuestionUrl, {
      cache: 'no-cache', // *default, no-cache
      headers: {
        "Accept": "application/json"
      }
    })
      .then(res => res.json())
      .then(
        (data) => {
          console.log(data)
          this.setState({
            question: data.question,
            nextQuestionUrl: data.nextQuestionUrl,
            error: null,
            questionEnabled: true,
          });
        },
        // Note: it's important to handle errors here
        // instead of a catch() block so that we don't swallow
        // exceptions from actual bugs in components.
        (error) => {
          this.setState({
            question: null,
            error: error.message,
          });
        }
      )
  }

  componentDidMount() {
    this.getQuestion();
  }

  onAnswerSelected(answerId) {
    this.setState((state, props) => ({
      answersCount: state.answersCount + 1,
      questionEnabled: false,
      correctAnswersCount: answerId === state.question.correctAwnswerId ? state.answersCount + 1 : state.answersCount,
    }));
  }

  render() {
    console.info('---render---')
    console.info(this.state)

    if (this.state.error) {
      return <div className="text-danger">{this.state.error}</div>
    }

    if (this.state.question === null) {
      return <div>Loading...</div>
    }

    return (
      <div>
        <h1 className="pb-2 border-bottom">Quiz</h1>
        <p>
          <span className="badge bg-success m-1">{this.state.correctAnswersCount}</span>
          /
          <span className="badge bg-dark m-1">{this.state.answersCount}</span>
        </p>
        <div className="d-flex my-2">
          <div className="flex-shrink-0">
            <img src={this.state.question.imageUrl} />
          </div>
          <div className="flex-grow-1 ms-3">
            <div className="p-3 mb-2 bg-light">{this.state.question.text}</div>
          </div>
        </div>
        <div className="d-flex flex-wrap align-content-between">{this.state.question.answers.map((answer) =>
            <Answer answer={answer}
                    questionEnabled={this.state.questionEnabled}
                    correctAnswerId={this.state.question.correctAnswerId}
                    onAnswerSelected={this.onAnswerSelected} key={answer.id} />)}</div>
        <Continue nextQuestionExists={Boolean(this.state.nextQuestionUrl)} nextEvent={this.getQuestion} questionEnabled={this.state.questionEnabled} />
      </div>
    );
  }
}

// render a React element into a root DOM node
ReactDOM.render(
  <QuizApp />,
  document.getElementById('root')
);
