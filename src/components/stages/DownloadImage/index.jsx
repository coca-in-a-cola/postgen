import React from 'react';
import PropTypes from 'prop-types'

import {
    Box, Button, ButtonGroup, Drawer, CssBaseline,
    Grid, List, Typography,
    Divider, ListItem, ListItemText,
    ToggleButton, TextField,
    styled,
    Toolbar,
    Container
} from '@mui/material';
import DownloadIcon from '@mui/icons-material/Download';
import CloseIcon from '@mui/icons-material/Close';
import ImagePreviewPrimary from '../../imagePreviews/Primary';

import {stages, imageLoadStatus} from '../../../scripts/enums'


export default class DownloadImage extends React.Component {
    static propTypes = {
        /**
         * обработанная картинка, url
         */
        url: PropTypes.string,

        /**
         * Необработанная картинка и текст
         */
        original: PropTypes.object,
    }

    render() {
        return (
            <Container sx={{paddingBottom: 2}}>
                <CssBaseline />
                <Box sx={{width: '100%', position:'relative'}}>
                <Typography variant={'h2'} sx={{marginTop: 2, marginBottom: 2}} color={'primary'}>
                    Скачайте картинку
                </Typography>

                <ImagePreviewPrimary src={this.props.url} height={600} />
                <Box sx={{ marginTop: 2, display: 'flex', justifyContent: 'flex-start' }}>
                    <Button
                    variant="contained"
                    component={'a'}
                    color="primary"
                    margin="dense"
                    size="large"
                    sx={{textAlign: 'center'}}
                    href={this.props.url}
                    download="postgen.png"
                    crossOrigin = "anonymous"
                    target = "_blank"
                    startIcon={<DownloadIcon />}
                    >
                    Скачать (PNG)
                    </Button>

                    <Button
                    variant="contained"
                    component="label"
                    color="error"
                    margin="dense"
                    size="large"
                    sx={{textAlign: 'center', marginLeft: 2}}
                    startIcon={<CloseIcon />}
                    onClick={(e) =>
                    this.props.handleStateSwitch(e,
                        {stage: stages.SELECT_IMAGE,
                        originalImage: this.props.original.image,
                        textContent: this.props.original.textContent}
                    )}
                    >
                    Вернуться к списку
                    </Button>
                </Box>
                </Box>
            </Container>
          );
    }
}