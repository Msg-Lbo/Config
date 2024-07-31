import { $http } from "."

export const getConfig = async () => {
    return await $http({
        url: "/webui/api",
        method: "GET"
    })
}

export const updateConfig = async (dataInfo: any) => {
    return await $http({
        url: "/webui/api",
        method: "POST",
        data: dataInfo
    })
}