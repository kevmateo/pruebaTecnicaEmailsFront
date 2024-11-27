interface Email {
  id: number;
  senderId: number;
  recipientId: number;
  sentDate: string;
  smtpCode: string;
  content: string;
  sender: {
    id: number;
    name: string;
    email: string;
  };
  recipient: {
    id: number;
    name: string;
    email: string;
  };
}

interface GetCorreosResponse {
  emails: any[];
  total: number;
  currentPage: number;
  totalPages: number;
}
