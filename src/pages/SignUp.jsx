import React, { useEffect, useState } from "react";

import { Link, useNavigate } from "react-router";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { auth } from "../firebase";
import Input from "../components/Input";

const Signup = () => {
    const navigate = useNavigate();
    const [isLoading, setIsLoading] = useState(false);
    const [form, setForm] = useState({
        email: "",
        password: "",
        cnfPassword: ""
    });
    const [error, setError] = useState({
        email: "",
        password: "",
        cnfPassword: ""
    });

    const handleChange = (e) => {
        setError({ ...error, [e.target.name]: '' })
        setForm({ ...form, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (isLoading) return

        if (form.email === '') {
            setError(prev => ({ ...prev, email: "Please Enter email" }))
            return
        }
        if (form.password === '') {
            setError(prev => ({ ...prev, password: "Please Enter password" }))
            return
        }
        if (form.cnfPassword === '') {
            setError(prev => ({ ...prev, cnfPassword: "Please Enter Conform password" }))
            return
        }

        if (form.cnfPassword !== form.password) {
            alert("Password and conform password is not same.");
        }

        try {
            await createUserWithEmailAndPassword(auth, form.email, form.password);
            navigate("/home");
            console.log("User has successfully signed up.")
        } catch (err) {
            alert(err.message);
        }
    };

    return (
        <>
            <div className="background-image-pos">
                <img src="background-image.jpg" alt="" />
            </div>
            <div className="container d-flex justify-content-center align-items-center vh-100">
                <div className="col-md-4">
                    <div className="card shadow p-4">
                        <h2 className="text-center mb-4 fw-bold">Sign Up</h2>
                        <form onSubmit={handleSubmit}>
                            <div className="mb-4">
                                <Input
                                    label="Email"
                                    name="email"
                                    value={form.email}
                                    onChange={handleChange}
                                    placeholder="Enter your name"
                                    type="text"
                                    required
                                />
                                <p className="text-danger"><small>{error.email}</small></p>
                            </div>
                            <div className="mb-4">
                                <Input
                                    label="Password"
                                    name="password"
                                    value={form.password}
                                    onChange={handleChange}
                                    placeholder="Enter your email"
                                    type="password"
                                    required
                                />
                                <p className="text-danger"><small>{error.password}</small></p>
                            </div>
                            <div className="mb-4">
                                <Input
                                    label="Conform Password"
                                    name="cnfPassword"
                                    value={form.cnfPassword}
                                    onChange={handleChange}
                                    placeholder="Enter your password"
                                    type="password"
                                    required
                                />
                                <p className="text-danger" ><small>{error.cnfPassword}</small></p>
                            </div>
                            <button type="submit" className="btn btn-primary w-100">
                                {isLoading ? "Loading..." : "Sign Up"}
                            </button>
                        </form>

                        <button type="button" className="signup-btn" onClick={() => navigate('/')}>
                            have an account? <span>Login</span>
                        </button>

                    </div>
                </div>
            </div>
        </>
    );
};

export default Signup;
