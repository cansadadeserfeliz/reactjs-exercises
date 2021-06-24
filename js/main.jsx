const questions = [
  {
    id: 0,
    text: 'A stampede followed the coronation of Tsar Nicholas and his wife, Alexandra, in which an estimated 1,389 people died. What caused it?',
    imageUrl: 'https://placekitten.com/g/64/64',
    answers: [
      {
        id: 1,
        text: 'Crowds protesting about the fact that Nicholas had married a German woman'
      },
      {
        id: 2,
        text: 'Police opening fire when the celebrating crowd would not let the tsar\'s party through',
      },
      {
        id: 3,
        text: 'The organisers of a celebratory festival ran out of commemorative cups',
      }
    ],
    correctAnswerId: 3
  },
  {
    id: 1,
    text: 'Crafted by Peter Carl Fabergé, the jewelled eggs made for the imperial family were given as gifts to one another at Easter. How much is the most valuable egg estimated to be worth today?',
    imageUrl: 'https://placekitten.com/g/64/64',
    answers: [
      {
        id: 1,
        text: '£20 million'
      },
      {
        id: 2,
        text: '£200 million'
      },
      {
        id: 3,
        text: '£2 million'
      },
    ],
    correctAnswerId: 1
  },
  {
    id: 2,
    text: 'In January 1905, a Russian Orthodox priest and working class leader named Father Georgy Gapon organised a workers\' procession to present a written petition to the tsar. The event sparked \'Bloody Sunday\' when imperial soldiers fired on the unarmed procession, and marked the beginning of the 1905 revolution. Which of the following did Gapon not demand in his petition to Tsar Nicholas?',
    imageUrl: 'https://placekitten.com/g/64/64',
    answers: [
      {
        id: 1,
        text: 'Education for all, provided by the state'
      },
      {
        id: 2,
        text: 'Freedom of the press'
      },
      {
        id: 3,
        text: 'Women to be paid the same as men'
      }
    ],
    correctAnswerId: 3
  }
];

function Answer(props) {
  return (
    <div className="my-1">
      <button className="btn-secondary"
              disabled={!props.questionsEnabled}
              onClick={() => {props.onAnswerSelected(props.answer.id)}}>{props.answer.text}</button>
    </div>
  );
}

function Continue(props) {
  return (
    <div>
      <button className="btn-primary">Next</button>
    </div>
  );
}

class QuizApp extends React.Component {
  constructor(props) {
    super(props);
    this.onAnswerSelected = this.onAnswerSelected.bind(this);
    this.state = {
      correctAnswersCount: 0,
      answersCount: 0,
      question: questions[0],
      questionsEnabled: true,
    };
  }

  onAnswerSelected(answerId) {
    this.setState((state, props) => ({
      answersCount: state.answersCount + 1,
      questionsEnabled: false,
    }));
  }

  render() {
    console.info(this.state)
    return (
      <div>
        <h1>Quiz</h1>
        <div className="d-flex my-2">
          <div className="flex-shrink-0">
            <img src={this.state.question.imageUrl} />
          </div>
          <div className="flex-grow-1 ms-3">
            <div>{this.state.question.text}</div>
            <div>{this.state.question.answers.map((answer) =>
              <Answer answer={answer}
                      questionsEnabled={this.state.questionsEnabled}
                      onAnswerSelected={this.onAnswerSelected} key={answer.id} />)}</div>
          </div>
        </div>
        <Continue />
      </div>
    );
  }
}

const element = <QuizApp />;

// render a React element into a root DOM node
ReactDOM.render(
  element,
  document.getElementById('root')
);
