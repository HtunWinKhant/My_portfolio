"use client";

import { useState, useEffect } from "react";
import { SocialIcon } from 'react-social-icons';

// Custom hook for scroll animations
const useScrollAnimation = () => {
  const [visibleElements, setVisibleElements] = useState(new Set());

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setVisibleElements((prev) => new Set([...prev, entry.target.id]));
          }
        });
      },
      {
        threshold: 0.1,
        rootMargin: "0px 0px -100px 0px",
      }
    );

    // Observe all sections and animated elements
    const elements = document.querySelectorAll("[data-animate]");
    elements.forEach((el) => observer.observe(el));

    return () => observer.disconnect();
  }, []);

  return visibleElements;
};

export default function Home() {
  const [activeSection, setActiveSection] = useState("about");
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const visibleElements = useScrollAnimation();

  useEffect(() => {
    const handleScroll = () => {
      const sections = [
        "about",
        "experience",
        "education",
        "skills",
        "contact",
      ];

      const scrollPosition = window.scrollY + 150; // Increased offset for better detection
      const windowHeight = window.innerHeight;
      const documentHeight = document.documentElement.scrollHeight;

      // Special case: if we're near the bottom of the page, activate contact
      if (scrollPosition + windowHeight >= documentHeight - 100) {
        setActiveSection("contact");
        return;
      }

      // Find the section that's currently in view
      let currentSection = "about"; // default

      for (let i = sections.length - 1; i >= 0; i--) {
        const section = sections[i];
        const element = document.getElementById(section);
        if (element) {
          const offsetTop = element.offsetTop - 200; // More generous offset

          if (scrollPosition >= offsetTop) {
            currentSection = section;
            break;
          }
        }
      }

      setActiveSection(currentSection);
    };

    window.addEventListener("scroll", handleScroll);
    handleScroll(); // Call once to set initial state

    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };
  return (
    <div className="min-h-screen bg-background">
      {/* Navigation */}
      <nav className="border-b border-border bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 sticky top-0 z-50">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-4">
            <div className="text-xl font-bold text-foreground">HWK</div>

            {/* Desktop Navigation */}
            <div className="hidden md:flex space-x-8">
              {[
                { id: "about", label: "About" },
                { id: "experience", label: "Experience" },
                { id: "education", label: "Education" },
                { id: "skills", label: "Skills" },
                { id: "contact", label: "Contact" },
              ].map((item) => (
                <button
                  key={item.id}
                  onClick={() => scrollToSection(item.id)}
                  className={`relative px-3 py-2 transition-all duration-200 ${
                    activeSection === item.id
                      ? "text-accent font-medium"
                      : "text-secondary hover:text-accent"
                  }`}
                >
                  {item.label}
                  {activeSection === item.id && (
                    <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-accent rounded-full transition-all duration-200" />
                  )}
                </button>
              ))}
            </div>

            {/* Mobile Menu Button */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="md:hidden p-2 text-secondary hover:text-accent transition-colors"
            >
              <svg
                className="w-6 h-6"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                {mobileMenuOpen ? (
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M6 18L18 6M6 6l12 12"
                  />
                ) : (
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M4 6h16M4 12h16M4 18h16"
                  />
                )}
              </svg>
            </button>
          </div>

          {/* Mobile Navigation */}
          {mobileMenuOpen && (
            <div className="md:hidden border-t border-border bg-surface">
              <div className="px-4 py-2 space-y-1">
                {[
                  { id: "about", label: "About" },
                  { id: "experience", label: "Experience" },
                  { id: "education", label: "Education" },
                  { id: "skills", label: "Skills" },
                  { id: "contact", label: "Contact" },
                ].map((item) => (
                  <button
                    key={item.id}
                    onClick={() => {
                      scrollToSection(item.id);
                      setMobileMenuOpen(false);
                    }}
                    className={`block w-full text-left px-3 py-2 rounded-lg transition-all duration-200 ${
                      activeSection === item.id
                        ? "text-accent bg-accent/10 font-medium"
                        : "text-secondary hover:text-accent hover:bg-accent/5"
                    }`}
                  >
                    {item.label}
                  </button>
                ))}
              </div>
            </div>
          )}
        </div>
      </nav>

      {/* Hero Section */}
      <section className="relative py-20 px-4 sm:px-6 lg:px-8 overflow-hidden">
        {/* Background Elements */}
        <div className="absolute inset-0 bg-gradient-to-br from-accent/5 via-transparent to-highlight/5"></div>
        <div className="absolute top-20 left-10 w-72 h-72 bg-accent/10 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute bottom-20 right-10 w-96 h-96 bg-highlight/10 rounded-full blur-3xl animate-pulse animation-delay-400"></div>

        <div className="relative max-w-6xl mx-auto text-center">
          {/* Greeting */}
          <div className="mb-4 animate-fade-in-up">
            <span className="inline-block px-4 py-2 bg-accent/10 text-accent rounded-full text-sm font-medium tracking-wide">
              👋 Hello, I&apos;m
            </span>
          </div>

          {/* Name with Typing Animation */}
          <h1 className="text-5xl sm:text-6xl lg:text-7xl font-bold text-foreground mb-4 animate-fade-in-up animation-delay-200">
            <span className="typing-container">
              <span className="typing-text">HTUN WIN KHANT</span>
              <span className="typing-cursor">|</span>
            </span>
          </h1>

          {/* Professional Title */}
          <div className="mb-8 animate-fade-in-up animation-delay-400">
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-semibold text-secondary mb-2">
              IT Professional &{" "}
              <span className="bg-gradient-to-r from-accent to-highlight bg-clip-text text-transparent">
                Network Engineer
              </span>
            </h2>
            <div className="w-24 h-1 bg-gradient-to-r from-accent to-highlight mx-auto rounded-full"></div>
          </div>

          {/* Description */}
          <p className="text-xl text-secondary mb-12 max-w-4xl mx-auto leading-relaxed animate-fade-in-up animation-delay-600">
            Results-driven IT professional with expertise in{" "}
            <span className="text-accent font-medium">network operations</span>,
            <span className="text-highlight font-medium">
              {" "}
              system administration
            </span>
            , and
            <span className="text-accent font-medium">
              {" "}
              frontend development
            </span>
            . Passionate about building secure, scalable network infrastructure
            and modern web applications.
          </p>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row gap-6 justify-center animate-fade-in-up animation-delay-800">
            <button
              onClick={() => scrollToSection("contact")}
              className="group relative bg-accent hover:bg-accent-hover text-white px-10 py-4 rounded-xl font-semibold transition-all duration-300 hover:scale-105 shadow-xl hover:shadow-accent/30 overflow-hidden"
            >
              <span className="relative z-10 flex items-center justify-center gap-2">
                Get In Touch
                <svg
                  className="w-5 h-5 group-hover:translate-x-1 transition-transform"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M17 8l4 4m0 0l-4 4m4-4H3"
                  />
                </svg>
              </span>
              <div className="absolute inset-0 bg-gradient-to-r from-accent-hover to-highlight opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
            </button>

            <button
              onClick={() => scrollToSection("experience")}
              className="group border-2 border-accent text-accent hover:bg-accent hover:text-white px-10 py-4 rounded-xl font-semibold transition-all duration-300 hover:scale-105 shadow-lg hover:shadow-accent/20"
            >
              <span className="flex items-center justify-center gap-2">
                View Experience
                <svg
                  className="w-5 h-5 group-hover:translate-y-[-2px] transition-transform"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M19 14l-7 7m0 0l-7-7m7 7V3"
                  />
                </svg>
              </span>
            </button>
          </div>
        </div>
      </section>

      {/* About Section */}
      <section
        id="about"
        className="py-12 px-4 sm:px-6 lg:px-8 bg-surface"
        data-animate
      >
        <div className="max-w-6xl mx-auto">
          <h2
            className={`text-3xl font-bold text-foreground mb-8 text-center transition-all duration-700 ${
              visibleElements.has("about")
                ? "opacity-100 translate-y-0"
                : "opacity-0 translate-y-8"
            }`}
          >
            About Me
          </h2>

          <div className="grid lg:grid-cols-3 gap-8">
            {/* Main About Content */}
            <div
              className={`lg:col-span-2 bg-background rounded-xl p-8 shadow-sm border border-border transition-all duration-700 delay-200 ${
                visibleElements.has("about")
                  ? "opacity-100 translate-y-0"
                  : "opacity-0 translate-y-8"
              }`}
            >
              <div className="space-y-6">
                <p className="text-secondary text-lg leading-relaxed">
                  I&apos;m a dedicated IT professional with a strong foundation
                  in
                  <span className="text-accent font-medium">
                    {" "}
                    network engineering
                  </span>{" "}
                  and
                  <span className="text-highlight font-medium">
                    {" "}
                    system administration
                  </span>
                  . Currently pursuing my Master&apos;s in Information
                  Technology at
                  <span className="text-accent font-medium">
                    {" "}
                    INTI International University, Malaysia
                  </span>
                  .
                </p>

                <p className="text-secondary text-lg leading-relaxed">
                  I bring hands-on experience from roles at
                  <span className="text-accent font-medium">
                    {" "}
                    CB Bank PCL
                  </span>{" "}
                  and
                  <span className="text-highlight font-medium">
                    {" "}
                    IMCS Co., Ltd
                  </span>
                  . My expertise spans from configuring enterprise network
                  infrastructure to developing modern web applications with
                  React and JavaScript.
                </p>

                <div className="flex flex-wrap gap-3 pt-4">
                  {[
                    "Network Security",
                    "System Administration",
                    "Frontend Development",
                    "IT Consultation",
                  ].map((skill) => (
                    <span
                      key={skill}
                      className="bg-accent/10 text-accent px-4 py-2 rounded-full text-sm font-medium"
                    >
                      {skill}
                    </span>
                  ))}
                </div>
              </div>
            </div>

            {/* Stats & Highlights */}
            <div className="space-y-6">
              {/* Current Status */}
              <div
                className={`bg-background rounded-xl p-6 shadow-sm border border-border transition-all duration-700 delay-400 ${
                  visibleElements.has("about")
                    ? "opacity-100 translate-x-0"
                    : "opacity-0 translate-x-8"
                }`}
              >
                <div className="flex items-center mb-4">
                  <div className="w-3 h-3 bg-highlight rounded-full animate-pulse mr-3"></div>
                  <h3 className="text-lg font-semibold text-foreground">
                    Pushing
                  </h3>
                </div>
                <p className="text-secondary">
                  Pursuing Master&apos;s in IT at INTI International University,
                  Malaysia
                </p>
              </div>

              {/* Experience Stats */}
              <div
                className={`bg-background rounded-xl p-6 shadow-sm border border-border transition-all duration-700 delay-600 ${
                  visibleElements.has("about")
                    ? "opacity-100 translate-x-0"
                    : "opacity-0 translate-x-8"
                }`}
              >
                <h3 className="text-lg font-semibold text-foreground mb-4">
                  Experience
                </h3>
                <div className="space-y-3">
                  <div className="flex justify-between items-center">
                    <span className="text-secondary">NOC Engineer</span>
                    <span className="text-accent font-medium">
                      Jul-Oct 2023
                    </span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-secondary">Program Guide</span>
                    <span className="text-highlight font-medium">
                      Nov 2023-Jan 2025
                    </span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-secondary">Education</span>
                    <span className="text-accent font-medium">
                      BSc with Distinction
                    </span>
                  </div>
                </div>
              </div>

              {/* Location */}
              {/* <div
                className={`bg-background rounded-xl p-6 shadow-sm border border-border transition-all duration-700 delay-800 ${
                  visibleElements.has("about")
                    ? "opacity-100 translate-x-0"
                    : "opacity-0 translate-x-8"
                }`}
              >
                <div className="flex items-center mb-2">
                  <svg
                    className="w-5 h-5 text-accent mr-3"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
                    />
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"
                    />
                  </svg>
                  <h3 className="text-lg font-semibold text-foreground">
                    Based in
                  </h3>
                </div>
                <p className="text-secondary">Yangon, Myanmar → Malaysia</p>
              </div> */}
            </div>
          </div>
        </div>
      </section>
      {/* Experience Section */}
      <section
        id="experience"
        className="py-12 px-4 sm:px-6 lg:px-8"
        data-animate
      >
        <div className="max-w-6xl mx-auto">
          <h2
            className={`text-3xl font-bold text-foreground mb-8 text-center transition-all duration-700 ${
              visibleElements.has("experience")
                ? "opacity-100 translate-y-0"
                : "opacity-0 translate-y-8"
            }`}
          >
            Work Experience
          </h2>
          {/* Timeline Layout */}
          <div className="relative">
            {/* Timeline Line */}
            <div className="absolute left-8 top-0 bottom-0 w-0.5 bg-gradient-to-b from-accent via-highlight to-accent opacity-30"></div>

            <div className="space-y-12">
              {/* Program Guide - Current/Recent */}
              <div
                className={`relative transition-all duration-700 delay-200 ${
                  visibleElements.has("experience")
                    ? "opacity-100 translate-y-0"
                    : "opacity-0 translate-y-8"
                }`}
              >
                {/* Timeline Dot */}
                <div className="absolute left-6 w-4 h-4 bg-highlight rounded-full border-4 border-background shadow-lg z-10"></div>

                {/* Content Card */}
                <div className="ml-20 bg-background rounded-xl p-8 shadow-lg border border-border hover:shadow-xl transition-shadow duration-300">
                  <div className="flex flex-col lg:flex-row lg:justify-between lg:items-start mb-6">
                    <div className="flex-1">
                      <div className="flex items-center mb-2">
                        <span className="bg-highlight/10 text-highlight px-3 py-1 rounded-full text-xs font-medium mr-3">
                          PREVIOUS
                        </span>
                        <span className="text-muted text-sm">
                          Nov 2023 - Jan 2025
                        </span>
                      </div>
                      <h3 className="text-2xl font-bold text-foreground mb-2">
                        Program Guide (BSc Program)
                      </h3>
                      <div className="flex items-center mb-3">
                        <svg
                          className="w-5 h-5 text-accent mr-2"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-4m-5 0H3m2 0h3M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 8h1m-1-4h1m4 4h1m-1-4h1"
                          />
                        </svg>
                        <p className="text-accent font-semibold">
                          IMCS Co., Ltd (Info Myanmar University)
                        </p>
                      </div>
                      <div className="flex items-center text-muted mb-4">
                        <svg
                          className="w-4 h-4 mr-2"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
                          />
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"
                          />
                        </svg>
                        <span>Yangon, Myanmar</span>
                      </div>
                    </div>
                  </div>

                  <div className="grid md:grid-cols-2 gap-6">
                    <div>
                      <h4 className="font-semibold text-foreground mb-3 flex items-center">
                        <svg
                          className="w-4 h-4 text-highlight mr-2"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
                          />
                        </svg>
                        Key Responsibilities
                      </h4>
                      <ul className="text-secondary space-y-2">
                        <li className="flex items-start">
                          <span className="text-highlight mr-2 mt-1">▸</span>
                          Guided students through academic program structures
                          and curriculum planning
                        </li>
                        <li className="flex items-start">
                          <span className="text-highlight mr-2 mt-1">▸</span>
                          Assisted in course content development and program
                          administration
                        </li>
                      </ul>
                    </div>
                    <div>
                      <h4 className="font-semibold text-foreground mb-3 flex items-center">
                        <svg
                          className="w-4 h-4 text-accent mr-2"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M13 10V3L4 14h7v7l9-11h-7z"
                          />
                        </svg>
                        Impact & Skills
                      </h4>
                      <ul className="text-secondary space-y-2">
                        <li className="flex items-start">
                          <span className="text-accent mr-2 mt-1">▸</span>
                          Provided IT consultation for online platform
                          engagement
                        </li>
                        <li className="flex items-start">
                          <span className="text-accent mr-2 mt-1">▸</span>
                          Enhanced student learning experience through
                          technology
                        </li>
                      </ul>
                    </div>
                  </div>
                </div>
              </div>

              {/* NOC Engineer - Previous */}
              <div
                className={`relative transition-all duration-700 delay-400 ${
                  visibleElements.has("experience")
                    ? "opacity-100 translate-y-0"
                    : "opacity-0 translate-y-8"
                }`}
              >
                {/* Timeline Dot */}
                <div className="absolute left-6 w-4 h-4 bg-accent rounded-full border-4 border-background shadow-lg z-10"></div>

                {/* Content Card */}
                <div className="ml-20 bg-background rounded-xl p-8 shadow-lg border border-border hover:shadow-xl transition-shadow duration-300">
                  <div className="flex flex-col lg:flex-row lg:justify-between lg:items-start mb-6">
                    <div className="flex-1">
                      <div className="flex items-center mb-2">
                        <span className="bg-accent/10 text-accent px-3 py-1 rounded-full text-xs font-medium mr-3">
                          PREVIOUS
                        </span>
                        <span className="text-muted text-sm">
                          Jul 2023 - Oct 2023
                        </span>
                      </div>
                      <h3 className="text-2xl font-bold text-foreground mb-2">
                        Network Operation Center Engineer
                      </h3>
                      <div className="flex items-center mb-3">
                        <svg
                          className="w-5 h-5 text-accent mr-2"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-4m-5 0H3m2 0h3M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 8h1m-1-4h1m4 4h1m-1-4h1"
                          />
                        </svg>
                        <p className="text-accent font-semibold">CB Bank PCL</p>
                      </div>
                      <div className="flex items-center text-muted mb-4">
                        <svg
                          className="w-4 h-4 mr-2"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
                          />
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"
                          />
                        </svg>
                        <span>Yangon, Myanmar</span>
                      </div>
                    </div>
                  </div>

                  <div className="grid md:grid-cols-2 gap-6">
                    <div>
                      <h4 className="font-semibold text-foreground mb-3 flex items-center">
                        <svg
                          className="w-4 h-4 text-highlight mr-2"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
                          />
                        </svg>
                        Core Responsibilities
                      </h4>
                      <ul className="text-secondary space-y-2">
                        <li className="flex items-start">
                          <span className="text-highlight mr-2 mt-1">▸</span>
                          Monitored enterprise network infrastructure for high
                          availability
                        </li>
                        <li className="flex items-start">
                          <span className="text-highlight mr-2 mt-1">▸</span>
                          Troubleshot network performance issues and reduced
                          downtime
                        </li>
                      </ul>
                    </div>
                    <div>
                      <h4 className="font-semibold text-foreground mb-3 flex items-center">
                        <svg
                          className="w-4 h-4 text-accent mr-2"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M13 10V3L4 14h7v7l9-11h-7z"
                          />
                        </svg>
                        Technical Expertise
                      </h4>
                      <ul className="text-secondary space-y-2">
                        <li className="flex items-start">
                          <span className="text-accent mr-2 mt-1">▸</span>
                          Configured VLANs, routing protocols, and switch
                          optimization
                        </li>
                        <li className="flex items-start">
                          <span className="text-accent mr-2 mt-1">▸</span>
                          Implemented network security best practices
                        </li>
                      </ul>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Education Section */}
      <section
        id="education"
        className="py-12 px-4 sm:px-6 lg:px-8 bg-surface"
        data-animate
      >
        <div className="max-w-6xl mx-auto">
          <h2
            className={`text-3xl font-bold text-foreground mb-8 text-center transition-all duration-700 ${
              visibleElements.has("education")
                ? "opacity-100 translate-y-0"
                : "opacity-0 translate-y-8"
            }`}
          >
            Education
          </h2>
          {/* Academic Journey Timeline */}
          <div className="relative">
            {/* Timeline Line */}
            <div className="absolute left-8 top-0 bottom-0 w-0.5 bg-gradient-to-b from-highlight via-accent to-warning opacity-30"></div>

            <div className="space-y-10">
              {/* Master's - Current */}
              <div
                className={`relative transition-all duration-700 delay-200 ${
                  visibleElements.has("education")
                    ? "opacity-100 translate-y-0"
                    : "opacity-0 translate-y-8"
                }`}
              >
                {/* Timeline Dot */}
                <div className="absolute left-6 w-4 h-4 bg-highlight rounded-full border-4 border-background shadow-lg z-10 animate-pulse"></div>

                {/* Education Card */}
                <div className="ml-20 bg-background rounded-xl p-8 shadow-lg border border-border hover:shadow-xl transition-all duration-300">
                  <div className="flex flex-col lg:flex-row lg:justify-between lg:items-start mb-6">
                    <div className="flex-1">
                      <div className="flex items-center mb-3">
                        <span className="bg-highlight/10 text-highlight px-3 py-1 rounded-full text-xs font-bold mr-3">
                          CURRENT
                        </span>
                        <span className="text-muted text-sm font-medium">
                          2025 - Present
                        </span>
                      </div>

                      <div className="flex items-center mb-3">
                        <svg
                          className="w-6 h-6 text-highlight mr-3"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M12 14l9-5-9-5-9 5 9 5z"
                          />
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M12 14l6.16-3.422a12.083 12.083 0 01.665 6.479A11.952 11.952 0 0012 20.055a11.952 11.952 0 00-6.824-2.998 12.078 12.078 0 01.665-6.479L12 14z"
                          />
                        </svg>
                        <h3 className="text-2xl font-bold text-foreground">
                          Master&apos;s in Information Technology
                        </h3>
                      </div>

                      <div className="flex items-center mb-4">
                        <svg
                          className="w-5 h-5 text-accent mr-2"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-4m-5 0H3m2 0h3M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 8h1m-1-4h1m4 4h1m-1-4h1"
                          />
                        </svg>
                        <p className="text-accent font-semibold text-lg">
                          INTI International University, Malaysia
                        </p>
                      </div>

                      <div className="bg-highlight/5 rounded-lg p-4">
                        <p className="text-secondary">
                          <span className="font-medium text-foreground">
                            Focus:
                          </span>{" "}
                          Advanced Information Technology concepts, research
                          methodologies, and thesis work on
                          &quot;Computing&quot;
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Bachelor's - Completed with Distinction */}
              <div
                className={`relative transition-all duration-700 delay-400 ${
                  visibleElements.has("education")
                    ? "opacity-100 translate-y-0"
                    : "opacity-0 translate-y-8"
                }`}
              >
                {/* Timeline Dot */}
                <div className="absolute left-6 w-4 h-4 bg-accent rounded-full border-4 border-background shadow-lg z-10"></div>

                {/* Education Card */}
                <div className="ml-20 bg-background rounded-xl p-8 shadow-lg border border-border hover:shadow-xl transition-all duration-300">
                  <div className="flex flex-col lg:flex-row lg:justify-between lg:items-start mb-6">
                    <div className="flex-1">
                      <div className="flex items-center mb-3">
                        <span className="bg-accent/10 text-accent px-3 py-1 rounded-full text-xs font-bold mr-3">
                          COMPLETED
                        </span>
                        <span className="bg-warning/10 text-warning px-3 py-1 rounded-full text-xs font-bold mr-3">
                          WITH DISTINCTION
                        </span>
                        <span className="text-muted text-sm font-medium">
                          2022 - 2023
                        </span>
                      </div>

                      <div className="flex items-center mb-3">
                        <svg
                          className="w-6 h-6 text-accent mr-3"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M12 14l9-5-9-5-9 5 9 5z"
                          />
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M12 14l6.16-3.422a12.083 12.083 0 01.665 6.479A11.952 11.952 0 0012 20.055a11.952 11.952 0 00-6.824-2.998 12.078 12.078 0 01.665-6.479L12 14z"
                          />
                        </svg>
                        <h3 className="text-2xl font-bold text-foreground">
                          Bachelor of Science in Computing
                        </h3>
                      </div>

                      <div className="flex items-center mb-4">
                        <svg
                          className="w-5 h-5 text-accent mr-2"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-4m-5 0H3m2 0h3M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 8h1m-1-4h1m4 4h1m-1-4h1"
                          />
                        </svg>
                        <p className="text-accent font-semibold text-lg">
                          Edinburgh Napier University
                        </p>
                      </div>

                      <div className="bg-warning/5 rounded-lg p-4 border-l-4 border-warning">
                        <div className="flex items-center mb-2">
                          <svg
                            className="w-5 h-5 text-warning mr-2"
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth={2}
                              d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
                            />
                          </svg>
                          <span className="font-bold text-warning">
                            Academic Excellence
                          </span>
                        </div>
                        <p className="text-secondary">
                          Graduated with Distinction, demonstrating exceptional
                          academic performance and deep understanding of
                          computing principles
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* HND - Foundation */}
              <div
                className={`relative transition-all duration-700 delay-600 ${
                  visibleElements.has("education")
                    ? "opacity-100 translate-y-0"
                    : "opacity-0 translate-y-8"
                }`}
              >
                {/* Timeline Dot */}
                <div className="absolute left-6 w-4 h-4 bg-warning rounded-full border-4 border-background shadow-lg z-10"></div>

                {/* Education Card */}
                <div className="ml-20 bg-background rounded-xl p-8 shadow-lg border border-border hover:shadow-xl transition-all duration-300">
                  <div className="flex flex-col lg:flex-row lg:justify-between lg:items-start mb-6">
                    <div className="flex-1">
                      <div className="flex items-center mb-3">
                        <span className="bg-warning/10 text-warning px-3 py-1 rounded-full text-xs font-bold mr-3">
                          FOUNDATION
                        </span>
                        <span className="text-muted text-sm font-medium">
                          2018 - 2020
                        </span>
                      </div>

                      <div className="flex items-center mb-3">
                        <svg
                          className="w-6 h-6 text-warning mr-3"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253"
                          />
                        </svg>
                        <h3 className="text-xl font-bold text-foreground">
                          Pearson BTEC Level 5 Higher National Diploma
                        </h3>
                      </div>

                      <div className="flex items-center mb-4">
                        <svg
                          className="w-5 h-5 text-warning mr-2"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-4m-5 0H3m2 0h3M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 8h1m-1-4h1m4 4h1m-1-4h1"
                          />
                        </svg>
                        <p className="text-warning font-semibold">
                          Info Myanmar University
                        </p>
                      </div>

                      <div className="bg-accent/5 rounded-lg p-4">
                        <p className="text-secondary">
                          <span className="font-medium text-foreground">
                            Partnership:
                          </span>{" "}
                          In collaboration with Edinburgh Napier University,
                          providing international standard education in
                          Computing
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Skills Section */}
      <section id="skills" className="py-12 px-4 sm:px-6 lg:px-8" data-animate>
        <div className="max-w-6xl mx-auto">
          <h2
            className={`text-3xl font-bold text-foreground mb-8 text-center transition-all duration-700 ${
              visibleElements.has("skills")
                ? "opacity-100 translate-y-0"
                : "opacity-0 translate-y-8"
            }`}
          >
            Technical Skills
          </h2>
          {/* Skills Grid with Real Icons */}
          <div className="grid gap-8">
            {/* Frontend Development */}
            <div
              className={`bg-background rounded-xl p-8 shadow-lg border border-border transition-all duration-700 delay-200 ${
                visibleElements.has("skills")
                  ? "opacity-100 translate-y-0"
                  : "opacity-0 translate-y-8"
              }`}
            >
              <div className="flex items-center mb-6">
                <div className="w-12 h-12 bg-accent/10 rounded-lg flex items-center justify-center mr-4">
                  <svg
                    className="w-6 h-6 text-accent"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4"
                    />
                  </svg>
                </div>
                <h3 className="text-2xl font-bold text-foreground">
                  Frontend Development
                </h3>
              </div>

              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
                {/* HTML */}
                <div className="group bg-surface hover:bg-background rounded-lg p-4 border border-border hover:border-accent transition-all duration-300 hover:scale-105">
                  <div className="flex flex-col items-center text-center">
                    <div className="w-12 h-12 mb-3 flex items-center justify-center">
                      <svg
                        className="w-10 h-10"
                        viewBox="0 0 24 24"
                        fill="#E34F26"
                      >
                        <path d="M1.5 0h21l-1.91 21.563L11.977 24l-8.564-2.438L1.5 0zm7.031 9.75l-.232-2.718 10.059.003.23-2.622L5.412 4.41l.698 8.01h9.126l-.326 3.426-2.91.804-2.955-.81-.188-2.11H6.248l.33 4.171L12 19.351l5.379-1.443.744-8.157H8.531z" />
                      </svg>
                    </div>
                    <span className="text-sm font-medium text-foreground group-hover:text-accent transition-colors">
                      HTML
                    </span>
                  </div>
                </div>

                {/* CSS */}
                <div className="group bg-surface hover:bg-background rounded-lg p-4 border border-border hover:border-accent transition-all duration-300 hover:scale-105">
                  <div className="flex flex-col items-center text-center">
                    <div className="w-12 h-12 mb-3 flex items-center justify-center">
                      <svg
                        className="w-10 h-10"
                        viewBox="0 0 24 24"
                        fill="#1572B6"
                      >
                        <path d="M1.5 0h21l-1.91 21.563L11.977 24l-8.564-2.438L1.5 0zm17.09 4.413L5.41 4.41l.213 2.622 10.125.002-.255 2.716h-6.64l.24 2.573h6.182l-.366 3.523-2.91.804-2.956-.81-.188-2.11h-2.61l.29 3.855L12 19.288l5.373-1.53L18.59 4.414z" />
                      </svg>
                    </div>
                    <span className="text-sm font-medium text-foreground group-hover:text-accent transition-colors">
                      CSS
                    </span>
                  </div>
                </div>

                {/* JavaScript */}
                <div className="group bg-surface hover:bg-background rounded-lg p-4 border border-border hover:border-accent transition-all duration-300 hover:scale-105">
                  <div className="flex flex-col items-center text-center">
                    <div className="w-12 h-12 mb-3 flex items-center justify-center">
                      <svg
                        className="w-10 h-10"
                        viewBox="0 0 24 24"
                        fill="#F7DF1E"
                      >
                        <path d="M0 0h24v24H0V0zm22.034 18.276c-.175-1.095-.888-2.015-3.003-2.873-.736-.345-1.554-.585-1.797-1.14-.091-.33-.105-.51-.046-.705.15-.646.915-.84 1.515-.66.39.12.75.42.976.9 1.034-.676 1.034-.676 1.755-1.125-.27-.42-.404-.601-.586-.78-.63-.705-1.469-1.065-2.834-1.034l-.705.089c-.676.165-1.32.525-1.71 1.005-1.14 1.291-.811 3.541.569 4.471 1.365 1.02 3.361 1.244 3.616 2.205.24 1.17-.87 1.545-1.966 1.41-.811-.18-1.26-.586-1.755-1.336l-1.83 1.051c.21.48.45.689.81 1.109 1.74 1.756 6.09 1.666 6.871-1.004.029-.09.24-.705.074-1.65l.046.067zm-8.983-7.245h-2.248c0 1.938-.009 3.864-.009 5.805 0 1.232.063 2.363-.138 2.711-.33.689-1.18.601-1.566.48-.396-.196-.597-.466-.83-.855-.063-.105-.11-.196-.127-.196l-1.825 1.125c.305.63.75 1.172 1.324 1.517.855.51 2.004.675 3.207.405.783-.226 1.458-.691 1.811-1.411.51-.93.402-2.07.397-3.346.012-2.054 0-4.109 0-6.179l.004-.056z" />
                      </svg>
                    </div>
                    <span className="text-sm font-medium text-foreground group-hover:text-accent transition-colors">
                      JavaScript
                    </span>
                  </div>
                </div>

                {/* React */}
                <div className="group bg-surface hover:bg-background rounded-lg p-4 border border-border hover:border-accent transition-all duration-300 hover:scale-105">
                  <div className="flex flex-col items-center text-center">
                    <div className="w-12 h-12 mb-3 flex items-center justify-center">
                      <svg
                        className="w-10 h-10"
                        viewBox="0 0 24 24"
                        fill="#61DAFB"
                      >
                        <path d="M14.23 12.004a2.236 2.236 0 0 1-2.235 2.236 2.236 2.236 0 0 1-2.236-2.236 2.236 2.236 0 0 1 2.235-2.236 2.236 2.236 0 0 1 2.236 2.236zm2.648-10.69c-1.346 0-3.107.96-4.888 2.622-1.78-1.653-3.542-2.602-4.887-2.602-.41 0-.783.093-1.106.278-1.375.793-1.683 3.264-.973 6.365C1.98 8.917 0 10.42 0 12.004c0 1.59 1.99 3.097 5.043 4.03-.704 3.113-.39 5.588.988 6.38.32.187.69.275 1.102.275 1.345 0 3.107-.96 4.888-2.624 1.78 1.654 3.542 2.603 4.887 2.603.41 0 .783-.09 1.106-.275 1.374-.792 1.683-3.263.973-6.365C22.02 15.096 24 13.59 24 12.004c0-1.59-1.99-3.097-5.043-4.032.704-3.11.39-5.587-.988-6.38-.318-.184-.688-.277-1.092-.278zm-.005 1.09v.006c.225 0 .406.044.558.127.666.382.955 1.835.73 3.704-.054.46-.142.945-.25 1.44-.96-.236-2.006-.417-3.107-.534-.66-.905-1.345-1.727-2.035-2.447 1.592-1.48 3.087-2.292 4.105-2.295zm-9.77.02c1.012 0 2.514.808 4.11 2.28-.686.72-1.37 1.537-2.02 2.442-1.107.117-2.154.298-3.113.538-.112-.49-.195-.964-.254-1.42-.23-1.868.054-3.32.714-3.707.19-.09.4-.127.563-.132zm4.882 3.05c.455.468.91.992 1.36 1.564-.44-.02-.89-.034-1.36-.034-.47 0-.92.014-1.36.034.44-.572.895-1.096 1.36-1.564zM12 8.1c.74 0 1.477.034 2.202.093.406.582.802 1.203 1.183 1.86.372.64.71 1.29 1.018 1.946-.308.655-.646 1.31-1.013 1.95-.38.66-.773 1.288-1.18 1.87-.728.063-1.466.098-2.21.098-.74 0-1.477-.035-2.202-.093-.406-.582-.802-1.204-1.183-1.86-.372-.64-.71-1.29-1.018-1.946.303-.657.646-1.313 1.013-1.954.38-.66.773-1.286 1.18-1.868.728-.064 1.466-.098 2.21-.098zm-3.635.254c-.24.377-.48.763-.704 1.16-.225.39-.435.782-.635 1.174-.265-.656-.49-1.31-.676-1.947.64-.15 1.315-.283 2.015-.386zm7.26 0c.695.103 1.365.23 2.006.387-.18.632-.405 1.282-.66 1.933-.2-.39-.41-.783-.64-1.174-.225-.392-.465-.774-.705-1.146zm3.063.675c.484.15.944.317 1.375.498 1.732.74 2.852 1.708 2.852 2.476-.005.768-1.125 1.74-2.857 2.475-.42.18-.88.342-1.355.493-.28-.958-.646-1.956-1.1-2.98.45-1.017.81-2.01 1.085-2.964zm-13.395.004c.278.96.645 1.957 1.1 2.98-.45 1.017-.812 2.01-1.086 2.964-.484-.15-.944-.318-1.37-.5-1.732-.737-2.852-1.706-2.852-2.474 0-.768 1.12-1.742 2.852-2.476.42-.18.88-.342 1.356-.494zm11.678 4.28c.265.657.49 1.312.676 1.948-.64.157-1.316.29-2.016.39.24-.375.48-.762.705-1.158.225-.39.435-.788.636-1.18zm-9.945.02c.2.392.41.783.64 1.175.23.39.465.772.705 1.143-.695-.102-1.365-.23-2.006-.386.18-.63.406-1.282.66-1.933zM17.92 16.32c.112.493.2.968.254 1.423.23 1.868-.054 3.32-.714 3.708-.147.09-.338.128-.563.128-1.012 0-2.514-.807-4.11-2.28.686-.72 1.37-1.536 2.02-2.44 1.107-.118 2.154-.3 3.113-.54zm-11.83.01c.96.234 2.006.415 3.107.532.66.905 1.345 1.727 2.035 2.446-1.595 1.483-3.092 2.295-4.11 2.295-.22-.005-.406-.05-.553-.132-.666-.38-.955-1.834-.73-3.703.054-.46.142-.944.25-1.438zm4.56.64c.44.02.89.034 1.36.034.47 0 .92-.014 1.36-.034-.44.572-.895 1.095-1.36 1.56-.465-.467-.92-.992-1.36-1.56z" />
                      </svg>
                    </div>
                    <span className="text-sm font-medium text-foreground group-hover:text-accent transition-colors">
                      React
                    </span>
                  </div>
                </div>

                {/* Tailwind CSS */}
                <div className="group bg-surface hover:bg-background rounded-lg p-4 border border-border hover:border-accent transition-all duration-300 hover:scale-105">
                  <div className="flex flex-col items-center text-center">
                    <div className="w-12 h-12 mb-3 flex items-center justify-center">
                      <svg
                        className="w-10 h-10"
                        viewBox="0 0 24 24"
                        fill="#06B6D4"
                      >
                        <path d="M12.001,4.8c-3.2,0-5.2,1.6-6,4.8c1.2-1.6,2.6-2.2,4.2-1.8c0.913,0.228,1.565,0.89,2.288,1.624 C13.666,10.618,15.027,12,18.001,12c3.2,0,5.2-1.6,6-4.8c-1.2,1.6-2.6,2.2-4.2,1.8c-0.913-0.228-1.565-0.89-2.288-1.624 C16.337,6.182,14.976,4.8,12.001,4.8z M6.001,12c-3.2,0-5.2,1.6-6,4.8c1.2-1.6,2.6-2.2,4.2-1.8c0.913,0.228,1.565,0.89,2.288,1.624 c1.177,1.194,2.538,2.576,5.512,2.576c3.2,0,5.2-1.6,6-4.8c-1.2,1.6-2.6,2.2-4.2,1.8c-0.913-0.228-1.565-0.89-2.288-1.624 C10.337,13.382,8.976,12,6.001,12z" />
                      </svg>
                    </div>
                    <span className="text-sm font-medium text-foreground group-hover:text-accent transition-colors">
                      Tailwind
                    </span>
                  </div>
                </div>

                {/* PostCSS */}
                <div className="group bg-surface hover:bg-background rounded-lg p-4 border border-border hover:border-accent transition-all duration-300 hover:scale-105">
                  <div className="flex flex-col items-center text-center">
                    <div className="w-12 h-12 mb-3 flex items-center justify-center">
                      <svg
                        className="w-10 h-10"
                        viewBox="0 0 24 24"
                        fill="#DD3A0A"
                      >
                        <path d="M12 0C5.373 0 0 5.372 0 12s5.373 12 12 12c6.628 0 12-5.372 12-12S18.628 0 12 0zm-.92 19.278c-.311-.311-.311-.816 0-1.127l2.127-2.127-2.127-2.127c-.311-.311-.311-.816 0-1.127s.816-.311 1.127 0l2.69 2.69c.311.311.311.816 0 1.127l-2.69 2.69c-.311.312-.816.312-1.127.001zm-2.16 0c-.311.311-.816.311-1.127 0l-2.69-2.69c-.311-.311-.311-.816 0-1.127l2.69-2.69c.311-.311.816-.311 1.127 0s.311.816 0 1.127L6.793 16l2.127 2.127c.311.311.311.816 0 1.127z" />
                      </svg>
                    </div>
                    <span className="text-sm font-medium text-foreground group-hover:text-accent transition-colors">
                      PostCSS
                    </span>
                  </div>
                </div>
              </div>
            </div>

            {/* Networking & Infrastructure */}
            <div
              className={`bg-background rounded-xl p-8 shadow-lg border border-border transition-all duration-700 delay-400 ${
                visibleElements.has("skills")
                  ? "opacity-100 translate-y-0"
                  : "opacity-0 translate-y-8"
              }`}
            >
              <div className="flex items-center mb-6">
                <div className="w-12 h-12 bg-highlight/10 rounded-lg flex items-center justify-center mr-4">
                  <svg
                    className="w-6 h-6 text-highlight"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M5 12h14M5 12a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v4a2 2 0 01-2 2M5 12a2 2 0 00-2 2v4a2 2 0 002 2h14a2 2 0 002-2v-4a2 2 0 00-2-2m-2-4h.01M17 16h.01"
                    />
                  </svg>
                </div>
                <h3 className="text-2xl font-bold text-foreground">
                  Networking & Infrastructure
                </h3>
              </div>

              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
                {/* Cisco */}
                <div className="group bg-surface hover:bg-background rounded-lg p-4 border border-border hover:border-highlight transition-all duration-300 hover:scale-105">
                  <div className="flex flex-col items-center text-center">
                    <div className="w-12 h-12 mb-3 flex items-center justify-center">
                      <svg
                        className="w-10 h-10"
                        viewBox="0 0 24 24"
                        fill="#1BA0D7"
                      >
                        <path d="M.357 8.291v7.418h1.51V8.291H.357zm3.571 0v7.418h1.51V8.291h-1.51zm3.571 0v7.418h1.51V8.291h-1.51zm3.571 0v7.418h1.51V8.291h-1.51zm3.571 0v7.418h1.51V8.291h-1.51zm3.571 0v7.418h1.51V8.291h-1.51zm3.571 0v7.418h1.51V8.291h-1.51z" />
                      </svg>
                    </div>
                    <span className="text-sm font-medium text-foreground group-hover:text-highlight transition-colors">
                      CCNA
                    </span>
                  </div>
                </div>

                {/* Network Security */}
                <div className="group bg-surface hover:bg-background rounded-lg p-4 border border-border hover:border-highlight transition-all duration-300 hover:scale-105">
                  <div className="flex flex-col items-center text-center">
                    <div className="w-12 h-12 mb-3 flex items-center justify-center">
                      <svg
                        className="w-8 h-8 text-highlight"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z"
                        />
                      </svg>
                    </div>
                    <span className="text-sm font-medium text-foreground group-hover:text-highlight transition-colors">
                      Security
                    </span>
                  </div>
                </div>

                {/* VLANs */}
                <div className="group bg-surface hover:bg-background rounded-lg p-4 border border-border hover:border-highlight transition-all duration-300 hover:scale-105">
                  <div className="flex flex-col items-center text-center">
                    <div className="w-12 h-12 mb-3 flex items-center justify-center">
                      <svg
                        className="w-8 h-8 text-highlight"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10"
                        />
                      </svg>
                    </div>
                    <span className="text-sm font-medium text-foreground group-hover:text-highlight transition-colors">
                      VLANs
                    </span>
                  </div>
                </div>

                {/* Routing */}
                <div className="group bg-surface hover:bg-background rounded-lg p-4 border border-border hover:border-highlight transition-all duration-300 hover:scale-105">
                  <div className="flex flex-col items-center text-center">
                    <div className="w-12 h-12 mb-3 flex items-center justify-center">
                      <svg
                        className="w-8 h-8 text-highlight"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M8.111 16.404a5.5 5.5 0 017.778 0M12 20h.01m-7.08-7.071c3.904-3.905 10.236-3.905 14.141 0M1.394 9.393c5.857-5.857 15.355-5.857 21.213 0"
                        />
                      </svg>
                    </div>
                    <span className="text-sm font-medium text-foreground group-hover:text-highlight transition-colors">
                      Routing
                    </span>
                  </div>
                </div>

                {/* Switching */}
                <div className="group bg-surface hover:bg-background rounded-lg p-4 border border-border hover:border-highlight transition-all duration-300 hover:scale-105">
                  <div className="flex flex-col items-center text-center">
                    <div className="w-12 h-12 mb-3 flex items-center justify-center">
                      <svg
                        className="w-8 h-8 text-highlight"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M8 9l3 3-3 3m5 0h3M5 20h14a2 2 0 002-2V6a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
                        />
                      </svg>
                    </div>
                    <span className="text-sm font-medium text-foreground group-hover:text-highlight transition-colors">
                      Switching
                    </span>
                  </div>
                </div>

                {/* Ruijie */}
                <div className="group bg-surface hover:bg-background rounded-lg p-4 border border-border hover:border-highlight transition-all duration-300 hover:scale-105">
                  <div className="flex flex-col items-center text-center">
                    <div className="w-12 h-12 mb-3 flex items-center justify-center">
                      <svg
                        className="w-8 h-8 text-highlight"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M5 12h14M5 12a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v4a2 2 0 01-2 2M5 12a2 2 0 00-2 2v4a2 2 0 002 2h14a2 2 0 002-2v-4a2 2 0 00-2-2m-2-4h.01M17 16h.01"
                        />
                      </svg>
                    </div>
                    <span className="text-sm font-medium text-foreground group-hover:text-highlight transition-colors">
                      Ruijie
                    </span>
                  </div>
                </div>
              </div>
            </div>

            {/* Systems & Cloud */}
            <div
              className={`bg-background rounded-xl p-8 shadow-lg border border-border transition-all duration-700 delay-600 ${
                visibleElements.has("skills")
                  ? "opacity-100 translate-y-0"
                  : "opacity-0 translate-y-8"
              }`}
            >
              <div className="flex items-center mb-6">
                <div className="w-12 h-12 bg-warning/10 rounded-lg flex items-center justify-center mr-4">
                  <svg
                    className="w-6 h-6 text-warning"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M3 15a4 4 0 004 4h9a5 5 0 10-.1-9.999 5.002 5.002 0 10-9.78 2.096A4.001 4.001 0 003 15z"
                    />
                  </svg>
                </div>
                <h3 className="text-2xl font-bold text-foreground">
                  Systems & Cloud
                </h3>
              </div>

              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
                {/* Windows */}
                <div className="group bg-surface hover:bg-background rounded-lg p-4 border border-border hover:border-warning transition-all duration-300 hover:scale-105">
                  <div className="flex flex-col items-center text-center">
                    <div className="w-12 h-12 mb-3 flex items-center justify-center">
                      <svg
                        className="w-10 h-10"
                        viewBox="0 0 24 24"
                        fill="#0078D4"
                      >
                        <path d="M0,0 L10.5,0 L10.5,10.5 L0,10.5 L0,0 Z M13.5,0 L24,0 L24,10.5 L13.5,10.5 L13.5,0 Z M0,13.5 L10.5,13.5 L10.5,24 L0,24 L0,13.5 Z M13.5,13.5 L24,13.5 L24,24 L13.5,24 L13.5,13.5 Z" />
                      </svg>
                    </div>
                    <span className="text-sm font-medium text-foreground group-hover:text-warning transition-colors">
                      Windows
                    </span>
                  </div>
                </div>

                {/* Linux */}
                <div className="group bg-surface hover:bg-background rounded-lg p-4 border border-border hover:border-warning transition-all duration-300 hover:scale-105">
                  <div className="flex flex-col items-center text-center">
                    <div className="w-12 h-12 mb-3 flex items-center justify-center">
                      <svg
                        className="w-10 h-10"
                        viewBox="0 0 24 24"
                        fill="#FCC624"
                      >
                        <path d="M12.504 0c-.155 0-.315.008-.48.021-4.226.333-3.105 4.807-3.17 6.298-.076 1.092-.3 1.953-1.05 3.02-.885 1.051-2.127 2.75-2.716 4.521-.278.832-.41 1.684-.287 2.489a.424.424 0 00-.11.135c-.26.268-.45.6-.663.839-.199.199-.485.267-.797.4-.313.136-.658.269-.864.68-.09.189-.136.394-.132.602 0 .199.027.4.055.536.058.399.116.728.04.97-.249.68-.28 1.145-.106 1.484.174.334.535.47.94.601.81.2 1.91.135 2.774.6.926.466 1.866.67 2.616.47.526-.116.97-.464 1.208-.946.587-.003 1.23-.269 2.26-.334.699-.058 1.574.267 2.577.2.025.134.063.198.114.333l.003.003c.391.778 1.113 1.132 1.884 1.071.771-.06 1.592-.536 2.257-1.306.631-.765 1.683-1.084 2.378-1.503.348-.199.629-.469.649-.853.023-.4-.2-.811-.714-1.376v-.097l-.003-.003c-.17-.2-.25-.535-.338-.926-.085-.401-.182-.786-.492-1.046h-.003c-.059-.054-.123-.067-.188-.135a.357.357 0 00-.19-.064c.431-1.278.264-2.55-.173-3.694-.533-1.41-1.465-2.638-2.175-3.483-.796-1.005-1.576-1.957-1.56-3.368.026-2.152.236-6.133-3.544-6.139zm.529 3.405h.013c.213 0 .396.062.584.198.19.135.33.332.438.533.105.259.158.459.166.724 0-.02.006-.04.006-.06v.105a.086.086 0 01-.004-.021l-.004-.024a1.807 1.807 0 01-.15.706.953.953 0 01-.213.335.71.71 0 00-.088-.042c-.104-.045-.198-.064-.284-.133a1.312 1.312 0 00-.22-.066c.05-.06.146-.133.183-.198.053-.128.082-.264.088-.402v-.02a1.21 1.21 0 00-.061-.4c-.045-.134-.101-.2-.183-.333-.084-.066-.167-.132-.267-.132h-.016c-.093 0-.176.03-.262.132a.8.8 0 00-.205.334 1.18 1.18 0 00-.09.4v.019c.002.089.008.179.02.267-.193-.067-.438-.135-.607-.202a1.635 1.635 0 01.002-.31v-.084c-.002-.19.067-.370.19-.513.122-.144.297-.248.465-.248z" />
                      </svg>
                    </div>
                    <span className="text-sm font-medium text-foreground group-hover:text-warning transition-colors">
                      Linux
                    </span>
                  </div>
                </div>

                {/* Azure */}
                <div className="group bg-surface hover:bg-background rounded-lg p-4 border border-border hover:border-warning transition-all duration-300 hover:scale-105">
                  <div className="flex flex-col items-center text-center">
                    <div className="w-12 h-12 mb-3 flex items-center justify-center">
                      <svg
                        className="w-10 h-10"
                        viewBox="0 0 24 24"
                        fill="#0078D4"
                      >
                        <path d="M5.483 21.8H24l-4.24-7.6h-4.24L5.483 21.8zM0 21.8h4.24L14.277 2.2h4.24L0 21.8z" />
                      </svg>
                    </div>
                    <span className="text-sm font-medium text-foreground group-hover:text-warning transition-colors">
                      Azure
                    </span>
                  </div>
                </div>

                {/* VMware */}
                <div className="group bg-surface hover:bg-background rounded-lg p-4 border border-border hover:border-warning transition-all duration-300 hover:scale-105">
                  <div className="flex flex-col items-center text-center">
                    <div className="w-12 h-12 mb-3 flex items-center justify-center">
                      <svg
                        className="w-8 h-8 text-warning"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M9 3v2m6-2v2M9 19v2m6-2v2M5 9H3m2 6H3m18-6h-2m2 6h-2M7 19h10a2 2 0 002-2V7a2 2 0 00-2-2H7a2 2 0 00-2 2v10a2 2 0 002 2zM9 9h6v6H9V9z"
                        />
                      </svg>
                    </div>
                    <span className="text-sm font-medium text-foreground group-hover:text-warning transition-colors">
                      VMware
                    </span>
                  </div>
                </div>

                {/* Windows Server */}
                <div className="group bg-surface hover:bg-background rounded-lg p-4 border border-border hover:border-warning transition-all duration-300 hover:scale-105">
                  <div className="flex flex-col items-center text-center">
                    <div className="w-12 h-12 mb-3 flex items-center justify-center">
                      <svg
                        className="w-8 h-8 text-warning"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M5 12h14M5 12a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v4a2 2 0 01-2 2M5 12a2 2 0 00-2 2v4a2 2 0 002 2h14a2 2 0 002-2v-4a2 2 0 00-2-2m-2-4h.01M17 16h.01"
                        />
                      </svg>
                    </div>
                    <span className="text-sm font-medium text-foreground group-hover:text-warning transition-colors">
                      Server
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Certifications */}
          <div
            className={`mt-16 transition-all duration-700 delay-800 ${
              visibleElements.has("skills")
                ? "opacity-100 translate-y-0"
                : "opacity-0 translate-y-8"
            }`}
          >
            <div className="text-center mb-8">
              <h3 className="text-3xl font-bold text-foreground mb-2">
                Professional Certifications
              </h3>
              <p className="text-secondary">
                Industry-recognized credentials and achievements
              </p>
            </div>

            <div className="bg-background rounded-2xl p-8 shadow-xl border border-border hover:shadow-2xl transition-all duration-300">
              <div className="space-y-6">
                {/* Certificate Details */}
                <div className="flex items-start space-x-4">
                  <div className="w-12 h-12 bg-accent/10 rounded-lg flex items-center justify-center flex-shrink-0">
                    <svg
                      className="w-6 h-6 text-accent"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z"
                      />
                    </svg>
                  </div>
                  <div>
                    <h4 className="text-xl font-bold text-foreground mb-2">
                      Network Security Certification
                    </h4>
                    <p className="text-accent font-semibold mb-1">
                      Cisco Networking Academy
                    </p>
                    <p className="text-secondary text-sm mb-3">
                      Comprehensive certification covering network security
                      fundamentals, threat mitigation, and security best
                      practices for enterprise environments.
                    </p>
                    <div className="flex items-center space-x-4">
                      <span className="bg-highlight/10 text-highlight px-3 py-1 rounded-full text-sm font-medium">
                        April 2025
                      </span>
                      <span className="bg-accent/10 text-accent px-3 py-1 rounded-full text-sm font-medium">
                        Professional Level
                      </span>
                    </div>
                  </div>
                </div>

                {/* Skills Covered */}
                <div>
                  <h5 className="font-semibold text-foreground mb-3 flex items-center">
                    <svg
                      className="w-4 h-4 text-highlight mr-2"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M13 10V3L4 14h7v7l9-11h-7z"
                      />
                    </svg>
                    Key Competencies
                  </h5>
                  <div className="grid grid-cols-2 gap-2">
                    {[
                      "Network Security Fundamentals",
                      "Threat Assessment",
                      "Security Protocols",
                      "Risk Management",
                      "Incident Response",
                      "Security Architecture",
                    ].map((skill) => (
                      <div
                        key={skill}
                        className="flex items-center text-sm text-secondary"
                      >
                        <div className="w-1.5 h-1.5 bg-accent rounded-full mr-2"></div>
                        {skill}
                      </div>
                    ))}
                  </div>
                </div>

                {/* Verification */}
                <div className="bg-accent/5 rounded-lg p-4 border border-accent/20">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center">
                      <svg
                        className="w-5 h-5 text-accent mr-2"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
                        />
                      </svg>
                      <span className="text-sm font-medium text-foreground">
                        Verified Credential
                      </span>
                    </div>
                    <a
                      type="button"
                      href="https://www.credly.com/users/htun-win-khant"
                      className="text-accent hover:text-accent-hover text-sm font-medium transition-colors"
                    >
                      View Certificate →
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section
        id="contact"
        className="py-12 px-4 sm:px-6 lg:px-8 bg-surface"
        data-animate
      >
        <div className="max-w-4xl mx-auto text-center">
          <h2
            className={`text-3xl font-bold text-foreground mb-8 transition-all duration-700 ${
              visibleElements.has("contact")
                ? "opacity-100 translate-y-0"
                : "opacity-0 translate-y-8"
            }`}
          >
            Let&apos;s Connect
          </h2>
          <p className="text-secondary text-lg mb-8">
            I&apos;m always interested in discussing new opportunities,
            networking projects, or collaborating on innovative IT solutions.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a
              href="mailto:your.htunwinkhant56@gmail.com"
              className="bg-accent hover:bg-accent-hover text-white px-8 py-3 rounded-lg font-medium transition-all duration-200 hover:scale-105 shadow-lg hover:shadow-accent/25"
            >
              Send Email
            </a>
            <a
              href="www.linkedin.com/in/htun-win-khant"
              target="_blank"
              rel="noopener noreferrer"
              className="border border-border hover:bg-background px-8 py-3 rounded-lg font-medium transition-all duration-200 hover:scale-105"
            >
              LinkedIn Profile
            </a>
          </div>
        </div>
      </section>

      {/* Footer */}
        <footer className="py-8 px-4 sm:px-6 lg:px-8 border-t border-border">
          {/* ...existing footer content... */}
          <div className="flex justify-center gap-4 mt-4">
            <SocialIcon url="https://wa.me/142995984" network="whatsapp" />
            <SocialIcon url="mailto:htunwinkhant56@gmail.com" network="email" />
            
          </div>
          <div className="max-w-6xl mx-auto text-center">
            {/* <p className="text-muted">
              © 2025 Portfolio. Built with Next.js and Tailwind CSS.
            </p> */}
          </div>
        </footer>

    </div>
  );
}
