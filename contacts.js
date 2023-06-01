const fs = require("fs/promises");
const path = require("path");
const { nanoid } = require("nanoid");
const { json } = require("stream/consumers");

const contactsPath = path.join(__dirname, "./db/contacts.json");

/**
 * @returns {Promise} List of contacts
 */
async function listContacts() {
	const data = await fs.readFile(contactsPath);
	return JSON.parse(data);
}

/**
 * 
 * @param {string} contactId 
 * @returns {Promise}
 */
async function getContactById(contactId) {
	const contactsList = await listContacts();
	const contactToFind = contactsList.find(
		(contact) => contact.id === contactId
	);
	return contactToFind || null;
}

/**
 * 
 * @param {string} contactId 
 * @returns {Promise}
 */
async function removeContact(contactId) {
	const contactsList = await listContacts();
	const contactToDeleteIndex = contactsList.findIndex(
		(contact) => contact.id === contactId
	);
	if (contactToDeleteIndex === -1) {
		return null;
	}
    const [newContactList] = contactsList.splice(contactToDeleteIndex, 1);
    await fs.writeFile(contactsPath, JSON.stringify(contactsList, null, 2));
	return newContactList;
}

/**
 * 
 * @param {object} contactId 
 * @returns {Promise}
 */
async function addContact(data) {
	const contactsList = await listContacts();
	const newContact = { id: nanoid(), ...data };
	contactsList.push(newContact);
	await fs.writeFile(contactsPath, JSON.stringify(contactsList, null, 2));
	return newContact;
}

module.exports = {
	listContacts,
	getContactById,
	removeContact,
	addContact,
};
