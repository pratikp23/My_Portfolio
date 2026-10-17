import { SOCIAL_LINKS } from "../config";

/**
 * Lead Service to capture inquiries from recruiters & prospective clients
 * Directly dispatches to Pratik's inbox using Web3Forms
 */
export async function submitLead(formData) {
  const { name, email, interestType, message } = formData;

  // Client-side validation
  if (!name || !name.trim()) {
    throw new Error("Please provide your name or organization.");
  }

  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!email || !emailRegex.test(email.trim())) {
    throw new Error("Please enter a valid email address.");
  }

  const payload = {
    access_key: SOCIAL_LINKS.web3formsKey,
    subject: `🔥 [Pratik.AI Mascot] New ${interestType || 'Portfolio'} Lead from ${name}`,
    from_name: "Pratik.AI Portfolio Assistant",
    name: name.trim(),
    email: email.trim(),
    interest_type: interestType || "General Inquiry",
    message: message?.trim() || "No additional message provided.",
  };

  const response = await fetch("https://api.web3forms.com/submit", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
    },
    body: JSON.stringify(payload),
  });

  const result = await response.json();

  if (!result.success) {
    throw new Error(result.message || "Failed to submit inquiry. Please try again or email directly.");
  }

  return result;
}
