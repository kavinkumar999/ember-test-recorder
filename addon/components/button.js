import Component from '@glimmer/component';
import { action } from '@ember/object';
import { tracked } from '@glimmer/tracking';

export default class TestRecorderButtonComponent extends Component {
  @tracked position = { x: 0, y: 0 };
  @tracked isDragging = false;
  @tracked scale = 1;

  dragStartPosition = { x: 0, y: 0 };

  @action
  handleClick() {
    if (!this.isDragging) {
      this.args.onToggleSidebar();
    }
  }

  @action
  startDragging(event) {
    this.isDragging = true;
    this.dragStartPosition = {
      x: event.clientX - this.position.x,
      y: event.clientY - this.position.y
    };

    window.addEventListener('mousemove', this.drag);
    window.addEventListener('mouseup', this.stopDragging);
    window.addEventListener('wheel', this.handleScale);
  }

  drag = (event) => {
    if (this.isDragging) {
      this.position = {
        x: event.clientX - this.dragStartPosition.x,
        y: event.clientY - this.dragStartPosition.y
      };
    }
  };

  stopDragging = () => {
    this.isDragging = false;
    window.removeEventListener('mousemove', this.drag);
    window.removeEventListener('mouseup', this.stopDragging);
    window.removeEventListener('wheel', this.handleScale);
  };

  handleScale = (event) => {
    event.preventDefault();

    const delta = event.deltaY * -0.01;
    const newScale = Math.max(0.5, Math.min(2, this.scale + delta));
    this.scale = newScale;
  };

  get transformStyle() {
    return `translate3d(${this.position.x}px, ${this.position.y}px, 0) scale(${this.scale})`;
  }
}
