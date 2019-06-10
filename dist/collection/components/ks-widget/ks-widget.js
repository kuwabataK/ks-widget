import { h } from '@stencil/core';
import interact from 'interactjs';
export class KsWidget {
    constructor() {
        this.position = {
            x: 0,
            y: 0,
            width: '100px',
            height: '100px'
        };
        this.isLocked = false;
        this._position = {
            x: 0,
            y: 0,
            width: '100px',
            height: '100px'
        };
    }
    changePropPosition() {
        this._position = Object.assign({}, this.position);
    }
    changeLocked() {
        if (this.isLocked) {
            this.disableInteract();
        }
        else {
            this.disableInteract();
            this.enableInteract();
        }
    }
    componentWillLoad() {
        this._position = Object.assign({}, this.position);
    }
    componentDidLoad() {
        if (!this.isLocked) {
            this.enableInteract();
        }
    }
    componentDidUnload() {
        this.disableInteract();
    }
    enableInteract() {
        interact(this.element).draggable({
            onmove: (event) => {
                // console.log(event)
                this._position.x = event.rect.left;
                this._position.y = event.rect.top;
                this._position = Object.assign({}, this._position);
                this.changePosition.emit(this._position);
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
            this._position = Object.assign({}, this._position);
            this.changePosition.emit(this._position);
        });
    }
    disableInteract() {
        interact(this.element).unset();
    }
    transformString() {
        return `translate3D(${this._position.x}px, ${this._position.y}px, 0)`;
    }
    styleString() {
        return {
            transform: this.transformString(),
            width: this._position.width,
            height: this._position.height
        };
    }
    render() {
        return h("div", { ref: el => this.element = el, style: this.styleString() },
            h("slot", null));
    }
    static get is() { return "ks-widget"; }
    static get originalStyleUrls() { return {
        "$": ["ks-widget.css"]
    }; }
    static get styleUrls() { return {
        "$": ["ks-widget.css"]
    }; }
    static get properties() { return {
        "position": {
            "type": "unknown",
            "mutable": false,
            "complexType": {
                "original": "Position",
                "resolved": "Position",
                "references": {
                    "Position": {
                        "location": "global"
                    }
                }
            },
            "required": false,
            "optional": false,
            "docs": {
                "tags": [],
                "text": ""
            },
            "defaultValue": "{\n    x: 0,\n    y: 0,\n    width: '100px',\n    height: '100px'\n  }"
        },
        "isLocked": {
            "type": "boolean",
            "mutable": false,
            "complexType": {
                "original": "boolean",
                "resolved": "boolean",
                "references": {}
            },
            "required": false,
            "optional": false,
            "docs": {
                "tags": [],
                "text": ""
            },
            "attribute": "is-locked",
            "reflect": false,
            "defaultValue": "false"
        }
    }; }
    static get states() { return {
        "_position": {}
    }; }
    static get events() { return [{
            "method": "changePosition",
            "name": "changePosition",
            "bubbles": true,
            "cancelable": true,
            "composed": true,
            "docs": {
                "tags": [],
                "text": ""
            },
            "complexType": {
                "original": "any",
                "resolved": "any",
                "references": {}
            }
        }]; }
    static get watchers() { return [{
            "propName": "position",
            "methodName": "changePropPosition"
        }, {
            "propName": "isLocked",
            "methodName": "changeLocked"
        }]; }
}
