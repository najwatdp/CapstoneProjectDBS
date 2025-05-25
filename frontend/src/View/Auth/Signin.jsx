import {useState } from "react";
import LoadingBerputar from "../../Animation Loading/LoadingBerputar";
import Users from "../../Model/users";
import RegisterPresenter from "../../Presenter/RegisterPresenter";
import { useNavigate } from "react-router";
import { FaCross } from "react-icons/fa";
import { FaCheckCircle, FaTimesCircle } from 'react-icons/fa';


export default function Register() {

    const navigate = useNavigate();
    const [email, setEmail] = useState('');
    const [name, setName] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [isActive, setActive] = useState(true);
    const [message, setMessage] = useState('');
    const [Loading, setLoading] = useState(false);
    const [disable, setDisable] = useState(true);
    const [LoadingCheck, setLoadingCheck] = useState(false);
    const [showCheck, setShowCheck] = useState(false);
    const [emailAvailable, setEmailAvailable] = useState(true);

    const presenter = new RegisterPresenter({
        model: Users,
        view: {
            setActive: setActive,
            setLoading: setLoading,
            setMessage: setMessage,
            setDisable: setDisable,
            navigate: navigate,
            setShowCheck: setShowCheck,
            setLoadingCheck: setLoadingCheck,
            setEmailAvailable: setEmailAvailable
        }
    })

    function Next(e) {
        e.preventDefault();
        presenter.Next(name, email);
    }
    async function Submit(e) {
        e.preventDefault();
        await presenter.Register(name, email, password, confirmPassword);
    }

    async function hanldeInputEmail(e) {
        setEmail(e.target.value);
        setTimeout( async () => {
            await presenter.searchEmail(e.target.value);
        }, 500);
    }

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
                    <form onSubmit={Submit}>
                        <span>{message}</span>
                        {isActive ? (
                            <>
                                <div className="mb-20px">
                                    <label htmlFor="text">Name</label>
                                    <input type="text" name="name" id="name" onChange={(e) => setName(e.target.value)} placeholder="username" className="d-block w-100 p-8px pi-15 rounded-20px mb-5px border border-0 outline-1" disabled={Loading} />
                                </div>
                                <div className="mb-20px">
                                    <label htmlFor="email">Email Address</label>
                                    <div className="d-flex align-items-center justify-content-center w-100 p-8px pi-15 rounded-20px mb-5px border border-0 outline-1">
                                        <input type="email" name="email" id="email" onChange={hanldeInputEmail} placeholder="example@gmail.com" className="border border-0 outline-0 w-95" disabled={Loading} />
                                        { showCheck ? 
                                        <>
                                        { LoadingCheck ? <div className="w-20px"><LoadingBerputar wdith={20} hiegth={20} /></div> : emailAvailable ? <div className="c-red"><FaTimesCircle/></div> : <div className="c-green"><FaCheckCircle /></div>}
                                        </> : <></> }
                                    </div>
                                </div>
                                <button onClick={Next} className="w-100 btn btn-primary text-light rounded-20px mb-20px fs-6 border border-0 p-8px text-align-center" disabled={Loading}>
                                    {Loading ? (
                                        <LoadingBerputar wdith={20} hiegth={20} />
                                    ) : (
                                        <span>Next</span>
                                    )}
                                </button>
                            </>
                        ) : (
                            <>
                                <div className="mb-20px">
                                    <label htmlFor="password">Password</label>
                                    <input type="password" name="password" id="password" onChange={(e) => setPassword(e.target.value)} placeholder="********" className="d-block w-100 p-8px pi-15 rounded-20px mb-5px border border-0 outline-1" disabled={Loading} />
                                </div>
                                <div className="mb-20px">
                                    <label htmlFor="confirm-password">Confirm Password</label>
                                    <input type="password" onChange={(e) => setConfirmPassword(e.target.value)} name="confirm-password" id="confirm-password" placeholder="********" className="d-block w-100 p-8px pi-15 rounded-20px mb-5px border border-0 outline-1" disabled={Loading} />
                                </div>
                                <button type="submit" className="w-100 btn btn-primary text-light rounded-20px mb-20px fs-6 border  border-0 p-8px text-align-center" disabled={Loading}>
                                    {Loading ? (
                                        <LoadingBerputar wdith={20} hiegth={20} />
                                    ) : (
                                        <span>Create Account</span>
                                    )}
                                </button>
                            </>
                        )}
                        <div className="text-center mb-10px">
                            <span>I have already account? <a href="/login">Login</a></span>
                        </div>
                    </form>
                </div>
                <div className="w-100 h-100 d-none d-lg-block">
                    <img src="/image/7191136_3568984.jpg" className="w-100 h-100 object-fit-cover bg-dark" alt="" />
                </div>
            </div>
        </div>
    )
}