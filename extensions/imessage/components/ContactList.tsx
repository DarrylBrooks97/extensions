import { MessageForm } from "./MessageForm";
import { runAppleScript } from "run-applescript";
import {Action, ActionPanel, Color, Icon, List} from "@raycast/api";
import { useEffect, useState } from "react";
import { Contact } from "../types";

const contacts = [
  {
    id: "1",
    name: "John Doe",
    avatar:
      "https://images.unsplash.com/photo-1570295999919-56ceb5ecca61?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1480&q=80",
    phoneNumber: "+1 (555) 555-5555",
  },
  {
    id: "2",
    name: "Darryl Brooks",
    avatar:
      "https://images.unsplash.com/photo-1570295999919-56ceb5ecca61?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1480&q=80",
    phoneNumber: "+1 (555) 555-5555",
  },
  {
    id: "3",
    name: "Micheal Jackson",
    avatar:
      "https://images.unsplash.com/photo-1570295999919-56ceb5ecca61?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1480&q=80",
    phoneNumber: "+1 (555) 555-5555",
  },
  {
    id: "4",
    name: "Kent Dodds",
    avatar:
      "https://images.unsplash.com/photo-1570295999919-56ceb5ecca61?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1480&q=80",
    phoneNumber: "+1 (555) 555-5555",
  },
];

const getContacts = async () => {

  const contacts = await runAppleScript(`
    tell application "Contacts"
    set contacts to {}
      repeat with eachContact in (get every person)
          set tempList to {}
          try
            set q to name of eachContact
            set p to value of phone 1 of eachContact

            set tempList to {name: q, phoneNumber: p}
            set beginning of contacts to tempList
          end try
      end repeat
      return contacts
    end tell
    `);

  return contacts;
};

export const ContactList = () => {
  const [contacts, setContacts] = useState<Contact[]>([]);

  useEffect(()=>{
    const g = async () => {
      const c = await getContacts();
      console.log(c);
    }
    g();
  },[contacts]);

    return (
      <>
        {contacts.map((contact, id) => (
          <List.Item
            key={id}
            title={contact.name}
            icon={contact.avatar}
            actions={
              <ActionPanel>
                <Action.Push
                  title="Message"
                  target={<MessageForm contact={contact} />}
                  icon={{ source: Icon.Text, tintColor: Color.PrimaryText }}
                />
              </ActionPanel>
            }
          />
        ))}
      </>
    );
  };