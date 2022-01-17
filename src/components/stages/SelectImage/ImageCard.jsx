import React, { Profiler } from 'react';
import PropTypes from 'prop-types'

import {
    Card, CardActionArea, Paper, CardMedia,
    CardActions, Fab,
    Skeleton, Box, IconButton,
    styled
} from '@mui/material';
import PlayCircleOutlineIcon from '@mui/icons-material/PlayCircleOutline';
import { PinDrop } from '@mui/icons-material';

import { stages } from '../../../scripts/enums'

import VisibilityIcon from '@mui/icons-material/Visibility';
import DownloadIcon from '@mui/icons-material/Download';

const Item = styled(Paper)(({ theme }) => ({
    ...theme.typography.body2,
}));

export default class ImageCard extends React.Component {
    
    static propTypes = {
        loading: PropTypes.bool,

        /**
         * Если loading = false, предоставляйте src и onClick
         */
        src: PropTypes.string,

        /**
         * Событе при клике на карточку
         */
        onClick: PropTypes.func,

        /**
         * Необязательно
         * @default 256
         */
        placeholderHeight: PropTypes.number
    }

    static defaultProps = {
        placeholderHeight: 256
    }

    constructor(props) {
        super(props)
        this.state = {loading: true, imageLoading: true};
    }

    componentDidMount() {
        if (this.props.src) {
            this.setState({loading: false, src: this.props.src})
        }
    }

    componentDidUpdate(prevProps) {
        if (prevProps.src != this.props.src) {
            this.setState({loading: false, src: this.props.src})
        }
    }

    handleImageLoaded() {
        this.setState({imageLoading: false})
    }

    handleImageErrored() {
        this.setState({error: "Мы не смогли загрузить картинку :("});
    }

    render() {
        return (
            <Card>
                <CardActionArea
                onClick = {this.props.loading ? () => {} : (e) => this.props.onClick(e)}
                sx = {{ position: 'relative' }}
                >
                    
                    {
                        this.props.loading
                        ? <Skeleton
                        height={this.props.placeholderHeight}
                        width={'100%'}
                        variant="rectangular"
                        sx = {{ }}
                        />
                        : <CardMedia
                        component={'img'}
                        src={this.state.src}
                        alt={'generation result'}
                        sx = {{ position: 'relative' }}
                        />
                    }
                </CardActionArea>

                <CardActions>
                    <Box sx={{ display: 'flex', alignItems: 'center', pl: 1, pb: 1 }}>
                    {
                        this.props.loading
                        ? <>
                        <Skeleton variant="text" width={80}/>
                        <Skeleton variant="circular" width={40} height={40} sx={{ ml: 1 }} />
                        </>
                        : <>
                            <Fab 
                                variant="extended"
                                color="primary"
                                size="small" 
                                onClick = {(e) => this.props.onClick(e)}
                            >
                                <VisibilityIcon sx={{ mr: 1 }} />
                                Просмотр
                            </Fab>

                            <IconButton
                                component={'a'}
                                href={this.props.src}
                                download="postgen.jpg"
                                crossOrigin = "anonymous"
                                target = "_blank"
                                sx={{ ml: 1 }}
                            >
                                <DownloadIcon/>
                            </IconButton>
                        </>
                    }
                    </Box>
                </CardActions>
            </Card>
        )
    }
}