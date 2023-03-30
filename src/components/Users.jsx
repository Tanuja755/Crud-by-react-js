import React,{Component} from "react";
import {route,redirect} from "../Router";

export default class Users extends Component{

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
              <h1>User Register Here</h1>
			  
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
                    <input type="button" value="save" 
                    onClick={this.saveData}/> 
              </form>
            </div>
        )
    }

  saveData = () => {
    const url = 'http://localhost:5000/users/';

	let newObject = {
		name:this.state.name,
		email:this.state.email,
		password : this.state.password,
		mobile:this.state.mobile,
	}
	
    let promise = fetch(url,{
        headers:{
            "Content-Type":"application/json",
        },
        method:"POST",
        body:JSON.stringify(newObject),
    });
    promise.then((response)=>{
        if(response.ok){
			this.setState({
				name:"",
				email:"",
				mobile:"",
				password:"",
				msg:<span className="success">User created Successfully</span>
				
			});
					return redirect('showusers');
			
	}
    }).then((data)=>{
        console.log(data)

    }).catch((error)=>{
        console.log(error);
		
		this.setState({

				msg:<span className="error">Oops! Try again later</span>
				
			});
			let ID1 = setTimeout(()=>{
				this .setState({
					msg:"",
				});
			},5000);
	
    });



  }
}