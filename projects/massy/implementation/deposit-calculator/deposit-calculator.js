window.addEventListener('load', () => {
    if (document.querySelector('#DepositCalc')) {
        /* --- Chart pattern upload --- */

        const pattern = new Image()
        pattern.src = 'https://uploads-ssl.webflow.com/619515938931d07a78a397a5/61a63fe09ff41d2d41b1e171_interest-pattern.svg'

        /* --- start data --- */

        const massy = {
            rate: [
                {
                    years: 1,
                    value: 3.15
                },
                {
                    years: 2,
                    value: 3.30
                },
                {
                    years: 3,
                    value: 3.45
                },
                {
                    years: 4,
                    value: 3.60
                },
                {
                    years: 5,
                    value: 3.95
                }
            ],
            interest: 0
        }

        const competitors = [
            {
                name: 'Bank Acct',
                rate: [
                    {
                        years: 1,
                        value: 0.24
                    },
                    {
                        years: 2,
                        value: 0.24
                    },
                    {
                        years: 3,
                        value: 0.24
                    },
                    {
                        years: 4,
                        value: 0.24
                    },
                    {
                        years: 5,
                        value: 0.24
                    }
                ],
                interest: 0,
                result: 0
            },
            {
                name: 'Money Market',
                rate: [
                    {
                        years: 1,
                        value: 1.6
                    },
                    {
                        years: 2,
                        value: 1.6
                    },
                    {
                        years: 3,
                        value: 1.6
                    },
                    {
                        years: 4,
                        value: 1.6
                    },
                    {
                        years: 5,
                        value: 1.6
                    }
                ],
                interest: 0,
                result: 0
            },
            {
                name: 'Bank Deposit',
                rate: [
                    {
                        years: 1,
                        value: 0.35
                    },
                    {
                        years: 2,
                        value: 0.65
                    },
                    {
                        years: 3,
                        value: 0.85
                    },
                    {
                        years: 4,
                        value: 0.85
                    },
                    {
                        years: 5,
                        value: 0.85
                    }
                ],
                interest: 0,
                result: 0
            }
        ]

        const startDeposit = 5000
        const startdepPeriod = 0 // means n + 1

        /* --- execution start --- */

        pattern.onload = () => {
            const Deposit = new Vue({
                vuetify : new Vuetify(),
                template: `
                <v-app>
                    <div class="dep_calc">
                        <div class="dep_interaction_col">
                            <div class="dep_initial">
                                <label
                                    for="initialDeposit"
                                    class="dep_label"
                                >{{ inputLabel }}</label>
                                <v-form v-model="valid" @submit.prevent>
                                    <v-text-field
                                        v-model="initialDeposit"
                                        value="5,000"
                                        dense
                                        outlined
                                        :rules="depositRules"
                                        prefix="TT$"
                                        type="text"
                                        required
                                        id="initialDeposit"
                                        :class="[{ 'fill-initiated' : fillInit }]"
                                        @input="cleanString"
                                    ></v-text-field>
                                </v-form>
                            </div>
                            <div class="dep_slider">
                                <label class="dep_label">{{ sliderLabel }}</label>
                                <div class="dep_slider_value">
                                    {{(depPeriod + 1) * 12}} <span>mo</span>
                                </div>
                                <div ref="sliderElement">
                                    <v-slider
                                        v-model="depPeriod"
                                        :tick-labels="depSliderLabels"
                                        :max="depMaxYears - 1"
                                        step="1"
                                        ticks="always"
                                        tick-size="0"
                                        :disabled="!valid"
                                    ></v-slider>
                                </div>
                            </div>
                            <div class="dep_description">{{ description }}</div>
                        </div>
                        <div class="dep_chart_col">
                            <div ref="chartContainer" class="dep_result">
                                <div class="dep_balance_label">{{ balanceLabel }}:</div>
                                <div class="dep_result_value">
                                    <span>TT$</span> {{bitNumber(depositResult)}}
                                </div>
                                <div class="dep_chart">
                                    <canvas id="dep_chart_canvas" height="200"></canvas>
                                    <div class="dep_chart_legend">
                                        <div class="dep_chart_legend_item">
                                            <div class="dep_chart_legend_square massy"></div>
                                            <div class="dep_chart_legend_square competitor"></div>
                                            <div class="dep_chart_legend_label">{{ legend.label[0] }}</div>
                                        </div>
                                        <div class="dep_chart_legend_item">
                                            <div class="dep_chart_legend_square pattern"></div>
                                            <div class="dep_chart_legend_label">{{ legend.label[1] }}</div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </v-app>
                `,

                data () {
                    return {
                        inputLabel: 'Initial Deposit',
                        sliderLabel: 'Term length',
                        description: 'This calculator is for illustrative purposes and shows results for TT-dollar deposits only. Fixed deposit earnings may be lower if principal is withdrawn prior to maturity. Massy Finance rate and competitor rates as of November 15, 2021.',
                        balanceLabel: 'Future Balance',

                        depositRules: [
                            v => !!v || 'Please, fill in the field',
                            v => (v.toString().split('.').join('').split(',').join('').split(' ').join('') >= 5000) || 'Deposit can\'t be less than TT$5,000',
                            v => (v.toString().split('.').join('').split(',').join('').split(' ').join('') <= 10000000) || 'Deposit can\'t be more than TT$10,000,000'
                        ],

                        initialDeposit: startDeposit,
                        depMaxYears: 5,
                        depPeriod: startdepPeriod,

                        depositResult: 0,
                        valid: true,
                        fillInit: false,

                        DepCalcData: {
                            massy: massy,
                            competitors: competitors
                        },

                        legend: {
                            label: ['Principal', 'Interest']
                        }
                    }
                },

                computed: {
                    depSliderLabels () {
                        const arr = new Array()
                        for (let i = 1; i <= this.depMaxYears; i++) {
                            arr.push(i + 'y')
                        }
                        return arr
                    }
                },

                mounted () {
                    this.getResult(
                        'massy',
                        this.initialDeposit.toString().split('.').join('').split(',').join('').split(' ').join(''), 
                        this.DepCalcData.massy.rate,
                        this.depPeriod
                    )

                    this.DepCalcData.competitors.forEach(comp => {
                        this.getResult(
                            comp.name,
                            this.initialDeposit.toString().split('.').join('').split(',').join('').split(' ').join(''), 
                            comp.rate,
                            this.depPeriod
                        )
                    })
                },

                watch: {
                    depPeriod (val) {
                        this.getResult(
                            'massy',
                            this.initialDeposit.toString().split('.').join('').split(',').join('').split(' ').join(''), 
                            this.DepCalcData.massy.rate,
                            val
                        )
            
                        this.DepCalcData.competitors.forEach(comp => {
                            this.getResult(
                                comp.name,
                                this.initialDeposit.toString().split('.').join('').split(',').join('').split(' ').join(''), 
                                comp.rate,
                                val
                            )
                        })

                        updateChart(
                            [
                                [this.initialDeposit.toString().split('.').join('').split(',').join('').split(' ').join(''), 0, 0, 0],
                                [
                                    0,
                                    this.initialDeposit.toString().split('.').join('').split(',').join('').split(' ').join(''),
                                    this.initialDeposit.toString().split('.').join('').split(',').join('').split(' ').join(''),
                                    this.initialDeposit.toString().split('.').join('').split(',').join('').split(' ').join('')
                                ],
                                [
                                    this.DepCalcData.massy.interest,
                                    this.DepCalcData.competitors[0].interest,
                                    this.DepCalcData.competitors[1].interest,
                                    this.DepCalcData.competitors[2].interest
                                ]
                            ]
                        )
                    },

                    initialDeposit (val) {
                        if (
                            Number(val.toString().split('.').join('').split(',').join('').split(' ').join('')) > 10000000 ||
                            Number(val.toString().split('.').join('').split(',').join('').split(' ').join('')) < 5000
                        ) {
                            this.$refs.chartContainer.style.opacity = '0'
                            this.$refs.sliderElement.style.filter = 'grayscale(1)'
                            this.$refs.sliderElement.style.opacity = '0.2'
                        } else {
                            this.$refs.chartContainer.style.opacity = '1'
                            this.$refs.sliderElement.style.filter = 'grayscale(0)'
                            this.$refs.sliderElement.style.opacity = '1'
                        }

                        this.getResult(
                            'massy',
                            val.toString().split('.').join('').split(',').join('').split(' ').join(''), 
                            this.DepCalcData.massy.rate,
                            this.depPeriod
                        )
            
                        this.DepCalcData.competitors.forEach(comp => {
                            this.getResult(
                                comp.name,
                                val.toString().split('.').join('').split(',').join('').split(' ').join(''), 
                                comp.rate,
                                this.depPeriod
                            )
                        })

                        updateChart(
                            [
                                [this.initialDeposit.toString().split('.').join('').split(',').join('').split(' ').join(''), 0, 0, 0],
                                [
                                    0,
                                    this.initialDeposit.toString().split('.').join('').split(',').join('').split(' ').join(''),
                                    this.initialDeposit.toString().split('.').join('').split(',').join('').split(' ').join(''),
                                    this.initialDeposit.toString().split('.').join('').split(',').join('').split(' ').join('')
                                ],
                                [
                                    this.DepCalcData.massy.interest,
                                    this.DepCalcData.competitors[0].interest,
                                    this.DepCalcData.competitors[1].interest,
                                    this.DepCalcData.competitors[2].interest
                                ]
                            ]
                        )
                    }
                },

                methods: {
                    getResult (comp, principal, rate, t, n = 1) {
                        const currentRate = rate.filter(r => r.years === (t + 1))[0].value

                        const A = Math.round(principal * Math.pow((1 + (currentRate / 100) / n), n * (t + 1)))
                        const i = A - principal

                        if (comp === 'massy') {
                            this.depositResult = A
                            this.DepCalcData.massy.interest = i
                        } else {
                            this.DepCalcData.competitors.filter(c => c.name === comp)[0].result = A
                            this.DepCalcData.competitors.filter(c => c.name === comp)[0].interest = i
                        }
                    },

                    bitNumber (num) {
                        let initial = Number(num)
                        let cuts = 0
                        
                        if (initial >= 1000) {
                        while (initial > 100) {
                            initial = initial / 1000
                            cuts++
                        }
                    
                        const numArr = num.toString().split('')
                        const arrList = []
                        const resultArr = []
                    
                        for (let i = 0; i <= cuts; i++) {
                            arrList.push(numArr.slice(-3))
                    
                            for (let j = 0; j < 3; j++) {
                            numArr.pop()
                            }
                        }
                    
                        for (let i = 0; i < arrList.length; i++) {
                            resultArr.push(arrList[arrList.length - 1 - i])
                            resultArr.push(',')
                        }
                    
                        function trimDots () {
                            if (
                                resultArr[0] === ',' || resultArr[0].length === 0
                            ) {
                            resultArr.shift()
                            resultArr.shift()
                            }
                    
                            resultArr.pop()
                        }
                        trimDots()
                    
                        const result = resultArr.flat().join('')
                    
                        return result
                        }
                        
                        return num
                    },

                    cleanString () {
                        if (
                            this.initialDeposit &&
                            Number(this.initialDeposit.replace(/[^0-9]/g, '')) >= 5000 &&
                            Number(this.initialDeposit.replace(/[^0-9]/g, '')) <= 10000000
                        ) {
                            this.fillInit = true
                        } else {
                            this.fillInit = false
                        }

                        const cleaned = Number(this.initialDeposit.replace(/[^0-9]/g, ''))
                        const bitten = this.bitNumber(cleaned)

                        this.initialDeposit = bitten
                    }
                }
            }).$mount('#DepositCalc')

            /* --- Vuetify stylization --- */

            const sliderBg = document.querySelector('.dep_calculator .dep_slider .v-slider__track-background')
            sliderBg.setAttribute('style', `
                background-color: rgba(29, 29, 29, 0.1) !important;
                width: 100%;
                right: 0;
                border-radius: 100px;
            `)

            const sliderBgFilled = document.querySelector('.dep_calculator .dep_slider .v-slider__track-fill')
            sliderBgFilled.setAttribute('style', `
                background-color: #00AEEF !important;
                width: 0%;
                left: 0;
                border-radius: 100px;
            `)

            const sliderThumb = document.querySelector('.dep_calculator .dep_slider .v-slider__thumb')
            sliderThumb.setAttribute('style', `
                background-color: #fff !important;
                border: solid 4px #1d1d1d !important;
            `)

            /* --- Chart.js --- */

            const ctx = document.getElementById('dep_chart_canvas').getContext('2d')

            let fillPattern = ctx.createPattern(pattern, 'repeat')

            const DepositsChart = new Chart(ctx, {
                type: 'bar',
                data: {
                    labels: ['Massy', 'Bank Acct', 'Money Market', 'Bank Deposit'],
                    datasets: [
                        {
                            label: 'Principal',
                            data: [0, 0, 0, 0],
                            backgroundColor: '#00AEEF'
                        },
                        {
                            label: 'Principal',
                            data: [0, 0, 0, 0],
                            backgroundColor: '#1d1d1d'
                        },
                        {
                            label: 'Interest',
                            data: [0, 0, 0, 0],
                            backgroundColor: fillPattern
                        }
                    ]
                },
                options: {
                    responsive: true,
                    color: '#1d1d1d',
                    plugins: {
                        legend: {
                            display: true,
                            labels: {
                                color: 'transparent'
                            }
                        }
                    },
                    scales: {
                        x: {
                            stacked: true,
                            grid: {
                                display: false,
                                borderColor: 'rgba(29, 29, 29, 0.1)'
                            },
                            ticks: {
                                color: '#1d1d1d'
                            }
                        },
                        y: {
                            stacked: true,
                            grid: {
                                display: false,
                                borderColor: 'rgba(29, 29, 29, 0.1)'
                            },
                            ticks: {
                                callback: function(value) {
                                    return '$' + calcBitNumber(value)
                                },
                                color: '#1d1d1d'
                            }
                        }
                    },
                    "animation": {
                        "duration": 600,
                        "onProgress": function () {
                            const chartInstance = this.$context.chart,
                            ctx = chartInstance.ctx
                            ctx.textAlign = 'center'
                            ctx.textBaseline = 'bottom'
            
                            this.data.datasets.forEach(function(dataset, i) {
                                const meta = DepositsChart.getDatasetMeta(i);
                                meta.data.forEach(function(bar, index) {
                                    if (i === 2) {
                                        const data = '$' + calcBitNumber(dataset.data[index])
                                        ctx.font = "300 18px Roobert"
                                        ctx.fillText(data, bar.x, bar.y - 4)
                                    }
                                })
                            })
                        }
                    }
                },
                plugins: [{
                    beforeDraw: function(c) {
                        const legends = c.legend.legendItems;
                        legends.forEach(function(e) {
                           e.fillStyle = 'transparent'
                        })
                    }
                }]
            })

            function updateChart (result) {
                DepositsChart.data.datasets[0].data = result[0]
                DepositsChart.data.datasets[1].data = result[1]
                DepositsChart.data.datasets[2].data = result[2]
                DepositsChart.update()
            }

            function setStartValues (n = 1) {
                // pre calculation

                const massyA = Math.round(startDeposit * Math.pow((1 + (massy.rate[0].value / 100) / n), n * (startdepPeriod + 1)))
                const massyI = massyA - startDeposit
                const compA = [0]
                const totalInterest = [massyI]
                competitors.forEach(comp => {
                    const res = Math.round(startDeposit * Math.pow((1 + (comp.rate[0].value / 100) / n), n * (startdepPeriod + 1)))
                    compA.push(startDeposit)
                    totalInterest.push(res - startDeposit)
                })

                // setup

                DepositsChart.data.datasets[0].data = [startDeposit, 0, 0, 0]
                DepositsChart.data.datasets[1].data = compA
                DepositsChart.data.datasets[2].data = totalInterest
                DepositsChart.update()
            }
            setStartValues()

            function calcBitNumber (num) {
                let initial = Number(num)
                let cuts = 0
                
                if (initial >= 1000) {
                while (initial > 100) {
                    initial = initial / 1000
                    cuts++
                }
            
                const numArr = num.toString().split('')
                const arrList = []
                const resultArr = []
            
                for (let i = 0; i <= cuts; i++) {
                    arrList.push(numArr.slice(-3))
            
                    for (let j = 0; j < 3; j++) {
                    numArr.pop()
                    }
                }
            
                for (let i = 0; i < arrList.length; i++) {
                    resultArr.push(arrList[arrList.length - 1 - i])
                    resultArr.push(',')
                }
            
                function trimDots () {
                    if (
                        resultArr[0] === ',' || resultArr[0].length === 0
                    ) {
                    resultArr.shift()
                    resultArr.shift()
                    }
            
                    resultArr.pop()
                }
                trimDots()
            
                const result = resultArr.flat().join('')
            
                return result
                }
                
                return num
            }
        }
    }
})
