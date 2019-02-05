import React from 'react';
import { Button } from './Button';
import { Field } from './Field';

export const ContactForm = () => (
  <form
    name="contact-form"
    method="POST"
    action="/message-received"
    netlify-honeypot="trap"
    data-netlify="true"
    className="contact-form"
  >
    <Field label="Your Name" id="name" name="name" required />
    <Field label="Your Email" id="email" name="email" type="email" required />
    <Field
      label="Your Message"
      id="message"
      name="message"
      InputComponent="textarea"
      required
    />
    <div className="Toolbar">
      <Button type="submit" color="primary" raised fullWidth>
        Send
      </Button>
    </div>
  </form>
);
