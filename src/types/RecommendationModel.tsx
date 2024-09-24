import {CheckListType} from "./CheckListModel";

export type RecommendationModel = {
    id: number;
    name: string;
    type: CheckListType;
    content: RecommendationsContent;
    minPoints: number;
}

export type RecommendationsContent = {
    author: string;
    date: number;
    article?: string;
    steps?: string;
    video?: string;
    oneclick?: string;
}