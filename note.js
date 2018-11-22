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

        this.$emit('addNote', newNote);

        this.noteTitle = '';
        this.noteContent = '';
      }
    }
  }
});

// Note Section Component
Vue.component('note-section', {
  props: {
    notes: Array
  },
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
  `
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
      this.$emit('deleteNote', this.note);
    }
  }
});

const app = new Vue({
  el: '#app',
  data: {
    notes: []
  },
  methods: {
    handleUpdate(note) {
      this.notes.push(note);
      this.saveNotes(this.notes);
    },
    handleDelete(note) {
      let index = this.notes.indexOf(note);
      this.notes.splice(index, 1);
      this.saveNotes(this.notes);
    },
    saveNotes(notes) {
      localStorage.setItem('notes', JSON.stringify(notes));
    }
  },
  created() {
    this.notes = localStorage.getItem('notes') ? JSON.parse(localStorage.getItem('notes')) : [];
  }
});
