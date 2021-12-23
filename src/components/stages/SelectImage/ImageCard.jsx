import React, { Profiler } from 'react';
import PropTypes from 'prop-types'

import {
    Card, CardActionArea, Paper, CardMedia,
    CardActions, Button, CardContent, Typography,
    Skeleton, Box, 
    styled
} from '@mui/material';
import PlayCircleOutlineIcon from '@mui/icons-material/PlayCircleOutline';
import ImagePrewiew from '../InputData/ImagePreview'
import { PinDrop } from '@mui/icons-material';

import { stages } from '../../../scripts/enums'

const Item = styled(Paper)(({ theme }) => ({
    ...theme.typography.body2,
}));

export default class ImageCard extends React.Component {
    
    static propTypes = {
        /**
         * обработанная картинка, промис, который выдаст нам url
         */
        urlPromise: PropTypes.shape({
            then: PropTypes.func.isRequired,
            catch: PropTypes.func.isRequired
        }),

        /**
         * Высота нашей картинки в карточке
         * От неё зависит отображаемая ширина
         */
        height: PropTypes.oneOfType(PropTypes.string, PropTypes.number),

        handleStateSwitch: PropTypes.func
    }

    constructor(props) {
        super(props)
        this.state = {loading: true, imageLoading: true};
    }

    componentDidMount() {
        this.props.urlPromise.then(result => {
            this.setState({loading: false, src: result})
        })
        .catch(error => {
            this.setState({loading: false, error: error})
        });
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
                onClick = {(e) => {
                    this.props.handleStateSwitch(e,
                        {
                        stage: stages.DOWNLOAD_IMAGE,
                        image: this.state.src
                        }
                    )}
                }
                >

                    {(() => {
                        if (this.state.loading) {
                            return <Skeleton
                            sx={{ height: this.props.height }}
                            animation="wave"
                            variant="rectangular"
                            />
                        }

                        else if (this.state.imageLoading) {
                            return (
                            <Box sx={{position: 'relative', width: '100%', height: this.props.height}}>
                            <Skeleton
                            sx={{
                                zIndex: 100,
                                height: this.props.height,
                                position: 'absolute', top: 0, left:0, right: 0,
                            }}
                            animation="wave"
                            variant="rectangular"
                            />
                            <Box sx={{
                            position: 'absolute',
                            top: 0, left:0, right: 0,
                            height: this.props.height,
                            background: '#fff',
                            }}
                            />
                            <CardMedia
                            component={'img'}
                            height={this.props.height}
                            src={this.state.src}
                            onLoad={this.handleImageLoaded.bind(this)}
                            onError={this.handleImageErrored.bind(this)}
                            alt={'image'}
                            />
                            </Box>
                            );
                        }

                        else {
                            return <CardMedia
                            component={'img'}
                            height={this.props.height}
                            src={this.state.src}
                            alt={'image'}
                            />
                        }
                    })()}

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