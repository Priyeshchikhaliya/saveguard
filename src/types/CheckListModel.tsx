export enum CheckListType {
    BASIC = "BASIC",
    PRIVACY = "PRIVACY",
    SECURITY = "SECURITY",
}

export type CheckListInputQuestionaryResult = {
    fulfilledRecommendationIds: number[];
}

export type CheckListInput = {
    [key in CheckListType]: CheckListInputQuestionaryResult;
}


export const sampleCheckListInput: CheckListInput = {
    [CheckListType.BASIC]: {
        fulfilledRecommendationIds: [1]
    },
    [CheckListType.PRIVACY]: {
        fulfilledRecommendationIds: [2]
    },
    [CheckListType.SECURITY]: {
        fulfilledRecommendationIds: [4,5,6]
    }
};