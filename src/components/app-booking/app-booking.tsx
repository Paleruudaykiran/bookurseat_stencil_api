import { Component, h ,Host, State} from "@stencil/core";
@Component({
    tag: 'app-booking',
    styleUrl: 'app-booking.css',
    shadow: true,
})
export class AppBooking {
    @State() selectedSeats: number[] = [];
    @State() success: boolean = false;
    @State() bookedSeats=[];
    @State() classnamesloaded: boolean = false;
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
    uid="";
    classNames=[]
    componentWillLoad() {
        let bus = JSON.parse(localStorage.getItem('bookingbus'))
        let user = JSON.parse(localStorage.getItem('loginUser'))
        this.uid = user.id;
        this.uname = user.name;
        this.uemail = user.email;
        this.umno = user.mno;
        this.bid = bus.id;
        this.bname = bus.travelsName;
        this.bsource = bus.boards;
        this.bdestination = bus.stops;
        this.bseats = bus.seats;
        this.bprice = bus.price;
        // this.setBookedSeats(bus);
    }
    componentDidLoad() {
        let bus = JSON.parse(localStorage.getItem('bookingbus'))
        console.log(bus);
        this.setBookedSeats(bus);
    }
    async setBookedSeats(bus) {
        let resp =  await fetch('http://localhost:8083/api/getBookings',{
            method:'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
              },
              body: JSON.stringify(bus),
        });
        let bookings =  await resp.json();
        let lbookedseats = []
        for(let i=0;i<bookings.length;i++) {
            let seatnos = bookings[i].seatnos;
            console.log('seatnos' + seatnos);
            // if(seatnos.length > 2){
            //     let splitSeats = seatnos.split();
            //     for(let s of splitSeats){
            //         lbookedseats.push(s);
            //     }
            // }
            // else{
            //     lbookedseats.push(seatnos);
            // }
            let curr = "";
            for(let j=0;j<seatnos.length;j++) {
                if(seatnos[j] == " " || seatnos[j] == ","){
                    if(curr.length > 0) {
                        lbookedseats.push(curr);
                        curr = "";
                    }
                }else {
                    curr += seatnos[j];
                }
            }
            if(curr.length >= 1) {
                lbookedseats.push(curr);
            }
        }
        console.log(lbookedseats);
        for(let i=1;i<=24;i++) {
            let num = i;
            let f: boolean = lbookedseats.includes(num.toString());
            if(f) {
               this.classNames.push("seat disableseat")
            }else {
                this.classNames.push("seat")
            }
            console.log(this.classNames);
        }
        // this.bookedSeats = [...lbookedseats];
        this.classnamesloaded = true;

    }
    toggleSeatSelection(seatNumber: number) {
        const index = this.selectedSeats.indexOf(seatNumber);
      
        if (index > -1) {
          this.selectedSeats.splice(index, 1);
        } else {
          this.selectedSeats.push(seatNumber);
        }
        console.log(this.selectedSeats);
        this.selectedSeats = [...this.selectedSeats];
      }
      async handleBookingConfirm(e) {
        e.preventDefault();
        if(this.selectedSeats.length < 1) {
            alert('please select seats to proceed');
        }else {
            let resp = await fetch('http://localhost:8083/api/confirmBooking?uid='+this.uid+'&bid='+this.bid+'&seats='+this.selectedSeats);
            console.log(resp);
            let booking = await resp.json();
            console.log('booking',booking);
            // localStorage.setItem('seatsbooked',JSON.stringify(this.selectedSeats));
            this.success = true;
            localStorage.setItem('booking',JSON.stringify(booking));
            setTimeout(() => location.href = "confirmation",1000);
        }
      }
    render() {
        return (
            <Host>
                <nav-bar></nav-bar>
                     {
                        this.success ?   <div class="success-card">
                        <h1 class="bg-content">
                             <span class="special">Confirming</span> Your request. Don't refresh the page
                        </h1>
                    </div> : ''
                    }
            <div>
		        <h3 class="header">Start Your Booking</h3>
                <div class="tlayout">
                    <div id="busdetails" style={{margin:"auto"}}>
                    <h4 style={{padding:"5px"}}>Bus Details</h4>
        <div class="ditem">
            <p>Bus Id: </p>
            <p id="tid">{this.bid}</p>
        </div>
        <div class="ditem">
            <p>Travels Name</p>
            <p id="tname">{this.bname}</p>
        </div>
        <div class="ditem">
            <p>Boarding At</p>
            <p id="boards" >{this.bsource}</p>
        </div>
        <div class="ditem">
            <p>Stops At</p>
            <p id="stops">{this.bdestination}</p>
        </div>
        <div class="ditem" >
            <p>Seats Available</p>
            <p id="">{this.bseats}</p>
        </div>
        <div class="ditem" >
            <p>Price</p>
            <p id="cost">{this.bprice}</p>
        </div>
    </div>
    <div class="seatsStyle">
        {this.classnamesloaded ? 
    <div id="cseats">
        <div class={this.classNames[0]}  onClick={() => this.toggleSeatSelection(1)}>1</div>
        <div class={this.classNames[1] } onClick={() => this.toggleSeatSelection(2)}>2</div>
        <div class={this.classNames[2]} onClick={() => this.toggleSeatSelection(3)}>3</div>
        <div class={this.classNames[3]} onClick={() => this.toggleSeatSelection(4)}>4</div>
        <div class={this.classNames[4]} onClick={() => this.toggleSeatSelection(5)}>5</div>
        <div class={this.classNames[5]} onClick={() => this.toggleSeatSelection(6)}>6</div>
        <div class={this.classNames[6]} onClick={() => this.toggleSeatSelection(7)}>7</div>
        <div class={this.classNames[7]} onClick={() => this.toggleSeatSelection(8)}>8</div>
        <div class={this.classNames[8]} onClick={() => this.toggleSeatSelection(9)}>9</div>
        <div class={this.classNames[9]} onClick={() => this.toggleSeatSelection(10)}>10</div>
        <div class={this.classNames[10]} onClick={() => this.toggleSeatSelection(11)}>11</div>
        <div class={this.classNames[11]} onClick={() => this.toggleSeatSelection(12)}>12</div>
        <div class={this.classNames[12]}onClick={() => this.toggleSeatSelection(13)}>13</div>
        <div class={this.classNames[13]} onClick={() => this.toggleSeatSelection(14)}>14</div>
        <div class={this.classNames[14]} onClick={() => this.toggleSeatSelection(15)}>15</div>
        <div class={this.classNames[15]} onClick={() => this.toggleSeatSelection(16)}>16</div>
        <div class={this.classNames[16]} onClick={() => this.toggleSeatSelection(17)}>17</div>
        <div class={this.classNames[17]} onClick={() => this.toggleSeatSelection(18)}>18</div>
        <div class={this.classNames[18]} onClick={() => this.toggleSeatSelection(19)}>19</div>
        <div class={this.classNames[19]} onClick={() => this.toggleSeatSelection(20)}>20</div>
        <div class={this.classNames[20]} onClick={() => this.toggleSeatSelection(21)}>21</div>
        <div class={this.classNames[21]} onClick={() => this.toggleSeatSelection(22)}>22</div>
        <div class={this.classNames[22]} onClick={() => this.toggleSeatSelection(23)}>23</div>
        <div class={this.classNames[23]} onClick={() => this.toggleSeatSelection(24)}>24</div>
        </div>
     : <div></div>}
    </div>
   </div>
    <div class="twocollayout">
        <div class="firstcol">
            Will have a <span > safe Journey</span>, make it special with your visit
        </div>
        <form class="secondcol" action="#" method="post" onSubmit={(e) => this.handleBookingConfirm(e)}>
				<label htmlFor="seatsSelected">Your Seats</label>
				<input class="sinput" id="seatsYouSelected" name="seatsSelected" value={this.selectedSeats.join(', ')} readonly></input>
                <label htmlFor="cname">Name</label>
                <input class="sinput" type="text" placeholder="name" id="cname" name="cname" value={this.uname} />
                <label htmlFor="email">Email</label>
                <input class="sinput" type="text" placeholder="email (optional)" id="email" name="email" value={this.uemail}/>
                <label htmlFor="mno">Mobile Number</label>
                <input class="sinput" type="text" placeholder="mobile no" id="mno" name="mno" value={this.umno} />
                <button class="btn">Confirm Booking</button>
        </form>
    </div>
    </div>
    </Host>
        )
    }
}