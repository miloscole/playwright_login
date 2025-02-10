import { Controller } from "@hotwired/stimulus"

// Connects to data-controller="flash"
export default class extends Controller {
  static targets = ["progress"]
  defaultInterval = 50

  connect() {
    this.intervalId = setInterval(() => {
      this.progressTarget.value++;
    }, this.defaultInterval);

    this.timeoutId = setTimeout(() => {
      this.close()
    }, 100 * (this.defaultInterval + 1));
  }

  close() {
    this.element.remove()
  }

  disconnect() {
    clearInterval(this.intervalId);
    clearTimeout(this.timeoutId);
  }
}