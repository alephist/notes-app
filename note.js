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

        this.$emit('add-note', newNote);

        this.noteTitle = '';
        this.noteContent = '';
      }
    }
  }
});

// Note Section Component
Vue.component('note-section', {
  props: {
    list: {
      type: Array,
      required: true
    }
  },
  template: `
    <div class="section">
      <div class="container">
        <div class="columns is-multiline">
          <div class="column is-4" v-for="(item, index) in list" :key="item.text">
            <article class="message">
              <div class="message-header">
                <p>{{ item.text }}</p>
                <button class="delete" @click="removeNote(index)"></button>
              </div>
        
              <div class="message-body">
                <p>{{ item.date }}</p>
        
                <br>
        
                <p>{{ item.content }}</p>
              </div>
            </article>
          </div>
        </div>
      </div>
    </div>
  `,
  methods: {
    removeNote(index) {
      this.$emit('remove-note', index);
    }
  }
});

const app = new Vue({
  el: '#app',
  data: {
    notes: [
      {
        text: 'Check new reference chapter',
        content: 'See Chapter 45 for list of volatile liquids',
        date: new Date(Date.now()).toLocaleString()
      }
    ]
  },
  methods: {
    updateNotes(note) {
      this.notes.push(note);
    },
    deleteNote(index) {
      this.notes.splice(index, 1);
    }
  }
});
