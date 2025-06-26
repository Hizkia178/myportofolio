import aboutData from "../data/aboutData.jsx";
import Tippy from '@tippyjs/react';
import Swal from 'sweetalert2';


const About = () => {
    const resumeButtonClasses = `inline-flex items-center justify-center px-6 py-3 font-semibold rounded-lg shadow-lg transition-all duration-300 hover:shadow-xl hover:-translate-y-1 ${aboutData.resume.type === "primary"
        ? "bg-gray-800 dark:bg-white text-white dark:text-gray-800 hover:bg-gray-800 dark:hover:bg-gray-100"
        : "border-2 border-gray-800 dark:border-white text-gray-800 dark:text-white hover:bg-gray-800 hover:text-white dark:hover:bg-white dark:hover:text-gray-800"
        }`;

    return (
        <section
            id="about"
            className="min-h-screen bg-white dark:bg-gray-800 pt-20 overflow-hidden"
            data-aos="fade-down"
            data-aos-duration="1000"
        >
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                {/* Section Header */}
                <header className="text-center text-gray-800 dark:text-white mb-12">
                    <h2 className="text-5xl font-bold mb-2">{aboutData.title}</h2>
                    <p className="text-lg text-gray-800 dark:text-white">{aboutData.subtitle}</p>
                </header>

                {/* Content Grid */}
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 items-center py-12 min-h-[calc(100vh-5rem)]">
                    {/* Profile Image */}
                    <div className="w-full flex justify-center lg:justify-start" data-aos-delay="600" data-aos="fade-right">
                        <img
                            src={aboutData.image}
                            alt="About Me"
                            className="w-full max-w-md rounded-xl shadow-lg object-cover 
                             border-8 border-white dark:border-gray-800 
                             hover:shadow-3xl hover:-translate-y-2 
                             transition-all duration-300"
                        />

                    </div>

                    {/* Biodata Section */}
                    <div className="w-full text-gray-800 dark:text-white">
                        {/* About Narrative - Two Columns */}
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 mb-8" data-aos-delay="600" data-aos="fade-down">
                            <div className="flex flex-col gap-2">
                                <div className="flex items-center gap-2 mb-2">
                                    <div className="w-12 h-12 p-4 flex items-center justify-center rounded-lg shadow-lg bg-gray-800 dark:bg-white dark:text-gray-800 text-white">
                                        <i className={`bx ${aboutData.aboutNarrative.whoAmI.icon} text-xl`}></i>
                                    </div>
                                    <h3 className="text-xl font-bold text-gray-800 dark:text-white">Who Am I</h3>
                                </div>
                                <p className="text-gray-700 dark:text-gray-300">
                                    {aboutData.aboutNarrative.whoAmI.text}
                                </p>
                            </div>


                            <div className="flex flex-col gap-2">
                                <div className="flex items-center gap-2 mb-2">
                                    <div className="w-12 h-12 flex items-center justify-center rounded-lg bg-gray-800 p-4 dark:bg-white dark:text-gray-800 shadow-lg text-white">
                                        <i className={`bx ${aboutData.aboutNarrative.approach.icon} text-xl`}></i>
                                    </div>
                                    <h3 className="text-xl font-bold text-gray-800 dark:text-white">My Approach</h3>
                                </div>
                                <p className="text-gray-700 dark:text-gray-300">
                                    {aboutData.aboutNarrative.approach.text}
                                </p>
                            </div>

                        </div>
                        {/* Personal Info Heading */}
                        <div className="flex items-center gap-2 mb-4" data-aos-delay="600" data-aos="fade-down">
                            <i className="bx bx-info-circle text-2xl text-gray-800 dark:text-white" aria-hidden="true"></i>
                            <h2 className="text-2xl font-semibold text-gray-800 dark:text-white">Personal Info</h2>
                        </div>

                        {/* Biodata Grid - 2x2 Layout */}
                        <ul className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-8 max-w-lg mx-auto lg:mx-0" data-aos-delay="600" data-aos="fade-down">
                            {aboutData.biodata.map((item, index) => (
                                <li key={index} className="flex items-center gap-4">
                                    <div className="flex items-center justify-center w-12 h-12 p-4 rounded-lg bg-gray-800 dark:bg-white dark:text-gray-800 shadow-lg text-white">
                                        <i className={`${item.icon} text-xl`} aria-hidden="true"></i>
                                    </div>
                                    <div>
                                        <span className="font-semibold text-sm text-gray-800 dark:text-white">{item.label}:</span>
                                        <span className="text-sm text-gray-700 dark:text-gray-300"> {item.value}</span>
                                    </div>
                                </li>
                            ))}
                        </ul>



                        <Tippy content="Download My Resume">
                            <button
                                onClick={() => {
                                    Swal.fire({
                                        title: "Not Available Yet 😅",
                                        text: "My resume is still in progress. Please check back later!",
                                        icon: "info",
                                        confirmButtonColor: "#1F2937",
                                        confirmButtonText: "Alright",
                                    });
                                }}
                                className={resumeButtonClasses}
                                aria-label="Download Resume"
                                data-aos-delay="600"
                                data-aos="fade-down"
                            >
                                <i className={`${aboutData.resume.icon} text-lg mr-2`} aria-hidden="true"></i>
                                {aboutData.resume.label}
                            </button>
                        </Tippy>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default About;