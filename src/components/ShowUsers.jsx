
import React,{Component} from "react";
import {route,redirect} from "../Router";
import config from "../config/config.json";
export default class ShowUsers extends Component{
	
	//mounting state
	constructor(props){
		
		console.log('This is mouting state : 1st Cycle');
		super(props);
		this.state = {
            name:"",
            email:"",
            mobile:"",
            password:"",
            users:[],
			msg:""
		}
		
	}
	
	componentDidMount(){
		
		console.log('This is Update state : 2nd Cycle');
		
		const url = 'http://localhost:5000/users/';
		
		/************Start of Promise Fetch Api ***************/
		
		let promise = fetch(url);
		promise.then((response)=>{
			return response.json();
		}).then((data)=>{
			//Object Json
			if(Array.isArray(data)){
				console.log('chal rha hai');
				
				this.setState({
					users:data	
				})
			}

		}).catch((error)=>{
			console.log(error);
		})
		
		/************End of Promise Fetch Api ***************/
		
		
	}
	
	componentWillMount(){		
		console.log("Unmounted is 3rd cycle");
	}
	
    render = () =>{
		console.log(this.state.users,"render");
        return (
            <div>
			
               <h1>User Records</h1>
			   {this.state.msg}
			   <table border="1" rules="all">
			   <thead>
			   <tr>
					<th>#</th>
					<th>Name</th>
					<th>Email</th>
					<th>Mobile</th>
					<th>Edit</th>
					<th>Delete</th>
				</tr>
			   </thead>
			   <tbody>
						{this.getRecords()}

			   </tbody>
			   </table>
			   						
            </div>
        )
    }
	
	getRecords = () =>{
		
		return this.state.users.map((item,index)=>{
			return (
			<tr key={item.id}>
				<td>{item.id}</td>
				<td>{item.name}</td>
				<td>{item.mobile}</td>
				<td>{item.email}</td>

				<td><button type="button" onClick={()=>{this.editUser(item.id)}}>Edit</button></td>
				<td><button type="button" onClick={()=>{this.deleteUser(item.id,index)}}>Delete</button></td>
			</tr>
			 )
		})
	}
		deleteUser = (id,index) => {
			
			if(window.confirm('Are you sure to delete?')){
				console.log(id);
				 const url = 'http://localhost:5000/users/'+id;

	
	
    let promise = fetch(url,{
        headers:{
            "Content-Type":"application/json",
        },
        method:"DELETE",
       
    });
    promise.then((response)=>{
        if(response.ok){
			let userData = [...this.state.users];
			userData.splice(index,1);
			this.setState({
			
				users:userData,
				msg:<span className="success">User deleted Successfully</span>
				
			});
		
				setTimeout(()=>{
				this.setState({
					msg:""
				});
			},3000)
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

		editUser  =(id) =>{
			return redirect('edituser/'+id);
		}
}
		

	
