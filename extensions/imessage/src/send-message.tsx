import { runAppleScript } from "run-applescript";
import { Action, ActionPanel, Color, Form, FormTextArea, Icon, List, showToast, SubmitFormAction, ToastStyle } from "@raycast/api";
import { useEffect, useState } from "react";
export interface Contact {
  id: string;
  name: string;
  avatar: string;
  phoneNumber: string;
}

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
        set tempList to first name of eachContact & " " & last name of eachContact
        set beginning of contacts to tempList
      end repeat
      return contacts
    end tell
    `);

  return contacts;
};

const sendMessage = async () => {
    setTimeout(()=>{
        showToast({
            title: "Message sent",
            style: ToastStyle.Success,
            message: "Message sent successfully",
        })
    },1000);
}

const TextBox = ({ contact }: { contact: Contact }): JSX.Element => {
  return (
    <Form onSubmit={sendMessage} actions={  
    <ActionPanel>
        <SubmitFormAction title="Send Message" onSubmit={sendMessage} />
      </ActionPanel>}>
      <FormTextArea id="text" title={`Message to ${contact.name}`} placeholder="Send message" />
    </Form>
  );
};
export default function SendMessage(): JSX.Element {
  return (
    <List searchBarPlaceholder="Search for contact">
      {contacts.map((contact, id) => (
        <List.Item
          key={id}
          title={contact.name}
          icon={contact.avatar}
          actions={
            <ActionPanel>
              <Action.Push
                title="Message"
                target={<TextBox contact={contact} />}
                icon={{ source: Icon.List, tintColor: Color.PrimaryText }}
              />
            </ActionPanel>
          }
        />
      ))}
    </List>
  );
}
