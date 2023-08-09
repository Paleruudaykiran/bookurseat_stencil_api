import {Component,h,Host,State} from '@stencil/core'

@Component({
    tag: 'user-profile',
    styleUrl: 'user-profile.css',
    shadow: true,
})
export class UserProfile {
    @State() bookingsloaded: boolean = false;
    user=null;
    bookings=[]
    componentWillLoad() {
        let user = JSON.parse(localStorage.getItem('loginUser'));
        this.user = user;
        this.setBookings(user)
    }
    async setBookings(user) {
        let resp = await fetch('http://localhost:8083/api/getBookingsByUser',{
            method:'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
              },
              body: JSON.stringify(user),
        })
        let bookings = await resp.json();
        console.log(bookings);
        this.bookings = bookings;
        this.bookingsloaded = true;
    }
    render() {
        return (
            <Host>
                <nav-bar></nav-bar>
                <div class="grid-container">
                    <div class="griditem1">
                        <h2>My account</h2>
                        <div>
                            <div>
                                {this.user.name}
                            </div>
                            <div>
                                <p>{this.user.email}</p>
                                <p>{this.user.mno}</p>
                            </div>
                            <div>
                                <a href="/userhome" class="startbtn">Start Booking</a>
                                {/* <a class="editbtn">Edit</a> */}
                            </div>
                        </div>
                    </div>
                    {this.bookingsloaded ? 
                    <div class="griditem2">
                        <h2>My Bookings</h2>
                        <div class="bookings">
                        {this.bookings.map((booking) => {
                            return (
                                <div class="booking">
                                    <div class="booking-title">
                                        <h3 class="boards">{booking.bus.boards}</h3>
                                        <h6>To</h6>
                                        <h3 class="stops">{booking.bus.stops}</h3>
                                    </div>
                                    <div class="booking-details">
                                        <div class="booking-detail">
                                            <h4>PNR: </h4>
                                            <h3>{booking.id}</h3>
                                        </div>
                                        <div class="booking-detail">
                                            <h4>Bus No: </h4>
                                            <h3>{booking.bus.id}</h3>
                                        </div>
                                        <div class="booking-detail">
                                            <h4>Travels Name: </h4>
                                            <h3>{booking.bus.travelsName}</h3>
                                        </div>
                                        <div class="booking-detail">
                                            <h4>Seat Nos: </h4>
                                            <h3>{booking.seatnos}</h3>
                                        </div>
                                        <div class="booking-detail">
                                            <h4>Cost: </h4>
                                            <h3>{booking.price}</h3>
                                        </div>
                                    </div>
                                </div>
                            )
                        })}
                        </div>
                    </div>
                    : <div class="griditem2">
                        <h4>Loading bookings...</h4>
                      </div>}        
                </div>
            </Host>
        )
    }
}