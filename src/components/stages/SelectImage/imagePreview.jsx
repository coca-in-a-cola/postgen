import React, { Profiler } from 'react';
import {
    Grid, Skeleton, Paper, Container,
    Box, Toolbar, List, Typography,
    Divider, ListItem, ListItemText,
    ToggleButton, TextField,
    styled
} from '@mui/material';
import PlayCircleOutlineIcon from '@mui/icons-material/PlayCircleOutline';

const Item = styled(Paper)(({ theme }) => ({
    ...theme.typography.body2,
}));

export default class ImagePreview extends React.Component {
    constructor(props) {
        super(props)
    }

    render() {
        return (
            <Card sx={{}}>
                <CardActionArea>
                    <CardMedia
                    component="img"
                    height={this.props.height}
                    image={this.props.url}
                    alt={'image'}
                    />
                    <CardContent>
                    <Typography gutterBottom variant="h5" component="div">
                        Нейросеть № 12345
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                        Сид 102103890
                    </Typography>
                    </CardContent>
                </CardActionArea>
                <CardActions>
                    <Button size="small" color="secondary">
                    В избранное
                    </Button>
                </CardActions>
            </Card>
        )
    }
}