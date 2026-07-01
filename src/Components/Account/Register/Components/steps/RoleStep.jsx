export default function RoleStep({ handleChange, form, errors, selectRole }) {
  return (
    <>
      <div>
        <h3 className="text-xs font-700 uppercase tracking-widest text-brand-500 dark:text-brand-400 mb-4">
          Select your role
        </h3>
        {errors.role && (
          <div
            className="mb-4 flex items-center gap-2 text-sm text-red-500"
            role="alert"
          >
            <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
              <path
                fillRule="evenodd"
                d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z"
                clipRule="evenodd"
              />
            </svg>
            <span>{errors.role}</span>
          </div>
        )}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3" id="roleCards">
          {/* Doctor */}
          <div
            onClick={() => selectRole("doctor")}
            onKeyDown={(e) => {
              if (e.key === "Enter" || e.key === " ") {
                e.preventDefault();
                selectRole("doctor");
              }
            }}
            tabIndex={0}
            role="radio"
            aria-checked={form.role === "doctor"}
            aria-label="Doctor"
            className={`role-card rounded-2xl border-2 p-4 cursor-pointer transition-all ${
              form.role === "doctor"
                ? "selected border-brand-500"
                : "border-slate-200 dark:border-slate-700"
            }`}
          >
            <div className="flex flex-col items-center justify-center">
              <div className="w-10 h-10 rounded-xl bg-linear-to-br from-brand-100 to-brand-200 dark:from-brand-900 dark:to-brand-800 flex items-center justify-center mb-3">
                <svg
                  className="w-5 h-5 text-brand-600 dark:text-brand-400"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth="1.8"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M9.75 3.104v5.714a2.25 2.25 0 01-.659 1.591L5 14.5M9.75 3.104c-.251.023-.501.05-.75.082m.75-.082a24.301 24.301 0 014.5 0m0 0v5.714a2.25 2.25 0 001.5 2.122m-1.5-2.122c.252.023.502.05.75.082M19.5 14.5l-4.091-4.091A2.25 2.25 0 0114.25 8.818V3.104m5.25 11.396A24.27 24.27 0 0112 21.75c-3.663 0-7.115-.8-10.207-2.229"
                  />
                </svg>
              </div>

              <p className="font-700 text-sm text-slate-900 dark:text-white">
                Doctor
              </p>
            </div>

            <p className="text-xs text-slate-500 dark:text-slate-400 mt-1 leading-relaxed">
              Medical practitioner with full patient access
            </p>
            <div className="mt-3 flex items-center gap-1.5">
              <div
                className={`w-4 h-4 rounded-full border-2 transition-all ${
                  form.role === "doctor"
                    ? "bg-linear-to-br from-sky-500 to-teal-500 border-transparent"
                    : "border-slate-300 dark:border-slate-600"
                }`}
              />
              <span className="text-xs text-slate-400">
                {form.role === "doctor" ? "Selected" : "Select"}
              </span>
            </div>
          </div>

          {/* Patient */}
          <div
            onClick={() => selectRole("patient")}
            onKeyDown={(e) => {
              if (e.key === "Enter" || e.key === " ") {
                e.preventDefault();
                selectRole("patient");
              }
            }}
            tabIndex={0}
            role="radio"
            aria-checked={form.role === "patient"}
            aria-label="Patient"
            className={`role-card rounded-2xl border-2 bg-white dark:bg-slate-800 p-4 cursor-pointer transition-all ${
              form.role === "patient"
                ? "selected border-teal-500"
                : "border-slate-200 dark:border-slate-700"
            }`}
          >
            <div className="flex flex-col items-center justify-center">
              <div className="w-10 h-10 rounded-xl bg-linear-to-br from-teal-100 to-teal-200 dark:from-teal-900 dark:to-teal-800 flex items-center justify-center mb-3">
                <svg
                  className="w-5 h-5 text-teal-600 dark:text-teal-400"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth="1.8"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M6.75 3v2.25M17.25 3v2.25M3 18.75V7.5a2.25 2.25 0 012.25-2.25h13.5A2.25 2.25 0 0121 7.5v11.25m-18 0A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75m-18 0v-7.5A2.25 2.25 0 015.25 9h13.5A2.25 2.25 0 0121 11.25v7.5m-9-6h.008v.008H12v-.008zM12 15h.008v.008H12V15zm0 2.25h.008v.008H12v-.008zM9.75 15h.008v.008H9.75V15zm0 2.25h.008v.008H9.75v-.008zM7.5 15h.008v.008H7.5V15zm0 2.25h.008v.008H7.5v-.008zm6.75-4.5h.008v.008h-.008v-.008zm0 2.25h.008v.008h-.008V15zm0 2.25h.008v.008h-.008v-.008zm2.25-4.5h.008v.008H16.5v-.008zm0 2.25h.008v.008H16.5V15z"
                  />
                </svg>
              </div>

              <p className="font-700 text-sm text-slate-900 dark:text-white">
                Patient
              </p>
            </div>
            <p className="text-xs text-slate-500 dark:text-slate-400 mt-1 leading-relaxed">
              Manages appointments and front desk
            </p>

            <div className="mt-3 flex items-center gap-1.5">
              <div
                className={`w-4 h-4 rounded-full border-2 transition-all ${
                  form.role === "patient"
                    ? "bg-linear-to-br from-teal-500 to-cyan-500 border-transparent"
                    : "border-slate-300 dark:border-slate-600"
                }`}
              />
              <span className="text-xs text-slate-400">
                {form.role === "patient" ? "Selected" : "Select"}
              </span>
            </div>
          </div>

          {/* Admin */}
          <div
            onClick={() => selectRole("admin")}
            onKeyDown={(e) => {
              if (e.key === "Enter" || e.key === " ") {
                e.preventDefault();
                selectRole("admin");
              }
            }}
            tabIndex={0}
            role="radio"
            aria-checked={form.role === "admin"}
            aria-label="Admin"
            className={`role-card rounded-2xl border-2 bg-white dark:bg-slate-800 p-4 cursor-pointer transition-all ${
              form.role === "admin"
                ? "selected border-violet-500"
                : "border-slate-200 dark:border-slate-700"
            }`}
          >
            <div className="flex flex-col items-center justify-center">
              <div className="w-10 h-10 rounded-xl bg-linear-to-br from-violet-100 to-violet-200 dark:from-violet-900 dark:to-violet-800 flex items-center justify-center mb-3">
                <svg
                  className="w-5 h-5 text-violet-600 dark:text-violet-400"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth="1.8"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M10.343 3.94c.09-.542.56-.94 1.11-.94h1.093c.55 0 1.02.398 1.11.94l.149.894c.07.424.384.764.78.93.398.164.855.142 1.205-.108l.737-.527a1.125 1.125 0 011.45.12l.773.774c.39.389.44 1.002.12 1.45l-.527.737c-.25.35-.272.806-.107 1.204.165.397.505.71.93.78l.893.15c.543.09.94.56.94 1.109v1.094c0 .55-.397 1.02-.94 1.11l-.893.149c-.425.07-.765.383-.93.78-.165.398-.143.854.107 1.204l.527.738c.32.447.269 1.06-.12 1.45l-.774.773a1.125 1.125 0 01-1.449.12l-.738-.527c-.35-.25-.806-.272-1.203-.107-.397.165-.71.505-.781.929l-.149.894c-.09.542-.56.94-1.11.94h-1.094c-.55 0-1.019-.398-1.11-.94l-.148-.894c-.071-.424-.384-.764-.781-.93-.398-.164-.854-.142-1.204.108l-.738.527c-.447.32-1.06.269-1.45-.12l-.773-.774a1.125 1.125 0 01-.12-1.45l.527-.737c.25-.35.273-.806.108-1.204-.165-.397-.505-.71-.93-.78l-.894-.15c-.542-.09-.94-.56-.94-1.109v-1.094c0-.55.398-1.02.94-1.11l.894-.149c.424-.07.765-.383.93-.78.165-.398.143-.854-.108-1.204l-.526-.738a1.125 1.125 0 01.12-1.45l.773-.773a1.125 1.125 0 011.45-.12l.737.527c.35.25.807.272 1.204.107.397-.165.71-.505.78-.929l.15-.894z"
                  />
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                  />
                </svg>
              </div>
              <p className="font-700 text-sm text-slate-900 dark:text-white">
                Admin
              </p>
            </div>

            <p className="text-xs text-slate-500 dark:text-slate-400 mt-1 leading-relaxed">
              Full system access and configuration
            </p>

            <div className="mt-3 flex items-center gap-1.5">
              <div
                className={`w-4 h-4 rounded-full border-2 transition-all ${
                  form.role === "admin"
                    ? "bg-linear-to-br from-violet-500 to-fuchsia-500 border-transparent"
                    : "border-slate-300 dark:border-slate-600"
                }`}
              />
              <span className="text-xs text-slate-400">
                {form.role === "admin" ? "Selected" : "Select"}
              </span>
            </div>
          </div>
        </div>

        {/* ── Section: Doctor Medical Info (conditional) ── */}
        <div
          className={`doctor-section ${
            form.role === "doctor" ? "visible" : ""
          }`}
        >
          <div className="rounded-2xl border border-brand-200 dark:border-brand-800/50 bg-brand-50/50 dark:bg-brand-900/20 p-5">
            <h3 className="text-xs font-700 uppercase tracking-widest text-brand-500 dark:text-brand-400 mb-4 flex items-center gap-2">
              <svg
                className="w-4 h-4"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth="2"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M9.75 3.104v5.714a2.25 2.25 0 01-.659 1.591L5 14.5M9.75 3.104c-.251.023-.501.05-.75.082m.75-.082a24.301 24.301 0 014.5 0m0 0v5.714a2.25 2.25 0 001.5 2.122m-1.5-2.122c.252.023.502.05.75.082M19.5 14.5l-4.091-4.091A2.25 2.25 0 0114.25 8.818V3.104m5.25 11.396A24.27 24.27 0 0112 21.75c-3.663 0-7.115-.8-10.207-2.229"
                />
              </svg>
              Medical Information
            </h3>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              {/* Specialty */}
              <div>
                <label
                  className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1.5"
                  htmlFor="specializationId"
                >
                  Medical specialty
                </label>
                <div className="relative">
                  <select
                    id="specializationId"
                    name="specializationId"
                    value={form.specializationId}
                    onChange={handleChange}
                    className="input-field w-full px-4 h-12 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-slate-900 dark:text-white text-sm appearance-none transition-all duration-200"
                  >
                    <option value="">Select specialty</option>
                    <option>General Practice</option>
                    <option>Cardiology</option>
                    <option>Dermatology</option>
                    <option>Endocrinology</option>
                    <option>Gastroenterology</option>
                    <option>Neurology</option>
                    <option>Oncology</option>
                    <option>Ophthalmology</option>
                    <option>Orthopedics</option>
                    <option>Pediatrics</option>
                    <option>Psychiatry</option>
                    <option>Radiology</option>
                    <option>Surgery</option>
                    <option>Urology</option>
                  </select>
                  <span className="absolute right-3.5 top-1/2 -translate-y-1/2 text-slate-400 pointer-events-none">
                    <svg
                      className="w-4 h-4"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                      strokeWidth="2"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M19.5 8.25l-7.5 7.5-7.5-7.5"
                      />
                    </svg>
                  </span>
                </div>
              </div>

              {/* Clinic Name */}
              <div>
                <label
                  className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1.5"
                  htmlFor="clinicName"
                >
                  Clinic Name
                </label>
                <input
                  id="clinicName"
                  name="clinicName"
                  value={form.clinicName}
                  onChange={handleChange}
                  type="text"
                  placeholder="clinic"
                  className="input-field w-full px-4 h-12 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-slate-900 dark:text-white placeholder-slate-400 text-sm transition-all duration-200"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
