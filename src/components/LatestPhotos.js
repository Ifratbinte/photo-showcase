import React, { Component } from 'react'
import axios from 'axios'



export default class LatestPhotos extends Component {
    

    state = {
        photos: [],
        page: 1,
        loading: true
    }

    componentDidMount() {
        axios.get('https://api.unsplash.com/photos/?client_id=46586f7407af308759850cb7358451640c67d0268f31f45ac1d9103443379ce9&per_page=16&page='+ this.state.page).then(
            res => this.setState({
                photos: res.data,
                loading: false,
                page: this.state.page + 1
            })
        )

        window.scrollTo({
            top: 0,
            behavior: 'smooth',
        })
    }

    loadNextPage = (e) => {

        axios.get('https://api.unsplash.com/photos/?client_id=46586f7407af308759850cb7358451640c67d0268f31f45ac1d9103443379ce9&per_page=16&page='+ this.state.page).then(
            res => this.setState({
                photos: res.data,
                loading: false,
                page: this.state.page + 1
            })
        )

        window.scrollTo({
            top: 0,
            behavior: 'smooth',
        })
    }

    render() {

        if(this.state.loading === true) {
            return (
                <div className="col text-center">Loading</div>
            )
        } 

        return (
            <React.Fragment>
                
                {
                    this.state.photos.map((photo) => (
                        <div key={photo.id} className="col-lg-3">
                            <div className="single-photo-item">
                                <a className="d-block" href="/">
                                    <div className="photo-wrapper">
                                        <img src={photo.urls.small} alt={photo.description}/>
                                    </div>
                                    <h5>{photo.description}</h5>
                                    <p className="cat-name">by - {photo.user.first_name} {photo.user.last_name}</p>
                                </a>
                            </div>
                        </div>
                    ))
                }


                <div className="col-lg-12 text-center">
                    <div className="load-more-btn"><button className="btn btn-success" onClick={this.loadNextPage}>Load Page {this.state.page}</button></div>
                </div>
            </React.Fragment>
        )


        
    }
}
