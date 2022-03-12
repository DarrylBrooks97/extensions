import { List } from "@raycast/api";
import { Contact } from "../types";
import { mergeInfo} from "../utils";
import { ContactList } from "../components/ContactList";
import { runAppleScript } from "run-applescript";
import { useEffect, useState } from "react";

export default function SendMessage(): JSX.Element {
  const [contacts, setContacts] = useState<Contact[] | undefined>(undefined);

  const getContacts = async () => {
    const contacts = await runAppleScript(`
    tell application "Contacts"
    delay 1
  
    try
      set firstNames to get every person's first name
      set lastNames to get every person's last name
      set phoneNumbers to value of phone 1 of every person
  
      set {od, my text item delimiters} to {my text item delimiters, return}
  
      set firstNames to firstNames as text
      set lastNames to lastNames as text
      set phoneNumbers to phoneNumbers as text
  
      return firstNames & "|" & lastNames & "|" & phoneNumbers
    end try
  end tell
      `);

    return contacts;
  };

  useEffect(() => {
    const fetch = async () => {
      const allContactInfo = await getContacts();

      const splitInfo: any = allContactInfo.split("|");

      const fetchedContacts = mergeInfo(splitInfo);

      setContacts(fetchedContacts);
    };
    fetch();
  }, []);

  return (
    <List isLoading={contacts === undefined} searchBarPlaceholder="Search for contact">
      <ContactList contacts={contacts} />
    </List>
  );
}
