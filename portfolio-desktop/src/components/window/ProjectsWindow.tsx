import React, { useState } from 'react';
import { Card, CardContent, Typography, Grid, Link, Button } from '@mui/material';
import { FaArrowLeft } from 'react-icons/fa';
import { Swiper as SwiperType } from 'swiper/types';
import { Swiper, SwiperSlide } from 'swiper/react';
import { FreeMode, Navigation, Thumbs } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/free-mode';
import 'swiper/css/navigation';
import 'swiper/css/thumbs';
import styles from './ProjectsWindow.module.scss';

type Project = {
    name: string;
    description: string;
    detailedDescription: string;
    url: string;
    image: string;
    gallery: string[];
};

const projectsData: Project[] = [
    {
        name: 'Check This Out',
        description: 'A social network platform for emerging musicians, built with Django, Django Rest Framework, Solid.js, and TypeScript.',
        detailedDescription: 'Check This Out is a comprehensive platform designed to support emerging musicians by providing a space to showcase their work, connect with other artists, and engage with a wider audience. The platform includes features such as music showcasing, custom-built music player, and interactive user profiles.',
        url: 'https://github.com/bapehnkk/CheckThisOut/',
        image: '/portfolio/check-this-out/logo.jpg',
        gallery: [
            '/portfolio/check-this-out/home.jpg',
            '/portfolio/check-this-out/track.png',
            '/portfolio/check-this-out/player.png',
            '/portfolio/check-this-out/arts.png',
        ]
    },
    {
        name: 'Mail Sender',
        description: 'A desktop mail-sending application developed with Tauri, Vite, and Solid.js, showcasing the integration of web technologies in a desktop environment.',
        detailedDescription: 'Mail Sender is a lightweight and secure desktop application that simplifies the process of sending emails. Built with modern web technologies, the app integrates Tauri for efficient desktop app development, Vite for an optimized frontend build tool, and Solid.js for reactive user interfaces.',
        url: 'https://github.com/bapehnkk/mail_sender_tauri_vite_solid/releases/tag/MailSender/',
        image: '/portfolio/mail-sender/logo.png',
        gallery: [
            '/portfolio/mail-sender/home.jpg',
            '/portfolio/mail-sender/settings.jpg',
            '/portfolio/mail-sender/field-hint.jpg',
            '/portfolio/mail-sender/field-subsetting.jpg',
            '/portfolio/mail-sender/excel-fields-selecter.jpg',
        ]
    }
];

const ProjectsWindow: React.FC = () => {
    const [selectedProject, setSelectedProject] = useState<Project | null>(null);
    const [thumbsSwiper, setThumbsSwiper] = useState<SwiperType | null>(null);

    const handleBackClick = () => {
        setSelectedProject(null);
    };

    return (
        <div className={styles.projectsWindow}>
            {!selectedProject ? (
                <>
                    <Typography variant="h4" component="h2" gutterBottom>
                        My Projects
                    </Typography>
                    <Grid container spacing={4}>
                        {projectsData.map((project, index) => (
                            <Grid item xs={12} sm={6} md={4} key={index}>
                                <Card className={styles.projectCard}>
                                    <img src={project.image} alt={project.name} className={styles.projectImage} />
                                    <CardContent>
                                        <Typography variant="h5" component="h3" gutterBottom>
                                            {project.name}
                                        </Typography>
                                        <Typography variant="body2" color="text.secondary" gutterBottom>
                                            {project.description}
                                        </Typography>
                                        <Button
                                            variant="contained"
                                            color="primary"
                                            onClick={() => setSelectedProject(project)}
                                            className={styles.learnMoreButton}
                                        >
                                            Learn More
                                        </Button>
                                    </CardContent>
                                </Card>
                            </Grid>
                        ))}
                    </Grid>
                </>
            ) : (
                <ProjectDetail
                    project={selectedProject}
                    onBackClick={handleBackClick}
                    thumbsSwiper={thumbsSwiper}
                    setThumbsSwiper={setThumbsSwiper}
                />
            )}
        </div>
    );
};

interface ProjectDetailProps {
    project: Project;
    onBackClick: () => void;
    thumbsSwiper: SwiperType | null;
    setThumbsSwiper: React.Dispatch<React.SetStateAction<SwiperType | null>>;
}

const ProjectDetail: React.FC<ProjectDetailProps> = ({ project, onBackClick, thumbsSwiper, setThumbsSwiper }) => {

    return (
        <div className={styles.projectDetail}>
            <Button
                variant="contained"
                color="secondary"
                onClick={onBackClick}
                startIcon={<FaArrowLeft />}
                className={styles.backButton}
            >
                Back to Projects
            </Button>
            <Typography variant="h4" component="h2" gutterBottom>
                {project.name}
            </Typography>
            <Swiper
                navigation={true}
                thumbs={{ swiper: thumbsSwiper && !thumbsSwiper.destroyed ? thumbsSwiper : null }}
                modules={[FreeMode, Navigation, Thumbs]}
                className={styles.mySwiper2}
            >
                {project.gallery.map((image, index) => (
                    <SwiperSlide key={index}>
                        <img src={image} alt={`Gallery image ${index + 1}`} className={styles.projectImage} />
                    </SwiperSlide>
                ))}
            </Swiper>
            <Swiper
                onSwiper={setThumbsSwiper}
                spaceBetween={10}
                slidesPerView={4}
                freeMode={true}
                watchSlidesProgress={true}
                modules={[FreeMode, Navigation, Thumbs]}
                className={styles.mySwiper}
            >
                {project.gallery.map((image, index) => (
                    <SwiperSlide key={index}>
                        <img src={image} alt={`Thumbnail ${index + 1}`} className={styles.projectImage} />
                    </SwiperSlide>
                ))}
            </Swiper>
            <Typography variant="body1" paragraph>
                {project.detailedDescription}
            </Typography>
            <Link href={project.url} target="_blank" rel="noopener noreferrer" className={styles.projectLink}>
                Visit Project
            </Link>
        </div>
    );
};

export default ProjectsWindow;
