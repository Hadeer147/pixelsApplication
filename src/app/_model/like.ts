import { Music } from "./music";

interface Likes {
    id: any;
    name: string;
    band: any;
    img:string;
    src: string;
    popularity:number;
    release_date:Date;
    pivot: {
        user_id: number;
        music_id: number;
        } 
}

export interface LikeInterface {
    likes: Likes[]
}