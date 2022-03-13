import { List } from "@raycast/api";
import { Contact } from "../types";
import { ContactList } from "../components/ContactList";
import { getContacts, mergeInfo, useFetcher } from "../utils";

export default function SendMessage(): JSX.Element {
  const { data } = useFetcher<Contact[]>(async (): Promise<Contact[]> => {
    return mergeInfo((await getContacts()).split("|"));
  });

  return (
    <List isLoading={data === undefined} searchBarPlaceholder="Search for contact">
      <ContactList contacts={data} />
    </List>
  );
}
