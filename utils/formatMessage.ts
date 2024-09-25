import DOMPurify from 'dompurify';

// Utility function to format the message
export function formatMessage(message: string): string {
  if (!message) return '';

  let formattedMessage = message.replace(/@@@/g, '\n');

  // Apply formatting:
  // Bold text (**bold**)
  formattedMessage = formattedMessage.replace(/\*\*(.*?)\*\*/g, "<strong>$1</strong>");

  // Replace line breaks (\n) with <br> tags
  formattedMessage = formattedMessage.replace(/\n/g, "<br>");

  // Format lists (- item.)
  formattedMessage = formattedMessage.replace(/(- .*?\.)/g, "<li>$1</li>");

  // Wrap lists in <ul> tags if necessary
  formattedMessage = "<ul>" + formattedMessage + "</ul>";

  // Sanitize the HTML to prevent XSS attacks
  const sanitizedMessage = DOMPurify.sanitize(formattedMessage);

  return sanitizedMessage;
}