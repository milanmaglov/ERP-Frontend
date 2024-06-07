/* eslint-disable no-unused-vars */
import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import '../style/home.css';

export class Home extends Component {
  render() {
    const isAuthenticated = localStorage.getItem('token');

    return (
      <div className="main-page">
        <header className="hero-section">
          <div className="hero-content">
            <h1>Welcome to MusicWorldStore</h1>
            <p>Find your chosen instrument</p>
            <Link to="/products" className="cta-button">
              Shop Now
            </Link>
          </div>
        </header>

        <section className="center-section">
          <div className="center-content">
            <h2>Discover the Latest Trends</h2>
            <p>Explore our curated selection of the best available instruments</p>
          </div>
        </section>

        <section className="about-section">
          <h2>About Us</h2>
          <p>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec vitae elementum sem. Aliquam feugiat a mi in molestie. Ut gravida finibus pellentesque. Donec dignissim ipsum in nisi sollicitudin pharetra. Sed at ultrices risus. Sed cursus ante eu sapien finibus dignissim. Donec porttitor ante eget mauris feugiat, non laoreet libero consectetur. Curabitur ut ex augue. Nunc pharetra mauris tempus enim tempor, non tincidunt dui egestas. Aliquam et lacus id mi eleifend suscipit.
            Pellentesque venenatis arcu lorem. Aenean interdum bibendum metus. Etiam vulputate sem a diam volutpat ullamcorper. Sed orci mi, ornare ut accumsan sit amet, interdum vehicula lorem. Donec id dolor est. Nunc dapibus gravida elit condimentum accumsan. Cras consequat quis metus sit amet ullamcorper. Donec semper diam et odio posuere, et mattis justo tristique. Ut ullamcorper, augue semper accumsan sollicitudin, purus risus porttitor nulla, quis finibus tortor nibh sit amet nulla. Nullam nec purus at nulla lobortis interdum.
            Duis malesuada lorem purus, ut ornare nunc convallis ut. Duis id lacus placerat, pellentesque nunc ut, fringilla nibh. Etiam facilisis viverra elementum. Donec nec ligula nibh. Donec vehicula pellentesque placerat. Duis nec lorem est. Pellentesque habitant morbi tristique senectus et netus et malesuada fames ac turpis egestas. Mauris at vulputate nisl. Morbi cursus justo vitae lacus varius tincidunt. Quisque placerat dignissim mauris, imperdiet auctor odio consectetur in. Maecenas id erat sit amet diam consequat accumsan. Pellentesque dapibus aliquet sapien quis vulputate. Nunc quis vestibulum arcu. Donec ut pulvinar urna, nec efficitur nibh.
            Duis rutrum dapibus pretium. Suspendisse blandit sed augue eget fermentum. Integer rhoncus at est quis mollis. Integer condimentum luctus justo. Nam quis augue lectus. Donec malesuada quis ex id tempor. Curabitur in sem eget neque porta ornare. Nunc diam nisl, vehicula ut finibus sed, congue eget dui. Donec dapibus metus sit amet iaculis euismod. Donec rhoncus tempus gravida.
            Maecenas malesuada a ex nec efficitur. Nunc nec tortor porta, dignissim velit vel, sollicitudin risus. Praesent elit tellus, finibus in pulvinar non, posuere a eros. Ut varius nibh a laoreet lobortis. Phasellus nibh est, sagittis nec molestie at, pharetra eget sem. Nam posuere tristique bibendum. Integer aliquam urna vitae dui pulvinar faucibus. Praesent laoreet lacus ac ex bibendum rhoncus. Nunc dapibus nunc ac lacinia maximus. Proin ultricies ultricies sapien, ut molestie quam eleifend vitae. Vestibulum vel lorem et lorem laoreet fermentum ut quis ante. Ut eget urna nec sem vulputate blandit. Donec luctus lobortis tellus, ac facilisis nisl aliquam eu. Integer ut lectus ornare, sodales dui id, molestie est. Pellentesque in eleifend nunc. Maecenas malesuada ultricies pellentesque. 
          </p>
        </section>
        
        <section className="login-section">
          <h2>Log In / Register</h2>
          <p>
            Log in or register an account to get access to exclusive deals,
            updates, and more.
          </p>
          <Link to="/login" className="cta-button">
            Log In / Register
          </Link>
        </section>
        
        <footer className="footer">
          <p>&copy; {new Date().getFullYear()} Milane. All rights reserved.</p>
        </footer>
      </div>
    );
  }
}
