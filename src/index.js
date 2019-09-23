import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import * as tf from '@tensorflow/tfjs';
import * as d3 from 'd3';
import CSVReader from 'react-csv-reader';

class App extends React.Component {
    constructor(props) {
      super(props);
      // Currently saving every aspect of app in state
      this.state = {
        consoleText: "",
        data: [],
        normalizedData: [],
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
  
    // Saves CSV data into state
    handleCSV(csv_data) {
      this.log('Uploading data...')
      this.setState({data: csv_data});
      this.log('Features detected: ' + this.state.data[0])
      this.log(this.state.data)
    }
    
    // Handles ModelBuilder form submit.
    handleSubmit(e) {
      e.preventDefault();
      this.setState({modelParams: {layers: e.target[1].value}})
      this.compileModel();
    }
  
    // Normalizes data from raw CSV
    normalizeData() {
      this.log('Normalizing data...')
      feature1 = this.state.data.map();
      var scaler = d3.scaleLinear()
        .domain([0, 10])
        .range([0, 1]);
    }
    
    // Compiles model from modelParams
    compileModel() {
      this.normalizeData();
        
    }
  
    // Executes model.fit and logs progress
    trainModel() {
        
    }
  
    // Makes and plots prediction
    predict() {
  
    }
  
    log(text) {
      this.setState((state) => ({
        consoleText: state.consoleText + '\n' + text
      }));
    }
  }
  
  // Form for parameters and CSV file to be used
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
  
  // Simple text box that shows whats going on.
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
  
  // Chart that shows progress of model being trained
  class ModelView extends React.Component {
    render() {
      return(
        <h3>Model View</h3>
      );
    }
  }
  
  // Chart that shows progress of model being trained
  class PredictionView extends React.Component {
    render() {
      return(
        <h3>Prediction View</h3>
      );
    }
  
  
  }
  
ReactDOM.render(<App />, document.getElementById('root'));

