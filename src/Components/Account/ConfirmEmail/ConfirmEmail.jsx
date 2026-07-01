import { useState, useRef, useEffect } from "react";
import { toast } from "sonner";
import { verifyOTP, resendOTP } from "../Services/confirmEmailService";
const pageStyles = `
  @keyframes fadeSlideUp {
    from { opacity: 0; transform: translateY(14px); }
    to { opacity: 1; transform: translateY(0); }
  }
  @keyframes popIn {
    0% { opacity: 0; transform: scale(0.6); }
    70% { transform: scale(1.08); }
    100% { opacity: 1; transform: scale(1); }
  }
  @keyframes checkDraw {
    from { stroke-dashoffset: 24; }
    to { stroke-dashoffset: 0; }
  }
  @keyframes shake {
    10%, 90% { transform: translateX(-1px); }
    20%, 80% { transform: translateX(2px); }
    30%, 50%, 70% { transform: translateX(-4px); }
    40%, 60% { transform: translateX(4px); }
  }
  .cep-animate-in {
    opacity: 0;
    animation: fadeSlideUp 0.55s cubic-bezier(0.16, 1, 0.3, 1) forwards;
  }
  .cep-otp-error {
    animation: shake 0.45s ease-in-out;
  }
  .cep-check-icon {
    animation: popIn 0.5s cubic-bezier(0.34, 1.56, 0.64, 1) forwards;
  }
  .cep-check-path {
    stroke-dasharray: 24;
    stroke-dashoffset: 24;
    animation: checkDraw 0.4s 0.25s ease-out forwards;
  }
`;

export default function ConfirmEmail() {
  const otpLength = 6;

  const [email, setEmail] = useState("");
  const [otp, setOtp] = useState("");
  const [errors, setErrors] = useState({});
  const [resendCooldown, setResendCooldown] = useState(30);
  const [status, setStatus] = useState("idle"); // idle | verifying | verified

  const otpDigits = otp.padEnd(otpLength, " ").split("");
  const inputRefs = useRef([]);

  useEffect(() => {
    if (resendCooldown <= 0) return;
    const timer = setInterval(() => setResendCooldown((s) => s - 1), 1000);
    return () => clearInterval(timer);
  }, [resendCooldown]);

  const setDigit = (index, value) => {
    const clean = value.replace(/[^0-9]/g, "").slice(-1);
    const digits = otp.padEnd(otpLength, " ").split("");
    digits[index] = clean || " ";
    const next = digits.join("").replace(/\s+$/, "");
    setOtp(next);
    setErrors((prev) => ({ ...prev, otp: undefined }));

    if (clean && index < otpLength - 1) {
      inputRefs.current[index + 1]?.focus();
    }
  };

  const handleKeyDown = (index, e) => {
    if (e.key === "Backspace" && !otpDigits[index].trim() && index > 0) {
      inputRefs.current[index - 1]?.focus();
    }
  };

  const handlePaste = (e) => {
    e.preventDefault();
    const pasted = e.clipboardData
      .getData("text")
      .replace(/[^0-9]/g, "")
      .slice(0, otpLength);
    if (!pasted) return;
    setOtp(pasted);
    const focusIndex = Math.min(pasted.length, otpLength - 1);
    inputRefs.current[focusIndex]?.focus();
  };

  const validateEmail = (value) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);

  const handleResend = async () => {
    if (resendCooldown > 0) return;
    if (!validateEmail(email)) {
      setErrors((prev) => ({ ...prev, email: "Enter a valid email first" }));
      return;
    }
    setResendCooldown(30);
    setErrors((prev) => ({ ...prev, general: undefined }));
    // TODO: call resend API here

    try {
      await resendOTP(email);
      toast.success("Verification code resent successfully!", {
        position: "top-right",
        description: "Please check your email for the new code.",
      });
    } catch (err) {
      toast.error("Failed to resend code. Try again.", {
        position: "top-right",
      });
      setErrors((prev) => ({
        ...prev,
        general: "Failed to resend code. Try again.",
      }));
    }
  };

  const handleVerify = async () => {
    const nextErrors = {};
    if (!validateEmail(email)) nextErrors.email = "Enter a valid email address";
    if (otp.length !== otpLength) nextErrors.otp = "Enter the 6-digit code";

    if (Object.keys(nextErrors).length) {
      setErrors(nextErrors);
      return;
    }

    setStatus("verifying");
    setErrors({});

    try {
      await verifyOTP(email, otp);
      setStatus("verified");
      toast.success("Email verified successfully!", {
        position: "top-right",
        description: "You can now proceed to login.",
      });
    } catch (err) {
      toast.error(
        "Verification failed. Please check your code and try again.",
        {
          position: "top-right",
        },
      );
    }
  };

  if (status === "verified") {
    return (
      <div className="min-h-screen flex items-center justify-center bg-slate-50 dark:bg-slate-950 px-4">
        <style>{pageStyles}</style>
        <div className="cep-animate-in w-full max-w-md rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 p-8 text-center">
          <div className="cep-check-icon w-14 h-14 mx-auto rounded-2xl bg-linear-to-br from-teal-100 to-teal-200 dark:from-teal-900 dark:to-teal-800 flex items-center justify-center mb-5">
            <svg
              className="w-7 h-7 text-teal-600 dark:text-teal-400"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth="2"
            >
              <path
                className="cep-check-path"
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M4.5 12.75l6 6 9-13.5"
              />
            </svg>
          </div>
          <h1 className="text-lg font-700 text-slate-900 dark:text-white mb-1.5">
            Email confirmed
          </h1>
          <p className="text-sm text-slate-500 dark:text-slate-400">
            {email} is verified. You're all set.
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-slate-50 dark:bg-slate-950 px-4">
      <style>{pageStyles}</style>
      <div className="w-full max-w-md">
        <div className="cep-animate-in rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 p-8 transition-shadow duration-300 hover:shadow-lg hover:shadow-slate-200/60 dark:hover:shadow-black/30">
          <div className="w-11 h-11 rounded-xl bg-linear-to-br from-brand-100 to-brand-200 dark:from-brand-900 dark:to-brand-800 flex items-center justify-center mb-5 transition-transform duration-300 hover:scale-110 hover:-rotate-3">
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
                d="M21.75 6.75v10.5a2.25 2.25 0 01-2.25 2.25h-15a2.25 2.25 0 01-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0019.5 4.5h-15a2.25 2.25 0 00-2.25 2.25m19.5 0v.243a2.25 2.25 0 01-1.07 1.916l-7.5 4.615a2.25 2.25 0 01-2.36 0L3.32 8.91a2.25 2.25 0 01-1.07-1.916V6.75"
              />
            </svg>
          </div>

          <h1 className="text-xl font-700 text-slate-900 dark:text-white mb-1.5">
            Confirm your email
          </h1>
          <p className="text-sm text-slate-500 dark:text-slate-400 mb-6">
            Enter your email and the 6-digit code we send you.
          </p>

          {errors.general && (
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
              <span>{errors.general}</span>
            </div>
          )}

          {/* Email field */}
          <div className="mb-6">
            <label
              className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1.5"
              htmlFor="email"
            >
              Email address
            </label>
            <div className="relative">
              <input
                id="email"
                name="email"
                type="email"
                value={email}
                onChange={(e) => {
                  setEmail(e.target.value);
                  setErrors((prev) => ({ ...prev, email: undefined }));
                }}
                placeholder="you@example.com"
                autoComplete="email"
                className={`w-full px-4 h-12 rounded-xl border bg-slate-50 dark:bg-slate-800 text-slate-900 dark:text-white placeholder-slate-400 text-sm transition-all duration-200 hover:border-brand-300 dark:hover:border-brand-700 focus:outline-none focus:ring-2 focus:ring-brand-500 ${
                  errors.email
                    ? "border-red-400 dark:border-red-500"
                    : "border-slate-200 dark:border-slate-700"
                }`}
              />
            </div>
            {errors.email && (
              <p className="mt-1.5 text-xs text-red-500">{errors.email}</p>
            )}
          </div>

          {/* OTP field */}
          <div className="mb-2">
            <div className="flex items-center justify-between mb-1.5">
              <label className="block text-sm font-medium text-slate-700 dark:text-slate-300">
                Verification code
              </label>
              <span className="text-xs text-slate-400">e.g. 960165</span>
            </div>

            <div
              className={`flex items-center justify-between gap-2 sm:gap-3 ${
                errors.otp ? "cep-otp-error" : ""
              }`}
              onPaste={handlePaste}
            >
              {Array.from({ length: otpLength }).map((_, i) => (
                <input
                  key={i}
                  ref={(el) => (inputRefs.current[i] = el)}
                  type="text"
                  inputMode="numeric"
                  maxLength={1}
                  value={otpDigits[i].trim()}
                  onChange={(e) => setDigit(i, e.target.value)}
                  onKeyDown={(e) => handleKeyDown(i, e)}
                  aria-label={`Digit ${i + 1} of verification code`}
                  className={`w-11 h-12 sm:w-12 sm:h-14 text-center text-lg font-700 rounded-xl border-2 bg-slate-50 dark:bg-slate-800 text-slate-900 dark:text-white transition-all duration-200 hover:scale-105 hover:border-brand-300 dark:hover:border-brand-700 focus:outline-none focus:ring-2 focus:ring-brand-500 focus:scale-105 ${
                    errors.otp
                      ? "border-red-400 dark:border-red-500"
                      : otpDigits[i].trim()
                        ? "border-brand-500"
                        : "border-slate-200 dark:border-slate-700"
                  }`}
                />
              ))}
            </div>

            {errors.otp && (
              <p className="mt-2 text-xs text-red-500">{errors.otp}</p>
            )}
          </div>

          <div className="flex items-center justify-between mt-5 mb-6">
            <button
              type="button"
              onClick={handleResend}
              disabled={resendCooldown > 0}
              className="text-xs font-medium text-brand-500 dark:text-brand-400 underline decoration-transparent hover:decoration-current underline-offset-4 disabled:text-slate-400 dark:disabled:text-slate-600 disabled:cursor-not-allowed transition-all duration-200"
            >
              {resendCooldown > 0
                ? `Resend code in ${resendCooldown}s`
                : "Resend code"}
            </button>
          </div>

          <button
            type="button"
            onClick={handleVerify}
            disabled={status === "verifying"}
            className="w-full h-12 rounded-xl bg-linear-to-br from-brand-500 to-teal-500 text-white text-sm font-700 transition-all duration-200 hover:opacity-90 hover:-translate-y-0.5 hover:shadow-lg hover:shadow-brand-500/30 active:translate-y-0 active:shadow-none disabled:opacity-60 disabled:hover:translate-y-0 disabled:hover:shadow-none"
          >
            {status === "verifying" ? "Verifying..." : "Verify email"}
          </button>
        </div>

        <p className="text-center text-xs text-slate-400 mt-5">
          Wrong email?{" "}
          <button
            type="button"
            className="text-brand-500 dark:text-brand-400 font-medium underline decoration-transparent hover:decoration-current underline-offset-4 transition-all duration-200"
          >
            Go back
          </button>
        </p>
      </div>
    </div>
  );
}
