import { Component,h } from "@stencil/core";

@Component({
    tag: 'confirm-booking',
    styleUrl: 'confirm-booking.css',
    shadow: true,
})
export class ConfirmBooking {
    bid = "";
    bname = "";
    bsource = "";
    bdestination = "";
    bseats = "";
    bprice = "";
    name = "";
    email = "";
    mno = "";
    uname = "";
    uemail = "";
    upass = "";
    umno = "";
    selectedSeats = "";
    bookingid = "";
    tprice:number = 0;
    componentWillLoad() {
        let bus = JSON.parse(localStorage.getItem('bookingbus'))
        let user = JSON.parse(localStorage.getItem('loginUser'))
        let booking = JSON.parse(localStorage.getItem('booking'))
        this.bookingid = booking.id;
        this.uname = user.name;
        this.uemail = user.email;
        this.umno = user.mno;
        this.bid = bus.id;
        this.bname = bus.travelsName;
        this.bsource = bus.boards;
        this.bdestination = bus.stops;
        this.bseats = bus.seats;
        this.tprice = booking.price;
        this.selectedSeats = booking.seatnos;
    }
    render(){
        return (
            <section>
            <nav-bar></nav-bar>
            <div class="container">
                <h1 class="title">Your booking is confirmed</h1>
            <div class="content">
                 <div id="busdetails" style={{margin:"10px auto;"}}>
                     <div class="litem">
                     <div class="ditem">
                         <p class="">PNR no: </p>
                         <p id="pnr">{this.bookingid}</p>
                     </div>
                     <div class="ditem">
                         <p>Bus Id: </p>
                         <p id="tid">{this.bid}</p>
                     </div>
                     
                     <div class="ditem">
                         <p>Travels Name</p>
                         <p id="tname" >{this.bname}</p>
                     </div>
                     <div class="ditem">
                         <p>Boarding At</p>
                         <p id="boards">{this.bsource}</p>
                     </div>
                     <div class="ditem">
                         <p>Stops At</p>
                         <p id="stops" >{this.bdestination}</p>
                     </div>
                     <div class="ditem title">
                         <p>Total Price</p>
                         <p id="tprice" >{this.tprice}</p>
                     </div>
                     <div class="ditem title">
                         <p>Your Seats: </p>
                         <p id="yseats" >{this.selectedSeats}</p>
                     </div>
                     </div>
                     <div class="litem">
                         <div class="ditem">
                             <p>Name: </p>
                             <p id="cname" >{this.uname}</p>
                         </div>
                         <div class="ditem">
                             <p>Email: </p>
                             <p id="email" >{this.uemail}</p>
                         </div>
                         <div class="ditem">
                             <p>Mobile no: </p>
                             <p id="mno">{this.umno}</p>
                         </div>
                     </div>
                 </div>
            </div>
            </div>
         </section>
         
        )
    }
}