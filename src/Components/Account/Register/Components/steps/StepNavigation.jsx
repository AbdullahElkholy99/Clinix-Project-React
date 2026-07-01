export default function StepNavigation({
  step,
  totalSteps,
  canProceed,
  loading,
  onPrevious,
  onNext,
  previousLabel = "Previous",
  nextLabel = "Next",
  submitLabel = "Submit",
}) {
  return (
    <div className="mt-8 flex items-center justify-between">
      <button
        type="button"
        onClick={onPrevious}
        disabled={step === 0}
        className="h-11 px-6 rounded-xl border border-slate-300
                   dark:border-slate-700
                   text-slate-700 dark:text-slate-300
                   transition
                   disabled:opacity-50
                   disabled:cursor-not-allowed"
      >
        {previousLabel}
      </button>

      {step === totalSteps - 1 ? (
        <button
          type="submit"
          disabled={!canProceed || loading}
          className={`h-12 px-8 rounded-xl bg-linear-to-r from-teal-600 to-brand-500
      text-white font-semibold text-sm shadow-lg transition-all duration-200
      flex items-center justify-center gap-2
      ${
        !canProceed || loading
          ? "opacity-70 cursor-not-allowed"
          : "hover:from-teal-700 hover:to-brand-600 hover:-translate-y-0.5 hover:shadow-xl"
      }`}
        >
          {loading ? (
            <>
              <svg
                className="h-5 w-5 animate-spin"
                fill="none"
                viewBox="0 0 24 24"
              >
                <circle
                  className="opacity-25"
                  cx="12"
                  cy="12"
                  r="10"
                  stroke="currentColor"
                  strokeWidth="4"
                />
                <path
                  className="opacity-75"
                  fill="currentColor"
                  d="M4 12a8 8 0 018-8v8H4z"
                />
              </svg>

              <span>Creating Account...</span>
            </>
          ) : (
            <span>{submitLabel}</span>
          )}
        </button>
      ) : (
        <button
          type="button"
          onClick={onNext}
          disabled={!canProceed}
          className={`h-12 px-8 rounded-xl text-white font-semibold transition-all duration-200
      ${
        canProceed
          ? "bg-linear-to-r from-teal-600 to-brand-500 hover:from-teal-700 hover:to-brand-600 hover:-translate-y-0.5 shadow-lg"
          : "bg-slate-300 dark:bg-slate-700 cursor-not-allowed"
      }`}
        >
          {nextLabel}
        </button>
      )}
    </div>
  );
}
