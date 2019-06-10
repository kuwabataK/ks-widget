import { Component, Prop, h, State, Watch, Event, EventEmitter } from '@stencil/core';
import interact from 'interactjs';

@Component({
  tag: 'ks-widget',
  styleUrl: 'ks-widget.css',
  shadow: false
})
export class KsWidget {

  private element?: HTMLElement

  @Prop() position: Position = {
    x: 0,
    y: 0,
    width: '100px',
    height: '100px'
  }
  @Watch('position')
  changePropPosition() {
    this._position = { ...this.position }
  }

  @Event() changePosition: EventEmitter

  @Prop() isLocked: boolean = false

  @Watch('isLocked')
  changeLocked() {
    if (this.isLocked) {
      this.disableInteract()
    } else {
      this.disableInteract()
      this.enableInteract()
    }
  }

  @State() _position: Position = {
    x: 0,
    y: 0,
    width: '100px',
    height: '100px'
  }

  componentWillLoad() {
    this._position = { ...this.position }
  }
  componentDidRender() {
    if (!this.isLocked) {
      this.enableInteract()
    }
  }

  componentDidUnload() {
    this.disableInteract()
  }

  private enableInteract() {
    interact(this.element).draggable({

      onmove: (event) => {
        // console.log(event)
        this._position.x = event.rect.left;
        this._position.y = event.rect.top;
        this._position = { ...this._position }
        this.changePosition.emit(this._position)
      },
    }).resizable({
      // resize from all edges and corners
      edges: { left: true, right: true, bottom: true, top: true },
      preserveAspectRatio: false,
      inertia: true,

    }).on('resizemove', (event) => {
      // console.log(event)

      this._position.width = event.rect.width + 'px';
      this._position.height = event.rect.height + 'px';
      this._position.x = event.rect.left;
      this._position.y = event.rect.top;
      this._position = { ...this._position }
      this.changePosition.emit(this._position)
    })
  }
  private disableInteract() {
    interact(this.element).unset();
  }

  private transformString() {
    return `translate3D(${this._position.x}px, ${this._position.y}px, 0)`;
  }

  private styleString() {
    return {
      transform: this.transformString(),
      width: this._position.width,
      height: this._position.height
    }
  }


  render() {
    return <div ref={el => this.element = el as HTMLElement}
      style={this.styleString()}
    ><slot />
    </div>;
  }
}

interface Position {
  x: number
  y: number
  width: string
  height: string
}