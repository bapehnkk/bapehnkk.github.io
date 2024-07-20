import React from 'react';
import {FaEnvelope, FaLinkedin, FaGithub, FaTwitter, FaMapMarkerAlt, FaSkype, FaTelegramPlane} from 'react-icons/fa';
import {Typography, Link, Card, CardContent, List, ListItem, ListItemIcon, ListItemText} from '@mui/material';

const ContactWindow: React.FC = () => {
    return (
        <div>
            <Typography variant="h4" component="h2" gutterBottom>
                Contact
            </Typography>
            <Typography variant="body1" gutterBottom>
                If you have any questions or proposals, feel free to reach out through the following channels. The best
                way to contact me is via email during weekdays.
            </Typography>

            <Card variant="outlined" sx={{mb: 4}}>
                <CardContent>
                    <Typography variant="h5" component="h3" gutterBottom>
                        Direct Contact
                    </Typography>
                    <List>
                        <ListItem>
                            <ListItemIcon><FaEnvelope/></ListItemIcon>
                            <ListItemText primary="Email"
                                          secondary={<Link href="mailto:bapehnkk@gmail.com">bapehnkk@gmail.com</Link>}/>
                        </ListItem>
                        <ListItem>
                            <ListItemIcon><FaSkype/></ListItemIcon>
                            <ListItemText primary="Skype" secondary="bapehnkk_skype"/>
                        </ListItem>
                        <ListItem>
                            <ListItemIcon><FaTelegramPlane/></ListItemIcon>
                            <ListItemText primary="Telegram" secondary="@bapehnkk"/>
                        </ListItem>
                    </List>
                </CardContent>
            </Card>

            <Card variant="outlined" sx={{mb: 4}}>
                <CardContent>
                    <Typography variant="h5" component="h3" gutterBottom>
                        Social Media & Professional Networks
                    </Typography>
                    <List>
                        <ListItem>
                            <ListItemIcon><FaLinkedin/></ListItemIcon>
                            <ListItemText primary="LinkedIn"
                                          secondary={<Link href="https://linkedin.com/in/bapehnkk" target="_blank"
                                                           rel="noopener noreferrer">linkedin.com/in/bapehnkk</Link>}/>
                        </ListItem>
                        <ListItem>
                            <ListItemIcon><FaGithub/></ListItemIcon>
                            <ListItemText primary="GitHub"
                                          secondary={<Link href="https://github.com/bapehnkk" target="_blank"
                                                           rel="noopener noreferrer">github.com/bapehnkk</Link>}/>
                        </ListItem>
                        <ListItem>
                            <ListItemIcon><FaTwitter/></ListItemIcon>
                            <ListItemText primary="Twitter"
                                          secondary={<Link href="https://twitter.com/bapehnkk" target="_blank"
                                                           rel="noopener noreferrer">@bapehnkk</Link>}/>
                        </ListItem>
                    </List>
                </CardContent>
            </Card>

            <Card variant="outlined">
                <CardContent>
                    <Typography variant="h5" component="h3" gutterBottom>
                        Location
                    </Typography>
                    <Typography variant="body1">Tallinn, Estonia</Typography>
                    <Link href="https://maps.google.com?q=Tallinn,+Estonia" target="_blank" rel="noopener noreferrer"
                          sx={{display: 'flex', alignItems: 'center', mt: 1}}>
                        <FaMapMarkerAlt style={{marginRight: '8px'}}/>
                        View on Map
                    </Link>
                </CardContent>
            </Card>
        </div>
    );
};

export default ContactWindow;
