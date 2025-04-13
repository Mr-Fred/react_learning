// eslint-disable-next-line no-undef
const mongoose = require('mongoose');

const contactSchema = new mongoose.Schema({
  name: String,
  number: Number,
});

const Contact = mongoose.model('Contact', contactSchema);

// eslint-disable-next-line no-undef
if (process.argv.length < 3) {
  console.log('give password and contact details as argument');
  // eslint-disable-next-line no-undef
  process.exit(1);
  // eslint-disable-next-line no-undef
} else if (process.argv.length === 3) {
  // eslint-disable-next-line no-undef
  const password = process.argv[2];
  const url = `mongodb+srv://fullstackUser:${password}@cluster0.dbjn95u.mongodb.net/phonebookApp?retryWrites=true&w=majority&appName=Cluster0`;

  mongoose.set('strictQuery', false);
  mongoose.connect(url);

  // eslint-disable-next-line no-unused-vars
  let response = 'Phonebook: \n';

  Contact.find({}).then((result) => {
    result.forEach((note) => {
      response += `   ${note.name} ${note.number}\n`;
    });
    mongoose.connection.close();
    console.log(response);
  });
  // eslint-disable-next-line no-undef
  process.exit(0);
  // eslint-disable-next-line no-undef
} else if (process.argv.length === 4) {
  console.log('Please provide a name and a number for your contact');
  // eslint-disable-next-line no-undef
  process.exit(1);
} else {
  // eslint-disable-next-line no-undef
  const password = process.argv[2];
  // eslint-disable-next-line no-undef
  const contactName = process.argv[3];
  // eslint-disable-next-line no-undef
  const contactNumber = Number(process.argv[4].replace(/[^0-9]/g, ''));

  const url = `mongodb+srv://fullstackUser:${password}@cluster0.dbjn95u.mongodb.net/phonebookApp?retryWrites=true&w=majority&appName=Cluster0`;

  mongoose.set('strictQuery', false);

  mongoose.connect(url);

  const newContact = new Contact({
    name: contactName,
    number: contactNumber,
  });

  newContact.save().then((result) => {
    console.log(`added ${result.name} number ${result.number} to phonebook`);
    mongoose.connection.close();
  });
  // eslint-disable-next-line no-undef
  process.exit(0);
}
