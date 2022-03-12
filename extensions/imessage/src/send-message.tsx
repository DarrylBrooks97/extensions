import { List } from "@raycast/api";
import { ContactList } from "../components/ContactList";

export default function SendMessage(): JSX.Element {
  return (
    <List searchBarPlaceholder="Search for contact">
      <ContactList />
    </List>
  );
}
