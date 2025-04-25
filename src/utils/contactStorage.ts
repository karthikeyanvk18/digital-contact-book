
import { Contact, ContactFormData } from "@/types/Contact";
import { toast } from "@/components/ui/use-toast";

// Local storage key
const CONTACTS_STORAGE_KEY = 'contacts';

// Get all contacts
export const getContacts = (): Contact[] => {
  const contactsJson = localStorage.getItem(CONTACTS_STORAGE_KEY);
  if (!contactsJson) return [];
  
  try {
    return JSON.parse(contactsJson);
  } catch (error) {
    console.error("Failed to parse contacts from localStorage:", error);
    return [];
  }
};

// Add a new contact
export const addContact = (contactData: ContactFormData): Contact => {
  const contacts = getContacts();
  
  const newContact: Contact = {
    ...contactData,
    id: generateId()
  };
  
  const updatedContacts = [...contacts, newContact];
  saveContacts(updatedContacts);
  
  toast({
    title: "Contact Added",
    description: `${newContact.name} has been added to your contacts.`
  });
  
  return newContact;
};

// Update an existing contact
export const updateContact = (id: string, contactData: ContactFormData): Contact | null => {
  const contacts = getContacts();
  const contactIndex = contacts.findIndex(contact => contact.id === id);
  
  if (contactIndex === -1) return null;
  
  const updatedContact: Contact = {
    ...contactData,
    id
  };
  
  const updatedContacts = [...contacts];
  updatedContacts[contactIndex] = updatedContact;
  
  saveContacts(updatedContacts);
  
  toast({
    title: "Contact Updated",
    description: `${updatedContact.name}'s information has been updated.`
  });
  
  return updatedContact;
};

// Delete a contact
export const deleteContact = (id: string): boolean => {
  const contacts = getContacts();
  const contactToDelete = contacts.find(contact => contact.id === id);
  
  if (!contactToDelete) return false;
  
  const updatedContacts = contacts.filter(contact => contact.id !== id);
  saveContacts(updatedContacts);
  
  toast({
    title: "Contact Deleted",
    description: `${contactToDelete.name} has been removed from your contacts.`,
    variant: "destructive"
  });
  
  return true;
};

// Get a contact by ID
export const getContactById = (id: string): Contact | undefined => {
  const contacts = getContacts();
  return contacts.find(contact => contact.id === id);
};

// Search contacts
export const searchContacts = (query: string): Contact[] => {
  if (!query.trim()) return getContacts();
  
  const contacts = getContacts();
  const lowerQuery = query.toLowerCase();
  
  return contacts.filter(contact => 
    contact.name.toLowerCase().includes(lowerQuery) ||
    contact.email.toLowerCase().includes(lowerQuery) ||
    contact.phone.includes(lowerQuery) ||
    contact.address.toLowerCase().includes(lowerQuery)
  );
};

// Helper to save contacts to localStorage
const saveContacts = (contacts: Contact[]): void => {
  localStorage.setItem(CONTACTS_STORAGE_KEY, JSON.stringify(contacts));
};

// Helper to generate a unique ID
const generateId = (): string => {
  return Date.now().toString(36) + Math.random().toString(36).substring(2);
};
