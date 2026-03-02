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
      <div className="mx-auto max-w-7xl px-6 py-16 grid grid-cols-1 lg:grid-cols-2 gap-12">
        {/* LEFT */}
        <div>
          <h1 className="text-4xl font-bold text-gray-800">
            Neem contact met ons op
          </h1>

          <p className="mt-4 text-gray-600 max-w-md">
            Al een duidelijk beeld over wie/wat je nodig hebt? Of wil je ons gewoon beter leren kennen?
          </p>

          <div className="mt-8 space-y-4">
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

          <div className="mt-6 flex gap-4">
            <FaLinkedinIn />
            <FaFacebookF />
            <FaInstagram />
          </div>
        </div>

        {/* RIGHT - FORM */}
        <div>
          <Formik
            initialValues={initialValues}
            validationSchema={validationSchema}
            onSubmit={onSubmit}
          >
            <Form className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <Field name="firstName" placeholder="Voornaam" className={inputBase} />
                  <ErrorMessage name="firstName" component="div" className="text-red-500 text-sm mt-1" />
                </div>

                <div>
                  <Field name="lastName" placeholder="Achternaam" className={inputBase} />
                  <ErrorMessage name="lastName" component="div" className="text-red-500 text-sm mt-1" />
                </div>
              </div>

              <div>
                <Field name="email" placeholder="Email" className={inputBase} />
                <ErrorMessage name="email" component="div" className="text-red-500 text-sm mt-1" />
              </div>

              <div>
                <Field name="phone" placeholder="Telefoon" className={inputBase} />
              </div>

              <div>
                <Field
                  as="textarea"
                  name="message"
                  placeholder="Bericht"
                  rows={5}
                  className={inputBase}
                />
                <ErrorMessage name="message" component="div" className="text-red-500 text-sm mt-1" />
              </div>

              <button
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