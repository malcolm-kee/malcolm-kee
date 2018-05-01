import React from 'react'
import Link from 'gatsby-link'

const ContactItem = ({ link, children }) => (
  <div className="ContactItem">
    <a
      href={link}
      target="_BLANK"
      style={{
        display: 'flex',
        alignItems: 'center',
        textDecoration: 'none',
        color: 'inherit',
      }}
    >
      {children}
    </a>
  </div>
)

const ContactPage = () => (
  <div>
    <h1>Get in Touch</h1>
    <ContactItem link="mailto:malcolm.keeweesiong@gmail.com">
      <i className="material-icons">email</i>Email
    </ContactItem>
    <ContactItem link="https://twitter.com/Malcolm_Kee">
      @Malcolm_Kee
    </ContactItem>
    <ContactItem link="https://github.com/malcolm-kee">
      <i className="material-icons">code</i>Github
    </ContactItem>
    <Link to="/">Home</Link>
  </div>
)

export default ContactPage
