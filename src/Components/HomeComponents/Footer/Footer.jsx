const LINKS = [
  {
    title: "Product",
    items: ["Overview", "Features", "Solutions", "Tutorials"],
  },
  {
    title: "Company",
    items: ["About us", "Careers", "Press", "News"],
  },
  {
    title: "Resources",
    items: ["Blog", "Newsletter", "Events", "Help Center"],
  },
];

const currentYear = new Date().getFullYear();

export default function Footer() {
  return (
    <footer className="border-t bg-white">
      <div className="mx-auto max-w-7xl px-6 py-12">
        <div className="grid gap-10 md:grid-cols-2">
          <div>
            <h2 className="text-2xl font-bold text-slate-900">
              Clinix
            </h2>

            <p className="mt-3 text-slate-500">
              Smart Clinic Management System.
            </p>
          </div>

          <div className="grid grid-cols-3 gap-8">
            {LINKS.map((section) => (
              <div key={section.title}>
                <h3 className="mb-4 text-sm font-semibold uppercase text-slate-500">
                  {section.title}
                </h3>

                <ul className="space-y-2">
                  {section.items.map((item) => (
                    <li key={item}>
                      <a
                        href="#"
                        className="text-slate-600 hover:text-teal-600 transition"
                      >
                        {item}
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>

        <div className="mt-10 border-t pt-6 flex flex-col md:flex-row items-center justify-between">
          <p className="text-sm text-slate-500">
            © {currentYear} Clinix. All rights reserved.
          </p>

          <div className="flex gap-5 mt-4 md:mt-0">
            <a href="#" className="hover:text-teal-600">Facebook</a>
            <a href="#" className="hover:text-teal-600">Instagram</a>
            <a href="#" className="hover:text-teal-600">Twitter</a>
            <a href="#" className="hover:text-teal-600">GitHub</a>
          </div>
        </div>
      </div>
    </footer>
  );
}