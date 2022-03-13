import { Contact } from "../types";
import { MessageForm } from "./MessageForm";
import {Action, ActionPanel, Color, Icon, List} from "@raycast/api";

export const ContactList = ({contacts}: {contacts: Contact[] | undefined}) => {
    return (
      <>
        {contacts?.map((contact, id) => (
          <List.Item
            key={id}
            title={contact.name}
            icon='https://media.istockphoto.com/photos/businessman-silhouette-as-avatar-or-default-profile-picture-picture-id476085198?b=1&k=20&m=476085198&s=170667a&w=0&h=Ct4e1kIOdCOrEgvsQg4A1qeuQv944pPFORUQcaGw4oI='
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