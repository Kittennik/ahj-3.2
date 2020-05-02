export default class Tasks {
  constructor() {
    this.active = [];
    this.pinned = [];
    if (typeof document !== 'undefined') {
      this.all = document.getElementById('all');
      this.pin = document.getElementById('pinned');
    }
  }

  init() {
    if (typeof document !== 'undefined') {
      const textbox = document.querySelector('input.text-field');
      const form = textbox.parentNode;
      form.addEventListener('submit', (e) => {
        e.preventDefault();
        if (textbox.value === '') {
          document.querySelector('span.error').textContent = 'Enter task name';
        } else {
          this.addTask(textbox.value);
          document.querySelector('span.error').textContent = '';
          textbox.value = '';
        }
      });

      textbox.addEventListener('input', () => {
        const chars = textbox.value.toLowerCase();
        this.filter(chars);
      });
    }
  }

  addTask(text) {
    if (typeof document !== 'undefined') {
      if (text) this.active.push(text);
      this.active.length === 0 ? this.all.textContent = 'No tasks' : this.all.innerHTML = '';
      this.active.forEach((item) => {
        const task = `<div class="simple-task">${item}<div class="pin-button"> </div></div>`;
        this.all.insertAdjacentHTML('beforeEnd', task);
      });
      const pins = Array.from(document.getElementsByClassName('pin-button'));
      pins.forEach((item) => {
        item.addEventListener('click', (e) => {
          const textItem = e.target.parentNode.textContent;
          this.addPinned(textItem.substring(0, textItem.length - 1));
        });
      });
    }
  }

  addPinned(element) {
    if (typeof document !== 'undefined') {
      if (element) {
        this.pinned.push(element);
        const index = this.active.indexOf(element);
        this.active.splice(index, 1);
      }
      this.pinned.length === 0 ? this.pin.textContent = 'No pinned tasks' : this.pin.innerHTML = '';
      this.pinned.forEach((item) => {
        const task = `<div class="pinned-task">${item}<div class="unpin-button"> </div></div>`;
        this.pin.insertAdjacentHTML('beforeEnd', task);
      });
      const unpins = Array.from(document.getElementsByClassName('unpin-button'));
      unpins.forEach((item) => {
        item.addEventListener('click', (e) => {
          this.removePinned(e.target.parentNode.textContent);
        });
      });
      this.addTask(false);
    }
  }

  removePinned(element) {
    this.pinned.splice(this.pinned.indexOf(element), 1);
    this.active.push(element);
    this.addTask(false);
    this.addPinned(false);
  }

  filter(chars) {
    const sort = Array.from(this.all.children);
    sort.forEach((item) => {
      if (item.classList.contains('hidden')) item.classList.remove('hidden');
    });
    const sorted = sort.filter((elem) => elem.textContent.toLowerCase().indexOf(chars) === -1)
      .map((elem) => elem.textContent);
    sort.forEach((item) => {
      if (sorted.includes(item.textContent)) item.classList.add('hidden');
    });
  }
}
