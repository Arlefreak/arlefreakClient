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
    constructor(props) {
        super(props);
        this.GetPolyLines = this.GetPolyLines.bind(this);
        this.GetMarkers = this.GetMarkers.bind(this);
    }

    componentWillMount() {
        Map = require('react-leaflet').Map;
        TileLayer = require('react-leaflet').TileLayer;
        Marker = require('react-leaflet').Marker;
        Popup = require('react-leaflet').Popup;
        Polyline = require('react-leaflet').Polyline;
        CircleMarker = require('react-leaflet').CircleMarker;
        ToolTip = require('react-leaflet').ToolTip;
    }

    GetPolyLines() {
        const { items } = this.props;

        let arr = [];
        items.map((trip, i) => {
            let positions = [];
            trip.cities.map(city => positions.push(city.coordinates));
            arr.push(
                <Polyline
                    key={ i }
                    positions={ positions }
                    color={ trip.color }
                    opacity={ 0.9 }
                    lineJoin='bevel'
                    lineCap='butt'
                    dashArray='10,5'
                    weight={ 2 }
                />
            );
        });
        return arr;
    }

    GetMarkers() {
        const { items } = this.props;

        let arr = [];
        items.map((trip, i) => {
            let positions = [];
            trip.cities.map((city) => {
                arr.push(
                    <CircleMarker
                        key={ city.id }
                        center={ city.coordinates }
                        fillColor={ trip.color }
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
                            <span>{city.city}{ trip.name && ` - ${trip.name}` }</span>
                        </Popup>
                    </CircleMarker>
                );
            });
        });
        return arr;
    }

    render() {
        const { items } = this.props;
        const center = items[0].cities[0].coordinates;

        const polyLines = this.GetPolyLines();
        const markers = this.GetMarkers();

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
                    { polyLines }
                    { markers }
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
