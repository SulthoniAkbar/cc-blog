import { FaEnvelope, FaMapMarkerAlt } from "react-icons/fa";

export default function ContactSection() {
  return (
    <section id="contact" className="py-16  text-white">
      <div className="container mx-auto px-6">
        <h2 className="text-4xl font-bold text-center mb-8">Contact Me</h2>
        <div className="border-t-4 border-white w-32 mx-auto mb-12"></div>

        <div className="flex flex-col md:flex-row justify-center items-center gap-8">
          <div className="flex items-center gap-4 bg-black rounded-lg px-6 py-4 shadow-lg">
            <FaEnvelope className="text-white text-3xl" />
            <p className="text-lg text-white">sulthoniakbar043@gmail.com</p>
          </div>

          <div className="flex items-center gap-4 bg-black rounded-lg px-6 py-4 shadow-lg">
            <FaMapMarkerAlt className="white text-3xl" />
            <p className="text-lg text-white">Ponorgo, Indoneisa</p>
          </div>
        </div>
      </div>
    </section>
  );
}
