"use client";
import React, { useRef, useEffect, useState } from "react";
import dynamic from "next/dynamic";
import Image from "next/image";
import { gsap } from "gsap";
import { motion } from "framer-motion";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Teacher from "../assets/teacher.png"
import TeacherAvatar from "../assets/teacheravatar.jpg"
import { MdArrowOutward } from "react-icons/md";
import Lecture from "../assets/lecture.png"
import Questions from "../assets/questions.png"
import Notes from "../assets/notes.png"
import Flashcard from "../assets/flashcard.png"
import Book from "../assets/book.png"
import Testimonialf from "../assets/testimonialf.jpg"
import Testimonialm from "../assets/testimonialm.jpg"
import Caltech from "../assets/caltech.svg"
import Nyu from "../assets/nyu.svg"
import San from "../assets/san.svg"
import Link from "next/link";
import Sendingguide from "./Sendingguide";
// import Footer from "./Footer";
import navlogo from "../assets/navlogo.svg";



gsap.registerPlugin(ScrollTrigger);

const Footer = dynamic(() => import("./Footer"), { //lazy loading applied on footer
  ssr: false,
  loading: () => <p>Loading...</p>,
});

function Landing() {

    const [user, setUser] = useState(null);

    const exploreRef = useRef(null);
    const section2ImgRef = useRef(null);
    const section2Ref = useRef(null);
    const carouselRef = useRef(null);
    const logoRef = useRef(null);

    const scroll = (offset) => {
        if (carouselRef.current) {
            carouselRef.current.scrollBy({ left: offset, behavior: "smooth" });
        }
    };
    //explore vutton animation
    useEffect(() => {
        const explore = exploreRef.current;
        const section2 = section2Ref.current;
        const mm = gsap.matchMedia();

        mm.add("(min-width: 769px)", () => {
            const updateAnimation = () => {
                const section2Rect = section2.getBoundingClientRect();
                const exploreRect = explore.getBoundingClientRect();
                const distance =
                    section2Rect.bottom - exploreRect.top - exploreRect.height;

                gsap.fromTo(
                    explore,
                    { scale: 1, y: 0 },
                    {
                        scale: 1.4,
                        y: distance,
                        scrollTrigger: {
                            trigger: section2,
                            start: "top 80%",
                            end: "bottom 78%",
                            scrub: 0.1,
                        },
                    }
                );
            };

            updateAnimation();
            window.addEventListener("resize", updateAnimation);

            // Cleanup for this query
            return () => {
                window.removeEventListener("resize", updateAnimation);
                ScrollTrigger.getAll().forEach((trigger) => trigger.kill());
            };
        });

        // Cleanup matchMedia context
        return () => mm.revert();
    }, []);



    //word turn blue animationa
    useEffect(() => {
        const tags = gsap.utils.toArray(".tagline"); // grab all spans

        const tl = gsap.timeline({ repeat: -1, repeatDelay: 1 }); // infinite loop

        tags.forEach((tag) => {
            tl.to(tag, { color: "#2976f1ff", duration: 0.1 }) // turn blue
                .to(tag, { color: "#9ca3af", duration: 0.1 }, "+=1"); // back to gray
        });
    }, []);

    //teacher carousel animation
    useEffect(() => {
        const track = document.querySelector(".carousel-track");
        const items = document.querySelectorAll(".carousel-item");
        const itemWidth = items[0].offsetWidth + 16; // width + gap
        const totalWidth = itemWidth * items.length;

        // Duplicate items for seamless loop
        track.innerHTML += track.innerHTML;

        let x = 0;
        let autoplay;

        const animate = () => {
            autoplay = gsap.to(track, {
                x: `-=${itemWidth}`, // shift left by one item
                duration: 2,
                ease: "power1.inOut",
                onComplete: () => {
                    x -= itemWidth;
                    if (Math.abs(x) >= totalWidth) {
                        x = 0;
                        gsap.set(track, { x: 0 }); // reset position
                    }
                    animate();
                },
            });
        };

        const stop = () => autoplay?.pause();
        const resume = () => autoplay?.play();

        // Start autoplay
        animate();

        // Pause on hover/touch
        track.addEventListener("mouseenter", stop);
        track.addEventListener("mouseleave", resume);
        track.addEventListener("touchstart", stop);
        track.addEventListener("touchend", resume);

        return () => {
            autoplay?.kill();
            track.removeEventListener("mouseenter", stop);
            track.removeEventListener("mouseleave", resume);
            track.removeEventListener("touchstart", stop);
            track.removeEventListener("touchend", resume);
        };
    }, []);


    //fetching logged in user
    useEffect(() => {
        (async () => {
            try {
                const res = await fetch("/api/auth/me", { cache: "no-store" });
                if (!res.ok) return setUser(null);
                const data = await res.json();
                if (data?.authenticated) setUser(data.user);
                else setUser(null);
            } catch {
                setUser(null);
            }
        })();
    }, []);

    //brand carousel animation
    useEffect(() => {
        const carousel = carouselRef.current;
        const totalWidth = carousel.scrollWidth / 2; // half width, as we duplicated

        gsap.to(carousel, {
            x: `-${totalWidth}px`,
            duration: 15,
            ease: "linear",
            repeat: -1,
        });
    }, []);

    const logos = [
        { src: Nyu, alt: "NYU" },
        { src: Caltech, alt: "Caltech" },
        { src: San, alt: "San" },
    ];

    //logo rotation

    useEffect(() => {
        gsap.to(logoRef.current, {
            rotationY: 360,   // Rotate around Y-axis
            duration: 3,      // 3 seconds per spin
            repeat: -1,       // Infinite loop
            ease: "linear",
            transformOrigin: "center center",
        });
    }, []);




    return (
        <>
            <div className="w-screen">
                {/* Hero section */}
                <div className="hero container flex min-h-[80vh] md:min-h-screen flex-col md:flex-row pt-20 md:pt-0">
                    {/* Logo Section - hidden on small screens */}
                    <div
                        style={{ perspective: "1000px" }}
                        className="hidden md:flex w-1/3 items-center justify-center"
                    >
                        <Image
                            style={{ transformStyle: "preserve-3d" }}
                            ref={logoRef}
                            src={navlogo}
                            alt="Logo"
                        />
                    </div>


                    <div className="hero-content w-full md:w-1/3 p-4">
                        <div className="max-w-lg flex flex-col space-y-4">
                            <h1 className="text-4xl md:text-6xl font-bold">
                                The largest IB Resources Platform on the planet
                                <span className="text-blue-500 text-sm p-2"> *PERIOD*</span>
                            </h1>
                            <p className="py-4 md:py-6 text-justify text-lg md:text-xl font-semibold text-gray-500">
                                Access over <span className="text-blue-500">5,270+ IB examiner-led videos</span> spread
                                over <span className="text-blue-500">1,188+ hours, 234+ solved past papers, 37,445+
                                    topic-wise practice questions</span> with in-depth explanations,
                                <span className="text-blue-500"> 5,912+ IB notes, 53,434+ IB flashcards, 339+ graded IA/EE Examples</span>,
                                and soooooooooo much more!
                            </p>
                            <Link
                                href="https://nailib.com/ib-resources"
                                ref={exploreRef}
                                className="px-6 md:px-8 py-3 md:py-4 text-lg md:text-xl justify-center bg-blue-400 cursor-pointer text-white font-semibold rounded-full shadow-lg hover:bg-blue-300 transition duration-300 flex items-center gap-2"
                            >
                                Explore IB Resources
                                <MdArrowOutward className="text-xl md:text-2xl" />
                            </Link>
                        </div>
                    </div>


                    <div className="hidden md:block w-1/3">

                    </div>
                </div>


                {/* Brand section */}
                <section className="text-gray-600 body-font container  min-h-[80vh] md:min-h-screen" ref={section2Ref}>
                    <div className="flex mt-6 justify-center">
                        <div className="w-16 h-1 rounded-full bg-indigo-500 inline-flex"></div>
                    </div>
                    <div className="container mx-auto flex px-5 py-4 items-center justify-center flex-col">

                        <Image
                            ref={section2ImgRef}
                            src={Teacher}
                            alt="teacher"
                            width={720}   // original width
                            height={600}  // original height
                            className="lg:w-2/6 md:w-3/6 w-5/6 mb-10 object-cover object-center rounded"
                        />
                        <div className="text-center md:mb-6 flex flex-col space-y-4 lg:w-2/3 w-full">
                            <Link href="https://nailib.com/register" className="px-2 py-2 text-xl justify-center text-blue-500 font-semibold flex items-center gap-2 cursor-pointer transition-transform duration-300 hover:scale-105">
                                Register (for free!)
                                <MdArrowOutward className="text-2xl text-blue-500" />
                            </Link>


                            <h1 className="title-font sm:text-2xl text-xl mb-4 font-medium text-gray-900">Our Students went to</h1>
                            <div className="overflow-hidden w-full h-20 bg-gray-100">
                                <div
                                    ref={carouselRef}
                                    className="flex items-center h-full whitespace-nowrap"
                                >
                                    {/* Original logos */}
                                    {logos.map((logo, index) => (
                                        <div key={`logo-${index}`} className="logo-item flex-shrink-0 px-8">
                                            <Image src={logo.src} alt={logo.alt} className="h-12 w-auto" />
                                        </div>
                                    ))}

                                    {/* Duplicate logos for infinite loop */}
                                    {logos.map((logo, index) => (
                                        <div key={`logo-duplicate-${index}`} className="logo-item flex-shrink-0 px-8">
                                            <Image src={logo.src} alt={logo.alt} className="h-12 w-auto" />
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </div>
                    </div>
                </section>

                {/* Educators */}

                <section className="text-gray-600 md:mt-4 container body-fonts">
                    <div className="container px-5 py-24 mx-auto">
                        <div className="text-center mb-20">
                            <h1 className="sm:text-6xl text-2xl font-bold title-font text-gray-900 mb-4">Ft. Best IB Educators <span className="text-blue-500"> on the planet</span></h1>
                            <p className="text-base leading-relaxed xl:w-2/4 lg:w-3/4 mx-auto text-gray-500s">Nail IB is a home to top-tier educators, including <span className="text-blue-500"> PatrickJMT</span> for Math AA SL, Patrick has over 1.2 million YouTube subs; our team also boasts <span className="text-blue-500"> certified IB examiners</span>, and <span className="text-blue-500">IB alumni with a perfect score</span>!</p>
                            <div className="flex mt-6 justify-center">
                                <div className="w-16 h-1 rounded-full bg-indigo-500 inline-flex"></div>
                            </div>
                        </div>
                        <div className="flex items-center justify-center">
                            <div className="carousel flex flex-row gap-4 h-120 w-3/4 rounded-box overflow-hidden relative">
                                <div className="carousel-track flex gap-4">

                                    <div className="carousel-item">
                                        <div className="card bg-base-100 w-96 shadow-sm">
                                            <figure>
                                                <Image
                                                    width={720}   // original width
                                                    height={220}
                                                    src={TeacherAvatar}
                                                    alt="Shoes" />
                                            </figure>
                                            <div className="card-body">
                                                <h2 className="card-title">
                                                    Ruchi Singh

                                                </h2>
                                                <p>14+ years in IB English A LAL, average score 6, unique insights as IB Examiner. Thrive with her!</p>
                                                <div className="badge badge-secondary">Video Courses</div>
                                                <div className="card-actions justify-end">
                                                    <div className="badge bg-yellow-600 text-white">English A Language & Literature HL</div>
                                                    <div className="badge bg-yellow-600 text-white">English A Language & Literature SL</div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="carousel-item">
                                        <div className="card bg-base-100 w-96 shadow-sm">
                                            <figure>
                                                <Image
                                                    width={720}   // original width
                                                    height={220}
                                                    src={TeacherAvatar}
                                                    alt="Shoes" />
                                            </figure>
                                            <div className="card-body">
                                                <h2 className="card-title">
                                                    Ruchi Singh

                                                </h2>
                                                <p>14+ years in IB English A LAL, average score 6, unique insights as IB Examiner. Thrive with her!</p>
                                                <div className="badge badge-secondary">Video Courses</div>
                                                <div className="card-actions justify-end">
                                                    <div className="badge bg-yellow-600 text-white">English A Language & Literature HL</div>
                                                    <div className="badge bg-yellow-600 text-white">English A Language & Literature SL</div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="carousel-item">
                                        <div className="card bg-base-100 w-96 shadow-sm">
                                            <figure>
                                                <Image
                                                    width={720}   // original width
                                                    height={220}
                                                    src={TeacherAvatar}
                                                    alt="Shoes" />
                                            </figure>
                                            <div className="card-body">
                                                <h2 className="card-title">
                                                    Ruchi Singh

                                                </h2>
                                                <p>14+ years in IB English A LAL, average score 6, unique insights as IB Examiner. Thrive with her!</p>
                                                <div className="badge badge-secondary">Video Courses</div>
                                                <div className="card-actions justify-end">
                                                    <div className="badge bg-yellow-600 text-white">English A Language & Literature HL</div>
                                                    <div className="badge bg-yellow-600 text-white">English A Language & Literature SL</div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="carousel-item">
                                        <div className="card bg-base-100 w-96 shadow-sm">
                                            <figure>
                                                <Image
                                                    width={720}   // original width
                                                    height={220}
                                                    src={TeacherAvatar}
                                                    alt="Shoes" />
                                            </figure>
                                            <div className="card-body">
                                                <h2 className="card-title">
                                                    Ruchi Singh

                                                </h2>
                                                <p>14+ years in IB English A LAL, average score 6, unique insights as IB Examiner. Thrive with her!</p>
                                                <div className="badge badge-secondary">Video Courses</div>
                                                <div className="card-actions justify-end">
                                                    <div className="badge bg-yellow-600 text-white">English A Language & Literature HL</div>
                                                    <div className="badge bg-yellow-600 text-white">English A Language & Literature SL</div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="carousel-item">
                                        <div className="card bg-base-100 w-96 shadow-sm">
                                            <figure>
                                                <Image
                                                    width={720}   // original width
                                                    height={220}
                                                    src={TeacherAvatar}
                                                    alt="Shoes" />
                                            </figure>
                                            <div className="card-body">
                                                <h2 className="card-title">
                                                    Ruchi Singh

                                                </h2>
                                                <p>14+ years in IB English A LAL, average score 6, unique insights as IB Examiner. Thrive with her!</p>
                                                <div className="badge badge-secondary">Video Courses</div>
                                                <div className="card-actions justify-end">
                                                    <div className="badge bg-yellow-600 text-white">English A Language & Literature HL</div>
                                                    <div className="badge bg-yellow-600 text-white">English A Language & Literature SL</div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="carousel-item">
                                        <div className="card bg-base-100 w-96 shadow-sm">
                                            <figure>
                                                <Image
                                                    width={720}   // original width
                                                    height={220}
                                                    src={TeacherAvatar}
                                                    alt="Shoes" />
                                            </figure>
                                            <div className="card-body">
                                                <h2 className="card-title">
                                                    Ruchi Singh

                                                </h2>
                                                <p>14+ years in IB English A LAL, average score 6, unique insights as IB Examiner. Thrive with her!</p>
                                                <div className="badge badge-secondary">Video Courses</div>
                                                <div className="card-actions justify-end">
                                                    <div className="badge bg-yellow-600 text-white">English A Language & Literature HL</div>
                                                    <div className="badge bg-yellow-600 text-white">English A Language & Literature SL</div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="carousel-item">
                                        <div className="card bg-base-100 w-96 shadow-sm">
                                            <figure>
                                                <Image
                                                    width={720}   // original width
                                                    height={220}
                                                    src={TeacherAvatar}
                                                    alt="Shoes" />
                                            </figure>
                                            <div className="card-body">
                                                <h2 className="card-title">
                                                    Ruchi Singh

                                                </h2>
                                                <p>14+ years in IB English A LAL, average score 6, unique insights as IB Examiner. Thrive with her!</p>
                                                <div className="badge badge-secondary">Video Courses</div>
                                                <div className="card-actions justify-end">
                                                    <div className="badge bg-yellow-600 text-white">English A Language & Literature HL</div>
                                                    <div className="badge bg-yellow-600 text-white">English A Language & Literature SL</div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* <button className="flex mx-auto mt-16 text-white bg-indigo-500 border-0 py-2 px-8 focus:outline-none hover:bg-indigo-600 rounded text-lg">Button</button> */}
                    </div>
                    <div className="flex mt-6 justify-center">
                        <div className="w-32 h-1 rounded-full bg-indigo-500 inline-flex"></div>
                    </div>
                </section>

                {/* Time to crack IB */}

                <section className="text-gray-600 body-font md:my-6">
                    <div className="mx-auto flex px-5 md:py-10 md:flex-row flex-col items-center">
                        <div className="lg:flex-grow w-screen gap-6 font-bold text-gray-400 p-4 px-8 space-x-12 lg:pr-24 md:pr-16 flex flex-col md:items-start md:text-left mb-16 md:mb-0 items-center text-left">
                            <p className="tagline text-2xl">It's time to crack IB</p>
                            <p className="text-4xl md:text-7xl"><span className="tagline">Best Tutors.</span><span className="tagline"> Flashcards.</span></p>
                            <p className="text-4xl md:text-7xl"><span className="tagline">Past Papers.</span><span className="tagline"> Question Bank.</span></p>
                            <p className="text-4xl md:text-7xl"><span className="tagline">Schools.</span></p>
                        </div>
                    </div>

                </section>

                {/* Features 1 */}
                <div className="flex mt-6 justify-center">
                    <div className="w-32 h-1 rounded-full bg-indigo-500 inline-flex"></div>
                </div>
                <section className="text-gray-600 body-font md:px-4">
                    <div className="container px-5 py-24 mx-auto flex flex-wrap">
                        <div className="flex flex-wrap -mx-4 mt-auto mb-auto lg:w-1/2 sm:w-2/3 content-start sm:pr-10">
                            <div className="w-full flex flex-col sm:p-4 px-4 mb-6">
                                <h1 className="title-font font-bold text-4xl mb-2 text-gray-900"><span className="text-blue-500">5,270+ IB Videos</span> Spread Over <span className="text-blue-500">1188+ hours</span></h1>

                                <div className="leading-relaxed font-bold text-gray-500">Experience crystal-clear HD content, seamless viewing with our "Continue Watching" feature, and access to lecture PDFs. Score a 45/45 in the IB with round-the-clock access to videos from top-tier IB educators!</div>

                                <Link href="https://nailib.com/ib-resources" className="px-4 font-bold w-fit mt-2 py-2 bg-blue-500 text-white rounded-lg shadow-md hover:bg-blue-600 transition duration-300">
                                    Watch Now
                                </Link>
                            </div>


                            <div className="p-4 sm:w-1/2 lg:w-1/4 w-1/2">
                                <h2 className="title-font font-medium text-3xl text-gray-900">5,270+</h2>
                                <p className="leading-relaxed">IB Videos</p>
                            </div>
                            <div className="p-4 sm:w-1/2 lg:w-1/4 w-1/2">
                                <h2 className="title-font font-medium text-3xl text-gray-900">1188+</h2>
                                <p className="leading-relaxed">Hours</p>
                            </div>
                            {/* <div className="p-4 sm:w-1/2 lg:w-1/4 w-1/2">
                                <h2 className="title-font font-medium text-3xl text-gray-900">35</h2>
                                <p className="leading-relaxed">Downloads</p>
                            </div> */}
                            <div className="p-4 sm:w-1/2 lg:w-1/4 w-1/2">
                                <Link href="https://nailib.com/register" className="px-2 py-2 text-xl justify-center text-blue-500 font-semibold flex items-center gap-2 cursor-pointer transition-transform duration-300 hover:scale-105">
                                    Register (for free!)
                                    <MdArrowOutward className="text-2xl text-blue-500" />
                                </Link>
                                {/* <p className="leading-relaxed">Products</p> */}
                            </div>
                        </div>
                        <div className="lg:w-1/2 sm:w-1/3 w-full rounded-lg mt-6 sm:mt-0">
                            <motion.div
                                drag
                                dragElastic={0.6}
                                dragConstraints={{ left: -100, right: 100, top: -50, bottom: 50 }}
                                className="cursor-pointer rounded-lg shadow-lg"
                            >
                                <Image className="object-cover object-center w-full h-full" src={Lecture} alt="stats" />
                            </motion.div>
                        </div>
                    </div>
                </section>

                {/* Features 2 */}

                <section className="text-gray-600 body-font md:px-4">
                    <div className="container space-y-4 md:space-x-6 px-5 py-24 mx-auto flex flex-wrap">
                        <div className="lg:w-1/2 sm:w-1/3 w-full rounded-lg mt-6 sm:mt-0">
                            <motion.div
                                drag
                                dragElastic={0.6}
                                dragConstraints={{ left: -100, right: 100, top: -50, bottom: 50 }}
                                className="cursor-pointer rounded-lg shadow-lg"
                            >
                                <Image className="object-cover object-center w-full h-full" src={Questions} alt="stats" />
                            </motion.div>
                        </div>
                        <div className="flex flex-wrap -mx-4 mt-auto mb-auto lg:w-1/2 sm:w-2/3 content-start sm:pr-10">
                            <div className="w-full flex flex-col  sm:p-4 px-4 mb-6">
                                <h1 className="title-font font-bold text-4xl mb-2 text-gray-900">
                                    <span className="text-blue-500"> 37,445+ IB-Like </span> Questions
                                </h1>
                                <div className="leading-relaxed font-bold text-gray-500">
                                    Ace your IB exams with our meticulously curated question bank, tailored for targeted practice. Filter by chapters and topics to craft your custom quiz, focusing on what matters most with our future-proof resource!
                                </div>

                                <Link href="https://nailib.com/ib-question-bank" className="px-4 font-bold w-fit mt-2 py-2 bg-blue-500 text-white rounded-lg shadow-md hover:bg-blue-600 transition duration-300">
                                    Start Quiz
                                </Link>
                            </div>
                            <div className="p-4 sm:w-1/2 lg:w-1/4 w-1/2">
                                <h2 className="title-font font-medium text-3xl text-gray-900">37,445+</h2>
                                <p className="leading-relaxed">IB-Like questions</p>
                            </div>
                            {/* <div className="p-4 sm:w-1/2 lg:w-1/4 w-1/2">
                                <h2 className="title-font font-medium text-3xl text-gray-900">1.8K</h2>
                                <p className="leading-relaxed">Subscribes</p>
                            </div>
                            <div className="p-4 sm:w-1/2 lg:w-1/4 w-1/2">
                                <h2 className="title-font font-medium text-3xl text-gray-900">35</h2>
                                <p className="leading-relaxed">Downloads</p>
                            </div> */}
                            <div className="p-4 sm:w-1/2 lg:w-1/4 w-1/2">
                                {/* <h2 className="title-font font-medium text-3xl text-gray-900">4</h2> */}
                                <Link href="https://nailib.com/register" className="px-2 font-bold py-2 text-xl justify-center text-blue-500 font-semibold flex items-center gap-2 cursor-pointer transition-transform duration-300 hover:scale-105">
                                    Register (for free!)
                                    <MdArrowOutward className="text-2xl text-blue-500" />
                                </Link>
                            </div>
                        </div>

                    </div>
                </section>

                {/* Features 3 */}
                <section className="text-gray-600 body-font md:px-4">
                    <div className="container px-5 py-24 mx-auto flex flex-wrap">
                        <div className="flex flex-wrap -mx-4 mt-auto mb-auto lg:w-1/2 sm:w-2/3 content-start sm:pr-10">
                            <div className="w-full flex flex-col sm:p-4 px-4 mb-6">
                                <h1 className="title-font font-bold text-4xl mb-2 text-gray-900"><span className="text-blue-500">5,912+ IB Notes</span>, Score Like A Pro</h1>
                                <div className="leading-relaxed font-bold text-gray-500">IB notes with real-world examples and advanced search features. Pair it with our videos and you can completely bypass your IB textbooks, and pave your way to a perfect IB score with our efficient, organized resources.</div>
                                <Link href="https://nailib.com/ib-resources" className="px-4 font-bold w-fit mt-2 py-2 bg-blue-500 text-white rounded-lg shadow-md hover:bg-blue-600 transition duration-300">
                                    Read Now
                                </Link>
                            </div>
                            <div className="p-4 sm:w-1/2 lg:w-1/4 w-1/2">
                                <h2 className="title-font font-medium text-3xl text-gray-900">5,912+</h2>
                                <p className="leading-relaxed">IB Notes</p>
                            </div>
                            <div className="p-4 sm:w-1/2 lg:w-1/4 w-1/2">
                                {/* <h2 className="title-font font-medium text-3xl text-gray-900">1188+</h2> */}
                                <Link href="https://nailib.com/register" className="px-2 font-bold py-2 text-xl justify-center text-blue-500 font-semibold flex items-center gap-2 cursor-pointer transition-transform duration-300 hover:scale-105">
                                    Register (for free!)
                                    <MdArrowOutward className="text-2xl text-blue-500" />
                                </Link>
                            </div>
                            {/* <div className="p-4 sm:w-1/2 lg:w-1/4 w-1/2">
                                <h2 className="title-font font-medium text-3xl text-gray-900">35</h2>
                                <p className="leading-relaxed">Downloads</p>
                            </div>
                            <div className="p-4 sm:w-1/2 lg:w-1/4 w-1/2">
                                <h2 className="title-font font-medium text-3xl text-gray-900">4</h2>
                                <p className="leading-relaxed">Products</p>
                            </div> */}
                        </div>
                        <div className="lg:w-1/2 sm:w-1/3 w-full rounded-lg mt-6 sm:mt-0">
                            <motion.div
                                drag
                                dragElastic={0.6}
                                dragConstraints={{ left: -100, right: 100, top: -50, bottom: 50 }}
                                className="cursor-pointer rounded-lg shadow-lg"
                            >
                                <Image className="object-cover object-center w-full h-full" src={Notes} alt="stats" />
                            </motion.div>
                        </div>
                    </div>
                </section>

                {/* Features 4 */}

                <section className="text-gray-600 body-font md:px-4">
                    <div className="container space-y-4 md:space-x-6 px-5 py-24 mx-auto flex flex-wrap">

                        <div className="lg:w-1/2 sm:w-1/3 w-full rounded-lg mt-6 sm:mt-0">
                            <motion.div
                                drag
                                dragElastic={0.6}
                                dragConstraints={{ left: -100, right: 100, top: -50, bottom: 50 }}
                                className="cursor-pointer rounded-lg shadow-lg"
                            >
                                <Image className="object-cover object-center w-full h-full" src={Flashcard} alt="stats" />
                            </motion.div>
                        </div>
                        <div className="flex flex-wrap -mx-4 mt-auto mb-auto lg:w-1/2 sm:w-2/3 content-start sm:pr-10">
                            <div className="w-full flex flex-col sm:p-4 px-4 mb-6">
                                <h1 className="title-font font-bold text-4xl mb-2 text-gray-900">
                                    <span className="text-blue-500">53,434+ IB Flashcards</span>, Flip to score
                                </h1>
                                <div className="leading-relaxed text-gray-500 font-bold">
                                    Nail IB provides you with the world's best IB Flashcard generator, allows filtering by chapter, topics, and difficulty levels. This ensures that you grasp and retain crucial concepts, paving your way to excel in your upcoming IB exams!
                                </div>
                                <Link href="https://nailib.com/ib-resources" className="px-4 font-bold w-fit mt-2 py-2 bg-blue-500 text-white rounded-lg shadow-md hover:bg-blue-600 transition duration-300">
                                    Start Flippin
                                </Link>

                            </div>
                            <div className="p-4 sm:w-1/2 lg:w-1/4 w-1/2">
                                <h2 className="title-font font-medium text-3xl text-gray-900">53,434+</h2>
                                <p className="leading-relaxed">IB Flashcards</p>
                            </div>
                            <div className="p-4 sm:w-1/2 lg:w-1/4 w-1/2">
                                {/* <h2 className="title-font font-medium text-3xl text-gray-900">1.8K</h2> */}
                                <Link href="https://nailib.com/register" className="px-2 py-2 text-xl justify-center text-blue-500 font-semibold flex items-center gap-2 cursor-pointer transition-transform duration-300 hover:scale-105">
                                    Register (for free!)
                                    <MdArrowOutward className="text-2xl text-blue-500" />
                                </Link>
                            </div>

                        </div>

                    </div>
                </section>

                <div className="flex mt-6 justify-center">
                    <div className="w-32 h-1 rounded-full bg-indigo-500 inline-flex"></div>
                </div>


                <Sendingguide />


                <div className="flex mt-6 justify-center">
                    <div className="w-32 h-1 rounded-full bg-indigo-500 inline-flex"></div>
                </div>

                {/* Testimonial */}
                <section className=" p-6 flex-col mt-4 space-y-6">
                    <div className="ml-4 text-center flex-flex-col space-y-4">
                        <p className="text-6xl font-bold">Real <span className="text-blue-500">Stories</span>, Real <span className="text-blue-500">Impact</span></p>
                        <p className="text-base leading-relaxed xl:w-2/4 lg:w-3/4 mx-auto text-gray-500s">Hear firsthand how our <span className="text-blue-500">video tutorials and study resources transformed lives</span><br /> and empowered academic success and envision a <span className="text-blue-500">brighter future for your own IB journey</span>.</p>
                    </div>
                    <div className="carousel flex space-x-4 rounded-box mb-4 mx-12   ">
                        <div className="carousel-item">
                            <Image
                                src={Testimonialm}
                                alt="Burger"
                                className="h-[400px] w-[300px] object-cover rounded-lg"
                            />
                        </div>

                        <div className="carousel-item">
                            <div className="card bg-base-100 shadow-sm h-[400px] w-[300px] rounded overflow-hidden flex flex-col">
                                <figure className="flex-shrink-0 h-[250px]">
                                    <Image
                                        src={Testimonialf}
                                        alt="Shoes"
                                        className="w-full h-full object-cover rounded-lg"
                                    />
                                </figure>

                                <div className="card-body p-4 flex flex-col justify-between flex-grow">
                                    <h2 className="card-title text-lg font-semibold text-blue-500">Ainsley Cook</h2>
                                    <p className="text-sm italic text-gray-600 text-justify">
                                        Feeling overwhelmed by the IB? Nail IB has been a game-changer for me! The video lessons are clear and concise, making ...
                                    </p>
                                </div>
                            </div>
                        </div>

                        <div className="carousel-item">
                            <Image
                                src={Testimonialm}
                                alt="Burger"
                                className="h-[400px] w-[300px] object-cover rounded-lg"
                            />
                        </div>

                        <div className="carousel-item">
                            <div className="card bg-base-100 shadow-sm h-[400px] w-[300px] rounded overflow-hidden flex flex-col">
                                <figure className="flex-shrink-0 h-[250px]">
                                    <Image
                                        src={Testimonialf}
                                        alt="Shoes"
                                        className="w-full h-full object-cover rounded-lg"
                                    />
                                </figure>

                                <div className="card-body p-4 flex flex-col justify-between flex-grow">
                                    <h2 className="card-title text-lg font-semibold text-blue-500">Ainsley Cook</h2>
                                    <p className="text-sm italic text-gray-600 text-justify">
                                        Feeling overwhelmed by the IB? Nail IB has been a game-changer for me! The video lessons are clear and concise, making ...
                                    </p>
                                </div>
                            </div>
                        </div>

                        <div className="carousel-item">
                            <Image
                                src={Testimonialm}
                                alt="Burger"
                                className="h-[400px] w-[300px] object-cover rounded-lg"
                            />
                        </div>

                        <div className="carousel-item">
                            <div className="card bg-base-100 shadow-sm h-[400px] w-[300px] rounded overflow-hidden flex flex-col">
                                <figure className="flex-shrink-0 h-[250px]">
                                    <Image
                                        src={Testimonialf}
                                        alt="Shoes"
                                        className="w-full h-full object-cover rounded-lg"
                                    />
                                </figure>

                                <div className="card-body p-4 flex flex-col justify-between flex-grow">
                                    <h2 className="card-title text-lg font-semibold text-blue-500">Ainsley Cook</h2>
                                    <p className="text-sm text-gray-600 italic text-justify">
                                        Feeling overwhelmed by the IB? Nail IB has been a game-changer for me! The video lessons are clear and concise, making ...
                                    </p>
                                </div>
                            </div>
                        </div>

                    </div>
                </section>


                <div className="flex mt-6 justify-center">
                    <div className="w-32 h-1 rounded-full bg-indigo-500 inline-flex"></div>
                </div>
                <Footer />

            </div>

        </>
    )
}

export default Landing