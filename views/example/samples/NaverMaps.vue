<template>
    <naver-maps
        :style="{ width: '100%', height: '100%' }"
        :mapOptions="mapOptions"
        :initLayers="initLayers"
        @load="onMapsLoaded"
    >
        <template v-for="(coord, i) in marker.coord">
            <naver-marker
                :key="Math.random() * i"
                :lat="coord.y"
                :lng="coord.x"
                @load="loadMarker"
            >
                <svg viewBox="0 0 10 10" width="10">
                    <defs>
                        <linearGradient id="gradient">
                            <stop offset="0" stop-color="blue" />
                            <stop offset="1" stop-color="red" />
                        </linearGradient>
                    </defs>
                    <circle cx="4" cy="4" r="4" stroke-width="1" id="circle" />
                    <use href="#circle" stroke="transparent" fill="url(#gradient)"></use>
                </svg>
            </naver-marker>
        </template>
    </naver-maps>
</template>

<script>
import request from '@/core/request';

export default {
    props: [
        'polyCount',
        'svgCount'
    ],
    data() {
        return {
            naverMap: null,
            mapOptions: {
                lat: 37.4965678,
                lng: 127.0269681,
                zoom: 7,
                minZoom: 7,
                zoomControl: false,
                mapTypeControl: false,
                disableKineticPan: false
            },

            marker: {
                list: [],
                coord: [],
                position: {
                    lat: null,
                    lng: null
                }
            },

            initLayers: ['BACKGROUND', 'BACKGROUND_DETAIL', 'POI_KOREAN', 'TRANSIT', 'ENGLISH', 'CHINESE', 'JAPANESE'],

            topology: null,
            geojson: null,
            geo: [],
            poly: [],
            polyStyles: {
                fillColor: '#ff0000',
                fillOpacity: 0.1,
                strokeColor: '#ff0000',
                strokeWeight: 2,
                strokeOpacity: .6
            }
        };
    },
    watch: {
        'geojson': {
            deep: true,
            handler: function() {
                this.setDataLayer(this.geojson);
            }
        },
        'polyCount': {
            deep: true,
            handler: function(v) {
                this.updateDataLayer(parseInt(v));
            }
        },
        'svgCount': {
            deep: true,
            handler: function(v) {
                this.updateMarker(parseInt(v));
            }
        }
    },
    async created() {
        this.topology = await request.get('/dummy/topo/GANGNAM.json');
        this.geojson = topojson.feature(this.topology, this.topology.objects['GANGNAM']);
    },
    methods: {
        onMapsLoaded(naverMap) {
            const { map } = naverMap;
            this.naverMap = map;

            naver.maps.Event.addListener(this.naverMap, 'idle', () => this.setMarker(this.marker.list));
        },
        setDataLayer() {
            const { data: dataLayer } = this.naverMap;

            const layerLabel = document.createElement('div');
            layerLabel.setAttribute('class', 'layerLabel');

            const pane = this.naverMap.getPanes().floatPane;
            pane.append(layerLabel);

            dataLayer.setStyle(() => this.polyStyles);
            dataLayer.addListener('click', ({ feature }) => { });
            dataLayer.addListener('mouseover', ({ feature, offset }) => {
                layerLabel.setAttribute('style', `display: block; left: ${offset.x}px; top: ${offset.y}px;`);
                layerLabel.innerText = `${feature.getProperty('A4')} ${feature.getProperty('A7')}`; // A4: 주소, A7: 지번

                dataLayer.overrideStyle(feature, {
                    fillOpacity: 0.3,
                    strokeWeight: 2,
                    strokeOpacity: 1
                });
            });
            dataLayer.addListener('mouseout', () => {
                layerLabel.setAttribute('style', 'display: none; left: auto; top: auto;');
                dataLayer.revertStyle();
            });
        },
        updateDataLayer(count = 0) {
            const { data: dataLayer } = this.naverMap;
            window._layer = dataLayer;
            window._this = this;

            if (this.geo.length !== 0) {
                this.geo.forEach(g => dataLayer.removeGeoJson(g));
                this.geo = [];
            }

            this.geojson.features.forEach((geo, i) => {
                if (i <= count) {
                    dataLayer.addGeoJson(geo);
                    this.geo.push(geo);
                }
            }); // geo.properties.A27 === '의원'

        },
        setPoly(map) {
            // !밸류쇼핑 => 폴리곤 데이터 (강남역 => 좌하단)
            const getJBGeoStrByAddr1 = {
                'type': 'Single',
                'wgs84': [
                    [
                        127.026225327761, 37.4973368765425, 127.02635971997, 37.4973781231341,
                        127.02649497186, 37.4974196396906, 127.026537269915, 37.497432623149,
                        127.026645729434, 37.4974659190808, 127.026912603588, 37.4975478259137,
                        127.02700357229, 37.4973573350887, 127.027084822209, 37.4971872088746,
                        127.027235229644, 37.4968722769778, 127.02728881549, 37.4967599917755,
                        127.027342570733, 37.4966475082898, 127.02741524229, 37.4964953496304,
                        127.027487902263, 37.4963432449849, 127.02756145464, 37.4961892479953,
                        127.027585083125, 37.4961398680159, 127.027561886835, 37.4960986974581,
                        127.027260693318, 37.4960074381701, 127.027143640613, 37.4959719732501,
                        127.026960111246, 37.495916376201, 127.026773845267, 37.4958599235017,
                        127.026766043517, 37.4958627182677, 127.026172441131, 37.4971054659319,
                        127.026315156572, 37.497148720067, 127.026225327761, 37.4973368765425
                    ]
                ]
            };

            // !밸류쇼핑 => 폴리곤 데이터 (강남역 => 좌하단)
            const getJBGeoStrByAddr2 = {
                'type': 'Multi',
                'wgs84':
                    [
                        [
                            [
                                127.027114650207, 37.4974414644018, 127.027169502059, 37.49745812099,
                                127.027361496666, 37.4973898735042, 127.027423422394, 37.4972603863504,
                                127.027229235949, 37.4972014133212, 127.027114650207, 37.4974414644018
                            ]
                        ],
                        [
                            [
                                127.027586507574, 37.4973099054347, 127.027423422394, 37.4972603863504,
                                127.027361496666, 37.4973898735042, 127.027586507574, 37.4973099054347
                            ]
                        ],
                        [
                            [
                                127.027609234767, 37.4973017914243, 127.027658616635, 37.4971981655938,
                                127.027284946541, 37.4970848118779, 127.027229235949, 37.4972014133212,
                                127.027423422394, 37.4972603863504, 127.027586507574, 37.4973099054347,
                                127.027609234767, 37.4973017914243
                            ]
                        ]
                    ]
            };

            // Single
            const geoCoord1 = JSON.parse(JSON.stringify(getJBGeoStrByAddr1));
            // Multi
            const geoCoord2 = JSON.parse(JSON.stringify(getJBGeoStrByAddr2));
            // GePo
            const generatePoly = (geo, map, styles = {
                fillColor: '#ff0000',
                fillOpacity: .3,
                strokeColor: '#ff0000',
                strokeWeight: 2,
                strokeOpacity: .6
            }) => {
                const tPaths = v => v[0].map((g, i, d) => (i % 2 === 0) ? new naver.maps.LatLng(d[i + 1], d[i]) : undefined).filter(f => f);

                switch (geo.type) {
                    case 'Single':
                        const SinglePoly = tPaths(geo.wgs84);

                        return new naver.maps.Polygon({ map, paths: [SinglePoly], ...styles });
                    case 'Multi':
                        const MultiPoly = geo.wgs84.map(g => tPaths(g));

                        return MultiPoly.map(path => new naver.maps.Polygon({ map, paths: [path], ...styles }));
                    default:
                        throw new Error('Failed to generate "Polygon"');
                }
            };

            this.poly.push(generatePoly(geoCoord1, map));
            this.poly.push(generatePoly(geoCoord2, map));
        },
        clearPoly(poly) {
            return poly.forEach(p => (!Array.isArray(p) ? p.setMap(null) : this.clearPoly(p)));
        },
        loadMarker(_marker) {
            const { marker } = _marker;

            // this.marker.list.push(marker);

            // const updateMarkers = (map, markers) => {
            //     var mapBounds = map.getBounds();
            //     var marker, position;

            //     for (var i = 0; i < markers.length; i++) {
            //         marker = markers[i];
            //         position = marker.getPosition();

            //         if (mapBounds.hasLatLng(position)) {
            //             showMarker(map, marker);
            //         } else {
            //             hideMarker(map, marker);
            //         }
            //     }
            // };

            // function showMarker(map, marker) {
            //     if (marker.getMap()) return;
            //     marker.setMap(map);
            // }

            // function hideMarker(map, marker) {
            //     if (!marker.getMap()) return;
            //     marker.setMap(null);
            // }
        },
        setMarker(markers) {
            this.updateMarker(parseInt(this.svgCount) * Math.random());

            // const mapLayer = document.createElement('DIV');
            // mapLayer.setAttribute('class', 'mapLayer');
            // Object.assign(mapLayer.style, { display: 'none', position: 'absolute', 'z-index': 10000, background: '#fff'});

            // map.getPanes().floatPane.appendChild(mapLayer);

            // naver.maps.Event.addListener(map, 'click', (e) => {
            //     var marker = new naver.maps.Marker({
            //         position: e.coord,
            //         map: map
            //     });

            //     this.marker.list.push(marker);
            // });
            // naver.maps.Event.addListener(map, 'keydown', (e) => {
            //     var keyboardEvent = e.keyboardEvent,
            //         keyCode = keyboardEvent.keyCode || keyboardEvent.which;

            //     var ESC = 27;

            //     if (keyCode === ESC) {
            //         keyboardEvent.preventDefault();

            //         for (var i = 0, ii = this.marker.list.length; i < ii; i++) {
            //             this.marker.list[i].setMap(null);
            //         }

            //         this.marker.list = [];

            //         Object.assign(mapLayer.style, { display: 'none' });
            //     }
            // });
            // naver.maps.Event.addListener(map, 'mousedown', (e) => {
            //     mapLayer.style.display = 'none';
            // });
            // naver.maps.Event.addListener(map, 'rightclick', (e) => {
            //     var coordHtml =
            //         'Coord: ' + '(우 클릭 지점 위/경도 좌표)' + '<br />' +
            //         'Point: ' + e.point + '<br />' +
            //         'Offset: ' + e.offset;

            //     Object.assign(mapLayer.style, { display: 'block', left: e.offset.x + 'px', top: e.offset.y + 'px' });
            //     mapLayer.innerHTML = coordHtml + e.coord.toString();
            // });

            //     var marker = new naver.maps.Marker({
            //         map: map,
            //         position: position,
            //         title: key,
            //         icon: {
            //             url: '/images/g.svg',
            //             size: new naver.maps.Size(24, 37),
            //             anchor: new naver.maps.Point(12, 37),
            //             origin: new naver.maps.Point(MARKER_SPRITE_POSITION[key][0], MARKER_SPRITE_POSITION[key][1])
            //         },
            //         zIndex: 100
            //     });
        },
        updateMarker(count = 0) {
            if (this.marker.coord.length !== 0) this.marker.coord = [];

            var bounds = this.naverMap.getBounds(),
                sw = bounds.getSW(),
                ne = bounds.getNE(),
                lngSpan = ne.lng() - sw.lng(),
                latSpan = ne.lat() - sw.lat();

            for (let i = 0; i < count; i++) {
                let position = new naver.maps.LatLng(sw.lat() + latSpan * Math.random(), sw.lng() + lngSpan * Math.random());

                this.marker.coord.push(position);
            }
        }
    }
};
</script>

<style scope>
.layerLabel { display: none; position: absolute; z-index: 1000; min-width: 200px; padding: 5px 10px; border: solid 2px #000; background-color: #fff; font-size: 14px; pointer-events: none; white-space: nowrap; }
.marker { display: inline-block; width: 50px; height: 50px; background: url('/images/g.svg') no-repeat center / 100%; }
</style>
