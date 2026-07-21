import { Zap, MessageCircleMore, ShieldCheck } from "lucide-react";
import ContactForm from "../../components/user/ContactForm";

const Contact = () => {
  const features = [
    {
      Icon: Zap,
      title: "Quick Response",
      description: "We respond to all enquiries within 24 hours.",
    },
    {
      Icon: MessageCircleMore,
      title: "Friendly Support",
      description:
        "Our team is happy to answer your questions and guide you through our programs.",
    },
    {
      Icon: ShieldCheck,
      title: "Professional Service",
      description:
        "Experienced staff providing reliable assistance and customer support.",
    },
  ];
  return (
    <div className="w-6xl mx-auto mt-10">
      <div className="flex gap-5 my-5 justify-center">
        <div className="max-w-md">
          <h3 className="mt-3 text-2xl text-(--primary-color)">CONTACT US</h3>
          <p className="mt-3">We're Here to Help!</p>
          <p className="mt-3">
            Have questions about our martial arts classes, membership plans,
            schedules, or facilities? Our team is ready to assist you. Fill out
            the enquiry form below or contact us using the information provided.
            We look forward to helping you begin your martial arts journey.
          </p>
        </div>
        <div className="max-w-md">
          <img
            src="https://placehold.co/500x500"
            alt="A student with black belt"
          />
        </div>
      </div>
      <div className="flex w-full max-w-6xl mx-auto justify-center gap-6 my-5 px-4">
        {features.map(({ Icon, title, description }, index) => (
          <div key={index} className="flex-1 my-5">
            <div className="flex items-center gap-3 mb-4">
              <Icon size={40} className="text-amber-400 shrink-0" />
              <h4 className="text-xl font-semibold">{title}</h4>
            </div>
            <p className="leading-relaxed">{description}</p>
          </div>
        ))}
      </div>

      <ContactForm />

      <section className="w-6xl my-10">
        <div className="flex gap-10 justify-center items-center">
          <hr className="w-40 border-3 border-amber-400" />
          <h3 className="text-5xl font-bold">
            We Are <span className="text-amber-400">Here</span>
          </h3>
          <hr className="w-40 border-3 border-amber-400" />
        </div>
        <iframe
          src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d7751.770162385507!2d100.5580471935791!3d13.725406700000013!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x30e29f0054a5e5ff%3A0x2f00182186160cef!2zRk1C44CQRml0bmVzcyBNYWxsIEJhbmdrb2sg44CR44OU44Op44OG44Kj44K5IC8g44Km44Ko44Kk44OI44OI44Os44O844OL44Oz44KwIFBpbGF0ZXMgLyBXZWlnaHQgVHJhaW5pbmcgU2FoYWkgUGxhY2UzQQ!5e0!3m2!1sen!2ssg!4v1784618375296!5m2!1sen!2ssg"
          className="w-full rounded-lg my-10 border-3 border-amber-50"
          height="450"
          allowFullScreen=""
          loading="lazy"
          referrerPolicy="strict-origin-when-cross-origin"
          title="FMB Fitness Mall Bangkok Location Map"
        />
      </section>
    </div>
  );
};

export default Contact;
