interface Route {
    distance: number;
    duration: number;
    geometry: any;
    legs: any[];
    weight: number;
    weight_name: string;
  }
  
  interface Waypoint {
    distance: number;
    location: number[];
    name: string;
  }
  
  interface iRouteData {
    code: string;
    routes: Route[];
    uuid: string;
    waypoints: Waypoint[];
  }
  
  export default iRouteData;
  