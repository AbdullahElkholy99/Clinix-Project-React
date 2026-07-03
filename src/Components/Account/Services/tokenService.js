import { jwtDecode } from "jwt-decode";

const TOKEN_KEY = "accessToken";

// Save Token
export const saveToken = (token) => {
    localStorage.setItem(TOKEN_KEY, token);
};

// Get Token
export const getToken = () => {
    return localStorage.getItem(TOKEN_KEY);
};

// Delete Token
export const removeToken = () => {
    localStorage.removeItem(TOKEN_KEY);
};

// Decode Token
export const getCurrentUser = () => {
    const token = getToken();

    if (!token) return null;

    try {
        const decoded = jwtDecode(token);

        return {
            id: decoded[
                "http://schemas.xmlsoap.org/ws/2005/05/identity/claims/nameidentifier"
            ],
            name: decoded[
                "http://schemas.xmlsoap.org/ws/2005/05/identity/claims/name"
            ],
            email: decoded[
                "http://schemas.xmlsoap.org/ws/2005/05/identity/claims/emailaddress"
            ],
            role: decoded[
                "http://schemas.microsoft.com/ws/2008/06/identity/claims/role"
            ],
        }
    } catch {
        return null;
    }
};

export const GetUserId = () => {
    const token = getToken();

    if (!token) return null;
    const decoded = jwtDecode(token);
    return decoded[
        "http://schemas.xmlsoap.org/ws/2005/05/identity/claims/nameidentifier"
    ];
}

export const GetUserName = () => {
    const token = getToken();

    if (!token) return null;
    const decoded = jwtDecode(token);
    return decoded[
      "http://schemas.xmlsoap.org/ws/2005/05/identity/claims/name"
    ];
}