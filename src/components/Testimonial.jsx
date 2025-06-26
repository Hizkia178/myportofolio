import { useState, useEffect } from "react";
import { createClient } from "@supabase/supabase-js";
import Swal from "sweetalert2";

// Inisialisasi Supabase client
const supabaseUrl = "https://yifexgkxhzlndrrdpnqh.supabase.co";
const supabaseKey = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InlpZmV4Z2t4aHpsbmRycmRwbnFoIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTA5NDQ1NTAsImV4cCI6MjA2NjUyMDU1MH0.D-Y3Bbuqk5ZMdbDAeW0kvgs_44NxSGJmXePauhWY6vA";
const supabase = createClient(supabaseUrl, supabaseKey);

const CustomModal = ({ isOpen, onClose, children }) => {
    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center">
            {/* Backdrop */}
            <div
                className="absolute inset-0 backdrop-blur-xl transition-opacity"
                onClick={onClose}
            />

            {/* Modal Content */}
            <div className="relative bg-white dark:bg-gray-800 rounded-xl shadow-lg max-w-md w-full mx-4 transform transition-all">
                <button
                    onClick={onClose}
                    className="absolute top-4 right-4 text-gray-400 hover:text-gray-600 dark:hover:text-gray-300 transition-colors"
                    aria-label="Close modal"
                >
                    <i className="bx bx-x text-2xl"></i>
                </button>
                {children}
            </div>
        </div>
    );
};

const Testimonials = () => {
    const [testimonials, setTestimonials] = useState([]);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        content: '',
        position: ''
    });
    const [errors, setErrors] = useState({});
    const [isSubmitting, setIsSubmitting] = useState(false);

    // Fetch testimonials dari Supabase saat komponen mount
    useEffect(() => {
        const fetchTestimonials = async () => {
            const { data, error } = await supabase
                .from('testimonials')
                .select('*')
                .order('created_at', { ascending: false });
            if (error) {
                console.error('Error fetching testimonials:', error);
            } else {
                setTestimonials(data);
            }
        };
        fetchTestimonials();
    }, []);

    // Handle form input changes
    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: value
        }));
        // Clear error when user starts typing
        if (errors[name]) {
            setErrors(prev => ({
                ...prev,
                [name]: ''
            }));
        }
    };

    // Validate form
    const validateForm = () => {
        const newErrors = {};

        if (!formData.name.trim()) {
            newErrors.name = 'Name is required';
        }

        if (!formData.email.trim()) {
            newErrors.email = 'Email is required';
        } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
            newErrors.email = 'Invalid email format';
        }

        if (!formData.content.trim()) {
            newErrors.content = 'Testimonial is required';
        } else if (formData.content.trim().length < 10) {
            newErrors.content = 'Testimonial must be at least 10 characters';
        }

        if (!formData.position.trim()) {
            newErrors.position = 'Position is required';
        }

        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    // Handle form submission
    const handleSubmit = async () => {
        if (!validateForm()) {
            return;
        }

        setIsSubmitting(true);

        // Insert testimonial ke Supabase
        const { error } = await supabase.from('testimonials').insert([
            {
                name: formData.name,
                email: formData.email,
                content: formData.content,
                position: formData.position,
                rating: 5,
                avatar: `https://ui-avatars.com/api/?name=${encodeURIComponent(formData.name)}&background=1f2937&color=fff&size=100`
            }
        ]);

        if (error) {
            setIsSubmitting(false);
            console.error('Error submitting testimonial:', error);
            Swal.fire({
                icon: 'error',
                title: 'Oops...',
                text: 'Failed to submit testimonial. Please try again.',
                confirmButtonColor: '#1f2937',
                customClass: {
                    popup: 'dark:bg-gray-800 dark:text-white',
                    title: 'dark:text-white',
                    content: 'dark:text-white'
                }
            });
            return;
        }

        // Refresh testimonials
        const { data } = await supabase
            .from('testimonials')
            .select('*')
            .order('created_at', { ascending: false });
        setTestimonials(data || []);

        setFormData({ name: '', email: '', content: '', position: '' });
        setIsModalOpen(false);
        setIsSubmitting(false);

        // Show success message
        Swal.fire({
            icon: 'success',
            title: 'Thank You!',
            text: 'Testimonial submitted successfully!',
            confirmButtonColor: '#1f2937',
            customClass: {
                popup: 'dark:bg-gray-800 dark:text-white',
                title: 'dark:text-white',
                content: 'dark:text-white'
            }
        });
    };

    // Render stars
    const renderStars = (rating) => {
        return [...Array(5)].map((_, index) => (
            <i
                key={index}
                className={`bx bxs-star text-sm ${index < rating ? 'text-yellow-400' : 'text-gray-300'}`}
            />
        ));
    };

    return (
        <section
            id="testimonials"
            className="pt-20 min-h-screen  overflow-hidden px-4 sm:px-6 lg:px-8 bg-white dark:bg-gray-800"
            data-aos-duration="1000"
            data-aos="fade-down"
        >
            <div className="max-w-7xl mx-auto">
                {/* Header */}
                <div className="text-center mb-16" data-aos-delay="600" data-aos="fade-down">
                    <h2 className="text-5xl md:text-5xl font-bold text-gray-800 dark:text-white mb-4">
                        What People Say
                    </h2>
                    <p className="text-lg text-gray-800 dark:text-white max-w-2xl mx-auto">
                        Voices from clients, collaborators, and friends who have experienced my work.
                    </p>
                </div>

                {/* Testimonial Card */}
                <div className="bg-white dark:bg-gray-800 rounded-lg mb-10 shadow-lg border border-white dark:border-white max-w-4xl mx-auto" data-aos-delay="600" data-aos="fade-up">
                    {/* Card Header */}
                    <div className="flex justify-between items-center p-6 border-b border-gray-200 dark:border-gray-700">
                        <h3 className="text-xl font-semibold text-gray-800 dark:text-white flex items-center gap-2">
                            <i className="bx bx-comment-detail text-2xl" />
                            Testimonials
                        </h3>

                        <button
                            onClick={() => setIsModalOpen(true)}
                            className="px-6 py-2 bg-gray-800 ml-3 text-white dark:bg-white dark:text-gray-800 rounded-lg font-medium  flex items-center gap-2 transition-all duration-300 transform hover:-translate-y-0.5 hover:shadow-lg"
                            aria-label="Add a new testimonial"
                        >
                            <i className="bx bx-plus text-lg" />
                            Add Testimonial
                        </button>
                    </div>

                    {/* Card Body (Scrollable) */}
                    <div className="max-h-[500px] overflow-y-auto scrollbar-hide p-6">
                        {testimonials.length > 0 ? (
                            <div className="space-y-6">
                                {testimonials.map((testimonial, index) => (
                                    <div
                                        key={testimonial.id}
                                        className="bg-white shadow-lg dark:border dark:border-white dark:bg-gray-800 rounded-lg p-4 transition-all duration-300"
                                        style={{
                                            animationDelay: `${index * 100}ms`
                                        }}
                                    >
                                        {/* Quote Icon */}
                                        <div className="mb-2">
                                            <i className="bx bxs-quote-alt-left text-2xl text-gray-300 dark:text-gray-600" />
                                        </div>

                                        {/* Content */}
                                        <p className="text-gray-800 dark:text-white mb-4 leading-relaxed text-sm">
                                            {testimonial.content}
                                        </p>

                                        {/* Rating */}
                                        <div className="flex items-center gap-1 mb-3">
                                            {renderStars(testimonial.rating)}
                                        </div>

                                        {/* Author Info */}
                                        <div className="flex items-center gap-3">
                                            <img
                                                src={testimonial.avatar}
                                                alt={`Avatar of ${testimonial.name}`}
                                                className="w-10 h-10 rounded-full shadow-lg object-cover ring-2 ring-gray-200 dark:ring-gray-600"
                                                onError={(e) => {
                                                    e.target.src = `https://ui-avatars.com/api/?name=${encodeURIComponent(testimonial.name)}&background=1f2937&color=fff&size=48`;
                                                }}
                                            />
                                            <div>
                                                <h4 className="font-semibold text-gray-800 dark:text-white text-sm">
                                                    {testimonial.name}
                                                </h4>
                                                <p className="text-xs text-gray-800 dark:text-white">
                                                    {testimonial.position}
                                                </p>
                                            </div>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        ) : (
                            <div className="text-center py-12">
                                <i className="bx bx-message-dots text-6xl text-gray-300 dark:text-gray-600 mb-4 animate-pulse" />
                                <p className="text-lg font-semibold text-gray-800 dark:text-white mb-2">
                                    No Testimonials Yet
                                </p>
                                <p className="text-sm text-gray-800 dark:text-white max-w-sm mx-auto">
                                    Be the first to share your experience and inspire others with your story!
                                </p>
                            </div>
                        )}
                    </div>
                </div>
            </div>

            {/* Custom Modal */}
            <CustomModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)}>
                <div className="p-6 sm:p-8">
                    <div className="text-center mb-8">
                        <div className="w-12 h-12 bg-gray-800 dark:bg-white rounded-full flex items-center justify-center mx-auto mb-4">
                            <i className="bx bx-message-dots text-xl text-white dark:text-gray-800" />
                        </div>
                        <h3 className="text-xl font-bold text-gray-800 dark:text-white mb-2">
                            Share Your Testimonial
                        </h3>
                        <p className="text-sm text-gray-800 dark:text-white">
                            Tell us about your experience working with us
                        </p>
                    </div>

                    <div className="grid gap-4">
                        {/* Name Input */}
                        <div>
                            <label className="block text-sm font-medium text-gray-800 dark:text-white mb-1">
                                Full Name
                            </label>
                            <div className="relative">
                                <i className="bx bx-id-card absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                                <input
                                    type="text"
                                    name="name"
                                    value={formData.name}
                                    onChange={handleInputChange}
                                    className={`w-full pl-10 pr-4 py-2 rounded-lg border ${
                                        errors.name
                                            ? 'border-red-300 focus:border-red-500 focus:ring-red-200'
                                            : 'border-gray-200 dark:border-gray-700 focus:border-gray-800 focus:ring-gray-800'
                                    } bg-white dark:bg-gray-800 text-gray-800 dark:text-white text-sm focus:outline-none focus:ring-1 transition-colors`}
                                    placeholder="Enter your full name"
                                />
                            </div>
                            {errors.name && (
                                <p className="text-red-500 text-xs mt-1 flex items-center gap-1">
                                    <i className="bx bx-error-circle" />
                                    {errors.name}
                                </p>
                            )}
                        </div>

                        {/* Email Input */}
                        <div>
                            <label className="block text-sm font-medium text-gray-800 dark:text-white mb-1">
                                Email
                            </label>
                            <div className="relative">
                                <i className="bx bx-envelope absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                                <input
                                    type="email"
                                    name="email"
                                    value={formData.email}
                                    onChange={handleInputChange}
                                    className={`w-full pl-10 pr-4 py-2 rounded-lg border ${
                                        errors.email
                                            ? 'border-red-300 focus:border-red-500 focus:ring-red-200'
                                            : 'border-gray-200 dark:border-gray-700 focus:border-gray-800 focus:ring-gray-800'
                                    } bg-white dark:bg-gray-800 text-gray-800 dark:text-white text-sm focus:outline-none focus:ring-1 transition-colors`}
                                    placeholder="name@email.com"
                                />
                            </div>
                            {errors.email && (
                                <p className="text-red-500 text-xs mt-1 flex items-center gap-1">
                                    <i className="bx bx-error-circle" />
                                    {errors.email}
                                </p>
                            )}
                        </div>

                        {/* Position Input */}
                        <div>
                            <label className="block text-sm font-medium text-gray-800 dark:text-white mb-1">
                                Position
                            </label>
                            <div className="relative">
                                <i className="bx bx-briefcase absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                                <input
                                    type="text"
                                    name="position"
                                    value={formData.position}
                                    onChange={handleInputChange}
                                    className={`w-full pl-10 pr-4 py-2 rounded-lg border ${
                                        errors.position
                                            ? 'border-red-300 focus:border-red-500 focus:ring-red-200'
                                            : 'border-gray-200 dark:border-gray-700 focus:border-gray-800 focus:ring-gray-800'
                                    } bg-white dark:bg-gray-800 text-gray-800 dark:text-white text-sm focus:outline-none focus:ring-1 transition-colors`}
                                    placeholder="CEO, Developer, Designer, etc."
                                />
                            </div>
                            {errors.position && (
                                <p className="text-red-500 text-xs mt-1 flex items-center gap-1">
                                    <i className="bx bx-error-circle" />
                                    {errors.position}
                                </p>
                            )}
                        </div>

                        {/* Content Textarea */}
                        <div>
                            <label className="block text-sm font-medium text-gray-800 dark:text-white mb-1">
                                Testimonial
                            </label>
                            <div className="relative">
                                <i className="bx bx-message-detail absolute left-3 top-4 text-gray-400" />
                                <textarea
                                    name="content"
                                    value={formData.content}
                                    onChange={handleInputChange}
                                    rows="4"
                                    className={`w-full pl-10 pr-4 py-2 rounded-lg border ${
                                        errors.content
                                            ? 'border-red-300 focus:border-red-500 focus:ring-red-200'
                                            : 'border-gray-200 dark:border-gray-700 focus:border-gray-800 focus:ring-gray-800'
                                    } bg-white dark:bg-gray-800 text-gray-800 dark:text-white text-sm focus:outline-none focus:ring-1 transition-colors resize-none`}
                                    placeholder="Share your experience..."
                                />
                            </div>
                            {errors.content && (
                                <p className="text-red-500 text-xs mt-1 flex items-center gap-1">
                                    <i className="bx bx-error-circle" />
                                    {errors.content}
                                </p>
                            )}
                        </div>

                        {/* Buttons */}
                        <div className="flex gap-3 pt-4">
                            <button
                                type="button"
                                onClick={() => setIsModalOpen(false)}
                                className="flex-1 px-6 py-2 border border-gray-200 dark:border-gray-700 text-gray-800 dark:text-white rounded-lg text-sm font-medium hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
                            >
                                Cancel
                            </button>
                            <button
                                type="button"
                                onClick={handleSubmit}
                                disabled={isSubmitting}
                                className="flex-1 px-6 py-2 bg-gray-800 dark:bg-white text-white dark:text-gray-800 rounded-lg text-sm font-medium transition-all duration-300 transform hover:-translate-y-0.5 hover:shadow-lg disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none"
                            >
                                {isSubmitting ? (
                                    <span className="flex items-center justify-center gap-2">
                                        <i className="bx bx-loader-alt animate-spin" />
                                        Submitting...
                                    </span>
                                ) : (
                                    <span className="flex items-center justify-center gap-2">
                                        <i className="bx bx-send" />
                                        Submit
                                    </span>
                                )}
                            </button>
                        </div>
                    </div>
                    </div>
                </CustomModal>
            </section>
    );
};

export default Testimonials;