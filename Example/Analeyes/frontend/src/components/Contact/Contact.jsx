import React from "react";
import './Contact.css';
import msg_icon from '../../assets/msg-icon.png';
import mail_icon from '../../assets/mail-icon.png';
import phone_icon from '../../assets/phone-icon.png';
import location_icon from '../../assets/location-icon.png';
import white_arrow from '../../assets/white-arrow.png';

const Contact = () => {
    const [result, setResult] = React.useState("");

    const onSubmit = async (event) => {
        event.preventDefault();
        setResult("Sending....");
        const formData = new FormData(event.target);

        formData.append("access_key", "e9356d90-4aa8-4e2c-a5cb-2a491f285a04");

        const response = await fetch("https://api.web3forms.com/submit", {
            method: "POST",
            body: formData
        });

        const data = await response.json();

        if (data.success) {
            setResult("Form Submitted Successfully");
            event.target.reset();
        } else {
            console.log("Error", data);
            setResult(data.message);
        }
    };

    return(
        <div className='contact'>
            <div className='contact-col'>
                <h3>Send us a message <img src={msg_icon} alt=""/></h3>
                <p>Feel free to reach out throught contact form or find our contact information below.
                Your feedback, questions, and suggestions are important to us as we strive to provide
                exceptional service to our university community.</p>
                <ul>
                    <li><img src={mail_icon} alt=""/>CataractProject3@gmail.com</li>
                    <li><img src={phone_icon} alt=""/>+(0) 123-456-7890</li>
                    <li><img src={location_icon} alt=""/>Post office Box 78<br/>
                        2161002 Karmiel,
                        Israel</li>
                </ul>
            </div>
            <div className='contact-col'>
                <form onSubmit={onSubmit}>
                    <label>Your name</label>
                    <input type="text" name='name' placeholder='Enter your name' required/>
                    <label>Phone Number</label>
                    <input type="tel" name='phone' placeholder='Enter your mobile number' required/>
                    <label>Write your message here</label>
                    <textarea name="message" rows="6" placeholder='Enter your message' required></textarea>
                    <button type='submit' className='btn dark-btn'>Submit now
                    <img src={white_arrow} alt=""/></button>
                </form>
                <span>{result}</span>
            </div>
        </div>
    )
}

export default Contact;