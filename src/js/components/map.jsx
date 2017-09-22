import PropTypes from 'prop-types';
import React, { Component } from 'react';
import { render } from 'react-dom';

let Map;
let TileLayer;
let Marker;
let Popup;
let Polyline;
let CircleMarker;
let ToolTip;

class LeafletMap extends Component {
    componentWillMount() {
        console.log('componentWillMount');
        Map = require('react-leaflet').Map;
        TileLayer = require('react-leaflet').TileLayer;
        Marker = require('react-leaflet').Marker;
        Popup = require('react-leaflet').Popup;
        Polyline = require('react-leaflet').Polyline;
        CircleMarker = require('react-leaflet').CircleMarker;
        ToolTip = require('react-leaflet').ToolTip;
    }

    render() {
        const { items } = this.props;
        const center = items[0].coordinates;

        let positions = [];
        items.map((item) => {
            positions.push(item.coordinates);
        });

        const { city, coordinates, title } = items[0];

        return (
            <div className='map'>
                <Map
                    center={ center }
                    zoom={ 6 }>
                    <TileLayer
                        url='https://cartodb-basemaps-{s}.global.ssl.fastly.net/dark_nolabels/{z}/{x}/{y}.png'
                        attribution='&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a> &copy; <a href="http://cartodb.com/attributions">CartoDB</a>Tiles &copy; Esri &mdash; Esri, DeLorme, NAVTEQ'
                        subdomains='abcd'
                        maxZoom={ 12 }
                        minZoom={ 1 }
                    />
                    <Polyline
                        positions={ positions }
                        color='white'
                        opacity={ 0.9 }
                        lineJoin='bevel'
                        lineCap='butt'
                        dashArray='10,5'
                        weight={ 2 }
                    />
                    {
                        items.map((item, i) => 
                            <CircleMarker
                                key={ i }
                                center={item.coordinates}
                                fillColor='white'
                                stroke={ true }
                                color='#0e0e0e'
                                weight={ 2 }
                                radius={ 3 }
                                opacity={ 1 }
                                fillOpacity={ 1 }
                            >
                                <Popup
                                    className='map-popup'
                                >
                                    <span>{ item.city }{ item.title && ` - ${item.title}` }</span>
                                </Popup>
                            </CircleMarker>
                        )
                    }
                </Map>
            </div>
        );
    }
}

LeafletMap.propTypes = {
    items: PropTypes.arrayOf(PropTypes.shape({
        id: PropTypes.number.isRequired,
        name: PropTypes.string,
        title: PropTypes.string
    }).isRequired).isRequired,
};

export default LeafletMap;
