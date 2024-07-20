import React, { useState } from 'react';
import { FaPython, FaJsSquare, FaJava, FaRust, FaPhp, FaHtml5, FaCss3, FaReact, FaDocker, FaGit, FaLinux, FaThList } from 'react-icons/fa';
import { SiTypescript, SiCsharp, SiCplusplus, SiArduino, SiDjango, SiDotnet, SiVite, SiThreedotjs, SiMui, SiTauri, SiBootstrap } from 'react-icons/si';
import { Grid, TextField, Button, Typography, Card, CardContent, CardActionArea, CardMedia, Select, MenuItem, InputLabel, FormControl, Chip, OutlinedInput, SelectChangeEvent } from '@mui/material';

const skillsData = [
    { name: 'Python', category: 'Programming Languages', icon: <FaPython />, url: 'https://www.python.org/' },
    { name: 'JavaScript', category: 'Programming Languages', icon: <FaJsSquare />, url: 'https://www.javascript.com/' },
    { name: 'TypeScript', category: 'Programming Languages', icon: <SiTypescript />, url: 'https://www.typescriptlang.org/' },
    { name: 'C#', category: 'Programming Languages', icon: <SiCsharp />, url: 'https://docs.microsoft.com/en-us/dotnet/csharp/' },
    { name: 'Java', category: 'Programming Languages', icon: <FaJava />, url: 'https://www.java.com/' },
    { name: 'Rust', category: 'Programming Languages', icon: <FaRust />, url: 'https://www.rust-lang.org/' },
    { name: 'PHP', category: 'Programming Languages', icon: <FaPhp />, url: 'https://www.php.net/' },
    { name: 'C++', category: 'Programming Languages', icon: <SiCplusplus />, url: 'https://isocpp.org/' },
    { name: 'Arduino', category: 'Programming Languages', icon: <SiArduino />, url: 'https://www.arduino.cc/' },
    { name: 'HTML5', category: 'Web Development', icon: <FaHtml5 />, url: 'https://developer.mozilla.org/en-US/docs/Web/Guide/HTML/HTML5' },
    { name: 'CSS3', category: 'Web Development', icon: <FaCss3 />, url: 'https://developer.mozilla.org/en-US/docs/Web/CSS/CSS3' },
    { name: 'React', category: 'Web Development', icon: <FaReact />, url: 'https://reactjs.org/' },
    { name: 'Vite', category: 'Web Development', icon: <SiVite />, url: 'https://vitejs.dev/' },
    { name: 'Three.js', category: 'Web Development', icon: <SiThreedotjs />, url: 'https://threejs.org/' },
    { name: 'Material-UI', category: 'Web Development', icon: <SiMui />, url: 'https://mui.com/' },
    { name: 'Bootstrap', category: 'Web Development', icon: <SiBootstrap />, url: 'https://getbootstrap.com/' },
    { name: 'Django', category: 'Frameworks and Libraries', icon: <SiDjango />, url: 'https://www.djangoproject.com/' },
    { name: '.NET', category: 'Frameworks and Libraries', icon: <SiDotnet />, url: 'https://dotnet.microsoft.com/' },
    { name: 'Tauri', category: 'Frameworks and Libraries', icon: <SiTauri />, url: 'https://tauri.studio/' },
    { name: 'Docker', category: 'Data Handling and Web Technologies', icon: <FaDocker />, url: 'https://www.docker.com/' },
    { name: 'Git', category: 'Data Handling and Web Technologies', icon: <FaGit />, url: 'https://git-scm.com/' },
    { name: 'Linux', category: 'Data Handling and Web Technologies', icon: <FaLinux />, url: 'https://www.linux.org/' }
];

const categories = [
    'Programming Languages', 'Web Development', 'Frameworks and Libraries', 'Data Handling and Web Technologies'
];

const SkillsSearch: React.FC = () => {
    const [searchTerm, setSearchTerm] = useState('');
    const [selectedCategories, setSelectedCategories] = useState<string[]>([]);
    const [viewAll, setViewAll] = useState(false);

    const handleCategoryChange = (event: SelectChangeEvent<string[]>) => {
        setSelectedCategories(event.target.value as string[]);
    };

    const filteredSkills = skillsData.filter(skill =>
        skill.name.toLowerCase().includes(searchTerm.toLowerCase()) &&
        (selectedCategories.length === 0 || selectedCategories.includes(skill.category))
    );

    const skillsByCategory = skillsData.reduce<Record<string, typeof skillsData>>((acc, skill) => {
        if (!acc[skill.category]) acc[skill.category] = [];
        acc[skill.category].push(skill);
        return acc;
    }, {});

    return (
        <div className="p-4">
            <Grid container spacing={2} justifyContent="space-between" alignItems="center" className="mb-4">
                <Grid item>
                    <Typography variant="h5" component="h3" className="text-xl font-semibold mb-2 sm:mb-0">Skills</Typography>
                </Grid>
                <Grid item>
                    <Button
                        variant="contained"
                        startIcon={<FaThList />}
                        onClick={() => setViewAll(!viewAll)}
                        sx={{
                            backgroundColor: viewAll ? 'secondary.main' : 'primary.main',
                            '&:hover': {
                                backgroundColor: viewAll ? 'secondary.dark' : 'primary.dark'
                            }
                        }}
                    >
                        {viewAll ? 'View by Category' : 'View All'}
                    </Button>
                </Grid>
            </Grid>

            {!viewAll && (
                <Grid container spacing={2} className="mb-4">
                    <Grid item xs={12} sm={6}>
                        <TextField
                            fullWidth
                            label="Search skills..."
                            variant="outlined"
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                        />
                    </Grid>
                    <Grid item xs={12} sm={6}>
                        <FormControl fullWidth variant="outlined">
                            <InputLabel>Categories</InputLabel>
                            <Select
                                multiple
                                value={selectedCategories}
                                onChange={handleCategoryChange}
                                input={<OutlinedInput label="Categories" />}
                                renderValue={(selected) => (
                                    <div>
                                        {(selected as string[]).map((value) => (
                                            <Chip key={value} label={value} style={{ margin: 2 }} />
                                        ))}
                                    </div>
                                )}
                            >
                                {categories.map((category) => (
                                    <MenuItem key={category} value={category}>
                                        {category}
                                    </MenuItem>
                                ))}
                            </Select>
                        </FormControl>
                    </Grid>
                </Grid>
            )}

            <Grid container spacing={2}>
                {viewAll ? (
                    Object.keys(skillsByCategory).map(category => (
                        <Grid item xs={12} key={category}>
                            <Typography variant="h6" component="h4" className="mb-2">{category}</Typography>
                            <Grid container spacing={2}>
                                {skillsByCategory[category].map(skill => (
                                    <Grid item xs={12} sm={6} md={4} key={skill.name}>
                                        <Card sx={{ backgroundColor: 'background.paper', color: 'text.primary' }}>
                                            <CardActionArea href={skill.url} target="_blank" rel="noopener noreferrer">
                                                <CardContent className="flex items-center">
                                                    <CardMedia className="text-3xl mr-4">
                                                        {skill.icon}
                                                    </CardMedia>
                                                    <Typography variant="body1" component="div" className="text-lg font-medium">
                                                        {skill.name}
                                                    </Typography>
                                                </CardContent>
                                            </CardActionArea>
                                        </Card>
                                    </Grid>
                                ))}
                            </Grid>
                        </Grid>
                    ))
                ) : (
                    filteredSkills.map(skill => (
                        <Grid item xs={12} sm={6} md={4} key={skill.name}>
                            <Card sx={{ backgroundColor: 'background.paper', color: 'text.primary' }}>
                                <CardActionArea href={skill.url} target="_blank" rel="noopener noreferrer">
                                    <CardContent className="flex items-center">
                                        <CardMedia className="text-3xl mr-4">
                                            {skill.icon}
                                        </CardMedia>
                                        <Typography variant="body1" component="div" className="text-lg font-medium">
                                            {skill.name}
                                        </Typography>
                                    </CardContent>
                                </CardActionArea>
                            </Card>
                        </Grid>
                    ))
                )}
            </Grid>
        </div>
    );
};

export default SkillsSearch;
