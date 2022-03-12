import { Contact } from "../types";
import { MessageForm } from "./MessageForm";
import {Action, ActionPanel, Color, Icon, List} from "@raycast/api";

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



export const ContactList = ({contacts}: {contacts: Contact[] | undefined}) => {
    return (
      <>
        {contacts?.map((contact, id) => (
          <List.Item
            key={id}
            title={contact.name}
            icon={contact.avatar}
            subtitle={contact.phoneNumber}
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