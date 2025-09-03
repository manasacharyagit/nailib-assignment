import React from 'react'
import Image from "next/image";


import navlogo from "../assets/navlogo.svg";


function Footer() {
    return (
        <>
            <footer className="footer mt-2 sm:footer-horizontal bg-base-200 text-base-content p-10">
                      <div className="flex items-center">
                    <Image src={navlogo} alt="Logo" width={40} height={40} />
                </div>
                <nav>
                    <h6 className="footer-title">Quick Links</h6>
                    <a href='https://nailib.com/blog' className="link link-hover">Blog</a>
                    <a className="link link-hover">Login</a>
                    <a className="link link-hover">Register</a>
                    <a href='https://nailib.com/pricing' className="link link-hover">Pricing</a>
                    <a href='https://nailib.com/contact-us' className="link link-hover">Contact Us</a>
                    <a href='https://nailib.com/ib-resources' className="link link-hover">IB Resources <span className="px-2 py-0.5 text-xs font-medium text-green-700 bg-green-100 border border-green-500 rounded">
                        100% Free
                    </span></a>
                    <a href='https://nailib.com/sell-your-ib-docs' className="link link-hover">Sell your IB Docs <span className="px-2 py-0.5 text-xs font-medium text-green-700 bg-green-100 border border-green-500 rounded">
                        Earn Money
                    </span></a>


                </nav>
                <nav>
                    <h6 className="footer-title">Company</h6>
                    <a href='https://nailib.com/about-us' className="link link-hover">About us</a>
                    <a href='https://nailib.com/careers' className="link link-hover">Career      <a className="link link-hover">Sell your IB Docs <span className="px-2 py-0.5 text-xs font-medium text-green-700 bg-green-100 border border-green-500 rounded">
                        We're hiring
                    </span></a></a>
                    <a href='https://nailib.com/legal/privacy-policy' className="link link-hover">Privacy Policy</a>
                    <a href='https://nailib.com/legal/terms-of-service' className="link link-hover">Terms of Service</a>
                </nav>
                <nav>
                    <h6 className="footer-title">Compare</h6>
                    <a href='https://nailib.com/vs/kognity' className="link link-hover">NailIB Vs Kognity</a>
                    <a href='https://nailib.com/vs/ib-question-bank' className="link link-hover">NailIB Vs IB Question Bank</a>
                    <a href='https://nailib.com/vs/inthinking' className="link link-hover">NailIB Vs InThinking</a>
                    <a href='https://nailib.com/vs/oxford-study-courses' className="link link-hover">NailIB Vs Oxford Study Courses</a>
                    <a href='https://nailib.com/vs/revision-village' className="link link-hover">NailIB Vs Revision Village</a>
                  
                </nav>


                <form>
                    <h6 className="footer-title">Newsletter</h6>
                    <fieldset className="w-80">
                        <label>Enter your email address</label>
                        <div className="join">
                            <input
                                type="text"
                                placeholder="username@site.com"
                                className="input input-bordered join-item rounded-lg" />
                            <button className="btn btn-primary join-item">Subscribe</button>
                        </div>
                    </fieldset>
                </form>

                <nav>
                    <h6 className="footer-title">Social</h6>
                    <div className="grid grid-flow-col gap-4">
                        <a>
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                width="24"
                                height="24"
                                viewBox="0 0 24 24"
                                className="fill-current">
                                <path
                                    d="M24 4.557c-.883.392-1.832.656-2.828.775 1.017-.609 1.798-1.574 2.165-2.724-.951.564-2.005.974-3.127 1.195-.897-.957-2.178-1.555-3.594-1.555-3.179 0-5.515 2.966-4.797 6.045-4.091-.205-7.719-2.165-10.148-5.144-1.29 2.213-.669 5.108 1.523 6.574-.806-.026-1.566-.247-2.229-.616-.054 2.281 1.581 4.415 3.949 4.89-.693.188-1.452.232-2.224.084.626 1.956 2.444 3.379 4.6 3.419-2.07 1.623-4.678 2.348-7.29 2.04 2.179 1.397 4.768 2.212 7.548 2.212 9.142 0 14.307-7.721 13.995-14.646.962-.695 1.797-1.562 2.457-2.549z"></path>
                            </svg>
                        </a>
                        <a>
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                width="24"
                                height="24"
                                viewBox="0 0 24 24"
                                className="fill-current">
                                <path
                                    d="M19.615 3.184c-3.604-.246-11.631-.245-15.23 0-3.897.266-4.356 2.62-4.385 8.816.029 6.185.484 8.549 4.385 8.816 3.6.245 11.626.246 15.23 0 3.897-.266 4.356-2.62 4.385-8.816-.029-6.185-.484-8.549-4.385-8.816zm-10.615 12.816v-8l8 3.993-8 4.007z"></path>
                            </svg>
                        </a>
                        <a>
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                width="24"
                                height="24"
                                viewBox="0 0 24 24"
                                className="fill-current">
                                <path
                                    d="M9 8h-3v4h3v12h5v-12h3.642l.358-4h-4v-1.667c0-.955.192-1.333 1.115-1.333h2.885v-5h-3.808c-3.596 0-5.192 1.583-5.192 4.615v3.385z"></path>
                            </svg>
                        </a>
                    </div>
                </nav>
            </footer>
        </>
    )
}

export default Footer