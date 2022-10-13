window.addEventListener('load', () => {
    if (document.querySelector('#AppForm')) {
        const ApplicationForm = new Vue({
            vuetify : new Vuetify(),
            template: `
            <v-app>
                <div class="app_form">
                    <span style="display: none;">{{ formResizeFlag }}</span>
                    <div class="app_form_navigation">
                        <ul>
                            <li
                                v-for="(nav, index) in navigation"
                                :key="nav"
                                v-if="setMobileNavState(index, formData.step)"
                                :class="[{ active: formData.step === index }, { clickable: formData.step > index && !success }]"
                                :style="'order:' + index"
                                @click="(formData.step > index) && !success ? setStep(index) : () => { return }"
                            >{{ navMobileCrop(nav) }}<span class="app_form_nav-arrow" v-if="index !== navigation.length - 1">
                                    <svg width="6" height="10" viewBox="0 0 6 10" fill="none" xmlns="http://www.w3.org/2000/svg">
                                        <path d="M1 9L5 5L1 1" stroke="#1D1D1D" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
                                    </svg>
                                </span>
                                <span class="app_form_nav-icon" v-if="index === navigation.length - 1">🎉</span>
                            </li>
                            <li
                                :class="['app_form_mobile_dots', { clickable: formData.step > 3 && !success }]"
                                :style="'order:' + setDotsOrder(formData.step)"    
                            >
                                <v-menu tile offset-y>
                                    <template v-slot:activator="{ on: menu, attrs }">
                                        <v-tooltip bottom>
                                            <template v-slot:activator="{ on: tooltip }">
                                                <v-btn
                                                    :disabled="isMobileDotsDisabled"
                                                    color="transparent"
                                                    depressed
                                                    class="app_form_mobile_dots_button"
                                                    style="background-color: #fff !important;"
                                                    v-bind="attrs"
                                                    v-on="{ ...menu }"
                                                >...</v-btn>
                                            </template>
                                        </v-tooltip>
                                    </template>
                                    <div class="app_form_mobile_navigation">
                                        <ul>
                                            <li
                                                v-for="(nav, index) in navigation"
                                                :key="nav"
                                                v-if="(index !== 0 && index !== 4) && setMobileDropdown(index, formData.step)"
                                                :class="[{ active: formData.step === index }, { clickable: formData.step > index && !success }]"
                                                @click="(formData.step > index) && !success ? setStep(index) : () => { return }"
                                            >{{ nav }}<span class="app_form_nav-arrow" v-if="index !== navigation.length - 1">
                                                    <svg width="6" height="10" viewBox="0 0 6 10" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                        <path d="M1 9L5 5L1 1" stroke="#1D1D1D" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
                                                    </svg>
                                                </span>
                                            </li>
                                        </ul>
                                    </div>
                                </v-menu>
                                <span class="app_form_nav-arrow">
                                    <svg width="6" height="10" viewBox="0 0 6 10" fill="none" xmlns="http://www.w3.org/2000/svg">
                                        <path d="M1 9L5 5L1 1" stroke="#1D1D1D" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
                                    </svg>
                                </span>
                            </li>
                        </ul>
                    </div>
                    <div class="app_form_content">
                        <div class="app_form_header">
                            <h1>{{ formTitle }}</h1>
                            <p v-html="formDescription"></p>
                            <div v-show="isSwitcher[0] && formData.step === 1" class="app_form_switcher">
                                <div ref="appFormSwitcherBlob1" class="blob"></div>
                                <button
                                    v-for="(c, index) in switcherVariants"
                                    :key="index"
                                    :disabled="switcher.f === index"
                                    :class="['app_form_switcher_button', { unfilled: (!switcherValidation.youF && index === 0) }, { unfilled: (!switcherValidation.applicantF && index === 1) }]"
                                    @click="switchVariant(index, 0)"
                                ><span>{{c}}</span></button>
                            </div>
                            <div v-show="isSwitcher[1] && formData.step === 2" class="app_form_switcher">
                                <div ref="appFormSwitcherBlob2" class="blob"></div>
                                <button
                                    v-for="(c, index) in switcherVariants"
                                    :key="index"
                                    :disabled="switcher.s === index"
                                    :class="['app_form_switcher_button', { unfilled: (!switcherValidation.youS && index === 0) }, { unfilled: (!switcherValidation.applicantS && index === 1) }]"
                                    @click="switchVariant(index, 1)"
                                ><span>{{c}}</span></button>
                            </div>
                        </div>
                        <v-form v-model="formData.validation[0]" v-show="formData.step === 0" class="app_form_step">
                            <div class="app_form_rows">
                                <div
                                    v-for="(fieldset, index) in formData.forms[0].fieldsets"
                                    :key="index"
                                    class="app_form_fieldset"
                                >
                                    <div v-if="fieldset.type === 'radio'" class="app_form_radio">
                                        <label>{{fieldset.label}}</label>
                                        <v-radio-group v-model="fieldset.value" hide-details mandatory>
                                            <v-radio
                                                v-for="btn in fieldset.radio"
                                                :key="btn.value"
                                                :label="btn.value"
                                                :value="btn.value"
                                                color="#F7B733"
                                            ></v-radio>
                                        </v-radio-group>
                                    </div>
                                </div>
                            </div>
                            <div class="app_form_control">
                                <v-btn
                                    :disabled="!formData.validation[0]"
                                    depressed
                                    color="#1d1d1d"
                                    class="button_color advantage_button"
                                    @click="setStep(1)"
                                >
                                    {{ formButtons[0] }}
                                    <img src="https://uploads-ssl.webflow.com/619515938931d07a78a397a5/6196541566d8196045b68982_arrow.svg" loading="lazy" alt="arrow" class="icon-arrow">
                                </v-btn>
                            </div>
                        </v-form>
                        <v-form v-model="formData.validation[1]" v-show="formData.step === 1" class="app_form_step">
                            <div class="app_form_rows">
                                <div
                                    v-show="switcher.f === 0"
                                    v-for="(fieldset, index) in formData.forms[1].self.fieldsets"
                                    class="app_form_fieldset"
                                >
                                    <div v-if="fieldset.type === 'input-long'" class="app_form_input-long">
                                        <label>{{fieldset.label}}</label>
                                        <v-text-field
                                            v-model="fieldset.inputs[0].value"
                                            outlined
                                            color="#1d1d1d"
                                            :type="fieldset.inputs[0].type"
                                            :placeholder="fieldset.inputs[0].placeholder"
                                            :rules="fieldset.inputs[0].rules"
                                        ></v-text-field>
                                    </div>
                                    <div v-if="fieldset.type === 'input-short'" class="app_form_input-short">
                                        <div v-for="field in fieldset.inputs" :class="{ 'app_form_date-field': field.variant && (field.variant === 'date') }">
                                            <label>{{field.label}}</label>
                                            <v-text-field
                                                v-if="!field.variant && !(field.variant === 'date')"
                                                v-model="field.value"
                                                outlined
                                                color="#1d1d1d"
                                                :type="field.type"
                                                :placeholder="field.placeholder"
                                                :rules="field.rules"
                                            ></v-text-field>
                                            <v-menu
                                                v-else
                                                v-model="field.value.calendar"
                                                :close-on-content-click="false"
                                                transition="scale-transition"
                                                offset-y
                                                max-width="290px"
                                                min-width="auto"
                                            >
                                                <template v-slot:activator="{ on, attrs }">
                                                    <v-text-field
                                                        v-model="field.value.dateFormatted"
                                                        v-bind="attrs"
                                                        outlined
                                                        hide-details
                                                        :placeholder="field.placeholder"
                                                        :rules="field.rules"
                                                        @blur="field.value.date = parseDate(field.value.dateFormatted)"
                                                        @click="field.value.date = ''"
                                                        v-on="on"
                                                    ></v-text-field>
                                                </template>
                                                <v-date-picker
                                                    v-model="field.value.date"
                                                    no-title
                                                    color="#F7B733"
                                                    @input="field.value.calendar = false"
                                                ></v-date-picker>
                                            </v-menu>
                                            <svg v-if="field.variant && (field.variant === 'date')" width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M16 2V6" stroke="#F7B733" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/><path d="M8 2V6" stroke="#F7B733" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/><path d="M3 9H21" stroke="#F7B733" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/><path fill-rule="evenodd" clip-rule="evenodd" d="M19 4H5C3.895 4 3 4.895 3 6V19C3 20.105 3.895 21 5 21H19C20.105 21 21 20.105 21 19V6C21 4.895 20.105 4 19 4Z" stroke="#F7B733" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/><path d="M7.01316 12.7285C6.87516 12.7285 6.76316 12.8405 6.76416 12.9785C6.76416 13.1165 6.87616 13.2285 7.01416 13.2285C7.15216 13.2285 7.26416 13.1165 7.26416 12.9785C7.26416 12.8405 7.15216 12.7285 7.01316 12.7285" stroke="#F7B733" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/><path d="M12.0132 12.7285C11.8752 12.7285 11.7632 12.8405 11.7642 12.9785C11.7642 13.1165 11.8762 13.2285 12.0142 13.2285C12.1522 13.2285 12.2642 13.1165 12.2642 12.9785C12.2642 12.8405 12.1522 12.7285 12.0132 12.7285" stroke="#F7B733" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/><path d="M17.0132 12.7285C16.8752 12.7285 16.7632 12.8405 16.7642 12.9785C16.7642 13.1165 16.8762 13.2285 17.0142 13.2285C17.1522 13.2285 17.2642 13.1165 17.2642 12.9785C17.2642 12.8405 17.1522 12.7285 17.0132 12.7285" stroke="#F7B733" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/><path d="M7.01316 16.7285C6.87516 16.7285 6.76316 16.8405 6.76416 16.9785C6.76416 17.1165 6.87616 17.2285 7.01416 17.2285C7.15216 17.2285 7.26416 17.1165 7.26416 16.9785C7.26416 16.8405 7.15216 16.7285 7.01316 16.7285" stroke="#F7B733" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/><path d="M12.0132 16.7285C11.8752 16.7285 11.7632 16.8405 11.7642 16.9785C11.7642 17.1165 11.8762 17.2285 12.0142 17.2285C12.1522 17.2285 12.2642 17.1165 12.2642 16.9785C12.2642 16.8405 12.1522 16.7285 12.0132 16.7285" stroke="#F7B733" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/></svg>
                                        </div>
                                    </div>
                                </div>
                                <div
                                    v-if="isSwitcher[0]"
                                    v-show="switcher.f === 1"
                                    v-for="(fieldset, index) in formData.forms[1].applicant.fieldsets"
                                    class="app_form_fieldset"
                                >
                                    <div v-if="fieldset.type === 'input-long'" class="app_form_input-long">
                                        <label>{{fieldset.label}}</label>
                                        <v-text-field
                                            v-model="fieldset.inputs[0].value"
                                            outlined
                                            color="#1d1d1d"
                                            :type="fieldset.inputs[0].type"
                                            :placeholder="fieldset.inputs[0].placeholder"
                                            :rules="fieldset.inputs[0].rules"
                                        ></v-text-field>
                                    </div>
                                    <div v-if="fieldset.type === 'input-short'" class="app_form_input-short">
                                        <div v-for="field in fieldset.inputs" :class="{ 'app_form_date-field': field.variant && (field.variant === 'date') }">
                                            <label>{{field.label}}</label>
                                            <v-text-field
                                                v-if="!field.variant && !(field.variant === 'date')"
                                                v-model="field.value"
                                                outlined
                                                color="#1d1d1d"
                                                :type="field.type"
                                                :placeholder="field.placeholder"
                                                :rules="field.rules"
                                            ></v-text-field>
                                            <v-menu
                                                v-else
                                                v-model="field.value.calendar"
                                                :close-on-content-click="false"
                                                transition="scale-transition"
                                                offset-y
                                                max-width="290px"
                                                min-width="auto"
                                            >
                                                <template v-slot:activator="{ on, attrs }">
                                                    <v-text-field
                                                        v-model="field.value.dateFormatted"
                                                        v-bind="attrs"
                                                        outlined
                                                        hide-details
                                                        :placeholder="field.placeholder"
                                                        :rules="field.rules"
                                                        @blur="field.value.date = parseDate(field.value.dateFormatted)"
                                                        @click="field.value.date = ''"
                                                        v-on="on"
                                                    ></v-text-field>
                                                </template>
                                                <v-date-picker
                                                    v-model="field.value.date"
                                                    no-title
                                                    color="#F7B733"
                                                    @input="field.value.calendar = false"
                                                ></v-date-picker>
                                            </v-menu>
                                            <svg v-if="field.variant && (field.variant === 'date')" width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M16 2V6" stroke="#F7B733" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/><path d="M8 2V6" stroke="#F7B733" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/><path d="M3 9H21" stroke="#F7B733" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/><path fill-rule="evenodd" clip-rule="evenodd" d="M19 4H5C3.895 4 3 4.895 3 6V19C3 20.105 3.895 21 5 21H19C20.105 21 21 20.105 21 19V6C21 4.895 20.105 4 19 4Z" stroke="#F7B733" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/><path d="M7.01316 12.7285C6.87516 12.7285 6.76316 12.8405 6.76416 12.9785C6.76416 13.1165 6.87616 13.2285 7.01416 13.2285C7.15216 13.2285 7.26416 13.1165 7.26416 12.9785C7.26416 12.8405 7.15216 12.7285 7.01316 12.7285" stroke="#F7B733" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/><path d="M12.0132 12.7285C11.8752 12.7285 11.7632 12.8405 11.7642 12.9785C11.7642 13.1165 11.8762 13.2285 12.0142 13.2285C12.1522 13.2285 12.2642 13.1165 12.2642 12.9785C12.2642 12.8405 12.1522 12.7285 12.0132 12.7285" stroke="#F7B733" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/><path d="M17.0132 12.7285C16.8752 12.7285 16.7632 12.8405 16.7642 12.9785C16.7642 13.1165 16.8762 13.2285 17.0142 13.2285C17.1522 13.2285 17.2642 13.1165 17.2642 12.9785C17.2642 12.8405 17.1522 12.7285 17.0132 12.7285" stroke="#F7B733" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/><path d="M7.01316 16.7285C6.87516 16.7285 6.76316 16.8405 6.76416 16.9785C6.76416 17.1165 6.87616 17.2285 7.01416 17.2285C7.15216 17.2285 7.26416 17.1165 7.26416 16.9785C7.26416 16.8405 7.15216 16.7285 7.01316 16.7285" stroke="#F7B733" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/><path d="M12.0132 16.7285C11.8752 16.7285 11.7632 16.8405 11.7642 16.9785C11.7642 17.1165 11.8762 17.2285 12.0142 17.2285C12.1522 17.2285 12.2642 17.1165 12.2642 16.9785C12.2642 16.8405 12.1522 16.7285 12.0132 16.7285" stroke="#F7B733" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/></svg>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div class="app_form_control">
                                <v-btn
                                    :disabled="!formData.validation[1]"
                                    depressed
                                    color="#1d1d1d"
                                    class="button_color advantage_button"
                                    @click="setStep(2)"
                                >
                                    {{ formButtons[0] }}
                                    <img src="https://uploads-ssl.webflow.com/619515938931d07a78a397a5/6196541566d8196045b68982_arrow.svg" loading="lazy" alt="arrow" class="icon-arrow">
                                </v-btn>
                            </div>
                        </v-form>
                        <v-form v-show="formData.step === 2" class="app_form_step">
                            <div class="app_form_rows">
                                <div
                                    v-show="switcher.s === 0"
                                    v-for="(fieldset, index) in formData.forms[2].self.fieldsets"
                                    class="app_form_fieldset"
                                >
                                    <div v-if="fieldset.type === 'input-short'" class="app_form_input-short">
                                        <div
                                            v-for="field in fieldset.inputs"
                                            :class="{ 'app_form_date-field': field.variant && (field.variant === 'date') }"
                                            :style="(field.variant && (field.variant === 'date')) ? 'margin-bottom: 16px;' : 'margin-bottom: 0;'"
                                        >
                                            <label>{{field.label}}</label>
                                            <v-text-field
                                                v-if="!field.variant && !(field.variant === 'date')"
                                                v-model="field.value"
                                                outlined
                                                color="#1d1d1d"
                                                :type="field.type"
                                                :placeholder="field.placeholder"
                                                :rules="field.rules"
                                            ></v-text-field>
                                            <v-menu
                                                v-else
                                                v-model="field.value.calendar"
                                                :close-on-content-click="false"
                                                transition="scale-transition"
                                                offset-y
                                                max-width="290px"
                                                min-width="auto"
                                            >
                                                <template v-slot:activator="{ on, attrs }">
                                                    <v-text-field
                                                        v-model="field.value.dateFormatted"
                                                        v-bind="attrs"
                                                        outlined
                                                        hide-details
                                                        :placeholder="field.placeholder"
                                                        :rules="field.rules"
                                                        @blur="field.value.date = parseDate(field.value.dateFormatted)"
                                                        @click="field.value.date = ''"
                                                        v-on="on"
                                                    ></v-text-field>
                                                </template>
                                                <v-date-picker
                                                    v-model="field.value.date"
                                                    no-title
                                                    color="#F7B733"
                                                    @input="field.value.calendar = false"
                                                ></v-date-picker>
                                            </v-menu>
                                            <svg v-if="field.variant && (field.variant === 'date')" width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M16 2V6" stroke="#F7B733" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/><path d="M8 2V6" stroke="#F7B733" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/><path d="M3 9H21" stroke="#F7B733" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/><path fill-rule="evenodd" clip-rule="evenodd" d="M19 4H5C3.895 4 3 4.895 3 6V19C3 20.105 3.895 21 5 21H19C20.105 21 21 20.105 21 19V6C21 4.895 20.105 4 19 4Z" stroke="#F7B733" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/><path d="M7.01316 12.7285C6.87516 12.7285 6.76316 12.8405 6.76416 12.9785C6.76416 13.1165 6.87616 13.2285 7.01416 13.2285C7.15216 13.2285 7.26416 13.1165 7.26416 12.9785C7.26416 12.8405 7.15216 12.7285 7.01316 12.7285" stroke="#F7B733" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/><path d="M12.0132 12.7285C11.8752 12.7285 11.7632 12.8405 11.7642 12.9785C11.7642 13.1165 11.8762 13.2285 12.0142 13.2285C12.1522 13.2285 12.2642 13.1165 12.2642 12.9785C12.2642 12.8405 12.1522 12.7285 12.0132 12.7285" stroke="#F7B733" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/><path d="M17.0132 12.7285C16.8752 12.7285 16.7632 12.8405 16.7642 12.9785C16.7642 13.1165 16.8762 13.2285 17.0142 13.2285C17.1522 13.2285 17.2642 13.1165 17.2642 12.9785C17.2642 12.8405 17.1522 12.7285 17.0132 12.7285" stroke="#F7B733" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/><path d="M7.01316 16.7285C6.87516 16.7285 6.76316 16.8405 6.76416 16.9785C6.76416 17.1165 6.87616 17.2285 7.01416 17.2285C7.15216 17.2285 7.26416 17.1165 7.26416 16.9785C7.26416 16.8405 7.15216 16.7285 7.01316 16.7285" stroke="#F7B733" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/><path d="M12.0132 16.7285C11.8752 16.7285 11.7632 16.8405 11.7642 16.9785C11.7642 17.1165 11.8762 17.2285 12.0142 17.2285C12.1522 17.2285 12.2642 17.1165 12.2642 16.9785C12.2642 16.8405 12.1522 16.7285 12.0132 16.7285" stroke="#F7B733" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/></svg>
                                        </div>
                                    </div>
                                </div>
                                <div
                                    v-if="isSwitcher[1]"
                                    v-show="switcher.s === 1"
                                    v-for="(fieldset, index) in formData.forms[2].applicant.fieldsets"
                                    class="app_form_fieldset"
                                >
                                    <div v-if="fieldset.type === 'input-short'" class="app_form_input-short">
                                        <div v-for="field in fieldset.inputs" :class="{ 'app_form_date-field': field.variant && (field.variant === 'date') }">
                                            <label>{{field.label}}</label>
                                            <v-text-field
                                                v-if="!field.variant && !(field.variant === 'date')"
                                                v-model="field.value"
                                                outlined
                                                hide-details
                                                color="#1d1d1d"
                                                :type="field.type"
                                                :placeholder="field.placeholder"
                                                :rules="field.rules"
                                            ></v-text-field>
                                            <v-menu
                                                v-else
                                                v-model="field.value.calendar"
                                                :close-on-content-click="false"
                                                transition="scale-transition"
                                                offset-y
                                                max-width="290px"
                                                min-width="auto"
                                            >
                                                <template v-slot:activator="{ on, attrs }">
                                                    <v-text-field
                                                        v-model="field.value.dateFormatted"
                                                        v-bind="attrs"
                                                        outlined
                                                        :placeholder="field.placeholder"
                                                        :rules="field.rules"
                                                        @blur="field.value.date = parseDate(field.value.dateFormatted)"
                                                        @click="field.value.date = ''"
                                                        v-on="on"
                                                    ></v-text-field>
                                                </template>
                                                <v-date-picker
                                                    v-model="field.value.date"
                                                    no-title
                                                    color="#F7B733"
                                                    @input="field.value.calendar = false"
                                                ></v-date-picker>
                                            </v-menu>
                                            <svg v-if="field.variant && (field.variant === 'date')" width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M16 2V6" stroke="#F7B733" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/><path d="M8 2V6" stroke="#F7B733" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/><path d="M3 9H21" stroke="#F7B733" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/><path fill-rule="evenodd" clip-rule="evenodd" d="M19 4H5C3.895 4 3 4.895 3 6V19C3 20.105 3.895 21 5 21H19C20.105 21 21 20.105 21 19V6C21 4.895 20.105 4 19 4Z" stroke="#F7B733" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/><path d="M7.01316 12.7285C6.87516 12.7285 6.76316 12.8405 6.76416 12.9785C6.76416 13.1165 6.87616 13.2285 7.01416 13.2285C7.15216 13.2285 7.26416 13.1165 7.26416 12.9785C7.26416 12.8405 7.15216 12.7285 7.01316 12.7285" stroke="#F7B733" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/><path d="M12.0132 12.7285C11.8752 12.7285 11.7632 12.8405 11.7642 12.9785C11.7642 13.1165 11.8762 13.2285 12.0142 13.2285C12.1522 13.2285 12.2642 13.1165 12.2642 12.9785C12.2642 12.8405 12.1522 12.7285 12.0132 12.7285" stroke="#F7B733" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/><path d="M17.0132 12.7285C16.8752 12.7285 16.7632 12.8405 16.7642 12.9785C16.7642 13.1165 16.8762 13.2285 17.0142 13.2285C17.1522 13.2285 17.2642 13.1165 17.2642 12.9785C17.2642 12.8405 17.1522 12.7285 17.0132 12.7285" stroke="#F7B733" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/><path d="M7.01316 16.7285C6.87516 16.7285 6.76316 16.8405 6.76416 16.9785C6.76416 17.1165 6.87616 17.2285 7.01416 17.2285C7.15216 17.2285 7.26416 17.1165 7.26416 16.9785C7.26416 16.8405 7.15216 16.7285 7.01316 16.7285" stroke="#F7B733" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/><path d="M12.0132 16.7285C11.8752 16.7285 11.7632 16.8405 11.7642 16.9785C11.7642 17.1165 11.8762 17.2285 12.0142 17.2285C12.1522 17.2285 12.2642 17.1165 12.2642 16.9785C12.2642 16.8405 12.1522 16.7285 12.0132 16.7285" stroke="#F7B733" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/></svg>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div class="app_form_control">
                                <v-btn
                                    :disabled="!isIDValid"
                                    depressed
                                    color="#1d1d1d"
                                    class="button_color advantage_button"
                                    @click="setStep(3)"
                                >
                                    {{ formButtons[0] }}
                                    <img src="https://uploads-ssl.webflow.com/619515938931d07a78a397a5/6196541566d8196045b68982_arrow.svg" loading="lazy" alt="arrow" class="icon-arrow">
                                </v-btn>
                            </div>
                        </v-form>
                        <v-form v-model="formData.validation[3]" v-show="formData.step === 3" class="app_form_step">
                            <div class="app_form_rows">
                                <div
                                    v-for="(fieldset, index) in formData.forms[3].fieldsets"
                                    class="app_form_fieldset"
                                >
                                    <div v-if="fieldset.type === 'input-long'" class="app_form_input-long">
                                        <label>{{fieldset.label}}</label>
                                        <v-text-field
                                            v-model="fieldset.inputs[0].value"
                                            outlined
                                            color="#1d1d1d"
                                            :prefix="formData.selectedCurrency"
                                            :type="fieldset.inputs[0].type"
                                            :placeholder="fieldset.inputs[0].placeholder"
                                            :rules="fieldset.inputs[0].rules"
                                            @input="fieldset.inputs[0].validation ? cleanDepositString() : () => { return }"
                                        ></v-text-field>
                                    </div>
                                    <div v-if="fieldset.type === 'radio'" class="app_form_radio">
                                        <label>{{fieldset.label}}</label>
                                        <v-radio-group v-model="fieldset.value" hide-details mandatory>
                                            <v-radio
                                                v-for="btn in fieldset.radio"
                                                :key="btn.value"
                                                :label="btn.value"
                                                :value="btn.value"
                                                color="#F7B733"
                                            ></v-radio>
                                        </v-radio-group>
                                    </div>
                                    <div v-if="fieldset.type === 'select'" class="app_form_select">
                                        <label>{{fieldset.label}}</label>
                                        <v-select
                                            v-model="fieldset.value"
                                            :items="fieldset.options"
                                            outlined
                                            color="#F7B733"
                                            item-color="#F7B733"
                                            append-icon="mdi-chevron-down"
                                            placeholder="— Select year —"
                                            :menu-props="{ top: false, offsetY: true }"
                                        ></v-select>
                                    </div>
                                    <div v-if="fieldset.type === 'select-depended' && formData.bankSelection" class="app_form_select" style="z-index: 9;">
                                        <label>{{fieldset.label}}</label>
                                        <v-select
                                            v-model="fieldset.value"
                                            :items="fieldset.options"
                                            outlined
                                            color="#F7B733"
                                            item-color="#F7B733"
                                            append-icon="mdi-chevron-down"
                                            placeholder="— Select bank —"
                                            :menu-props="{ top: false, offsetY: true, contentClass: 'bank-selection' }"
                                        ></v-select>
                                    </div>
                                </div>
                                <div
                                    v-if="formData.isBankSelected"
                                    class="app_form_fieldset"
                                >
                                    <p class="app_form_bank-description">
                                        {{formData.forms[3].bankExt.bankData.description}}
                                    </p>
                                    <ul class="app_form_bank-account">
                                        <li
                                            v-for="(ac, index) in formData.bankExtSelected"
                                            :key="index"
                                        >{{ac}}</li>
                                    </ul>
                                </div>
                            </div>
                            <div class="app_form_control">
                                <v-btn
                                    :disabled="
                                        !formData.validation[3] ||
                                        !formData.forms[3].fieldsets[1].value ||
                                        (this.formData.bankSelection ? !formData.forms[3].fieldsets[3].value : false)
                                    "
                                    depressed
                                    color="#1d1d1d"
                                    class="button_color advantage_button"
                                    @click="submitForms()"
                                >
                                    {{ formButtons[1] }}
                                </v-btn>
                            </div>
                        </v-form>
                        <div v-show="formData.step === 4" class="app_form_step">
                            <div class="app_form_step_datalist"></div>
                            <div class="app_form_control">
                                <a
                                    :href="siteUrl"
                                    class="button_color advantage_button w-inline-block app_form_go_home"
                                >
                                    <div class="button_color_wrapp">
                                        <div class="text-block-4">
                                            {{ formButtons[2] }}
                                        </div>
                                    </div>
                                </a>
                            </div>
                        </div>
                    </div>
                </div>
            </v-app>
            `,

            data () {
                return {
                    navigation: [
                        'Introduction',
                        'Step 1. Contact information',
                        'Step 2. Validate your ID',
                        'Step 3. Deposit details',
                        'Success'
                    ],
                    formTitle: 'Fixed Deposit Application',
                    formDescription: '',
                    currency: ['TT$', '$'],
                    formButtons: ['Next step', 'Submit', 'Go home'],
                    switcherVariants: ['You', 'Co-applicant'],
                    siteUrl: 'https://massy-finance.webflow.io/fixed-deposits',
                    maxYears: 5,

                    success: false,
                    percentsAmount: '0%',
                    yearsAmount: '1 year',

                    isIDValid: false,
                    isMobileDotsDisabled: true,
                    formResizeFlag: false,
                    
                    formCalcData: {
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
                        }
                    },

                    formData: {
                        step: 0,
                        enteredName: '',
                        selectedCurrency: 'TT$',
                        validation: [false, false, false, false],
                        bankSelection: false,
                        isBankSelected: false,
                        isIDInvalid: {
                            f: true,
                            s: true
                        },
                        bankExtSelected: [],
                        forms: [
                            {
                                fieldsets: [
                                    {
                                        type: 'radio',
                                        radio: [
                                            {
                                                value: 'TT-dollar fixed deposit'
                                            },
                                            {
                                                value: 'US-dollar fixed deposit'
                                            }
                                        ],
                                        label: 'What kind of fixed deposit do you want to open?',
                                        value: ''
                                    },
                                    {
                                        type: 'radio',
                                        radio: [
                                            {
                                                value: 'Just me'
                                            },
                                            {
                                                value: 'Me and another person'
                                            }
                                        ],
                                        label: 'Who will own this fixed deposit?',
                                        value: ''
                                    }
                                ]
                            },
                            {
                                self: {
                                    fieldsets: [
                                        {
                                            type: 'input-short',
                                            inputs: [
                                                {
                                                    type: 'text',
                                                    value: '',
                                                    placeholder: 'First name',
                                                    label: 'Your first name',
                                                    rules: [
                                                        v => !!v || 'Please, fill in the field'
                                                    ]
                                                },
                                                {
                                                    type: 'text',
                                                    value: '',
                                                    placeholder: 'Last name',
                                                    label: 'Your last name',
                                                    rules: [
                                                        v => !!v || 'Please, fill in the field'
                                                    ]
                                                }
                                            ]
                                        },
                                        {
                                            type: 'input-long',
                                            inputs: [
                                                {
                                                    type: 'email',
                                                    value: '',
                                                    placeholder: 'email@mail.com',
                                                    rules: [
                                                        v => !!v || 'Please, fill in the field',
                                                        v => /.+@.+\..+/.test(v) || 'E-mail must be valid',
                                                        v => v.length <= 254 || 'Too long E-mail'
                                                    ]
                                                }
                                            ],
                                            label: 'Your email',
                                        },
                                        {
                                            type: 'input-short',
                                            inputs: [
                                                {
                                                    type: 'number',
                                                    value: '',
                                                    placeholder: 'Enter number',
                                                    label: 'Contact number',
                                                    rules: [
                                                        v => !!v || 'Please, fill in the field'
                                                    ]
                                                },
                                                {
                                                    type: 'number',
                                                    value: '',
                                                    placeholder: 'Enter alternate number',
                                                    label: 'Alternate contact number',
                                                    rules: []
                                                }
                                            ]
                                        },
                                        {
                                            type: 'input-short',
                                            inputs: [
                                                {
                                                    type: 'text',
                                                    value: '',
                                                    placeholder: 'Address',
                                                    label: 'Enter address',
                                                    rules: [
                                                        v => !!v || 'Please, fill in the field'
                                                    ]
                                                },
                                                {
                                                    variant: 'date',
                                                    type: 'text',
                                                    value: {
                                                        calendar: false,
                                                        date: '',
                                                        dateFormatted: ''
                                                    },
                                                    placeholder: 'DD/MM/YYYY',
                                                    label: 'Date of birth',
                                                    rules: []
                                                }
                                            ]
                                        }
                                    ]
                                },
                                applicant: {
                                    fieldsets: [
                                        {
                                            type: 'input-short',
                                            inputs: [
                                                {
                                                    type: 'text',
                                                    value: '',
                                                    placeholder: 'First name',
                                                    label: 'Co-applicant first name',
                                                    rules: [
                                                        v => !!v || 'Please, fill in the field'
                                                    ]
                                                },
                                                {
                                                    type: 'text',
                                                    value: '',
                                                    placeholder: 'Last name',
                                                    label: 'Co-applicant last name',
                                                    rules: [
                                                        v => !!v || 'Please, fill in the field'
                                                    ]
                                                }
                                            ]
                                        },
                                        {
                                            type: 'input-long',
                                            inputs: [
                                                {
                                                    type: 'email',
                                                    value: '',
                                                    placeholder: 'email@mail.com',
                                                    rules: [
                                                        v => !!v || 'Please, fill in the field',
                                                        v => /.+@.+\..+/.test(v) || 'E-mail must be valid',
                                                        v => v.length <= 254 || 'Too long E-mail'
                                                    ]
                                                }
                                            ],
                                            label: 'Co-applicant email',
                                        },
                                        {
                                            type: 'input-short',
                                            inputs: [
                                                {
                                                    type: 'number',
                                                    value: '',
                                                    placeholder: 'Enter number',
                                                    label: 'Contact number',
                                                    rules: [
                                                        v => !!v || 'Please, fill in the field'
                                                    ]
                                                },
                                                {
                                                    type: 'number',
                                                    value: '',
                                                    placeholder: 'Enter alternate number',
                                                    label: 'Alternate contact number',
                                                    rules: []
                                                }
                                            ]
                                        },
                                        {
                                            type: 'input-short',
                                            inputs: [
                                                {
                                                    type: 'text',
                                                    value: '',
                                                    placeholder: 'Address',
                                                    label: 'Co-applicant enter address',
                                                    rules: [
                                                        v => !!v || 'Please, fill in the field'
                                                    ]
                                                },
                                                {
                                                    variant: 'date',
                                                    type: 'text',
                                                    value: {
                                                        calendar: false,
                                                        date: '',
                                                        dateFormatted: ''
                                                    },
                                                    placeholder: 'DD/MM/YYYY',
                                                    label: 'Co-applicant date of birth',
                                                    rules: []
                                                }
                                            ]
                                        }
                                    ]
                                }
                            },
                            {
                                self: {
                                    fieldsets: [
                                        {
                                            type: 'input-short',
                                            inputs: [
                                                {
                                                    type: 'text',
                                                    value: '',
                                                    placeholder: 'Enter ID number',
                                                    label: 'Your national ID',
                                                    rules: []
                                                },
                                                {
                                                    variant: 'date',
                                                    type: 'text',
                                                    value: {
                                                        calendar: false,
                                                        date: '',
                                                        dateFormatted: ''
                                                    },
                                                    placeholder: 'DD/MM/YYYY',
                                                    label: 'National ID expiry date',
                                                    rules: []
                                                }
                                            ]
                                        },
                                        {
                                            type: 'input-short',
                                            inputs: [
                                                {
                                                    type: 'text',
                                                    value: '',
                                                    placeholder: 'Enter permit number',
                                                    label: 'Driver\'s permit',
                                                    rules: []
                                                },
                                                {
                                                    variant: 'date',
                                                    type: 'text',
                                                    value: {
                                                        calendar: false,
                                                        date: '',
                                                        dateFormatted: ''
                                                    },
                                                    placeholder: 'DD/MM/YYYY',
                                                    label: 'Driver\'s permit expiry date',
                                                    rules: []
                                                }
                                            ]
                                        },
                                        {
                                            type: 'input-short',
                                            inputs: [
                                                {
                                                    type: 'text',
                                                    value: '',
                                                    placeholder: 'Enter passport number',
                                                    label: 'Passport number',
                                                    rules: []
                                                },
                                                {
                                                    variant: 'date',
                                                    type: 'text',
                                                    value: {
                                                        calendar: false,
                                                        date: '',
                                                        dateFormatted: ''
                                                    },
                                                    placeholder: 'DD/MM/YYYY',
                                                    label: 'Passport\'s expiry date',
                                                    rules: []
                                                }
                                            ]
                                        }
                                    ]
                                },
                                applicant: {
                                    fieldsets: [
                                        {
                                            type: 'input-short',
                                            inputs: [
                                                {
                                                    type: 'text',
                                                    value: '',
                                                    placeholder: 'Enter ID number',
                                                    label: 'Co-applicant national ID',
                                                    rules: []
                                                },
                                                {
                                                    variant: 'date',
                                                    type: 'text',
                                                    value: {
                                                        calendar: false,
                                                        date: '',
                                                        dateFormatted: ''
                                                    },
                                                    placeholder: 'DD/MM/YYYY',
                                                    label: 'National ID expiry date',
                                                    rules: []
                                                }
                                            ]
                                        },
                                        {
                                            type: 'input-short',
                                            inputs: [
                                                {
                                                    type: 'text',
                                                    value: '',
                                                    placeholder: 'Enter permit number',
                                                    label: 'Co-applicant driver\'s permit',
                                                    rules: []
                                                },
                                                {
                                                    variant: 'date',
                                                    type: 'text',
                                                    value: {
                                                        calendar: false,
                                                        date: '',
                                                        dateFormatted: ''
                                                    },
                                                    placeholder: 'DD/MM/YYYY',
                                                    label: 'Driver\'s permit expiry date',
                                                    rules: []
                                                }
                                            ]
                                        },
                                        {
                                            type: 'input-short',
                                            inputs: [
                                                {
                                                    type: 'text',
                                                    value: '',
                                                    placeholder: 'Enter passport number',
                                                    label: 'Passport number',
                                                    rules: []
                                                },
                                                {
                                                    variant: 'date',
                                                    type: 'text',
                                                    value: {
                                                        calendar: false,
                                                        date: '',
                                                        dateFormatted: ''
                                                    },
                                                    placeholder: 'DD/MM/YYYY',
                                                    label: 'Co-applicant passport\'s expiry date',
                                                    rules: []
                                                }
                                            ]
                                        }
                                    ]
                                }
                            },
                            {
                                fieldsets: [
                                    {
                                        type: 'input-long',
                                        inputs: [
                                            {
                                                type: 'text',
                                                value: '',
                                                placeholder: '5,000',
                                                validation: true,
                                                rules: [
                                                    v => !!v || 'Please, fill in the field',
                                                    v => (v.toString().split('.').join('').split(',').join('').split(' ').join('') >= 5000) || (this.formData.selectedCurrency === 'TT$' ? 'Deposit can\'t be less than TT$5,000' : 'Deposit can\'t be less than $5,000'),
                                                    v => (v.toString().split('.').join('').split(',').join('').split(' ').join('') <= 10000000) || (this.formData.selectedCurrency === 'TT$' ? 'Deposit can\'t be more than TT$10,000,000' : 'Deposit can\'t be more than $10,000,000')
                                                ]
                                            }
                                        ],
                                        label: 'How much do you want to save? Enter any amount from TT$5,000.',
                                    },
                                    {
                                        type: 'select',
                                        options: [
                                            {
                                                text: '1 year',
                                                value: 1
                                            },
                                            {
                                                text: '2 years',
                                                value: 2
                                            },
                                            {
                                                text: '3 years',
                                                value: 3
                                            },
                                            {
                                                text: '4 years',
                                                value: 4
                                            },
                                            {
                                                text: '5 years',
                                                value: 5
                                            }
                                        ],
                                        label: 'How long do you want to save for? You\'ll earn higher rates the longer you lock in your investment.',
                                        value: ''
                                    },
                                    {
                                        type: 'radio',
                                        radio: [
                                            {
                                                value: 'I prefer to visit your office to pay with a debit (LINX) card or manager\'s cheque'
                                            },
                                            {
                                                value: 'I want to transfer money to Massy Finance via mobile or online banking'
                                            }
                                            
                                        ],
                                        label: 'Almost done. How would you like to fund your deposit?',
                                        value: ''
                                    },
                                    {
                                        type: 'select-depended',
                                        options: [
                                            {
                                                text: 'RBC Bank',
                                                value: 'RBC Bank'
                                            },
                                            {
                                                text: 'First Citizens',
                                                value: 'First Citizens'
                                            },
                                            {
                                                text: 'Scotiabank',
                                                value: 'Scotiabank'
                                            }
                                        ],
                                        label: 'Okay, select the bank you want to use to transfer your funds.',
                                        value: ''
                                    }
                                ],
                                bankExt: {
                                    bankData: {
                                        description: 'Here\'s our bank transfer information. Please complete the transfer and upload a photo as proof of payment. Then hit the submit button and we\'re all done.',
                                        account: {
                                            'RBC Bank': [
                                                'Account name: RBC Royal Bank Limited',
                                                'Account number TTD: 100004011219268',
                                                'Account number USD: 100018010721494',
                                                'Account number EURO: 110000003624787',
                                                'Address: 55 Independence Square, Port of Spain'
                                            ],
                                            'First Citizens': [
                                                'Account name: First Citizens Bank Limited',
                                                'Account number TTD: 2275264',
                                                'Account number USD: 2275263',
                                                'Address: 50 St. Vincent Street, Port of Spain'
                                            ],
                                            'Scotiabank': [
                                                'Account name: Scotiabank of Trinidad & Tobago Limited',
                                                'Account number TTD: 748151206487',
                                                'Account number USD: 748151207870',
                                                'Account number CAD: 748151208318',
                                                'Corner Richmond and Park Street, Port of Spain'
                                            ]
                                        }
                                    }
                                }
                            }
                        ]
                    },

                    readyFormData: {fileUploads: {}},

                    switcher: {
                        f: 0,
                        s: 0
                    },
                    isSwitcher: [false, false],
                    switcherValidation: {
                        youF: false,
                        applicantF: false,
                        youS: false,
                        applicantS: false
                    }
                }
            },

            mounted () {
                window.addEventListener('resize', this.onFormResize)
                window.addEventListener('orientationchange', this.onFormResize)
                this.setStep(0)

                // this.preloadFormStep()
            },

            watch: {
                formData: {
                    deep: true,
                    handler: function (val) {
                        // step 1

                        if (
                            this.formData.step === 1 &&
                            this.formData.forms[0].fieldsets[1].value === this.formData.forms[0].fieldsets[1].radio[1].value
                        ) {
                            this.isSwitcher[0] = true

                            const youFChecker = []
                            const applicantFChecker = []
                            this.formData.forms[1].self.fieldsets.forEach(fieldset => {
                                fieldset.inputs.forEach(input => {
                                    if (input.value && input.value !== '' && typeof input.value !== 'object') {
                                        youFChecker.push(true)
                                    } else if (input.value && typeof input.value === 'object') {
                                        if (input.value.dateFormatted && input.value.dateFormatted !== '') {
                                            youFChecker.push(true)
                                        } else {
                                            youFChecker.push(false)
                                        }
                                    } else {
                                        youFChecker.push(false)
                                    }
                                })
                            })

                            if (!youFChecker.some(v => v === false)) {
                                this.switcherValidation.youF = true
                            } else {
                                this.switcherValidation.youF = false
                            }

                            this.formData.forms[1].applicant.fieldsets.forEach(fieldset => {
                                fieldset.inputs.forEach(input => {
                                    if (input.value && input.value !== '' && typeof input.value !== 'object') {
                                        applicantFChecker.push(true)
                                    } else if (input.value && typeof input.value === 'object') {
                                        if (input.value.dateFormatted && input.value.dateFormatted !== '') {
                                            applicantFChecker.push(true)
                                        } else {
                                            applicantFChecker.push(false)
                                        }
                                    } else {
                                        applicantFChecker.push(false)
                                    }
                                })
                            })

                            if (!applicantFChecker.some(v => v === false)) {
                                this.switcherValidation.applicantF = true
                            } else {
                                this.switcherValidation.applicantF = false
                            }
                        } else {
                            this.isSwitcher[0] = false
                        }

                        this.formData.forms[1].self.fieldsets[3].inputs[1].value.dateFormatted = this.formatDate(this.formData.forms[1].self.fieldsets[3].inputs[1].value.date)
                        this.formData.forms[1].applicant.fieldsets[3].inputs[1].value.dateFormatted = this.formatDate(this.formData.forms[1].applicant.fieldsets[3].inputs[1].value.date)

                        if (this.formData.forms[0].fieldsets[0].value) {
                            this.formData.selectedCurrency = this.formData.forms[0].fieldsets[0].value === 'US-dollar fixed deposit' ? this.currency[1] : this.currency[0]
                        } else {
                            this.formData.selectedCurrency = this.currency[0]
                        }

                        this.formData.enteredName = this.formData.forms[1].self.fieldsets[0].inputs[0].value

                        // step 2
                        
                        if (
                            this.formData.step === 2 &&
                            this.formData.forms[0].fieldsets[1].value === this.formData.forms[0].fieldsets[1].radio[1].value
                        ) {
                            this.isSwitcher[1] = true

                            const youSChecker = []
                            const applicantSChecker = []
                            this.formData.forms[2].self.fieldsets.forEach(fieldset => {
                                fieldset.inputs.forEach(input => {
                                    if (input.value && input.value !== '' && typeof input.value !== 'object') {
                                        applicantSChecker.push(true)
                                    } else if (input.value && typeof input.value === 'object') {
                                        if (input.value.dateFormatted && input.value.dateFormatted !== '') {
                                            youSChecker.push(true)
                                        } else {
                                            youSChecker.push(false)
                                        }
                                    } else {
                                        youSChecker.push(false)
                                    }
                                })
                            })

                            if (!youSChecker.some(v => v === false)) {
                                this.switcherValidation.youS = true
                            } else {
                                this.switcherValidation.youS = false
                            }

                            this.formData.forms[2].applicant.fieldsets.forEach(fieldset => {
                                fieldset.inputs.forEach(input => {
                                    if (input.value && input.value !== '' && typeof input.value !== 'object') {
                                        applicantSChecker.push(true)
                                    } else if (input.value && typeof input.value === 'object') {
                                        if (input.value.dateFormatted && input.value.dateFormatted !== '') {
                                            applicantSChecker.push(true)
                                        } else {
                                            applicantSChecker.push(false)
                                        }
                                    } else {
                                        applicantSChecker.push(false)
                                    }
                                })
                            })

                            if (!applicantSChecker.some(v => v === false)) {
                                this.switcherValidation.applicantS = true
                            } else {
                                this.switcherValidation.applicantS = false
                            }

                            if (
                                (this.formData.forms[2].self.fieldsets[0].inputs[0].value) &&
                                (this.formData.forms[2].self.fieldsets[1].inputs[0].value) ||
                                (this.formData.forms[2].self.fieldsets[0].inputs[0].value) &&
                                (this.formData.forms[2].self.fieldsets[2].inputs[0].value) ||
                                (this.formData.forms[2].self.fieldsets[1].inputs[0].value) &&
                                (this.formData.forms[2].self.fieldsets[2].inputs[0].value)
                            ) {
                                this.formData.isIDInvalid.f = false
                            } else {
                                this.formData.isIDInvalid.f = true
                            }

                            if (
                                (this.formData.forms[2].applicant.fieldsets[0].inputs[0].value) &&
                                (this.formData.forms[2].applicant.fieldsets[1].inputs[0].value) ||
                                (this.formData.forms[2].applicant.fieldsets[0].inputs[0].value) &&
                                (this.formData.forms[2].applicant.fieldsets[2].inputs[0].value) ||
                                (this.formData.forms[2].applicant.fieldsets[1].inputs[0].value) &&
                                (this.formData.forms[2].applicant.fieldsets[2].inputs[0].value)
                            ) {
                                this.formData.isIDInvalid.s = false
                            } else {
                                this.formData.isIDInvalid.s = true
                            }

                            if (!this.formData.isIDInvalid.f && !this.formData.isIDInvalid.s) {
                                this.isIDValid = true
                                this.formData.validation[2] = true
                            } else {
                                this.isIDValid = false
                                this.formData.validation[2] = false
                            }
                        } else {
                            this.isSwitcher[1] = false

                            if (
                                (this.formData.forms[2].self.fieldsets[0].inputs[0].value) &&
                                (this.formData.forms[2].self.fieldsets[1].inputs[0].value) ||
                                (this.formData.forms[2].self.fieldsets[0].inputs[0].value) &&
                                (this.formData.forms[2].self.fieldsets[2].inputs[0].value) ||
                                (this.formData.forms[2].self.fieldsets[1].inputs[0].value) &&
                                (this.formData.forms[2].self.fieldsets[2].inputs[0].value)
                            ) {
                                this.formData.isIDInvalid.f = false
                                this.isIDValid = true
                                this.formData.validation[2] = true
                            } else {
                                this.formData.isIDInvalid.f = true
                                this.isIDValid = false
                                this.formData.validation[2] = false
                            }
                        }

                        this.formData.forms[2].self.fieldsets[0].inputs[1].value.dateFormatted = this.formatDate(this.formData.forms[2].self.fieldsets[0].inputs[1].value.date)
                        this.formData.forms[2].self.fieldsets[1].inputs[1].value.dateFormatted = this.formatDate(this.formData.forms[2].self.fieldsets[1].inputs[1].value.date)
                        this.formData.forms[2].self.fieldsets[2].inputs[1].value.dateFormatted = this.formatDate(this.formData.forms[2].self.fieldsets[2].inputs[1].value.date)
                        
                        this.formData.forms[2].applicant.fieldsets[0].inputs[1].value.dateFormatted = this.formatDate(this.formData.forms[2].applicant.fieldsets[0].inputs[1].value.date)
                        this.formData.forms[2].applicant.fieldsets[1].inputs[1].value.dateFormatted = this.formatDate(this.formData.forms[2].applicant.fieldsets[1].inputs[1].value.date)
                        this.formData.forms[2].applicant.fieldsets[2].inputs[1].value.dateFormatted = this.formatDate(this.formData.forms[2].applicant.fieldsets[2].inputs[1].value.date)
                        
                        // step 3

                        if (
                            this.formData.step === 3 &&
                            this.formData.forms[3].fieldsets[2].value === 'I want to transfer money to Massy Finance via mobile or online banking'
                        ) {
                            this.formData.bankSelection = true
                        } else {
                            this.formData.bankSelection = false
                        }
                        
                        if (
                            this.formData.step === 3 &&
                            this.formData.forms[3].fieldsets[3].value
                        ) {
                            this.formData.isBankSelected = true
                        } else {
                            this.formData.isBankSelected = false
                        }

                        if (this.formData.enteredName) {
                            this.formData.forms[3].fieldsets[3].label = `Okay ${this.formData.enteredName}, select the bank you want to use to transfer your funds.`
                        } else {
                            this.formData.forms[3].fieldsets[3].label = `Okay, select the bank you want to use to transfer your funds.`
                        }

                        if (this.formData.selectedCurrency && this.formData.selectedCurrency === this.currency[0]) {
                            this.formData.forms[3].fieldsets[0].label = `How much do you want to save? Enter any amount from TT$5,000.`
                        } else if (this.formData.selectedCurrency && this.formData.selectedCurrency === this.currency[1]) {
                            this.formData.forms[3].fieldsets[0].label = `How much do you want to save? Enter any amount from $5,000.`
                        } else {
                            this.formData.forms[3].fieldsets[0].label = `How much do you want to save? Enter any amount from TT$5,000.`
                        }

                        // bank extension

                        if (this.formData.step === 3) {
                            if (this.formData.forms[3].fieldsets[3].value) {
                                this.formData.bankExtSelected = this.formData.forms[3].bankExt.bankData.account[this.formData.forms[3].fieldsets[3].value]
                            }
                        }
                    }
                },

                'switcher.f' (val) {
                    this.setDescription(1)
                },

                'switcher.s' (val) {
                    this.setDescription(2)
                }
            },

            methods: {
                setStep (n) {
                    this.formData.step = n
                    this.setDescription(n)
                },

                setDescription (n) {
                    switch (n) {
                        case 0:
                            this.formDescription = `Great decision to save. Let's get started.`
                            break
                        case 1:
                            if (this.switcher.f === 0) {
                                this.formDescription = `Okay, enter your information below.`
                            } else if (this.formData.enteredName && this.switcher.f === 1) {
                                this.formDescription = `Okay, <span>${this.formData.enteredName}</span>, enter your co-applicant information here.`
                            } else {
                                this.formDescription = `Okay, enter your co-applicant information here.`
                            }
                            
                            break
                        case 2:
                            if (this.formData.enteredName && this.switcher.s === 0) {
                                this.formDescription = `Great so far, <span>${this.formData.enteredName}</span>. Now we'll need two forms of valid picture ID. Enter your ID details below then upload a photo of each.`
                            } else if (this.formData.enteredName && this.switcher.s === 1) {
                                this.formDescription = `Okay, <span>${this.formData.enteredName}</span>. Now we'll need two forms of co-applicant valid picture ID. Enter his ID details below then upload a photo of each.`
                            } else {
                                this.formDescription = `Great so far. Now we'll need two forms of valid picture ID. Enter your ID details below then upload a photo of each.`
                            }

                            break
                        case 3:
                            if (this.formData.enteredName) {
                                this.formDescription = `Okay, <span>${this.formData.enteredName}</span>, let's get your deposit details.`
                            } else {
                                this.formDescription = `Okay, let's get your deposit details.`
                            }

                            break
                        case 4:
                            if (this.formData.enteredName) {
                                this.formTitle = `Great work, ${this.formData.enteredName}!`
                            } else {
                                this.formTitle = `Great work!`
                            }

                            this.formDescription = `You will earn ${this.percentsAmount} on your investment over ${this.yearsAmount}. A Massy Finance investment advisor will contact you to complete the application and hand over your certificate of deposit.`
                            break
                    }
                },

                switchVariant (index, j) {
                    if (j === 0) {
                        this.switcher.f = index
                        const blob1 = this.$refs.appFormSwitcherBlob1

                        if (this.switcher.f === 0) {
                            blob1.style.transform = 'translateX(0)'
                        } else {
                            blob1.style.transform = 'translateX(calc(100% - 4px))'
                        }
                    } else if (j === 1) {
                        this.switcher.s = index
                        const blob2 = this.$refs.appFormSwitcherBlob2

                        if (this.switcher.s === 0) {
                            blob2.style.transform = 'translateX(0)'
                        } else {
                            blob2.style.transform = 'translateX(calc(100% - 4px))'
                        }
                    } else {
                        return
                    }
                },

                formatDate (date) {
                    if (!date) return null
            
                    const [year, month, day] = date.split('-')
                    return `${day}/${month}/${year}`
                },

                parseDate (date) {
                    if (!date) return null
            
                    const [month, day, year] = date.split('/')
                    return `${year}-${month.padStart(2, '0')}-${day.padStart(2, '0')}`
                },

                cleanDepositString () {
                    const cleaned = Number(this.formData.forms[3].fieldsets[0].inputs[0].value.replace(/[^0-9]/g, ''))
                    const bitten = this.depositBitNumber(cleaned)

                    this.formData.forms[3].fieldsets[0].inputs[0].value = bitten
                },

                depositBitNumber (num) {
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

                setMobileNavState (i, step) {
                    if (window.innerWidth <= 1070) {
                        if (step === 0 || step === 1) {
                            this.isMobileDotsDisabled = true

                            if (
                                i === 0 ||
                                i === 1 ||
                                i === 4
                            ) {
                                return true
                            } else {
                                return false
                            }
                        }

                        if (step === 2) {
                            this.isMobileDotsDisabled = false

                            if (
                                i === 0 ||
                                i === 2 ||
                                i === 4
                            ) {
                                return true
                            } else {
                                return false
                            }
                        }

                        if (step === 3 || step === 4) {
                            this.isMobileDotsDisabled = false

                            if (
                                i === 0 ||
                                i === 3 ||
                                i === 4
                            ) {
                                return true
                            } else {
                                return false
                            }
                        }
                    }

                    return true
                },

                setMobileDropdown (i, step) {
                    if (window.innerWidth <= 1070) {
                        if (step === 0 || step === 1) {
                            if (
                                i === 2 ||
                                i === 3
                            ) {
                                return true
                            } else {
                                return false
                            }
                        }

                        if (step === 2) {
                            if (
                                i === 1 ||
                                i === 3
                            ) {
                                return true
                            } else {
                                return false
                            }
                        }

                        if (step === 3 || step === 4) {
                            if (
                                i === 1 ||
                                i === 2
                            ) {
                                return true
                            } else {
                                return false
                            }
                        }
                    }

                    return
                },

                setDotsOrder (step) {
                    if (window.innerWidth <= 1070) {
                        if (step === 0 || step === 1) {
                            return 2
                        }

                        if (step === 2 || step === 3 || step === 4) {
                            return 1
                        }
                    }

                    return
                },

                navMobileCrop (nav) {
                    if (window.innerWidth <= 1070) {
                        if (nav.indexOf('.') !== -1) {
                            return nav.substr(0, nav.indexOf('.'))
                        }
                    }

                    return nav
                },

                onFormResize () {
                    this.formResizeFlag = !this.formResizeFlag
                },

                // preloadFormStep () {
                //     if (
                //         window.location.search &&
                //         window.location.search.includes('dep')
                //     ) {
                //         const croppedStr = window.location.search.slice(5)
                        
                //         if (croppedStr === 'individual') {
                //             this.formData.forms[0].fieldsets[0].value = 'TT-dollar fixed deposit'
                //             this.formData.forms[0].fieldsets[1].value = 'Just me'

                //             this.setStep(1)
                //         } else if (croppedStr === 'joint') {
                //             this.formData.forms[0].fieldsets[0].value = 'TT-dollar fixed deposit'
                //             this.formData.forms[0].fieldsets[1].value = 'Me and another person'

                //             this.setStep(1)
                //         }
                //     }

                //     return
                // },

                async onFileAttach (file) {
                    const fileUrl = defineFileInStorage(file).then(result => {
                        this.readyFormData.fileUploads['File'] = result
                    })
                },

                submitForms () {
                    const data = {
                        name: 'Fixed Deposit Application',
                        source: window.location.href + '/',
                        test: false,
                        fields: {},
                        dolphin: false
                    }

                    const isInvalid = this.formData.validation.some(form => !form)
                    const isCoApplicant = this.formData.forms[0].fieldsets[1].value === this.formData.forms[0].fieldsets[1].radio[1].value

                    // introduction

                    data.fields['Deposit type'] = this.formData.forms[0].fieldsets[0].value || ''
                    data.fields['Deposit owners'] = this.formData.forms[0].fieldsets[1].value || ''

                    // Step 1

                    data.fields['First name'] = this.formData.forms[1].self.fieldsets[0].inputs[0].value || ''
                    data.fields['Last name'] = this.formData.forms[1].self.fieldsets[0].inputs[1].value || ''
                    data.fields['Your E-mail'] = this.formData.forms[1].self.fieldsets[1].inputs[0].value || ''
                    data.fields['Contact number'] = this.formData.forms[1].self.fieldsets[2].inputs[0].value || ''
                    if (this.formData.forms[1].self.fieldsets[2].inputs[1].value) {
                        data.fields['Alternate contact number'] = this.formData.forms[1].self.fieldsets[2].inputs[1].value || ''
                    }
                    data.fields['Enter address'] = this.formData.forms[1].self.fieldsets[3].inputs[0].value || ''
                    data.fields['Date of birth'] = this.formData.forms[1].self.fieldsets[3].inputs[1].value.dateFormatted || ''
                    if (isCoApplicant) {
                        data.fields['Co-applicant first name'] = this.formData.forms[1].applicant.fieldsets[0].inputs[0].value || ''
                        data.fields['Co-applicant last name'] = this.formData.forms[1].applicant.fieldsets[0].inputs[1].value || ''
                        data.fields['Co-applicant E-mail'] = this.formData.forms[1].applicant.fieldsets[1].inputs[0].value || ''
                        data.fields['Co-applicant contact number'] = this.formData.forms[1].applicant.fieldsets[2].inputs[0].value || ''
                        if (this.formData.forms[1].applicant.fieldsets[2].inputs[1].value) {
                            data.fields['Co-applicant alternate contact number'] = this.formData.forms[1].applicant.fieldsets[2].inputs[1].value || ''
                        }
                        data.fields['Co-applicant address'] = this.formData.forms[1].applicant.fieldsets[3].inputs[0].value || ''
                        data.fields['Co-applicant date of birth'] = this.formData.forms[1].applicant.fieldsets[3].inputs[1].value.dateFormatted || ''
                    }

                    // Step 2

                    data.fields['Your national ID'] = this.formData.forms[2].self.fieldsets[0].inputs[0].value || ''
                    data.fields['National ID expiry date'] = this.formData.forms[2].self.fieldsets[0].inputs[1].value.dateFormatted || ''
                    data.fields['Driver\'s permit'] = this.formData.forms[2].self.fieldsets[1].inputs[0].value || ''
                    data.fields['Driver\'s permit expiry date'] = this.formData.forms[2].self.fieldsets[1].inputs[1].value.dateFormatted || ''
                    data.fields['Passport number'] = this.formData.forms[2].self.fieldsets[2].inputs[0].value || ''
                    data.fields['Passport\'s expiry date'] = this.formData.forms[2].self.fieldsets[2].inputs[1].value.dateFormatted || ''
                    if (isCoApplicant) {
                        data.fields['Co-applicant national ID'] = this.formData.forms[2].applicant.fieldsets[0].inputs[0].value || ''
                        data.fields['Co-applicant national ID expiry date'] = this.formData.forms[2].applicant.fieldsets[0].inputs[1].value.dateFormatted || ''
                        data.fields['Co-applicant driver\'s permit'] = this.formData.forms[2].applicant.fieldsets[1].inputs[0].value || ''
                        data.fields['Co-applicant driver\'s permit expiry dater'] = this.formData.forms[2].applicant.fieldsets[1].inputs[1].value.dateFormatted || ''
                        data.fields['Co-applicant passport number'] = this.formData.forms[2].applicant.fieldsets[2].inputs[0].value || ''
                        data.fields['Co-applicant passport\'s expiry date'] = this.formData.forms[2].applicant.fieldsets[2].inputs[1].value.dateFormatted || ''
                    }

                    // Step 3

                    data.fields['Saving amount'] = this.formData.forms[3].fieldsets[0].inputs[0].value || 5000
                    data.fields['Saving period'] = this.formData.forms[3].fieldsets[1].value || 1
                    data.fields['Fund way'] = this.formData.forms[3].fieldsets[2].value || ''
                    if (this.formData.forms[3].fieldsets[3].value) {
                        data.fields['Transfer way'] = this.formData.forms[3].fieldsets[3].value || ''
                    }

                    if (!isInvalid) {
                        if (this.formData.selectedCurrency === 'TT$') {
                            this.percentsAmount = this.formCalcData.massy.rangeTTD.filter(el => {
                                return el.years === this.formData.forms[3].fieldsets[1].value
                            })[0].value + '%'
                        }

                        if (this.formData.selectedCurrency === '$') {
                            this.percentsAmount = this.formCalcData.massy.rangeDLR.filter(el => {
                                return el.years === this.formData.forms[3].fieldsets[1].value
                            })[0].value + '%'
                        }

                        (() => {
                            if (this.formData.forms[3].fieldsets[1].value === 1) {
                                this.yearsAmount = this.formData.forms[3].fieldsets[1].value + ' year'
                            } else {
                                this.yearsAmount = this.formData.forms[3].fieldsets[1].value + ' years'
                            }
                        })()
                        
                        this.setStep(4)
                        this.success = true

                        const objConcat = Object.assign(this.readyFormData, data)
                        this.onSubmit()
                    }
                },

                onSubmit () {
                    sendFormData(this.readyFormData)
                }
            }
        }).$mount('#AppForm')
    }
})
