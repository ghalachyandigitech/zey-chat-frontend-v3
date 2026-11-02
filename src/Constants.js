export const _ID_PATTERN = /^[0-9a-fA-F]{24}$/;
export const _HEX_PATTERN = /^#([0-9A-F]{3}){1,2}$/i;
export const REG_EXP_PERSIAN_FONT = /[\u0600-\u06FF]/;
export const FILE_PATTERN = ['image/jpeg', 'image/png', 'image/jpg', 'video/mp4'];
export const HISTORY_PAGE_ITEMS_COUNT = 10;
export const USER_PARTNERS_ROLES = ['', 'admins', 'team-leads', 'agents'];
export const USER_PARTNERS_STATUSES = {0: 'inactive', 1: 'offline', 2: 'invisible', 3: 'away', 4: 'online'};
export const DATE_OPTIONS = ['sv', {second: '2-digit', hour: '2-digit', minute: '2-digit', hour12: false}];
export const IMAGE_EXT = ['jpg', 'jpeg', 'png', 'image/jpeg', 'image/png', 'image/jpg'];
export const VIDEO_EXT = ['mp4', 'video/mp4'];
export const PLATFORMS = ['windows', 'android', 'iphone', 'mac']; //todo image-ner@ kara stex pahvi
export const BROWSERS = ['edg', 'opr', 'firefox', 'fxios', 'safari', 'chrome']; //todo image-ner@ kara stex pahvi
export const REG_EXP_URL_DETECT = /(https?:\/\/[^\s]+|www\.[^\s]+(?:\.[^\s]+)+)/g;

export const visitorsTypes = [
    ['incoming', 'incoming website visitors'],
    ['assigned', 'assigned website visitors'],
    ['served', 'served website visitors'],
    ['active', 'active website visitors'],
    ['idle', 'idle website visitors']
];
export const PAGES_NAMES = {
    '': 'home',
    'home': 'home',
    'history': 'history',
    'visitors': 'visitors',
    'widgets': 'widgets',
    'widgets/delete': 'widget delete',
    'widgets/create': 'widget create',

    'profile': 'profile',
    'profile/update/info': 'profile update info',

    'user-admins': 'user admins',
    'user-admins/create': 'user admins create',
    'user-admins/update': 'user admins update',
    'user-admins/delete': 'user admins delete',

    'shortcuts': 'shortcuts',
    'shortcuts/create': 'shortcuts create',
    'shortcuts/update': 'shortcuts update',
    'shortcuts/delete': 'shortcuts delete',

    'partners': 'partners',
    'partners/create': 'partners create',
    'partners/update': 'partners update',
    'partners/delete': 'partners delete',

    'agents': 'agents',
    'agents/create': 'agents create',
    'agents/update': 'agents update',
    'agents/delete': 'agents delete',

    'chats/end': 'end chat',

    'transfer': 'transfer',

    'team': 'team',
    'hot-keys': 'hot keys',
};

export const USER_PARTNERS_CONFIGS = {
    [3]: {
        hotKeys: true,
        chatRequests: true,
        profileNotifications: true,
        chats: true,
        status: true,
        transferButton: 'transfer',
        chatWith: ['team-leads'],
        routes: [
            'home',
            'history',
            'profile',
            'page-not-found'
        ],
        popUpRoutes: [
            'profile/update/info',
            'hot-keys',
            'team',
            'chats/end'
        ],
        leftMenu: {
            menu: [
                'home',
                'history'
            ],
            settingsMenu: [
                'profile'
            ]
        }
    },
    [2]: {
        profileUpdate: true,
        profileNotifications: true,
        hotKeys: true, //todo petq chi erevi adminn el uni
        teamChats: true,
        chatRequests: true,
        transferRequests: true,
        attachFileButton: true,
        chatWith: ['team-leads', 'agents'],
        chats: true,
        banButton: true,
        views: true,
        status: true,
        routes: [
            'home',
            'history',
            'profile',
            'agents',
            'shortcuts',
            'visitors',
            'visitors-banned',
            'page-not-found'
        ],
        popUpRoutes: [
            'hot-keys',
            'team',
            'ban',
            'transfer',
            'chats/end',
            'profile/update/info',
            'shortcuts/create',
            'shortcuts/update',
            'shortcuts/delete',
            'team-leads/agents/update'
        ],
        leftMenu: {
            menu: [
                'home',
                'visitors',
                'history',
            ],
            settingsMenu: [
                'agents',
                'visitors-banned',
                'shortcuts',
                'profile'
            ]
        }
    },
    [1]: {
        profileDashboardImage: true,
        profileUpdate: true,
        createAgentButton: true,
        deleteAgentButton: true,
        inactivateUserButton: true,
        teamChats: true,
        hotKeys: true,
        attachFileButton: true,
        banButton: true,
        views: true,
        routes: [
            'home',
            'history',
            'profile',
            'agents',
            'shortcuts',
            'visitors',
            'visitors-banned',
            'widgets',
            'page-not-found'
        ],
        popUpRoutes: [
            'hot-keys',
            'team',
            'ban',
            'transfer',
            'chats/end',
            'profile/update/info',
            'shortcuts/create',
            'shortcuts/update',
            'shortcuts/delete',
            'agents/create',
            'admins/agents/update',
            'agents/delete',
            'widgets/create',
            'widgets/delete'
        ],
        leftMenu: {
            menu: [
                'home',
                'visitors',
                'history'
            ],
            settingsMenu: [
                'agents',
                'visitors-banned',
                'shortcuts',
                'widgets',
                'profile'
            ]
        }
    }
};