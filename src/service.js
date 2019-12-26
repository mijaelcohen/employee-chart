import Axios from "axios";
import config from "./config";

// i love my minions
function minionsByManager(manager){
    return Axios.get(config.apiURI, {
        params:{
            manager
        }
    });
};

export default minionsByManager;