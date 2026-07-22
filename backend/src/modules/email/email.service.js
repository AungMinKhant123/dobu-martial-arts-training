import { sendEmail } from "../../utils/sendEmail.js";

export const sendCustomerEnquiryEmail = async ({ name, email, subject }) => {
  try {
    await sendEmail({
      to: email,
      subject: "Thank you for contacting Dobu Martial Arts",
      html: `
        <h2>Hello ${name},</h2>
        <p>
          Thank you for contacting 
          <strong>Dobu Martial Arts</strong>.
        </p>
        <p>
          We have received your enquiry regarding:
        </p>
        <h3>${subject}</h3>
        <p>
          Our team will contact you as soon as possible.
        </p>
        <br/>
        <p>
          Best Regards,
          <br/>
          Dobu Martial Arts Team
        </p>
      `,
    });
  } catch (error) {
    console.error("Customer enquiry email failed:", error.message);
  }
};

export const sendAdminEnquiryEmail = async ({ admin, enquiry }) => {
  try {
    await sendEmail({
      to: admin.email,

      subject: "New Enquiry Received",

      html: `
        <h2>Hello ${admin.name},</h2>
        <p>
          A new enquiry has been submitted.
        </p>
        <hr/>
        <p>
          <strong>Name:</strong>
          ${enquiry.name}
        </p>
        <p>
          <strong>Email:</strong>
          ${enquiry.email}
        </p>
        <p>
          <strong>Phone:</strong>
          ${enquiry.phone}
        </p>
        <p>
          <strong>Subject:</strong>
          ${enquiry.subject}
        </p>
        <p>
          <strong>Message:</strong>
        </p>
        <p>
          ${enquiry.message}
        </p>
      `,
    });
  } catch (error) {
    console.error(`Admin email failed (${admin.email}):`, error.message);
  }
};

export const sendCustomerEnrollmentEmail = async ({
  firstName,
  email,
  membership,
  className,
}) => {
  try {
    await sendEmail({
      to: email,
      subject: "We've received your enrollment request",
      html: `
        <h2>Hello ${firstName},</h2>
        <p>
          Thank you for choosing <strong>Dobu Martial Arts</strong>.
        </p>
        <p>
          We've received your enrollment request.
        </p>
        <hr/>
        <p>
          <strong>Membership:</strong>
          ${membership}
        </p>
        <p>
          <strong>Class:</strong>
          ${className || "Not selected"}
        </p>
        <p>
          <strong>Status:</strong>
          Pending
        </p>
        <br/>
        <p>
          Our staff will review your application shortly.
        </p>
        <p>
          We'll notify you again once your enrollment has been reviewed.
        </p>
        <br/>
        <p>
          Best Regards,
          <br/>
          Dobu Martial Arts Team
        </p>
      `,
    });
  } catch (error) {
    console.error("Customer enrollment email failed:", error.message);
  }
};

export const sendEnquiryReplyEmail = async ({
  email,
  customerName,
  subject,
  message,
}) => {
  try {
    await sendEmail({
      to: email,
      subject: subject,
      html: `
      <h3>Hello ${customerName},</h3>

      <p>${message}</p>

      <br/>

      <p>
      Regards,<br/>
      Dobu Martial Arts Team
      </p>
    `,
    });
  } catch (error) {
    console.error("Enquiry Reply email failed:", error.message);
    throw error;
  }
};
