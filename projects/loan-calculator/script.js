window.addEventListener('DOMContentLoaded', () => {
  const root = document.querySelector('#loan-calculator')

  if (root) {
    new Vue({
      vuetify : new Vuetify(),
      template: `
        <v-app>
          <div class="px-4 px-sm-6 py-4 py-sm-8 loan-calculator-app">
            <div class="mb-6 mb-sm-8 loan-calculator__interface">
              <h3 class="py-2 py-sm-4 mb-3 mb-sm-6 loan-calculator__title">
                Calculate your monthly payment here <sup>2</sup>
              </h3>
              <v-form v-model="valid" @submit.prevent>
                <div class="loan-calculator__fieldgroup">
                  <label for="deposit" class="mb-3 mb-sm-4 loan-calculator__label">
                    <span>How much would you like to borrow?</span>
                  </label>
                  <v-text-field
                    v-model="loan.deposit"
                    id="deposit"
                    :rules="depositRules"
                    color="#F58220"
                    prefix="$"
                    placeholder="5,000 – $ 50,000"
                    required
                    :class="[
                      'mt-0',
                      'py-0',
                      'loan-calculator__field',
                      { 'loan-calculator__field--empty': loan.deposit.length === 0 }
                    ]"
                    @input="cleanString"
                  />
                </div>
                <div class="loan-calculator__fieldgroup">
                  <label class="mb-3 mb-sm-4 loan-calculator__label">
                    <span>How long would you like to pay back?</span>
                    <strong>{{ periods }}mo</strong>
                  </label>
                  <v-slider
                    v-model="loan.period"
                    :tick-labels="loan.labels"
                    :max="loan.maxYears - 1"
                    step="1"
                    color="#F58220"
                    ticks="always"
                    tick-size="0"
                    class="loan-calculator__slider"
                  ></v-slider>
                </div>
              </v-form>
            </div>
            <div class="pa-4 pa-sm-8 d-flex align-center justify-space-between loan-calculator__footer">
              <div class="loan-calculator__footer_result">
                <label class="mb-2 loan-calculator__label">
                  Monthly payment
                </label>
                <h4 class="loan-calculator__footer_value">
                  {{ '$' + result }}
                </h4>
              </div>
              <a href="http://instaloan.carilend.com" class="loan-calculator__footer_link">
                Next step
              </a>
            </div>
          </div>
        </v-app>
      `,

      data () {
        return {
          massy: {
            annualRate: 0.15
          },

          loan: {
            deposit: '',
            period: 0,
            maxYears: 5,
            labels: ['1y', '2y', '3y', '4y', '5y']
          },

          valid: true,
          depositRules: [
            v => !!v || 'Please, fill in the field',
            v => (v.toString().split('.').join('').split(',').join('').split(' ').join('') >= 5000) || 'Deposit can\'t be less than $5,000',
            v => (v.toString().split('.').join('').split(',').join('').split(' ').join('') <= 50000) || 'Deposit can\'t be more than $50,000'
          ],

          periods: 12,
          result: 0
        }
      },

      watch: {
        'loan.deposit' (value) {
          this.getResult (
            value.toString().split('.').join('').split(',').join('').split(' ').join(''),
            this.massy.annualRate,
            this.loan.period
          )
        },

        'loan.period' (value) {
          this.periods = +((value + 1) * 12).toFixed(4)

          this.getResult (
            this.loan.deposit.toString().split('.').join('').split(',').join('').split(' ').join(''),
            this.massy.annualRate,
            value
          )
        }
      },

      mounted () {
        this.getResult (
          this.loan.deposit.toString().split('.').join('').split(',').join('').split(' ').join(''),
          this.massy.annualRate,
          this.loan.period
        )
      },

      methods: {
        getResult (amount, rate, t) {
          const a = +amount || 5000
          const r = +(rate / 12).toFixed(4) // Monthly Rate
          const n = +((t + 1) * 12).toFixed(4) // Loan Periods Amount

          this.result = (a * ((r * Math.pow((1 + r), n)) / (Math.pow((1 + r), n) - 1))).toFixed(2)
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
              this.loan.deposit &&
              Number(this.loan.deposit.replace(/[^0-9]/g, '')) >= 5000 &&
              Number(this.loan.deposit.replace(/[^0-9]/g, '')) <= 50000
          ) {
              this.fillInit = true
          } else {
              this.fillInit = false
          }

          const cleaned = Number(this.loan.deposit.replace(/[^0-9]/g, ''))
          const bitten = this.bitNumber(cleaned)

          this.loan.deposit = bitten
        }
      }
    }).$mount('#loan-calculator')
  }
})
