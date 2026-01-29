import React, { useEffect, useState } from 'react';
import api from '../api';
import ProjectCard from '../components/ProjectCard';
import ClientCard from '../components/ClientCard';
import ContactForm from '../components/ContactForm';
import Newsletter from '../components/Newsletter';

const Home = () => {
    const [projects, setProjects] = useState([]);
    const [clients, setClients] = useState([]);

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
        <div className="home-page">
            {/* Hero Section */}
            <section className="hero" style={{ textAlign: 'center', padding: '100px 20px', background: 'linear-gradient(135deg, #f5f7fa 0%, #c3cfe2 100%)' }}>
                <div className="container">
                    <h1 style={{ fontSize: '3rem', marginBottom: '20px' }}>Building Dreams, Creating Reality</h1>
                    <p style={{ fontSize: '1.2rem', maxWidth: '600px', margin: '0 auto 30px' }}>We deliver top-tier business solutions for clients worldwide.</p>
                    <button className="btn">View Our Work</button>
                </div>
            </section>

            {/* Projects Section */}
            <section id="projects" className="projects-section">
                <div className="container">
                    <h2 style={{ textAlign: 'center', marginBottom: '40px' }}>Our Projects</h2>
                    <div className="projects-grid">
                        {projects.length > 0 ? (
                            projects.map(project => (
                                <ProjectCard key={project._id} project={project} />
                            ))
                        ) : (
                            <p className="no-data" style={{ textAlign: 'center', width: '100%' }}>No projects found. Add some from Admin Panel.</p>
                        )}
                    </div>
                </div>
            </section>

            {/* Clients Section */}
            <section id="clients" className="clients-section" style={{ background: '#f9f9f9' }}>
                <div className="container">
                    <h2 style={{ textAlign: 'center', marginBottom: '40px' }}>Happy Clients</h2>
                    <div className="clients-grid">
                        {clients.length > 0 ? (
                            clients.map(client => (
                                <ClientCard key={client._id} client={client} />
                            ))
                        ) : (
                            <p className="no-data" style={{ textAlign: 'center', width: '100%' }}>No clients yet.</p>
                        )}
                    </div>
                </div>
            </section>

            {/* Contact Section */}
            <section id="contact" className="contact-section">
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
