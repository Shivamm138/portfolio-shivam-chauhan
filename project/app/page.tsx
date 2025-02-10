'use client';

import { motion, useScroll, useTransform } from 'framer-motion';
import { AcademicCapIcon, BriefcaseIcon, CodeBracketIcon, TrophyIcon } from '@heroicons/react/24/outline';
import { useState, useEffect, useRef } from 'react';

export default function Home() {
  const [isScrolled, setIsScrolled] = useState(false);
  const { scrollYProgress } = useScroll();
  const mainRef = useRef(null);

  // Parallax and scroll animations
  const y = useTransform(scrollYProgress, [0, 1], ['0%', '50%']);
  const opacity = useTransform(scrollYProgress, [0, 0.2], [1, 0]);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.3
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.5
      }
    }
  };

  // Enhanced letter animation for name
  const nameArray = "Shivam Chauhan".split("");
  const letterVariants = {
    hidden: { y: -100, opacity: 0, rotateX: 90 },
    visible: (i: number) => ({
      y: 0,
      opacity: 1,
      rotateX: 0,
      transition: {
        delay: i * 0.1,
        type: "spring",
        damping: 8,
        stiffness: 100,
        duration: 1
      }
    })
  };

  // Floating animation for cards
  const floatingAnimation = {
    y: [-5, 5],
    transition: {
      duration: 2,
      repeat: Infinity,
      repeatType: "reverse",
      ease: "easeInOut"
    }
  };

  return (
    <div className="min-h-screen bg-gray-900" ref={mainRef}>
      {/* Progress Bar */}
      <motion.div
        className="fixed top-0 left-0 right-0 h-1 bg-blue-500 origin-left z-50"
        style={{ scaleX: scrollYProgress }}
      />

      {/* Navbar with enhanced animations */}
      <motion.nav
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        className={`fixed w-full z-40 transition-all duration-300 ${isScrolled ? 'bg-gray-900/95 shadow-lg backdrop-blur-sm' : 'bg-transparent'
          }`}
      >
        <div className="container mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <motion.a
              href="#"
              className="text-xl font-bold text-blue-400"
              whileHover={{ scale: 1.05, rotate: [0, -5, 5, 0] }}
              transition={{ duration: 0.5 }}
            >
              SC
            </motion.a>
            <div className="hidden md:flex space-x-8">
              {[
                { name: 'Experience', href: '#experience', icon: BriefcaseIcon },
                { name: 'Projects', href: '#projects', icon: CodeBracketIcon },
                { name: 'Skills', href: '#skills', icon: AcademicCapIcon },
                { name: 'Contact', href: '#contact', icon: TrophyIcon }
              ].map((item) => (
                <motion.a
                  key={item.name}
                  href={item.href}
                  className="text-gray-300 hover:text-blue-400 transition-colors flex items-center gap-2"
                  whileHover={{
                    scale: 1.1,
                    textShadow: "0 0 8px rgb(59, 130, 246)",
                    color: "rgb(59, 130, 246)"
                  }}
                >
                  <item.icon className="w-5 h-5" />
                  {item.name}
                </motion.a>
              ))}
            </div>
          </div>
        </div>
      </motion.nav>

      {/* Hero Section with parallax */}
      <header className="relative min-h-screen flex items-center overflow-hidden">
        <motion.div
          className="absolute inset-0 bg-gradient-to-br from-blue-900 via-gray-900 to-purple-900"
          style={{ y, opacity }}
        />
        <div className="container relative mx-auto px-6 py-24">
          <motion.div
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            className="max-w-4xl mx-auto text-center"
          >
            <motion.div
              variants={itemVariants}
              className="mb-6 inline-block"
              whileHover={{ scale: 1.05 }}
            >
              <div className="text-black mb-4 text-lg font-semibold">
                <motion.span
                  animate={{
                    background: [
                      "linear-gradient(to right, #3b82f6, #8b5cf6)",
                      "linear-gradient(to right, #8b5cf6, #3b82f6)",
                      "linear-gradient(to right, #3b82f6, #8b5cf6)"
                    ]
                  }}
                  transition={{ duration: 2, repeat: Infinity }}
                  className="px-4 py-2 rounded-full bg-clip-text"
                >
                  Welcome to my portfolio
                </motion.span>
              </div>

            </motion.div>

            <div className="flex justify-center mb-6 perspective-1000">
              {nameArray.map((letter, i) => (
                <motion.span
                  key={i}
                  custom={i}
                  variants={letterVariants}
                  initial="hidden"
                  animate="visible"
                  className={`text-5xl md:text-7xl font-bold ${letter === " " ? "mr-4" : ""
                    } bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-purple-400`}
                  whileHover={{
                    scale: 1.2,
                    color: "#3b82f6",
                    transition: { duration: 0.2 }
                  }}
                >
                  {letter}
                </motion.span>
              ))}
            </div>

            <motion.h2
              variants={itemVariants}
              className="text-2xl md:text-3xl mb-8 text-gray-300"
              whileHover={{ scale: 1.05 }}
            >
              Computer Science & Engineering Student
            </motion.h2>

            <motion.p
              variants={itemVariants}
              className="text-xl text-gray-400 max-w-2xl mx-auto leading-relaxed"
              whileHover={{ scale: 1.02 }}
            >
              A passionate developer crafting exceptional digital experiences through code.
              Specializing in front-end technologies and software development at VIT University.
            </motion.p>

            <motion.div
              variants={itemVariants}
              className="mt-12 flex justify-center gap-6"
            >
              <motion.a
                href="#contact"
                className="px-8 py-3 bg-blue-600 hover:bg-blue-700 rounded-full text-white font-semibold transition-colors duration-300"
                whileHover={{
                  scale: 1.05,
                  boxShadow: "0 0 15px rgba(59, 130, 246, 0.5)"
                }}
                whileTap={{ scale: 0.95 }}
              >
                Get in Touch
              </motion.a>
              <motion.a
                href="#projects"
                className="px-8 py-3 border-2 border-blue-600 hover:border-blue-700 rounded-full text-white font-semibold transition-colors duration-300"
                whileHover={{
                  scale: 1.05,
                  boxShadow: "0 0 15px rgba(59, 130, 246, 0.5)"
                }}
                whileTap={{ scale: 0.95 }}
              >
                View Projects
              </motion.a>
            </motion.div>

            <motion.div
              variants={itemVariants}
              className="mt-16"
            >
              <div className="flex flex-wrap justify-center gap-4">
                {['React', 'TypeScript', 'Node.js', 'Next.js'].map((tech, index) => (
                  <motion.div
                    key={tech}
                    className="px-4 py-2 bg-gray-800 rounded-lg text-gray-300 text-sm"
                    whileHover={{
                      scale: 1.1,
                      backgroundColor: "#1e40af",
                      color: "#ffffff"
                    }}
                    animate={floatingAnimation}
                    custom={index}
                  >
                    {tech}
                  </motion.div>
                ))}
              </div>
            </motion.div>
          </motion.div>
        </div>

        <motion.div
          className="absolute bottom-10 left-1/2 transform -translate-x-1/2"
          animate={{
            y: [0, 10, 0],
            opacity: [0.5, 1, 0.5]
          }}
          transition={{
            duration: 2,
            repeat: Infinity,
            repeatType: "reverse",
          }}
        >
          <div className="text-blue-400">
            <svg
              className="w-6 h-6"
              fill="none"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path d="M19 14l-7 7m0 0l-7-7m7 7V3"></path>
            </svg>
          </div>
        </motion.div>
      </header>

      {/* Experience Section with enhanced animations */}
      <section id="experience" className="py-20 bg-gray-800">
        <div className="container mx-auto px-6">
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <motion.h2
              className="text-3xl font-bold mb-12 text-center text-gray-100"
              whileHover={{ scale: 1.05 }}
            >
              Work Experience
            </motion.h2>
            <div className="grid md:grid-cols-2 gap-8">
              {[
                {
                  title: "Growth Intern",
                  company: "SayF",
                  period: "Jan 2022 - Mar 2022",
                  points: [
                    "Contributed to beta feature development, increasing engagement by 18%",
                    "Identified and reported 5 critical bugs"
                  ]
                },
                {
                  title: "CASIO Campus Brand Ambassador",
                  company: "CASIO",
                  period: "Aug 2021 - Sep 2022",
                  points: [
                    "Led social media campaigns reaching 300+ students",
                    "Enhanced product visibility for 500-600 students"
                  ]
                }
              ].map((job, index) => (
                <motion.div
                  key={job.title}
                  whileHover={{ scale: 1.02 }}
                  initial={{ opacity: 0, x: index % 2 === 0 ? -50 : 50 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: index * 0.2 }}
                  className="p-6 rounded-lg bg-gray-700 shadow-xl transition-shadow hover:shadow-2xl"
                >
                  <h3 className="text-xl font-semibold mb-2 text-blue-400">{job.title}</h3>
                  <p className="text-gray-300 mb-4">{job.company} | {job.period}</p>
                  <ul className="list-disc list-inside text-gray-300">
                    {job.points.map((point, i) => (
                      <motion.li
                        key={i}
                        initial={{ opacity: 0, x: -20 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: i * 0.2 }}
                      >
                        {point}
                      </motion.li>
                    ))}
                  </ul>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </section>

      {/* Projects Section with enhanced animations */}
      <section id="projects" className="py-20 bg-gray-900">
        <div className="container mx-auto px-6">
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <motion.h2
              className="text-3xl font-bold mb-12 text-center text-gray-100"
              whileHover={{ scale: 1.05 }}
            >
              Notable Projects
            </motion.h2>
            <div className="grid md:grid-cols-2 gap-8">
              {[
                {
                  title: "UB FOOD WEB-APP",
                  date: "Nov 2023",
                  description: "A food ordering platform for the university canteen",
                  tech: ["HTML", "CSS", "PHP", "MySQL"]
                },
                {
                  title: "Blog-App",
                  date: "April 2024",
                  description: "A full-featured blogging platform with admin verification",
                  tech: ["ReactJS", "TypeScript", "MongoDB", "Bootstrap"]
                }
              ].map((project, index) => (
                <motion.div
                  key={project.title}
                  whileHover={{ scale: 1.02 }}
                  initial={{ opacity: 0, y: 50 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: index * 0.2 }}
                  className="p-6 rounded-lg bg-gray-800 shadow-xl transition-shadow hover:shadow-2xl"
                >
                  <h3 className="text-xl font-semibold mb-2 text-blue-400">{project.title}</h3>
                  <p className="text-gray-300 mb-4">{project.date}</p>
                  <p className="mb-4 text-gray-400">{project.description}</p>
                  <div className="flex flex-wrap gap-2">
                    {project.tech.map((tech, i) => (
                      <motion.span
                        key={i}
                        initial={{ opacity: 0, scale: 0 }}
                        whileInView={{ opacity: 1, scale: 1 }}
                        whileHover={{ scale: 1.1 }}
                        viewport={{ once: true }}
                        transition={{ delay: i * 0.1 }}
                        className="px-3 py-1 bg-blue-900 text-blue-200 rounded-full text-sm"
                      >
                        {tech}
                      </motion.span>
                    ))}
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </section>

      {/* Skills Section with enhanced animations */}
      <section id="skills" className="py-20 bg-gray-800">
        <div className="container mx-auto px-6">
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <motion.h2
              className="text-3xl font-bold mb-12 text-center text-gray-100"
              whileHover={{ scale: 1.05 }}
            >
              Skills & Technologies
            </motion.h2>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
              {['C++', 'Java', 'Python', 'JavaScript', 'NodeJS', 'React', 'MySQL', 'Git'].map((skill, index) => (
                <motion.div
                  key={skill}
                  initial={{ opacity: 0, scale: 0 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{
                    delay: index * 0.1,
                    type: "spring",
                    stiffness: 260,
                    damping: 20
                  }}
                  whileHover={{
                    scale: 1.1,
                    boxShadow: "0 0 15px rgba(59, 130, 246, 0.5)",
                    backgroundColor: "#1e40af"
                  }}
                  className="p-4 text-center rounded-lg bg-gray-700 shadow-lg hover:shadow-xl transition-all duration-300"
                >
                  <span className="text-lg font-medium text-gray-200">{skill}</span>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </section>

      {/* Contact Section with enhanced animations */}
      <section id="contact" className="py-20 bg-gray-900">
        <div className="container mx-auto px-6">
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <motion.h2
              className="text-3xl font-bold mb-12 text-center text-gray-100"
              whileHover={{ scale: 1.05 }}
            >
              Contact Me
            </motion.h2>
            <div className="flex flex-col items-center space-y-4">
              {[
                { href: "mailto:shivamcode138@gmail.com", text: "shivamcode138@gmail.com" },
                { href: "tel:+917999358469", text: "+91-7999358469" },
                { href: "https://linkedin.com/in/shivam-chauhan-62a88221b", text: "LinkedIn Profile" }
              ].map((contact, index) => (
                <motion.a
                  key={index}
                  initial={{ opacity: 0, x: -50 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.2 }}
                  whileHover={{
                    scale: 1.05,
                    backgroundColor: "#1e40af",
                    boxShadow: "0 0 15px rgba(59, 130, 246, 0.5)"
                  }}
                  href={contact.href}
                  target={contact.href.startsWith('http') ? "_blank" : undefined}
                  rel={contact.href.startsWith('http') ? "noopener noreferrer" : undefined}
                  className="px-6 py-3 bg-gray-800 rounded-lg text-blue-400 hover:text-blue-300 transition-colors duration-300 w-full max-w-md text-center"
                >
                  {contact.text}
                </motion.a>
              ))}
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
}