import DOMPurify from 'dompurify';

// Utility function to format the message
export function formatMessage(message: string): string {
  if (!message) return '';

  let formattedMessage = message;

  // Bold text (**bold**)
  formattedMessage = formattedMessage.replace(/\*\*(.*?)\*\*/g, "<strong>$1</strong>");

  // Replace line breaks (\n) with <br> tags, but not at the end of the message
  formattedMessage = formattedMessage.replace(/\n(?!$)/g, "<br>");

  // Format lists (- item.)
  formattedMessage = formattedMessage.replace(/(^|\n)- (.*?)(?=\n|$)/g, "$1<li>$2</li>");

  // If there are list items, wrap them in <ul>
  if (formattedMessage.includes('<li>')) {
    formattedMessage = formattedMessage.replace(/<li>.*?<\/li>/gs, match => `<ul>${match}</ul>`);
  }

  // Sanitize the HTML to prevent XSS attacks
  const sanitizedMessage = DOMPurify.sanitize(formattedMessage);

  return sanitizedMessage;
}
