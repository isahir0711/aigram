import { Root } from "../models/ig";

const createHeaders = (username: string): Headers => {
    const headers = new Headers({
        'Accept': '*/*',
        'Accept-Language': 'es-419,es;q=0.9',
        'Referer': `https://www.instagram.com/${username}/`,
        'sec-ch-prefers-color-scheme': 'light',
        'sec-ch-ua': '"Opera GX";v="109", "Not:A-Brand";v="8", "Chromium";v="123"',
        'sec-ch-ua-full-version-list': '"Opera GX";v="109.0.5097.142", "Not:A-Brand";v="8.0.0.0", "Chromium";v="123.0.6312.124"',
        'sec-ch-ua-mobile': '?0',
        'sec-ch-ua-model': '""',
        'sec-ch-ua-platform': '"Windows"',
        'sec-ch-ua-platform-version': '"15.0.0"',
        'sec-fetch-dest': 'empty',
        'sec-fetch-mode': 'cors',
        'sec-fetch-site': 'same-origin',
        'user-agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/123.0.0.0 Safari/537.36 OPR/109.0.0.0',
        'x-asbd-id': '129477',
        'x-bloks-version-id': 'f0594120c8dba08dee2d395a000ede0009f6e1795ba7c4adf573f3cbd442ebff',
        'x-csrftoken': 'VDpfuhJPx7XzrCKtxn2zWBSeN2W5X8kt',
        'x-fb-friendly-name': 'PolarisProfilePostsDirectQuery',
        'x-fb-lsd': 'bIzC15Rk4jwNGEUQjG1Y1I',
        'x-ig-app-id': '936619743392459',
        'Content-Type': 'application/x-www-form-urlencoded'
    });

    return headers;
};

const fetchInstagramPosts = async (username: string, numberOfPosts: number = 9): Promise<string[]> => {
    const headers = createHeaders(username);

    const content = new URLSearchParams({
        'av': '17841401321731510',
        '__d': 'www',
        '__user': '0',
        '__a': '1',
        '__req': '5',
        '__hs': '19934.HYP:instagram_web_pkg.2.1..0.1',
        'dpr': '1',
        '__ccg': 'UNKNOWN',
        '__rev': '1015253303',
        '__s': 'soj3bu:dztdqy:a0hgwa',
        '__hsi': '7397440504501858161',
        '__dyn': '7xe5WwlEnwn8K2Wmm1twpUnwgU7S6EeUaUco38w5ux609vCwjE1xoswaq0yE6u0nS4oaEd86a3a0EA2C0iK0D82YK0EUjwGzEaE2iw8O0zEnwhE3fwww4cwJwSyES1Twoob82ZwrUdUbGw4mwr86C1mwrd6goK10xKi2qi7E5yqcxK2K1ew',
        '__csr': 'gR1BkvdZisldfb4haraWOaGmmyqj-OnWRA8OKrl4zbDCl5GQ8P7yuVpQtk8XpaqhoPFlBGbABHBCBm8G8hi3u8wBQSZ6yqmAh6A_CK9DDxa-EnGijCXjhEyBjgV7Arnx648jG7ku8zFEyqEsKUJ13DzFo015Dz1ZG0E8S1lo1uA5o1lKcg0wG1vogUlw9Tyj01Ealo0X6itypo2SwbO5jyFo5EE4-4u0Dx0d81JU3Kxi498bP2oVowbwlUtUgwr80nzw8MsEhzAy1TgGda020C03PK',
        '__comet_req': '7',
        'fb_dtsg': 'NAcMEE-t4EREpjMup4d-LbyQf2S9ev5Q3rOQlx4VnnXTXEgisv-3fSg:17843683126168011:1720188626',
        'jazoest': '26216',
        'lsd': 'bIzC15Rk4jwNGEUQjG1Y1I',
        '__spin_r': '1015253303',
        '__spin_b': 'trunk',
        '__spin_t': '1722350834',
        'fb_api_caller_class': 'RelayModern',
        'fb_api_req_friendly_name': 'PolarisProfilePostsDirectQuery',
        'variables': JSON.stringify({
            data: {
                count: numberOfPosts,
                include_relationship_info: true,
                latest_besties_reel_media: true,
                latest_reel_media: true
            },
            username: username,
            __relay_internal__pv__PolarisFeedShareMenurelayprovider: false
        }),
        'server_timestamps': 'true',
        'doc_id': '7846480048738742'
    });

    const response = await fetch('https://www.instagram.com/graphql/query', {
        method: 'POST',
        headers: headers,
        body: content.toString()
    });

    if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
    }

    const posts: Root = await response.json();

    const edges = posts.data.xdt_api__v1__feed__user_timeline_graphql_connection.edges;

    const urls: string[] = edges.map(item => item.node.image_versions2.candidates[0].url);

    return urls;
};

export default fetchInstagramPosts;