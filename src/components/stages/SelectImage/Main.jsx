import React, { Profiler } from 'react';
import {
    Grid, Skeleton, Paper, Container,
    Box, Toolbar, List, Typography,
    Divider, ListItem, ListItemText,
    Button, TextField,
    styled
} from '@mui/material';

import RestartAltIcon from '@mui/icons-material/RestartAlt';
import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos';
import { stages } from '../../../scripts/enums';

const Item = styled(Paper)(({ theme }) => ({
    ...theme.typography.body2,
}));

export default class SelectImage extends React.Component {
    constructor(props) {
        super(props);
        let itemsPerLine = 3;
        let spacing = 2;
        let containerInnerWidth = 1200 - 24*2;
        this.state = {
            itemsPerLine: itemsPerLine,
            spacing: spacing,
            containerInnerWidth: containerInnerWidth,
            itemHeight: (() => {
                let imagePreviewWidth = (containerInnerWidth - (spacing * (itemsPerLine - 1) * 8)) / 3;
                let scale = imagePreviewWidth / props.imageWidth;
                return props.imageHeight * scale;
            })()
        }
    }

    selectItem(item) {

    }

    render() {
        return (
            <Container>
                <Box sx = {{marginTop: 8, paddingBottom: 1, position: 'relative'}}>
                <Typography color={'textSecondary'} variant={'h1'} sx = {{
                    opacity: .5, fontSize: 150, fontWeight: 900, position: 'absolute', zIndex: -1, left: -140, top: -70
                    }}>
                    02
                </Typography>
                <Typography variant={'h2'} color={'primary'}>
                    Выберите вариант оформления
                </Typography>
                </Box>
            <Grid container spacing={this.state.spacing}>
                <Grid item xs={12 / this.state.itemsPerLine}>
                    <Item><Skeleton variant="rectangular" height={this.state.itemHeight}/></Item>
                </Grid>
                <Grid item xs={12 / this.state.itemsPerLine}>
                    <Item><Skeleton variant="rectangular" height={this.state.itemHeight}/></Item>
                </Grid>
                <Grid item xs={12 / this.state.itemsPerLine}>
                    <Item><Skeleton variant="rectangular" height={this.state.itemHeight}/></Item>
                </Grid>
            </Grid>
            <Box sx={{width: '100%', display: 'flex', marginTop: 2, alignItems: 'flex-start'}}>
            <Button
                variant="contained"
                component="label"
                color="error"
                margin="dense"
                size="large"
                sx={{}}
                startIcon={<ArrowBackIosIcon />}
                onClick={(e) => this.props.handleStateSwitch(e, {stage: stages.INPUT_DATA})}
                >
                Назад
            </Button>

                <Box sx ={{marginLeft: 2}}>
                    <Button
                    variant="contained"
                    component="label"
                    color="secondary"
                    margin="dense"
                    size="large"
                    sx={{textAlign: 'center', margin: '0 auto'}}
                    endIcon={<RestartAltIcon />}
                    onClick={() => {}}
                    >
                    Генерировать снова
                    </Button>
                    <Typography variant='h6' color='textSecondary' sx ={{display: 'block'}}>
                        Или просто нажмите [space]
                    </Typography>
                </Box>
            </Box>
            </Container>
          );
    }
}

// Specifies the default values for props:
SelectImage.defaultProps = {
    imageWidth: 400,
    imageHeight: 600,
};
  