import { EventEmitter } from '../../stencil.core';
export declare class KsWidget {
    private element?;
    position: Position;
    changePropPosition(): void;
    changePosition: EventEmitter;
    isLocked: boolean;
    changeLocked(): void;
    _position: Position;
    componentWillLoad(): void;
    componentDidRender(): void;
    componentDidUnload(): void;
    private enableInteract;
    private disableInteract;
    private transformString;
    private styleString;
    render(): any;
}
interface Position {
    x: number;
    y: number;
    width: string;
    height: string;
}
export {};
