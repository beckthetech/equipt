import React, { Component } from 'react';
import './App.css';
import { Route, NavLink, Redirect } from 'react-router-dom';
import * as itemsAPI from '../../services/items-api';

import userService from '../../utils/userService';
import SignupPage from '../../pages/SignupPage/SignupPage';
import LoginPage from '../../pages/LoginPage/LoginPage';

import NavBar from '../../components/NavBar/NavBar';
import ItemListPage from '../../pages/ItemList/ItemListPage';
import AddItemPage from '../../pages/AddItemPage/AddItemPage';
import ItemDetailPage from '../ItemDetailPage/ItemDetailPage';
import EditItemPage from '../../pages/EditItemPage/EditItemPage'

class App extends Component {
  state = {
    items: [],
    choices: [],
    user: userService.getUser(),
  };

  handleSignupOrLogin = () => {
    this.setState({ user: userService.getUser() });
  }

  handleLogout = () => {
    userService.logout();
    this.setState({ user: null });
  }

  handleAddItem = async newItemData => {
    const newItem = await itemsAPI.create(newItemData);
    this.setState(state => ({
      items: [...state.items, newItem]
    }),
      () => this.props.history.push('/'));
  }

  handleUpdateItem = async updatedItemData => {
    const updatedItem = await itemsAPI.update(updatedItemData);
    const newItemsArray = this.state.items.map(e =>
      e._id === updatedItem._id ? updatedItem : e
    );
    this.setState(
      { items: newItemsArray },
      () => this.props.history.push('/')
    );
  }

  handleDeleteItem = async id => {
    await itemsAPI.deleteOne(id);
    this.setState(state => ({
      // Yay, filter returns a NEW array
      items: state.items.filter(item => item._id !== id)
    }), () => this.props.history.push('/'));
  }

  // Lifecycle Methods

  async componentDidMount() {
    const items = await itemsAPI.getAll();
    this.setState({ items });
  }

  render() {
    return (
      <div className="App">
        <header >
          <NavBar
            user={this.state.user}
            handleLogout={this.handleLogout}
          />
          Gear CR
          <nav>
            <NavLink exact to='/'>View Gear</NavLink>&nbsp;&nbsp;&nbsp;
            {this.state.user && <NavLink to='/add'>Add Item</NavLink>}
          </nav>
        </header>
        <main>
          <Route exact path='/' render={() =>
            <ItemListPage
              items={this.state.items}
            />
          } />
          <Route exact path='/details' render={({ location }) =>
            <ItemDetailPage location={location} handleDeleteItem={this.handleDeleteItem} user={this.state.user}/>
          } />
          <Route exact path='/add' render={() =>
            userService.getUser() ?
              <AddItemPage handleAddItem={this.handleAddItem}
              />
              :
              <Redirect to='/login' />
          } />
          <Route exact path='/edit' render={({ location }) =>
            userService.getUser() ?
              <EditItemPage handleUpdateItem={this.handleUpdateItem} location={location}
              />
              :
              <Redirect to='/login' />
          } />
          <Route exact path='/signup' render={({ history }) =>
            <SignupPage
              history={history}
              handleSignupOrLogin={this.handleSignupOrLogin} />
          } />
          <Route exact path='/login' render={({ history }) =>
            <LoginPage
              history={history}
              handleSignupOrLogin={this.handleSignupOrLogin}
            />
          } />
        </main>
      </div>
    )
  };
}

export default App;