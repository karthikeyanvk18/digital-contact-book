
import { useState, useEffect } from "react";
import { Contact, ContactFormData } from "@/types/Contact";
import { 
  addContact, 
  getContacts, 
  updateContact, 
  deleteContact, 
  searchContacts 
} from "@/utils/contactStorage";
import { Button } from "@/components/ui/button";
import { PlusCircle, BookOpen } from "lucide-react";
import SearchBar from "@/components/SearchBar";
import ContactList from "@/components/ContactList";
import ContactForm from "@/components/ContactForm";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";

const Index = () => {
  const [contacts, setContacts] = useState<Contact[]>([]);
  const [filteredContacts, setFilteredContacts] = useState<Contact[]>([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [editingContact, setEditingContact] = useState<Contact | undefined>(undefined);
  const [contactToDelete, setContactToDelete] = useState<string | null>(null);

  // Load contacts on initial render
  useEffect(() => {
    const loadedContacts = getContacts();
    setContacts(loadedContacts);
    setFilteredContacts(loadedContacts);
  }, []);

  // Filter contacts when search query changes
  useEffect(() => {
    const results = searchContacts(searchQuery);
    setFilteredContacts(results);
  }, [searchQuery, contacts]);

  const handleAddContact = (contactData: ContactFormData) => {
    const newContact = addContact(contactData);
    setContacts((prev) => [...prev, newContact]);
    setIsFormOpen(false);
  };

  const handleUpdateContact = (contactData: ContactFormData) => {
    if (editingContact) {
      const updated = updateContact(editingContact.id, contactData);
      if (updated) {
        setContacts((prev) => 
          prev.map((contact) => 
            contact.id === editingContact.id ? updated : contact
          )
        );
      }
      setIsFormOpen(false);
      setEditingContact(undefined);
    }
  };

  const handleEditClick = (contact: Contact) => {
    setEditingContact(contact);
    setIsFormOpen(true);
  };

  const handleDeleteClick = (id: string) => {
    setContactToDelete(id);
  };

  const confirmDelete = () => {
    if (contactToDelete) {
      deleteContact(contactToDelete);
      setContacts((prev) => prev.filter((contact) => contact.id !== contactToDelete));
      setContactToDelete(null);
    }
  };

  const closeForm = () => {
    setIsFormOpen(false);
    setEditingContact(undefined);
  };

  return (
    <div className="container py-8 max-w-3xl mx-auto">
      <div className="flex items-center justify-between mb-8">
        <div className="flex items-center gap-2">
          <BookOpen className="h-8 w-8 text-contact-purple" />
          <h1 className="text-3xl font-bold">Contact Book</h1>
        </div>
        <Button 
          onClick={() => setIsFormOpen(true)}
          className="bg-contact-purple hover:bg-contact-purple-dark"
        >
          <PlusCircle className="h-4 w-4 mr-2" />
          Add Contact
        </Button>
      </div>

      <div className="mb-6">
        <SearchBar query={searchQuery} onQueryChange={setSearchQuery} />
      </div>

      <ContactList
        contacts={filteredContacts}
        onEditContact={handleEditClick}
        onDeleteContact={handleDeleteClick}
      />

      <ContactForm
        isOpen={isFormOpen}
        onClose={closeForm}
        onSave={editingContact ? handleUpdateContact : handleAddContact}
        contact={editingContact}
      />

      <AlertDialog open={contactToDelete !== null} onOpenChange={() => setContactToDelete(null)}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
            <AlertDialogDescription>
              This action cannot be undone. This will permanently delete the
              contact from your contacts.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction onClick={confirmDelete} className="bg-destructive">
              Delete
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
};

export default Index;
