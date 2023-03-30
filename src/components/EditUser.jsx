import React,{Component} from "react";
import {route,redirect} from "../Router";
import config from "../config/config.json"
export default class EditUser extends Component{

//lifecycle :mounting state 1 cycle
 constructor(props){
	super(props);
    this.state = {
            name:"",
            email:"",
            mobile:"",
            password:"",
            users:[],
			msg:"",
	}
    }

    render = () =>{
        return (
            <div>
              <h1>Edit user Here</h1>
			  
			  {this.state.msg}
             
              <form>
                    <p>Name : <input type="text" 
                    value={this.state.name} 
                    onChange= { (event)=> 
                    {this.setState({name:event.target.value})}  
                    
                    }   />
                    
                    </p>
                    <p>Email : <input type="email" value={this.state.email} 
                    onChange= {(event)=>{this.setState({email:event.target.value})}}/></p>
                    <p>Mobile : <input type="mobile" value={this.state.mobile} 
                    onChange= {(event)=>{this.setState({mobile:event.target.value})}}/></p>
                    <p>Password : <input type="password" value={this.state.password} 
                    onChange= {(event)=>{this.setState({password:event.target.value})}}/></p>
                    <input type="button" value="update" 
                    //onClick={()=>{this.updateData(this.props.userId)}}/> 
                    onClick={this.updateData}/> 
              </form>
            </div>
        )
    }
	componentDidMount(){
		let id =this.props.userId;
	
		let promise =fetch(config.LOCAL_URL+id).then((response)=>{
			
			if(response.ok){
				return response.json();
			}
		}).then((data)=>{
			this.setState({
				name:data.name,
				email:data.email,
				mobile:data.moblie,
				password:data.password,
			});

    }).catch((error)=>{
        
	});
	}

updateData =() =>
{
	let id =this.props.userId;
	let updateUser ={
	name:this.state.name,
	email:this.state.email,
	password:this.state.password,
	mobile:this.state.mobile,
	}
	console.log(config);
	let promise = fetch(config.LOCAL_URL+id,{
	headers:{
		"Content-Type":"application/json"
	},
	method:"PUT",
	body:JSON.stringify(updateUser)
	}).then((response)=>{
		if(response.ok){
			return redirect('showusers');
		}
	}).then((data)=>{
	
	}).catch((error)=>{
		
	});
}
}