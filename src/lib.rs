use wasm_bindgen::prelude::*;
use wasm_bindgen::JsCast;
use js_sys::Math;

#[wasm_bindgen]
pub struct Game {
    width: usize,
    height: usize,
    grid: Vec<bool>,
    running: bool,
    theme: String,
}

#[wasm_bindgen]
impl Game {
    #[wasm_bindgen(constructor)]
    pub fn new() -> Game {
        let window = web_sys::window().unwrap();
        let inner_width = window.inner_width().unwrap().as_f64().unwrap() as usize;
        let inner_height = window.inner_height().unwrap().as_f64().unwrap() as usize;
        let cell_size = 3; // 3x3 pixels
        let width = inner_width / cell_size;
        let height = (inner_height as f64 * 0.8 / cell_size as f64).floor() as usize;
        let grid = vec![false; width * height];
        Game {
            width,
            height,
            grid,
            running: false,
            theme: "amber".to_string(),
        }
    }

    pub fn randomize(&mut self) {
        for cell in self.grid.iter_mut() {
            *cell = Math::random() < 0.3;
        }
    }

    pub fn clear(&mut self) {
        self.grid.fill(false);
    }

    pub fn start(&mut self) {
        self.running = true;
    }

    pub fn stop(&mut self) {
        self.running = false;
    }

    pub fn set_cell(&mut self, x: usize, y: usize, state: bool) {
        if x < self.width && y < self.height {
            self.grid[y * self.width + x] = state;
        }
    }

    pub fn render(&self, canvas_id: &str) {
        let document = web_sys::window().unwrap().document().unwrap();
        let canvas = document.get_element_by_id(canvas_id).unwrap();
        let canvas: web_sys::HtmlCanvasElement = canvas.dyn_into().unwrap();
        let ctx = canvas
            .get_context("2d")
            .unwrap()
            .unwrap()
            .dyn_into::<web_sys::CanvasRenderingContext2d>()
            .unwrap();

        let cell_size = 3; // 3x3 pixels
        ctx.clear_rect(0.0, 0.0, canvas.width().into(), canvas.height().into());
        
        let (cell_color, glow_color) = if self.theme == "amber" {
            ("#FFB000", "#FFB000") // Amber phosphor color
        } else {
            ("#AAFFBB", "#AAFFBB") // Green phosphor color
        };
        
        // Set glow effect for phosphor simulation
        ctx.set_shadow_color(glow_color);
        ctx.set_shadow_blur(2.0);
        
        for i in 0..self.height {
            for j in 0..self.width {
                if self.grid[i * self.width + j] {
                    ctx.set_fill_style_str(cell_color);
                    ctx.fill_rect(
                        (j * cell_size) as f64,
                        (i * cell_size) as f64,
                        (cell_size - 1) as f64,
                        (cell_size - 1) as f64,
                    );
                }
            }
        }
        
        // Reset shadow
        ctx.set_shadow_blur(0.0);
    }

    pub fn set_theme(&mut self, theme: &str) {
        self.theme = theme.to_string();
    }

    pub fn get_theme(&self) -> String {
        self.theme.clone()
    }

    pub fn update(&mut self) {
        let mut new_grid = vec![false; self.width * self.height];
        for i in 0..self.height {
            for j in 0..self.width {
                let neighbors = self.count_neighbors(i, j);
                let idx = i * self.width + j;
                new_grid[idx] = match (self.grid[idx], neighbors) {
                    (true, 2) | (true, 3) => true,
                    (false, 3) => true,
                    _ => false,
                };
            }
        }
        self.grid = new_grid;
    }

    fn count_neighbors(&self, i: usize, j: usize) -> u8 {
        let mut count = 0;
        for di in [-1, 0, 1].iter() {
            for dj in [-1, 0, 1].iter() {
                if *di == 0 && *dj == 0 {
                    continue;
                }
                let ni = (i as i32 + di).rem_euclid(self.height as i32) as usize;
                let nj = (j as i32 + dj).rem_euclid(self.width as i32) as usize;
                if self.grid[ni * self.width + nj] {
                    count += 1;
                }
            }
        }
        count
    }

    pub fn is_running(&self) -> bool {
        self.running
    }
}