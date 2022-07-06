import React, { Component } from 'react';
import Cardlist from '../components/Cardlist';
import SearchBox from '../components/SearchBox';
import { connect } from 'react-redux';
import './App.css';
import Scroll from '../components/Scroll';
import ErrorBoundry from '../components/ErrorBoundry';
import { setSearchField } from '../actions';

const mapStateToProps = state => {
  return {
    searchField: state.searchField
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    onSearchChange: (event) => dispatch(setSearchField(event.target.value))
  }
}
class App extends Component {
  constructor(){
    super()
      this.state = {
        robots: [],
      }
  }

  componentDidMount(){
    fetch("https://jsonplaceholder.typicode.com/users")
    .then(response => response.json())
      .then(users => this.setState({ robots: users }));
  }

  render(){
    const { robots } = this.state;
    const { searchField, onSearchChange } = this.props;
    const filteredRobots = robots.filter(robot => {
      return robot.name.toLowerCase().includes(searchField.toLowerCase());
    })
    // Use ternary operator for destructuring
    return !robots.length ? 
      <h1 className='tc f4'>Loading...</h1> :
       (
        <div className='tc f2'>
          <h1>RoboFriends</h1>
          <SearchBox searchChange={onSearchChange}/>
          <Scroll>
            <ErrorBoundry>
              <Cardlist robots={filteredRobots} />
            </ErrorBoundry>
          </Scroll>
        </div>
      );
  }
}


export default connect(mapStateToProps, mapDispatchToProps)(App);
