import { Contact } from "../types";
import { ActionPanel, Form, FormTextArea, showToast, SubmitFormAction, ToastStyle } from "@raycast/api";

const sendMessage = async () => {
    setTimeout(() => {
      showToast({
        title: "Success",
        style: ToastStyle.Success,
        message: "Message sent",
      });
    }, 1000);
  };

export const MessageForm = ({ contact }: { contact: Contact }): JSX.Element => {
    return (
      <Form
        onSubmit={sendMessage}
        actions={
          <ActionPanel>
            <SubmitFormAction title="Send Message" onSubmit={sendMessage} />
          </ActionPanel>
        }
      >
        <FormTextArea id="text" title={`Message to ${contact.name}`} placeholder="Send message" />
      </Form>
    );
  };