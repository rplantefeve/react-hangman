import React from 'react';
import './App.css';

import shuffle from 'lodash.shuffle';

import Button from './Button';
import Image from './Image';

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
  'dichlorodiphenyltrichloroethane',
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
  'z',
];

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      mots: this.shuffleWords(),
      usedLetters: new Set(),
      position: 0,
      guesses: 0,
    };
  }

  // Mélange les mots
  shuffleWords() {
    return shuffle(MOTS);
  }

  getCurrentWord() {
    return this.state.mots[this.state.position];
  }

  // Produit une représentation textuelle de l’état de la partie,
  // chaque lettre non découverte étant représentée par un _underscore_.
  // (CSS assurera de l’espacement entre les lettres pour mieux
  // visualiser le tout).
  computeDisplay(phrase) {
    return phrase.replace(/\w/g, letter =>
      this.state.usedLetters.has(letter) ? letter : '_'
    );
  }

  handleClick = index => {
    const letter = ALPHABET[index];
    // ajout de la lettre aux lettres utilisées
    console.log(index + ':' + letter);
    let penalite = 0;
    // si la lettre ne fait pas partie du mot
    if (this.getCurrentWord().search(letter) === -1) {
      penalite = 1;
    }
    this.setState(state => {
      return {
        usedLetters: state.usedLetters.add(letter),
        guesses: state.guesses + penalite,
      };
    });
  };

  handleKeyVisibility(letter) {
    if (this.state.usedLetters.has(letter)) {
      return ' disabled';
    } else {
      return '';
    }
  }

  handleRestart() {
    this.setState(state => {
      // Important: read `state` instead of `this.state` when updating.
      return {
        position: state.position + 1,
        usedLetters: new Set(),
        guesses: 0,
      };
    });
  }

  render() {
    const mot = this.getCurrentWord();
    const inputValue = this.computeDisplay(mot);
    const won = !inputValue.includes('_');
    const lost = this.state.guesses === 10;
    let width = (mot.length + 1) * 9;
    // image en fonction du nombre d'essais
    let image = '';
    if (this.state.guesses < 10) {
      image = '0' + this.state.guesses;
    } else {
      image += this.state.guesses;
    }
    console.log(image);
    return (
      <div className="App">
        <div className="App-header">
          <p className="App-title">Jeu du pendu</p>
        </div>
        <div>
          <input
            className="App-input"
            type="text"
            style={{
              width: `${width}px`,
            }}
            value={inputValue}
            readOnly="readOnly"
          />
        </div>
        {won ? (
          <>
            <p>Gagné !</p>
            <button onClick={() => this.handleRestart()}>Recommencer</button>
          </>
        ) : lost ? (
          <>
            <p>Perdu !</p>
            <button onClick={() => this.handleRestart()}>Recommencer</button>
          </>
        ) : (
          <div className="App-keyboard">
            {ALPHABET.map((letter, index) => (
              <Button
                key={index}
                onClick={this.handleClick}
                letter={letter}
                index={index}
                visibility={this.handleKeyVisibility(letter)}
              />
            ))}
          </div>
        )}
        <div className="App-footer">
          <Image guesses={image} />
        </div>
      </div>
    );
  }
}

export default App;
