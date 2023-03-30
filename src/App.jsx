import React,{Component} from "react";
import Header from "./components/Header";
import Home from "./components/Home";
import EditUser from "./components/EditUser";
import ShowUsers from "./components/ShowUsers";
import Users from "./components/Users";
import {route} from "./Router";
import "./App.css";
import config from  "./config/config.json";
export default class App extends Component{
	
	constructor(props){
		super(props)
	this.id=window.localStorage.getItem('hash').split('/')[1]
	this.views ={
		home:<Home/>,
		createuser:<Users/>,
		showusers:<ShowUsers/>,
		["edituser/"+this.id]:<EditUser userId={this.id}/>
	}
	
	}
	componentDidMount(){
		
		console.log("this method is running from app.jsx")
	}
	renderView = () => {
	return this.views[route];
}
render = () => {
return(
<React.Fragment>

<Header/>
{this.renderView()}

</React.Fragment>
)
}

}