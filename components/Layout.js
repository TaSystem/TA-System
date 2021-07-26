import Navbar from "./Navbar"


const Layout = ({children}) => {
    return ( 
        <div>
           <div className= "content">
            <Navbar/>
            {children}
        </div> 
        </div>
        
     );
}
 
export default Layout;