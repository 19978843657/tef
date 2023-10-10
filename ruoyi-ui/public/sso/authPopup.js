// Create the main myMSALObj instance
// configuration parameters are located at authConfig.js
//import {msalConfig,loginRequest} from "../sso/authConfig.js"
// import {InteractionRequiredAuthError} from "../assets/msal-browser.js";


console.log("init myMSALObj");
const myMSALObj = new msal.PublicClientApplication(msalConfig);
let username = "";
console.log(myMSALObj);
function selectAccount() {

    /**
     * See here for more info on account retrieval:
     * https://github.com/AzureAD/microsoft-authentication-library-for-js/blob/dev/lib/msal-common/docs/Accounts.md
     */

    const currentAccounts = myMSALObj.getAllAccounts();
    console.log("currentAccounts:",currentAccounts)
    if (currentAccounts.length === 0) {
        return;
    } else if (currentAccounts.length > 1) {
        // Add choose account code here
        console.warn("Multiple accounts detected.");
    } else if (currentAccounts.length === 1) {
        username = currentAccounts[0].username;
        showWelcomeMessage(username);
    }
}

 function handleResponse(response) {
    console.log("undefined",response)
    /**
     * To see the full list of response object properties, visit:
     * https://github.com/AzureAD/microsoft-authentication-library-for-js/blob/dev/lib/msal-browser/docs/request-response-object.md#response
     */

    if (response !== null) {
        username = response.account.username;
        //alert(username+",登录成功！");
        //showWelcomeMessage(username);
        //Step1 POST username  到 后台登录验证接口
        //Step2 设备本地CookiES
        //待修改 20230313 SSO
        
        window._Vue.$router.push('/index')
    } else {
        selectAccount();
    }
}

 function signIn() {
    // const myMSALObj1 = new msal.PublicClientApplication(msalConfig);
    // let myMSALObj1 = new msal.PublicClientApplication(msalConfig);
    console.log("SignIn Trigger");
    console.log(loginRequest);
    console.log(myMSALObj);

    // myMSALObj1.loginPopup(loginRequest)
    //     .then(()=>{
    //         console.log("我进来了")
    //             // handleResponse
    //     }
    //
    //         )
    //     .catch(error => {
    //         console.error('错误信息:',error);
    //     });

    // try {
    //      myMSALObj.ssoSilent(loginRequest);
    // } catch (err) {
    //      myMSALObj.loginPopup(loginRequest)
    //         .then(
    //             handleResponse(null)
    //         ).catch(error => {
    //             // handle error
    //         });
    //
    // }

    const loginResponse = myMSALObj.loginPopup(loginRequest)
        .then(
            handleResponse
        ).catch(error => {
        // handle error
    });

    // console.log("登录结果：", loginResponse)

    // handleResponse(loginResponse)
}

function signOut() {

    /**
     * You can pass a custom request object below. This will override the initial configuration. For more information, visit:
     * https://github.com/AzureAD/microsoft-authentication-library-for-js/blob/dev/lib/msal-browser/docs/request-response-object.md#request
     */

    const logoutRequest = {
        account: myMSALObj.getAccountByUsername(username),
        postLogoutRedirectUri: msalConfig.auth.redirectUri,
        mainWindowRedirectUri: msalConfig.auth.redirectUri
    };

    myMSALObj.logoutPopup(logoutRequest);
}

function getTokenPopup(request) {

    /**
     * See here for more info on account retrieval:
     * https://github.com/AzureAD/microsoft-authentication-library-for-js/blob/dev/lib/msal-common/docs/Accounts.md
     */
    request.account = myMSALObj.getAccountByUsername(username);

    return myMSALObj.acquireTokenSilent(request)
        .catch(error => {
            console.warn("silent token acquisition fails. acquiring token using popup");
            if (error instanceof msal.InteractionRequiredAuthError) {
                // fallback to interaction when silent call fails
                return myMSALObj.acquireTokenPopup(request)
                    .then(tokenResponse => {
                        console.log(tokenResponse);
                        return tokenResponse;
                    }).catch(error => {
                        console.error(error);
                    });
            } else {
                console.warn(error);
            }
    });
}

function seeProfile() {
    getTokenPopup(loginRequest)
        .then(response => {
            callMSGraph(graphConfig.graphMeEndpoint, response.accessToken, updateUI);
        }).catch(error => {
            console.error(error);
        });
}

function readMail() {
    getTokenPopup(tokenRequest)
        .then(response => {
            callMSGraph(graphConfig.graphMailEndpoint, response.accessToken, updateUI);
        }).catch(error => {
            console.error(error);
        });
}

// selectAccount();
