/* tslint:disable */
/* eslint-disable */
export class Game {
  free(): void;
  constructor();
  resize(canvas_width: number, canvas_height: number): void;
  resize_preserve(canvas_width: number, canvas_height: number): void;
  randomize(): void;
  clear(): void;
  start(): void;
  stop(): void;
  set_cell(x: number, y: number, state: boolean): void;
  render(canvas_id: string): void;
  set_theme(theme: string): void;
  get_theme(): string;
  update(): void;
  is_running(): boolean;
}

export type InitInput = RequestInfo | URL | Response | BufferSource | WebAssembly.Module;

export interface InitOutput {
  readonly memory: WebAssembly.Memory;
  readonly __wbg_game_free: (a: number, b: number) => void;
  readonly game_new: () => number;
  readonly game_resize: (a: number, b: number, c: number) => void;
  readonly game_resize_preserve: (a: number, b: number, c: number) => void;
  readonly game_randomize: (a: number) => void;
  readonly game_clear: (a: number) => void;
  readonly game_start: (a: number) => void;
  readonly game_stop: (a: number) => void;
  readonly game_set_cell: (a: number, b: number, c: number, d: number) => void;
  readonly game_render: (a: number, b: number, c: number) => void;
  readonly game_set_theme: (a: number, b: number, c: number) => void;
  readonly game_get_theme: (a: number) => [number, number];
  readonly game_update: (a: number) => void;
  readonly game_is_running: (a: number) => number;
  readonly __wbindgen_exn_store: (a: number) => void;
  readonly __externref_table_alloc: () => number;
  readonly __wbindgen_export_2: WebAssembly.Table;
  readonly __wbindgen_malloc: (a: number, b: number) => number;
  readonly __wbindgen_realloc: (a: number, b: number, c: number, d: number) => number;
  readonly __wbindgen_free: (a: number, b: number, c: number) => void;
  readonly __wbindgen_start: () => void;
}

export type SyncInitInput = BufferSource | WebAssembly.Module;
/**
* Instantiates the given `module`, which can either be bytes or
* a precompiled `WebAssembly.Module`.
*
* @param {{ module: SyncInitInput }} module - Passing `SyncInitInput` directly is deprecated.
*
* @returns {InitOutput}
*/
export function initSync(module: { module: SyncInitInput } | SyncInitInput): InitOutput;

/**
* If `module_or_path` is {RequestInfo} or {URL}, makes a request and
* for everything else, calls `WebAssembly.instantiate` directly.
*
* @param {{ module_or_path: InitInput | Promise<InitInput> }} module_or_path - Passing `InitInput` directly is deprecated.
*
* @returns {Promise<InitOutput>}
*/
export default function __wbg_init (module_or_path?: { module_or_path: InitInput | Promise<InitInput> } | InitInput | Promise<InitInput>): Promise<InitOutput>;
