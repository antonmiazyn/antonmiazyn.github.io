window.addEventListener('DOMContentLoaded', () => {
  const root = document.querySelector('#sign-up-form')

  if (root) {
    new Vue({
      vuetify : new Vuetify(),
      template: `
        <v-app>
          <div class="py-6 px-4 pa-md-8 sign-up__form">
            <header v-if="step !== 3" class="mb-6 mb-md-8 sign-up__header">
              <h1 class="ma-0 mb-4 sign-up__title">
                Great, let’s talk!
              </h1>
              <p class="ma-0 sign-up__description">
                First, complete the form below to get registered with us. Shouldn’t take more than a couple of minutes.
              </p>
            </header>
            <div class="sign-up__form_wrapper">
              <menu v-if="step < 3" class="mb-8 d-flex sign-up__form_navigation">
                <li :class="['text-center', 'sign-up__form_navigation__item', { active: step === 1 }]">
                  <h2 class="ma-0">Step 1. Contact info</h2>
                </li>
                <li :class="['text-center', 'sign-up__form_navigation__item', { active: step === 2 }]">
                  <h2 class="ma-0">Step 2. Address</h2>
                </li>
              </menu>
              <div class="sign-up__form_steps__wrapper">
                <v-form v-model="isStep[0]" v-show="step === 1" ref="formStepOne" class="sign-up__form_step">
                  <input type="hidden" name="id" value="0" />
                  <input type="hidden" name="gid" value="0" />
                  <input type="hidden" name="emailpass" value="0" />
                  <input type="hidden" name="cbsecuritym3" value="cbm_79d17317_1b4c9bde_fb6916f00b241815497fc3f3c7d028b9" />
                  <input type="hidden" name="cbrasitway" value="cbrv1_c2c1132fe5627bc6653d8507a20e9b3d_h9I01C8FBNRAgePT" />
                  <div class="d-flex justify-space-between form-fieldgroup appeal-fieldgroup">
                    <div class="field-wrapper">
                      <label for="cb_title" class="mb-1">Title</label>
                      <v-select
                        v-model="appeal"
                        name="cb_title"
                        id="cb_title"
                        :items="fields.appeal.items"
                        color="#021B28"
                        placeholder="Please select"
                        class="ma-0 pa-0"
                      />
                    </div>
                    <div class="field-wrapper">
                      <label for="firstname" class="mb-1">First name</label>
                      <v-text-field
                        v-model="firstname"
                        name="firstname"
                        id="firstname"
                        color="#021B28"
                        :rules="rules.firstname"
                        required
                        placeholder="Enter first name"
                        class="ma-0 pa-0"
                      />
                    </div>
                    <div class="field-wrapper">
                      <label for="middlename" class="mb-1">Middle name</label>
                      <v-text-field
                        name="middlename"
                        id="middlename"
                        color="#021B28"
                        :rules="rules.middlename"
                        placeholder="Enter middle name"
                        class="ma-0 pa-0"
                      />
                    </div>
                    <div class="field-wrapper">
                      <label for="lastname" class="mb-1">Last name</label>
                      <v-text-field
                        name="lastname"
                        id="lastname"
                        color="#021B28"
                        :rules="rules.lastname"
                        required
                        placeholder="Enter last name"
                        class="ma-0 pa-0"
                      />
                    </div>
                  </div>
                  <div class="d-flex justify-space-between form-fieldgroup">
                    <div class="field-wrapper">
                      <label for="username" class="mb-1">Username</label>
                      <v-text-field
                        name="username"
                        id="username"
                        color="#021B28"
                        :rules="rules.username"
                        required
                        placeholder="Choose something unique (not your name)"
                        class="ma-0 pa-0"
                      />
                    </div>
                  </div>
                  <div class="d-flex justify-space-between form-fieldgroup">
                    <div class="field-wrapper">
                      <label for="email" class="mb-1">Email</label>
                      <v-text-field
                        v-model="email"
                        name="email"
                        id="email"
                        type="email"
                        color="#021B28"
                        :rules="rules.email"
                        required
                        placeholder="Enter email"
                        class="ma-0 pa-0"
                        @input="emailConfirm = ''"
                      />
                    </div>
                    <div class="field-wrapper">
                      <label for="email__verify" class="mb-1">Confirm email</label>
                      <v-text-field
                        v-model="emailConfirm"
                        name="email__verify"
                        id="email__verify"
                        type="email"
                        :rules="rules.emailConfirm"
                        required
                        placeholder="Retype email"
                        color="#021B28"
                        class="ma-0 pa-0"
                      />
                    </div>
                  </div>
                  <div class="d-flex justify-space-between form-fieldgroup">
                    <div class="field-wrapper">
                      <label for="password" class="mb-1">Password</label>
                      <v-text-field
                        v-model="password"
                        name="password"
                        id="password"
                        type="password"
                        color="#021B28"
                        :rules="rules.password"
                        placeholder="Enter password"
                        class="ma-0 pa-0"
                        @input="passwordConfirm = ''"
                      />
                    </div>
                    <div class="field-wrapper">
                      <label for="password__verify" class="mb-1">Confirm password</label>
                      <v-text-field
                        v-model="passwordConfirm"
                        name="password__verify"
                        id="password__verify"
                        type="password"
                        :rules="rules.passwordConfirm"
                        placeholder="Retype password"
                        color="#021B28"
                        class="ma-0 pa-0"
                      />
                    </div>
                  </div>
                  <div class="d-flex justify-space-between form-fieldgroup">
                    <div class="field-wrapper">
                      <label for="cb_homephoneno" class="mb-1">Telephone number</label>
                      <v-text-field
                        v-model="homephoneno"
                        name="cb_homephoneno"
                        id="cb_homephoneno"
                        color="#021B28"
                        :rules="rules.phonenumber"
                        placeholder="(868)-XXX-XXXX"
                        class="ma-0 pa-0"
                        @focus="checkPhonePattern('homephoneno')"
                        @keydown="$event => setPhonePattern('homephoneno', $event)"
                      />
                    </div>
                    <div class="field-wrapper">
                      <label for="cb_mobile" class="mb-1">Cellphone number</label>
                      <v-text-field
                        v-model="mobile"
                        name="cb_mobile"
                        id="cb_mobile"
                        color="#021B28"
                        :rules="rules.phonenumber"
                        placeholder="(868)-XXX-XXXX"
                        class="ma-0 pa-0"
                        @focus="checkPhonePattern('mobile')"
                        @keydown="$event => setPhonePattern('mobile', $event)"
                      />
                    </div>
                  </div>
                  <div class="d-flex justify-space-between form-fieldgroup birthday-fieldgroup">
                    <div class="field-wrapper">
                      <label for="cb_gender" class="mb-1">Gender</label>
                      <v-select
                        name="cb_gender"
                        id="cb_gender"
                        :items="fields.gender.items"
                        color="#021B28"
                        :rules="rules.select"
                        required
                        placeholder="Please select"
                        class="ma-0 pa-0"
                      />
                    </div>
                    <div class="field-wrapper">
                      <label for="birthday-month" class="mb-1">Birthday</label>
                      <div class="d-flex justify-space-between field-birthday__wrapper">
                        <v-text-field
                          placeholder="Day"
                          color="#021B28"
                          :rules="rules.day"
                          class="ma-0 pa-0"
                          @input="value => setBirthday('day', value)"
                        />
                        <v-text-field
                          color="#021B28"
                          :rules="rules.month"
                          placeholder="Month"
                          class="ma-0 pa-0"
                          @input="value => setBirthday('month', value)"
                        />
                        <v-text-field
                          placeholder="Year"
                          color="#021B28"
                          :rules="rules.year"
                          class="ma-0 pa-0"
                          @input="value => setBirthday('year', value)"
                        />
                        <v-text-field
                          v-model="birthday"
                          name="cb_birthdate"
                          hidden
                          class="ma-0 pa-0 hidden-field"
                        />
                      </div>
                    </div>
                  </div>
                  <div class="d-flex justify-space-between form-fieldgroup taxpayer-fieldgroup">
                    <div class="field-wrapper">
                      <v-text-field
                        name="cb_trn"
                        id="cb_trn"
                        value="123456789"
                        class="hidden-field"
                      />
                    </div>
                    <div class="field-wrapper">
                      <label for="cb_preferredcurrency" class="mb-1">Currency</label>
                      <v-select
                        v-model="currency"
                        name="cb_preferredcurrency"
                        id="cb_preferredcurrency"
                        item-text="label"
                        item-value="value"
                        :items="fields.currency.items"
                        color="#021B28"
                        :rules="rules.select"
                        required
                        placeholder="Please select"
                        class="ma-0 pa-0"
                      />
                    </div>
                  </div>
                </v-form>
                <v-form v-model="isStep[1]" v-show="step === 2" ref="formStepTwo" class="sign-up__form_step">
                  <input type="hidden" name="cb_borrowlendboth" value="Borrow" />
                  <input type="hidden" name="cb_ipaddress" value />
                  <input type="hidden" name="cb_wealthsource" value />
                  <input type="hidden" name="cb_otherwealthsource" value />
                  <input type="hidden" name="cb_tin" value />
                  <div class="d-flex justify-space-between form-fieldgroup">
                    <div class="field-wrapper">
                      <label for="cb_street1" class="mb-1">Address line 1</label>
                      <v-text-field
                        ref="step2FirstInput"
                        name="cb_street1"
                        id="cb_street1"
                        color="#021B28"
                        :rules="rules.address"
                        required
                        placeholder="Enter address"
                        class="ma-0 pa-0"
                      />
                    </div>
                    <div class="field-wrapper">
                      <label for="cb_posttown" class="mb-1">Address line 2</label>
                      <v-text-field
                        name="cb_posttown"
                        id="cb_posttown"
                        color="#021B28"
                        placeholder="Enter address"
                        class="ma-0 pa-0"
                      />
                    </div>
                  </div>
                  <div class="d-flex justify-space-between form-fieldgroup">
                    <div class="field-wrapper">
                      <label for="cb_street1" class="mb-1">Town/City</label>
                      <v-text-field
                        name="cb_county"
                        id="cb_county"
                        :rules="rules.textfield"
                        required
                        color="#021B28"
                        class="ma-0 pa-0"
                      />
                    </div>
                    <div class="field-wrapper">
                      <label for="cb_country" class="mb-1">Country</label>
                      <v-select
                        v-model="country"
                        name="cb_country"
                        id="cb_country"
                        item-text="label"
                        item-value="value"
                        :items="fields.country.items"
                        color="#021B28"
                        :rules="rules.select"
                        required
                        placeholder="Please select"
                        class="ma-0 pa-0"
                      />
                    </div>
                    <v-text-field
                      name="cb_postcode"
                      id="cb_postcode"
                      hidden
                      value=""
                      class="hidden-field"
                    />
                  </div>
                  <div class="d-flex justify-space-between form-fieldgroup">
                    <div class="field-wrapper">
                      <label for="cb_nationality" class="mb-1">Nationality</label>
                      <v-select
                        v-model="nationality"
                        name="cb_nationality"
                        id="cb_nationality"
                        :items="fields.nationality.items"
                        color="#021B28"
                        :rules="rules.select"
                        required
                        placeholder="Please select"
                        class="ma-0 pa-0"
                      />
                    </div>
                    <div class="field-wrapper">
                      <label for="cb_residentialstatus" class="mb-1">Residental status</label>
                      <v-select
                        name="cb_residentialstatus"
                        id="cb_residentialstatus"
                        :items="fields.residentialstatus.items"
                        color="#021B28"
                        :rules="rules.select"
                        required
                        placeholder="Please select"
                        class="ma-0 pa-0"
                      />
                    </div>
                  </div>
                  <div class="d-flex justify-space-between form-fieldgroup">
                    <div class="field-wrapper">
                      <label for="cb_howhearaboutus" class="mb-1">How did you find us?</label>
                      <v-select
                        name="cb_howhearaboutus"
                        id="cb_howhearaboutus"
                        :items="fields.howhearaboutus.items"
                        color="#021B28"
                        :rules="rules.select"
                        required
                        placeholder="Please select"
                        class="ma-0 pa-0"
                      />
                    </div>
                    <div class="field-wrapper">
                      <v-text-field
                        name="does_referral"
                        id="does_referral"
                        value="0"
                        hidden
                        class="hidden-field"
                      />
                      <v-text-field
                        name="Vmmember"
                        id="Vmmember"
                        hidden
                        value=""
                        class="hidden-field"
                      />
                      <v-text-field
                        name="vm_memberid"
                        hidden
                        value=""
                        class="hidden-field"
                      />
                    </div>
                  </div>
                  <div class="pa-4 pb-0 mb-3 mb-md-8 sign-up__form_connections">
                    <label class="mb-2">Do you have any of the these connections to the United States?</label>
                    <ul class="mb-3 mb-md-6">
                      <li>You are a US citizen or resident</li>
                      <li>You have a US address (residential or mailing) and/or telephone number</li>
                      <li>You have a Power of Attorney or signing authority for a person in the US</li>
                    </ul>
                    <v-radio-group v-model="isusresident" name="cb_isusresident" class="ma-0 pa-0">
                      <v-radio color="#F58220" label="No" value="0" />
                      <v-radio color="#F58220" label="Yes" value="1" />
                    </v-radio-group>
                  </div>
                  <div class="d-flex align-center justify-center justify-md-start sign-up__form_terms">
                    <v-checkbox
                      v-model="acceptedterms"
                      false-value="0"
                      true-value="1"
                      :rules="[ v => !!v && v === '1' || 'Agreement is required' ]"
                      color="#F58220"
                      label="Accept"
                      required
                    />
                    <a class="ml-1">Terms and Conditions</a>
                    <v-text-field
                      v-model="acceptedterms"
                      name="acceptedterms"
                      hidden
                      class="ma-0 pa-0 hidden-field"
                    />
                  </div>
                </v-form>
                <input type="hidden" name="profiletype" value="person" />
                <input type="hidden" name="cb_profiletype" value="person" />
              </div>
            </div>
            <footer class="pt-3 d-flex align-center justify-center justify-md-end sign-up__footer">
              <v-btn
                v-if="step === 1"
                depressed
                :disabled="!isStep[0]"
                color="#F58220"
                class="sign-up__footer_link"
                @click="setStep(2)"
              >
                Next step
              </v-btn>
              <v-btn
                v-if="step === 2"
                depressed
                color="#F58220"
                class="sign-up__footer_link sign-up__footer_link__secondary"
                @click="setStep(1)"
              >
                Previous step
              </v-btn>
              <v-btn
                v-if="step === 2"
                :disabled="!isStep[0] || !isStep[1]"
                depressed
                color="#F58220"
                class="ml-2 ml-md-8 sign-up__footer_link"
                @click="submit()"
              >
                Sign up
              </v-btn>
            </footer>
            <div v-if="step === 3" class="d-flex flex-column align-start justify-space-between sign_up__result">
              <div class="sign_up__result__content">
                <h2 class="ma-0 pb-4">{{ globalStatus.message }}</h2>
                <p class="mb-6 mb-md-8" v-if="globalStatus.isOk">
                  Please check the email address that you provided at registration for an email titled "Please Confirm Email Address". Please follow the instructions in the email to complete your registration. Please check your junk or spam mail as well. To have the email resent, simply try logging in with the username and password of your sign up.
                </p>
                <p v-if="!globalStatus.isOk" class="mb-6 mb-md-8">Please, try again</p>
              </div>
              <a href="/" v-if="globalStatus.isOk" class="sign-up__footer_link">Back to Home</a>
              <a v-if="!globalStatus.isOk" @click="setStep(1)" class="sign-up__footer_link">Try Again</a>
            </div>
          </div>
        </v-app>
      `,

      data () {
        return {
          valid: false,
          step: 1,
          isStep: [false, false],

          globalStatus: {
            isOk: false,
            message: ''
          },

          fields: {
            appeal: {
              items: ['Mr', 'Mrs', 'Miss', 'Ms', 'Rev', 'Dr', 'Prof']
            },
            gender: {
              items: ['Male', 'Female']
            },
            currency: {
              items: [
                {
                  label: 'TT$',
                  value: 'TTD'
                }
              ]
            },
            country: {
              items: [
                {
                  label: 'Trinidad and Tobago',
                  value: 'Trinidad'
                }
              ]
            },
            nationality: {
              items: []
            },
            residentialstatus: {
              items: ['Owner', 'Tenant', 'Living with Parents', 'Living with Partner', 'Other']
            },
            howhearaboutus: {
              items: ['Facebook', 'Instagram', 'Google', 'Website', 'Radio', 'Newspaper', 'Friend', 'Invitation', 'Online news', 'Magazine', 'TV', 'LinkedIn', 'Twitter', 'Comparison website', 'Google Organic', 'Google Paid', 'Bing Organic', 'Bing Paid', 'Yahoo', 'Promotech', 'Barbados Fertility Centre', 'ACE H&B Hardware', 'Gajah Home', 'Automotive Art', 'Innogen', 'Brancker\'s', 'Trowel Plastics', 'Ballyclare Dental', 'Armstrong Health Care Inc.', 'Coast to Coast Cooling', 'Victoria Mutual', 'Royale Computers and Accessories', 'Other', 'Don\'t know']
            }
          },

          firstname: '',
          appeal: 'Mr',
          currency: 'TTD',
          country: 'Trinidad',
          homephoneno: '',
          mobile: '',
          isusresident: '0',
          acceptedterms: '0',
          password: '',
          passwordConfirm: '',
          email: '',
          emailConfirm: '',
          nationality: 'Trinidad and Tobago',
          birthdayParts: {
            year: '',
            month: '',
            day: ''
          },
          birthday: '',

          rules: {
            middlename: [
              v => /^[a-zA-Z, ]+$/.test(v) || 'Field must contain only letters'
            ],
            firstname: [
              v => !!v || 'Enter first name',
              v => /^[a-zA-Z, ]+$/.test(v) || 'Field must contain only letters'
            ],
            lastname: [
              v => !!v || 'Enter last name',
              v => /^[a-zA-Z, ]+$/.test(v) || 'Field must contain only letters'
            ],
            username: [
              v => !!v || 'Enter username'
            ],
            textfield: [
              v => !!v || 'This field is required',
              v => /^[a-zA-Z]+$/.test(v) || 'Field must contain only letters'
            ],
            address: [
              v => !!v || 'This field is required'
            ],
            select: [
              v => !!v || 'This field is required'
            ],
            number: [
              v => !!v || 'This field is required',
              v => /^[0-9]+$/.test(v) || 'Field must contain only digits'
            ],
            phonenumber: [
              v => !!v || 'This field is required',
              v => !!v && (v[0] === '(' && v[1] === '8' && v[2] === '6' && v[3] === '8' && v[4] === ')' && v[5] === '-') || 'Phone number should match pattern (868)-XXX-XXXX',
              v => !!v && v.length === 14 || 'Field must contain 10 digits'
            ],
            month: [
              v => !!v || 'This field is required',
              v => /^[0-9]+$/.test(v) || 'Field must contain only digits',
              v => !!v && v.length < 3 || 'Field must contain 1-2 digits',
              v => !!v && v > 0 && v < 13 || 'Not correct month'
            ],
            day: [
              v => !!v || 'This field is required',
              v => /^[0-9]+$/.test(v) || 'Field must contain only digits',
              v => !!v && v.length < 3 || 'Field must contain 1-2 digits',
              v => !!v && v > 0 && v < 32 || 'Not correct day'
            ],
            year: [
              v => !!v || 'This field is required',
              v => /^[0-9]+$/.test(v) || 'Field must contain only digits',
              v => !!v && v.length === 4 || 'Field must contain 4 digits',
              v => !!v && v > 1932 && v < new Date().getFullYear() - 18 || 'Not correct year'
            ],
            password: [
              v => !!v || 'This field is required',
              v => !!v && v.length > 7 || 'Password should contain at least 8 characters'
            ],
            passwordConfirm: [
              v => !!v || 'This field is required',
              v => !!v && v === this.password || 'Password should match'
            ],
            email: [
              v => !!v || 'This field is required',
              v => /.+@.+\..+/.test(v) || 'E-mail must be valid',
              v => v.length <= 254 || 'Too long E-mail'
            ],
            emailConfirm: [
              v => !!v || 'This field is required',
              v => !!v && v === this.email || 'Email should match'
            ]
          }
        }
      },

      watch: {},

      created () {
        try {
          fetch('https://antonmiazyn.github.io/projects/insta-loan-sign-up/nationality.json').then(response => response.json()).then(data => {
            data.forEach(item => {
              this.fields.nationality.items.push(item)
            })
          })
        } catch (error) {
          console.log('Can\'t get nationalities list')
        }
      },

      methods: {
        setStep (step) {
          this.step = step

          window.scrollTo(0, 0)
        },

        setBirthday (key, value) {
          this.birthdayParts[key] = value

          if (this.birthdayParts.year && this.birthdayParts.month && this.birthdayParts.day) {
            const month = this.birthdayParts.month < 10 ? '0' + this.birthdayParts.month : this.birthdayParts.month
            const day = this.birthdayParts.day < 10 ? '0' + this.birthdayParts.day : this.birthdayParts.day

            this.birthday = `${this.birthdayParts.year}-${month}-${day}`
          }
        },

        setPhonePattern (field, event) {
          if (Number(event.key) || event.key === '0') {
            event.preventDefault()
              if (this[field].length > 5 && this[field].length < 9) {
                this[field] += event.key
              } else if (this[field].length === 9) {
                this[field] += '-' + event.key
              } else if (this[field].length > 9 && this[field].length < 14) {
                this[field] += event.key
              } else {
                this[field] += ''
              }
          } else if (event.key === 'Backspace') {
            if (this[field].length <= 6) {
              event.preventDefault()
            }
          } else {
            event.preventDefault()
          }
        },

        checkPhonePattern (field) {
          if (!this[field].length) {
            this[field] = '(868)-'
          }
        },

        async submit () {
          const isValid = this.$refs.formStepOne.validate() && this.$refs.formStepOne.validate()

          if (isValid) {
            const formData = new FormData()

            new Promise (resolve => {
              const stepOneFormData = new FormData(this.$refs.formStepOne.$el)
              for (const [key, value] of stepOneFormData) {
                formData.append(key, value)
              }

              const stepTwoFormData = new FormData(this.$refs.formStepTwo.$el)
              for (const [key, value] of stepTwoFormData) {
                formData.append(key, value)
              }

              resolve()
            }).then(() => {
              fetch('https://www.carilend.com/index.php?option=com_comprofiler&view=saveregisters&Itemid=4192', {
                method: 'POST',
                body: formData,
              }).then(res => {
                if (res.status === 200) {
                  this.globalStatus.isOk = true
                  this.globalStatus.message = 'Successfully registered!'
                  this.setStep(3)
                } else {
                  this.globalStatus.isOk = false
                  this.globalStatus.message = 'Something went wrong...'
                  this.setStep(3)
                }
              }).catch(error => {
                console.log(error)
                this.globalStatus.isOk = false
                this.globalStatus.message = 'Something went wrong...'
                this.setStep(3)
              })
            })
          }
        }
      }
    }).$mount('#sign-up-form')
  }
})
