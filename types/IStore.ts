import { User } from "@prisma/client";

export default interface AppStoreState {
    userDetails: User | null;
    setUserDetails: (userDetails: User) => void;
    clearUserDetails: () => void;
    isUserLoading: boolean;
    setIsUserLoading: (data: boolean) => void;
    mobileOpen: boolean;
    setMobileOpen: (data: boolean) => void;
    isPageShrunk: boolean;
    setIsPageShrunk: (data: boolean) => void;
    isOpenSidebarAdmin: boolean;
    setIsOpenSidebarAdmin: (data: boolean) => void;
    openDrawer: boolean;
    setOpenDrawer: (data: boolean) => void;
    selectedReview: unknown;
    setSelectedReview: (data: unknown) => void;
    upvotesPageModal: number;
    setUpvotesPageModal: (data: number) => void;
    downvotesPageModal: number;
    setDownvotesPageModal: (data: number) => void;
    hasMoreUpvotesModal: boolean;
    setHasMoreUpvotesModal: (data: boolean) => void;
    hasMoreDownvotesModal: boolean;
    setHasMoreDownvotesModal: (data: boolean) => void;
    listModalDataType: string | null;
    setListModalDataType: (data: string | null) => void;
    isEditModeReview: boolean;
    setIsEditModeReview: (data: boolean) => void;
}
