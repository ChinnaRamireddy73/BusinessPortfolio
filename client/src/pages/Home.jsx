import React, { useEffect, useState, useRef } from 'react';
import api from '../api';
import ProjectCard from '../components/ProjectCard';
import ClientCard from '../components/ClientCard';
import ContactForm from '../components/ContactForm';
import Newsletter from '../components/Newsletter';
import Slider from '../components/Slider';

const Home = () => {
    const [projects, setProjects] = useState([]);
    const [clients, setClients] = useState([]);
    const contactSectionRef = useRef(null);
    const projectsSectionRef = useRef(null);

    const scrollToContact = () => {
        contactSectionRef.current?.scrollIntoView({ behavior: 'smooth' });
    };

    const scrollToProjects = () => {
        projectsSectionRef.current?.scrollIntoView({ behavior: 'smooth' });
    };

    useEffect(() => {
        const fetchData = async () => {
            try {
                const projectsRes = await api.get('/projects');
                setProjects(projectsRes.data);
                const clientsRes = await api.get('/clients');
                setClients(clientsRes.data);
            } catch (err) {
                console.error(err);
            }
        };
        fetchData();
    }, []);

    return (
        <div className="home-page fade-in">
            {/* Hero Section */}
            <section className="hero" style={{ textAlign: 'center', padding: '120px 20px', background: 'linear-gradient(135deg, #f5f7fa 0%, #c3cfe2 100%)' }}>
                <div className="container slide-up">
                    <h1 style={{ fontSize: '3.5rem', marginBottom: '20px', fontWeight: '800' }}>Building Dreams, Creating Reality</h1>
                    <p style={{ fontSize: '1.2rem', maxWidth: '700px', margin: '0 auto 15px', color: '#333' }}>We deliver top-tier business solutions for clients worldwide.</p>
                    <p style={{ fontSize: '1rem', maxWidth: '700px', margin: '0 auto 40px', color: '#555', lineHeight: '1.6' }}>
                        From concept to execution, we transform your vision into powerful digital solutions. 
                        With years of expertise and a passion for innovation, we help businesses thrive in the digital age.
                    </p>
                    <div style={{ display: 'flex', gap: '15px', justifyContent: 'center', flexWrap: 'wrap', marginTop: '30px' }}>
                        <button className="btn" onClick={scrollToProjects}>View Our Work</button>
                        <button className="btn" onClick={scrollToContact} style={{ background: '#f39c12' }}>Get in Touch</button>
                    </div>
                </div>
            </section>

            {/* Projects Section - Cinematic Slider */}
            <section id="projects" className="projects-section" ref={projectsSectionRef}>
                <div className="container">
                    <h2 style={{ textAlign: 'center', marginBottom: '40px' }}>Our Projects</h2>
                    {projects.length > 0 ? (
                        <Slider slidesPerView={3}>
                            {projects.map(project => (
                                <ProjectCard key={project._id} project={project} />
                            ))}
                        </Slider>
                    ) : (
                        <p className="no-data" style={{ textAlign: 'center' }}>No projects found. Add some from Sidebar.</p>
                    )}
                </div>
            </section>

            {/* Clients Section - Cinematic Slider */}
            <section id="clients" className="clients-section" style={{ background: '#f9f9f9' }}>
                <div className="container">
                    <h2 style={{ textAlign: 'center', marginBottom: '40px' }}>Happy Clients</h2>
                    {clients.length > 0 ? (
                        <Slider slidesPerView={3} autoplay={true}>
                            {clients.map(client => (
                                <ClientCard key={client._id} client={client} />
                            ))}
                        </Slider>
                    ) : (
                        <p className="no-data" style={{ textAlign: 'center' }}>No clients yet.</p>
                    )}
                </div>
            </section>

            {/* Contact Section */}
            <section id="contact" className="contact-section" ref={contactSectionRef}>
                <div className="container">
                    <h2 style={{ textAlign: 'center', marginBottom: '40px' }}>Contact Us</h2>
                    <ContactForm />
                </div>
            </section>

            {/* Newsletter Section */}
            <section className="newsletter-section" style={{ background: 'var(--primary-color)', color: '#fff' }}>
                <div className="container" style={{ textAlign: 'center' }}>
                    <h2>Subscribe to our Newsletter</h2>
                    <Newsletter />
                </div>
            </section>
        </div>
    );
};

export default Home;
