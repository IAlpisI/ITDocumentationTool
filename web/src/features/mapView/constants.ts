export const SHAPE_TYPES = {
    WALL: "wall",
    COMPUTER: 'computer',
    PRINTER: 'printer',
    SWITCH: 'switch',
    ROUTER: 'router',
    TABLE: 'table',
    DOORS: 'doors',
    WINDOW: 'window',
    SERVER: 'server'
  };

  export const TOTAL_TYPES = {
    WALL:'wall',
    TABLE:'table',
    SVG:'svg'
  }
  
  export const DEFAULTS = {
    WALL: {
      STROKE: "#000000",
      FILL: "#000000",
      WIDTH: 250,
      HEIGHT: 20,
      ROTATION: 0,
    },
    TABLE : {
      STROKE: "#000000",
      FILL: "#ffffff",
      WIDTH: 200,
      HEIGHT: 100,
      ROTATION: 0,
    },
    SVG: {
      FILL: "#000000",
      WIDTH: 100,
      HEIGHT: 100,
      ROTATION: 0,
    }
  };
  
  export const LIMITS = {
    WALL: {
      MAX: 1000,
      MIN: 1000,
    },
    SVG: {
      MAX: 100,
      MIN: 10,
    }
  };
  
  export const FLOORPLANS = "__floor_plans__";

  export const DRAG_DATA_KEY = "__drag_data_payload__";