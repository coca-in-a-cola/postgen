import React from 'react';
import PropTypes from 'prop-types';

import { imageLoadStatus } from '../../../scripts/enums'
import { testImageURL } from '../../../scripts/imageHelpers'
import CropOriginalIcon from '@mui/icons-material/CropOriginal';
import ErrorOutlineIcon from '@mui/icons-material/ErrorOutline';

import {
    Box, Button, Card, TextField,
    ToggleButton, ToggleButtonGroup,
    styled, CardMedia, Skeleton, CircularProgress, Toolbar, Typography, Paper,
} from '@mui/material';

const imageHeight = 540;
const lightBoxPaddingY = 30;

function getErrorComponent(error) {
    switch(error) {
        case(imageLoadStatus.ERROR):
            return <Box sx={{textAlign: 'center'}}>
            <ErrorOutlineIcon color={'error'} sx={{fontSize: '6rem'}}/>
            <Box>
                <Typography variant={'h5'} color={'error'}>
                     Произошла ошибка при загрузке изображения
                </Typography>
            </Box>
            </Box>
        case(imageLoadStatus.TIMEOUT):
            return <Box sx={{textAlign: 'center'}}>
                <ErrorOutlineIcon color={'error'} sx={{fontSize: '6rem'}}/>
                <Box>
                    <Typography variant={'h5'} color={'error'}>
                        Не удалось загрузить изображение
                    </Typography>
                </Box>
                </Box>
        case(imageLoadStatus.EMPTY):
            return <Box sx={{textAlign: 'center'}}>
            <CropOriginalIcon color={'secondary'} sx={{fontSize: '6rem'}}/>
            <Box>
                <Typography variant={'h5'} color={'secondary'}>
                    Пожалуйста, загрузите изображение
                </Typography>
            </Box>
            </Box>
    }
}

const LightboxPaper = styled(Paper)(({ theme }) => ({
    width: '100%',
    height: imageHeight + lightBoxPaddingY * 2,
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: theme.palette.text.primary,
}));


export default class ImagePreview extends React.Component {
    static propTypes = {
        src: PropTypes.any,

        /**
         * Действие по окончанию проверки картинки \
         * Вызывается с единственным парметром (status)
         */
        onChecked: PropTypes.func
    }

    constructor(props) {
        super(props)
        this.state = {loading: true}
        this.renderCardComponent.call(this, props.src)
        console.log(props.src)
    }

    componentWillReceiveProps(nextProps) {
        if (this.props.src != nextProps.src) {
            this.setState({loading: true})
            this.renderCardComponent.call(this, nextProps.src)
            console.log(nextProps.src)
    
        }
    }

    /**
     * renderCardComponent работает через state и ничего не возврщает через return
     */
    async renderCardComponent(url) {
        this.setState({loading: true});

        testImageURL(url).then((resolve) => {
            console.log(url)
            let component = 
            <Card sx={{ maxWidth: '100%', boxShadow: 'none', textAlign: 'center', borderRadius: 0 }}>
            <CardMedia
            component="img"
            height={imageHeight}
            image={url} 
            alt="image input"
            /></Card>

            this.setState({loading: false, imageComponent:component,})

            // Вызываем отклик
            this.props.onChecked?.(resolve)
        })
        .catch((reject) => {
            let component = getErrorComponent(reject)
            
            this.setState({loading: false, imageComponent:component});

            // Вызываем отклик
            this.props.onChecked?.(reject)
        });
    }

    render() {
        return(
            <Toolbar>
            <LightboxPaper sx={{
                padding: 15
            }}>
                {( () => {
                    if (this.state.loading) {
                        return <CircularProgress color="error" />
                    }
                    else {
                        return this.state.imageComponent
                    }
                }
                )()}
            </LightboxPaper>
            </Toolbar>    
        )
    }
    
}