import {Component, h, State} from '@stencil/core'

@Component({
    tag:'nav-bar',
    styleUrl: 'nav-bar.css',
    shadow: true,
})
export class navBar {
    @State() loginUser = null;
    @State() username:String = "";
    componentWillLoad() {
        let loginUser = JSON.parse(localStorage.getItem("loginUser"));
        if(loginUser != null || loginUser != undefined) {
            this.loginUser = loginUser;
            this.username = loginUser.name;
        }
        console.log(this.loginUser);
        console.log(this.username);
        
    }
    handleLogout() {
        localStorage.removeItem('loginUser');
        this.loginUser = null;
        location.href = "/";
    }
    render() {
        return (
            <nav>
            <div>
               <div class="nav-firstcol">
                    {/* <div class="nav-logo"><i class="fa-solid fa-bus"></i></div> */}
                    <h2>Book Your Seat</h2>
                </div>
            </div>
            <ul class="items">
                <li class="item"><a  href="/userhome">Home</a></li>
                {
                    this.loginUser != null ? 
                    <div class="items">
                        <li class="item"><a  href="/profile">{this.username}</a></li>
                        <li class="item"><a href="#" onClick={() => this.handleLogout()}>Logout</a></li>
                    </div>
                    :
                    <div class="items">
                        <li class="item"><a  href="/login">Login</a></li>
                        <li class="item"><a  href="/register">Register</a></li>
                        <li class="item"><a href="#bys">Book Your Seat</a></li>
                    </div>
                }
                
            </ul>
        </nav>
        )
    }
}