// Form Component
Vue.component('note-form', {
  template: `
    <div class="section">
      <div class="container">
        <div class="field">
          <label for="title" class="label">Title:</label>
          <div class="control">
            <input type="text" id="title" class="input" placeholder="Enter note title" v-model="noteTitle" />
          </div>
        </div>

        <div class="field">
          <label for="note" class="label">Note:</label>
          <div class="control">
            <textarea id="note" class="textarea has-fixed-size" placeholder="Enter note" v-model="noteContent"></textarea>
          </div>
        </div>

        <button class="button is-link" @click="addNote">Submit</button>
      </div>
    </div>
  `,
  data() {
    return {
      noteTitle: '',
      noteContent: ''
    };
  },
  methods: {
    addNote() {
      if (this.noteTitle && this.noteContent) {
        let newNote = {
          text: this.noteTitle,
          content: this.noteContent,
          date: new Date(Date.now()).toLocaleString()
        };

        store.commit('addNote', newNote);

        this.noteTitle = '';
        this.noteContent = '';
      }
    }
  }
});

// Note Section Component
Vue.component('note-section', {
  template: `
    <div class="section">
      <div class="container">
        <div class="columns is-multiline">
          <div class="column is-4" v-for="note in notes">
            <note-card 
              :note="note"
              :key="note.text"
            ></note-card>
          </div>
        </div>
      </div>
    </div>
  `,
  data() {
    return {
      notes: store.state.notes
    };
  }
});

// Note Card Component
Vue.component('note-card', {
  props: ['note'],
  template: `
  <article class="message">
    <div class="message-header">
      <p>{{ note.text }}</p>
      <button class="delete" @click="removeNote"></button>
    </div>

    <div class="message-body">
      <p>{{ note.date }}</p>

      <br>

      <p>{{ note.content }}</p>
    </div>
  </article>
  `,
  methods: {
    removeNote() {
      store.commit('deleteNote', this.note);
    }
  }
});

// Store Container
const store = new Vuex.Store({
  state: {
    notes: [
      {
        text: 'Check new reference chapter',
        content: 'See Chapter 45 for list of volatile liquids',
        date: new Date(Date.now()).toLocaleString()
      }
    ]
  },
  mutations: {
    addNote(state, note) {
      state.notes.push(note);
    },
    deleteNote(state, note) {
      let index = state.notes.indexOf(note);
      state.notes.splice(index, 1);
    }
  }
});

const app = new Vue({
  el: '#app'
});
