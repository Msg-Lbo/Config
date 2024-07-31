interface ConfigItem {
    key: string;
    value: any;
    description: string;
    type: string;
    zh_CN: string;
    options?: string[];
}

const configList: ConfigItem[] = [
    {
        key: 'PORT',
        value: 7897,
        description: "配置 Nonebot 监听的端口",
        type: "int",
        zh_CN: "配置 Nonebot 监听的端口"
    },
    {
        key: 'HOST',
        value: "0.0.0.0",
        description: "配置 Nonebot 监听的 IP 地址",
        type: "str",
        zh_CN: "配置 Nonebot 监听的 IP 地址"
    },
    {
        key: 'SUPERUSERS',
        value: ["123456789"],
        description: "配置 Nonebot 的超级用户请注意,QQ 号外须加上双引号（英文状态下的半角符号）,两个号码间用逗号隔开",
        type: "array",
        zh_CN: "超级用户"
    },
    {
        key: "COMMAND_SEP",
        value: [],
        description: "指令分隔符,不知道怎么用就不填",
        type: "array",
        zh_CN: "指令分隔符"
    },
    {
        key: "COMMAND_START",
        value: [],
        description: "配置 Nonebot 命令起始字符",
        type: "array",
        zh_CN: "命令起始字符"
    },
    {
        key: "LOG_LEVEL",
        value: "INFO",
        description: "# 日志输出等级,默认填写 INFO 即可",
        type: "str",
        zh_CN: "日志输出等级",
        options: ["DEBUG", "INFO", "WARNING", "ERROR", "CRITICAL"]
    },
    {
        key: "ONEBOT_ACCESS_TOKEN",
        value: "",
        description: "机器人平台（如 Gocqhttp,LLOnebot 等）的 AccessToken,如若没有设置,删除即可",
        type: "str",
        zh_CN: "机器人平台的 AccessToken"
    },
    {
        key: "TOKEN",
        value: "",
        description: "密钥，和插件内 Token 保持一致即可,用来防止别人连接到你的机器人，公网机器运行强烈建议设置",
        type: "str",
        zh_CN: "密钥"
    },
    {
        key: "COMMAND_GROUPS",
        value: [123456789],
        description: "指令群，机器人只对这些群的指令作响应，群号无需像 QQ 号一样加上引号，多个群号用逗号隔开即可。",
        type: "array",
        zh_CN: "指令群"
    },
    {
        key: "MESSAGE_GROUPS",
        value: [123456789],
        description: "消息群（即使用 !!qq 指令发送到的 QQ 群，以及把群内消息同步到游戏内的群",
        type: "array",
        zh_CN: "消息群"
    },
    {
        key: "SYNC_ALL_QQ_MESSAGE",
        value: false,
        description: "是否把消息群内的所有消息转发到服务器内。关闭后如需向服务器发送消息，请使用 .send 指令",
        type: "bool",
        zh_CN: "转发所有 QQ 群消息"
    },
    {
        key: "SYNC_ALL_GAME_MESSAGE",
        value: false,
        description: "是否转发所有在服务器内发送的消息到 QQ 群",
        type: "bool",
        zh_CN: "转发所有游戏内消息"
    },
    {
        key: "SYNC_MESSAGE_BETWEEN_SERVERS",
        value: false,
        description: "是否把服务器内的消息转发到其他的服务器。",
        type: "bool",
        zh_CN: "转发服务器间消息"
    },
    {
        key: "BOT_PREFIX",
        value: "bot_",
        description: "假人前缀，即使用 list 指令时的分类依据，以及进服广播的判定依据,若你服务器没有假人或者你不想对玩家进行分类，留空或删除即可",
        type: "str",
        zh_CN: "假人前缀"
    },
    {
        key: "COMMAND_ENABLED",
        value: ["list", "luck", "server", "help", "bound", "command", "send"],
        description: "启用的指令，send 指令仅在 SYNC_ALL_QQ_MESSAGE 为 false 时生效。",
        type: "array",
        zh_CN: "启用的指令",
        options: ["list", "luck", "server", "help", "bound", "command", "send"]
    },
    {
        key: "BROADCAST_SERVER",
        value: false,
        description: "是否播报服务器开启/关闭（播报到其他服务器和 QQ 群）。",
        type: "bool",
        zh_CN: "播报服务器状态"
    },
    {
        key: "BROADCAST_PLAYER",
        value: false,
        description: "是否播报玩家进入/离开服务器",
        type: "bool",
        zh_CN: "播报玩家状态"
    },
    {
        key: "COMMAND_MINECRAFT_WHITELIST",
        value: [],
        description: "Command 指令的白名单，只有以这个列表里的指令 开头 的指令才被允许执行。若有填写请保留空的 COMMAND_MINECRAFT_BLACKLIST 或删除此字段。",
        type: "array",
        zh_CN: "Command 指令的白名单"
    },
    {
        key: "COMMAND_MINECRAFT_BLACKLIST",
        value: [],
        description: "Command 指令的黑名单，若有填写请保留空的 COMMAND_MINECRAFT_WHITELIST（为空即启用所有指令）。启用后以这个列表里的指令 开头 的指令将被禁止执行。",
        type: "array",
        zh_CN: "Command 指令的黑名单"
    },
    {
        key: "SERVER_WATCHER_UPDATE_INTERVAL",
        value: 0,
        description: "更新服务器信息的间隔时间，单位为分钟。",
        type: "int",
        zh_CN: "更新服务器信息的间隔时间"
    },
    {
        key: "SERVER_WATCHER_MAX_CACHE",
        value: 0,
        description: "服务器信息的缓存时间，为几个单位（前面的 SERVER_WATCHER_UPDATE_INTERVAL 为一个单位）。超过这个时间的服务器信息将会被删除。",
        type: "int",
        zh_CN: "服务器信息的缓存时间"
    },
    {
        key: "WHITELIST_COMMAND",
        value: "",
        description: "白名单的指令，默认为 whitelist 指令。若填写为 whitelist 时，则添加白名单指令为 whitelist add，删除白名单指令为 whitelist remove，其他指令同理。",
        type: "str",
        zh_CN: "白名单的指令"
    },
    {
        key: "SYNC_COLOR_SOURCE",
        value: "gray",
        description: "设置转发消息的颜色，包括 QQ 群内的消息和其他服务器内的转发消息。有效值有：black、dark_blue、dark_green、dark_aqua、dark_red、dark_purple、gold、gray、ark_gray、blue、green、aqua、red、light_purple、yellow、white、reset（取消父对象使用的颜色效果）。设置为 #<hex> 可以使用以6位十六进制RGB颜色格式定义的色。",
        type: "str",
        zh_CN: "转发消息的颜色(前缀)",
    },
    {
        key: "SYNC_COLOR_PLAYER",
        value: "gray",
        description: "设置转发消息的颜色，包括 QQ 群内的消息和其他服务器内的转发消息。有效值有：black、dark_blue、dark_green、dark_aqua、dark_red、dark_purple、gold、gray、ark_gray、blue、green、aqua、red、light_purple、yellow、white、reset（取消父对象使用的颜色效果）。设置为 #<hex> 可以使用以6位十六进制RGB颜色格式定义的色。",
        type: "str",
        zh_CN: "转发消息的颜色(玩家名)",
    },
    {
        key: "SYNC_COLOR_MESSAGE",
        value: "gray",
        description: "设置转发消息的颜色，包括 QQ 群内的消息和其他服务器内的转发消息。有效值有：black、dark_blue、dark_green、dark_aqua、dark_red、dark_purple、gold、gray、ark_gray、blue、green、aqua、red、light_purple、yellow、white、reset（取消父对象使用的颜色效果）。设置为 #<hex> 可以使用以6位十六进制RGB颜色格式定义的色。",
        type: "str",
        zh_CN: "转发消息的颜色(消息)",
    },
    {
        key: "QQ_BOUND_MAX_NUMBER",
        value: 0,
        description: "绑定 QQ 号的最大数量，如若设置 0 则表示不限制。若你只想一个 QQ 号绑定一个 Minecraft 账号，请将 QQ_BOUND_MAX_NUMBER 设置为 1。",
        type: "int",
        zh_CN: "绑定 QQ 号的最大数量"
    }
]
export { configList };
export type { ConfigItem };
