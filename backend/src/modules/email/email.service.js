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

export const sendAdminEnrollmentEmail = async ({ admin, enrollment }) => {
  try {
    await sendEmail({
      to: admin.email,
      subject: "New Enrollment Received",
      html: `
        <h2>Hello ${admin.name},</h2>

        <p>A new enrollment has been submitted through the website.</p>

        <hr />

        <h3>Student Information</h3>

        <p><strong>First Name:</strong> ${enrollment.firstName}</p>
        <p><strong>Last Name:</strong> ${enrollment.lastName}</p>
        <p><strong>Email:</strong> ${enrollment.email}</p>
        <p><strong>Phone:</strong> ${enrollment.phone}</p>
        <p><strong>Date of Birth:</strong> ${enrollment.dob}</p>
        <p><strong>Gender:</strong> ${enrollment.gender}</p>

        <h3>Enrollment Details</h3>

        <p><strong>Membership:</strong> ${enrollment.membership?.name ?? "N/A"}</p>
        <p><strong>Class:</strong> ${enrollment.class?.title ?? "N/A"}</p>
        <p><strong>Status:</strong> ${enrollment.status}</p>

        <hr />

        <p>Please log in to the admin dashboard to review and process this enrollment.</p>
      `,
    });
  } catch (error) {
    console.error(
      `Admin enrollment email failed (${admin.email}):`,
      error.message,
    );
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

export const sendEnrollmentApprovedEmail = async ({ enrollment }) => {
  try {
    await sendEmail({
      to: enrollment.email,
      subject: "Welcome to Dobu Martial Arts - Enrollment Approved",
      html: `
        <h2>Hello ${enrollment.firstName} ${enrollment.lastName},</h2>

        <p>
          We are delighted to let you know that we have successfully received and
          verified your payment.
        </p>

        <p>
          Your enrollment has now been <strong>approved</strong>, and we are excited
          to welcome you to the <strong>Dobu Martial Arts</strong> family!
        </p>

        <p><strong>Enrollment Details</strong></p>

        <ul>
          <li><strong>Name:</strong> ${enrollment.firstName} ${enrollment.lastName}</li>
          <li><strong>Email:</strong> ${enrollment.email}</li>
          <li><strong>Phone:</strong> ${enrollment.phone}</li>
          <li><strong>Membership Plan:</strong> ${enrollment.membership.name}</li>
          <li><strong>Class:</strong> ${enrollment.class}</li>
        </ul>

        <p>
          Thank you for choosing Dobu Martial Arts. We appreciate your trust in us
          and look forward to helping you achieve your martial arts goals.
        </p>

        <p>
          If you have any questions before your first class, please feel free to
          contact us. Our team is always happy to help.
        </p>

        <p>
          Once again, congratulations and welcome! We can't wait to see you at
          Dobu Martial Arts.
        </p>

        <br />

        <p>Best regards,</p>
        <p><strong>Dobu Martial Arts Team</strong></p>
      `,
    });
  } catch (error) {
    console.error("Failed to send enrollment approval email:", error);
  }
};

export const sendEnrollmentRejectedEmail = async ({ enrollment }) => {
  try {
    await sendEmail({
      to: enrollment.email,
      subject: "Update on Your Enrollment Application",
      html: `
        <h2>Hello ${enrollment.firstName} ${enrollment.lastName},</h2>

        <p>
          Thank you for your interest in joining <strong>Dobu Martial Arts</strong>.
        </p>

        <p>
          After reviewing your enrollment and payment information, we regret to
          inform you that we are unable to approve your enrollment at this time.
        </p>

        <p><strong>Enrollment Details</strong></p>

        <ul>
          <li><strong>Membership Plan:</strong> ${enrollment.membership.name}</li>
          <li><strong>Class:</strong> ${enrollment.class}</li>
        </ul>

        <p>
          If you believe this decision was made in error or you have any questions,
          please contact our team. We'll be happy to assist you.
        </p>

        <p>
          Thank you for considering Dobu Martial Arts, and we hope to have the
          opportunity to welcome you in the future.
        </p>

        <br />

        <p>Best regards,</p>
        <p><strong>Dobu Martial Arts Team</strong></p>
      `,
    });
  } catch (error) {
    console.error("Failed to send enrollment rejection email:", error);
  }
};
