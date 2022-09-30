<template>
  <q-page padding>
    <div class="row gutter-sm">
      <div class="col-12">
        <q-select
          color="purple"
          v-model="select"
          float-label="Select Area"
          :options="selectOptions"
          @input="AreaInput"
        />
      </div>
      <div class="col-12" v-if="HomeCleaning['Basic Cleaning']">
        <q-card>
          <q-card-title>
            Basic Cleaning
          </q-card-title>
          <q-card-main>
            <p>Duration: {{HomeCleaning['Basic Cleaning'].duration}}</p>
            <p>wiSkiller: {{HomeCleaning['Basic Cleaning'].wiSkiller}}</p>
            <p class="text-faded">
              <span v-for="(b, index) in BasicCleaning" :key="index">
                * {{b}}<br/>
              </span>
            </p>
          </q-card-main>
          <q-card-actions>
            <q-btn
              @click="Service('Home Cleaning', 'Basic Cleaning', HomeCleaning['Basic Cleaning'].duration, HomeCleaning['Basic Cleaning'].wiSkiller)"
              outline
              class="full-width"
              rounded
              color="purple"
              label="Choose wiSkiller"
            />
          </q-card-actions>
        </q-card>
      </div>
      <div class="col-12" v-if="HomeCleaning['Bare Unit deep cleaning']">
        <q-card>
          <q-card-title>
            Bare Unit deep cleaning
          </q-card-title>
          <q-card-main>
            <p>Duration: {{HomeCleaning['Bare Unit deep cleaning'].duration}}</p>
            <p>wiSkiller: {{HomeCleaning['Bare Unit deep cleaning'].wiSkiller}}</p>
            <p class="text-faded">
              <span v-for="(b, index) in Bare" :key="index">
                * {{b}} <br/>
              </span>
              <span id="dots">...</span>
              <span id="more">
                <span v-for="(b, index) in Bare1" :key="index">
                  * {{b}} <br/>
                </span>
              </span>
            </p>
            <q-btn size="sm" @click.native="myFunction('dots', 'more', 'myBtn')" id="myBtn">Read details</q-btn>
          </q-card-main>
          <q-card-actions>
            <q-btn @click="$router.push('/map')" outline class="full-width" rounded color="purple" label="Choose wiSkiller" />
          </q-card-actions>
        </q-card>
      </div>
      <div class="col-12" v-if="HomeCleaning['Furnished Unit deep cleaning']">
        <q-card>
          <q-card-title>
            Furnished Unit deep cleaning
          </q-card-title>
          <q-card-main>
            <p>Duration: {{HomeCleaning['Furnished Unit deep cleaning'].duration}}</p>
            <p>wiSkiller: {{HomeCleaning['Furnished Unit deep cleaning'].wiSkiller}}</p>
            <p class="text-faded">
              <span v-for="(f, index) in Furnish" :key="index">
                * {{f}} <br/>
              </span>
              <span id="dots1">...</span>
              <span id="more1">
                <span v-for="(f, index) in Furnish1" :key="index">
                  * {{f}} <br/>
                </span>
              </span>
            </p>
            <q-btn size="sm" @click.native="myFunction('dots1', 'more1', 'myBtn1')" id="myBtn1">Read details</q-btn>
          </q-card-main>
          <q-card-actions>
            <q-btn @click="$router.push('/map')" outline class="full-width" rounded color="purple" label="Choose wiSkiller" />
          </q-card-actions>
        </q-card>
      </div>
      <div class="col-12" v-if="HomeCleaning['Move in / Move out deep cleaning']">
        <q-card>
          <q-card-title>
            Move in / Move out deep cleaning
          </q-card-title>
          <q-card-main>
            <p>Duration: {{HomeCleaning['Move in / Move out deep cleaning'].duration}}</p>
            <p>wiSkiller: {{HomeCleaning['Move in / Move out deep cleaning'].wiSkiller}}</p>
            <p class="text-faded">
              <span v-for="(d, index) in Deep" :key="index">
                * {{d}} <br/>
              </span>
              <span id="dots2">...</span>
              <span id="more2">
                <span v-for="(d, index) in Deep1" :key="index">
                  * {{d}} <br/>
                </span>
              </span>
            </p>
            <q-btn size="sm" @click.native="myFunction('dots2', 'more2', 'myBtn2')" id="myBtn2">Read details</q-btn>
          </q-card-main>
          <q-card-actions>
            <q-btn @click="$router.push('/map')" outline class="full-width" rounded color="purple" label="Choose wiSkiller" />
          </q-card-actions>
        </q-card>
      </div>
      <div class="col-12" v-if="HomeCleaning['Post construction deep cleaning']">
        <q-card>
          <q-card-title>
            Post construction deep cleaning
          </q-card-title>
          <q-card-main>
            <p>Duration: {{HomeCleaning['Post construction deep cleaning'].duration}}</p>
            <p>wiSkiller: {{HomeCleaning['Post construction deep cleaning'].wiSkiller}}</p>
            <p class="text-faded">
              <span v-for="(q, index) in Quick" :key="index">
                * {{q}} <br/>
              </span>
              <span id="dots3">...</span>
              <span id="more3">
                <span v-for="(q, index) in Quick1" :key="index">
                  * {{q}} <br/>
                </span>
              </span>
            </p>
            <q-btn size="sm" @click.native="myFunction('dots3', 'more3', 'myBtn3')" id="myBtn3">Read details</q-btn>
          </q-card-main>
          <q-card-actions>
            <q-btn @click="$router.push('/map')" outline class="full-width" rounded color="purple" label="Choose wiSkiller" />
          </q-card-actions>
        </q-card>
      </div>
    </div>
  </q-page>
</template>

<script>
import lodash from 'lodash'
export default {
  data () {
    return {
      Area: [],
      HomeCleaning: [],
      select: 'Area: 75-84 sqm',
      BasicCleaning: [
        'CAUTION:',
        'You provide Tools and Solutions to the Cleaner (wiSkiller)',
        'wiSkiller will perform cleaning task for you'
      ],
      Bare: [
        'CAUTION:',
        'Thorough cleaning of the unit',
        'Clean walls',
        'Dust ceilings'
      ],
      Bare1: [
        'Clean trim, baseboards, window frames, and doorframes',
        'Dust handrails, mantels, and other various woodwork',
        'Clean sides and tops of doors',
        'Remove any paint, mud, and debris from hinges',
        'Clean built in interiors (shelves, cabinets, etc)',
        'Clean light fixtures and bulbs',
        'Clean electrical switches and outlets',
        'Clean inside closets, inside cabinets, and on top of shelves',
        'Clean balcony, windows',
        'Clean kitchen',
        'Clean toilet / bathroom',
        'All sanitized with Signature solutions and treatment from selected Partner'
      ],
      Furnish: [
        'CAUTION',
        'Dust picture frames, knickknacks, ceiling fans, lamps, furniture, woodwork, shelves and baseboards',
        'Clean from ceiling to walls and mirrors',
        'Clean carpets or any other upholstered materials'
      ],
      Furnish1: [
        'Wash all floors and dry wood floors',
        'Empty and clean ashtrays and wastebaskets',
        'Clean windows',
        'If you want to change your bed sheets, just leave it by the bed and all with be done for you',
        'Cabinets can be cleaned with supervision of owner',
        'Clean Kitchen, Toilet, Laundry area.. (if any)',
        'All with Special Signature Cleaning Solutions and Treatment from selected Partner'
      ],
      Deep: [
        'CAUTION',
        'Clean walls',
        'Dust ceilings and ceiling fixtures',
        'Clean trim, baseboards, window frames, and doorframes'
      ],
      Deep1: [
        'Dust handrails, mantels, and other various woodwork',
        'Clean sides and tops of doors',
        'Remove any paint, mud, and debris from hinges',
        'Clean built in interiors (shelves, cabinets)',
        'Vacuum carpet',
        'Clean floors (may or may not include buffing, waxing, sealing)',
        'Clean windows and remove any stickers',
        'Clean light fixtures and bulbs',
        'Clean electrical switches and outlets',
        'Clean inside closets, cabinets and on top of shelves',
        'Remove drawers and clean underneath',
        'Clean blinds/shutters',
        'Remove and dispose of all trash',
        'Remove and dispose of any protective plastic film',
        'Clean Kitchen, Toilet, Laundry area and Pantry (if any)',
        'All with Special Signature Cleaning Solutions and Treatment from selected Partner'
      ],
      Quick: [
        'CAUTION',
        'You provide Tools and Solutions to the Cleaner (wiSkiller)',
        'Clean windows, baseboards',
        'Dust ceilings, walls and carpets'
      ],
      Quick1: [
        'Clean cabinets',
        'Clean floors'
      ]
    }
  },
  mounted () {
    this.$binding('Area', this.$firebaseapp.firestore().collection('HomeCleaning').orderBy('number'))
    this.$binding('HomeCleaning', this.$firebaseapp.firestore().collection('HomeCleaning').doc(this.select))
  },
  methods: {
    Service (serviceName, type, duration, wiSkiller, cost) {
      let service = {
        serviceName: serviceName,
        type: type,
        duration: duration,
        wiSkiller: wiSkiller,
        cost: 0
      }

      this.$store.commit('user/service', service)
      this.$router.push('/map')
    },
    AreaInput () {
      this.$binding('HomeCleaning', this.$firebaseapp.firestore().collection('HomeCleaning').doc(this.select))
    },
    myFunction (dot, more, btn) {
      var dots = document.getElementById(dot)
      var moreText = document.getElementById(more)
      var btnText = document.getElementById(btn)

      if (dots.style.display === 'none') {
        dots.style.display = 'inline'
        btnText.innerHTML = 'Read details'
        moreText.style.display = 'none'
      } else {
        dots.style.display = 'none'
        btnText.innerHTML = 'collapse'
        moreText.style.display = 'inline'
      }
    }
  },
  computed: {
    selectOptions () {
      let options = lodash.map(this.Area, data => {
        return {
          label: data['.key'],
          value: data['.key']
        }
      })
      return options
    }
  }
}
</script>

<style>
#more {
  display: none;
}
#more1 {
  display: none;
}
#more2 {
  display: none;
}
#more3 {
  display: none;
}
</style>
