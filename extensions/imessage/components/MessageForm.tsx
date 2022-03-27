import { Contact } from "../types";
import { runAppleScript } from "run-applescript";
import { ActionPanel, Form, FormTextArea, popToRoot, showToast, SubmitFormAction, ToastStyle } from "@raycast/api";

interface MessageValues{
    message: string;
}

const sendMessage = async ({values, contact}: {values:MessageValues, contact: Contact}) => {
    
    const status = await runAppleScript(`
      tell application "Contacts"

      set targetContact to value of phone 1 of (person 1 whose name contains \"${contact.name}\")

      tell applications "Messages"
      try
        set targetService to 1st service whose service type = iMessage
        set targetContact to participant targetContact of targetService
        set newMessage to \"${values.message}\"
        send newMessage to targetContact
      end try
      end tell
        return "Message Sent"
      quit
      end tell
      `);

    popToRoot();
    showToast({
        title: "Success",
        style: ToastStyle.Success,
        message: status,
    });
    
  };

export const MessageForm = ({contact}:{contact:Contact}): JSX.Element => {
    return (
      <Form
        actions={
          <ActionPanel>
            <SubmitFormAction title="Send Message" onSubmit={(values: MessageValues) => sendMessage({values, contact})} />
          </ActionPanel>
        }
      >
        <FormTextArea id="message" title={`Message to ${contact.name}`} placeholder="Send message"  />
      </Form>
    );
  };