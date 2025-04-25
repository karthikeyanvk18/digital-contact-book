
import { Contact } from "@/types/Contact";
import ContactCard from "./ContactCard";
import { ScrollArea } from "@/components/ui/scroll-area";

interface ContactListProps {
  contacts: Contact[];
  onEditContact: (contact: Contact) => void;
  onDeleteContact: (id: string) => void;
}

const ContactList = ({ contacts, onEditContact, onDeleteContact }: ContactListProps) => {
  if (contacts.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center h-64 text-center">
        <p className="text-lg text-contact-gray mb-2">No contacts found</p>
        <p className="text-sm text-contact-gray-light">Add a new contact to get started</p>
      </div>
    );
  }

  return (
    <ScrollArea className="h-[calc(100vh-250px)] pr-4">
      <div className="space-y-4">
        {contacts.map((contact) => (
          <ContactCard
            key={contact.id}
            contact={contact}
            onEdit={onEditContact}
            onDelete={onDeleteContact}
          />
        ))}
      </div>
    </ScrollArea>
  );
};

export default ContactList;
