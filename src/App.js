import * as tf from '@tensorflow/tfjs';
import React from 'react';
import './App.css';
import CSVReader from 'react-csv-reader';

export default class Main extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      consoleText: "",
      data: [],
      modelParams: {
        layers: null
      }
    }

    this.handleSubmit = this.handleSubmit.bind(this)
    this.handleCSV = this.handleCSV.bind(this)
  }

  render() {
    return (
      <span className="grid-container">
        <span className="grid-item">
          <ModelBuilder 
            onSubmit={this.handleSubmit} 
            handleCSV = {this.handleCSV}
          />
        </span>
        <span className="grid-item">
          <ConsoleView 
            text={this.state.consoleText} 
        />
        </span>
        <span className="grid-item">
          <ModelView />
        </span>
        <span className="grid-item">
          <PredictionView />
        </span>
      </span>
    );
  }

  handleCSV(csv_data) {
    this.setState({data: csv_data});
    this.log("Data Loaded.")
  }

  handleSubmit(e) {
    e.preventDefault();
    this.setState({modelParams: {layers: e.target[1].value}})
    this.compileModel();
  }

  normalizeData() {
    
  }

  compileModel() {
    this.normalizeData();

  }

  trainModel() {

  }

  predict() {
    
  }

  log(text) {
    this.setState((state) => ({
      consoleText: state.consoleText + '\n' + text
    }));
  }
}

class ModelBuilder extends React.Component {
  render() {
    return (
      <div>
        <h3>Model Builder</h3>
        <div>
          <CSVReader 
            label="Select CSV file."
            onFileLoaded={this.props.handleCSV}
          />
        </div>
        <form onSubmit={this.props.onSubmit}>
          <div>
            <label htmlFor="layers">
                # of Layers: 
            </label>
            <input
              id="layers"
              type="text"
            />
          </div>
          <button>Compile Model</button>
        </form>
      </div>
    );
  }
}

class ConsoleView extends React.Component {
  render() {
    return(
      <div>
        <h3>Console View</h3>
        <textarea readOnly value={this.props.text}/>
      </div>
    );
  }
}

class ModelView extends React.Component {
  render() {
    return(
      <h3>Model View</h3>
    );
  }
}

class PredictionView extends React.Component {
  render() {
    return(
      <h3>Prediction View</h3>
    );
  }


}
