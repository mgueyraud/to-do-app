import { Orientation } from "ngx-guided-tour";

export interface GuidedTour {
    /** Identifier for tour */
    tourId: string;
    /** Use orb to start tour */
    useOrb?: boolean;
    /** Steps for the tour */
    steps: TourStep[];
    /** Function will be called when tour is skipped */
    skipCallback?: (stepSkippedOn: number) => void;
    /** Function will be called when tour is completed */
    completeCallback?: () => void;
    /** Minimum size of screen in pixels before the tour is run, if the tour is resized below this value the user will be told to resize */
    minimumScreenSize?: number;
    /** Dialog shown if the window width is smaller than the defined minimum screen size. */
    resizeDialog?: {
    /** Resize dialog title text */
    title?: string;
    /** Resize dialog text */
    content: string;
    }
}

interface TourStep {
    /** Selector for element that will be highlighted */
    selector?: string;
    /** Tour title text */
    title?: string;
    /** Tour step text */
    content: string;
    /** Where the tour step will appear next to the selected element */
    orientation?: Orientation | OrientationConfiguration[];
    /** Action that happens when the step is opened */
    action?: () => void;
    /** Action that happens when the step is closed */
    closeAction?: () => void;
    /** Skips this step, this is so you do not have create multiple tour configurations based on user settings/permissions */
    skipStep?: boolean;
    /** Adds some padding for things like sticky headers when scrolling to an element */
    scrollAdjustment?: number;
    /** Adds default padding around tour highlighting. Does not need to be true for highlightPadding to work */
    useHighlightPadding?: boolean;
    /** Adds padding around tour highlighting in pixels, this overwrites the default for this step. Is not dependent on useHighlightPadding being true */
    highlightPadding?: number;
}

interface OrientationConfiguration {
    /** Where the tour step will appear next to the selected element */
    orientationDirection: Orientation,
    /** When this orientation configuration starts in pixels */
    maximumSize?: number
}