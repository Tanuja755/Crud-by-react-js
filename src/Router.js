
const Router = () =>  {
    window.onhashchange = function(){

        var hash = window.location.hash.split("#")[1];
        window.localStorage.setItem('hash', hash );     
        window.location.reload(true);

       // console.log(window.location.href);
    }

    if( window.location.href.indexOf("#") > -1 ){
        
        window.localStorage.setItem('logs','Router Reloaded');     
        //window.location.assign( window.location.hash.replace("#",""))

    }
   
    return window.localStorage.getItem('hash');
}
//function for redirection 
const redirect =(hashUrl='')=>{
	window.location.hash = hashUrl;
	//window.location.reload(true);
}

let route = Router();
export {route,redirect};