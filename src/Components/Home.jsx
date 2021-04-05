import React, { useEffect, useState } from 'react';
import {fade, makeStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import AddCircleIcon from '@material-ui/icons/AddCircle';
import IconButton from '@material-ui/core/IconButton';
import SearchIcon from '@material-ui/icons/Search';
import InputBase from '@material-ui/core/InputBase';
import Toolbar from '@material-ui/core/Toolbar';
import TextField from '@material-ui/core/TextField';
import MenuItem from '@material-ui/core/MenuItem';
import RemoveIcon from '@material-ui/icons/Remove';
import axios from 'axios';
import { connect } from "react-redux";
import { addToCart, increment , decrement } from '../Redux/Cart/action';
import { Button } from '@material-ui/core';
const useStyles = makeStyles((theme) => ({
  table: {
    minWidth: 650,
  },
  search: {
    position: 'relative',
    borderRadius: theme.shape.borderRadius,
    backgroundColor: fade(theme.palette.common.white, 0.15),
    '&:hover': {
      backgroundColor: fade(theme.palette.common.white, 0.25),
    },
    marginLeft: 0,
    width: '100%',
    [theme.breakpoints.up('sm')]: {
      marginLeft: theme.spacing(1),
      width: 'auto',
    },
  },
  marginLeft: {
    marginLeft: "15px"
  },
  searchIcon: {
    padding: theme.spacing(0, 2),
    height: '100%',
    position: 'absolute',
    pointerEvents: 'none',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  inputRoot: {
    color: 'inherit',
  },
  inputInput: {
    padding: theme.spacing(1, 1, 1, 0),
    // vertical padding + font size from searchIcon
    paddingLeft: `calc(1em + ${theme.spacing(4)}px)`,
    transition: theme.transitions.create('width'),
    width: '100%',
    [theme.breakpoints.up('sm')]: {
      width: '12ch',
      '&:focus': {
        width: '20ch',
      },
    },
  }
}));

function Home(props) {
  const classes = useStyles();
  const [grocery, setGrocery] = useState([]);
  const [search, setSearch] = useState({name : "" , category : ""});
  const [category, setCategory] = useState([]);
  const fetchGroceries = async () => {
    const groceryList = await  axios.get('https://api.mocki.io/v1/b8bead03');
    console.log("groceryList " , groceryList)
    if(groceryList.status === 200){
      props.AddinStore(groceryList.data.map(x => {
        return {...x , quantity: 0}
      }))
      // let categoryList = groceryList.data.map(product => product.type);
      // // Remove Duplicate Categories
      // categoryList = new Set(categoryList)
      // categoryList = [...categoryList]
      // setCategory(categoryList)
      // setGrocery(groceryList.data)
    }
  }
  const renderData = () => {
    console.log("row " , grocery)
    let filterData = [...grocery];
    if(search.category){
        filterData =  filterData.filter(x => x.type === search.category)
    }
    if(search.name){
        filterData = filterData.filter(x => x.name.toLowerCase().includes(search.name.toLowerCase()))
    }
    console.log(props)
    // if(!search.category && !search.name){
    //     filterData = [...grocery]
    // }
    console.log("filterData " , filterData)
    return filterData
  }
  const resetFilter = () => {
    setSearch({name : "" , category : ""})
  }

  useEffect(() => {
    if(props.cart.length === 0){
      fetchGroceries()
    }else if(props.cart.length !== grocery.length){
      let categoryList = props.cart.map(product => product.type);
      // Remove Duplicate Categories
      categoryList = new Set(categoryList)
      categoryList = [...categoryList]
      setCategory(categoryList)
      setGrocery(props.cart)
    }
  }, [props.cart])

  return (
    <TableContainer component={Paper}>
        <Toolbar>
            <div className={classes.search}>
                <div className={classes.searchIcon}>
                    <SearchIcon />
                </div>
                <InputBase
                    onChange={(e) => setSearch({...search, name: e.target.value})}
                    placeholder="Search…"
                    value={search.name}
                    classes={{
                    root: classes.inputRoot,
                    input: classes.inputInput,
                    }}
                    inputProps={{ 'aria-label': 'search' }}
                />
            </div>
            <TextField
                id="searchCategory"
                select
                label="Select"
                value={search.category}
                onChange={(e) => setSearch({...search, category: e.target.value})}
                helperText="Please select Category"
                >
                {category.map((option) => (
                    <MenuItem key={option} value={option}>
                    {option}
                    </MenuItem>
                ))}
            </TextField>
            <Button onClick={resetFilter} className={classes.marginLeft}>Reset Filter</Button>
        </Toolbar>
      <Table className={classes.table} aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell>Name</TableCell>
            <TableCell align="center">Category</TableCell>
            <TableCell align="center">Price</TableCell>
            <TableCell align="center">Add/Remove</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {renderData().map((row) => {
              if(search.category && row.category === search.category){
                return (
                    <TableRow key={row.id}>
                      <TableCell component="th" scope="row">
                        {row.name}
                      </TableCell>
                      <TableCell align="center">{row.type}</TableCell>
                      <TableCell align="center">{row.price}</TableCell>
                      <TableCell align="center"><IconButton disabled={row.quantity === 0} onClick={() => props.decreaseQuantity(row)}><RemoveIcon /></IconButton>{row.quantity}<IconButton onClick={() => props.increaseQuantity(row)}><AddCircleIcon /></IconButton></TableCell>
                    </TableRow>
                  )
              }else if(search.name && row.name.includes(search.name)) {
                return (
                    <TableRow key={row.id}>
                      <TableCell component="th" scope="row">
                        {row.name}
                      </TableCell>
                      <TableCell align="center">{row.type}</TableCell>
                      <TableCell align="center">{row.price}</TableCell>
                      <TableCell align="center"><IconButton disabled={row.quantity === 0} onClick={() => props.decreaseQuantity(row)}><RemoveIcon /></IconButton>{row.quantity}<IconButton onClick={() => props.increaseQuantity(row)}><AddCircleIcon /></IconButton></TableCell>
                    </TableRow>
                  )
              }else {
                return (
                    <TableRow key={row.id}>
                      <TableCell component="th" scope="row">
                        {row.name}
                      </TableCell>
                      <TableCell align="center">{row.type}</TableCell>
                      <TableCell align="center">${row.price}</TableCell>
                      <TableCell align="center"><IconButton disabled={row.quantity === 0} onClick={() => props.decreaseQuantity(row)}><RemoveIcon /></IconButton>{row.quantity}<IconButton onClick={() => props.increaseQuantity(row)}><AddCircleIcon /></IconButton></TableCell>
                    </TableRow>
                  )
              }
          })}
        </TableBody>
      </Table>
    </TableContainer>
  );
}

const mapStateToProps = state => {
  return {
      cart: state.cart
  };
};

const mapDispatchToProps = dispatch => {
  return {
      AddinStore: (products) => dispatch(addToCart(products)),
      increaseQuantity: (product) => dispatch(increment(product)),
      decreaseQuantity: (product) => dispatch(decrement(product)),
    }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Home)