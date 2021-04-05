import React, { useEffect, useState } from 'react';
import { checkout } from '../Redux/Cart/action';

import { makeStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import { connect } from "react-redux";
import { Button } from '@material-ui/core';


const useStyles = makeStyles({
  table: {
    minWidth: 700,
  },
  textRight: {
      textAlign: "right",
      margin: "10px"
  }
});



function Cart(props){
    const classes = useStyles();
    const [cart, setCart] = useState([]);
    const checkoutHandler = () => {
        alert("Cart Checkout Succesfully")
        props.clearCart()
    }
    useEffect(() => {
        debugger
        if(props.cart.length > 0 && props.cart.length !== cart.length){
            setCart(props.cart.filter(x => x.quantity > 0))
        }
      }, [props.cart])
    if(cart.length === 0){
        return <h1>Cart is empty</h1>
    }
    return (
        <TableContainer component={Paper}>
      <Table className={classes.table} aria-label="spanning table">
        <TableHead>
          {/* <TableRow>
            <TableCell align="center" colSpan={3}>
              Details
            </TableCell>
            <TableCell align="center">Price</TableCell>
          </TableRow> */}
          <TableRow>
            <TableCell>Name</TableCell>
            <TableCell>Unit Price</TableCell>
            <TableCell align="center">Qty.</TableCell>
            <TableCell align="center">Total Price</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {cart.map((row) => (
            <TableRow key={row.desc}>
              <TableCell>{row.name}</TableCell>
              <TableCell>{row.price}</TableCell>
              <TableCell align="center">{row.quantity}</TableCell>
              <TableCell align="center">{(row.price * row.quantity).toFixed(2)}</TableCell>
            </TableRow>
          ))}

          <TableRow>
            <TableCell />
            <TableCell rowSpan={3}>Total</TableCell>
            <TableCell colspan={3} align="right"><b>{cart.reduce((x, y) => x + (y.quantity * y.price), 0).toFixed(2)}</b></TableCell>
          </TableRow>
        </TableBody>
      </Table>
      <div className={classes.textRight}>
      <Button onClick={checkoutHandler} color="primary" variant="contained">Check Out</Button>
      </div>
    </TableContainer>
    )
}

const mapStateToProps = state => {
    return {
        cart: state.cart
    };
  };
  
  const mapDispatchToProps = dispatch => {
    return {
        clearCart: () => dispatch(checkout()),
      }
  }
  
  export default connect(
    mapStateToProps,
    mapDispatchToProps
  )(Cart)