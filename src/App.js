import React, { useState } from 'react';
import './App.scss';

// API: https://www.wordsapi.com/ 每天超過2500字的話要錢，有音節，不確定能否一次打量打下來做成資料庫，另外自己編資料庫也較麻煩
// API: https://dictionaryapi.dev/ 免費，有音檔，沒音節
// 母音vowel: a,e,i,o,u
// 子音consonant

// 可拖曳的選項
function DraggableItem(props) {
  const handleDragStart = (event) => {
    event.dataTransfer.setData('text/plain', props.value);
    event.target.style.cursor = 'grabbing';
  };

  const handleDragEnd = (event) => {
    event.target.style.cursor = 'grab';
  };

  return (
    <div
      draggable="true"
      onDragStart={handleDragStart}
      onDragEnd={handleDragEnd}
      style={{ cursor: 'grab', userSelect: 'none' }}
      className='option'
    >
      {props.value}
    </div>
  );
}

// 控制選項區塊的顯示 點擊後的回應
// 點選選項 取消選擇
// 按鈕關閉和開啟

function Options(props) {
  const options = props.answers
  let optionBoxes = [];

  for (let i = 0; i < options.length; i++) {
    optionBoxes.push(<DraggableItem key={i} value={options[i]} />)
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

// 擺放答案的區域
function DropZone(props) {

  const [droppedItem, setDroppedItem] = useState('');

  const handleDrop = (event) => {
    event.preventDefault();
    const data = event.dataTransfer.getData('text/plain');
    setDroppedItem(data);
    props.handleResponse(data, props.index);
  };

  const handleDragOver = (event) => {
    event.preventDefault();
  };

  return (
    <div
      onDrop={handleDrop}
      onDragOver={handleDragOver}
      className='answer'
    >
      {droppedItem ? props.response : "   "}
    </div>
  );
}

// 控制提示按鈕的顯示 點擊後的回應
// 按鈕關閉和開啟 一次只能用一種
function Answers (props) {
  const answers = props.answers
  let answerBoxes = [];

  for (let i = 0; i < answers.length; i++) {
    answerBoxes.push(<DropZone key={i} index={i} response={props.responses[i]} handleResponse={props.handleResponse} checkAnswer={props.checkAnswer} />)
  }

  return (<div className="answers">
    {answerBoxes}
  </div>);
}


// 控制提示按鈕的顯示 點擊後的回應
// 按鈕關閉和開啟 一次只能用一種
function Tools ()  {
  return(<div className="tools-container">
    <button>母音提示</button>
    <button>子音提示</button>
    {/* <button>←</button>    */}
  </div>)
}


// 控制單一題的答案 確認答案正確與否 聲音播放 中文顯示
class Vocabulary extends React.Component {
  // 應該在這層就確認是哪一種 mode
  constructor (props) {
    super(props);
    this.state = {
      responses: Array(4).fill(null)
    }
  }

  render() {
    const currentVocab = this.props.currentVocab
    const answers = this.props.syllableMode ? currentVocab.syllables.lists : currentVocab.word
    const answerString = this.props.syllableMode ? answers.join("") : answers

    const handleResponse =  (data, index) => {
      let newResponses = [...this.state.responses];
      newResponses[index] = data
      this.setState({
        responses: newResponses
      }, () => {
        checkAnswer()
      })
    }

    const checkAnswer = () => {
      if (this.state.responses.some((response => response === null))) return
      let responseString = this.state.responses.join("")
      if (responseString === answerString) {
        // 答案正確
        // 顯示通知
        // 往下一題
        console.log("correct!")
      } else {
        // 答案錯誤
        // 顯示通知
        // 重新答這題
        console.log("wrong!")
      }
    }

    return (
    <div className='answering-container'>
        <Answers answers={answers} responses={this.state.responses} handleResponse={handleResponse} checkAnswer={checkAnswer} />
        <Options answers={answers} />
        <Tools />
    </div>
    );
  }
}


// 控制完整題庫 答題時間 關卡切換 模式 主題顏色
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
        <h1>英文單字拼寫 & 音節練習機</h1>
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
