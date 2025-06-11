import init, { Game } from './pkg/conway_wasm.js';

// Template
            // 0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,
            // 0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,
            // 0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,
            // 0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,
            // 0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,
            // 0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,
            // 0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,
            // 0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,
            // 0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,
            // 0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0

// Conway's Game of Life Pattern Library (all patterns are 16x10)
const DEFAULT_PATTERNS = {
    dot: {
        name: "Dot",
        width: 16,
        height: 10,
        cells: [
            1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,
            0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,
            0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,
            0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,
            0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,
            0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,
            0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,
            0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,
            0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,
            0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0
        ],
        builtin: true
    },
    block: {
        name: "Block",
        width: 16,
        height: 10,
        cells: [
            1,1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,
            1,1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,
            0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,
            0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,
            0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,
            0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,
            0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,
            0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,
            0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,
            0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0
        ],
        builtin: true
    },
    beehive: {
        name: "Beehive",
        width: 16,
        height: 10,
        cells: [
            0,1,1,0,0,0,0,0,0,0,0,0,0,0,0,0,
            1,0,0,1,0,0,0,0,0,0,0,0,0,0,0,0,
            0,1,1,0,0,0,0,0,0,0,0,0,0,0,0,0,
            0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,
            0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,
            0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,
            0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,
            0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,
            0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,
            0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0
        ],
        builtin: true
    },
    toad: {
        name: "Toad",
        width: 16,
        height: 10,
        cells: [
            0,1,1,1,0,0,0,0,0,0,0,0,0,0,0,0,
            1,1,1,0,0,0,0,0,0,0,0,0,0,0,0,0,
            0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,
            0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,
            0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,
            0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,
            0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,
            0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,
            0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,
            0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0
        ],
        builtin: true
    },
    glider: {
        name: "Glider",
        width: 16,
        height: 10,
        cells: [
            0,1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,
            0,0,1,0,0,0,0,0,0,0,0,0,0,0,0,0,
            1,1,1,0,0,0,0,0,0,0,0,0,0,0,0,0,
            0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,
            0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,
            0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,
            0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,
            0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,
            0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,
            0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0
        ],
        builtin: true
    },
    // blocks_5x3: {
    //     name: "Blocks 5x3",
    //     width: 16,
    //     height: 10,
    //     cells: [
    //         1,1,0,1,1,0,1,1,0,1,1,0,1,1,0,0,
    //         1,1,0,1,1,0,1,1,0,1,1,0,1,1,0,0,
    //         0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,
    //         1,1,0,1,1,0,1,1,0,1,1,0,1,1,0,0,
    //         1,1,0,1,1,0,1,1,0,1,1,0,1,1,0,0,
    //         0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,
    //         1,1,0,1,1,0,1,1,0,1,1,0,1,1,0,0,
    //         1,1,0,1,1,0,1,1,0,1,1,0,1,1,0,0,
    //         0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,
    //         0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0
    //     ],
    //     builtin: true
    // },
    pentadecathlon: {
        name: "Pentadecathlon",
        width: 16,
        height: 10,
        cells: [
            0,0,1,0,0,0,0,1,0,0,0,0,0,0,0,0,
            1,1,0,1,1,1,1,0,1,1,0,0,0,0,0,0,
            0,0,1,0,0,0,0,1,0,0,0,0,0,0,0,0,
            0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,
            0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,
            0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,
            0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,
            0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,
            0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,
            0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0
        ],
        builtin: true
    },
    glider_storm: {
        name: "Glider Storm",
        width: 16,
        height: 10,
        cells: [
            1,1,0,0,0,1,1,1,0,1,1,1,0,0,1,1,
            1,0,1,0,0,1,0,0,0,0,0,1,0,1,0,1,
            1,0,0,0,0,0,1,0,0,0,1,0,0,0,0,1,
            0,0,1,0,0,0,0,0,1,0,0,0,1,1,0,0,
            0,0,1,0,1,0,0,1,0,0,0,1,0,1,0,0,
            0,0,1,1,0,0,0,1,1,1,0,0,0,1,0,0,
            0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,
            1,0,0,0,0,1,0,0,0,0,1,0,0,0,0,1,
            1,0,1,0,1,0,0,0,0,0,0,1,0,1,0,1,
            1,1,0,0,1,1,1,0,0,1,1,1,0,0,1,1
        ],
        builtin: true
    },
    glider_scatter: {
        name: "Glider Scatter",
        width: 16,
        height: 10,
        cells: [
            1,1,0,0,0,0,0,0,0,0,0,0,0,0,1,1,
            1,0,1,0,0,0,0,0,0,0,0,0,0,1,0,1,
            1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,
            0,0,0,0,0,0,0,0,1,0,0,0,0,0,0,0,
            0,0,0,0,0,0,0,1,0,0,0,0,0,0,0,0,
            0,0,0,0,0,0,0,1,1,1,0,0,0,0,0,0,
            0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,
            1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,
            1,0,1,0,0,0,0,0,0,0,0,0,0,1,0,1,
            1,1,0,0,0,0,0,0,0,0,0,0,0,0,1,1
        ],
        builtin: true
    },
    lwss: {
        name: "LWSS",
        width: 16,
        height: 10,
        cells: [
            1,0,0,1,0,0,0,0,0,0,0,0,0,0,0,0,
            0,0,0,0,1,0,0,0,0,0,0,0,0,0,0,0,
            1,0,0,0,1,0,0,0,0,0,0,0,0,0,0,0,
            0,1,1,1,1,0,0,0,0,0,0,0,0,0,0,0,
            0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,
            0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,
            0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,
            0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,
            0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,
            0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0
        ],
        builtin: true
    },
    mwss: {
        name: "MWSS",
        width: 16,
        height: 10,
        cells: [
            0,0,1,0,0,0,0,0,0,0,0,0,0,0,0,0,
            1,0,0,0,1,0,0,0,0,0,0,0,0,0,0,0,
            0,0,0,0,0,1,0,0,0,0,0,0,0,0,0,0,
            1,0,0,0,0,1,0,0,0,0,0,0,0,0,0,0,
            0,1,1,1,1,1,0,0,0,0,0,0,0,0,0,0,
            0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,
            0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,
            0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,
            0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,
            0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0
        ],
        builtin: true
    },
    hwss: {
        name: "HWSS",
        width: 16,
        height: 10,
        cells: [
            0,0,1,1,0,0,0,0,0,0,0,0,0,0,0,0,
            1,0,0,0,0,1,0,0,0,0,0,0,0,0,0,0,
            0,0,0,0,0,0,1,0,0,0,0,0,0,0,0,0,
            1,0,0,0,0,0,1,0,0,0,0,0,0,0,0,0,
            0,1,1,1,1,1,1,0,0,0,0,0,0,0,0,0,
            0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,
            0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,
            0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,
            0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,
            0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0
        ],
        builtin: true
    },
    p3_123: {
        name: "1-2-3 (p3)",
        width: 16,
        height: 10,
        cells: [
            0,0,1,1,0,0,0,0,0,0,0,0,0,0,0,0,
            1,0,0,1,0,0,0,0,0,0,0,0,0,0,0,0,
            1,1,0,1,0,1,1,0,0,0,0,0,0,0,0,0,
            0,1,0,1,0,0,1,0,0,0,0,0,0,0,0,0,
            0,1,0,0,0,0,1,0,1,1,0,0,0,0,0,0,
            0,0,1,1,1,0,1,0,1,1,0,0,0,0,0,0,
            0,0,0,0,0,1,0,0,0,0,0,0,0,0,0,0,
            0,0,0,0,1,0,0,0,0,0,0,0,0,0,0,0,
            0,0,0,0,1,1,0,0,0,0,0,0,0,0,0,0,
            0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0
        ],
        builtin: true
    },
    two_glider_mess: {
        name: "2-Glider Mess",
        width: 16,
        height: 10,
        cells: [
            0,0,1,0,0,0,0,0,0,0,0,0,0,0,0,0,
            1,0,1,0,0,0,0,0,0,0,0,0,0,0,0,0,
            0,1,1,0,0,0,0,0,0,0,0,0,0,0,0,0,
            0,0,0,0,0,0,0,0,0,0,0,1,0,0,0,0,
            0,0,0,0,0,0,0,0,0,1,1,0,0,0,0,0,
            0,0,0,0,0,0,0,0,0,0,1,1,0,0,0,0,
            0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,
            0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,
            0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,
            0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0
        ],
        builtin: true
    },
    diamond_4_8_12: {
        name: "4-8-12 Diamond",
        width: 16,
        height: 10,
        cells: [
            0,0,0,1,0,0,0,0,0,0,0,0,0,0,0,0,
            0,0,1,0,1,0,0,0,0,0,0,0,0,0,0,0,
            0,1,0,1,0,1,0,0,0,0,0,0,0,0,0,0,
            1,0,1,0,1,0,1,0,0,0,0,0,0,0,0,0,
            0,1,0,1,0,1,0,0,0,0,0,0,0,0,0,0,
            0,0,1,0,1,0,0,0,0,0,0,0,0,0,0,0,
            0,0,0,1,0,0,0,0,0,0,0,0,0,0,0,0,
            0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,
            0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,
            0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0
        ],
        builtin: true
    },
    achims_p8: {
        name: "Achim's p8",
        width: 16,
        height: 10,
        cells: [
            0,1,1,0,0,0,0,0,0,0,0,0,0,0,0,0,
            1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,
            0,1,0,0,0,1,0,0,0,0,0,0,0,0,0,0,
            0,1,0,0,0,1,1,0,0,0,0,0,0,0,0,0,
            0,0,0,1,0,1,0,0,0,0,0,0,0,0,0,0,
            0,0,1,1,0,0,0,1,0,0,0,0,0,0,0,0,
            0,0,0,1,0,0,0,1,0,0,0,0,0,0,0,0,
            0,0,0,0,0,0,0,0,1,0,0,0,0,0,0,0,
            0,0,0,0,0,0,1,1,0,0,0,0,0,0,0,0,
            0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0
        ],
        builtin: true
    },
    acorn: {
        name: "Acorn",
        width: 16,
        height: 10,
        cells: [
            0,1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,
            0,0,0,1,0,0,0,0,0,0,0,0,0,0,0,0,
            1,1,0,0,1,1,1,0,0,0,0,0,0,0,0,0,
            0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,
            0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,
            0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,
            0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,
            0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,
            0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,
            0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0
        ],
        builtin: true
    },
    herschel: {
        name: "Herschel",
        width: 16,
        height: 10,
        cells: [
            1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,
            1,0,1,0,0,0,0,0,0,0,0,0,0,0,0,0,
            1,1,1,0,0,0,0,0,0,0,0,0,0,0,0,0,
            0,0,1,0,0,0,0,0,0,0,0,0,0,0,0,0,
            0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,
            0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,
            0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,
            0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,
            0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,
            0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0
        ],
        builtin: true
    },
    karels_p15: {
        name: "Karel's p15",
        width: 16,
        height: 10,
        cells: [
            0,0,0,0,0,0,0,0,1,0,0,0,0,0,0,0,
            0,0,0,0,0,0,0,1,0,1,0,0,0,0,0,0,
            1,1,1,0,0,0,1,0,0,0,1,0,0,0,0,0,
            0,1,0,0,0,0,1,0,0,0,1,0,0,0,0,0,
            0,1,0,0,0,0,1,0,0,0,1,0,0,0,0,0,
            0,1,0,0,0,0,1,0,0,0,1,0,0,0,0,0,
            0,1,0,0,0,0,1,0,0,0,1,0,0,0,0,0,
            1,1,1,0,0,0,1,0,0,0,1,0,0,0,0,0,
            0,0,0,0,0,0,0,1,0,1,0,0,0,0,0,0,
            0,0,0,0,0,0,0,0,1,0,0,0,0,0,0,0
        ],
        builtin: true
    },
    koks_galaxy: {
        name: "Kok's Galaxy",
        width: 16,
        height: 10,
        cells: [
            0,0,1,0,0,1,0,1,0,0,0,0,0,0,0,0,
            1,1,0,1,0,1,1,1,0,0,0,0,0,0,0,0,
            0,1,0,0,0,0,0,0,1,0,0,0,0,0,0,0,
            1,1,0,0,0,0,0,1,0,0,0,0,0,0,0,0,
            0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,
            0,1,0,0,0,0,0,1,1,0,0,0,0,0,0,0,
            1,0,0,0,0,0,0,1,0,0,0,0,0,0,0,0,
            0,1,1,1,0,1,0,1,1,0,0,0,0,0,0,0,
            0,1,0,1,0,0,1,0,0,0,0,0,0,0,0,0,
            0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0
        ],
        builtin: true
    },
    switch_engine_pred: {
        name: "Switch Engine Predecessor",
        width: 16,
        height: 10,
        cells: [
            1,1,1,0,0,0,0,0,0,0,0,0,0,0,0,0,
            0,0,1,0,1,0,0,0,0,0,0,0,0,0,0,0,
            0,0,1,1,1,1,0,0,0,0,0,0,0,0,0,0,
            0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,
            0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,
            0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,
            0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,
            0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,
            0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,
            0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0
        ],
        builtin: true
    },
    r_pentomino: {
        name: "R-Pentomino",
        width: 16,
        height: 10,
        cells: [
            0,1,1,0,0,0,0,0,0,0,0,0,0,0,0,0,
            1,1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,
            0,1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,
            0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,
            0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,
            0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,
            0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,
            0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,
            0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,
            0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0
        ],
        builtin: true
    }
};

// Pattern management system
let userPatterns = {};
let allPatterns = {};
let currentPatternIndex = 0;
let patternKeys = [];

// Load user patterns from localStorage
function loadUserPatterns() {
    try {
        const saved = localStorage.getItem('userPatterns');
        userPatterns = saved ? JSON.parse(saved) : {};
    } catch (error) {
        console.warn('Failed to load user patterns:', error);
        userPatterns = {};
    }
}

// Save user patterns to localStorage
function saveUserPatterns() {
    try {
        localStorage.setItem('userPatterns', JSON.stringify(userPatterns));
    } catch (error) {
        console.warn('Failed to save user patterns:', error);
    }
}

// Check if pattern already exists
function isDuplicatePattern(cells, width, height) {
    return Object.values(allPatterns).some(pattern => 
        pattern.width === width && 
        pattern.height === height && 
        arraysEqual(pattern.cells, cells)
    );
}

// Helper function to compare arrays
function arraysEqual(a, b) {
    if (a.length !== b.length) return false;
    for (let i = 0; i < a.length; i++) {
        if (a[i] !== b[i]) return false;
    }
    return true;
}

// Add user pattern
function addUserPattern(name, cells, width, height) {
    if (isDuplicatePattern(cells, width, height)) {
        return { success: false, message: "Organism already saved" };
    }
    
    // Generate unique key
    let key = name.toLowerCase().replace(/[^a-z0-9]/g, '_');
    let counter = 1;
    while (allPatterns[key]) {
        key = `${name.toLowerCase().replace(/[^a-z0-9]/g, '_')}_${counter}`;
        counter++;
    }
    
    userPatterns[key] = {
        name: name,
        width: width,
        height: height,
        cells: [...cells],
        builtin: false
    };
    
    saveUserPatterns();
    updatePatternLibrary();
    return { success: true, message: "Pattern saved successfully" };
}

// Update combined pattern library
function updatePatternLibrary() {
    allPatterns = { ...DEFAULT_PATTERNS, ...userPatterns };
    patternKeys = Object.keys(allPatterns);
    // Keep current index valid
    if (currentPatternIndex >= patternKeys.length) {
        currentPatternIndex = 0;
    }
}

// Get current pattern
function getCurrentPattern() {
    if (patternKeys.length === 0) return null;
    return allPatterns[patternKeys[currentPatternIndex]];
}

// Cycle to next pattern
function nextPattern() {
    if (patternKeys.length > 0) {
        currentPatternIndex = (currentPatternIndex + 1) % patternKeys.length;
    }
}

// Cycle to previous pattern
function previousPattern() {
    if (patternKeys.length > 0) {
        currentPatternIndex = (currentPatternIndex - 1 + patternKeys.length) % patternKeys.length;
    }
}


// Place pattern on grid at specified position
function placePattern(game, pattern, startX, startY) {
    for (let y = 0; y < pattern.height; y++) {
        for (let x = 0; x < pattern.width; x++) {
            const cellIndex = y * pattern.width + x;
            if (pattern.cells[cellIndex] === 1) {
                const gridX = startX + x;
                const gridY = startY + y;
                if (gridX >= 0 && gridX < game.get_width() && gridY >= 0 && gridY < game.get_height()) {
                    game.set_cell(gridX, gridY, true);
                }
            }
        }
    }
}

// Update the pattern display grid
function updatePatternDisplay(game, cellDisplayGrid) {
    const pattern = getCurrentPattern();
    const cells = cellDisplayGrid.querySelectorAll('.grid-cell');
    const currentTheme = game.get_theme();
    const themeColor = currentTheme === 'amber' ? '#FFB000' : '#AAFFBB';
    
    // Clear all cells
    cells.forEach(cell => {
        cell.style.backgroundColor = '';
        cell.style.boxShadow = '';
    });
    
    if (pattern) {
        // The grid is 16x10, pattern should already be in this format
        const gridWidth = 16;
        const gridHeight = 10;
        
        for (let y = 0; y < gridHeight; y++) {
            for (let x = 0; x < gridWidth; x++) {
                if (pattern.cells[y * gridWidth + x] === 1) {
                    const cellIndex = y * gridWidth + x;
                    if (cellIndex < cells.length) {
                        cells[cellIndex].style.backgroundColor = themeColor;
                        cells[cellIndex].style.boxShadow = `0 0 2px ${themeColor}`;
                    }
                }
            }
        }
    }
}

// Enhanced repopulate function with pattern placement
function enhancedRepopulate(game) {
    const gridWidth = game.get_width();
    const gridHeight = game.get_height();
    const sectionWidth = 16;
    const sectionHeight = 10;
    
    // Calculate how many complete sections we can fit
    const sectionsX = Math.floor(gridWidth / sectionWidth);
    const sectionsY = Math.floor(gridHeight / sectionHeight);
    
    // Keep track of patterns placed to ensure we place at least one
    let patternsPlaced = 0;
    
    // For each complete 16x10 section, 30% chance to place a random pattern
    for (let sy = 0; sy < sectionsY; sy++) {
        for (let sx = 0; sx < sectionsX; sx++) {
            if (Math.random() < 0.06) {
                // Pick a random pattern
                const patterns = Object.values(allPatterns);
                if (patterns.length > 0) {
                    const pattern = patterns[Math.floor(Math.random() * patterns.length)];
                    
                    // Since patterns are now 16x10, place them directly in the section
                    const sectionStartX = sx * sectionWidth;
                    const sectionStartY = sy * sectionHeight;
                    
                    placePattern(game, pattern, sectionStartX, sectionStartY);
                    patternsPlaced++;
                }
            }
        }
    }
    
    // If no patterns were placed, ensure we place at least one
    if (patternsPlaced === 0 && sectionsX > 0 && sectionsY > 0) {
        const patterns = Object.values(allPatterns);
        if (patterns.length > 0) {
            const pattern = patterns[Math.floor(Math.random() * patterns.length)];
            const sx = Math.floor(Math.random() * sectionsX);
            const sy = Math.floor(Math.random() * sectionsY);
            const sectionStartX = sx * sectionWidth;
            const sectionStartY = sy * sectionHeight;
            placePattern(game, pattern, sectionStartX, sectionStartY);
        }
    }
    
    // Handle edge areas with sparse randomization
    const sparseChance = 0.15;
    
    // Right edge
    const rightEdgeStart = sectionsX * sectionWidth;
    if (rightEdgeStart < gridWidth) {
        for (let x = rightEdgeStart; x < gridWidth; x++) {
            for (let y = 0; y < gridHeight; y++) {
                if (Math.random() < sparseChance) {
                    game.set_cell(x, y, true);
                }
            }
        }
    }
    
    // Bottom edge
    const bottomEdgeStart = sectionsY * sectionHeight;
    if (bottomEdgeStart < gridHeight) {
        for (let y = bottomEdgeStart; y < gridHeight; y++) {
            for (let x = 0; x < rightEdgeStart; x++) { // Only up to right edge to avoid double-filling corner
                if (Math.random() < sparseChance) {
                    game.set_cell(x, y, true);
                }
            }
        }
    }
}

async function run() {
    await init();
    const game = new Game();
    const canvas = document.getElementById('gameCanvas');
    
    // Initialize pattern system
    loadUserPatterns();
    updatePatternLibrary();
    
    
    // Function to resize canvas and game grid
    function resizeCanvas() {
        const crtScreen = document.querySelector('.crt-screen');
        const rect = crtScreen.getBoundingClientRect();
        canvas.width = rect.width;
        canvas.height = rect.height;
        game.resize(rect.width, rect.height);
    }

    // Function to resize canvas and preserve game state
    function resizeCanvasPreserve() {
        const crtScreen = document.querySelector('.crt-screen');
        const rect = crtScreen.getBoundingClientRect();
        canvas.width = rect.width;
        canvas.height = rect.height;
        game.resize_preserve(rect.width, rect.height);
    }

    // Initial resize (populate will be handled by loadSavedState)
    resizeCanvas();

    // Handle window resize
    window.addEventListener('resize', () => {
        resizeCanvasPreserve(); // Preserve game state during resize
        if (menuVisible) {
            // Re-render menu after resize
            renderMenu();
        } else {
            game.render('gameCanvas');
        }
    });

    let animationFrameId = null;
    let lastUpdate = performance.now();
    let updateInterval = 100; // 100ms for 10 updates per second
    let isMouseDown = false;
    let lastAutoSave = performance.now();
    let isInitializing = true; // Prevent saves during initialization

    function getGridCoordinates(event) {
        const rect = canvas.getBoundingClientRect();
        const scaleX = canvas.width / rect.width;
        const scaleY = canvas.height / rect.height;
        const x = Math.floor((event.clientX - rect.left) * scaleX / 3); // 3x3 cell size
        const y = Math.floor((event.clientY - rect.top) * scaleY / 3);
        return { x, y };
    }

    function paintCell(event) {
        const { x, y } = getGridCoordinates(event);
        game.set_cell(x, y, true); // Set cell to live
        game.render('gameCanvas'); // Immediate re-render
        
        // Debounced save to avoid excessive localStorage writes during painting
        clearTimeout(window.paintSaveTimeout);
        window.paintSaveTimeout = setTimeout(() => {
            saveGameState();
        }, 500); // Save 500ms after user stops painting
    }

    function handleCanvasClick(event) {
        if (selectedPatternForPlacement) {
            // Place the selected pattern at click location
            const { x, y } = getGridCoordinates(event);
            placePattern(game, selectedPatternForPlacement, x, y);
            game.render('gameCanvas');
            saveGameState();
            
            // Reset pattern placement mode
            selectedPatternForPlacement = null;
            canvas.style.cursor = 'crosshair';
        } else {
            // Normal cell painting
            paintCell(event);
        }
    }

    // Separate event handlers for game and menu modes
    function gameMouseDown(event) {
        isMouseDown = true;
        handleCanvasClick(event);
    }

    function gameMouseMove(event) {
        if (isMouseDown) {
            paintCell(event);
        }
    }

    function gameMouseUp() {
        isMouseDown = false;
    }

    function gameMouseLeave() {
        isMouseDown = false;
    }

    // Menu state
    let hoveredMenuIndex = -1;
    let menuClickAreas = [];

    // Function to switch between game and menu event handling
    function setCanvasMode(isMenuMode) {
        if (isMenuMode) {
            // Remove game event listeners
            canvas.removeEventListener('mousedown', gameMouseDown);
            canvas.removeEventListener('mousemove', gameMouseMove);
            canvas.removeEventListener('mouseup', gameMouseUp);
            canvas.removeEventListener('mouseleave', gameMouseLeave);
            
            // Menu mode uses HTML overlays for interaction, no canvas events needed
            canvas.style.cursor = 'default';
        } else {
            // Reset hover state and remove overlays
            hoveredMenuIndex = -1;
            const existingOverlays = document.querySelectorAll('.menu-hover-overlay');
            existingOverlays.forEach(overlay => overlay.remove());
            
            // Stop hover tracking
            if (window.menuHoverInterval) {
                clearInterval(window.menuHoverInterval);
                window.menuHoverInterval = null;
            }
            if (window.menuMouseTracker) {
                document.removeEventListener('mousemove', window.menuMouseTracker);
                window.menuMouseTracker = null;
            }
            
            canvas.style.cursor = 'crosshair';
            
            // Restore game listeners
            canvas.addEventListener('mousedown', gameMouseDown);
            canvas.addEventListener('mousemove', gameMouseMove);
            canvas.addEventListener('mouseup', gameMouseUp);
            canvas.addEventListener('mouseleave', gameMouseLeave);
        }
    }

    // Initialize with game mode
    setCanvasMode(false);
    

    function gameLoop() {
        if (game.is_running()) {
            const currentTime = performance.now();
            if (currentTime - lastUpdate >= updateInterval) {
                game.update(); // Model update every 100ms
                lastUpdate = currentTime;
                
                // Auto-save every 30 seconds during gameplay
                if (currentTime - lastAutoSave >= 30000) {
                    saveGameState();
                    lastAutoSave = currentTime;
                }
            }
            game.render('gameCanvas'); // Render every frame
            animationFrameId = requestAnimationFrame(gameLoop);
        }
    }

    // Initialize biotron controls
    const enzymeSlider = document.getElementById('enzymeSlider');
    const enzymeDisplay = document.getElementById('enzymeDisplay');
    const autoclaveButton = document.getElementById('autoclaveButton');
    const repopulateButton = document.getElementById('repopulateButton');
    const sampleButton = document.getElementById('sampleButton');
    const autoclaveLed = document.getElementById('autoclaveLed');
    const repopulateLed = document.getElementById('repopulateLed');
    const sampleLed = document.getElementById('sampleLed');
    const themeSwitch = document.getElementById('themeSwitch');
    const amberLabel = document.querySelector('.amber-label');
    const greenLabel = document.querySelector('.green-label');
    const menuButton = document.getElementById('menuButton');
    const menuLed = document.getElementById('menuLed');
    const prevButton = document.getElementById('prevButton');
    const nextButton = document.getElementById('nextButton');
    const cellDisplayGrid = document.getElementById('cellDisplayGrid');

    // Menu data
    const menuItems = [
        { text: 'Home', url: '/', external: false },
        { text: 'Industrious Kraken', url: 'https://industriouskraken.com/', external: true },
        { text: 'Andy Beverly School', url: 'https://andybeverly.com/', external: true },
        { text: 'My LinkedIn', url: 'https://www.linkedin.com/in/robertbeverly/', external: true }
    ];

    let menuVisible = false;

    // Function to toggle menu visibility
    function toggleMenu() {
        menuVisible = !menuVisible;
        if (menuVisible) {
            menuLed.classList.remove('off');
            menuLed.classList.add('blinking');
            // Stop the game when menu is visible
            if (game.is_running()) {
                game.stop();
                if (animationFrameId !== null) {
                    cancelAnimationFrame(animationFrameId);
                    animationFrameId = null;
                }
            }
            setCanvasMode(true); // Switch to menu mode
            renderMenu();
        } else {
            menuLed.classList.remove('blinking');
            menuLed.classList.add('off');
            setCanvasMode(false); // Switch back to game mode
            // Resume game if enzyme level > 0
            const enzymeLevel = parseInt(enzymeSlider.value);
            if (enzymeLevel > 0) {
                updateGameSpeed(enzymeLevel);
            } else {
                game.render('gameCanvas'); // Just render the game state
            }
        }
    }

    // Function to render menu on canvas
    function renderMenu() {
        const canvas = document.getElementById('gameCanvas');
        const ctx = canvas.getContext('2d');
        const currentTheme = game.get_theme();
        const textColor = currentTheme === 'amber' ? '#FFB000' : '#AAFFBB';
        
        // Clear canvas and reset click areas
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        menuClickAreas = [];
        
        // Remove any existing hover overlays
        const existingOverlays = document.querySelectorAll('.menu-hover-overlay');
        existingOverlays.forEach(overlay => overlay.remove());
        
        // Set text properties
        const fontSize = 16;
        ctx.font = `${fontSize}px "Courier New", monospace`;
        ctx.fillStyle = textColor;
        ctx.textAlign = 'left';
        ctx.textBaseline = 'middle';
        
        // Add glow effect
        ctx.shadowColor = textColor;
        ctx.shadowBlur = 4;
        
        // Render menu items and calculate click boundaries
        const lineHeight = 24;
        const startY = 40;
        const textX = 20;
        
        menuItems.forEach((item, index) => {
            const y = startY + (index * lineHeight);
            
            // Measure text dimensions
            const textMetrics = ctx.measureText(item.text);
            const textWidth = textMetrics.width;
            const textHeight = fontSize; // Approximate text height
            
            // Calculate click area with padding and one character width extension
            const padding = 2;
            const topPadding = 2;
            const charWidth = ctx.measureText('M').width; // Use 'M' for average character width
            const clickArea = {
                x: textX - padding,
                y: y, // y is already the middle baseline
                width: textWidth + (padding * 2) + charWidth,
                height: textHeight + padding + topPadding
            };
            menuClickAreas.push(clickArea);
            
            // Create invisible HTML overlay for hover detection
            const overlay = document.createElement('div');
            overlay.className = 'menu-hover-overlay';
            overlay.style.position = 'absolute';
            overlay.style.pointerEvents = 'auto';
            overlay.style.cursor = 'pointer';
            overlay.style.zIndex = '1000';
            // overlay.style.background = 'rgba(255,0,0,0.3)'; // Visual debugging disabled
            
            // Add a data attribute to identify which menu item this overlay represents
            overlay.dataset.menuIndex = index;
            
            // Position overlay relative to canvas
            const canvasRect = canvas.getBoundingClientRect();
            const rectY = clickArea.y - clickArea.height/2 - 1;
            overlay.style.left = `${canvasRect.left + (clickArea.x * canvasRect.width / canvas.width)}px`;
            overlay.style.top = `${canvasRect.top + (rectY * canvasRect.height / canvas.height)}px`;
            overlay.style.width = `${(clickArea.width * canvasRect.width / canvas.width)}px`;
            overlay.style.height = `${(clickArea.height * canvasRect.height / canvas.height)}px`;
            
            // Click handler for navigation
            overlay.addEventListener('click', () => {
                const menuItem = menuItems[index];
                if (menuItem.external) {
                    window.open(menuItem.url, '_blank', 'noopener,noreferrer');
                } else {
                    window.location.href = menuItem.url;
                }
                toggleMenu();
            });
            
            document.body.appendChild(overlay);
            
            // Draw hover background if this item is hovered
            if (index === hoveredMenuIndex) {
                ctx.save();
                const rectY = clickArea.y - clickArea.height/2 - 1;
                
                // Draw background with higher opacity
                ctx.fillStyle = `${textColor}40`; // 40% opacity background
                ctx.fillRect(clickArea.x, rectY, clickArea.width, clickArea.height);
                
                // Draw border
                ctx.strokeStyle = textColor;
                ctx.lineWidth = 1;
                ctx.strokeRect(clickArea.x, rectY, clickArea.width, clickArea.height);
                
                ctx.restore();
            }
            
            // Set text properties for each item (in case hover changed them)
            ctx.fillStyle = textColor;
            ctx.shadowColor = textColor;
            ctx.shadowBlur = index === hoveredMenuIndex ? 6 : 4; // Stronger glow when hovered
            
            // Render the text
            ctx.fillText(item.text, textX, y);
        });
        
        // Reset shadow
        ctx.shadowBlur = 0;
        
        // Store click areas for mouse tracking
        window.menuClickAreas = menuClickAreas;
        
        // Start tracking mouse position globally
        if (!window.menuMouseTracker) {
            let lastMouseX = 0;
            let lastMouseY = 0;
            
            window.menuMouseTracker = (event) => {
                lastMouseX = event.clientX;
                lastMouseY = event.clientY;
            };
            
            document.addEventListener('mousemove', window.menuMouseTracker);
            
            // Poll to check if mouse is over any menu area
            window.menuHoverInterval = setInterval(() => {
                const canvasRect = canvas.getBoundingClientRect();
                
                // Convert screen coordinates to canvas coordinates
                const canvasX = (lastMouseX - canvasRect.left) * (canvas.width / canvasRect.width);
                const canvasY = (lastMouseY - canvasRect.top) * (canvas.height / canvasRect.height);
                
                let newHoveredIndex = -1;
                
                // Check if mouse is over any click area
                menuItems.forEach((item, index) => {
                    const y = 40 + (index * 24); // startY + index * lineHeight
                    const textMetrics = ctx.measureText(item.text);
                    const textWidth = textMetrics.width;
                    const charWidth = ctx.measureText('M').width;
                    
                    const clickArea = {
                        x: 20 - 2, // textX - padding
                        y: y,
                        width: textWidth + 4 + charWidth, // padding + charWidth
                        height: 16 + 4 // fontSize + padding
                    };
                    
                    const rectY = clickArea.y - clickArea.height/2 - 1;
                    
                    if (canvasX >= clickArea.x && canvasX <= clickArea.x + clickArea.width && 
                        canvasY >= rectY && canvasY <= rectY + clickArea.height) {
                        newHoveredIndex = index;
                    }
                });
                
                if (newHoveredIndex !== hoveredMenuIndex) {
                    hoveredMenuIndex = newHoveredIndex;
                    renderMenu();
                }
            }, 100);
        }
    }

    // Function to blink LED for 3 seconds
    function blinkLed(led) {
        led.classList.remove('off');
        led.classList.add('blinking');
        
        setTimeout(() => {
            led.classList.remove('blinking');
            led.classList.add('off');
        }, 3000);
    }

    // Function to update game speed based on enzyme level
    function updateGameSpeed(enzymeLevel) {
        if (enzymeLevel === 0) {
            // Stop the game
            game.stop();
            if (animationFrameId !== null) {
                cancelAnimationFrame(animationFrameId);
                animationFrameId = null;
            }
        } else {
            // Calculate update interval: 1-99 maps to 999-10ms
            updateInterval = 999 - (enzymeLevel - 1) * (989 / 98);
            
            if (!game.is_running()) {
                game.start();
                lastUpdate = performance.now();
                gameLoop();
            }
        }
    }

    // Function to update slider mark lighting
    function updateSliderMarks(value) {
        const marks = document.querySelectorAll('.slider-marks span');
        const currentTheme = game.get_theme();
        const themeColor = currentTheme === 'amber' ? '#FFB000' : '#AAFFBB';
        
        // Map slider value (0-99) to mark positions (0, 25, 50, 75, 99)
        const markPositions = [0, 24.75, 49.5, 74.25, 99];
        
        marks.forEach((mark, index) => {
            const markPosition = markPositions[index];
            const distance = Math.abs(value - markPosition);
            
            // Calculate brightness: closer = brighter, with falloff
            let brightness = 0;
            if (distance <= 12.375) { // Half the distance between marks
                if (distance === 0) {
                    brightness = 1.0; // 100% when exactly on mark
                } else if (distance <= 6.1875) { // Quarter distance
                    brightness = 0.75; // 75% when very close
                } else {
                    brightness = 0.5 - (distance - 6.1875) / 12.375 * 0.5; // Fade from 50% to 0%
                }
            }
            
            if (brightness > 0) {
                mark.style.color = themeColor;
                mark.style.textShadow = `0 0 ${2 + brightness * 2}px ${themeColor}`;
                mark.style.opacity = Math.max(0.3, brightness);
            } else {
                mark.style.color = '#665542';
                mark.style.textShadow = '0 1px 1px rgba(0, 0, 0, 0.5)';
                mark.style.opacity = '1';
            }
        });
    }

    // Enzyme slider functionality
    enzymeSlider.addEventListener('input', function() {
        const value = parseInt(this.value);
        enzymeDisplay.textContent = value;
        updateGameSpeed(value);
        updateSliderMarks(value);
        saveState(); // Save state when slider changes
    });

    // Autoclave button (clear) functionality
    autoclaveButton.addEventListener('mousedown', function() {
        this.classList.add('active');
    });

    autoclaveButton.addEventListener('mouseup', function() {
        this.classList.remove('active');
    });

    autoclaveButton.addEventListener('mouseleave', function() {
        this.classList.remove('active');
    });

    autoclaveButton.addEventListener('click', function() {
        game.clear();
        game.render('gameCanvas');
        blinkLed(autoclaveLed);
        saveGameState(); // Save after clearing
    });

    // Repopulate button (randomize) functionality
    repopulateButton.addEventListener('mousedown', function() {
        this.classList.add('active');
    });

    repopulateButton.addEventListener('mouseup', function() {
        this.classList.remove('active');
    });

    repopulateButton.addEventListener('mouseleave', function() {
        this.classList.remove('active');
    });

    repopulateButton.addEventListener('click', function() {
        enhancedRepopulate(game);
        game.render('gameCanvas');
        blinkLed(repopulateLed);
        saveGameState(); // Save after randomizing
    });

    // Sample button functionality (just visual effects, no game action)
    sampleButton.addEventListener('mousedown', function() {
        this.classList.add('active');
    });

    sampleButton.addEventListener('mouseup', function() {
        this.classList.remove('active');
    });

    sampleButton.addEventListener('mouseleave', function() {
        this.classList.remove('active');
    });

    // Navigation button functionality
    prevButton.addEventListener('click', function() {
        previousPattern();
        updatePatternDisplay(game, cellDisplayGrid);
    });

    nextButton.addEventListener('click', function() {
        nextPattern();
        updatePatternDisplay(game, cellDisplayGrid);
    });

    // Sample button functionality - will implement pattern placement later
    let selectedPatternForPlacement = null;

    sampleButton.addEventListener('click', function() {
        selectedPatternForPlacement = getCurrentPattern();
        blinkLed(sampleLed);
        
        // Change canvas cursor to indicate pattern placement mode
        if (selectedPatternForPlacement && !menuVisible) {
            canvas.style.cursor = 'copy';
        }
    });

    // Theme switching functionality
    function updateTheme(theme) {
        const root = document.documentElement;
        game.set_theme(theme);
        
        if (theme === 'amber') {
            root.style.setProperty('--current-cell-color', '#FFB000');
            root.style.setProperty('--current-canvas-bg', '#0D0A05');
            canvas.style.backgroundColor = '#0D0A05';
            themeSwitch.className = 'rotary-switch amber';
            amberLabel.classList.add('active');
            greenLabel.classList.remove('active');
            enzymeDisplay.classList.remove('green');
            enzymeDisplay.style.color = '#FFB000';
            enzymeDisplay.style.textShadow = '0 0 4px #FFB000';
        } else {
            root.style.setProperty('--current-cell-color', '#AAFFBB');
            root.style.setProperty('--current-canvas-bg', '#000000');
            canvas.style.backgroundColor = '#000000';
            themeSwitch.className = 'rotary-switch green';
            greenLabel.classList.add('active');
            amberLabel.classList.remove('active');
            enzymeDisplay.classList.add('green');
            enzymeDisplay.style.color = '';
            enzymeDisplay.style.textShadow = '';
        }
        
        game.render('gameCanvas');
        
        // Update slider marks with new theme colors
        updateSliderMarks(parseInt(enzymeSlider.value));
        
        // Update pattern display with new theme colors
        updatePatternDisplay(game, cellDisplayGrid);
        
        // Save state when theme changes
        saveState();
    }

    // Menu button functionality
    menuButton.addEventListener('mousedown', function() {
        this.classList.add('active');
    });

    menuButton.addEventListener('mouseup', function() {
        this.classList.remove('active');
    });

    menuButton.addEventListener('mouseleave', function() {
        this.classList.remove('active');
    });

    menuButton.addEventListener('click', function() {
        toggleMenu();
    });

    // Theme switch functionality
    themeSwitch.addEventListener('click', function() {
        const currentTheme = game.get_theme();
        const newTheme = currentTheme === 'amber' ? 'green' : 'amber';
        updateTheme(newTheme);
    });

    // Save game state to localStorage
    function saveGameState() {
        if (isInitializing) {
            return; // Don't save during initialization
        }
        
        try {
            const gridState = game.get_grid_state();
            const gameState = {
                grid: Array.from(gridState), // Convert to regular array
                width: game.get_width(),
                height: game.get_height(),
                running: game.is_running(),
                theme: game.get_theme(),
                enzymeLevel: parseInt(enzymeSlider.value)
            };
            localStorage.setItem('gameOfLifeState', JSON.stringify(gameState));
        } catch (error) {
            console.warn('Failed to save game state:', error);
        }
    }

    // Load game state from localStorage
    function loadGameState() {
        try {
            const savedState = localStorage.getItem('gameOfLifeState');
            if (savedState) {
                const state = JSON.parse(savedState);
                const currentWidth = game.get_width();
                const currentHeight = game.get_height();
                
                // Handle grid restoration with dimension adaptation
                if (state.grid && state.width && state.height) {
                    if (state.width === currentWidth && state.height === currentHeight) {
                        // Exact match - direct restore
                        let gridArray;
                        if (Array.isArray(state.grid)) {
                            gridArray = state.grid;
                        } else {
                            // Convert from object back to array (for backwards compatibility)
                            gridArray = Object.values(state.grid);
                        }
                        game.set_grid_state(gridArray);
                    } else {
                        // Dimension mismatch - adapt the grid
                        const newGrid = new Array(currentWidth * currentHeight).fill(0);
                        const copyWidth = Math.min(state.width, currentWidth);
                        const copyHeight = Math.min(state.height, currentHeight);
                        
                        // Convert saved grid data back to array
                        let oldGridArray;
                        if (Array.isArray(state.grid)) {
                            oldGridArray = state.grid;
                        } else {
                            oldGridArray = Object.values(state.grid);
                        }
                        
                        // Copy overlapping cells
                        for (let i = 0; i < copyHeight; i++) {
                            for (let j = 0; j < copyWidth; j++) {
                                const oldIdx = i * state.width + j;
                                const newIdx = i * currentWidth + j;
                                if (oldIdx < oldGridArray.length) {
                                    newGrid[newIdx] = oldGridArray[oldIdx];
                                }
                            }
                        }
                        
                        game.set_grid_state(newGrid);
                    }
                }
                
                // Restore running state
                if (state.running) {
                    game.start();
                } else {
                    game.stop();
                }
                
                return true; // Successfully loaded game state
            }
        } catch (error) {
            console.warn('Failed to load game state:', error);
        }
        return false; // No game state loaded
    }

    // Load saved state from localStorage
    function loadSavedState() {
        const savedEnzymeLevel = localStorage.getItem('enzymeLevel');
        const savedTheme = localStorage.getItem('theme');
        
        // Set enzyme level (default to 10 if not saved)
        const enzymeLevel = savedEnzymeLevel ? parseInt(savedEnzymeLevel) : 10;
        enzymeSlider.value = enzymeLevel;
        enzymeDisplay.textContent = enzymeLevel;
        updateGameSpeed(enzymeLevel);
        updateSliderMarks(enzymeLevel);
        
        // Set theme (default to amber if not saved)
        const theme = savedTheme || 'amber';
        updateTheme(theme);
        
        // Try to load game state after UI is set up
        const gameStateLoaded = loadGameState();
        
        // If no saved game state, use enhanced repopulate
        if (!gameStateLoaded) {
            enhancedRepopulate(game);
        }
        
        game.render('gameCanvas');
        
        // Initialize pattern display
        updatePatternDisplay(game, cellDisplayGrid);
        
        // Initialization complete - allow saves now
        isInitializing = false;
    }
    
    // Save state to localStorage
    function saveState() {
        localStorage.setItem('enzymeLevel', enzymeSlider.value);
        localStorage.setItem('theme', game.get_theme());
        saveGameState(); // Also save game state
    }
    
    // Initialize with saved state
    loadSavedState();
    
}

run();
