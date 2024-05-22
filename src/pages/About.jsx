/* eslint-disable react/no-unescaped-entities */
// eslint-disable-next-line no-unused-vars
import React, {Component} from 'react';
import '../style/about.css'

export class About extends Component {
render(){
  return (
    <div className="about">
      <h2>About Us</h2>
      <p>Welcome to our music store! We are passionate about providing music lovers with a wide range of instruments, accessories, and sheet music.</p>
      <p>Our store has been serving the community for over a decade, offering top-quality products and excellent customer service.</p>
      <p>Whether you're a beginner looking for your first instrument or a seasoned musician in need of professional gear, we've got you covered.</p>
      <p>Visit us today and explore our collection!</p>
      <h3>Our Mission</h3>
      <p>Our mission is to inspire and support musicians of all levels by providing them with the tools they need to create, perform, and enjoy music.</p>
      <div className="Contact">
      <h3>Contact Us</h3>
      <p>If you have any questions or inquiries, feel free to contact us:</p>
      <ul>
        <li>Email: info@musicstore.com</li>
        <li>Phone: 123-456-7890</li>
        <li>Address: 123 Main Street, City, Country</li>
      </ul>
      </div>
    </div>
  );
}
}

