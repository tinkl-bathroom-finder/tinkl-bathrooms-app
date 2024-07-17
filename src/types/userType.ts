export interface UserType {
    username: string,
    is_admin: boolean,
    is_removed: boolean,
    location: LocationType
}

export type LocationType = {
    lat: number,
    lng: number
}