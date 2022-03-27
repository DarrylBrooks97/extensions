import {Contact} from '../types';
import { runAppleScript } from 'run-applescript';
import { useEffect, useState } from 'react';

export function useFetcher<T>(
  fn: () => Promise<T>,
): {
  data: T | undefined;
}{
  const [data, setData] = useState<T>();

  async function fetchData(){
    const data = await fn();
    setData(data);
  }

  useEffect(()=>{
    fetchData();
  }, []);

  return {
    data,
  }
}

export const getContacts = async () => {
    const contacts = await runAppleScript(`
    tell application "Contacts"
      set isContactsRunning to false
      
      tell application "System Events"
        if (exists process "Contacts") then
          set isContactsRunning to true
          set visible to false
        end if
      end tell
      
      try
        set firstNames to get every person's first name
        set lastNames to get every person's last name
        set phoneNumbers to value of phone 1 of every person
        
        set {od, my text item delimiters} to {my text item delimiters, return}
        
        set firstNames to firstNames as text
        set lastNames to lastNames as text
        set phoneNumbers to phoneNumbers as text
        
        quit
        return firstNames & "|" & lastNames & "|" & phoneNumbers
      end try
    end tell
      `);


    return contacts;
  };
  
export const mergeInfo = (contactInfo: string[]): Contact[] => {
      let firstNames:any = contactInfo[0].split("\r");
      let lastNames:any = contactInfo[1].split("\r");
      let numbers:any = contactInfo[2].split("\r");


      firstNames = firstNames.map((f: any) => {
        return { name: f === "missing value" ? "" : f };
      });
      
      lastNames = lastNames.map((l: any) => {
        return { name: l === "missing value" ? "" : l };
      });

      numbers = numbers.map((number: any) => {
        return { number: number === "missing value" ? "" : number };
      });

      return firstNames.map((f: any, i: number): Contact => {
        return {
          id: i.toString(),
          name: fullName(f.name, lastNames[i].name),
          photo:
            "https://images.unsplash.com/photo-1570295999919-56ceb5ecca61?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1480&q=80",
          phoneNumber: numbers[i].number,
        };
      }).filter((contact: Contact) => {
        return contact.phoneNumber !== "";
      });

};

const fullName = (f: string, l: string) => {
    if (f === "" && l === "") {
      return "";
    } else if (f === "") {
      return l;
    } else if (l === "") {
      return f;
    } else {
      return `${f} ${l}`;
    }
  };