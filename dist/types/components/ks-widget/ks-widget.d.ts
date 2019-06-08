export declare class KsWidget {
    private element?;
    position: Position;
    isLocked: boolean;
    _position: Position;
    /**
   * コンポーネントロード時発火する関数
   */
    componentDidRender(): void;
    private enableInteract;
    disableInteract(): void;
    private transformString;
    styleString(): {
        transform: string;
        width: string;
        height: string;
    };
    render(): any;
}
interface Position {
    x: number;
    y: number;
    width: string;
    height: string;
}
export {};
