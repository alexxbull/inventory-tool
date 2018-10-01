import React, { Component } from 'react'
import './App.css'
import ModifyItem from './components/ModifyItem'
import { BrowserRouter, Route } from 'react-router-dom'
import Table from './components/Table'
import NavHeader from './components/NavHeader'
import UserForm from './components/UserForm'

// const serverURL = 'http://localhost:8080'
const serverURL = 'https://still-caverns-97420.herokuapp.com'

class App extends Component {
  constructor(props) {
    super(props)

    this.state = {
      editItem: {},
      itemList: [],
      originalList: [],
      search: '',
      UserID: '',
    }

    this.loadItems = this.loadItems.bind(this)
    this.handleSearch = this.handleSearch.bind(this)
    this.handleSignOut = this.handleSignOut.bind(this)

    document.title = 'Inventory Tool'
  }



  // delete item with given id
  handleDeleteItem = (ID) => () => {
    fetch(`${serverURL}/items/delete`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json charset=utf-8",
        "ID": ID.toString(),
      },
    })

    // remove deleted item from list
    const newItems = this.state.itemList.filter(item => item.ID !== ID)
    this.setState({ itemList: newItems })
  }

  // handle edit events
  handleEditItem = (item) => () => {
    // save the item to edit
    this.setState({ editItem: item })
  }

  // display only items matching search term
  handleSearch = (event) => {
    const search = event.target.value
    this.setState({ search: search })

    // reload all items from database if search field is empty
    if (search === "")
      this.loadItems()

    // only display items whose case-insensitive name matches the search term
    else {
      const newItems = this.state.originalList.filter(item => item.Name.toLowerCase().startsWith(search))
      this.setState({ itemList: newItems })
    }
  }

  // sign out current user
  handleSignOut = () => {
    this.setState({
      editItem: {},
      itemList: [],
      originalList: [],
      search: '',
      UserID: '',
    })
  }

  // sort table rows based on the column header clicked
  handleSort = (type = null, newItems = null) => () => {
    // make a copy of the current list of items
    if (!newItems)
      newItems = [...this.state.itemList]

    // sort function for strings
    const stringSort = (a, b) => {
      if (a < b)
        return -1

      if (a > b)
        return 1

      return 0
    }

    // sort table rows
    switch (type) {
      case 'Name':
        newItems.sort((a, b) => stringSort(a.Name.toLowerCase(), b.Name.toLowerCase()))
        break

      case 'Price':
        newItems.sort((a, b) => a.Price - b.Price)
        break

      case 'Color':
        newItems.sort((a, b) => stringSort(a.Color.toLowerCase(), b.Color.toLowerCase()))
        break

      case 'Condition':
        newItems.sort((a, b) => stringSort(a.Condition.toLowerCase(), b.Condition.toLowerCase()))
        break

      default:
        break
    }

    this.setState({ itemList: newItems })
  }


  // load the user's list 
  loadUser = (UserID) => {
    this.setState({ UserID: UserID })
  }

  // load items from database
  loadItems = async () => {
    try {
      const response = await fetch(`${serverURL}/items/view`, {
        method: "GET",
        headers: {
          'Content-Type': 'application/json',
          'UserID': this.state.UserID,
        }
      })
      const items = await response.json()

      // sort items by name by default
      this.handleSort('Name', items)(null)
      this.setState(
        {
          itemList: items,
          originalList: items,
        })
    }
    catch (err) {
      console.log('error', err)
    }
  }

  render() {
    const { editItem, itemList, UserID } = this.state

    return (
      <BrowserRouter>
        <div>
          {/* show login page if no UserID is set */
            !UserID
              ?
              <UserForm loadUser={this.loadUser} />
              :
              /* show list of user's items */
              <div>
                <NavHeader
                  UserID={UserID}
                  SignOut={this.handleSignOut} />
                {/* Table Display */}
                < Route
                  path={`/profile/${UserID}/viewitems`} exact
                  render={(props) =>
                    <Table {...props}
                      search={this.handleSearch.bind(this)}
                      sort={this.handleSort}
                      edit={this.handleEditItem}
                      delete={this.handleDeleteItem}
                      items={itemList}
                      reload={this.loadItems}
                      UserID={UserID} />}
                />

                {/* add ttem route */}
                <Route
                  path={`/profile/${UserID}/additem`} exact
                  render={(props) =>
                    <ModifyItem {...props}
                      reloadItems={this.loadItems}
                      UserID={UserID} />}
                />

                {/* edit item route */}
                <Route
                  path={`/profile/${UserID}/edititem`} exact
                  render={(props) =>
                    <ModifyItem {...props}
                      item={editItem}
                      UserID={UserID}
                      reloadItems={this.loadItems} />}
                />
              </div>
          }
        </div >
      </BrowserRouter>
    )
  }
}

export default App
