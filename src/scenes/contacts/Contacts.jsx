import React, { Component } from 'react';
import firebase from 'firebase';
import TextField from 'material-ui/TextField';

import { CardContact } from '../../components';

import './contacts.css';

class Contacts extends Component {
  constructor() {
    super();
    this.state = {
      contacts: [],
      contactsFiltered: [],
    };
  }

  componentDidMount() {
    const db = firebase.database().ref('contacts');

    db.on('value', snap => {
      let contacts = snap.val();
      contacts = Object.values(contacts);

      this.setState({ contacts, contactsFiltered: contacts });
    });
  }

  handleSearch = (event, value) => {
    const valueLowerCase = value.toLowerCase();

    const contactsFiltered = this.state.contacts.filter(
      contact =>
        contact.name.toLowerCase().includes(valueLowerCase) ||
        contact.nickname.toLowerCase().includes(valueLowerCase),
    );

    this.setState({ contactsFiltered });
  };

  goToProfile = id => () => {
    console.log(id);
  };

  render() {
    const listCards = this.state.contactsFiltered.map(contact => (
      <CardContact
        key={contact.id}
        {...contact}
        handleClick={this.goToProfile(contact.id)}
      />
    ));
    return (
      <section className="Contacts">
        <div className="Contacts-search">
          <TextField
            floatingLabelText="Search a contact"
            floatingLabelStyle={{ color: 'white' }}
            inputStyle={{ color: 'white' }}
            fullWidth={true}
            onChange={this.handleSearch}
          />
        </div>
        {listCards}
      </section>
    );
  }
}

export default Contacts;
