import { Component,h,State} from "@stencil/core";

@Component({
    tag: 'login-form',
    styleUrl: 'login-form.css',
    shadow: true,
})
export class LoginForm {
    @State() uname: String;
    @State() pass: String;
    @State() success:boolean = false;

    @State() passError: String;
    @State() unameError: String;
    async handleSubmit(e) {
        e.preventDefault();
        let resp = await fetch('http://localhost:8083/api/getByName?name=' + this.uname);
        console.log(resp);
        if(resp.status == 200) {
            let user = await resp.json();
            console.log(user);
            if(user.password == this.pass) {
                localStorage.setItem('loginUser',JSON.stringify(user));
                setTimeout(() => {location.href = '/userhome'},1000);
            }else {
                this.passError = "invalid credentials";
            }
        }
        let admin = JSON.parse(localStorage.getItem('admin'));
        if(admin.name == this.uname && admin.pass == this.pass) {
            this.success = true;
            setTimeout(() => {location.href = '/adminhome'},1000);
        }
    }
    handleUserInput(e) {
        this.uname = e.target.value;
    }
    handlePassInput(e) {
        this.pass = e.target.value;
    }
    render() {
        return (
            <div>
            <nav-bar></nav-bar>
           <div class="container">
             {
    this.success ? <div class="success-card">Successfully logedIn. redirecting...</div> : ''
}
<div class="title">Login form</div>
<div class="content">
  <form action="test.php" onSubmit={(e) => this.handleSubmit(e)}>
    <div class="user-details">
      <div class="input-box">
        <span class="details">Username</span>
        <input type="text" placeholder="Enter your username" required  onChange={(e)=> this.handleUserInput(e)}/>
        <p class="error">{this.unameError}</p>
      </div>
      <div class="input-box">
        <span class="details">Password</span>
        <input type="password" placeholder="Enter your password" required onChange={(e) => this.handlePassInput(e)}/>
        <p class="error">{this.passError}</p>
      </div>
      <div class="button">
          <input type="submit" value="Register" />
        </div>
      </div>
      </form>
      </div>
      </div>
      </div>
        )
    }
}