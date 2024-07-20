import React from 'react';
import { FaHiking, FaBox } from 'react-icons/fa';
import { Typography, Grid, Card, CardContent } from '@mui/material';
import SkillsSearch from './SkillsSearch';

const AboutWindow: React.FC = () => {
    return (
        <div className="p-4">
            <Typography variant="h4" component="h2" className="text-2xl font-bold mb-4">About Me</Typography>
            <Typography className="mb-4">
                Hello! I'm Arseny Manokhin, a creative and innovative web developer based in Tallinn, Estonia. I graduated from TPT with a degree in Software Development. I am passionate about creating beautiful and functional applications, and I am always eager to learn and tackle new challenges.
            </Typography>

            <Typography variant="h5" component="h3" className="text-xl font-semibold mb-3">Experience</Typography>
            <Grid container spacing={2} className="mb-4">
                <Grid item xs={12} sm={6}>
                    <Card>
                        <CardContent>
                            <Typography variant="h6" component="h4" className="text-lg font-medium">Alearms OÜ (Oct 2022 - May 2023)</Typography>
                            <Typography className="font-light italic mb-2">Web Developer Intern</Typography>
                            <ul className="list-disc list-inside ml-5">
                                <li>Gained hands-on experience in frontend development with React and Material-UI.</li>
                                <li>Developed responsive web components using SCSS.</li>
                                <li>Enhanced user experience by implementing interactive and user-friendly interface designs.</li>
                                <li>Developed a foundational understanding of server-side programming using C# .NET.</li>
                                <li>Collaborated on backend tasks, contributing to the creation of efficient and scalable server solutions.</li>
                                <li>Engaged in API development and integration, facilitating effective communication between frontend and backend systems.</li>
                            </ul>
                        </CardContent>
                    </Card>
                </Grid>
                <Grid item xs={12} sm={6}>
                    <Card>
                        <CardContent>
                            <Typography variant="h6" component="h4" className="text-lg font-medium">Upwork (Jan 2023 - Present)</Typography>
                            <Typography className="font-light italic mb-2">Freelancer</Typography>
                            <ul className="list-disc list-inside ml-5">
                                <li>Developed a video downloading website using Python, Django, and Celery.</li>
                                <li>Created a smooth and interactive user experience with Vanilla JavaScript and SCSS.</li>
                                <li>Deployed the website on an AWS EC2 instance, managing the server environment with Nginx and Gunicorn.</li>
                            </ul>
                        </CardContent>
                    </Card>
                </Grid>
            </Grid>

            <Typography variant="h5" component="h3" className="text-xl font-semibold mb-3">Education</Typography>
            <Grid container spacing={2} className="mb-4">
                <Grid item xs={12}>
                    <Card>
                        <CardContent>
                            <Typography variant="h6" component="h4" className="text-lg font-medium">Tallinna Polütehnikum (Sep 2019 - Jun 2023)</Typography>
                            <Typography className="font-light italic">Software Developer Junior</Typography>
                        </CardContent>
                    </Card>
                </Grid>
            </Grid>

            <Typography variant="h5" component="h3" className="text-xl font-semibold mb-3">Projects</Typography>
            <Grid container spacing={2} className="mb-4">
                <Grid item xs={12} sm={6}>
                    <Card>
                        <CardContent>
                            <Typography variant="h6" component="h4" className="text-lg font-medium">Check This Out (Jan 2023 - Present)</Typography>
                            <Typography>A social network platform for emerging musicians, built with Django, Django Rest Framework, Solid.js, and TypeScript.</Typography>
                        </CardContent>
                    </Card>
                </Grid>
                <Grid item xs={12} sm={6}>
                    <Card>
                        <CardContent>
                            <Typography variant="h6" component="h4" className="text-lg font-medium">Mail Sender (Mar 2023)</Typography>
                            <Typography>A desktop mail-sending application developed with Tauri, Vite, and Solid.js, showcasing the integration of web technologies in a desktop environment.</Typography>
                        </CardContent>
                    </Card>
                </Grid>
            </Grid>

            <Typography variant="h5" component="h3" className="text-xl font-semibold mb-3">Activities</Typography>
            <ul className="list-disc list-inside ml-5 mb-4">
                <li><FaHiking className="inline-block mr-2" /> Completed a 100k steps challenge per day.</li>
                <li><FaBox className="inline-block mr-2" /> Secured 2nd place in Estonian boxing competition.</li>
                <li><FaHiking className="inline-block mr-2" /> Experienced survivalist and hiker.</li>
            </ul>

            <SkillsSearch />

            <Typography variant="h5" component="h3" className="text-xl font-semibold mb-3">Certifications</Typography>
            <Grid container spacing={2} className="mb-4">
                <Grid item xs={12}>
                    <Card>
                        <CardContent>
                            <Typography>Java Language Basics, HelloIT (Sep 2019 - Jan 2020)</Typography>
                        </CardContent>
                    </Card>
                </Grid>
            </Grid>

            <Typography variant="h5" component="h3" className="text-xl font-semibold mb-3">Languages</Typography>
            <ul className="list-disc list-inside ml-5">
                <li>English: Basic Proficiency</li>
                <li>Estonian: A2</li>
                <li>Russian: Native</li>
            </ul>
        </div>
    );
};

export default AboutWindow;
