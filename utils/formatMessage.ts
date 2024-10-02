import DOMPurify from 'dompurify';

// Utility function to format the message
export function formatMessage(message: string): string {
  if (!message) return '';

  let formattedMessage = message;

  // Apply formatting:
  // Bold text (**bold**)
  formattedMessage = formattedMessage.replace(/\*\*(.*?)\*\*/g, "<strong>$1</strong>");

  // Replace line breaks (\n) with <br> tags
  formattedMessage = formattedMessage.replace(/\n/g, "<br>");

  // Format lists (- item.)
  formattedMessage = formattedMessage.replace(/(- .*?\.)/g, "<li>$1</li>");

  // If there are list items, wrap them in <ul>
  if (formattedMessage.includes('<li>')) {
    formattedMessage = `<ul>${formattedMessage}</ul>`;
  }

  // Sanitize the HTML to prevent XSS attacks
  const sanitizedMessage = DOMPurify.sanitize(formattedMessage);

  return sanitizedMessage;
}