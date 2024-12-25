import dev from "./dev" ;
import production from "./production";

const GOBAL_CONFIG=process.env.NODE_ENV==="production"?production:dev;

export default GOBAL_CONFIG;


