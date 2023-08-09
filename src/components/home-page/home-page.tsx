import {Component,h, State} from '@stencil/core'
// import { buses } from '../data';

@Component({
    tag:'home-page',
    styleUrl: 'home-page.css',
    shadow: true,
})
export class HomePage {
    @State() buses;

    componentWillLoad() {
        let admin = {
            name: 'admin',
            pass: '123',
        }
        localStorage.setItem('admin',JSON.stringify(admin));
    }
    handleSubmit(e) {
        e.preventDefault();
    }
    render() {
        return (
            <div>
                <nav-bar></nav-bar>
                <div class="bg-container">
        <div class="bg">
            <h1 class="bg-content">
                The <span>journey</span> of a thousand miles begins with a single step.
            </h1>
        </div>
    </div>
    <div id="bys" class="twocollayout">
        <div class="firstcol">
            Make Your <span>Journey</span> Special, Choose right thing in right time
        </div>
        <div class="secondcol">
         <form action="#" onSubmit={(e) => this.handleSubmit(e)}>
                <label htmlFor="start">From</label>
                <input class="sinput" type="text" placeholder="Onboarding point" id="start" name="start" />
                <label htmlFor="end">To</label>
                <input class="sinput" type="text" placeholder="Droping point" id="end" name="end" / >
                <button  class="btn" type="submit" value="submit">Submit</button>
         </form>
        </div>
    </div>
    <div>
        {/* <h2>Make Your Own Choice</h2>
        <table id="bavil">
            <thead>
                <th>Id</th>
                <th>Travels</th>
                <th>Boarding At</th>
                <th>Stops At</th>
                <th>Seats Available</th>
                <th>Cost</th>
                <th>Actions</th>
            </thead>
            <tbody>
            { this.buses.map((bus) => {
                                return ( 
                                    <tr key={bus.id}>
                                    <td>{bus.id}</td>
									<td>{bus.name}</td>
									<td>{bus.source}</td>
									<td>{bus.destination}</td>
									<td>{bus.seats}</td>
									<td>{bus.price}</td>
                                    <td>
                                        <button class="btn">Book</button>
                                    </td>
                                </tr>
                                )
                            }) }
            </tbody>
        </table> */}
    </div>
            </div>
        )
    }
}