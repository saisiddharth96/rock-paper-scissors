import React, { Component } from "react";
import "./App.css";

import Rock from "./asstes/rock.png";
import Paper from "./asstes/paper.png";
import Scissors from "./asstes/scissors.png";

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      userScore: 0,
      computerScore: 0,
      isDrawn: false,
      userChoice: "",
      computerChoice: "",
      showMessage: false
    };
  }

  getUserChoice = choice => {
    switch (choice) {
      case "r":
        this.setState({
          userChoice: "Rock",
          isDrawn: false,
          showMessage: true
        });
        break;
      case "p":
        this.setState({
          userChoice: "Paper",
          isDrawn: false,
          showMessage: true
        });
        break;
      default:
        this.setState({
          userChoice: "Scissors",
          isDrawn: false,
          showMessage: true
        });
        break;
    }
  };

  updateComputerScore = () => {
    this.setState({ computerScore: this.state.computerScore + 1 });
  };

  updateUserScore = () => {
    this.setState({ userScore: this.state.userScore + 1 });
  };

  getComputerChoice = () => {
    const choice = ["r", "p", "s"];
    let getRandChoice = Math.floor(Math.random() * 3);
    // console.log(`${choice[getRandChoice]} Computer choice`)
    switch (choice[getRandChoice]) {
      case "r":
        this.setState({ computerChoice: "Rock" });
        break;
      case "p":
        this.setState({ computerChoice: "Paper" });
        break;
      default:
        this.setState({ computerChoice: "Scissors" });
        break;
    }
    return choice[getRandChoice];
  };

  gameDraw = () => {
    this.setState({ isDrawn: true });
    console.log("DraW!!");
    return "Its a draw";
  };

  game = userChoice => {
    this.getUserChoice(userChoice);
    let computerChoice = this.getComputerChoice();
    const mainLogic = userChoice + computerChoice;
    switch (mainLogic) {
      // user win cases
      case "rs":
      case "sp":
      case "pr":
        this.updateUserScore();
        break;
      case "rp":
      case "ps":
      case "sr":
        this.updateComputerScore();
        break;
      default:
        this.gameDraw();
        break;
    }
  };

  updateScoreMessage = () => {
    return (
      <div className="winner">
        {this.state.isDrawn ? (
          <h1 id="draw">It's a Draw!!</h1>
        ) : (
          <div className="winner-message-div">
            <h1> {this.state.userChoice} </h1>
            <h4>(User)</h4>
            <h1 id="wins"> wins over</h1>
            <h1>{this.state.computerChoice}</h1>
            <h4>(Comp)</h4>
          </div>
        )}
      </div>
    );
  };

  endGame = () => {
    this.setState({
      userScore: 0,
      computerScore: 0,
      userChoice: "",
      computerChoice: "",
      showMessage: false
    });
  };

  render() {
    return (
      <div className="parent-container">
        <header className="App-header">
          <h1>Rock Paper Scissors!</h1>
          <h2>Let's Play</h2>
        </header>
        <div className="scoreboard">
          <div className="score-div" id="player-score">
            <h1> User</h1>
          </div>
          <div className="score-div" id="computer-score">
            <h1>Computer</h1>
          </div>
          <div className="score">
            <h1 id="player" className="score-text">
              {this.state.userScore}
            </h1>
            <p id="colon">:</p>
            <h1 className="score-text" id="computer">
              {this.state.computerScore}
            </h1>
          </div>
        </div>
        {this.state.showMessage ? this.updateScoreMessage() : null}
        <div className="choices">
          <img
            src={Rock}
            alt={Rock}
            className="rps"
            onClick={() => this.game("r")}
          />
          <img
            src={Paper}
            alt={Paper}
            className="rps"
            id="paper-img"
            onClick={() => this.game("p")}
          />
          <img
            src={Scissors}
            alt={Scissors}
            className="rps"
            onClick={() => this.game("s")}
          />
        </div>
        <button className="end-game" onClick={() => this.endGame()}>
          End Game
        </button>
      </div>
    );
  }
}

export default App;
