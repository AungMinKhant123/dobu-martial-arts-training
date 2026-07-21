import { EnquiryStatus } from "@prisma/client";
import prisma from "../../config/prisma.js";
import AppError from "../../utils/AppError.js";
import { sendEnquiryReplyEmail } from "../email/email.service.js";
import groq from "../../config/groq.js";

export const getAdminEnquiriesService = async ({
  page,
  limit,
  search,
  status,
  sortBy,
  sortOrder,
}) => {
  const skip = (page - 1) * limit;
  const where = {};

  if (search) {
    where.OR = [
      {
        name: {
          contains: search,
        },
      },
      {
        email: {
          contains: search,
        },
      },
      {
        phone: {
          contains: search,
        },
      },
      {
        subject: {
          contains: search,
        },
      },
      {
        message: {
          contains: search,
        },
      },
    ];
  }

  if (status) {
    where.status = status;
  }

  const [enquiries, total] = await Promise.all([
    prisma.enquiry.findMany({
      where,
      take: limit,
      skip,
      orderBy: {
        [sortBy]: sortOrder,
      },
    }),
    prisma.enquiry.count({
      where,
    }),
  ]);
  return {
    enquiries,
    pagination: {
      total,
      page,
      limit,
      totalPages: Math.ceil(total / limit),
    },
  };
};

export const getAdminEnquiryStatisticsService = async () => {
  const [totalEnquiries, pendingEnquiries, readEnquiries, repliedEnquiries] =
    await Promise.all([
      prisma.enquiry.count(),
      prisma.enquiry.count({
        where: {
          status: EnquiryStatus.PENDING,
        },
      }),
      prisma.enquiry.count({
        where: {
          status: EnquiryStatus.READ,
        },
      }),
      prisma.enquiry.count({
        where: {
          status: EnquiryStatus.REPLIED,
        },
      }),
    ]);

  return {
    totalEnquiries,
    pendingEnquiries,
    readEnquiries,
    repliedEnquiries,
  };
};

export const getAdminEnquiryByIdService = async (id) => {
  const enquiry = await prisma.enquiry.findUnique({
    where: { id },
    include: {
      repliedBy: {
        select: {
          id: true,
          name: true,
          email: true,
        },
      },
    },
  });
  if (!enquiry) {
    throw new AppError("Enquiry not found", 404);
  }
  return enquiry;
};

export const markAdminEnquiryAsReadService = async (id) => {
  const enquiry = await prisma.enquiry.findUnique({
    where: {
      id,
    },
  });
  if (!enquiry) {
    throw new AppError("Enquiry not found", 404);
  }
  if (enquiry.status === "REPLIED") {
    return enquiry;
  }
  const updatedEnquiry = await prisma.enquiry.update({
    where: {
      id,
    },
    data: {
      status: "READ",
    },
  });
  return updatedEnquiry;
};

export const replyAdminEnquiryService = async ({
  id,
  subject,
  message,
  adminId,
}) => {
  const enquiry = await prisma.enquiry.findUnique({
    where: {
      id,
    },
  });
  if (!enquiry) {
    throw new AppError("Enquiry not found", 404);
  }
  if (enquiry.status === EnquiryStatus.REPLIED) {
    throw new AppError("This enquiry has already been replied", 400);
  }

  if (!subject || !message) {
    throw new AppError("Subject and message are required", 400);
  }

  await sendEnquiryReplyEmail({
    email: enquiry.email,
    customerName: enquiry.name,
    subject,
    message,
  });

  const updatedEnquiry = await prisma.enquiry.update({
    where: {
      id,
    },
    data: {
      status: EnquiryStatus.REPLIED,
      replySubject: subject,
      replyMessage: message,
      repliedAt: new Date(),
      repliedById: adminId,
    },
  });

  return updatedEnquiry;
};

export const generateAdminEnquiryReplyService = async (id) => {
  const enquiry = await prisma.enquiry.findUnique({
    where: {
      id,
    },
  });
  if (!enquiry) {
    throw new AppError("Enquiry not found", 404);
  }
  const prompt = `
You are a customer support assistant for Dobu Martial Arts.
Generate a professional email reply for the customer enquiry below.
Customer Name:
${enquiry.name}
Customer Email:
${enquiry.email}
Enquiry Subject:
${enquiry.subject}
Customer Message:
${enquiry.message}
Return ONLY valid JSON.
Format:
{
  "subject": "email subject",
  "message": "email body"
}
Rules:
- Be polite and professional
- Keep the reply friendly
- Do not invent information
- Do not use markdown
- Do not include explanations outside JSON
`;

  const completion = await groq.chat.completions.create({
    model: "llama-3.3-70b-versatile",
    messages: [
      {
        role: "user",
        content: prompt,
      },
    ],
    temperature: 0.7,
    response_format: {
      type: "json_object",
    },
  });

  const response = completion.choices[0].message.content;
  const reply = JSON.parse(response);
  return reply;
};
