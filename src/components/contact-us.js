import React from 'react'


export default class ContactUs extends React.Component {
    handleSubmit(ev){
        ev.preventDefault()
    }
    render() {
        return (
            <div className="bg-dark contact-form-bg pt-md-5 p-sm-3 p-3">
                <h1>Contact Us</h1>
                <form className="cf" onSubmit={this.handleSubmit.bind(this)}>
                    <div className="half left cf">
                        <input type="text" required id="input-name" placeholder="Name" />
                        <input type="email" required id="input-email" placeholder="Email address" />
                        <input type="date" required id="input-dob" placeholder="dob" />
                    </div>
                    <div className="half right cf">
                        <input type="tel" required id="input-phone" placeholder="Phone number" />
                        <textarea name="address" type="text" required id="input-address" placeholder="address"></textarea>
                    </div>
                    <input type="submit" value="Submit" required id="input-submit" />
                </form>
            </div>
        )
    }
}