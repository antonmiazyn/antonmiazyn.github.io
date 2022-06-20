Vue.use(VueGoogleMaps, {
  load: {
    key: GOOGLE_MAP_KEY
  },

  installComponents: true
})

window.addEventListener('DOMContentLoaded', () => {
  const root = document.querySelector('#luya-google-maps')

  if (root) {
    Vue.component('gmap-cluster', VueGoogleMaps.Cluster)
    Vue.component('gmap-info-window', VueGoogleMaps.InfoWindow)

    new Vue({
      vuetify: new Vuetify(),
      template: `
        <div class="d-flex luya-google-maps">
          <div class="luya-google-maps__controls">
            <h1 class="title-small luya-google-maps__title">
              {{ LUYA_FINDER_DEFAULT.title }}
            </h1>
            <div class="luya-google-maps__search">
              <input
                v-model="searchField"
                :placeholder="LUYA_FINDER_DEFAULT.search"
              />
              <img src="https://uploads-ssl.webflow.com/62908d9b32102913b3b28b76/62a7015f9e327c28c5009229_Search.svg" alt />
            </div>
            <div class="luya-google-maps__filter">
              <v-radio-group v-model="visible">
                <v-radio
                  v-for="key in Object.keys(markers)"
                  :key="key"
                  color="#991C2B"
                  :label="key === 'einzelhandel' ? LUYA_FINDER_DEFAULT.filter.retail : LUYA_FINDER_DEFAULT.filter.gastronomy"
                  :value="key"
                />
                <v-radio color="#991C2B" :label="LUYA_FINDER_DEFAULT.filter.all" value="all" />
              </v-radio-group>
            </div>

            <div v-if="isMobile" class="luya-google-maps__dynamic">
              <div v-if="!reloaded" class="luya-google-maps__map_loader">
                <div class="loader"><div class="loader__inner"></div></div>
              </div>

              <gmap-map v-if="reloaded" :center="center" :zoom="zoom" class="luya-google-maps__map_wrapper">
                <gmap-info-window :options="infoOptions" :position="infoWindowPos" :opened="infoWinOpen" @closeclick="infoWinOpen=false">
                  <div class="gmap-info-window__name">{{ infoContent.name }}</div>
                  <div class="gmap-info-window__address">{{ infoContent.address }}</div>
                  <div class="gmap-info-window__city">{{ infoContent.city }}</div>
                </gmap-info-window>
              
                <gmap-cluster>
                  <gmap-marker
                    v-if="!marker.hidden && (visible === 'all' || visible === 'einzelhandel')"
                    v-for="marker in markers.einzelhandel"
                    :key="marker['Name']"
                    :position="marker.position"
                    :clickable="true"
                    :draggable="false"
                    @click="() => {
                      toggleInfoWindow(marker, marker['Betr-bez'] || marker['Name'])
                      selectMarker(marker)
                    }"
                  />
                  <gmap-marker
                    v-if="!marker.hidden && (visible === 'all' || visible === 'gastronomie')"
                    v-for="marker in markers.gastronomie"
                    :key="marker['Name']"
                    :position="marker.position"
                    :clickable="true"
                    :draggable="false"
                    @click="() => {
                      toggleInfoWindow(marker, marker['Betr-bez'] || marker['Name'])
                      selectMarker(marker)
                    }"
                  />
                </gmap-cluster>
              </gmap-map>
            </div>

            <div class="luya-google-maps__list_wrapper">
              <div class="luya-google-maps__list_inner">
                <ul class="luya-google-maps__list">
                  <li
                    v-if="(visible === 'all' || visible === 'einzelhandel') && !marker.hidden"
                    v-for="marker in markers.einzelhandel"
                    :key="marker['Betr-bez'] || marker['Name']"
                    :id="marker['Betr-bez'] || marker['Name']"
                    :class="[{ 'selected': marker.selected }]"
                    @click="selectOnMap(marker, marker['Betr-bez'] || marker['Name'])"
                  >
                    <div class="luya-google-maps__list_pin-column">
                      <img src="https://uploads-ssl.webflow.com/62908d9b32102913b3b28b76/62a70a00c2418c68ad1fdb25_pin-location-icon-iconic-design-vector-18322366%201.png" alt />
                    </div>
                    <div class="luya-google-maps__list_rows-column">
                      <div class="luya-google-maps__list_name">{{ marker['Name'] }}</div>
                      <div class="luya-google-maps__list_address">{{ marker['Strasse und Hausnummer'] }}</div>
                      <div class="luya-google-maps__list_city">{{ marker['Ort'] }}, {{ marker['Pstlz'] }}</div>
                    </div>
                  </li>
                  <li
                    v-if="(visible === 'all' || visible === 'gastronomie') && !marker.hidden"
                    v-for="marker in markers.gastronomie"
                    :key="marker['Betr-bez'] || marker['Name']"
                    :id="marker['Betr-bez'] || marker['Name']"
                    :class="[{ 'selected': marker.selected }]"
                    @click="selectOnMap(marker, marker['Betr-bez'] || marker['Name'])"
                  >
                    <div class="luya-google-maps__list_pin-column">
                      <img src="https://uploads-ssl.webflow.com/62908d9b32102913b3b28b76/62a70a00c2418c68ad1fdb25_pin-location-icon-iconic-design-vector-18322366%201.png" alt />
                    </div>
                    <div class="luya-google-maps__list_rows-column">
                      <div class="luya-google-maps__list_name">{{ marker['Name'] }}</div>
                      <div class="luya-google-maps__list_address">{{ marker['Strasse und Hausnummer'] }}</div>
                      <div class="luya-google-maps__list_city">{{ marker['Ort'] }}, {{ marker['Pstlz'] }}</div>
                    </div>
                  </li>
                </ul>
              </div>
            </div>
          </div>

          <div v-if="!isMobile" class="luya-google-maps__dynamic">
            <div v-if="!reloaded" class="luya-google-maps__map_loader">
              <div class="loader"><div class="loader__inner"></div></div>
            </div>

            <gmap-map v-if="reloaded" :center="center" :zoom="zoom" class="luya-google-maps__map_wrapper">
              <gmap-info-window :options="infoOptions" :position="infoWindowPos" :opened="infoWinOpen" @closeclick="infoWinOpen=false">
                <div class="gmap-info-window__name">{{ infoContent.name }}</div>
                <div class="gmap-info-window__address">{{ infoContent.address }}</div>
                <div class="gmap-info-window__city">{{ infoContent.city }}</div>
              </gmap-info-window>
            
              <gmap-cluster>
                <gmap-marker
                  v-if="!marker.hidden && (visible === 'all' || visible === 'einzelhandel')"
                  v-for="marker in markers.einzelhandel"
                  :key="marker['Name']"
                  :position="marker.position"
                  :clickable="true"
                  :draggable="false"
                  @click="() => {
                    toggleInfoWindow(marker, marker['Betr-bez'] || marker['Name'])
                    selectMarker(marker)
                  }"
                />
                <gmap-marker
                  v-if="!marker.hidden && (visible === 'all' || visible === 'gastronomie')"
                  v-for="marker in markers.gastronomie"
                  :key="marker['Name']"
                  :position="marker.position"
                  :clickable="true"
                  :draggable="false"
                  @click="() => {
                    toggleInfoWindow(marker, marker['Betr-bez'] || marker['Name'])
                    selectMarker(marker)
                  }"
                />
              </gmap-cluster>
            </gmap-map>
          </div>
        </div>
      `,

      data () {
        return {
          LUYA_FINDER_DEFAULT: {
            title: 'Luya finden',
            search: 'PLZ oder Adresse',
            filter: {
              retail: 'Einzelhandel',
              gastronomy: 'Gastronomie',
              all: 'Alle Orte'
            }
          },

          isMobile: false,

          center: {},
          zoom: 7,
          markers: {
            einzelhandel: [],
            gastronomie: []
          },

          visible: 'all',
          searchField: '',

          infoContent: {
            name: '',
            address: '',
            city: ''
          },
          infoWindowPos: null,
          infoWinOpen: false,
          currentMidx: null,
          infoOptions: {
            pixelOffset: {
              width: 0,
              height: -35
            }
          },

          reloaded: false
        }
      },

      watch: {
        searchField () {
          this.searchTyping()
        },

        visible (value) {
          this.changeFilter(value)
        }
      },

      created () {
        this.setPageContent()

        try {
          fetch('https://antonmiazyn.github.io/projects/luya-google-maps/chords.json').then(response => response.json()).then(data => {
            this.markers.einzelhandel = data.filter(item => item['Enterprise'].toLowerCase() === 'einzelhandel')
            this.markers.gastronomie = data.filter(item => item['Enterprise'].toLowerCase() === 'gastronomie')

            const defaultCenter = {
              xArr: [],
              yArr: []
            }

            Object.keys(this.markers).forEach(key => {
              this.markers[key].map(item => {
                item['position'] = {
                  lat: this.fixChord(item['X-Koordinaten']),
                  lng: this.fixChord(item['Y-Koordinaten'])
                }

                defaultCenter.xArr.push(this.fixChord(item['X-Koordinaten']))
                defaultCenter.yArr.push(this.fixChord(item['Y-Koordinaten']))

                item['hidden'] = false
                item['selected'] = false
              })
            })

            return defaultCenter
          }).then((centerChords) => {
            this.detectCenter(centerChords.xArr, centerChords.yArr)

            setTimeout(() => {
              this.reloaded = true
            }, 400)
          })
        } catch (error) {
          console.log('Can\'t get markers list: ' + error)
        }
      },

      mounted () {
        const scrollList = document.querySelector('.luya-google-maps__list_inner')

        if (scrollList) {
          new SimpleBar(scrollList)
        }

        this.checkIsMobile()
        window.addEventListener('resize', () => this.checkIsMobile())
      },

      methods: {
        setPageContent () {
          if (typeof LUYA_FINDER_CONTENT !== 'undefined') {
            this.LUYA_FINDER_DEFAULT.title = LUYA_FINDER_CONTENT.title || this.LUYA_FINDER_DEFAULT.title
            this.LUYA_FINDER_DEFAULT.search = LUYA_FINDER_CONTENT.search || this.LUYA_FINDER_DEFAULT.search
            this.LUYA_FINDER_DEFAULT.filter.retail = LUYA_FINDER_CONTENT.filter.retail || this.LUYA_FINDER_DEFAULT.filter.retail
            this.LUYA_FINDER_DEFAULT.filter.gastronomy = LUYA_FINDER_CONTENT.filter.gastronomy || this.LUYA_FINDER_DEFAULT.filter.gastronomy
            this.LUYA_FINDER_DEFAULT.filter.all = LUYA_FINDER_CONTENT.filter.all || this.LUYA_FINDER_DEFAULT.filter.all
          }
        },

        toggleInfoWindow (marker, idx) {
          this.infoWindowPos = marker.position

          this.infoContent.name = marker['Name']
          this.infoContent.address = marker['Strasse und Hausnummer']
          this.infoContent.city = marker['Ort'] + ',' + marker['Pstlz']

          if (this.currentMidx == idx) {
            this.infoWinOpen = !this.infoWinOpen
          } else {
            this.infoWinOpen = true
            this.currentMidx = idx
          }
        },

        selectOnMap (marker, idx) {
          if (!marker.selected) {
            new Promise (resolve => {
              this.center = marker.position
              this.zoom = 16
  
              this.unselectAll()
              marker.selected = true
  
              this.toggleInfoWindow(marker, idx)
  
              this.reloaded = false
  
              resolve()
            }).then(() => {
              setTimeout(() => {
                this.reloaded = true
              }, 400)
            })
          }
        },

        selectMarker (marker) {
          this.unselectAll()
          marker.selected = true

          const scrollWrapper = document.querySelector('.luya-google-maps .simplebar-content-wrapper')
          const listItems = document.querySelectorAll('.luya-google-maps .luya-google-maps__list > li')
          const isComponents = scrollWrapper && (listItems && listItems.length)

          if (isComponents) {
            const listArray = Array.from(listItems)
            const itemSelected = listArray.filter(item => item.id === marker['Betr-bez'] || item.id === marker['Name'])[0]
            const itemOffset = itemSelected.offsetTop

            scrollWrapper.scrollTop = itemOffset
          }
        },

        changeFilter (key) {
          new Promise (resolve => {
            this.reloaded = false

            this.infoWinOpen = false
            this.unselectAll()

            const centerChords = {
              xArr: [],
              yArr: []
            }

            if (key !== 'all') {
              this.markers[key].map(item => {
                centerChords.xArr.push(this.fixChord(item['X-Koordinaten']))
                centerChords.yArr.push(this.fixChord(item['Y-Koordinaten']))
              })
            } else {
              Object.keys(this.markers).forEach(key => {
                this.markers[key].map(item => {
                  centerChords.xArr.push(this.fixChord(item['X-Koordinaten']))
                  centerChords.yArr.push(this.fixChord(item['Y-Koordinaten']))
                })
              })
            }

            this.detectCenter(centerChords.xArr, centerChords.yArr)
            this.zoom = 7
            this.searchTyping()

            resolve()
          }).then(() => {
            setTimeout(() => {
              this.reloaded = true
            }, 400)
          })
        },

        fixChord (chord) {
          if (chord && !chord.includes('.')) {
            return +(chord.slice(0, 2) + '.' + chord.slice(2))
          } else {
            return +chord
          }
        },

        detectCenter (xArr, yArr) {
          if (xArr && yArr && (xArr.length && yArr.length)) {
            let xMiddle = 0, yMiddle = 0
            for (let i = 0; i < xArr.length; i++) {
              xMiddle += +xArr[i]
            }
            for (let i = 0; i < yArr.length; i++) {
              yMiddle += +yArr[i]
            }

            this.center = {
              lat: +(xMiddle / xArr.length),
              lng: +(yMiddle / yArr.length)
            }
          }
        },

        searchTyping () {
          new Promise (resolve => {
            this.reloaded = false
            
            const entered = this.searchField.trim()

            if (entered) {
              if (this.visible === 'einzelhandel') {
                this.markers['einzelhandel'].forEach(marker => {
                  if (
                    marker['Name'].toLowerCase().includes(entered.toLowerCase()) ||
                    marker['Strasse und Hausnummer'].toLowerCase().includes(entered.toLowerCase()) ||
                    marker['Ort'].toLowerCase().includes(entered.toLowerCase()) ||
                    marker['Pstlz'].toLowerCase().includes(entered.toLowerCase())
                  ) {
                    marker.hidden = false
                  } else {
                    marker.hidden = true
                  }
                })
              } else if (this.visible === 'gastronomie') {
                this.markers['gastronomie'].forEach(marker => {
                  if (
                    marker['Name'].toLowerCase().includes(entered.toLowerCase()) ||
                    marker['Strasse und Hausnummer'].toLowerCase().includes(entered.toLowerCase()) ||
                    marker['Ort'].toLowerCase().includes(entered.toLowerCase()) ||
                    marker['Pstlz'].toLowerCase().includes(entered.toLowerCase())
                  ) {
                    marker.hidden = false
                  } else {
                    marker.hidden = true
                  }
                })
              } else {
                Object.keys(this.markers).forEach(key => {
                  this.markers[key].forEach(marker => {
                    if (
                      marker['Name'].toLowerCase().includes(entered.toLowerCase()) ||
                      marker['Strasse und Hausnummer'].toLowerCase().includes(entered.toLowerCase()) ||
                      marker['Ort'].toLowerCase().includes(entered.toLowerCase()) ||
                      marker['Pstlz'].toLowerCase().includes(entered.toLowerCase())
                    ) {
                      marker.hidden = false
                    } else {
                      marker.hidden = true
                    }
                  })
                })
              }
            } else {
              Object.keys(this.markers).forEach(key => {
                this.markers[key].forEach(marker => {
                  marker.hidden = false
                })
              })
            }

            const centerChords = {
              xArr: [],
              yArr: []
            }

            Object.keys(this.markers).forEach(key => {
              this.markers[key].map(item => {
                if (!item.hidden) {
                  centerChords.xArr.push(this.fixChord(item['X-Koordinaten']))
                  centerChords.yArr.push(this.fixChord(item['Y-Koordinaten']))
                }
              })
            })

            const scrollWrapper = document.querySelector('.luya-google-maps .simplebar-content-wrapper')
            scrollWrapper.scrollTop = 0

            this.detectCenter(centerChords.xArr, centerChords.yArr)
            this.zoom = 7

            resolve()
          }).then(() => {
            setTimeout(() => {
              this.reloaded = true
            }, 400)
          })
        },

        unselectAll () {
          Object.keys(this.markers).forEach(key => {
            this.markers[key].map(item => {
              item.selected = false
            })
          })
        },

        checkIsMobile () {
          window.innerWidth < 1030 ? this.isMobile = true : this.isMobile = false
        }
      }
    }).$mount('#luya-google-maps')
  }
})
