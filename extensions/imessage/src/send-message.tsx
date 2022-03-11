import {List} from '@raycast/api';

export interface Contact {
    id: string;
    name: string;
    avatar: string;
    phoneNumber: string;
}
const contacts: Contact[] = [
    {
        id: '1',
        name: 'John Doe',
        avatar: 'https://placeimg.com/64/64/any',
        phoneNumber: '+1 (555) 555-5555',
    },{

        id: '2',
        name: 'Mary Doe',
        avatar: 'https://placeimg.com/64/64/any',
        phoneNumber: '+1 (555) 555-5555',
    },
    {
        id: '3',
        name: 'Jane Doe',
        avatar: 'https://placeimg.com/64/64/any',
        phoneNumber: '+1 (555) 555-5555',
    }
];

export default function SendMessage(): JSX.Element {

    return(
        <List searchBarPlaceholder='Search for contact'>
            {contacts.map((contact, id) => (
                <List.Item key={id} title={contact.name} icon={contact.avatar}/ >
            ))}  
        </List>
        )

}