import React, { Component } from 'react';
import './App.css';
//Task 2. Make REST call to kirjastot.fi api and display result as table
var Libraries = [];

class App extends Component {

    constructor() {
    super();
    this.handleChange = this.handleChange.bind(this);
    this.fetchLibraries = this.fetchLibraries.bind(this);
    this.state = {            
            city : null,
            data: null,
            libraries: [],
            libraryCount: null,
        };
    } 

handleChange(event) {
    this.setState({
        city: event.target.value
    });
}

fetchLibraries() {
  fetch('https://api.kirjastot.fi/v3/organisation?city.name=' + this.state.city)
      .then((response) => response.json())
      .then((responseData) => {

        Libraries = []; // Make array empty again for new results.

        for (var i = 0; i < responseData.total; i++ ) {
            try{
                    if (responseData.items[i].name.fi.length > 1) { // Push results to array
                        Libraries.push({
                            name: responseData.items[i].name.fi, 
                            homepage: responseData.items[i].homepage.fi
                        });
                    }                  
            }
            catch(err) {
                console.log('Räjähtää: ' + err);
            }
        }

        this.setState({
            libraries : Libraries,
            data: responseData, 
            libraryCount: 'Libraries found: ' + Libraries.length
        });

      });
 }

render() {    
    return (
        <div>
            Town: <input type='text' value={this.state.value} onChange={this.handleChange}/>
            <button onClick={this.fetchLibraries}>Fetch Libraries</button><br/> 

            {this.state.libraryCount}

            <hr/>

            <Result data={this.state.libraries}/>

        </div>
        );
    }
}

// Component for library table
class Result extends Component {
  render() {    
   var rows = this.props.data.map(item =>
        <ResultItem item={item}/>
    );
    return (
            <table>
                <thead>
                <tr>
                    <th>Library</th>
                    <th>WWW-Address</th>
                </tr>
                </thead>
                    <tbody>{rows}</tbody>
            </table>
        );
    }
}

// Component for one table row
class ResultItem extends Component {
  render() {
    return (
        <tr>       
            <td>{this.props.item.name}</td>
            <td>{this.props.item.homepage}</td>
        </tr>
        );
    }
}

export default App;