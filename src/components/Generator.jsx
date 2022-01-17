import React from 'react';

import InputData from './stages/InputData/index';
import SelectImage from './stages/SelectImage/index';
import DownloadImage from './stages/DownloadImage/index';
import Api from '../scripts/api';
import {stages, statusCodes} from '../scripts/enums'
import ImageListModel from '../scripts/selectImage/imageListModel';
import LoaderScreen from './LoaderScreen'

export default class Generator extends React.Component {

    handleStateSwitch = (event, data) => {
        console.log(data);
        this.setState(data)
    }

    async initialize (event, data) {
        await this.setState({loading: true});
        const api = await new Api(data);
        const listModel = await new ImageListModel(api.getNextImage.bind(api));
        await this.setState({loading: false, api: api, listModel: listModel});
        return statusCodes.SUCCESS;
    }

    constructor(props) {
        super(props);
        this.state = {stage: stages.INPUT_DATA }
    }

    render() {
        return (
            <div>
            {
                this.state.loading
                ? <LoaderScreen />
                : (() => {
                    switch (this.state.stage) {
                        case stages.INPUT_DATA:
                            return <InputData handleStateSwitch={(event, data) => {
                                this.initialize.call(this, event, data).then(result => {
                                    this.handleStateSwitch.call(this, event, data)
                                }).catch(error => {
                                    console.log('...')
                                })
                                
                            }} />
                        case stages.SELECT_IMAGE:
                            return <SelectImage
                            imageListModel={this.state.listModel}
                            handleStateSwitch={this.handleStateSwitch.bind(this)}
                            pages={this.state.pages}/>
                        case stages.DOWNLOAD_IMAGE:
                            return <DownloadImage
                            url={this.state.image}
                            original={{textContent: this.state.textContent, image: this.state.originalImage}}
                            handleStateSwitch={this.handleStateSwitch.bind(this)}
                            />
                        default:
                            return "error! Wrong stage given"
                    }
                })()
            }
            </div>
        );
    }
}