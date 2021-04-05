import React, { useEffect, useState } from 'react';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';
import { fade, makeStyles } from '@material-ui/core/styles';
import ShoppingCartIcon from '@material-ui/icons/ShoppingCart';
import StorefrontIcon from '@material-ui/icons/Storefront';
import { useHistory } from "react-router-dom";
import Badge from '@material-ui/core/Badge';
import { connect } from "react-redux";

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
    marginBottom: 40
  },
  menuButton: {
    marginRight: theme.spacing(2),
  },
  title: {
    flexGrow: 1,
    display: 'none',
    [theme.breakpoints.up('sm')]: {
      display: 'block',
    },
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
  },
}));

function NavBar(props) {
  const classes = useStyles();
  const history = useHistory()
  const [count, setCount] = useState(0);
  const gotoShop = () => {
    console.log(props)
    history.push('/')
  }
  const gotoCart = () => {
    console.log(props)
    history.push('/cart')
  }
  useEffect(() => {
    if(props.cart.length > 0){
      let totalCart = 0
      props.cart.forEach(prod => {
        if(prod.quantity > 0) totalCart += 1
      })
      setCount(totalCart)

    }
  }, [props.cart])
  return (
    <div className={classes.root}>
      <AppBar position="static">
        <Toolbar>
          {/* <IconButton
            edge="start"
            className={classes.menuButton}
            color="inherit"
            aria-label="open drawer"
          >
            <MenuIcon />
          </IconButton> */}
          <Typography className={classes.title} variant="h6" noWrap>
            Shopping Application
          </Typography>
          <IconButton
            onClick={gotoShop}
            edge="start"
            className={classes.menuButton}
            color="inherit"
            aria-label="open drawer"
          >
            
             <StorefrontIcon />
            
          </IconButton>
          <IconButton
            onClick={gotoCart}
            edge="start"
            className={classes.menuButton}
            color="inherit"
            aria-label="open drawer"
          >
            {count > 0 ? <Badge badgeContent={count} color="secondary">
              <ShoppingCartIcon/>
            </Badge>: <ShoppingCartIcon/>}
          
          </IconButton>
        </Toolbar>
      </AppBar>
    </div>
  );
}

const mapStateToProps = state => {
  return {
      cart: state.cart
  };
};

const mapDispatchToProps = dispatch => {
  return {
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(NavBar)