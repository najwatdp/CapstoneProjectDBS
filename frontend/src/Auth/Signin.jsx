import { useRef, useState } from "react";
import LoadingBerputar from "../Animation Loading/LoadingBerputar";
import Users from "../API/users";


function FormSign() {

    const [email, setEmail] = useState('');
    const [name, setName] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [isActive, setActive] = useState(true);
    const [message, setMessage] = useState('');

    const [LoadingButtonSubmit, setLoadingButtonSubmit] = useState(false);

    async function Register(data) {
        try {
            const res = await Users.Register(data);
            console.log(res);
        } catch (err) {
            console.log(err);
        } finally {
            setLoadingButtonSubmit(false);
        }
    }
    function Submit(e) {

        setLoadingButtonSubmit(true);

        if (password !== confirmPassword) {
            setMessage("confirm password tidak valid");

            setLoadingButtonSubmit(false);
            e.preventDefault();
        } else {
            let data = {
                name: name,
                email: email,
                password: password,
                confPassword: confirmPassword
            }
            Register(data);
        }
    }

    return (
        <form action="/login" onSubmit={Submit}>
            <span>{ message }</span>
            {isActive ? (
                <CardNext setName={setName} setEmail={setEmail} setActive={setActive} name={name} email={email} />
            ): (
                <CardSubmit setConfirmPassword={setConfirmPassword} setPassword={setPassword} InputPassword={password} confirmPassword={confirmPassword} Loading={LoadingButtonSubmit}/>
            )}
            <div className="text-center mb-10px">
                <span>I have already account? <a href="/login">Login</a></span>
            </div>
        </form>
    )
}

function CardNext({ setName, setEmail, name, email, setActive }) {

    const buttonNext = useRef('next');
    const [Loading, setLoading] = useState(false);
    const [disable, setDisable] = useState(true);

    function disableButton() {

        let nameUser = name.split("");
        let emailUser = email.split("");

        if (nameUser.length >= 1 && emailUser.length >= 1) {
            setDisable(false)
        } else {
            setDisable(true)
        }
    }

    function handleInput(e) {
        if (e.target.id === 'name') {
            disableButton();
            setName(e.target.value);
        }
        else {
            disableButton();
            setEmail(e.target.value);
        }
    }

    function Next(e) {

        setLoading(true);
        setDisable(true);

        setTimeout(() => {
            setActive(false);
        }, 1000);

        e.preventDefault();
    }


    return (
        <>
            <div className="mb-20px">
                <label htmlFor="text">Name</label>
                <input type="text" name="name" id="name" onChange={handleInput} placeholder="username" className="d-block w-100 p-8px pi-15 rounded-20px mb-5px border border-0 outline-1" disabled={Loading} />
            </div>
            <div className="mb-20px">
                <label htmlFor="email">Email Address</label>
                <input type="email" name="email" id="email" onChange={handleInput} placeholder="example@gmail.com" className="d-block w-100 p-8px pi-15 rounded-20px mb-5px border border-0 outline-1" disabled={Loading} />
            </div>
            <button onClick={Next} ref={buttonNext} className="w-100 btn btn-primary text-light rounded-20px mb-20px fs-6 border border-0 p-8px text-align-center" disabled={disable} >
                {Loading ? (
                    <LoadingBerputar wdith={20} hiegth={20} />
                ): (
                    <span>Next</span>
                )}
            </button>
        </>
    )
}

function CardSubmit({ InputPassword, confirmPassword, setPassword, setConfirmPassword, Loading}) {

    const [disableButtonSubmit, setDisableButtonSubmit] = useState(true);

    function disableButton() {

        let nameUser = InputPassword.split("");
        let emailUser = confirmPassword.split("");

        if (nameUser.length >= 1 && emailUser.length >= 1) {
            setDisableButtonSubmit(false)
        } else {
            setDisableButtonSubmit(true)
        }
    }

    function handleInput(e) {
        if (e.target.id === 'password') {
            disableButton();
            setPassword(e.target.value);
        } else {
            disableButton();
            setConfirmPassword(e.target.value);
        }
    }

    return (
        <>
            <div className="mb-20px">
                <label htmlFor="password">Password</label>
                <input type="password" name="password" id="password" onChange={handleInput} placeholder="********" className="d-block w-100 p-8px pi-15 rounded-20px mb-5px border border-0 outline-1" disabled={Loading} />
            </div>
            <div className="mb-20px">
                <label htmlFor="confirm-password">Confirm Password</label>
                <input type="password" onChange={handleInput} name="confirm-password" id="confirm-password" placeholder="********" className="d-block w-100 p-8px pi-15 rounded-20px mb-5px border border-0 outline-1" disabled={Loading} />
            </div>
            <button type="submit" className="w-100 btn btn-primary text-light rounded-20px mb-20px fs-6 border  border-0 p-8px text-align-center" disabled={disableButtonSubmit}>
                { Loading ? (
                    <LoadingBerputar wdith={20} hiegth={20}/>
                ) : (
                    <span>Create Account</span>
                )}
            </button>
        </>
    )
}

export default function Register() {

    return (
        <div className="container d-flex align-items-center justify-content-center vw-100 dvh-100">
            <div className="d-flex align-items-center justify-content-center w-80 h-90">
                <div className="d-flex flex-column w-50 h-100 p-20px w-lg-90">
                    <div className="">
                        <img src="/image/LogoHealth.jpg" className="w-60px h-60px m-0" alt="Logo Health" />
                    </div>
                    <div className="m-15px">
                        <h3 className="m-0">Get started</h3>
                        <span className="fs-15px color-span">Lorem ipsum dolor, sit amet consectetur adipisicing elit.</span>
                    </div>
                    <div className="d-flex w-100 justify-content-around gap-1 mb-10px">
                        <a href="" className="d-flex align-items-center justify-content-center g-5px p-6px pi-10px text-dark border-white shadow rounded-20px hover-border-black">
                            <img src="/image/Google.png" className="w-20px h-20px" alt="" />
                            Google</a>
                        <a href="" className="d-flex align-items-center justify-content-center g-5px p-6px pi-10px text-dark border-white shadow rounded-20px hover-border-black">
                            <img src="/image/Apple.png" className="w-20px h-20px" alt="" />
                            Apple</a>
                        <a href="" className="d-flex align-items-center justify-content-center g-5px p-6px pi-10px text-dark border-white shadow rounded-20px hover-border-black">
                            <img src="/image/Linkedin.png" className="w-20px h-20px" alt="" />
                            LinkedIn</a>
                    </div>
                    <FormSign />
                </div>
                <div className="w-100 h-100 d-none d-lg-block">
                    <img src="/image/7191136_3568984.jpg" className="w-100 h-100 object-fit-cover bg-dark" alt="" />
                </div>
            </div>
        </div>
    )
}