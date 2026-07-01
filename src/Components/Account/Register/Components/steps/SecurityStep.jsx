export default function SecurityStep({
  form,
  errors,
  toggleConfirmPassword,
  togglePassword,
  showConfirmPassword,
  showPassword,
  handleChange,
}) {
  const getPasswordStrength = (password) => {
    let score = 0;

    if (password.length >= 8) score++;
    if (/[A-Z]/.test(password)) score++;
    if (/[0-9]/.test(password)) score++;
    if (/[^A-Za-z0-9]/.test(password)) score++;

    return score;
  };

  const strength = getPasswordStrength(form.password);

  const colors = [
    "bg-transparent",
    "bg-red-500",
    "bg-orange-500",
    "bg-yellow-500",
    "bg-green-500",
  ];

  const labels = ["", "Weak", "Fair", "Good", "Strong"];

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
      {/* Password */}
      <div>
        <label
          htmlFor="password"
          className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1.5"
        >
          Password
        </label>

        <div className="relative">
          <input
            id="password"
            name="password"
            type={showPassword ? "text" : "password"}
            value={form.password}
            onChange={handleChange}
            placeholder="Min. 8 characters"
            autoComplete="new-password"
            className={`input-field w-full pl-4 pr-12 h-12 rounded-xl border ${
              errors.password
                ? "border-red-500"
                : "border-slate-200 dark:border-slate-700"
            } bg-slate-50 dark:bg-slate-800`}
          />

          <button
            type="button"
            onClick={togglePassword}
            className="absolute right-3 top-1/2 -translate-y-1/2"
          >
            {showPassword ? "🙈" : "👁"}
          </button>
        </div>

        {/* Password Strength */}
        <div className="mt-3">
          <div className="flex gap-2">
            {[1, 2, 3, 4].map((item) => (
              <div
                key={item}
                className={`h-2 flex-1 rounded ${
                  strength >= item ? colors[strength] : "bg-slate-200"
                }`}
              />
            ))}
          </div>

          <p className="text-xs text-slate-500 mt-1">{labels[strength]}</p>
        </div>

        {errors.password && (
          <p className="mt-2 text-sm text-red-500">{errors.password}</p>
        )}
      </div>

      {/* Confirm Password */}
      <div>
        <label
          htmlFor="confirmPassword"
          className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1.5"
        >
          Confirm Password
        </label>

        <div className="relative">
          <input
            id="confirmPassword"
            name="confirmPassword"
            type={showConfirmPassword ? "text" : "password"}
            value={form.confirmPassword}
            onChange={handleChange}
            placeholder="Repeat password"
            autoComplete="new-password"
            className={`input-field w-full pl-4 pr-12 h-12 rounded-xl border ${
              errors.confirmPassword
                ? "border-red-500"
                : "border-slate-200 dark:border-slate-700"
            } bg-slate-50 dark:bg-slate-800`}
          />

          <button
            type="button"
            onClick={toggleConfirmPassword}
            className="absolute right-3 top-1/2 -translate-y-1/2"
          >
            {showConfirmPassword ? "🙈" : "👁"}
          </button>
        </div>

        {errors.confirmPassword && (
          <p className="mt-2 text-sm text-red-500">
            {errors.confirmPassword}
          </p>
        )}
      </div>
    </div>
  );
}