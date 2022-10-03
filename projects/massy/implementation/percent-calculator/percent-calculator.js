window.addEventListener('load', () => {
    if (document.querySelector('#APRCalc')) {
        const APR = new Vue({
            vuetify : new Vuetify(),
            template: `
            <v-app>
                <div class="apr_calc">
                    <div class="apr_topline">
                        <div class="apr_topline_head">
                            <h3>{{title}}</h3>
                            <div class="apr_topline_result">
                                {{resultAPR}}<span>%</span>
                            </div>
                        </div>
                        <div class="apr_topline_controls">
                            <div class="apr_switcher">
                                <div ref="aprSwitcherBlob" class="blob"></div>
                                <button
                                    v-for="(c, index) in aprCurrency"
                                    :key="index"
                                    :disabled="aprSwitcher === index"
                                    class="apr_switcher_button"
                                    @click="switchCalc(index)"
                                >{{c}}</button>
                            </div>
                        </div>
                    </div>
                    <div class="apr_slider">
                        <div class="apr_slider_value">
                            {{(aprPeriod + 1) * 12}} <span>mo</span>
                        </div>
                        <v-slider
                            v-model="aprPeriod"
                            :tick-labels="aprSliderLabels"
                            :max="aprMaxYears - 1"
                            step="1"
                            ticks="always"
                            tick-size="0"
                        ></v-slider>
                    </div>
                    <div class="apr_chart">
                        <div class="apr_chart_grid">
                            <div class="apr_chart_elem">
                                <div ref="massy" class="apr_chart_column massy">
                                    <div class="apr_chart_label">
                                        <div class="apr_chart_name">{{AprCalcData.massy.name}}</div>
                                        <div class="apr_chart_value"><span>{{resultAPR}}</span>% APR</div>
                                    </div>
                                </div>
                            </div>
                            <div
                                v-for="comp in AprCalcData.competitors"
                                :key="comp.name"
                                class="apr_chart_elem"
                            >
                                <div :ref="comp.name" class="apr_chart_column">
                                    <div class="apr_chart_label">
                                        <div class="apr_chart_name">{{comp.name}}</div>
                                        <div class="apr_chart_value"><span>{{comp.resultAPR}}</span>% APR</div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div class="apr_description">
                        <p>{{description}}</p>
                        <a :href="button.url" class="button_color advantage_button w-inline-block apr_button_el">
                            <div class="button_color_wrapp">
                                <div class="text-block-4">{{button.text}}</div>
                                <img src="https://uploads-ssl.webflow.com/619515938931d07a78a397a5/6196541566d8196045b68982_arrow.svg" loading="lazy" alt="arrow" class="icon-arrow">
                            </div>
                        </a>
                    </div>
                </div>
            </v-app>
            `,

            data () {
                return {
                    title: 'Click term below to view rate',
                    description: `Fixed deposit earnings may be lower if principal is withdrawn prior to maturity. 
                    Massy Finance rate and competitor rates as of November 15, 2021. Rates subject 
                    to change before fixed deposit is opened and funded.`,
                    button: {
                        url: typeof FORM_URL !== 'undefined' ? FORM_URL : '/fixed-deposit-application',
                        text: 'Go to next step'
                    },
                    aprCurrency: ['TTD', 'USD'],
                    aprMaxYears: 5,
                    
                    AprCalcData: {
                        massy: {
                            name: 'Massy',
                            rangeTTD: [
                                {
                                    years: 1,
                                    value: '3.15'
                                },
                                {
                                    years: 2,
                                    value: '3.30'
                                },
                                {
                                    years: 3,
                                    value: '3.45'
                                },
                                {
                                    years: 4,
                                    value: '3.60'
                                },
                                {
                                    years: 5,
                                    value: '3.95'
                                }
                            ],
                            rangeDLR: [
                                {
                                    years: 1,
                                    value: '2.50'
                                },
                                {
                                    years: 2,
                                    value: '2.60'
                                },
                                {
                                    years: 3,
                                    value: '2.70'
                                },
                                {
                                    years: 4,
                                    value: '2.85'
                                },
                                {
                                    years: 5,
                                    value: '3.05'
                                }
                            ]
                        },
                        competitors: [
                            {
                                name: 'Bank Acct',
                                rangeTTD: [
                                    {
                                        years: 1,
                                        value: '0.24'
                                    },
                                    {
                                        years: 2,
                                        value: '0.24'
                                    },
                                    {
                                        years: 3,
                                        value: '0.24'
                                    },
                                    {
                                        years: 4,
                                        value: '0.24'
                                    },
                                    {
                                        years: 5,
                                        value: '0.24'
                                    }
                                ],
                                rangeDLR: [
                                    {
                                        years: 1,
                                        value: '0.24'
                                    },
                                    {
                                        years: 2,
                                        value: '0.24'
                                    },
                                    {
                                        years: 3,
                                        value: '0.24'
                                    },
                                    {
                                        years: 4,
                                        value: '0.24'
                                    },
                                    {
                                        years: 5,
                                        value: '0.24'
                                    }
                                ],
                                resultAPR: 0
                            },
                            {
                                name: 'Money Market',
                                rangeTTD: [
                                    {
                                        years: 1,
                                        value: '1.6'
                                    },
                                    {
                                        years: 2,
                                        value: '1.6'
                                    },
                                    {
                                        years: 3,
                                        value: '1.6'
                                    },
                                    {
                                        years: 4,
                                        value: '1.6'
                                    },
                                    {
                                        years: 5,
                                        value: '1.6'
                                    }
                                ],
                                rangeDLR: [
                                    {
                                        years: 1,
                                        value: '1.6'
                                    },
                                    {
                                        years: 2,
                                        value: '1.6'
                                    },
                                    {
                                        years: 3,
                                        value: '1.6'
                                    },
                                    {
                                        years: 4,
                                        value: '1.6'
                                    },
                                    {
                                        years: 5,
                                        value: '1.6'
                                    }
                                ],
                                resultAPR: 0
                            },
                            {
                                name: 'Bank Deposit',
                                rangeTTD: [
                                    {
                                        years: 1,
                                        value: '0.35'
                                    },
                                    {
                                        years: 2,
                                        value: '0.65'
                                    },
                                    {
                                        years: 3,
                                        value: '0.85'
                                    },
                                    {
                                        years: 4,
                                        value: '0.85'
                                    },
                                    {
                                        years: 5,
                                        value: '0.85'
                                    }
                                ],
                                rangeDLR: [
                                    {
                                        years: 1,
                                        value: '0.35'
                                    },
                                    {
                                        years: 2,
                                        value: '0.65'
                                    },
                                    {
                                        years: 3,
                                        value: '0.85'
                                    },
                                    {
                                        years: 4,
                                        value: '0.85'
                                    },
                                    {
                                        years: 5,
                                        value: '0.85'
                                    }
                                ],
                                resultAPR: 0
                            }
                        ]
                    },

                    resultAPR: 0,

                    aprSwitcher: 0,
                    aprPeriod: 0
                }
            },

            computed: {
                aprSliderLabels () {
                    const arr = new Array()
                    for (let i = 1; i <= this.aprMaxYears; i++) {
                        arr.push(i + 'y')
                    }
                    return arr
                }
            },

            mounted () {
                this.getResult(this.aprPeriod, this.AprCalcData.competitors)
                this.switchCalc(this.aprSwitcher)
                this.updateCharts(this.resultAPR)
            },

            watch: {
                aprPeriod (val) {
                    this.getResult(val, this.AprCalcData.competitors)
                    this.updateCharts(this.resultAPR)
                },
                aprSwitcher () {
                    this.getResult(this.aprPeriod, this.AprCalcData.competitors)
                    this.updateCharts(this.resultAPR)
                }
            },

            methods: {
                getResult (aprPeriod, comp) {
                    const years = aprPeriod + 1

                    if (this.aprSwitcher === 0) {
                        const massyResult = this.AprCalcData.massy.rangeTTD.filter(item => item.years == years)[0].value
                        this.resultAPR = massyResult

                        comp.forEach(c => {
                            const compResult = c.rangeTTD.filter(item => item.years == years)[0].value

                            c.resultAPR = compResult
                        })
                    } else {
                        const massyResult = this.AprCalcData.massy.rangeDLR.filter(item => item.years == years)[0].value
                        this.resultAPR = massyResult

                        comp.forEach(c => {
                            const compResult = c.rangeDLR.filter(item => item.years == years)[0].value

                            c.resultAPR = compResult
                        })
                    }
                },

                switchCalc (index) {
                    this.aprSwitcher = index

                    const blob = this.$refs.aprSwitcherBlob
                    if (this.aprSwitcher === 0) {
                        blob.style.transform = 'translateX(0)'
                    } else {
                        blob.style.transform = 'translateX(calc(100% - 4px))'
                    }
                },

                updateCharts (value) {
                    const massy = this.$refs.massy
                    massy.style.height = '10px'

                    const compList = new Array()
                    this.AprCalcData.competitors.forEach(comp => {
                        compList.push(this.$refs[comp.name][0])
                    })

                    compList.forEach(el => {
                        el.style.height = '5px'
                    })

                    setTimeout(() => {
                        massy.style.height = 'calc(100% - 40px)'

                        compList.forEach((el, index) => {
                            let computedValue = 0
                            if (value > this.AprCalcData.competitors[index]) {
                                computedValue =  (value / this.AprCalcData.competitors[index].resultAPR).toFixed(2) * 100
                            } else {
                                computedValue = (this.AprCalcData.competitors[index].resultAPR / value).toFixed(2) * 100
                            }

                            if (computedValue >= 33) {
                                el.style.height = `calc(${computedValue}% - 40px)`
                            } else {
                                el.style.height = `calc(5px + ${computedValue / 2}px)`
                            }
                        })
                    }, 400)
                }
            }
        }).$mount('#APRCalc')

        /* --- Vuetify stylization --- */

        const sliderBg = document.querySelector('.apr_calculator .apr_slider .v-slider__track-background')
        sliderBg.setAttribute('style', `
            background-color: rgba(29, 29, 29, 0.1) !important;
            width: 100%;
            right: 0;
            border-radius: 100px;
        `)

        const sliderBgFilled = document.querySelector('.apr_calculator .apr_slider .v-slider__track-fill')
        sliderBgFilled.setAttribute('style', `
            background-color: #00AEEF !important;
            width: 0%;
            left: 0;
            border-radius: 100px;
        `)

        const sliderThumb = document.querySelector('.apr_calculator .apr_slider .v-slider__thumb')
        sliderThumb.setAttribute('style', `
            background-color: #fff !important;
            border: solid 4px #1d1d1d !important;
        `)        
    }
})
