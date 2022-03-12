import {Contact} from '../types';

export const mergeInfo = (contactInfo: string): Contact[] => {
      let firstNames:any = contactInfo[0].split("\r");
      let lastNames:any = contactInfo[1].split("\r");
      let phoneNumbers:any = contactInfo[2].split("\r");

      firstNames = firstNames.map((f: any) => {
        return { name: f === "missing value" ? "" : f };
      });
      lastNames = lastNames.map((l: any) => {
        return { name: l === "missing value" ? "" : l };
      });
      phoneNumbers = phoneNumbers.map((p: any) => {
        return { number: p === "missing value" ? "" : p };
      });

      return firstNames.map((f: any, i: number): Contact => {
        return {
          id: i.toString(),
          name: fullName(f.name, lastNames[i].name),
          avatar:
            "https://images.unsplash.com/photo-1570295999919-56ceb5ecca61?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1480&q=80",
          phoneNumber: phoneNumbers[i].number,
        };
      })

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