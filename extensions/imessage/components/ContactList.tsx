import {Contact} from "../types";
import { MessageForm } from "./MessageForm";
import {Action, ActionPanel, Color, Icon, List} from "@raycast/api";

export const ContactList = ({ contacts }: { contacts: Contact[] }) => {
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
                  icon={{ source: Icon.List, tintColor: Color.PrimaryText }}
                />
              </ActionPanel>
            }
          />
        ))}
      </>
    );
  };