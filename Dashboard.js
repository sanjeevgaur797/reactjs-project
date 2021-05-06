import React, { Component } from "react";

import { Base_url } from "../api/serverconfig";
import Carousel from 'react-material-ui-carousel'
import { Paper } from '@material-ui/core'
import { CartActions, ProductActions } from "../Actions";
import { connect } from "react-redux";
import { addToCart } from "../Actions/CartAction";






var items = [
    {
        name: "Random Name #1",
        description: "Probably the most random thing you have ever seen!",
        image: 'https://source.unsplash.com/1600x900/?computer'
    },
    {
        name: "Random Name #2",
        description: "Hello World!",
        image: 'https://source.unsplash.com/1600x900/?nature,water'
    }
]



function Item(props) {
    return (
        <Paper style={{ backgroundImage: `url(${props.item.image})`, height: 300, width: '100%', backgroundPosition: "no-fix", backgroundRepeat: 'round', backgroundSize: '100%' }}>
            <h1>Today Offer </h1>
            {/* <div>{row.name}</div>
             */}
        </Paper>
    )
}

class Dashboard extends Component {
    constructor(props) {
        super(props);
        this.state = {
            rows: [],
            products: [],
            addedProducts:[]
        }

    }

    componentWillMount() {
        this.props.allProducts()
    }


    UNSAFE_componentWillReceiveProps(nextProps) {
        if (nextProps.AddToCartSuccess) {
            this.setState({addedProducts:nextProps.AddToCartInfo.details.new_data})

        }
        if (nextProps.RemoveFromCartSuccess) {
            this.setState({addedProducts:nextProps.RemoveFromCartInfo.details.new_data})

        }
        if (nextProps.AllProductsSuccess) {
            console.log(nextProps.AllProductsInfo.details)
            this.setState({ rows: nextProps.AllProductsInfo.details.result })

        }
    }
    checkItemCount =(id)=>{
       var items=this.state.addedProducts;
       for(let i=0;i<items.length;i++){
           if(id===items[i].data.id){
               return items[i].count
           }
       }
      

    }
    render() {
        return (
            <div>
                <Carousel >
                    {
                        items.map((item, i) => <Item key={i} item={item} />)
                    }
                </Carousel>
                <div>
                    {JSON.stringify(this.state.allProducts)}
                </div>
                <div style={{
                    display: 'flex', flexDirection: 'row', flexWrap: "wrap",

                }}>
                    {
                        this.state.rows.map((item) => (
                            <Paper style={{ width: 200, margin: 10, padding: 5 }}>
                                <img alt='showimage' src={`${Base_url}/images/${item.image}`} style={{ width: '100%', height: 130, padding: 5, borderRadius: 10 }} />
                                <div style={{ fontSize: 15, fontWeight: 'bold' }}>{item.name}</div>
                                <div style={{ fontSize: 15, fontWeight: 'lighter', textDecorationLine: 'line-through' }}>M.R.P. <s>₹
 {parseInt(item.price) + parseInt(item.discount) + ".00"}</s></div>
                                <div style={{ fontSize: 20, fontWeight: 'bold' }}>₹{item.price + ".00"}</div>
                                <div style={{ fontSize: 13, fontWeight: 'bold', color: 'green' }}>save ₹ {item.discount + '.00'}</div>

                                {!this.checkItemCount(item.id)?<div style={{ display: 'flex', flexDirection: "row", justifyContent: "space-between", backgroundColor: '#54a0ff', borderRadius: 10, height: 30, alignItems: 'center', padding: 10 }} onClick={() => { this.props.addToCart(item) }}>
                                    <div style={{ fontSize: 14, color: "white", fontWeight: "bold", display: 'flex', flexDirection: 'row' }}> Add To Cart  </div>
                                    <span style={{
                                        fontSize: 17, color: 'white', backgroundColor: '#2980b9',
                                        borderRadius: 50, width: 25, height: 25, padding: 10, marginLeft: -25,
                                        justifyContent: 'center', alignItems: 'center', display: 'flex',
                                        flexDirection: 'row'
                                    }}> +</span></div>:
                                    <div style={{ display: 'flex', flexDirection: "row", justifyContent: "space-between", backgroundColor: '#54a0ff', borderRadius: 10, height: 30, alignItems: 'center', padding: 10,paddingRight:10 }} >
                                    <div style={{
                                        fontSize: 17, color: 'white', backgroundColor: '#2980b9',
                                        borderRadius: 50, width: 25, height: 25, padding: 10, marginLeft: 80,
                                        justifyContent: 'center', alignItems: 'center', display: 'flex',
                                        flexDirection: 'row'
                                    }} onClick={() => { this.props.removeFromCart(item) }}> -  </div>
                                    <div style={{
                                        fontSize: 17, color: 'white', backgroundColor: '#2980b9',
                                        borderRadius: 50, width: 25, height: 25, padding: 10, marginLeft: -25,
                                        justifyContent: 'center', alignItems: 'center', display: 'flex',
                                        flexDirection: 'row'
                                    }}>
                                    {this.checkItemCount(item.id)}</div>
                                    <div style={{
                                        fontSize: 17, color: 'white', backgroundColor: '#2980b9',
                                        borderRadius: 50, width: 25, height: 25, padding: 10, marginLeft: -25,
                                        justifyContent: 'center', alignItems: 'center', display: 'flex',
                                        flexDirection: 'row'
                                    }} onClick={() => { this.checkItemCount(item.id) != item.stock ? this.props.addToCart(item) :alert("not enough stock")}}> +  </div></div>}
                            </Paper>




                        )

                        )
                    }



                </div>



            </div>
        )
    }
}

function mapStateToProps(state) {
    return {
        state,
        AddToCartInfo: state.addToCart,
        AddToCartSuccess: state.addToCart.success,
        AddToCartFetching: state.addToCart.fetching,

        AllProductsInfo: state.allProducts,
        AllProductsSuccess: state.allProducts.success,
        AllProductsFetching: state.allProducts.fetching,

        RemoveFromCartInfo: state.removeFromCart,
        RemoveFromCartSuccess: state.removeFromCart.success,
        RemoveFromCartFetching: state.removeFromCart.fetching

    };
}

export default connect(mapStateToProps, {
    ...CartActions, ...ProductActions

})(Dashboard)

