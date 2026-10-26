import { Link, useNavigate } from "react-router-dom";
import { useAuthStore } from "../store/authStore";
import toast from "react-hot-toast";
import Button from "../components/common/Button";
import { useForm } from "react-hook-form";

const inputStyle ="w-full border border-gray-300 rounded-xl px-4 py-2 focus:outline-none focus:ring-2 focus:ring-primary";


function Login(){
    const login = useAuthStore((state) => state.login);
    const navigate = useNavigate();

    const {
        register,
        handleSubmit,
        formState: {errors},
    } = useForm();

    const onSubmit = (data) => {
        // Fake login: email ke @ se pehle wala hissa naam ban jayega
        const name = data.email.split("@")[0];

        login({name, email: data.email});
        toast.success("Logged in successfully");
        navigate("/");
    };
    return(
        <div className="max-w-md mx-auto px-4 py-16">
            <div className="border border-gray-200 rounded-2xl p-8">
                <h1 className="text-2xl font-bold text-dark text-center mb-6">Welcome Back</h1>

                <form onSubmit={handleSubmit(onSubmit)}>
                    <div className="mb-4">
                        <label className="block text-sm font-medium mb-1">
                            Email <span className="text-danger">*</span>
                        </label>
                        <input 
                              type="text" 
                              placeholder="Enter your email"
                              className={inputStyle}
                              {
                                ...register("email" , {
                                    required : "Email is required",
                                    pattern  :{
                                         value :  /^\S+@\S+\.\S+$/,
                                         message :"Enter a valid email address",
                                    },
                                })
                              }
                        />
                        {errors.email && (
                            <p className="text-sm text-danger mt-1">{errors.email.message}</p>
                        )}
                    </div>
                    
                    <div className="mb-6">
                        <label className="block text-sm font-medium mb-1">
                            Password <span className="text-danger">*</span>
                        </label>
                        <input 
                              type="password" 
                              placeholder="Enter your password"
                              className={inputStyle}
                              {...register("password", {
                                required: "password is required",
                                minLength : {
                                    value: 6,
                                    message : "Password must be at least 6 characters.",
                                },
                              })}
                        />
                        {errors.password && (
                            <p className="text-sm text-danger mt-1">{errors.password.message}</p>
                        )}
                    </div> 

                    <Button type="submit" size="lg" className="w-full">Login</Button>

                </form>

                <p className="text-sm text-gray-500 text-center mt-5">
                    New here ? {" "} <Link to="/register" className="text-primary font-medium">Register</Link>
                </p>
            </div>
        </div>
    );
}

export default Login;