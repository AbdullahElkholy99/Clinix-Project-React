import { AlertCircle } from "lucide-react";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";

export default function TermsStep({ form, errors, handleChange }) {
  return (
    <div className="space-y-6">
      <div>
        <h3 className="text-xl font-bold text-slate-900 dark:text-white">
          Terms & Conditions
        </h3>

        <p className="mt-1 text-sm text-slate-500 dark:text-slate-400">
          Please review and accept the terms before creating your account.
        </p>
      </div>

      <div className="rounded-2xl border border-slate-200 dark:border-slate-700 p-5">
        <div className="flex items-start space-x-3">
          <Checkbox
            id="terms"
            checked={form.terms}
            onCheckedChange={(checked) =>
              handleChange({
                target: {
                  name: "terms",
                  type: "checkbox",
                  checked: !!checked,
                },
              })
            }
          />

          <Label
            htmlFor="terms"
            className="text-sm leading-6 text-slate-600 dark:text-slate-300 cursor-pointer"
          >
            I agree to the{" "}
            <a
              href="#"
              className="font-medium text-teal-600 hover:underline"
            >
              Terms of Service
            </a>{" "}
            and{" "}
            <a
              href="#"
              className="font-medium text-teal-600 hover:underline"
            >
              Privacy Policy
            </a>
            . I confirm that the information I have provided is accurate.
          </Label>
        </div>

        {errors.terms && (
          <div
            className="mt-4 flex items-center gap-2 text-sm text-destructive"
            role="alert"
          >
            <AlertCircle className="h-4 w-4" />

            <span>{errors.terms}</span>
          </div>
        )}
      </div>
    </div>
  );
}