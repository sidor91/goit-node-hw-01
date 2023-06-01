const { Command } = require("commander");
const contactsOperations = require("./contacts");


const program = new Command();
program
	.option("-a, --action <type>", "choose action")
	.option("-i, --id <type>", "user id")
	.option("-n, --name <type>", "user name")
	.option("-e, --email <type>", "user email")
	.option("-p, --phone <type>", "user phone");

program.parse(process.argv);

const argv = program.opts();

async function invokeAction({ action, id, name, email, phone }) {
	switch (action) {
		case "list":
			const contactsList = await contactsOperations.listContacts();
			return console.log(contactsList);

		case "get":
			const contactById = await contactsOperations.getContactById(id);
			return console.log(contactById);

		case "add":
			const newContact = await contactsOperations.addContact({
				name,
				email,
				phone,
			});
			return console.log(newContact);

		case "remove":
			const contactToRemove = await contactsOperations.removeContact(id);
			return console.log(contactToRemove);
		default:
			console.warn("\x1B[31m Unknown action type!");
	}
}


invokeAction(argv);

