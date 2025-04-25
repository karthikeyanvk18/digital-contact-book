
import { Contact } from "@/types/Contact";
import { Card, CardContent } from "@/components/ui/card";
import { Phone, Mail, MapPin, Edit, Trash2 } from "lucide-react";
import { Button } from "@/components/ui/button";

interface ContactCardProps {
  contact: Contact;
  onEdit: (contact: Contact) => void;
  onDelete: (id: string) => void;
}

const ContactCard = ({ contact, onEdit, onDelete }: ContactCardProps) => {
  return (
    <Card className="mb-4">
      <CardContent className="p-6">
        <div className="flex justify-between items-start">
          <h3 className="text-xl font-semibold mb-2">{contact.name}</h3>
          <div className="flex gap-2">
            <Button 
              variant="ghost" 
              size="icon" 
              onClick={() => onEdit(contact)}
              className="h-8 w-8 text-contact-purple"
            >
              <Edit className="h-4 w-4" />
            </Button>
            <Button 
              variant="ghost" 
              size="icon" 
              onClick={() => onDelete(contact.id)}
              className="h-8 w-8 text-destructive"
            >
              <Trash2 className="h-4 w-4" />
            </Button>
          </div>
        </div>
        
        <div className="space-y-2 mt-4">
          <div className="flex items-center gap-2 text-contact-gray">
            <Phone className="h-4 w-4" />
            <span>{contact.phone}</span>
          </div>
          
          <div className="flex items-center gap-2 text-contact-gray">
            <Mail className="h-4 w-4" />
            <span>{contact.email}</span>
          </div>
          
          <div className="flex items-start gap-2 text-contact-gray">
            <MapPin className="h-4 w-4 mt-0.5" />
            <span>{contact.address}</span>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default ContactCard;
