import { Formik, Form, Field, ErrorMessage } from "formik";
import type { FormikHelpers } from "formik";
import * as Yup from "yup";
import { HiArrowUpRight } from "react-icons/hi2";
import { BsTelephone } from "react-icons/bs";
import { GoMail } from "react-icons/go";
import { FaLinkedinIn, FaFacebookF, FaInstagram } from "react-icons/fa";

type ContactValues = {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  message: string;
};

const validationSchema = Yup.object({
  firstName: Yup.string().required("Voornaam is verplicht"),
  lastName: Yup.string().required("Achternaam is verplicht"),
  email: Yup.string().email("Ongeldig emailadres").required("Email is verplicht"),
  phone: Yup.string(),
  message: Yup.string().min(10, "Minstens 10 tekens").required("Bericht is verplicht"),
});

const inputBase =
  "w-full rounded-md border border-gray-300 px-4 py-3 outline-none focus:border-[#F4C709] focus:ring-2 focus:ring-[#F4C709]/30";

function ContactPage() {
  const initialValues: ContactValues = {
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    message: "",
  };

  const onSubmit = (
    values: ContactValues,
    helpers: FormikHelpers<ContactValues>
  ) => {
    console.log(values);
    helpers.resetForm();
  };

  return (
    <section className="w-full bg-white font-ttnorms">
      <div className="mx-auto max-w-7xl px-6 pt-28 grid grid-cols-1 lg:grid-cols-2 gap-12">
        {/* LEFT */}
        <div>
          <h1 className="text-4xl font-bold text-gray-800">
            Neem contact met ons op
          </h1>

          <p className="mt-4 text-gray-600 max-w-md">
            Al een duidelijk beeld over wie/wat je nodig hebt? Of wil je ons gewoon beter leren kennen?
          </p>

          <div className="mt-8 space-y-4 pt-5">
            <a
                href="tel:+3234508842"
                className="flex items-center gap-3 text-gray-800  hover:text-yellow-500"
            >
                <BsTelephone className="text-[#F4C709]" />
                <span className="inline-flex items-center gap-2 border-b-2 border-[#F4C709] pb-1">
                +32 3 450 88 42
                <HiArrowUpRight className="text-[#F4C709] text-sm" />
                </span>
            </a>

            <a
                href="mailto:info@brightest.be"
                className="flex items-center gap-3 text-gray-800  hover:text-yellow-500"
               
            >
                <GoMail className="text-[#F4C709]" />
                <span className="inline-flex items-center gap-2 border-b-2 border-[#F4C709] pb-1">
                info@brightest.be
                <HiArrowUpRight className="text-[#F4C709] text-sm" />
                </span>
            </a>
            </div>

                <div className="mt-6 flex gap-2 pt-3">
                    <div className="w-10 h-10 rounded-full bg-gray-800 flex items-center justify-center hover:scale-105 transition">
                        <FaLinkedinIn className="text-[#F4C709] text-base" />
                    </div>

                    <div className="w-10 h-10 rounded-full bg-gray-800 flex items-center justify-center hover:scale-105 transition">
                        <FaFacebookF className="text-[#F4C709] text-base" />
                    </div>

                    <div className="w-10 h-10 rounded-full bg-gray-800 flex items-center justify-center hover:scale-105 transition">
                        <FaInstagram className="text-[#F4C709] text-base" />
                    </div>
                </div>
            </div>

        {/* RIGHT - FORM */}
        <div>
          <Formik
            initialValues={initialValues}
            validationSchema={validationSchema}
            onSubmit={onSubmit}
          >
                    <Form className="space-y-8">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div>
                <label className="block text-sm font-semibold text-gray-800 mb-2">
                    Voornaam <span className="text-gray-500">*</span>
                </label>
               <Field
                  name="firstName"
                  data-testid="contact-firstname-input"
                  className={inputBase}
                />
                </div>

                <div>
                <label className="block text-sm font-semibold text-gray-800 mb-2">
                    Achternaam <span className="text-gray-500">*</span>
                </label>
                <Field
                  name="lastName"
                  data-testid="contact-lastname-input"
                  className={inputBase}
                />
                </div>
            </div>

            <div>
                <label className="block text-sm font-semibold text-gray-800 mb-2">
                Email <span className="text-gray-500">*</span>
                </label>
                <Field
                  name="email"
                  type="email"
                  data-testid="contact-email-input"
                  className={inputBase}
                />
                <ErrorMessage name="email" component="div" className="text-red-500 text-sm mt-2" />
            </div>

            <div>
                <label className="block text-sm font-semibold text-gray-800 mb-2">
                Telefoon
                </label>
                <Field
                  name="phone"
                  data-testid="contact-phone-input"
                  className={inputBase}
                />
            </div>

            <div>
                <label className="block text-sm font-semibold text-gray-800 mb-2">
                Bericht
                </label>
                <Field
                as="textarea"
                name="message"
                rows={8}
                 data-testid="contact-message-input"
                className={`${inputBase} resize-none`}
                />
                <ErrorMessage name="message" component="div" className="text-red-500 text-sm mt-2" />
            </div>

            <button
                 data-testid="contact-submit-button"
                type="submit"
                className="bg-[#F4C709] text-black px-6 py-3 rounded-md font-semibold hover:opacity-90 transition"
            >
                Verstuur
            </button>
            </Form>
          </Formik>
        </div>
      </div>
    </section>
  );
}

export default ContactPage;