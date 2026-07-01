import { useState } from "react";
import { toast } from "sonner"
import { registerDoctor, registerPatient, registerAdmin } from "../../Services/registerService";
import { useNavigate } from "react-router-dom";

export default function useRegister() {
    const navigate = useNavigate();

    const [loading, setLoading] = useState(false);
    const [success, setSuccess] = useState(false);

    //---------------------------------------- stepper 
    const [step, setStep] = useState(0);
    const nextStep = () => {
        if (isStepValid(step)) {
            setStep((prev) => prev + 1);
        }
    };
    const prevStep = () => {
        setStep((prev) => Math.max(prev - 1, 0));
    };

    const isStepValid = (step) => {
        switch (step) {
            case 0:
                return (
                    form.fullName.trim() &&
                    form.email.trim() &&
                    validateEmail(form.email) &&
                    form.phone.trim()
                );

            case 1:
                return (
                    form.password.length >= 8 &&
                    form.confirmPassword &&
                    form.password === form.confirmPassword
                );

            case 2:
                if (!form.role) return false;

                if (form.role === "doctor") {
                    return (
                        form.specializationId &&
                        form.clinicName.trim()
                    );
                }

                return true;

            case 3:
                return form.terms;

            default:
                return false;
        }
    };
    //---------------------------------------- password
    const [showPassword, setShowPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);

    const togglePassword = () => {
        setShowPassword((prev) => !prev);
    };

    const toggleConfirmPassword = () => {
        setShowConfirmPassword((prev) => !prev);
    };
    //---------------------------- end password 

    //---------------------------- start role 
    const selectRole = (role) => {
        setForm((prev) => ({
            ...prev,
            role,
        }));

        setErrors((prev) => ({
            ...prev,
            role: "",
        }));
    };
    //---------------------------- end role 

    const [form, setForm] = useState({
        fullName: "",
        email: "",
        phone: "",
        password: "",
        confirmPassword: "",
        role: "",
        specializationId: "",
        clinicName: "",
        terms: false,
    });
    const [errors, setErrors] = useState({});


    //---------------------------- start password 
    const [passwordStrength, setPasswordStrength] = useState({
        score: 0,
        label: "",
        color: "#e2e8f0",
    });

    const updateStrength = (password) => {
        let score = 0;

        if (password.length >= 8) score++;
        if (/[A-Z]/.test(password)) score++;
        if (/[0-9]/.test(password)) score++;
        if (/[^A-Za-z0-9]/.test(password)) score++;

        const colors = ["#ef4444", "#f97316", "#eab308", "#22c55e"];
        const labels = ["Weak", "Fair", "Good", "Strong"];

        setPasswordStrength({
            score,
            label: password ? labels[score - 1] || "Weak" : "",
            color: password ? colors[score - 1] || "#ef4444" : "#e2e8f0",
        });
    };
    //---------------------------- end password 

    const handleChange = (e) => {
        const { name, value, checked, type } = e.target;

        setForm((prev) => ({
            ...prev,
            [name]: type === "checkbox" ? checked : value,
        }));

        setErrors((prev) => ({
            ...prev,
            [name]: "",
        }));

        if (name === "password") {
            updateStrength(value);
        }
    };

    const validateEmail = (email) =>
        /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);

    const handleRegister = async (e) => {
        e.preventDefault();

        const newErrors = {};

        if (!form.fullName.trim())
            newErrors.fullName = "Full name is required";

        if (!form.email.trim())
            newErrors.email = "Email is required";
        else if (!validateEmail(form.email))
            newErrors.email = "Enter a valid email";

        if (!form.phone.trim())
            newErrors.phone = "Phone number is required";

        if (!form.password)
            newErrors.password = "Password is required";
        else if (form.password.length < 8)
            newErrors.password = "Minimum 8 characters";

        if (!form.confirmPassword)
            newErrors.confirmPassword = "Confirm password";
        else if (form.password !== form.confirmPassword)
            newErrors.confirmPassword = "Passwords do not match";

        if (!form.role)
            newErrors.role = "Please select a role";

        if (!form.terms)
            newErrors.terms = "Accept the terms";

        if (Object.keys(newErrors).length) {
            setErrors(newErrors);

            toast.error("Incomplete Form ,Please fix all highlighted fields. ", { position: "top-right" })
            return;
        }

        if (!isStepValid(step))
            return;

        setLoading(true);

        try {
            if (form.role === "doctor") {
                await registerDoctor(form);
            } else if (form.role === "patient") {
                await registerPatient(form);
            }
            else {
                await registerAdmin(form);
            }

            setSuccess(true);

            toast.success(`${form.role} registered successfully , Welcome to Clinix`, { position: "top-right" });

            navigate("/confirmEmail");
        } catch (err) {
            toast.error(err?.response?.data?.message || "Registration failed", { position: "top-right" });
        } finally {
            setLoading(false);
        }
    };



    return {
        form,
        errors,
        loading,
        success,

        showPassword,
        passwordStrength,
        showConfirmPassword,
        togglePassword,
        toggleConfirmPassword,

        handleChange,
        handleRegister,

        setSuccess,

        selectRole,

        step,
        nextStep,
        prevStep,
        isStepValid
    };
}
