import React from 'react';
import PropTypes from 'prop-types'

import {
    Box, Button, ButtonGroup, Drawer, CssBaseline,
    Grid, List, Typography,
    Divider, ListItem, ListItemText,
    ToggleButton, TextField,
    styled,
    Toolbar
} from '@mui/material';
import DownloadIcon from '@mui/icons-material/Download';
import CloseIcon from '@mui/icons-material/Close';
import ImagePreview from '../InputData/ImagePreview';

import {stages, imageLoadStatus} from '../../../scripts/enums'

const drawerWidth = '36rem';


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
            <Box sx={{ display: 'flex' }}>
                <CssBaseline />
                <Box sx={{width: '100%', position:'relative'}}>

                <Box sx = {{marginTop: 6, paddingBottom: 4, marginLeft: 3, position: 'relative'}}>
                <Typography color={'textSecondary'} variant={'h1'} sx = {{
                    opacity: .5, fontSize: 150, fontWeight: 900, position: 'absolute', zIndex: -1, left: -10, top: -50
                    }}>
                    03
                </Typography>
                <Typography variant={'h2'} sx={{marginLeft: 24}} color={'primary'}>
                    Скачайте картинку
                </Typography>
                </Box>

                <ImagePreview src={this.props.url} />
                <Toolbar sx={{justifyContent: 'flex-start'}}>
                    <Button
                    variant="contained"
                    component={'a'}
                    color="primary"
                    margin="dense"
                    size="large"
                    sx={{textAlign: 'center'}}

                    href={this.props.url}
                    download="postgen.jpg"
                    startIcon={<DownloadIcon />}
                    >
                    Скачать (jpg)
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
                </Toolbar>
                </Box>
            </Box>
          );
    }
}