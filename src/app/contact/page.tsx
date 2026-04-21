"use client";

import { useState } from "react";

export default function ContactPage() {
	const [formData, setFormData] = useState({
		name: "",
		email: "",
		message: "",
		source: "trendstack",
	});

	const [isSubmitting, setIsSubmitting] = useState(false);
	const [submitStatus, setSubmitStatus] = useState("");
	const [errors, setErrors] = useState({
		name: "",
		email: "",
		message: "",
	});

	const validateForm = () => {
		const newErrors = {
			name: "",
			email: "",
			message: "",
		};

		if (!formData.name.trim()) {
			newErrors.name = "Name is required";
		}

		if (!formData.email.trim()) {
			newErrors.email = "Email is required";
		} else if (!/\S+@\S+\.\S+/.test(formData.email)) {
			newErrors.email = "Email is invalid";
		}

		if (!formData.message.trim()) {
			newErrors.message = "Message is required";
		}

		setErrors(newErrors);
		return !Object.values(newErrors).some((error) => error !== "");
	};

	const handleSubmit = async (e: React.FormEvent) => {
		e.preventDefault();

		if (!validateForm()) {
			return;
		}

		setIsSubmitting(true);
		setSubmitStatus("");

		try {
			const response = await fetch(`https://formspree.io/f/${process.env.NEXT_PUBLIC_FORMSPREE_ID}`, {
				method: "POST",
				headers: {
					"Content-Type": "application/json",
					Accept: "application/json",
				},
				body: JSON.stringify(formData),
			});

			if (response.ok) {
				setSubmitStatus("Message sent successfully! We'll get back to you soon.");
				setFormData({ name: "", email: "", message: "", source: "trendstack" });
			} else {
				setSubmitStatus("Failed to send message. Please try again.");
			}
		} catch (error) {
			setSubmitStatus("Network error. Please try again later.");
		} finally {
			setIsSubmitting(false);
		}
	};

	const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		const { name, value } = e.target;
		setFormData((prev) => ({
			...prev,
			[name]: value,
		}));
	};

	const handleTextareaChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
		const { name, value } = e.target;
		setFormData((prev) => ({
			...prev,
			[name]: value,
		}));
	};

	return (
		<div className="container mx-auto px-4 py-8 max-w-[1100px]">
			<div className="max-w-2xl mx-auto">
				<h1 className="text-3xl font-bold mb-8 text-center">Contact Us</h1>

				<div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-8">
					<p className="text-gray-600 dark:text-gray-300 mb-8 text-center">
						Have questions, feedback, or need support? We'd love to hear from you!
					</p>

					<form onSubmit={handleSubmit} className="space-y-6">
						<div className="grid grid-cols-1 md:grid-cols-2 gap-6">
							<div>
								<label
									htmlFor="name"
									className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2"
								>
									Name *
								</label>
								<input
									type="text"
									id="name"
									name="name"
									value={formData.name}
									onChange={handleInputChange}
									required
									className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent dark:bg-gray-700 dark:text-white"
									placeholder="Your name"
								/>
								{errors.name && <p className="text-red-500 text-sm mt-1">{errors.name}</p>}
							</div>

							<div>
								<label
									htmlFor="email"
									className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2"
								>
									Email *
								</label>
								<input
									type="email"
									id="email"
									name="email"
									value={formData.email}
									onChange={handleInputChange}
									required
									className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent dark:bg-gray-700 dark:text-white"
									placeholder="your.email@example.com"
								/>
								{errors.email && <p className="text-red-500 text-sm mt-1">{errors.email}</p>}
							</div>

							<div className="md:col-span-2">
								<label
									htmlFor="message"
									className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2"
								>
									Message *
								</label>
								<textarea
									id="message"
									name="message"
									value={formData.message}
									onChange={handleTextareaChange}
									required
									rows={6}
									className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent dark:bg-gray-700 dark:text-white resize-none"
									placeholder="Tell us what's on your mind..."
								/>
								{errors.message && <p className="text-red-500 text-sm mt-1">{errors.message}</p>}
							</div>

							{submitStatus && (
								<div
									className={`p-4 rounded-lg text-sm ${
										submitStatus.includes("successfully")
											? "bg-green-50 text-green-800 dark:bg-green-900 dark:text-green-200"
											: "bg-red-50 text-red-800 dark:bg-red-900 dark:text-red-200"
									}`}
								>
									{submitStatus}
								</div>
							)}

							<div className="md:col-span-2 flex justify-center">
								<button
									type="submit"
									disabled={isSubmitting}
									className="w-auto bg-blue-600 hover:bg-blue-700 text-white font-medium py-2 px-6 rounded-lg transition-colors disabled:bg-gray-400 disabled:cursor-not-allowed"
								>
									{isSubmitting ? "Sending..." : "Send Message"}
								</button>
							</div>
						</div>
					</form>
				</div>
			</div>
		</div>
	);
}
