import { Link } from "react-router-dom";
import useRegister from "../hooks/useRegister";
import Stepper from "./steppers";
import PersonalStep from "./steps/PersonalStep";
import RoleStep from "./steps/RoleStep";
import SecurityStep from "./steps/SecurityStep";
import TermsStep from "./steps/TermsStep";
import StepNavigation from "./steps/StepNavigation";

export default function RightPanel() {
  const {
    form,
    errors,

    step,
    nextStep,
    prevStep,
    isStepValid,

    togglePassword,
    showPassword,
    showConfirmPassword,
    toggleConfirmPassword,

    selectRole,
    loading,

    handleChange,
    handleRegister,
  } = useRegister();

  // //-----------------------------------------------

  return (
    <div className="mx-auto w-full max-w-4xl px-4 py-8">
      {/* Stepper */}
      <div className="mx-auto mb-10 max-w-2xl">
        <Stepper currentStep={step} />
      </div>

      {/* Form Card */}
      <form
        onSubmit={handleRegister}
        className="overflow-hidden rounded-3xl border border-slate-200/70 bg-white
                 shadow-2xl shadow-slate-200/40 backdrop-blur-sm
                 dark:border-slate-800 dark:bg-slate-900 dark:shadow-black/20"
      >
        {/* Header */}
        <div className="border-b border-slate-100 bg-slate-50/60 px-8 py-6 dark:border-slate-800 dark:bg-slate-900/40">
          <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
            <div>
              <h2 className="text-2xl font-bold text-slate-900 dark:text-white">
                Create your account
              </h2>

              <p className="mt-1 text-sm text-slate-500 dark:text-slate-400">
                Complete the following steps to join Clinix.
              </p>
            </div>

            <div className="text-sm text-slate-500 dark:text-slate-400">
              Already have an account?{" "}
              <Link
                to="/login"
                className="font-semibold text-teal-600 transition-colors hover:text-teal-700 hover:underline dark:text-teal-400 dark:hover:text-teal-300"
              >
                Sign in
              </Link>
            </div>
          </div>
        </div>
        {/* Step Content */}
        <div
          key={step}
          className="min-h-[430px] p-8 transition-all duration-300"
        >
          {step === 0 && (
            <PersonalStep
              form={form}
              errors={errors}
              handleChange={handleChange}
            />
          )}

          {step === 1 && (
            <SecurityStep
              form={form}
              errors={errors}
              showPassword={showPassword}
              showConfirmPassword={showConfirmPassword}
              togglePassword={togglePassword}
              toggleConfirmPassword={toggleConfirmPassword}
              handleChange={handleChange}
            />
          )}

          {step === 2 && (
            <RoleStep
              form={form}
              errors={errors}
              handleChange={handleChange}
              selectRole={selectRole}
            />
          )}

          {step === 3 && (
            <TermsStep
              form={form}
              errors={errors}
              handleChange={handleChange}
            />
          )}
        </div>

        {/* Footer */}
        <div className="border-t border-slate-200 bg-slate-50/40 px-8 py-6 dark:border-slate-800 dark:bg-slate-900/40">
          <StepNavigation
            step={step}
            totalSteps={4}
            loading={loading}
            canProceed={isStepValid(step)}
            onPrevious={prevStep}
            onNext={nextStep}
            previousLabel="Back"
            nextLabel="Continue"
            submitLabel="Create Account"
          />
        </div>
      </form>
    </div>
  );
}
