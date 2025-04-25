
export interface Contact {
  id: string;
  name: string;
  phone: string;
  email: string;
  address: string;
}

export type ContactFormData = Omit<Contact, 'id'>;
