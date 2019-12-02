
import { getCommunityAll } from "@/api/usercenter";
function getCommunity() {
    let data  ;//=JSON.parse(sessionStorage.getItem("Community"));
    if (data) {
        // console.log("从缓存中取Community")
        return data;
    } 
    getCommunityAll().then(response => {
        let communityData = response.data;
        if (response.code===200) {
            sessionStorage.setItem("Community", JSON.stringify(communityData));
        }
        return communityData;
    })
        .catch(err => {
            return null;
            // console.log(err);
        });
}
export default {
    getCommunity
}