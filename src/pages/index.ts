import ErrorPage from "./error";
import PAGE_ROUTES_MAP from "./page-routes";

const notFoundError = ErrorPage.createNotFoundPage;

export {
    PAGE_ROUTES_MAP,
    notFoundError,
};