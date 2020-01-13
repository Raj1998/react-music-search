import React, { Component } from 'react'
import axios from 'axios'
import {Consumer} from '../../context'

export default class Search extends Component {
    state = {
        trackTitle : '',
    }

    onChange = (e) => {
        this.setState({[e.target.name]: e.target.value })
        // axios.get(`https://cors-anywhere.herokuapp.com/https://api.musixmatch.com/ws/1.1/track.search?page_size=9&s_track_rating=desc&q_track=${this.state.trackTitle}&&apikey=${process.env.REACT_APP_MM_KEY}`)
        //     .then(res => {
        //         console.log(res.data)
        //         // this.setState({track_list: res.data.message.body.track_list})
        //         // dispatch({
        //         //     type: 'SEARCH_TRACK',
        //         //     payload: res.data.message.body.track_list
        //         // })
        //     })
        //     .catch(err => console.log(err))
    }

    formSubmit = (dispatch, e) => {
        e.preventDefault();

        axios.get(`https://cors-anywhere.herokuapp.com/https://api.musixmatch.com/ws/1.1/track.search?page_size=9&s_track_rating=desc&q_track=${this.state.trackTitle}&&apikey=${process.env.REACT_APP_MM_KEY}`)
            .then(res => {
                console.log(res.data)
                this.setState({track_list: res.data.message.body.track_list})
                dispatch({
                    type: 'SEARCH_TRACK',
                    payload: res.data.message.body.track_list
                })
            })
            .catch(err => console.log(err))

        this.setState({
            trackTitle: ""
        })
    }


    render() {
        return (
            <Consumer>
                {
                    value => {
                        const { dispatch } = value
                        return (
                            
                                <div className="card card-body mb-4 p4">
                                    <h1 className="display-4 text-center">
                                        <i className="fas fa-music"></i> Search For A Song
                                    </h1>
                                    <p className="lead text-center">Get Lyrics for any song</p>
                                

                                <form onSubmit={this.formSubmit.bind(this, dispatch)} >
                                    <div className="form-group">
                                        <input type="text"
                                            className="form-control form-control-lg"
                                            placeholder="Song title"
                                            name="trackTitle"
                                            value={this.state.trackTitle}
                                            onChange={this.onChange}
                                        />
                                        <button type="submit" className="btn btn-primary btn-block mt-2">Search</button>
                                    </div>
                                </form>

                                </div>

                        )
                    }
                }
            </Consumer>
        )
    }
}
