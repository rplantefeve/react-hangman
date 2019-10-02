import React from 'react';
import './App.css';

import shuffle from 'lodash.shuffle';

import Button from './Button';

const MOTS = [
  'synallagmatique',
  'reactance',
  'simulacre',
  'roquette',
  'flexueux',
  'pugilat',
  'trieuseensacheuse',
  'thalassotherapie',
  'incipit',
  'anticonstitutionnellement',
  'hyperpresidentialisation',
  'supercalifragilisticexpialidocious',
  'dichlorodiphenyltrichloroethane'
];

const ALPHABET = [
  'a',
  'b',
  'c',
  'd',
  'e',
  'f',
  'g',
  'h',
  'i',
  'j',
  'k',
  'l',
  'm',
  'n',
  'o',
  'p',
  'q',
  'r',
  's',
  't',
  'u',
  'v',
  'w',
  'x',
  'y',
  'z'
];

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      mots: this.shuffleWords(),
      usedLetters: new Set(),
      position: 0
    }
  }

  // Mélange les mots
  shuffleWords() {
    return shuffle(MOTS);
  }

  getWordFromList(position) {
    return this.state.mots[position];
  }

  // Produit une représentation textuelle de l’état de la partie,
  // chaque lettre non découverte étant représentée par un _underscore_.
  // (CSS assurera de l’espacement entre les lettres pour mieux
  // visualiser le tout).
  computeDisplay(phrase) {
    return phrase.replace(/\w/g, (letter) => (
      this.state.usedLetters.has(letter)
      ? letter
      : '_'))
  }

  handleClick = index => {
    // ajout de la lettre aux lettres utilisées
    console.log(index);
    this.setState({
      usedLetters: this.state.usedLetters.add(ALPHABET[index])
    });
  }

  handleKeyVisibility(letter) {
    if (this.state.usedLetters.has(letter)) {
      return ' disabled';
    } else {
      return '';
    }
  }

  handleRestart() {
    this.setState((state) => {
        // Important: read `state` instead of `this.state` when updating.
        return {position: state.position + 1, usedLetters: new Set()}
      });
  }

  render() {
    const mot = this.getWordFromList(this.state.position);
    const inputValue = this.computeDisplay(mot);
    const won = !inputValue.includes('_');

    let width = (mot.length + 1) * 9;
    return (<div className="App">
      <div className="App-header">
        <p className="App-title">Jeu du pendu</p>
      </div>
      <div>
        <input className="App-input" type="text" style={{
            width: `${width}px`
          }} value={inputValue} readOnly="readOnly"/>
      </div>
      {
        won ? (
          <>
          <p> Gagné !</p>
          <button onClick={() => this.handleRestart()}>Recommencer</button>
          </>
          ) : (
      <div className="App-keyboard">

          {ALPHABET.map((letter, index) => (
            <Button key={index} onClick={this.handleClick} letter={letter} index={index} visibility={this.handleKeyVisibility(letter)}/ >))}

      </div>)}
    </div>)
  }

}

export default App;
