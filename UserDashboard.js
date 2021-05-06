import React, { Component,  } from 'react';
import clsx from 'clsx';
 import { makeStyles, useTheme } from '@material-ui/core/styles';

import Drawer from '@material-ui/core/Drawer';
import CssBaseline from '@material-ui/core/CssBaseline';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import List from '@material-ui/core/List';
import Typography from '@material-ui/core/Typography';
import Divider from '@material-ui/core/Divider';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import HomeIcon from '@material-ui/icons/Home';
import ClearIcon from '@material-ui/icons/Clear';
import { Badge, } from '@material-ui/core';
import { Link, Route, Switch } from 'react-router-dom';
import Dashboard from './Dashboard';
import ShoppingCartIcon from '@material-ui/icons/ShoppingCart';
import { connect } from 'react-redux';
import { CartActions,ProductActions } from '../Actions';
import { compose } from 'redux';
import Cart from './Cart';
import PlaceOrder from './PlaceOrder';
import Login from './Login';
import signup from './Signup';
import { SignalCellular0BarSharp } from '@material-ui/icons';
import { withStyles } from '@material-ui/styles';

const drawerWidth = 240;

// const styles = StyleSheet.create({
// const styles = makeStyles((theme) => ({
const styles = theme => ({
    root: {
        display: 'flex',
    },
    appBar: {
        transition: theme.transitions.create(['margin', 'width'], {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.leavingScreen,
        }),
    },
    appBarShift: {
        width: `calc(100% - ${drawerWidth}px)`,
        marginLeft: drawerWidth,
        transition: theme.transitions.create(['margin', 'width'], {
            easing: theme.transitions.easing.easeOut,
            duration: theme.transitions.duration.enteringScreen,
        }),
    },
    menuButton: {
        marginRight: theme.spacing(2),
    },
    hide: {
        display: 'none',
    },
    drawer: {
        width: drawerWidth,
        flexShrink: 0,
    },
    drawerPaper: {
        width: drawerWidth,
    },
    drawerHeader: {
        display: 'flex',
        alignItems: 'center',
        padding: theme.spacing(0, 1),
        ...theme.mixins.toolbar,
        justifyContent: 'flex-end',
    },
    content: {
        flexGrow: 1,
        padding: theme.spacing(3),
        transition: theme.transitions.create('margin', {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.leavingScreen,
        }),
        marginLeft: -drawerWidth,
    },
    contentShift: {
        transition: theme.transitions.create('margin', {
            easing: theme.transitions.easing.easeOut,
            duration: theme.transitions.duration.enteringScreen,
        }),
        marginLeft: 0,
    },
})
// );

// const classes = styles()


class UserDashboard extends Component {

    constructor(props) {
        super(props);
        this.state = {
            open: false,
            cartLength: 0
        }
    }

    navList = [
        { name: "Home", path: "/", icon: <HomeIcon /> },
        { name: "Login", path: "/login" },
        { name: "Sign Up", path: "/signup" },
        { name: "Chat", path: "/chat" },
        { name: "Cart", path: "/cart" },
    ]

    handleDrawerOpen = () => {
        this.setState({ open: true })
    };

    handleDrawerClose = () => {
        this.setState({ open: false })
    };

    UNSAFE_componentWillMount() {

    }

    UNSAFE_componentWillReceiveProps(nextProps) {
        if (nextProps.AddToCartSuccess) {
            var result = nextProps.AddToCartInfo.details.new_data.length
            // console.log("result in userdashboard", nextProps.AddToCartInfo.details.new_data)
            this.setState({ cartLength: result })
        }
        if (nextProps.RemoveFromCartSuccess) {
            var result = nextProps.RemoveFromCartInfo.details.new_data.length
            // console.log("result in userdashboard", nextProps.AddToCartInfo.details.new_data)
            this.setState({ cartLength: result })
        }

    }

    render() {

        // const theme = useTheme();
        return (
            <div className={this.props.classes.root} >
                <CssBaseline />
                <AppBar
                    position="fixed"
                    className={clsx(this.props.classes.appBar, {
                        [this.props.classes.appBarShift]: this.state.open,
                    })}
                >
                    <Toolbar>
                        <IconButton
                            color="inherit"
                            aria-label="open drawer"
                            onClick={this.handleDrawerOpen}
                            edge="start"
                            className={clsx(this.props.classes.menuButton, this.state.open && this.props.classes.hide)}
                        >
                            <MenuIcon />
                        </IconButton>
                        <Typography variant="h6" noWrap>
                            Shopping
          </Typography>
                        <input style={{ marginLeft: 25, color: 'white', backgroundColor: 'white', height: 45, borderRadius: 10, padding: 8, width: 500, borderWidth: 0, textAlign: 'center' }} placeholder="Search Here..." />
                        <div style={{ flex: 1, display: 'flex', flexDirection: 'row', justifyContent: 'flex-end', alignItems: 'center' }}>
                            <ion-icon name="person" size="large"></ion-icon>
                          <Link to="/login" style={{color:'white',textDecoration:'none'}}>
                          <h3 color="white"> &nbsp; Sign In/Sign Up</h3>
                          </Link>
                        &nbsp; &nbsp; &nbsp;
                        <Link to="cart" style={{color:"white"}}>
                        <Badge badgeContent={this.state.cartLength} color="primary">
                                <ShoppingCartIcon />
                            </Badge>
                        </Link>
                        </div>
                    </Toolbar>

                </AppBar>
                <Drawer
                    className={this.props.classes.drawer}
                    variant="persistent"
                    anchor="left"
                    open={this.state.open}
                    classes={{
                        paper: this.props.classes.drawerPaper,
                    }}
                >
                    <div className={this.props.classes.drawerHeader}>
                        <IconButton onClick={this.handleDrawerClose}>
                            <ClearIcon />
                        </IconButton>
                    </div>
                    <Divider />
                    <List>
                        {this.navList.map((data, index) => (
                            <Link to={data.path} style={{ textDecorationLine: 'none', color: 'grey' }}>
                                <ListItem button key={data.name}  >
                                    <ListItemIcon>{data.icon}</ListItemIcon>
                                    <ListItemText primary={data.name} />
                                    <Divider />
                                </ListItem>
                            </Link>
                        ))}
                    </List>

                </Drawer>
                <main
                    className={clsx(this.props.classes.content, {
                        [this.props.classes.contentShift]: this.state.open,
                    })}
                >
                    <div className={this.props.classes.drawerHeader} />
                    <Switch>
                        <Route exact path="/" component={Dashboard} />
                        <Route exact path="/login" component={Login} />
                        <Route exact path="/signup" component={signup} />
                    
                        <Route exact path="/cart" component={Cart} />
                        <Route exact path="/placeorder" component={PlaceOrder} />
                    </Switch>


                </main>
            </div >
        );
    }
}


function mapStateToProps(state) {
    return {
        state,
        AddToCartInfo: state.addToCart,
        AddToCartSuccess: state.addToCart.success,
        AddToCartFetching: state.addToCart.fetching
,

        RemoveFromCartInfo: state.removeFromCart,
        RemoveFromCartSuccess: state.removeFromCart.success,
        RemoveFromCartFetching: state.removeFromCart.fetching



    };
}

export default (compose(connect(mapStateToProps, {
    ...CartActions,...ProductActions,
}))(UserDashboard))