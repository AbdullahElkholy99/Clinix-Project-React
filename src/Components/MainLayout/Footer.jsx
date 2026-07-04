import { Link } from "react-router-dom";
import {
  Stethoscope,
  Mail,
  Phone,
  MapPin,
} from "lucide-react";
import {
  FaFacebook,
  FaInstagram,
  FaLinkedin,
} from "react-icons/fa";

export default function PatientFooter() {
  return (
    <footer className="border-t border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-900">
      <div className="container mx-auto px-6 py-12">
        <div className="grid gap-10 md:grid-cols-2 lg:grid-cols-4">
          {/* Logo & Description */}
          <div>
            <div className="mb-4 flex items-center gap-2">
              <Stethoscope className="h-8 w-8 text-teal-600 dark:text-teal-400" />
              <h2 className="text-2xl font-bold text-slate-900 dark:text-white">
                Clinix
              </h2>
            </div>

            <p className="text-sm leading-6 text-slate-600 dark:text-slate-400">
              Your trusted healthcare platform for booking doctor
              appointments, requesting home visits, and scheduling
              laboratory tests anytime.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="mb-4 text-lg font-semibold text-slate-900 dark:text-white">
              Quick Links
            </h3>

            <div className="flex flex-col gap-3 text-slate-600 dark:text-slate-400">
              <Link to="/" className="hover:text-teal-600 dark:hover:text-teal-400 transition-colors">
                Home
              </Link>

              <Link to="/doctors" className="hover:text-teal-600 dark:hover:text-teal-400 transition-colors">
                Doctors
              </Link>

              <Link to="/labs" className="hover:text-teal-600 dark:hover:text-teal-400 transition-colors">
                Laboratories
              </Link>

              <Link to="/home-visit" className="hover:text-teal-600 dark:hover:text-teal-400 transition-colors">
                Home Visit
              </Link>
            </div>
          </div>

          {/* Services */}
          <div>
            <h3 className="mb-4 text-lg font-semibold text-slate-900 dark:text-white">
              Our Services
            </h3>

            <div className="flex flex-col gap-3 text-slate-600 dark:text-slate-400">
              <p>Doctor Appointments</p>
              <p>Home Medical Visits</p>
              <p>Laboratory Tests</p>
              <p>Medical Reports</p>
            </div>
          </div>

          {/* Contact */}
          <div>
            <h3 className="mb-4 text-lg font-semibold text-slate-900 dark:text-white">
              Contact Us
            </h3>

            <div className="space-y-4 text-slate-600 dark:text-slate-400">
              <div className="flex items-center gap-3">
                <Phone className="h-5 w-5 text-teal-600 dark:text-teal-400" />
                <span>+20 100 123 4567</span>
              </div>

              <div className="flex items-center gap-3">
                <Mail className="h-5 w-5 text-teal-600 dark:text-teal-400" />
                <span>support@clinix.com</span>
              </div>

              <div className="flex items-center gap-3">
                <MapPin className="h-5 w-5 text-teal-600 dark:text-teal-400" />
                <span>Cairo, Egypt</span>
              </div>

              <div className="mt-5 flex gap-4">
                <FaFacebook className="cursor-pointer text-slate-500 dark:text-slate-400 transition-colors hover:text-teal-600 dark:hover:text-teal-400" />
                <FaInstagram className="cursor-pointer text-slate-500 dark:text-slate-400 transition-colors hover:text-teal-600 dark:hover:text-teal-400" />
                <FaLinkedin className="cursor-pointer text-slate-500 dark:text-slate-400 transition-colors hover:text-teal-600 dark:hover:text-teal-400" />
              </div>
            </div>
          </div>
        </div>

        {/* Bottom */}
        <div className="mt-10 border-t border-slate-200 dark:border-slate-800 pt-6 text-center text-sm text-slate-500 dark:text-slate-500">
          © {new Date().getFullYear()} Clinix. All Rights Reserved.
        </div>
      </div>
    </footer>
  );
}
