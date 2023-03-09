import React from 'react';
import './App.scss';

// API: https://www.wordsapi.com/ 每天超過2500字的話要錢，有音節，不確定能否一次打量打下來做成資料庫，另外自己編資料庫也較麻煩
// API: https://dictionaryapi.dev/ 免費，有音檔，沒音節
// 母音vowel: a,e,i,o,u
// 子音consonant

function Answer (props) {
  return (
    <button className='answer'>{props.value}</button>
  )
}

function Answers (props) {
  const answers = props.answers
  let answerBoxes = [];

  for (let i = 0; i < answers.length; i++) {
    answerBoxes.push(<Answer key={i} value="   " />)
  }

  return (<div className="answers">
    {answerBoxes}
  </div>);
}

function Option(props) {
  return (
    <button className='option'>{props.value}</button>
  )
}

function Options (props) {
  const options = props.answers
  let optionBoxes = [];
  
  for (let i = 0; i < options.length; i++) { 
    optionBoxes.push(<Option key={i} value={options[i]} />)
  }

  function compareRandom(a, b) {
    return Math.random() - 0.5;
  }

  let shuffledOptionBoxes = [...optionBoxes]
  shuffledOptionBoxes.sort(compareRandom)

  return (<div className="options">
    {shuffledOptionBoxes}
  </div>)
}

function Tools ()  {
  return(<div className="tools-container">
    <button>母音提示</button>
    <button>子音提示</button>
    <button>←</button>   
  </div>)
}

class Vocabulary extends React.Component {
  // renderSquare(i) {
  //   return (
  //       <Square 
  //         value={this.props.squares[i]}
  //         onClick={() => this.props.onClick(i)}
  //       />
  //   );
  // }

  // 應該在這層就確認是哪一種 mode

  render() {
    const currentVocab = this.props.currentVocab
    const answers = this.props.syllableMode ? currentVocab.syllables.lists : currentVocab.word

    return (
    <div className='answering-container'>
        <Answers answers={answers} />
        <Options answers={answers} />
        <Tools />
    </div>
    );
  }
}

class Controller extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      currentVocabIndex: 0,
      syllableMode: true,
      vocabs: [
        {
          id: 0,
          word: "competition",
          syllables: {
            count: 4,
            lists: ["com", "pe", "ti", "tion"]
          },
          ch: "競賽"
        },
        {
          id: 1,
          word: "anticipate",
          syllables: {
            count: 4,
            lists: ["an", "ti", "ci", "pate"]
          },
          ch: "預期"
        },
        {
          id: 2,
          word: "alongside",
          syllables: {
            count: 2,
            lists: ["along", "side"]
          },
          ch: "沿著"
        },
        {
          id: 3,
          word: "alternate",
          syllables: {
            count: 3,
            lists: ["al", "ter", "nate"]
          },
          ch: "替代"
        },
        {
          id: 4,
          word: "anonymous",
          syllables: {
            count: 4,
            lists: ["a", "no", "ny", "mous"]
          },
          ch: "匿名"
        }
      ],
    }
  }


  render() {
    const currentVocabList = this.state.vocabs;
    const currentVocab = currentVocabList[this.state.currentVocabIndex];

    return (
      <div className="container">
        <h1>Simple English Vocabulary Dictation and Phonics Practice</h1>
        <button className="play-sound">播放聲音</button>
        <Vocabulary currentVocab={currentVocab} syllableMode={this.state.syllableMode} />
      </div>
    );
  }
}

function App() {
  return (
    <Controller />
  );
}

export default App;
