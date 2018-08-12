import React, { Component } from 'react';
import './App.css';

class Line extends React.Component {
     constructor(props) {
         super(props);
         this.state = {class: (this.props.completed===false) ? "show" : "noshow"};
           
         this.press = this.press.bind(this);
     }
     press(){
         let className = (this.state.class==="noshow")?"show":"noshow";
         this.setState({class: className});
     }
    render() {
      return <div className="list-item"> 
        <span className={this.state.class+" title-item"}>{this.props.title}</span>
        <button className="button-item" onClick={this.press}>{(this.state.class==="noshow") ? 'Показать' : 'Скрыть'}</button> 
      </div>;
    }
}

class Lines extends React.Component {
 
    render() {

      return (        
        <div>
        <h1>{this.props.header}</h1>
        <div className="list-items">
          {
              this.props.data.map(function(item,index){
                  return <Line title={item.title} key={index} completed={item.completed} />
              })
          }
        </div>
        </div>);
    }
}
       
class App extends Component {
  constructor(props) {
     super(props);
     this.state = {getlist: [], error: ''};
  }
  
  componentDidMount() {
    fetch('https://jsonplaceholder.typicode.com/todos')
        .then((response) => {
            if (response.status < 200 || response.status >= 300) {
                return Promise.reject(new Error(response.statusText+' '+response.status))
            }
            return Promise.resolve(response)
        })
        .then((response) => response.json())
        .then((data) => {
            this.setState({ getlist: data, error: '' });        
        })
        .catch((e) => {
            this.setState({ getlist: {}, error: e.message });
        })        
  }
     
  render() {

    return (
        <div className="App">
          <Lines header="Просмотр списка" data={this.state.getlist}/>
          <div className="errorApp">{(this.state.error) ? 'Ошибка: '+this.state.error : ''}</div>
        </div>
    )

  }
}

export default App;
