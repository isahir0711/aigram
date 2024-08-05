import { IgResponse } from "../models/response";
import { UserInfoRoot } from "../models/UserInfo";
import { UserMediaRoot } from "../models/UserMedia";

const getUserPosts = async (username: string) => {

    const apirapidkey = process.env.RAPIDAPI_KEY as string;

    const userInfoResponse = await fetch(`https://instagram28.p.rapidapi.com/user_info?user_name=${username}`,{
        method: 'GET',
        headers: {
            'x-rapidapi-host': 'instagram28.p.rapidapi.com',
            'x-rapidapi-key': apirapidkey
            }
        });
    
    const userinfo: UserInfoRoot = await userInfoResponse.json();

    const userId = userinfo.data.user.id;

    const userPosts = await fetch(`https://instagram28.p.rapidapi.com/medias?user_id=${userId}&batch_size=9`,{
        method: 'GET',
        headers: {
            'x-rapidapi-host': 'instagram28.p.rapidapi.com',
            'x-rapidapi-key': apirapidkey
        }
    });

    const usermedia: UserMediaRoot = await userPosts.json();

    let urls: string[] = [];

    usermedia.data.user.edge_owner_to_timeline_media.edges.forEach((edge) => {
        edge.node.display_resources.forEach((resource) => {
            urls.push(resource.src);
        });
    })

    const igresponse:IgResponse = {
        urls: urls
    }

    return igresponse;
};

export default getUserPosts;