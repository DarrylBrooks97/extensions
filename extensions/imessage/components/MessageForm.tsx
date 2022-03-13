import { Contact } from "../types";
import { runAppleScript } from "run-applescript";
import { ActionPanel, Form, FormTextArea, popToRoot, showToast, SubmitFormAction, ToastStyle } from "@raycast/api";

interface MessageValues{
    message: string;
}

const sendMessage = async ({values, contact}: {values:MessageValues, contact: Contact}) => {
    
    const status = await runAppleScript(`
    tell application "Contacts"

    set targetContact1 to value of phone 1 of (person 1 whose name contains \"${contact.name}\")

    tell application "Messages"
      set targetContact to targetContact1
      set newMessage to \"${values.message}\"
      send newMessage to buddy targetContact
    end tell
     return targetContact1
    end tell
      `);

    popToRoot();
    showToast({
        title: "Success",
        style: ToastStyle.Success,
        message: "Message sent",
    });
    
  };

export const MessageForm = ({contact}:{contact:Contact}): JSX.Element => {
    return (
      <Form
        onSubmit={sendMessage}
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