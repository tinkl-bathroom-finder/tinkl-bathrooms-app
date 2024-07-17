export interface BathroomType {
    id: number,
    api_id: number,
    name: string,
    street: string,
    city: string,
    state: string,
    accessible: boolean,
    unisex: boolean,
    directions: string | null,
    latitude: number,
    longitude: number,
    created_at: Date,
    updated_at: Date,
    country: string,
    changing_table: boolean,
    is_removed: boolean,
    is_single_stall: boolean,
    is_multi_stall: boolean,
    is_flagged: boolean,
    place_id: number | null

}