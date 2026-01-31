declare module 'howler' {
    export class Howl {
        constructor(options: any);
        play(spriteOrId?: string | number): number;
        pause(id?: number): this;
        stop(id?: number): this;
        mute(muted?: boolean, id?: number): this;
        volume(volume?: number, id?: number): number | this;
        fade(from: number, to: number, duration: number, id?: number): this;
        loop(loop?: boolean, id?: number): boolean | this;
        playing(id?: number): boolean;
        state(): 'unloaded' | 'loading' | 'loaded';
        unload(): void;
        on(event: string, callback: Function, id?: number): this;
        once(event: string, callback: Function, id?: number): this;
        off(event: string, callback?: Function, id?: number): this;
    }
}
