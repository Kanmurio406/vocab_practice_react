import React from 'react';
import logo from './logo.svg';
import './App.css';

// API: https://www.wordsapi.com/ 每天超過2500字的話要錢，有音節，不確定能否一次打量打下來做成資料庫，另外自己編資料庫也較麻煩
// API: https://dictionaryapi.dev/ 免費，有音檔，沒音節
// 母音vowel: a,e,i,o,u
// 子音consonant
const levelFive = [
  "ally",
  "alongside",
  "alter",
  "alternate",
  "amend",
  "ample",
  "analyst",
  "anonymous",
  "anticipate",
  "antique"
];

const syllablesVocabs = [
  {
    id: 1,
    word: "competition",
    syllables: {
      count: 4,
      lists: ["com", "pe", "ti", "tion"]
    },
    ch: "競賽"
  },
  {
    id: 2,
    word: "anticipate",
    syllables: {
      count: 4,
      lists: ["an", "ti", "ci", "pate"]
    },
    ch: "預期"
  }
];

function Answers(props) {
  return (<div class="answers">

  </div>)
}

function Options(props) {
  return (<div class="options">

  </div>)
}

function Tools(props) {
  return(<div class="tools">

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

  render() {
    return (
    <div>
        <Answers />
        <Options />
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
      syllablesVocabs: [
        {
          id: 1,
          word: "competition",
          syllables: {
            count: 4,
            lists: ["com", "pe", "ti", "tion"]
          },
          ch: "競賽"
        },
        {
          id: 2,
          word: "anticipate",
          syllables: {
            count: 4,
            lists: ["an", "ti", "ci", "pate"]
          },
          ch: "預期"
        }
      ],
      vocabs: [
        "ally",
        "alongside",
        "alter",
        "alternate",
        "amend",
        "ample",
        "analyst",
        "anonymous",
        "anticipate",
        "antique"
      ],
    }
  }


  render() {
    const currentVocabList = this.state.syllableMode ? this.state.syllablesVocabs : this.state.vocabs;
    const currentVocab = currentVocabList[this.state.currentVocabIndex];


    return (
      <div>
        <button>播放聲音</button>
        <Vocabulary vocab={currentVocab} />
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
