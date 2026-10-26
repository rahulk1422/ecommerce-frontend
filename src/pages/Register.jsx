import { Link, useNavigate } from "react-router-dom";
import { useAuthStore } from "../store/authStore";
import toast from "react-hot-toast";
import Button from "../components/common/Button";
import { useForm } from "react-hook-form";

const inputStyle = "w-full border border-gray-300 rounded-xl px-4 py-2 focus:outline-none focus:ring-2 focus:ring-primary";


function Register() {
    const login = useAuthStore((state) => state.login);
    const navigate = useNavigate();

    const {
        register,
        handleSubmit,
        getValues,
        formState: { errors },
    } = useForm();

    const onSubmit = (data) => {
        login({ name: data.fullName, email: data.email });
        toast.success("Registered successfully");
        navigate("/");
    };
    return (
        <div className="max-w-md mx-auto px-4 py-16">
            <div className="border border-gray-200 rounded-2xl p-8">
                <h1 className="text-2xl font-bold text-dark text-center mb-6">Create Account</h1>

                <form onSubmit={handleSubmit(onSubmit)}>
                    <div className="mb-4">
                        <label className="block text-sm font-medium mb-1">
                            Full Name <span className="text-danger">*</span>
                        </label>
                        <input
                            type="text"
                            placeholder="Enter your full name"
                            className={inputStyle}
                            {
                            ...register("fullName", {
                                required: "Full Name is required",
                                minLength: { value: 3, message: "Name must be at least 3 characters" }
                            })
                            }
                        />
                        {errors.fullName && (
                            <p className="text-sm text-danger mt-1">{errors.fullName.message}</p>
                        )}
                    </div>
                    <div className="mb-4">
                        <label className="block text-sm font-medium mb-1">
                            Email <span className="text-danger">*</span>
                        </label>
                        <input
                            type="text"
                            placeholder="Enter your email"
                            className={inputStyle}
                            {
                            ...register("email", {
                                required: "Email is required",
                                pattern: {
                                    value: /^\S+@\S+\.\S+$/,
                                    message: "Enter a valid email address",
                                },
                            })
                            }
                        />
                        {errors.email && (
                            <p className="text-sm text-danger mt-1">{errors.email.message}</p>
                        )}
                    </div>

                    <div className="mb-4">
                        <label className="block text-sm font-medium mb-1">
                            Password <span className="text-danger">*</span>
                        </label>
                        <input
                            type="password"
                            placeholder="Enter your password"
                            className={inputStyle}
                            {...register("password", {
                                required: "Password is required",
                                minLength: {
                                    value: 6,
                                    message: "Password must be at least 6 characters.",
                                },
                            })}
                        />
                        {errors.password && (
                            <p className="text-sm text-danger mt-1">{errors.password.message}</p>
                        )}
                    </div>
                    <div className="mb-4">
                        <label className="block text-sm font-medium mb-1">
                            Confirm Password <span className="text-danger">*</span>
                        </label>
                        <input
                            type="password"
                            placeholder="Confirm your password"
                            className={inputStyle}
                           
                            {...register("confirmedPassword", {
                                required: "Please confirm your password",
                                validate: (value) => value === getValues("password") || "Passwords do not match",
                            })}
                        />
                        {errors.confirmedPassword && (
                            <p className="text-sm text-danger mt-1">{errors.confirmedPassword.message}</p>
                        )}
                    </div>

                    <Button type="submit" size="lg" className="w-full">Register</Button>

                </form>

                <p className="text-sm text-gray-500 text-center mt-5">
                    Already have an account ? {" "} <Link to="/login" className="text-primary font-medium">Login</Link>
                </p>
            </div>
        </div>
    );
}

export default Register;