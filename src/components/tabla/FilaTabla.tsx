interface Props {
  sender: string;
  recipient: string;
  sentDate: string;
  smtpCode: string;
  content: string;
  senderEmail: string;
  recipientEmail: string;
}

export const FilaTabla = ({ sender, recipient, sentDate, smtpCode, content, senderEmail, recipientEmail }: Props) => {
  return (
    <tr>
      <td className="p-2 whitespace-nowrap">
        <div className="text-left font-medium text-gray-800">{sender}</div>
        <div className="text-left">{senderEmail}</div>
      </td>
      <td className="p-2 whitespace-nowrap">
        <div className="text-left font-medium text-gray-800">{recipient}</div>
        <div className="text-left">{recipientEmail}</div>
      </td>
      <td className="p-2 whitespace-nowrap">
        <div className="text-left">{sentDate}</div>
      </td>
      <td className="p-2 whitespace-nowrap">
        <div className="text-center">{smtpCode}</div>
      </td>
      <td className="p-2 whitespace-nowrap">
        <div className="text-left truncate">{content}</div>
      </td>
    </tr>
  );
};
