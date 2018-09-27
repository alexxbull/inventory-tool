import React, { Component } from 'react';
import './App.css';
import ModifyItem from './components/ModifyItem'
import { BrowserRouter, Route } from 'react-router-dom'
import Table from './components/Table'
import NavHeader from './components/NavHeader'

class App extends Component {
  constructor(props) {
    super(props)

    this.state = {
      editItem: {},
      itemList: [],
      originalList: [],
      search: "",
    }

    this.loadItems = this.loadItems.bind(this)
    this.handleSearch = this.handleSearch.bind(this)
    this.loadItems()

    document.title = "Inventory Tool";
  }

  // load items from database
  loadItems = async () => {
    try {
      const response = await fetch('https://still-caverns-97420.herokuapp.com/items/view')
      const items = await response.json()

      // sort items by name by default
      this.handleSort("name", items)(null)
      this.setState(
        {
          itemList: items,
          originalList: items,
        })
    }
    catch (err) {
      console.log("error", err)
    }
  }

  // handle edit events
  handleEditItem = (item) => () => {
    // save the item to edit
    this.setState({ editItem: item })
  }

  // delete item with given id
  handleDeleteItem = (id) => () => {
    fetch("https://still-caverns-97420.herokuapp.com/items/delete", {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json; charset=utf-8;",
        "ID": id.toString(),
      },
    })

    // remove deleted item from list
    const newItems = this.state.itemList.filter(item => item.ID !== id)
    this.setState({ itemList: newItems })
  }

  // sort table rows based on the column header clicked
  handleSort = (type = null, newItems = null) => () => {
    // make a copy of the current list of items
    if (!newItems)
      newItems = [...this.state.itemList];

    // sort function for strings
    const stringSort = (a, b) => {
      if (a < b)
        return -1;

      if (a > b)
        return 1;

      return 0
    }

    // sort table rows
    switch (type) {
      case "name":
        newItems.sort((a, b) => stringSort(a.Name.toLowerCase(), b.Name.toLowerCase()))
        break;

      case "price":
        newItems.sort((a, b) => a.Price - b.Price)
        break;

      case "color":
        newItems.sort((a, b) => stringSort(a.Color.toLowerCase(), b.Color.toLowerCase()))
        break;

      case "condition":
        newItems.sort((a, b) => stringSort(a.Condition.toLowerCase(), b.Condition.toLowerCase()))
        break;

      default:
        break;
    }

    this.setState({ itemList: newItems })
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

  render() {
    return (
      <BrowserRouter>
        <div className="App">
          <NavHeader />

          {/* Table Display */}
          <Route
            path="/viewitems" exact
            render={(props) =>
              <Table {...props}
                search={this.handleSearch.bind(this)}
                sort={this.handleSort}
                edit={this.handleEditItem}
                delete={this.handleDeleteItem}
                items={this.state.itemList} />}
          />

          {/* Add Item Route */}
          <Route
            path="/" exact
            render={(props) =>
              <ModifyItem {...props}
                reloadItems={this.loadItems} />}
          />

          {/* Edit Item Route */}
          <Route
            path="/edititem" exact
            render={(props) =>
              <ModifyItem {...props}
                item={this.state.editItem}
                ID={JSON.parse(this.state.editItem).ID}
                Name={JSON.parse(this.state.editItem).Name}
                Price={JSON.parse(this.state.editItem).Price}
                Color={JSON.parse(this.state.editItem).Color}
                Condition={JSON.parse(this.state.editItem).Condition}
                reloadItems={this.loadItems} />}
          />
        </div >
      </BrowserRouter>
    );
  }
}

export default App;
