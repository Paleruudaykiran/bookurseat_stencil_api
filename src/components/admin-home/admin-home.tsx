import { Component,h,State,Host,} from "@stencil/core";
@Component({
    tag:'admin-home',
    styleUrl:'admin-home.css',
    shadow: true,
})
export class AdminHome {
    @State() ssrc: String = "";
    @State() sdst: String = "";
    @State() buses= [];
    @State() addbusform: boolean = false;

    @State() bid:String ="";
    @State() btravelsName:String = "";
    @State() bboards:String = "";
    @State() bstops:String = "";
    @State() bseats:String = "";
    @State() bprice:String = "";

    handlebIdInput(e) {
        this.bid = e.target.value;
    }
    handlebTravelsInput(e) {
        this.btravelsName = e.target.value;
    }
    handlebBoardsInput(e) {
        this.bboards = e.target.value;
    }
    handlebStopsInput(e) {
        this.bstops = e.target.value;
    }
    handlebSeatsInput(e) {
        this.bseats = e.target.value;
    }
    handlebPriceInput(e) {
        this.bprice = e.target.value;
    }
    componentWillLoad() {
        // localStorage.setItem('buses',JSON.stringify(buses));
        // this.buses = buses;
        this.setBuses();
    }
    async setBuses() {
        console.log('called');
        let resp = await fetch('http://localhost:8083/api/getAllBuses');
        console.log(resp);
        let buses = await resp.json()
        this.buses = [...buses];
    }
    async handleSearch(e) {
        e.preventDefault();
        let resp = await fetch('http://localhost:8083/api/getAllBuses');
        let lbuses = await resp.json()
        let sbuses = lbuses.filter((bus) => {
            if(this.ssrc == "" && this.sdst == ""){
                return bus;
            }
            if(bus.boards.toLowerCase() == this.ssrc || bus.stops.toLowerCase() == this.sdst) {
                return bus;
            } 
        })
        this.buses = [...sbuses];
    }
    handleSsource(e) {
        this.ssrc = e.target.value.toLowerCase();
    }
    handleSdestination(e) {
        this.sdst = e.target.value.toLowerCase();
    }
    async handleDelete(e,id) {
       await fetch('http://localhost:8083/api/deleteBus?id='+id);
       console.log(e);
       this.setBuses();
    }
    async handleBusAdd(e) {
      e.preventDefault();
       console.log(e)
        let bus = {
            travelsName: this.btravelsName,
            boards: this.bboards,
            stops: this.bstops,
            seats: this.bseats,
            price: this.bprice,
        }
        let resp = await fetch('http://localhost:8083/api/saveBus',{
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
              },
              body: JSON.stringify(bus),
        })
        console.log(resp);
        console.log(bus);
        this.setBuses();
        this.btravelsName = "";
        this.bboards = "";
        this.bstops = "";
        this.bseats = "";
        this.bprice = "";
        this.addbusform = false;
    }
    async handleEdit(e,idx) {
        console.log(e);
        let resp = await fetch('http://localhost:8083/api/getAllBuses');
        let buses = await resp.json()
        let fbuses = [];
        for(let i=0;i<buses.length;i++) {
            if(buses[i].id == idx) {
                this.bid = buses[i].id;
                this.btravelsName = buses[i].travelsName;
                this.bboards = buses[i].boards;
                this.bstops = buses[i].stops;
                this.bseats = buses[i].seats;
                this.bprice = buses[i].price;
            }else {
            fbuses.push(buses[i])
            }
        }
        this.addbusform = true;
    }
    handleLogout() {
        location.href = '/';
    }
    render() {
        return (
            <Host>
                <nav>
                <div>

               <div class="nav-firstcol">
                    {/* <div class="nav-logo"><i class="fa-solid fa-bus"></i></div> */}
                    <h2>Book Your Seat</h2>
                </div>
            </div>
            <ul class="items">
                        <li class="item"><a  href="#">Admin</a></li>
                        <li class="item"><a href="#" onClick={() => this.handleLogout()}>Logout</a></li>
            </ul>
            </nav>
                <div>
                <div class="split">
			<h3>Welcome Admin</h3>
			<button class="add-btn icon" onClick={() => this.addbusform = !this.addbusform}>Add Bus</button>
		</div>
        {
            this.addbusform ? 
            <div class="container">
            <div class="title">Enter Bus Details</div>
                <div class="content">
                    <form action="" onSubmit={(e) => this.handleBusAdd(e)}>
                    <div class="user-details">
                        {/* <div class="input-box">
                            <span class="details">Id</span>
                            <input id="bid" type="number" placeholder="Enter Id" required value={this.bid as string} onChange={(e) => this.handlebIdInput(e)}/>
                        </div> */}
                        <div class="input-box">
                            <span class="details">Travels Name</span>
                            <input id="btravlesname" type="text" placeholder="Enter Travels Name" required value={this.btravelsName as string} onChange={(e) => this.handlebTravelsInput(e)} />
                        </div>
                        <div class="input-box">
                            <span class="details">Boards At</span>
                            <input id="bboards" type="text" placeholder="Enter Boarding point" required value={this.bboards as string} onChange={(e) => this.handlebBoardsInput(e)}/>
                        </div>
                        <div class="input-box">
                            <span class="details">Stops At</span>
                            <input id="bstops" type="text" placeholder="Enter Stoping point" required value={this.bstops as string} onChange={(e) => this.handlebStopsInput(e)}/>
                        </div>
                        <div class="input-box">
                            <span class="details">Total Seats</span>
                            <input id="bseats" type="number" placeholder="Enter Toatal seats" value={this.bseats as string} onChange={(e) => this.handlebSeatsInput(e)}/>
                        </div>
                        <div class="input-box">
                            <span class="details">Price</span>
                            <input id="bprice" type="number" placeholder="Enter price" required value={this.bprice as string} onChange={(e) => this.handlebPriceInput(e)} />
                        </div>
                        <div class="button">
                            <input type="submit" value="Confirm Details" />
                         </div>
                    </div>
                     </form>
                </div>
            </div>
            : <div>
		<div class="form-group search">
			<form method="get" action="#">
				<input type="text" id="ssource" placeholder="Boarding point"
					name="ssource" onChange={(e) => this.handleSsource(e)}/> 
                <input type="text" id="sdestination"
					placeholder="Stop Point" name="sdestination"  onChange={(e) => this.handleSdestination(e)} /> 
                <button class="btn" value="Search" onClick={(e) => this.handleSearch(e)}>Search</button>
			</form>
            </div>
                <table id="bavil">
						<thead>
							<th>Id</th>
							<th>Travels</th>
							<th>Boarding At</th>
							<th>Stops At</th>
							<th>Total Seats</th>
							<th>Cost</th>
							<th>Actions</th>
						</thead>
						<tbody>
                           { this.buses.map((bus) => {
                                return ( 
                                    <tr key={bus.id}>
                                    <td>{bus.id}</td>
									<td>{bus.travelsName}</td>
									<td>{bus.boards}</td>
									<td>{bus.stops}</td>
									<td>{bus.seats}</td>
									<td>{bus.price}</td>
									<td><button key={bus.id} onClick={(e) => this.handleDelete(e,bus.id)}
										class="icon icon-delete btn"> Delete</button> 
                                        <button key={bus.id} onClick={(e) => this.handleEdit(e,bus.id)}
										class="icon icon-edit btn">Edit</button></td>
                                </tr>
                                )
                            }) }
                        </tbody>
                </table>
    
                </div>
    }
                </div>
            </Host>
        )
    }
}