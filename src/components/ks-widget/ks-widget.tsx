import { Component, Prop, h, State } from '@stencil/core';
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

  @Prop() isLocked: boolean = false

  @State() _position: Position = {
    x: 0,
    y: 0,
    width: '100px',
    height: '100px'
  }

  /**
 * コンポーネントロード時発火する関数
 */
  componentDidRender() {
    this._position = this.position
    this.enableInteract()
  }


  private enableInteract() {
    interact(this.element).draggable({

      // スナップするための設定
      // modifiers: [
      //   interact.modifiers.snap({
      //     offset: { x: 20, y: 20 },
      //     range: Infinity,
      //     relativePoints: [{ x: 0, y: 0 }]
      //   }),
      // ],

      onmove: (event) => {
        // console.log(event)
        this._position.x = event.rect.left;
        this._position.y = event.rect.top;
        this._position = {...this._position}
      },
    }).resizable({
      // resize from all edges and corners
      edges: { left: true, right: true, bottom: true, top: true },
      preserveAspectRatio: false,
      inertia: true,

      // スナップするための設定
      // modifiers: [
      //   interact.modifiers.snap({
      //     targets: [
      //       interact.createSnapGrid({ x: 30, y: 30 })
      //     ],
      //     range: Infinity,
      //     relativePoints: [{ x: 0, y: 0 }]
      //   }),
      // ],

    }).on('resizemove', (event) => {
      // console.log(event)

      this._position.width = event.rect.width + 'px';
      this._position.height = event.rect.height + 'px';
      this._position.x = event.rect.left;
      this._position.y = event.rect.top;
      this._position = { ...this._position }
    })
  }
  disableInteract() {
    interact(this.element).unset();
  }

  private transformString() {
    return `translate3D(${this._position.x}px, ${this._position.y}px, 0)`;
  }

  styleString() {
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
      <h3>テスト</h3>
    </div>;
  }
}

interface Position {
  x: number
  y: number
  width: string
  height: string
}