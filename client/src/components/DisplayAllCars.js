
import React, {Component} from "react"
import { Link } from "react-router-dom"

import axios from "axios"
import {SERVER_HOST} from "../config/global_constants"  
// import Logout from "./Logout"
import CarTable from "./CarTable"
import Navbar from "./Navbar"
import Sidenav from "./SideNav"
import '../css/style.css'
import SortModal from "./SortModal"

export default class DisplayAllCars extends Component 
{
    constructor(props) 
    {
        super(props)
        
        this.state = {
            carParts:[],
            showModal:false
        }
        this.handleOnClick = this.handleOnClick.bind(this)
        this.sortByPriceHighToLow = this.sortByPriceHighToLow.bind(this)
    }
    
    
    componentDidMount() 
    {
        axios.get(`${SERVER_HOST}/carParts`)
            .then(res => {
                if (res.data) {
                    if (res.data.errorMessage) {
                        console.log(res.data.errorMessage)
                    }
                    else {
                        console.log("Records read")
                        this.setState({ carParts: res.data })
                        console.log(res.data)
                    }
                }
                else {
                    console.log("Record not found")
                }
            })
    }

    handleOnClick(){
        this.setState({showModal:!this.state.showModal})
    }

    sortByPriceHighToLow(){
        console.log(this.state.carParts.sort((a, b) => a.price >b.price ?-1:1))
        this.setState({carParts: this.state.carParts.sort((a, b) => (b.price - a.price) ?-1:1)} )
    }

    sortByPriceLowToHigh(){
        console.log(this.state.carParts.sort((a, b) => b.price < b.arice ?1:-1))
        this.setState({carParts: this.state.carParts.sort((a, b) => a.price - b.price ?-1:1)} )
    }
    render() 
    {   
        return (           
            <div className="navbarBottom">
            <Navbar Navbar={this.state.Navbar} /> 

            
      

            <div className="sidenav">
            <Sidenav Sidenav={this.state.Sidenav} /> 
            <button onClick={this.handleOnClick}>Sort|Filter</button>
                    
                    {this.state.showModal?<SortModal showmodal={this.state.showModal}
                     closeModal = {this.handleOnClick.bind(this)} 
                      highLow = {this.sortByPriceHighToLow.bind(this)}
                        lowHigh = {this.sortByPriceLowToHigh.bind(this)}/>:null}
                    
            </div> 
            
  
                    
            <div className="form-container">
                
                <div className="table-container">
                    <CarTable isAddable={true} cars={this.state.carParts} /> 
                </div>
                <div className="add-new-car">
                                <Link className="blue-button" to={"/AddCarPart"}>Add New Car</Link>
                            </div>
            </div> 
            
            
            </div>   
        )
    }
}