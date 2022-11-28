import { useRouter } from "next/router";
import { useState } from "react";

const Signup = () => {
    const [name, setName] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");
    const router = useRouter();

    return (
        <div className="d-flex justify-content-center text-center mx-3">
            <form>
                <h1 className="h3 mb-3 fw-semibold">Sign up</h1>
                <div className="form-floating mb-1">
                    <input
                        type="text"
                        className="form-control"
                        id="title"
                        placeholder="name@example.com"
                        size={70}
                        onChange={(e) => setName(e.target.value)}
                    />
                    <label htmlFor="title">Username</label>
                </div>
                <div className="form-floating mb-1">
                    <input
                        type="password"
                        className="form-control"
                        id="url"
                        placeholder="Password"
                        onChange={(e) => setPassword(e.target.value)}
                    />
                    <label htmlFor="url">Password</label>
                </div>
                <button
                    className="w-100 btn btn-lg btn-primary"
                    type="submit"
                    onClick={async (e) => {
                        e.preventDefault();
                        const res = await fetch("api/user/create", {
                            method: "POST",
                            headers: {
                                "Content-Type":
                                    "application/json;charset=utf-8",
                            },
                            body: JSON.stringify({ name, password }),
                        });
                        if (res.ok) {
                            router.push("/");
                        } else {
                            console.log(await res.json());
                        }
                    }}
                >
                    Submit
                </button>
                <p className="mt-3 bg-danger justify-content-center rounded fw-bold text-white">
                    {error}
                </p>
                <p className="mt-5 mb-3 text-muted">© 2017-2022</p>
            </form>
        </div>
    );
};

export default Signup;
