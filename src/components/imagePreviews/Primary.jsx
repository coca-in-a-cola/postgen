import React from 'react';
import PropTypes from 'prop-types';

import { imageLoadStatus } from '../../scripts/enums'
import { testImageURL } from '../../scripts/imageHelpers'
import Error from './Error'

import {
    Box, Button, Card, TextField,
    ToggleButton, ToggleButtonGroup,
    styled, CardMedia, Skeleton, CircularProgress, Toolbar, Typography, Paper,
} from '@mui/material';

const LightboxPaper = styled(Paper)(({ theme }) => ({
    width: '100%',
    // height: imageHeight + lightBoxPaddingY * 2,
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    flexShrink: 1,
    backgroundColor: theme.palette.text.primary,
}));


export default class ImagePreviewPrimary extends React.Component {
    static propTypes = {
        src: PropTypes.any,

        /**
         * Высота в пикселях
         */
        height: PropTypes.number,

        /**
         * Действие по окончанию проверки картинки \
         * Вызывается с единственным парметром (status)
         */
        onChecked: PropTypes.func
    }

    static defaultProps = {
        height: 300
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
            image={url} 
            alt="image input"
            sx={{
                height: this.props.height - 30,
            }}
            /></Card>

            this.setState({loading: false, imageComponent:component,})

            // Вызываем отклик
            this.props.onChecked?.(resolve)
        })
        .catch((reject) => {
            let component = <Error status={reject} />
            
            this.setState({loading: false, imageComponent:component});

            // Вызываем отклик
            this.props.onChecked?.(reject)
        });
    }

    render() {
        return(
            <LightboxPaper sx={{
                height: this.props.height,
                padding: {xs: 1, md: 2, lg:10, xl: 15}
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
        )
    }
    
}